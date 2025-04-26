"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { postJobSchema, registerSchema } from "./schemas";
import bcrypt from "bcrypt";
import { db } from "@/db";
import { redirect } from "next/navigation";

type State = {
  error?: string;
  success?: boolean;
};

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
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
  redirect("/dashboard");
}

export const register = async (prevState: State, formData: FormData) => {
  const parsed = registerSchema.safeParse({
    email: formData.get("email"),
    username: formData.get("username"),
    role: formData.get("role"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Invalid form data" };
  }

  const { email, username, password, role } = parsed.data;

  const existingUser = await db.user.findUnique({ where: { email } });

  if (existingUser) {
    return { error: "Email already in use" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      email,
      username,
      hashedPassword,
      role,
    },
  });

  return { success: true };
};

export const postJob = async (prevState: State, formData: FormData) => {
  const parsed = postJobSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    location: formData.get("location"),
    category: formData.get("category"),
    contactEmail: formData.get("contactEmail"),
    project: formData.get("project"),
  });

  if (!parsed.success) {
    return { error: "Invalid form data" };
  }

  const { category, contactEmail, title, description, location, project } =
    parsed.data;

  await db.job.create({
    data: {
      title,
      description,
      category,
      contactEmail,
      createdAt: new Date(),
      location,
      project,
    },
  });

  return { success: true };
};

export const getJobPostings = async () => {
  const jobs = await db.job.findMany();
  return jobs;
};
