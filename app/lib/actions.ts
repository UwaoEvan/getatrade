"use server";

import { auth, signIn } from "./auth";
import { AuthError } from "next-auth";
import { registerSchema } from "./schemas";
import bcrypt from "bcrypt";
import { db } from "./db";
import { redirect } from "next/navigation";

export type State = {
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
  redirect("/newleads");
}

export const register = async (prevState: State, formData: FormData) => {
  const parsed = registerSchema.safeParse({
    email: formData.get("email"),
    username: formData.get("username"),
    role: formData.get("role"),
    password: formData.get("password"),
    phoneNumber: formData.get("phonenumber"),
    // location: formData.get("location"),
  });

  if (!parsed.success) {
    return { error: "Invalid form data" };
  }

  const { phoneNumber, email, username, password, role } =
    parsed.data;

  const existingUser = await db.user.findUnique({ where: { email } });

  if (existingUser) {
    return { error: "Email already in use" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      email,
      username,
      hashedPassword,
      role,
      phoneNumber,
      // location,
    },
  });

  await signIn("credentials", {
    email: formData.get("email"),
    password: formData.get("password"),
    redirect: false,
  });

  return { success: true, userId: user.id };
};

export const getJobPostings = async () => {
  const jobs = await db.job.findMany({
    where: {
      closedAt: null,
    },
  });
  return jobs;
};

export const getJobPosting = async (id: string) => {
  const job = await db.job.findFirst({
    where: {
      id,
    },
  });
  return job;
};

export const getUser = async (email?: string, id?: number) => {
  if (email) {
    const user = await db.user.findFirst({
      where: { email: email as string },
    });
    return user;
  } else {
    const user = await db.user.findFirst({
      where: { id },
    });
    return user;
  }
};

export const getPayment = async (jobId: string) => {
  const session = await auth();
  const email = session?.user?.email;

  const user = await getUser(email || "");

  const payment = await db.payments.findFirst({
    where: {
      userId: user?.id,
      jobId,
    },
  });

  return payment;
};
