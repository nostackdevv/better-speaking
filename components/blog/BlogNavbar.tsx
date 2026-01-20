"use client";

import { useRouter } from "next/navigation";

import { Navbar } from "@/components/layout/Navbar";

export function BlogNavbar() {
  const router = useRouter();

  return (
    <Navbar
      onHistoryClick={() => router.push("/")}
      onWaitlistClick={() => router.push("/")}
    />
  );
}
