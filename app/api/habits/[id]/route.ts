import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }  // 👈 Додай Promise тут
) {
  const { id } = await context.params; // 👈 І await тут
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