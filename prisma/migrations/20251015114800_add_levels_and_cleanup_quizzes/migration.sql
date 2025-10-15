/*
  Warnings:

  - You are about to drop the `cq_questions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cq_quizzes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."cq_questions" DROP CONSTRAINT "cq_questions_quiz_id_fkey";

-- DropTable
DROP TABLE "public"."cq_questions";

-- DropTable
DROP TABLE "public"."cq_quizzes";

-- CreateTable
CREATE TABLE "cq_levels" (
    "id" SERIAL NOT NULL,
    "level_number" INTEGER NOT NULL,
    "xp_required" INTEGER NOT NULL,

    CONSTRAINT "cq_levels_pkey" PRIMARY KEY ("id")
);
