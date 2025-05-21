-- CreateTable
CREATE TABLE "closed" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "closedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "closed_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "closed" ADD CONSTRAINT "closed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "closed" ADD CONSTRAINT "closed_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
