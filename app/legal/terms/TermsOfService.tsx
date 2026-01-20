'use client';
import { Mail, AlertCircle } from 'lucide-react';
import Link from 'next/link';

import { ExpandableSection } from '@/components/ui/ExpandableSection';
import { ROUTES } from '@/lib/routes';

export const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 pb-24">
      {/* Header */}
      <header className="mx-auto max-w-4xl px-4 pt-12">
        <div className="flex items-center justify-center gap-3">
          <div className="">
            <h1 className="text-2xl font-bold text-slate-900">
              Speecha Terms of Service
            </h1>
            <p className="text-center text-sm text-slate-500">
              Last updated: January 8, 2026
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-4 py-8">
        {/* Intro Card */}
        <div className="mb-8 rounded-2xl border border-orange-200/60 bg-gradient-to-br from-orange-50 to-rose-50 p-8">
          <p className="mb-4 leading-relaxed text-slate-700">
            Welcome to Speecha! These Terms of Service (&quot;Terms&quot;)
            govern your use of our speech analysis service. By using Speecha,
            you agree to these Terms.
          </p>
          <div className="flex items-start gap-3 rounded-lg bg-white/60 p-4">
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-500" />
            <p className="text-sm text-slate-700">
              <strong>Early Stage Notice:</strong> Speecha is currently in
              active development. Features, limits, and functionality may change
              as we improve the service based on user feedback.
            </p>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="space-y-6 rounded-2xl border border-slate-200/60 bg-white p-8 shadow-sm">
          <ExpandableSection
            defaultOpen={true}
            id="acceptance"
            title="1. Acceptance of Terms"
          >
            <p className="mb-3">
              By accessing or using Speecha, you agree to be bound by these
              Terms and our Privacy Policy. If you don&apos;t agree, please
              don&apos;t use our service.
            </p>
            <p>
              We may modify these Terms at any time. Continued use after changes
              means you accept the updated Terms. We&apos;ll update the
              &quot;Last updated&quot; date and notify you of material changes.
            </p>
          </ExpandableSection>

          <ExpandableSection
            id="service-description"
            title="2. Service Description"
          >
            <p className="mb-3">
              Speecha is a web-based tool that helps you improve public speaking
              by:
            </p>
            <ul className="ml-2 list-inside list-disc space-y-2">
              <li>Analyzing audio recordings to detect filler words</li>
              <li>Providing transcripts with highlighted filler words</li>
              <li>Generating speaking statistics and clarity scores</li>
              <li>Tracking your progress over time</li>
            </ul>
            <p className="mt-4">
              Speecha is provided for personal improvement and practice
              purposes. We do not guarantee specific results or improvements in
              your speaking ability.
            </p>
          </ExpandableSection>

          <ExpandableSection
            id="eligibility"
            title="3. Eligibility & Account Requirements"
          >
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 font-semibold text-slate-900">
                  Age Requirements:
                </h4>
                <p>
                  You must be at least 13 years old to use Speecha. If
                  you&apos;re under 18, you should have parental or guardian
                  consent.
                </p>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-slate-900">
                  No Account Needed:
                </h4>
                <p>
                  Currently, Speecha works without requiring account creation.
                  All analysis happens in your browser session and is lost on
                  close
                </p>
              </div>
            </div>
          </ExpandableSection>

          <ExpandableSection
            id="usage-limits"
            title="4. Usage Limits & Restrictions"
          >
            <div className="space-y-4">
              <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                <h4 className="mb-2 font-semibold text-slate-900">
                  Current Limits:
                </h4>
                <ul className="ml-2 list-inside list-disc space-y-1 text-sm">
                  <li>
                    <strong>10 recordings per 24 hours</strong> per user
                  </li>
                  <li>
                    <strong>5-minute maximum</strong> audio length
                  </li>
                  <li>Supported formats: audio files and live recordings</li>
                </ul>
                <p className="mt-3 text-xs text-slate-600 italic">
                  These limits may change as the service evolves. We&apos;ll
                  notify users of significant changes.
                </p>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-slate-900">
                  Prohibited Uses:
                </h4>
                <p className="mb-2">You agree NOT to:</p>
                <ul className="ml-2 list-inside list-disc space-y-1">
                  <li>Attempt to abuse the service</li>
                  <li>Upload content that is illegal, harmful, or offensive</li>
                  <li>Upload recordings of others without their consent</li>
                  <li>Resell or redistribute our service without permission</li>
                  <li>Use the service for any unlawful purpose</li>
                </ul>
              </div>
            </div>
          </ExpandableSection>

          <ExpandableSection
            id="content-privacy"
            title="5. Your Content & Privacy"
          >
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

              <div className="mt-3 rounded-lg bg-slate-50 p-4">
                <p className="text-sm">
                  For details on how we handle your data, see our{' '}
                  <Link
                    className="font-medium text-orange-600 hover:text-orange-700"
                    href={ROUTES.legal.privacy}
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </ExpandableSection>

          <ExpandableSection
            id="service-availability"
            title="6. Service Availability & Changes"
          >
            <div className="space-y-3">
              <p>
                <strong>Beta Service:</strong> Speecha is currently in active
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
                <strong>Service Termination:</strong> We may discontinue Speecha
                at any time. If possible, we&apos;ll provide reasonable notice
                to users on our waitlist.
              </p>
            </div>
          </ExpandableSection>

          <ExpandableSection id="disclaimers" title="7. Accuracy & Disclaimers">
            <div className="mb-4 rounded-lg border border-orange-200 bg-orange-50 p-4">
              <h4 className="mb-2 flex items-center gap-2 font-semibold text-slate-900">
                <AlertCircle className="h-4 w-4" />
                Important Disclaimer
              </h4>
              <p className="text-sm">
                Speecha uses AI to detect filler words and analyze speech
                patterns. While we strive for accuracy, our analysis may not be
                100% accurate and should be used as a practice tool, not a
                definitive assessment.
              </p>
            </div>

            <ul className="ml-2 list-inside list-disc space-y-2">
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

          <ExpandableSection id="liability" title="8. Limitation of Liability">
            <div className="space-y-3">
              <p className="mb-2 text-xs font-semibold text-slate-900 uppercase">
                PLEASE READ CAREFULLY:
              </p>

              <p>
                <strong>As-Is Service:</strong> Speecha is provided &quot;as
                is&quot; and &quot;as available&quot; without warranties of any
                kind, either express or implied.
              </p>

              <p>
                <strong>No Liability for Damages:</strong> To the maximum extent
                permitted by law, we are not liable for any indirect,
                incidental, special, consequential, or punitive damages arising
                from your use of Speecha.
              </p>
            </div>
          </ExpandableSection>

          <ExpandableSection
            id="intellectual-property"
            title="9. Intellectual Property"
          >
            <div className="space-y-3">
              <p>
                <strong>Our Property:</strong> Speecha&apos;s design, code,
                features, and branding are owned by us and protected by
                intellectual property laws.
              </p>

              <p>
                <strong>Your License:</strong> We grant you a limited,
                non-exclusive, non-transferable license to use Speecha for
                personal purposes in accordance with these Terms.
              </p>

              <p>
                <strong>Feedback:</strong> If you provide feedback or
                suggestions, we may use them to improve Speecha without
                compensation or attribution to you.
              </p>
            </div>
          </ExpandableSection>

          <ExpandableSection
            id="paid-features"
            title="10. Future Paid Features"
          >
            <div className="space-y-3">
              <p>
                We may introduce paid features or subscription plans in the
                future (&quot;Pro Plan&quot;). If we do:
              </p>

              <ul className="ml-2 list-inside list-disc space-y-2">
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

          <ExpandableSection id="termination" title="11. Termination">
            <div className="space-y-3">
              <p>
                <strong>Your Right:</strong> You can stop using Speecha at any
                time. Clear your browser data to remove all locally stored
                analysis results.
              </p>

              <p>
                <strong>Our Right:</strong> We may terminate or suspend your
                access if you violate these Terms, abuse the service, or for any
                other reason at our discretion.
              </p>

              <p>
                <strong>Effect of Termination:</strong> Upon termination, your
                right to use Speecha ends immediately. Locally stored data
                remains on your device until you clear it.
              </p>
            </div>
          </ExpandableSection>

          <ExpandableSection id="general-terms" title="12. General Terms">
            <ul className="ml-2 list-inside list-disc space-y-2">
              <li>
                <strong>Entire Agreement:</strong> These Terms and our Privacy
                Policy constitute the entire agreement between you and Speecha.
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

          <ExpandableSection id="contact" title="13. Contact Information">
            <div className="rounded-lg bg-slate-50 p-6">
              <p className="mb-4">Questions about these Terms?</p>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-orange-500" />
                <a
                  className="font-medium text-orange-600 hover:text-orange-700"
                  href="mailto:legal@speecha.app"
                >
                  legal@speecha.app
                </a>
              </div>
              <p className="mt-4 text-sm text-slate-500">
                <strong>Service Operator:</strong> Speecha
                <br />
                <strong>Location:</strong> London, United Kingdom
              </p>
            </div>
          </ExpandableSection>
        </div>

        {/* Footer Note */}
        <div className="mt-8 space-y-3 text-center">
          <p className="text-sm text-slate-500">
            Thank you for using Speecha. We&apos;re excited to help you improve
            your speaking skills!
          </p>
          <p className="text-xs text-slate-400">
            By using Speecha, you acknowledge that you have read and understood
            these Terms.
          </p>
        </div>
      </main>
    </div>
  );
};
