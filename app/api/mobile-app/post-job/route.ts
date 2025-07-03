import { db } from "@/app/lib/db";
import { sendJobPostEmail } from "@/app/lib/emailTemplate";
import { postJobSchema } from "@/app/lib/schemas";
import { authenticateUser } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = postJobSchema.parse(body);
    const user = await authenticateUser(request);

    if (user instanceof NextResponse) {
      return user;
    }

    const existingUser = await db.user.findFirst({
      where: { id: user.userId },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found " }, { status: 404 });
    }

    const { title, category, project, description, location } = parsed;

    const job = await db.job.create({
      data: {
        title,
        category,
        project,
        description,
        location,
        userId: user.userId,
      },
    });

    await sendJobPostEmail(
      existingUser.email,
      "Thank you for posting your job",
      existingUser.username,
      job.title,
    );

    return NextResponse.json(job);
  } catch (error) {
    if (error instanceof ZodError) {
      const messages = error.errors.map((err) => err.message);
      return NextResponse.json({ error: messages[0] }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Something went wrong " },
      { status: 500 },
    );
  }
}
