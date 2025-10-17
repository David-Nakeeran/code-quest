"use client";

import { submitStats } from "@/lib/actions/stats";
import QuizDisplay from "./QuizDisplay";
import { useState } from "react";
import { updateXP } from "@/lib/actions/progress";

type QuizProps = {
  question: string;
  options: string[];
  correct_answer: string;
  doc_link: string;
};

type QuizManagerProps = {
  quiz: QuizProps;
  userId: string;
  topic: string;
};

export default function QuizManager({ quiz, userId, topic }: QuizManagerProps) {
  const [isAnswered, setIsAnswered] = useState(false);
  const [userSelectedAnswer, setUserSelectedAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  function endQuiz(userSelectedAnswer: string) {
    if (quiz.correct_answer === userSelectedAnswer) {
      return true;
    } else {
      return false;
    }
  }

  async function handleClick(userSelectedAnswer: string) {
    setIsAnswered(true);
    setUserSelectedAnswer(userSelectedAnswer);
    const correct = endQuiz(userSelectedAnswer);
    setIsCorrect(correct);
    await submitStats(userId, "beginner", topic, correct);
    if (correct) await updateXP(userId);
  }

  return (
    <>
      {quiz && (
        <QuizDisplay
          quiz={quiz}
          handleClick={handleClick}
          isAnswered={isAnswered}
          userSelectedAnswer={userSelectedAnswer}
          isCorrect={isCorrect}
        />
      )}
    </>
  );
}
