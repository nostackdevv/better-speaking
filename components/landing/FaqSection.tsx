const faqs = [
  {
    id: 'faq1',
    question: 'What filler words does Speecha detect?',
    answer:
      'Speecha detects common vocal fillers like "um," "uh," "er," "hmm," and "ah," plus filler words like "like," "so," "you know," "actually," "literally," "kind of," and "I mean." You can also add custom filler words specific to your speaking habits.',
  },
  {
    id: 'faq2',
    question: 'How does Speecha work?',
    answer:
      'Record yourself speaking for up to 60 seconds either freestyle or using one of our 60+ speaking prompts. Our AI instantly transcribes your speech, highlights every filler word, and gives you a clarity score. Practice daily to build a streak and track your improvement over time.',
  },
  {
    id: 'faq3',
    question: 'Is my audio private?',
    answer:
      'Yes. Your privacy is our top priority. Audio recordings are processed securely and we never share your data with third parties. Your recordings stay on your device and are never stored on our servers.',
  },
  {
    id: 'faq5',
    question: 'How long until I see improvement?',
    answer:
      "Most users notice a significant reduction in filler words within 2 weeks of daily practice. The key is consistency Speecha's streak system and daily reminders help you build the habit that leads to lasting improvement.",
  },
  {
    id: 'faq7',
    question: 'Is Speecha available on Android?',
    answer:
      "Speecha is currently available on iOS only. We're focused on delivering the best possible experience on iPhone first. Android support is on our roadmap follow us for updates.",
  },
];

const ChevronIcon = () => (
  <svg
    className="faq-chevron text-grey-400 ml-4 h-5 w-5 flex-shrink-0 transition-transform duration-300"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    viewBox="0 0 24 24"
  >
    <path
      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const FaqSection = () => {
  return (
    <section className="bg-surface-50 py-20 md:py-32">
      <div className="mx-auto max-w-2xl px-6">
        <div className="fade-up mb-12 text-center">
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight md:text-4xl">
            Frequently asked questions
          </h2>
        </div>
        <div className="fade-up space-y-3">
          {faqs.map((faq) => (
            <div className="faq-item rounded-2xl bg-white" key={faq.id}>
              <input className="hidden" id={faq.id} type="checkbox" />
              <label
                className="flex cursor-pointer items-center justify-between p-5 select-none"
                htmlFor={faq.id}
              >
                <span className="text-grey-900 font-bold">{faq.question}</span>
                <ChevronIcon />
              </label>
              <div className="faq-answer px-5 pb-5">
                <p className="text-grey-500 leading-relaxed font-medium">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
