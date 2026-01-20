"use client";

import { Navbar } from "@/components/layout/Navbar";
import { useRouter } from "next/navigation";

export function BlogNavbar() {
  const router = useRouter();

  return (
    <Navbar
      onHistoryClick={() => router.push("/")}
      onWaitlistClick={() => router.push("/")}
    />
  );
}
