"use client";
import { Mail } from "lucide-react";
import { ExpandableSection } from "@/components/ui/ExpandableSection";

export function PrivacyPolicyContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 pb-24">
      {/* Header */}
      <header className="max-w-4xl mx-auto px-4 pt-12">
        <div className="flex items-center justify-center gap-3">
          <div className="">
            <h1 className="text-2xl font-bold text-slate-900">
              Speecha Privacy Notice
            </h1>
            <p className="text-sm text-slate-500 text-center">
              Last updated: January 7, 2026
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Intro Card */}
        <div className="bg-gradient-to-br from-orange-50 to-rose-50 border border-orange-200/60 rounded-2xl p-8 mb-8">
          <p className="text-slate-700 leading-relaxed">
            Speecha app (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;)
            is committed to protecting your privacy. This policy explains how we
            handle your information when you use our speech analysis service.
            We&#39;ve designed our service with privacy in mind. We don&#39;t
            store your recordings or transcripts.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-8 space-y-6">
          <ExpandableSection
            defaultOpen={true}
            id="information-we-collect"
            title="1. Information We Collect"
          >
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">
                  Information You Provide:
                </h4>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>
                    <strong>Email addresses</strong> if you join our waitlist
                  </li>
                  <li>
                    <strong>Feedback messages</strong> if you submit feedback
                    through our form
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2">
                  Audio & Analysis Data:
                </h4>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>
                    <strong>Audio recordings</strong> you upload or record
                    (processed temporarily, never stored)
                  </li>
                  <li>
                    <strong>Transcripts and analysis results</strong> (generated
                    in your browser session only)
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2">
                  Analytics Data:
                </h4>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>
                    Usage patterns, button clicks, and feature interactions
                  </li>
                  <li>Session data to understand how you use our app</li>
                </ul>
              </div>
            </div>
          </ExpandableSection>

          <ExpandableSection id="how-we-use-your-information" title="2. How We Use Your Information">
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong>To provide our service:</strong> Process your audio to
                detect filler words and generate analysis
              </li>
              <li>
                <strong>To communicate:</strong> Send waitlist updates and
                respond to your feedback
              </li>
              <li>
                <strong>To improve:</strong> Understand how people use
                Speecha and identify areas for improvement
              </li>
              <li>
                <strong>To develop features:</strong> Analytics help us
                prioritize new features and fix bugs
              </li>
            </ul>
          </ExpandableSection>

          <ExpandableSection id="third-party-services" title="3. Third-Party Services">
            <p className="mb-4">
              To provide our service, we share your data temporarily with
              trusted third-party providers. These services process your data
              under strict agreements and security standards:
            </p>

            <div className="space-y-3">
              <div className="bg-slate-50 rounded-lg p-4">
                <h4 className="font-semibold text-slate-900 mb-1">
                  Speech Recognition Services
                </h4>
                <p className="text-sm">
                  Process your audio to convert speech to text. Your audio is
                  transmitted securely and is not stored by these providers.
                </p>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <h4 className="font-semibold text-slate-900 mb-1">
                  AI Analysis Services
                </h4>
                <p className="text-sm">
                  Analyze transcripts to identify filler words and speech
                  patterns. Transcripts are processed temporarily and not
                  retained.
                </p>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <h4 className="font-semibold text-slate-900 mb-1">
                  Analytics Providers
                </h4>
                <p className="text-sm">
                  Help us understand usage patterns and improve the product. We
                  use PostHog for privacy-focused analytics.
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm italic">
              For a complete list of specific sub-processors, please contact us
              at the email below.
            </p>
          </ExpandableSection>

          <ExpandableSection id="data-retention" title="4. Data Retention & Your Rights">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">
                  What We Store:
                </h4>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>
                    <strong>Waitlist emails:</strong> Until you unsubscribe or
                    we launch
                  </li>
                  <li>
                    <strong>Feedback messages:</strong> Retained for product
                    improvement purposes
                  </li>
                  <li>
                    <strong>Analytics data:</strong> Retained for up to 24
                    months
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2">
                  What We Don&apos;t Store:
                </h4>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Your audio recordings</li>
                  <li>Your transcripts or analysis results</li>
                  <li>Any speech content from your sessions</li>
                </ul>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-4">
                <h4 className="font-semibold text-slate-900 mb-2">
                  Your Rights (GDPR):
                </h4>
                <p className="text-sm mb-2">
                  As a UK-based service, you have the right to:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to data processing</li>
                  <li>Request data portability</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </div>
            </div>
          </ExpandableSection>

          <ExpandableSection id="data-security" title="5. Data Security">
            <p className="mb-3">
              We take reasonable measures to protect your information:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                All data transmission uses industry-standard encryption
                (HTTPS/TLS)
              </li>
              <li>
                Audio processing happens in real-time without permanent storage
              </li>
              <li>Analysis results exist only in your browser session</li>
              <li>Limited data collection minimizes risk</li>
              <li>
                Third-party services are vetted for security and compliance
              </li>
            </ul>
            <p className="mt-3 text-sm italic">
              No method of transmission over the internet is 100% secure. While
              we strive to protect your data, we cannot guarantee absolute
              security.
            </p>
          </ExpandableSection>

          {/* <ExpandableSection title="6. Children's Privacy">
            <p className="mb-2">
              Speecha is not intended for children under 13 years of age. We
              do not knowingly collect personal information from children under
              13.
            </p>
            <p>
              If you are a parent or guardian and believe your child has
              provided us with personal information, please contact us
              immediately, and we will delete such information.
            </p>
          </ExpandableSection> */}

          <ExpandableSection id="international-data-transfers" title="6. International Data Transfers">
            <p className="mb-2">
              Your data may be processed in countries outside the UK, including
              the United States, where our third-party service providers
              operate.
            </p>
            <p>
              We ensure appropriate safeguards are in place, such as Standard
              Contractual Clauses (SCCs) or equivalent mechanisms, to protect
              your data in accordance with UK GDPR requirements.
            </p>
          </ExpandableSection>

          <ExpandableSection id="cookies" title="7. Cookies & Tracking">
            <p className="mb-3">
              We use minimal cookies and tracking technologies:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong>Essential cookies:</strong> Required for the site to
                function
              </li>
              <li>
                <strong>Analytics cookies:</strong> Used by PostHog to
                understand usage (you can opt out)
              </li>
            </ul>
            <p className="mt-3">
              We do not use advertising cookies or sell your data to third
              parties.
            </p>
          </ExpandableSection>

          <ExpandableSection id="changes" title="8. Changes to This Policy">
            <p className="mb-2">
              We may update this Privacy Policy from time to time. When we do,
              we will:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Update the &quot;Last updated&quot; date at the top</li>
              <li>
                Notify you via email if you&apos;re on our waitlist (for
                material changes)
              </li>
              <li>Post a notice on our website</li>
            </ul>
            <p className="mt-3">
              Continued use of Speecha after changes constitutes acceptance
              of the updated policy.
            </p>
          </ExpandableSection>

          <ExpandableSection id="contact" title="9. Contact Us">
            <div className="bg-slate-50 rounded-lg p-6">
              <p className="mb-4">
                If you have any questions about this Privacy Policy, want to
                exercise your rights, or need to contact us for any reason:
              </p>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-500" />
                <a
                  className="text-orange-600 hover:text-orange-700 font-medium"
                  href="mailto:privacy@speecha.app"
                >
                  privacy@speecha.app
                </a>
              </div>
              <p className="mt-4 text-sm text-slate-500">
                <strong>Data Controller:</strong> Speecha app
                <br />
                <strong>Jurisdiction:</strong> United Kingdom
              </p>
            </div>
          </ExpandableSection>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            If you have any questions, please reach out. We&#39;re happy to
            help.
          </p>
        </div>
      </main>
    </div>
  );
}
