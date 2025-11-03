import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const habitId = parseInt(searchParams.get("habitId") || "");
 

  if (!habitId) {
    return NextResponse.json({ error: "Missing habitId" }, { status: 400 });
  }

  //start-end of the day
  const today = new Date();
  const startOfDay = new Date(today);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);

  // is in  HabitLog?
  const existingLog = await prisma.habitLog.findFirst({
    where: {
      habitId,
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });

  return NextResponse.json({ done: !!existingLog });
}