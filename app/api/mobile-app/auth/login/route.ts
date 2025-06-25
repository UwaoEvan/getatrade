import { db } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { encodeToken } from "@/lib/utils";
import { z, ZodError } from "zod";

const loginSchema = z.object({
  username: z.string({ required_error: "Username is required" }),
  password: z.string({ required_error: "Password is required."})
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = loginSchema.parse(body);
    const { username, password } = parsed;
    
    const user = await db.user.findFirst({
      where: { email: username }
    })

    if (!user) {
      return NextResponse.json({
        error: "User not found.",
        status: 404
      })
    }

    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    
    if (!isMatch) {
      return NextResponse.json({
        error: "Wrong password.",
        status: 401
      })
    }

    const token = await encodeToken({ userId: user.id, role: user.role as string });

    return NextResponse.json({...user, token });
  } catch (error) {
    if (error instanceof ZodError) {
      const messages = error.errors.map((err) => err.message);
      return NextResponse.json(
        { error: messages },
        { status: 400 }
      );
    }
  }
}

// export async function GET(request: NextRequest) {
//   try {
//     const authHeader = request.headers.get("authorization");
//     const token = authHeader?.split(' ')[1];
//     const decode = await decodeToken(token as string);
//     console.log(decode?.userId)
//     return NextResponse.json(token);
//   } catch (error) {
//     return NextResponse.json({
//       error: "Something went wrong.",
//       status: 500
//     })
//   }
// }