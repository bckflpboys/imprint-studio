import NextAuth from "next-auth";
import { authOptions } from "./auth.config";

const handler = NextAuth(authOptions);

// Only export route handlers from route.ts files
export { handler as GET, handler as POST };
