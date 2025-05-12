-- CreateTable
CREATE TABLE "shortlist" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shortlist_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "shortlist" ADD CONSTRAINT "shortlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shortlist" ADD CONSTRAINT "shortlist_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
