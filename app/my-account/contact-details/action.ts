"use server";

import { State } from "@/app/lib/actions";
import { db } from "@/app/lib/db";

export const updateContactDetails = async (
  prevState: State,
  formData: FormData,
) => {
  const userId = formData.get("userId") as string;

  const user = await db.user.update({
    where: {
      id: parseInt(userId),
    },
    data: {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      address: formData.get("address") as string,
      location: formData.get("location") as string,
      phoneNumber: `+44${formData.get("phonenumber") as string}`,
    },
  });

  if (!user) {
    return {
      error: "User not found",
      success: false,
    };
  }
  return {
    success: true,
  };
};
