"use server";

import prisma from "../prisma";

export async function submitStats(
  id: string,
  level: string,
  topic: string,
  correct: boolean
) {
  try {
    await prisma.cq_user_quiz_stats.create({
      data: {
        user_id: id,
        level: level,
        topic: topic,
        correct: correct ? 1 : 0,
        attempted: 1,
      },
    });
    return { success: true };
  } catch (error) {
    let errorMessage = "We couldn't update quiz state. Please try again later.";
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
