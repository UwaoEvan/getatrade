"use server";

import { getUser } from "@/app/lib/actions";
import { auth } from "@/app/lib/auth";
import { db } from "@/app/lib/db";

export const getPayments = async () => {
  const session = await auth();
  const email = session?.user?.email;

  const user = await getUser(email as string);

  if (user) {
    const payments = await db.payments.findMany({
      where: {
        userId: user.id,
      },
    });
    return payments;
  }
};
