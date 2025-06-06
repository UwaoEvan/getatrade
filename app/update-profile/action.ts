"use server";

import { State } from "../lib/actions";
import { auth } from "../lib/auth";
import { db } from "../lib/db";
import { updateProfileSchema } from "../lib/schemas";

export const updateProfile = async (prevState: State, formData: FormData) => {
  const session = await auth();
  const email = session?.user?.email;

  const parsed = updateProfileSchema.safeParse({
    about: formData.get("about"),
    location: formData.get("location"),
    lastName: formData.get("lastname"),
    firstName: formData.get("firstname"),
  });

  if (!parsed.success) {
    return { error: "Invalid form data" };
  }

  const { about, location, lastName, firstName } = parsed.data;

  if (email) {
    await db.user.update({
      where: {
        email,
      },
      data: {
        about,
        location,
        firstName,
        lastName,
      },
    });

    return { success: true };
  }
  return { error: "User not found." };
};
