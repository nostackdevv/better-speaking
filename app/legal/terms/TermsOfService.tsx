"use client";
import { Mail, AlertCircle } from "lucide-react";
import { ExpandableSection } from "@/components/ui/ExpandableSection";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 pb-24">
      {/* Header */}
      <header className="max-w-4xl mx-auto px-4 pt-12">
        <div className="flex items-center justify-center gap-3">
          <div className="">
            <h1 className="text-2xl font-bold text-slate-900">
              Speechdeck Terms of Service
            </h1>
            <p className="text-sm text-slate-500 text-center">
              Last updated: January 8, 2026
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Intro Card */}
        <div className="bg-gradient-to-br from-orange-50 to-rose-50 border border-orange-200/60 rounded-2xl p-8 mb-8">
          <p className="text-slate-700 leading-relaxed mb-4">
            Welcome to Speechdeck! These Terms of Service (&quot;Terms&quot;)
            govern your use of our speech analysis service. By using Speechdeck,
            you agree to these Terms.
          </p>
          <div className="bg-white/60 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-slate-700">
              <strong>Early Stage Notice:</strong> Speechdeck is currently in
              active development. Features, limits, and functionality may change
              as we improve the service based on user feedback.
            </p>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-8 space-y-6">
          <ExpandableSection defaultOpen={true} title="1. Acceptance of Terms">
            <p className="mb-3">
              By accessing or using Speechdeck, you agree to be bound by these
              Terms and our Privacy Policy. If you don&apos;t agree, please
              don&apos;t use our service.
            </p>
            <p>
              We may modify these Terms at any time. Continued use after changes
              means you accept the updated Terms. We&apos;ll update the
              &quot;Last updated&quot; date and notify you of material changes.
            </p>
          </ExpandableSection>

          <ExpandableSection title="2. Service Description">
            <p className="mb-3">
              Speechdeck is a web-based tool that helps you improve public
              speaking by:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Analyzing audio recordings to detect filler words</li>
              <li>Providing transcripts with highlighted filler words</li>
              <li>Generating speaking statistics and clarity scores</li>
              <li>Tracking your progress over time</li>
            </ul>
            <p className="mt-4">
              Speechdeck is provided for personal improvement and practice
              purposes. We do not guarantee specific results or improvements in
              your speaking ability.
            </p>
          </ExpandableSection>

          <ExpandableSection title="3. Eligibility & Account Requirements">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">
                  Age Requirements:
                </h4>
                <p>
                  You must be at least 13 years old to use Speechdeck. If
                  you&apos;re under 18, you should have parental or guardian
                  consent.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2">
                  No Account Needed:
                </h4>
                <p>
                  Currently, Speechdeck works without requiring account
                  creation. All analysis happens in your browser session and is
                  lost on close
                </p>
              </div>
            </div>
          </ExpandableSection>

          <ExpandableSection title="4. Usage Limits & Restrictions">
            <div className="space-y-4">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-semibold text-slate-900 mb-2">
                  Current Limits:
                </h4>
                <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
                  <li>
                    <strong>10 recordings per 24 hours</strong> per user
                  </li>
                  <li>
                    <strong>5-minute maximum</strong> audio length
                  </li>
                  <li>Supported formats: audio files and live recordings</li>
                </ul>
                <p className="text-xs text-slate-600 mt-3 italic">
                  These limits may change as the service evolves. We&apos;ll
                  notify users of significant changes.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2">
                  Prohibited Uses:
                </h4>
                <p className="mb-2">You agree NOT to:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Attempt to abuse the service</li>
                  <li>Upload content that is illegal, harmful, or offensive</li>
                  <li>Upload recordings of others without their consent</li>
                  <li>Resell or redistribute our service without permission</li>
                  <li>Use the service for any unlawful purpose</li>
                </ul>
              </div>
            </div>
          </ExpandableSection>

          <ExpandableSection title="5. Your Content & Privacy">
            <div className="space-y-3">
              <p>
                <strong>Your Recordings:</strong> You retain all rights to your
                audio recordings and content. We don&apos;t claim ownership of
                what you upload.
              </p>

              <p>
                <strong>Processing Only:</strong> Your audio is processed
                temporarily to generate analysis results. We do not store your
                recordings or transcripts on our servers.
              </p>

              <p>
                <strong>Local Storage:</strong> Analysis results are saved in
                your browser&apos;s local storage on your device.
              </p>

              <div className="bg-slate-50 rounded-lg p-4 mt-3">
                <p className="text-sm">
                  For details on how we handle your data, see our{" "}
                  <Link
                    className="text-orange-600 hover:text-orange-700 font-medium"
                    href={ROUTES.legal.privacy}
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </ExpandableSection>

          <ExpandableSection title="6. Service Availability & Changes">
            <div className="space-y-3">
              <p>
                <strong>Beta Service:</strong> Speechdeck is currently in active
                development. The service is provided &quot;as available&quot;
                and may experience downtime, bugs, or changes without notice.
              </p>

              <p>
                <strong>No Uptime Guarantee:</strong> We strive for reliability
                but don&apos;t guarantee uninterrupted access. We may suspend
                service for maintenance, updates, or improvements.
              </p>

              <p>
                <strong>Feature Changes:</strong> We reserve the right to
                modify, add, or remove features at any time. We may introduce
                paid features in the future.
              </p>

              <p>
                <strong>Service Termination:</strong> We may discontinue
                Speechdeck at any time. If possible, we&apos;ll provide
                reasonable notice to users on our waitlist.
              </p>
            </div>
          </ExpandableSection>

          <ExpandableSection title="7. Accuracy & Disclaimers">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Important Disclaimer
              </h4>
              <p className="text-sm">
                Speechdeck uses AI to detect filler words and analyze speech
                patterns. While we strive for accuracy, our analysis may not be
                100% accurate and should be used as a practice tool, not a
                definitive assessment.
              </p>
            </div>

            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Analysis results are estimates and may contain errors</li>
              <li>
                Clarity scores are subjective metrics for self-improvement
              </li>
              <li>
                Results should not be used for formal assessment or professional
                evaluation
              </li>
              <li>
                We don&apos;t guarantee specific improvements in speaking skills
              </li>
              <li>Audio quality affects analysis accuracy</li>
            </ul>
          </ExpandableSection>

          <ExpandableSection title="8. Limitation of Liability">
            <div className="space-y-3">
              <p className="uppercase text-xs font-semibold text-slate-900 mb-2">
                PLEASE READ CAREFULLY:
              </p>

              <p>
                <strong>As-Is Service:</strong> Speechdeck is provided &quot;as
                is&quot; and &quot;as available&quot; without warranties of any
                kind, either express or implied.
              </p>

              <p>
                <strong>No Liability for Damages:</strong> To the maximum extent
                permitted by law, we are not liable for any indirect,
                incidental, special, consequential, or punitive damages arising
                from your use of Speechdeck.
              </p>
            </div>
          </ExpandableSection>

          <ExpandableSection title="9. Intellectual Property">
            <div className="space-y-3">
              <p>
                <strong>Our Property:</strong> Speechdeck&apos;s design, code,
                features, and branding are owned by us and protected by
                intellectual property laws.
              </p>

              <p>
                <strong>Your License:</strong> We grant you a limited,
                non-exclusive, non-transferable license to use Speechdeck for
                personal purposes in accordance with these Terms.
              </p>

              <p>
                <strong>Feedback:</strong> If you provide feedback or
                suggestions, we may use them to improve Speechdeck without
                compensation or attribution to you.
              </p>
            </div>
          </ExpandableSection>

          <ExpandableSection title="10. Future Paid Features">
            <div className="space-y-3">
              <p>
                We may introduce paid features or subscription plans in the
                future (&quot;Pro Plan&quot;). If we do:
              </p>

              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>
                  Current free features will remain available (with existing
                  limits)
                </li>
                <li>We&apos;ll clearly communicate pricing and features</li>
                <li>
                  You&apos;ll have the choice to upgrade or continue using the
                  free version
                </li>
                <li>Separate payment terms will apply to paid features</li>
              </ul>
            </div>
          </ExpandableSection>

          <ExpandableSection title="11. Termination">
            <div className="space-y-3">
              <p>
                <strong>Your Right:</strong> You can stop using Speechdeck at
                any time. Clear your browser data to remove all locally stored
                analysis results.
              </p>

              <p>
                <strong>Our Right:</strong> We may terminate or suspend your
                access if you violate these Terms, abuse the service, or for any
                other reason at our discretion.
              </p>

              <p>
                <strong>Effect of Termination:</strong> Upon termination, your
                right to use Speechdeck ends immediately. Locally stored data
                remains on your device until you clear it.
              </p>
            </div>
          </ExpandableSection>

          <ExpandableSection title="12. General Terms">
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong>Entire Agreement:</strong> These Terms and our Privacy
                Policy constitute the entire agreement between you and
                Speechdeck.
              </li>
              <li>
                <strong>Severability:</strong> If any provision is found
                unenforceable, the rest remains in effect.
              </li>
              <li>
                <strong>No Waiver:</strong> Our failure to enforce any right
                doesn&apos;t waive that right.
              </li>
              <li>
                <strong>Assignment:</strong> You can&apos;t transfer these
                Terms. We may assign them to a successor.
              </li>
              <li>
                <strong>Contact for Legal Notices:</strong> All formal notices
                should be sent to the email below.
              </li>
            </ul>
          </ExpandableSection>

          <ExpandableSection title="13. Contact Information">
            <div className="bg-slate-50 rounded-lg p-6">
              <p className="mb-4">Questions about these Terms?</p>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-500" />
                <a
                  className="text-orange-600 hover:text-orange-700 font-medium"
                  href="mailto:legal@speechdeck.app"
                >
                  legal@speechdeck.app
                </a>
              </div>
              <p className="mt-4 text-sm text-slate-500">
                <strong>Service Operator:</strong> Speechdeck
                <br />
                <strong>Location:</strong> London, United Kingdom
              </p>
            </div>
          </ExpandableSection>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center space-y-3">
          <p className="text-sm text-slate-500">
            Thank you for using Speechdeck. We&apos;re excited to help you
            improve your speaking skills!
          </p>
          <p className="text-xs text-slate-400">
            By using Speechdeck, you acknowledge that you have read and
            understood these Terms.
          </p>
        </div>
      </main>
    </div>
  );
};
