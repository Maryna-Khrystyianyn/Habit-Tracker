import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const habitId = parseInt(id);

    if (isNaN(habitId)) {
      return NextResponse.json({ error: "Invalid habit ID" }, { status: 400 });
    }

   /*  // 1️⃣ Спочатку видаляємо всі HabitLogs для цієї звички
    await prisma.habitLog.deleteMany({
      where: { habitId },
    }); */

    // delete habit
    await prisma.habit.delete({
      where: { id: habitId },
    });

    return NextResponse.json({
      message: "Habit and logs deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting habit:", error);
    return NextResponse.json(
      { error: "Failed to delete habit" },
      { status: 500 }
    );
  }
}
