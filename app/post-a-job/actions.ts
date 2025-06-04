"use server";

import { register, State } from "../lib/actions";
import { db } from "../lib/db";
import { sendJobPostEmail } from "../lib/emailTemplate";
import { postJobSchema } from "../lib/schemas";

export const postJob = async (prevState: State, formData: FormData) => {
  const user = await register(prevState, formData);
  if (user.success) {
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

    const { category, title, description, location, project } = parsed.data;

    const job = await db.job.create({
      data: {
        title,
        description,
        category,
        createdAt: new Date(),
        location,
        project,
        userId: user.userId,
      },
    });

    const updatedUser = await db.user.update({
      where: {
        id: user.userId,
      },
      data: {
        location,
      },
    });

    await sendJobPostEmail(
      updatedUser.email,
      "Thank you for posting your job",
      updatedUser.username,
      job.title,
    );

    return { success: true };
  }
  return { error: "Something went wrong" };
};
