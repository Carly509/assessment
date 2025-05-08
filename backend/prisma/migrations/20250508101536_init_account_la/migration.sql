/*
  Warnings:

  - You are about to drop the column `accountType` on the `Client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "accountType",
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'checking';
