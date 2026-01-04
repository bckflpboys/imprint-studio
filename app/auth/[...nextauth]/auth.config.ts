import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/libs/mongoose";
import User from "@/models/User";
import bcrypt from 'bcryptjs';
import { DefaultSession, NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: UserRole;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    accessToken?: string;
  }

  interface User {
    id: string;
    role: UserRole;
    email: string;
    name?: string | null;
    image?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
    email: string;
    accessToken?: string;
  }
}

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || 'fallback-secret-for-dev-only';

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('Using NEXTAUTH_SECRET:', NEXTAUTH_SECRET === 'fallback-secret-for-dev-only' ? 'Fallback' : 'Env Var');

type UserRole = 'user' | 'organizer' | 'admin';

export const authOptions: NextAuthOptions = {
  useSecureCookies: false, // Force false for localhost dev
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: false, // Force false for localhost
      },
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: NEXTAUTH_SECRET,
  debug: true, // Enable debug mode
  logger: {
    error(code, metadata) {
      console.error(code, metadata);
    },
    warn(code) {
      console.warn(code);
    },
    debug(code, metadata) {
      console.debug(code, metadata);
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('Authorize called with:', credentials?.email);
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter an email and password');
        }

        // Ensure the database connection is established before querying
        await connectToDB();

        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          console.log('User not found');
          throw new Error('No user found with this email');
        }

        // Use bcrypt to verify password
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          console.log('Invalid password');
          throw new Error('Invalid password');
        }

        console.log('User authorized:', user.email);
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role
        };
      }
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      console.log('SignIn callback:', { userEmail: user.email, provider: account?.provider });
      if (!user.email) {
        return false; // Don't allow sign in without email
      }
      if (account?.provider === "google") {
        await connectToDB();

        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          const newUser = await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            role: 'user'
          });
          user.id = newUser._id.toString();
          user.role = newUser.role;
        } else {
          user.id = existingUser._id.toString();
          user.role = existingUser.role;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      console.log('JWT callback:', {
        hasUser: !!user,
        hasAccount: !!account,
        tokenSub: token.sub
      });
      // Initial sign in
      if (account && user) {
        return {
          accessToken: account.access_token,
          id: user.id,
          role: user.role,
          email: user.email,
          name: user.name,
          picture: user.image
        };
      }
      return token;
    },
    async session({ session, token }) {
      console.log('Session callback:', {
        hasSessionUser: !!session.user,
        tokenSub: token.sub
      });
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  }
};