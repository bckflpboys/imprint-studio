import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/[...nextauth]/auth.config";

export async function getAuthSession() {
  return await getServerSession(authOptions);
}