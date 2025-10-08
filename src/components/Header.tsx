"use client";
import Link from "next/link";
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Code } from "lucide-react";
import LoggedInUserNav from "./LoggedInUserNav";

export default function Header() {
  return (
    <header className="mb-8">
      <nav className="flex justify-between">
        <Link href={"/"} className="flex gap-1 items-center">
          <Code size={24} className="text-[#b388ff]" />
          <p className="text-2xl text-[#b388ff]">Code Quest</p>
        </Link>
        <div className="flex justify-between gap-4">
          <SignedOut>
            <SignInButton mode="modal" />
            <SignUpButton mode="modal" />
          </SignedOut>
          <SignedIn>
            <LoggedInUserNav />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
