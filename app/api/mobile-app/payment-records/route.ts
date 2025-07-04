import { db } from "@/app/lib/db";
import { authenticateUser } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateUser(request);

    if (user instanceof NextResponse) {
      return user;
    }

    const payments = await db.payments.findMany({
      where: {
        userId: user.userId,
      },
    });

    return NextResponse.json(payments);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await authenticateUser(request);
    const { amount, description, jobId } = await request.json();

    if (user instanceof NextResponse) {
      return user;
    }

    const payment = await db.payments.create({
      data: {
        amount: amount,
        description,
        userId: user.userId,
        jobId,
      },
    });

    return NextResponse.json(payment);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
