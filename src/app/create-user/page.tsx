import { createUser } from "@/lib/actions/users";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function CreateUserPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  await createUser(userId);

  redirect("/dashboard");
}
