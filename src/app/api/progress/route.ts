import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

async function getUserProgress(id: string) {
  try {
    const userProgress = await prisma.cq_user_progress.findUnique({
      where: {
        user_id: id,
      },
    });
    return userProgress;
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { id } = body;
  const userProgress = await getUserProgress(id);

  if (!userProgress) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  userProgress.xp += 25;

  const xpLevels = await prisma.cq_levels.findMany({
    orderBy: { xp_required: "asc" },
  });

  const newLevelNumber = xpLevels.findLast(
    (element) => element.xp_required <= userProgress.xp
  );

  const userUpdatedProgress = await prisma.cq_user_progress.update({
    where: {
      user_id: id,
    },
    data: {
      xp: userProgress.xp,
      level: newLevelNumber?.level_number,
    },
  });

  return NextResponse.json(
    { success: true, data: userUpdatedProgress },
    { status: 200 }
  );
}
