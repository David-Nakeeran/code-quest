import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { id } = body;

  const existingUser = await findUserById(id);

  if (existingUser) {
    return NextResponse.json({ exists: true });
  }

  try {
    await prisma.cq_users.create({
      data: {
        id: id,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message:
          "We couldn't create your account right now. Please try again later.",
      },
      { status: 500 }
    );
  }
}
