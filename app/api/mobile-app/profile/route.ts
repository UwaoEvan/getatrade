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
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const storedUser = await authenticateUser(request);

    if (storedUser instanceof NextResponse) {
      return storedUser;
    }

    const { firstName, lastName, address, location, phoneNumber, about } = body;
    const user = await db.user.update({
      where: { id: storedUser.userId },
      data: {
        firstName,
        lastName,
        address,
        phoneNumber,
        location,
        about,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await authenticateUser(request);

    if (user instanceof NextResponse) {
      return user;
    }

    await db.user.update({
      where: { id: user.userId },
      data: {
        status: "Inactive",
        deactivatedOn: new Date(),
      },
    });

    return NextResponse.json({ sucess: true });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
