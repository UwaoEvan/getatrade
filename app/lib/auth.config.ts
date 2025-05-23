import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const protectedPaths = [
        "/newleads",
        "/interested",
        "/my-account",
        "/my-jobs",
        "/checkout",
        "/payment-success",
        "/new-job",
        "/activity",
        "/shortlisted",
        "/hired",
        "/closed",
        "/update-profile",
        "/contact-details",
      ];
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
