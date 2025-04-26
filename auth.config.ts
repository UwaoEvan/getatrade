import type { NextAuthConfig } from "next-auth";
import { db } from "./db";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const protectedPaths = ["/newleads", "/interested"];
      const isOnProtectedPath = protectedPaths.some((path) =>
        nextUrl.pathname.startsWith(path),
      );
      if (isOnProtectedPath) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/newleads", nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
