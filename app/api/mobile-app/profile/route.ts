import { db } from "@/app/lib/db";
import { authenticateUser } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const storedUser = await authenticateUser(request);

    if (storedUser instanceof NextResponse) {
      return storedUser;
    }

    const user = await db.user.findFirst({
      where: { id: storedUser.userId },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
