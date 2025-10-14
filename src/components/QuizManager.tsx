"use client";

import { TopicProps } from "@/types/types";
import TopicButton from "./TopicButton";
import QuizDisplay from "./QuizDisplay";
import { useEffect, useState } from "react";

type QuizProps = {
  question: string;
  options: [];
  correct_answer: string;
  doc_link: string;
};

type QuizManagerProps = {
  topics: TopicProps[];
  userId: string;
};

export default function QuizManager({ topics, userId }: QuizManagerProps) {
  const [currentTopic, setCurrentTopic] = useState("");
  const [quiz, setQuiz] = useState<QuizProps | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [userSelectedAnswer, setUserSelectedAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    async function fetchTopicQuiz() {
      const res = await fetch("http://localhost:3000/api/quizzes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: currentTopic }),
      });
      const { data } = await res.json();
      const quiz = JSON.parse(data);
      setQuiz(quiz);
    }
    if (!currentTopic) return;
    fetchTopicQuiz();
  }, [currentTopic]);

  const topicElements = topics.map((element: TopicProps) => {
    return (
      <TopicButton
        key={element.id}
        name={element.name}
        handleTopicChange={handleTopicChange}
      />
    );
  });

  function handleTopicChange(topic: string) {
    setQuiz(null);
    setIsAnswered(false);
    setUserSelectedAnswer("");
    setCurrentTopic(topic);
  }

  function endQuiz(userSelectedAnswer: string) {
    if (!quiz) return false;
    if (quiz.correct_answer === userSelectedAnswer) {
      return true;
    } else {
      return false;
    }
  }

  function handleClick(userSelectedAnswer: string) {
    setIsAnswered(true);
    setUserSelectedAnswer(userSelectedAnswer);
    const correct = endQuiz(userSelectedAnswer);
    setIsCorrect(correct);
    submitStats(correct);
  }

  async function submitStats(correct: boolean) {
    try {
      const res = await fetch("http://localhost:3000/api/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: userId,
          level: "beginner",
          topic: currentTopic,
          correct: correct ? 1 : 0,
        }),
      });

      if (!res.ok) {
        const { message } = await res.json();
        const displayMessage =
          res.status === 500 ? message : "Unexpected error.";
        throw new Error(displayMessage);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {topicElements}
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
