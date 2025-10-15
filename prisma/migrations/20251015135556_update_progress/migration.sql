/*
  Warnings:

  - Made the column `xp` on table `cq_user_progress` required. This step will fail if there are existing NULL values in that column.
  - Made the column `level` on table `cq_user_progress` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "cq_user_progress" ALTER COLUMN "xp" SET NOT NULL,
ALTER COLUMN "level" SET NOT NULL;
