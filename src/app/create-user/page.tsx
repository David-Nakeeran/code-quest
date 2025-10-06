import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function CreateUserPage() {
  const { userId } = await auth();

  const res = await fetch("http://localhost:3000/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: userId }),
  });

  if (!res.ok) {
    const { message } = await res.json();
    const displayMessage =
      res.status === 500
        ? "Something went wrong on our end. Please try again"
        : message || "Unexpected error.";
    throw new Error(displayMessage);
  }

  redirect("/dashboard");
}
