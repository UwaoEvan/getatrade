"use server";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { db } from "./db";
import bcrypt from "bcrypt";
import { AuthError } from "next-auth";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          throw new AuthError("Invalid form data");
        }

        const { email, password } = parsedCredentials.data;
        const user = await db.user.findFirst({ where: { email, status: "Active" } });

        if (!user) {
          throw new AuthError("User not found");
        }

        const passwordsMatch = await bcrypt.compare(
          password,
          user.hashedPassword,
        );
        if (!passwordsMatch) {
          throw new AuthError("Incorrect password");
        }

        return {
          username: user.username,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
});
