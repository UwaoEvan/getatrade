import { db } from "@/app/lib/db";
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
    const { id } = await params;
    const body = await request.json();
    const parsed = shortlistSchema.parse(body);
    const user = await authenticateUser(request);

    if (user instanceof NextResponse) {
      return user;
    }

    const exists = await db.job.findFirst({
      where: { id },
    });

    if (!exists) {
      return NextResponse.json({ error: "Job not found." }, { status: 404 });
    }

    const { userId } = parsed;

    const sExists = await db.shortlist.findFirst({
      where: {
        AND: [{ jobId: id }, { userId: parseInt(userId) }],
      },
    });
    console.log(`UserId: ${user.userId}, jobId: ${id}`);
    if (sExists) {
      return NextResponse.json(
        { error: "User already shortlisted." },
        { status: 400 },
      );
    }

    const shortlisted = await db.$transaction(async (trx) => {
      const short = await trx.shortlist.create({
        data: {
          jobId: id,
          userId: parseInt(userId),
        },
        include: {
          user: true,
        },
      });

      await trx.interest.deleteMany({
        where: {
          userId: parseInt(userId),
          jobId: id,
        },
      });

      await trx.job.update({
        where: { id },
        data: {
          interested: (exists.interested ?? 0) - 1,
          shortlisted: (exists.shortlisted ?? 0) + 1,
        },
      });
      return short;
    });

    return NextResponse.json(shortlisted);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
