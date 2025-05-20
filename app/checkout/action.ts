"use server";

import { getUser } from "../lib/actions";
import { auth } from "../lib/auth";
import { db } from "../lib/db";

export const savePayments = async (
  amount: number,
  description: string,
  jobId: string,
) => {
  const session = await auth();
  const email = session?.user?.email;

  const user = await getUser(email || "");

  if (user) {
    const payment = await db.payments.create({
      data: {
        amount,
        description,
        userId: user?.id,
        jobId,
      },
    });

    return payment;
  }
};

export const updatePayments = async (paymentId: string, status: string) => {
  const payment = await db.payments.update({
    where: {
      id: paymentId,
    },
    data: {
      status,
    },
  });

  if (!payment) {
    return { error: "Payment not found." };
  }
};
