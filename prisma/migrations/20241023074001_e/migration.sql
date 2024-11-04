-- CreateTable
CREATE TABLE "AllServices" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "features" TEXT[],
    "threeDModelPath" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AllServices_pkey" PRIMARY KEY ("id")
);
