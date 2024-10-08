import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    accessToken: string;
    refreshToken: string;
    name: string;
    email: string;
    username: string
  }
  interface Session {
    accessToken: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string; 
    accessTokenExpires: number;
    error?: string;
  }
}
