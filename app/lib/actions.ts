'use server'

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { registerSchema } from "./schemas";
import bcrypt from "bcrypt";
import { db } from "@/db";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false, 
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return error.message; 
    }
    return "Unknown error occurred";
  }
}

type State = {
  error?: string
  success?: boolean
}

export const register = async (prevState: State, formData: FormData) => {
  const parsed = registerSchema.safeParse({
    email: formData.get("email"),
    username: formData.get("username"),
    role: formData.get("role"),
    password: formData.get("password")
  })

  if (!parsed.success) {
    return { error: 'Invalid form data' }
  }

  const { email, username, password, role } = parsed.data;

  const existingUser = await db.user.findUnique({ where: { email } })

  if (existingUser) {
    return { error: 'Email already in use' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await db.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
      role
    },
  })

  return { success: true }
}
