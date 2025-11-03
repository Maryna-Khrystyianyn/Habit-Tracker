/*
  Warnings:

  - You are about to drop the column `createdAt` on the `HabitLog` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `HabitLog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "HabitLog" DROP COLUMN "createdAt",
DROP COLUMN "note",
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "completed" SET DEFAULT false;
