import { db } from "@/app/lib/db";
import { sendEmail } from "@/app/lib/emailTemplate";
import { authenticateUser } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const user = await authenticateUser(request);

    if (user instanceof NextResponse) {
      return user;
    }

    const interested = await db.interest.findMany({
      where: {
        jobId: id,
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json(interested);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

const shortlistSchema = z.object({
  userId: z.string({ required_error: "UserId is missing" }),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // we get this from the interest table.id and use it to find the jobs and interests
    const { id } = await params;
    const body = await request.json();
    const parsed = shortlistSchema.parse(body);
    const user = await authenticateUser(request);

    if (!id) return;

    if (user instanceof NextResponse) {
      return user;
    }

    const eInterest = await db.interest.findFirst({
      where: { id },
    });

    if (!eInterest) {
      return NextResponse.json(
        { error: "Interest not found." },
        { status: 404 },
      );
    }

    const exists = await db.job.findFirst({
      where: { id: eInterest.jobId },
    });

    if (!exists) {
      return NextResponse.json({ error: "Job not found." }, { status: 404 });
    }

    const sUser = await db.user.findFirst({
      where: { id: user.userId },
    });

    if (!sUser) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const { userId } = parsed;

    const sExists = await db.shortlist.findFirst({
      where: {
        AND: [{ jobId: id }, { userId: parseInt(userId) }],
      },
    });

    if (sExists) {
      return NextResponse.json(
        { error: "User already shortlisted." },
        { status: 400 },
      );
    }

    const shortlisted = await db.$transaction(async (trx) => {
      const short = await trx.shortlist.create({
        data: {
          jobId: eInterest.jobId,
          userId: parseInt(userId),
        },
        include: {
          user: true,
        },
      });

      await trx.interest.update({
        where: { id },
        data: {
          shortlisted: true,
        },
      });

      await trx.job.update({
        where: { id: eInterest.jobId },
        data: {
          interested: (exists.interested ?? 0) - 1,
          shortlisted: (exists.shortlisted ?? 0) + 1,
        },
      });
      return short;
    });

    await sendEmail(
      sUser.email,
      "You have been shortlisted.",
      exists.title,
      sUser.username,
      "customer",
    );

    return NextResponse.json(shortlisted);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
