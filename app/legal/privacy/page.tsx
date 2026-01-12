import { PrivacyPolicyContent } from "./PrivacyPolicyContest";
import { APP_URL } from "@/lib/constants";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Speecha protects your privacy and handles your data. Your audio recordings and speech analysis data are processed securely.",
  robots: "index, follow",
  alternates: {
    canonical: `${APP_URL}/legal/privacy`,
  },
};

export default function PrivacyPage() {
  return <PrivacyPolicyContent />;
}
