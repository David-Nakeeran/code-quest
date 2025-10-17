import TopicList from "@/components/TopicList";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function QuizPage() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  return (
    <section>
      <h1>Choose a topic</h1>
      <TopicList />
    </section>
  );
}
