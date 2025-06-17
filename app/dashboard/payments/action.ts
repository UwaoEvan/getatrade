"use server";

import { db } from "@/app/lib/db";

export const fetchPayments = async () => {
  const payments = await db.payments.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return payments;
};
