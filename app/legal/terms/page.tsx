import { APP_URL } from "@/lib/constants";

import { TermsOfService } from "./TermsOfService";

export const metadata = {
  title: "Terms of Service",
  description:
    "Read Speecha's Terms of Service. Understand the rules and guidelines for using Speecha's public speaking improvement tools.",
  robots: "index, follow",
  alternates: {
    canonical: `${APP_URL}/legal/terms`,
  },
};

export default function TermsOfServicePage() {
  return <TermsOfService />;
}
