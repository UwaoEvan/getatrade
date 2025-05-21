/*
  Warnings:

  - You are about to drop the column `userId` on the `closed` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "closed" DROP CONSTRAINT "closed_userId_fkey";

-- AlterTable
ALTER TABLE "closed" DROP COLUMN "userId";
