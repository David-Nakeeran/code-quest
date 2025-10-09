import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const topics = await prisma.cq_topics.findMany();

    // Cast id to number as prisma can't serialise BigInt
    // Turn into helper function later
    const safeTopics = topics.map((element) => {
      return { ...element, id: Number(element.id) };
    });

    return NextResponse.json(
      {
        success: true,
        data: safeTopics,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message:
          "We couldn't fetch the quiz topics at the moment. Please try again later.",
      },
      { status: 500 }
    );
  }
}
