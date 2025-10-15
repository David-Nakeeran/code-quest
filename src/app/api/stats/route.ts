import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { id, level, topic, correct } = body;

  try {
    await prisma.cq_user_quiz_stats.create({
      data: {
        user_id: id,
        level: level,
        topic: topic,
        correct: correct,
        attempted: 1,
      },
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "We couldn't update quiz state. Please try again later.",
      },
      { status: 500 }
    );
  }
}
