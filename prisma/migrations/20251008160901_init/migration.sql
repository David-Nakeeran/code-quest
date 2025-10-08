-- CreateTable
CREATE TABLE "cq_questions" (
    "id" BIGSERIAL NOT NULL,
    "question_text" TEXT NOT NULL,
    "options" JSONB NOT NULL,
    "correct_answer" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "quiz_id" BIGINT NOT NULL,

    CONSTRAINT "cq_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cq_quizzes" (
    "id" BIGSERIAL NOT NULL,
    "topic" TEXT NOT NULL,
    "ai_generated" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cq_quizzes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cq_user_progress" (
    "id" BIGSERIAL NOT NULL,
    "xp" INTEGER DEFAULT 0,
    "level" INTEGER DEFAULT 1,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "cq_user_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cq_users" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cq_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cq_topics" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "cq_topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cq_user_quiz_stats" (
    "id" BIGSERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "correct" INTEGER NOT NULL DEFAULT 0,
    "attempted" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "cq_user_quiz_stats_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cq_questions" ADD CONSTRAINT "cq_questions_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "cq_quizzes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cq_user_progress" ADD CONSTRAINT "cq_user_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "cq_users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cq_user_quiz_stats" ADD CONSTRAINT "cq_user_quiz_stats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "cq_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
