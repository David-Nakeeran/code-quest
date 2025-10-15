/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `cq_user_progress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "cq_user_progress_user_id_key" ON "cq_user_progress"("user_id");
