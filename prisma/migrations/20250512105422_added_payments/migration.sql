/*
  Warnings:

  - Added the required column `jobId` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "jobId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "shortlist" ADD COLUMN     "paid" BOOLEAN DEFAULT false;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
