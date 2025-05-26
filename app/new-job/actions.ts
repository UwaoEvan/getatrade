"use server";

import { revalidatePath } from "next/cache";
import { getUser, State } from "../lib/actions";
import { auth } from "../lib/auth";
import { db } from "../lib/db";
import { postJobSchema, updateJobSchema } from "../lib/schemas";

export const postNewJob = async (prevState: State, formData: FormData) => {
  const session = await auth();

  const parsed = postJobSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    location: formData.get("location"),
    category: formData.get("category"),
    project: formData.get("project"),
  });

  if (!parsed.success) {
    const firstError = parsed.error.errors[0]?.message || "Invalid form data";
    return { error: firstError };
  }

  const user = await getUser(session?.user?.email || "");

  if (!user) {
    return { error: "User not found." };
  }

  const { category, title, description, location, project } = parsed.data;

  await db.job.create({
    data: {
      title,
      description,
      category,
      createdAt: new Date(),
      location,
      project,
      userId: user.id,
    },
  });

  return { success: true };
};

export const updateJob = async (formData: FormData) => {
  const parsed = updateJobSchema.safeParse({
    jobId: formData.get("jobId"),
    description: formData.get("description"),
  });

  if (!parsed.success) {
    return;
  }

  const { jobId, description } = parsed.data;

  await db.job.update({
    where: {
      id: jobId,
    },
    data: {
      description,
    },
  });

  revalidatePath(`/my-jobs/${jobId}`);
};
