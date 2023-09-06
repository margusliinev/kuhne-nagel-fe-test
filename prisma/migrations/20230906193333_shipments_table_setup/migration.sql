-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'SHIPPED', 'IN_TRANSIT', 'DELIVERED');

-- CreateTable
CREATE TABLE "shipments" (
    "id" SERIAL NOT NULL,
    "orderNo" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customer" TEXT NOT NULL,
    "trackingNo" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "consignee" TEXT NOT NULL,

    CONSTRAINT "shipments_pkey" PRIMARY KEY ("id")
);
