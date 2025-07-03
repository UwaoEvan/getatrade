import { db } from "@/app/lib/db";
import { authenticateUser } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: number }> },
) {
  try {
    const loggedIn = await authenticateUser(request);

    if (loggedIn instanceof NextResponse) {
      return loggedIn;
    }

    const { id } = await params;

    const user = await db.user.findFirst({
      where: { id: parseInt(id.toString()) },
    });

    if (!user) {
      return NextResponse.json(
        { error: `User with the id of ${id} not found.` },
        { status: 404 },
      );
    }

    const portfolio = await db.portfolioImage.findMany({
      where: { userId: parseInt(id.toString()) },
    });

    return NextResponse.json({ user, portfolio });
  } catch (error) {
    return NextResponse.json(
      { error: `Something went wrong: ${error} ` },
      { status: 500 },
    );
  }
}
