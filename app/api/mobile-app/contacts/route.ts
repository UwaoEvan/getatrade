import { db } from "@/app/lib/db";
import { authenticateUser } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateUser(request);

    if (user instanceof NextResponse) {
      return user;
    }

    const shortlisted = await db.shortlist.findMany({
      where: {
        AND: [{ userId: user.userId }, { paid: true }],
      },
      include: {
        user: true,
        job: true,
      },
    });

    const activeContacts = shortlisted.filter((contact) => contact.job.active);

    return NextResponse.json(activeContacts);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
