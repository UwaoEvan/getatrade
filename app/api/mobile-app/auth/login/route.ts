import { db } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { encodeToken } from "@/lib/utils";
import { z, ZodError } from "zod";

const loginSchema = z.object({
  email: z.string({ required_error: "Username is required" }),
  password: z.string({ required_error: "Password is required." }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = loginSchema.parse(body);
    const { email, password } = parsed;

    const user = await db.user.findFirst({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!isMatch) {
      return NextResponse.json({ error: "Wrong password." }, { status: 401 });
    }

    const token = await encodeToken({
      userId: user.id,
      role: user.role as string,
    });

    return NextResponse.json({ ...user, token });
  } catch (error) {
    if (error instanceof ZodError) {
      const messages = error.errors.map((err) => err.message);
      return NextResponse.json({ error: messages[0] }, { status: 400 });
    }
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
