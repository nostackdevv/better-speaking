import Image from 'next/image';

const CheckIcon = () => (
  <span className="bg-clarity-50 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full">
    <svg
      className="text-clarity h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      viewBox="0 0 24 24"
    >
      <path
        d="M4.5 12.75l6 6 9-13.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

export const FeaturesSection = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="fade-up mb-16 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Everything you need to
            <br />
            speak with clarity
          </h2>
        </div>

        {/* Feature 1 — Personalized */}
        <div className="fade-up mb-20 grid items-center gap-12 md:mb-32 md:grid-cols-2 md:gap-16">
          <div className="phone-frame mx-auto w-[240px] md:mx-0">
            <Image
              alt="Choose which filler words to track"
              height={480}
              src="/landing/FILLERS.png"
              width={240}
            />
          </div>
          <div>
            <div className="bg-momentum-50 text-momentum-600 mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-bold">
              Personalized
            </div>
            <h3 className="mb-4 text-2xl font-extrabold md:text-3xl">
              Choose your fillers
            </h3>
            <p className="text-grey-500 mb-6 text-lg leading-relaxed font-medium">
              Pick the exact words you want to eliminate from &ldquo;um&rdquo;
              and &ldquo;uh&rdquo; to &ldquo;like,&rdquo; &ldquo;you
              know,&rdquo; and &ldquo;actually.&rdquo; Add custom fillers that
              are unique to your speech patterns.
            </p>
            <ul className="space-y-3">
              <li className="text-grey-600 flex items-center gap-3 font-semibold">
                <CheckIcon />
                Vocal fillers: um, uh, er, hmm, ah
              </li>
              <li className="text-grey-600 flex items-center gap-3 font-semibold">
                <CheckIcon />
                Filler words: like, so, you know, actually
              </li>
              <li className="text-grey-600 flex items-center gap-3 font-semibold">
                <CheckIcon />
                Add your own custom filler words
              </li>
            </ul>
          </div>
        </div>

        {/* Feature 2 — AI-Powered */}
        <div className="fade-up mb-20 grid items-center gap-12 md:mb-32 md:grid-cols-2 md:gap-16">
          <div className="order-2 md:order-1">
            <div className="bg-clarity-50 text-clarity-700 mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-bold">
              Instant Feedback
            </div>
            <h3 className="mb-4 text-2xl font-extrabold md:text-3xl">
              See your clarity score
            </h3>
            <p className="text-grey-500 mb-6 text-lg leading-relaxed font-medium">
              After each session, get a detailed breakdown of your speaking
              performance. Your clarity score measures how clean your speech is
              from filler words, track it daily to see real improvement.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-100 rounded-2xl p-5 text-center">
                <div className="text-grey-900 mb-1 text-2xl font-extrabold">
                  80%
                </div>
                <div className="text-grey-400 text-sm font-bold tracking-wide uppercase">
                  Clarity Score
                </div>
              </div>
              <div className="bg-surface-100 rounded-2xl p-5 text-center">
                <div className="text-grey-900 mb-1 text-2xl font-extrabold">
                  2/min
                </div>
                <div className="text-grey-400 text-sm font-bold tracking-wide uppercase">
                  Filler Rate
                </div>
              </div>
            </div>
          </div>
          <div className="phone-frame order-1 mx-auto w-[240px] md:order-2">
            <Image
              alt="Session results with clarity score and filler breakdown"
              height={480}
              src="/landing/RESULT.png"
              width={240}
            />
          </div>
        </div>

        {/* Feature 3 — Habit Building */}
        <div className="fade-up grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div className="phone-frame mx-auto w-[240px] md:mx-0">
            <Image
              alt="How Speecha works explanation"
              height={480}
              src="/landing/HOW-SPEECHA-WORKS.png"
              width={240}
            />
          </div>
          <div>
            <div className="bg-clarity-50 text-clarity-700 mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-bold">
              Habit Building
            </div>
            <h3 className="mb-4 text-2xl font-extrabold md:text-3xl">
              60 seconds a day is all it takes
            </h3>
            <p className="text-grey-500 mb-6 text-lg leading-relaxed font-medium">
              Speecha is designed around daily micro-practice. Build a streak,
              track your weekly progress, and watch filler words disappear from
              your vocabulary one session at a time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
