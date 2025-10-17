"use server";

import prisma from "../prisma";

async function findUserById(id: string) {
  try {
    const user = await prisma.cq_users.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  } catch (error) {
    console.error("Database error while finding user:", error);
    throw error;
  }
}

export async function createUser(id: string) {
  try {
    const existingUser = await findUserById(id);

    if (existingUser) {
      return;
    }

    await prisma.cq_users.create({
      data: {
        id: id,
      },
    });

    await prisma.cq_user_progress.create({
      data: {
        user_id: id,
      },
    });

    return;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message:
        "We couldn't create your account right now. Please try again later.",
    };
  }
}
