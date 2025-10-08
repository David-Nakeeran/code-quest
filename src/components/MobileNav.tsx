"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false);

  return (
    <div>
      <button
        onClick={handleClick}
        className="flex flex-col justify-center items-center w-8 h-8 cursor-pointer"
      >
        <span
          className={`bg-[#b388ff] block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
            isOpen ? "rotate-45 translate-y-1.5" : "-translate-y-1.5"
          }`}
        ></span>
        <span
          className={`bg-[#b388ff] block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-1 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        ></span>
        <span
          className={`bg-[#b388ff] block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
            isOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-1.5"
          }`}
        ></span>
      </button>

      <div
        className={`fixed top-0 right-0 h-screen w-full bg-[#2a2a2c]/95 backdrop-blur-md shadow-lg p-6 flex flex-col items-center gap-4 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }
        `}
      >
        <button
          onClick={closeMenu}
          className="self-end text-[#b388ff] font-bold text-3xl"
        >
          x
        </button>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <Link
          href={"/dashboard"}
          className="font-medium hover:underline"
          onClick={closeMenu}
        >
          Dashboard
        </Link>
        <Link
          href={"/quiz"}
          className="font-medium hover:underline"
          onClick={closeMenu}
        >
          Quiz
        </Link>
      </div>
    </div>
  );
}
