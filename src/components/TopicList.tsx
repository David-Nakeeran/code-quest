import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function TopicList() {
  async function getTopics() {
    try {
      const topics = await prisma.cq_topics.findMany();

      // Cast id to number as prisma can't serialise BigInt
      // Turn into helper function later
      const safeTopics = topics.map((element) => {
        return { ...element, id: Number(element.id) };
      });

      return { success: true, topics: safeTopics };
    } catch (error) {
      let errorMessage = "Failed to fetch topics";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error(error);
      return { success: false, message: errorMessage, topics: [] };
    }
  }
  const { topics } = await getTopics();

  const topicElements = topics.map((element) => {
    return (
      <div key={element.id} className="flex flex-wrap gap-2">
        <Link
          href={`/quiz/${element.name}`}
          className="rounded-lg bg-[#2a2a2c] px-3 py-2 hover:bg-[#ce2772]"
        >
          {element.name}
        </Link>
      </div>
    );
  });
  return <>{topicElements}</>;
}
