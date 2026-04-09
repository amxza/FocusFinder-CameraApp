-- CreateEnum
CREATE TYPE "Photoscope" AS ENUM ('ASTROPHOTOGRAPHY', 'PORTRAIT', 'LANDSCAPE', 'STREET', 'SPORTS');

-- CreateEnum
CREATE TYPE "Condition" AS ENUM ('NEW', 'USED_EXCELLENT', 'USED_GOOD', 'USED_FAIR');

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SearchSession" (
    "id" TEXT NOT NULL,
    "targetScope" "Photoscope" NOT NULL,
    "preferredBrand" TEXT,
    "preferredMount" TEXT,
    "maxBudget" DOUBLE PRECISION NOT NULL,
    "isBeginner" BOOLEAN NOT NULL,
    "prefferedQuality" "Condition",
    "customerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SearchSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_username_key" ON "Customer"("username");

-- AddForeignKey
ALTER TABLE "SearchSession" ADD CONSTRAINT "SearchSession_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
