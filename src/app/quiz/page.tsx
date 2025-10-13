import QuizManager from "@/components/QuizManager";
import TopicButton from "@/components/TopicButton";
import { TopicProps } from "@/types/types";

export default async function QuizPage() {
  const res = await fetch("http://localhost:3000/api/topics");
  console.log(res);

  if (!res.ok) {
    const { message } = await res.json();
    const displayMessage =
      res.status === 500
        ? "Something went wrong on our end. Please try again"
        : message || "Unexpected error.";
    throw new Error(displayMessage);
  }

  const { data } = await res.json();

  return (
    <>
      <QuizManager topics={data} />
    </>
  );
}
