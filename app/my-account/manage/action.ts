"use server";

import { getUser } from "@/app/lib/actions";
import { auth, signOut } from "@/app/lib/auth";
import { db } from "@/app/lib/db";

export const deactivateAccount = async () => {
  const session = await auth();
  const user = await getUser(session?.user?.email as string);

  if (!user) {
    return {
      error: "User not found.",
    };
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      status: "Inactive",
      deactivatedOn: new Date(),
    },
  });

  await signOut();
};
