import { db } from "@/app/lib/db";
import { encodeToken } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";
import bcrypt from "bcrypt";
import { sendJobPostEmail, sendWelcomeEmail } from "@/app/lib/emailTemplate";

const jobPostSchema = z.object({
  title: z.string({ required_error: "Job title is missing " }),
  category: z.string({ required_error: "Job category is missing " }),
  project: z.string({ required_error: "Job project is missing " }),
  description: z.string({ required_error: "Job description is missing " }),
  location: z.string({ required_error: "Job location is missing " }),
  username: z.string({ required_error: "Username is missing" }),
  firstName: z.string({ required_error: "First name is missing" }),
  lastName: z.string({ required_error: "Last name is missing" }),
  email: z.string({ required_error: "Email is missing" }),
  phoneNumber: z.string({ required_error: "Phone number is missing" }),
  password: z.string({ required_error: "Password is missing" }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = jobPostSchema.parse(body);

    const {
      username,
      firstName,
      lastName,
      location,
      email,
      phoneNumber,
      password,
      title,
      category,
      project,
      description,
    } = parsed;

    const exisits = await db.user.findFirst({
      where: {
        OR: [{ email }, { phoneNumber }],
      },
    });

    if (exisits) {
      return NextResponse.json(
        { error: "User already exists. Login instead." },
        { status: 403 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.$transaction(async (trx) => {
      const user = await trx.user.create({
        data: {
          username,
          firstName,
          lastName,
          location,
          hashedPassword,
          email,
          phoneNumber,
          role: "customer",
        },
      });

      const job = await trx.job.create({
        data: {
          title,
          category,
          project,
          description,
          location,
          userId: user.id,
        },
      });

      await sendWelcomeEmail(
        user.email,
        "Welcome to GetATradeLinkLtd",
        user.username,
        "customer",
      );

      await sendJobPostEmail(
        user.email,
        "Thank you for posting your job",
        user.username,
        job.title,
      );

      return user;
    });

    const token = await encodeToken({ userId: newUser.id, role: "customer" });

    return NextResponse.json({ ...newUser, token });
  } catch (error) {
    if (error instanceof ZodError) {
      const messages = error.errors.map((err) => err.message);
      return NextResponse.json({ error: messages[0] }, { status: 500 });
    }
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
