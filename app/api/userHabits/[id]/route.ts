import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const userId = parseInt(id);

  console.log("userID!!!!!!!!!!!", userId);

  if (isNaN(userId)) {
    return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
  }

  const habits = await prisma.habit.findMany({
    where: { userId },
  });

  return NextResponse.json(habits);
}

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { name, description } = await request.json();
    const { id } = await context.params;
    const userId = parseInt(id);

    if (!name || !userId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const newHabit = await prisma.habit.create({
      data: {
        name,
        description,
        userId: userId,
      },
    });

    return NextResponse.json(newHabit, { status: 201 });
  } catch (error) {
    console.error("Error creating habit:", error);
    return NextResponse.json(
      { error: "Failed to create habit" },
      { status: 500 }
    );
  }
}
