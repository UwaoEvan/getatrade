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
        amount: amount / 100,
        description,
        userId: user?.id,
        jobId,
      },
    });

    return payment;
  }
};

export const updatePayments = async (
  paymentId: string,
  status: string,
  jobId?: string,
  shortlistId?: string,
) => {
  if (!jobId) return { error: "Job not found." };

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

  if (status === "PAID") {
    await db.interest.deleteMany({
      where: {
        userId: payment.userId,
        jobId: payment.jobId,
      },
    });
  }

  const result = status === "PAID" ? true : false;
  await db.shortlist.update({
    where: {
      id: shortlistId,
    },
    data: {
      paid: result,
    },
  });
};
