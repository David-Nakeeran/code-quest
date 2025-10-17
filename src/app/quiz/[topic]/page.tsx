import QuizManager from "@/components/QuizManager";
import TopicList from "@/components/TopicList";
import { getQuizForTopic } from "@/lib/actions/quizzes";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function TopicQuizPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  const { topic } = await params;

  const { data } = await getQuizForTopic(topic);
  console.log(data);

  return (
    <section>
      <TopicList />
      <QuizManager quiz={data} userId={userId} topic={topic} />
    </section>
  );
}
