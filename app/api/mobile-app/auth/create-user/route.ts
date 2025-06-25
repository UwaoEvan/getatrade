import { db } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";
import bcrypt from "bcrypt";

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

    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof ZodError) {
      const message = error.errors.map((err) => err.message);
      return NextResponse.json({
        error: message,
        status: 500,
      });
    }
    return NextResponse.json({
      error: error,
      status: 500,
    });
  }
}
