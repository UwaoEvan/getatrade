import { db } from "@/app/lib/db";
import { authenticateUser } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const user = await authenticateUser(request);

    if (user instanceof NextResponse) {
      return user;
    }

    const job = await db.job.findFirst({
      where: { id },
    });

    const interested = await db.interest.findFirst({
      where: {
        jobId: id,
        userId: user.userId
      }
    })

    if (interested) {
      return NextResponse.json(
        { error: "Already applied for this job."},
        { status: 403 }
      )
    }

    if (!job) {
      return NextResponse.json({ error: "Job not found." }, { status: 404 });
    }

    await db.interest.create({
      data: {
        userId: user.userId,
        jobId: id,
        createdAt: new Date(),
      },
    });

    const updatedJob = await db.job.update({
      where: { id },
      data: {
        interested: (job.interested ?? 0) + 1,
      },
    });

    return NextResponse.json(updatedJob);
  } catch (error) {
    return NextResponse.json(
      { error: `Something went wrong: ${error}` },
      { status: 500 },
    );
  }
}
