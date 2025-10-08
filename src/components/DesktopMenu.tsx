"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DesktopMenu() {
  const pathName = usePathname();
  return (
    <>
      <Link
        href={"/dashboard"}
        className={`${
          pathName === "/dashboard" ? "underline" : "hover:underline"
        }`}
      >
        Dashboard
      </Link>
      <Link
        href={"/quiz"}
        className={`${pathName === "/quiz" ? "underline" : "hover:underline"}`}
      >
        Quiz
      </Link>
    </>
  );
}
