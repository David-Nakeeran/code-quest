"use server";

import prisma from "../prisma";

export async function updateXP(id: string) {
  const XP_INCREMENT = 25;

  try {
    await prisma.cq_user_progress.update({
      where: {
        user_id: id,
      },
      data: {
        xp: { increment: XP_INCREMENT },
      },
    });

    const userProgress = await prisma.cq_user_progress.findUnique({
      where: { user_id: id },
    });

    if (!userProgress) {
      return { success: false, message: "No user found" };
    }

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

    return {
      success: true,
      data: {
        ...userUpdatedProgress,
        id: userUpdatedProgress.id.toString(), // convert BigInt
        user_id: userUpdatedProgress.user_id,
        xp: userUpdatedProgress.xp,
        level: userUpdatedProgress.level,
      },
    };
  } catch (error) {
    let errorMessage =
      "We couldn't update user progress. Please try again later.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error(errorMessage);
    return {
      success: false,
      message: errorMessage,
    };
  }
}
