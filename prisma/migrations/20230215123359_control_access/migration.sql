/*
  Warnings:

  - The `controls` column on the `Module` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Module" DROP COLUMN "controls",
ADD COLUMN     "controls" TEXT[];
