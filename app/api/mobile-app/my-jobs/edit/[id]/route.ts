import { db } from "@/app/lib/db";
import { authenticateUser } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const jobSchema = z.object({
  description: z.string({ required_error: "Job description is missing" }),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = jobSchema.parse(body);
    const user = await authenticateUser(request);

    if (user instanceof NextResponse) {
      return user;
    }

    const { description } = parsed;
    const job = await db.job.update({
      where: { id },
      data: {
        description,
      },
    });

    return NextResponse.json(job);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
