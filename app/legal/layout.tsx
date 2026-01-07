import Link from "next/link";
import { Shield, FileText } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <div className="mx-auto pt-16">{children}</div>
      <Footer />
    </div>
  );
}
