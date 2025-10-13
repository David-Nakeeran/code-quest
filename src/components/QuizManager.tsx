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
};

export default function QuizManager({ topics }: QuizManagerProps) {
  const [currentTopic, setCurrentTopic] = useState("");
  const [quiz, setQuiz] = useState<QuizProps | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [userSelectedAnswer, setUserSelectedAnswer] = useState("");

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
    if (!quiz) return;
    if (quiz.correct_answer === userSelectedAnswer) {
      console.log("correct");
    } else {
      console.log("wrong");
    }
  }

  function handleClick(userSelectedAnswer: string) {
    setIsAnswered(true);
    setUserSelectedAnswer(userSelectedAnswer);
    endQuiz(userSelectedAnswer);
  }

  return (
    <>
      {topicElements}
      {quiz && (
        <QuizDisplay
          quiz={quiz}
          handleClick={handleClick}
          isAnswered={isAnswered}
        />
      )}
    </>
  );
}
