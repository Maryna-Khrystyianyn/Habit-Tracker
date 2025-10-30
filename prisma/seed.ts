import { PrismaClient} from "../app/generated/prisma/client";

const prisma = new PrismaClient

async function main() {
  console.log("Seeding database...");

  // Zwei Users
  const user1 = await prisma.user.create({
    data: {
      name: "Maryna",
      email: "maryna@example.com",
      password: "password123",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Andrii",
      email: "andrii@example.com",
      password: "password123",
    },
  });

  // Habits für Maryna
  const drinkWater = await prisma.habit.create({
    data: {
      name: "Drink 2L of water",
      description: "Stay hydrated every day",
      userId: user1.id,
    },
  });

  const morningWalk = await prisma.habit.create({
    data: {
      name: "Morning walk",
      description: "30-minute walk to start the day",
      userId: user1.id,
    },
  });

  // Habits für Andrii
  const readBook = await prisma.habit.create({
    data: {
      name: "Read a book",
      description: "Read 20 pages daily",
      userId: user2.id,
    },
  });

  const meditate = await prisma.habit.create({
    data: {
      name: "Meditate",
      description: "10 minutes of mindfulness meditation",
      userId: user2.id,
    },
  });

  // === Habit Logs 7 Tage===
  const today = new Date();
  const days = [...Array(7)].map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    return d;
  });

  for (const date of days) {
    await prisma.habitLog.createMany({
      data: [
        { habitId: drinkWater.id, date, completed: Math.random() > 0.2 },
        { habitId: morningWalk.id, date, completed: Math.random() > 0.5 },
        { habitId: readBook.id, date, completed: Math.random() > 0.1 },
        { habitId: meditate.id, date, completed: Math.random() > 0.25 },
      ],
    });
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });