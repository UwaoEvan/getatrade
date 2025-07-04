import { db } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";
import bcrypt from "bcrypt";
import { sendWelcomeEmail } from "@/app/lib/emailTemplate";

const registerSchema = z.object({
  username: z.string({ required_error: "Username is missing." }),
  email: z.string({ required_error: "Email is missing." }),
  phoneNumber: z.string({ required_error: "Phone number is missing." }),
  role: z.string({ required_error: "Role is missing" }),
  location: z.string({ required_error: "Location is missing" }),
  firstName: z.string({ required_error: "First name is missing" }),
  lastName: z.string({ required_error: "Last name is missing" }),
  password: z.string({ required_error: "Password is missing" }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = registerSchema.parse(body);
    const {
      username,
      email,
      phoneNumber,
      role,
      location,
      firstName,
      lastName,
      password,
    } = parsed;

    const existingUser = await db.user.findFirst({
      where: {
        OR: [{ email }, { phoneNumber }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "The user already exists. Login instead" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        username,
        firstName,
        lastName,
        location,
        role,
        email,
        phoneNumber,
        hashedPassword,
        joinDate: new Date(),
      },
    });

    await sendWelcomeEmail(
      user.email,
      "Welcome to GetATradeLinkLtd",
      user.username,
      user?.role as string,
    );

    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof ZodError) {
      const message = error.errors.map((err) => err.message);
      return NextResponse.json({ error: message[0] }, { status: 400 });
    }
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
