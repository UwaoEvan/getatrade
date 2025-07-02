import { db } from "@/app/lib/db";
import { authenticateUser } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

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

const updateUser = z.object({
  phoneNumber: z.string({ required_error: "Phone number is missing." }),
  location: z.string({ required_error: "Location is missing" }),
  firstName: z.string({ required_error: "First name is missing" }),
  lastName: z.string({ required_error: "Last name is missing" }),
  address: z.string({ required_error: "Password is missing" }),
});

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = updateUser.parse(body);
    const storedUser = await authenticateUser(request);

    if (storedUser instanceof NextResponse) {
      return storedUser;
    }

    const { firstName, lastName, address, location, phoneNumber } = parsed;
    const user = await db.user.update({
      where: { id: storedUser.userId },
      data: {
        firstName,
        lastName,
        address,
        phoneNumber,
        location,
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
