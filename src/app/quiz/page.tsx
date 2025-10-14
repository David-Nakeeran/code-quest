import QuizManager from "@/components/QuizManager";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function QuizPage() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/sign-in");
  }
  const res = await fetch("http://localhost:3000/api/topics");

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
      <QuizManager topics={data} userId={userId} />
    </>
  );
}
