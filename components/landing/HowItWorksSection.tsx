const steps = [
  {
    icon: (
      <svg
        className="text-clarity h-8 w-8"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    iconBg: 'bg-clarity-50',
    title: 'Record',
    description:
      'Speak for up to 60 seconds. Use a prompt or freestyle your choice.',
  },
  {
    icon: (
      <svg
        className="text-momentum h-8 w-8"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    iconBg: 'bg-momentum-50',
    title: 'Get instant feedback',
    description:
      'Every filler word gets highlighted in your transcript and scores your clarity.',
  },
  {
    icon: (
      <svg
        className="text-clarity h-8 w-8"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    iconBg: 'bg-clarity-50',
    title: 'Track progress',
    description:
      "Practice daily and watch your clarity score climb. Build a streak you won't want to break.",
  },
];

export const HowItWorksSection = () => {
  return (
    <section className="bg-surface-50 py-20 md:py-32" id="how-it-works">
      <div className="mx-auto max-w-5xl px-6">
        <div className="fade-up mb-16 text-center">
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight md:text-4xl">
            How Speecha works
          </h2>
          <p className="text-grey-500 mx-auto max-w-md text-lg font-medium">
            Three simple steps to clearer, more confident speech.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3 md:gap-12">
          {steps.map((step, i) => (
            <div
              className="fade-up text-center"
              key={step.title}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div
                className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${step.iconBg}`}
              >
                {step.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
              <p className="text-grey-500 leading-relaxed font-medium">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
