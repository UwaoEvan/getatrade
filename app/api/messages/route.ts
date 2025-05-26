import { db } from "@/app/lib/db";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const otherUserId = searchParams.get("otherUserId");

    if (!userId || !otherUserId) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 },
      );
    }

    const messages = await db.message.findMany({
      where: {
        OR: [
          { senderId: parseInt(userId), receiverId: parseInt(otherUserId) },
          { senderId: parseInt(otherUserId), receiverId: parseInt(userId) },
        ],
      },
      include: {
        sender: true,
        receiver: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { content, senderId, receiverId } = await request.json();

    if (!content || !senderId || !receiverId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const message = await db.message.create({
      data: {
        content,
        senderId,
        receiverId,
      },
      include: {
        sender: true,
        receiver: true,
      },
    });

    return NextResponse.json(message);
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}
