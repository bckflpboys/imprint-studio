import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
      role: 'user' | 'organizer' | 'blogger' | 'admin';
    }
  }

  interface User {
    id: string;
    name?: string;
    email: string;
    image?: string;
    role: 'user' | 'organizer' | 'blogger' | 'admin';
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    id: string;
    role: 'user' | 'organizer' | 'blogger' | 'admin';
  }
}