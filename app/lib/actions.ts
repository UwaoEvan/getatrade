'use server'

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false, // 👈 VERY IMPORTANT
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return error.message; // 👈 Get the exact message you threw in `authorize`
    }
    return "Unknown error occurred";
  }
}
