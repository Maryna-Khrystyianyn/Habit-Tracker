//toggle done/undo

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const habitId = parseInt(body.habitId);

    if (!habitId) {
      return NextResponse.json({ error: "Missing habitId" }, { status: 400 });
    }

    // (00:00 — 23:59)
    const today = new Date();
    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    // exist log
    const existingLog = await prisma.habitLog.findFirst({
      where: {
        habitId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    if (existingLog) {
      //  toggle → "undo"
      await prisma.habitLog.delete({ where: { id: existingLog.id } });
      return NextResponse.json({ message: "Habit log deleted", done: false });
    } else {
      // ✅  toggle → "done"
      const newLog = await prisma.habitLog.create({
        data: {
          habitId,
        },
      });
      return NextResponse.json({ message: "Habit log created", done: true, log: newLog });
    }

  } catch (err) {
    console.error("Error in POST /api/habitlogs:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}