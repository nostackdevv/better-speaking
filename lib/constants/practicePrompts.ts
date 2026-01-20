export const practicePrompts = [
  'Describe your perfect day from start to finish',
  "Talk about a skill you'd like to learn and why",
  'Share a memorable experience from your childhood',
  "Explain what you're passionate about and what drew you to it",
  'Describe your favorite book, movie, or TV show',
  'Talk about a challenge you overcame and what you learned',
  'Share your thoughts on a recent news topic that interests you',
  'Describe what your ideal home would look like',
  'Talk about someone who has influenced your life',
  'Explain a hobby you enjoy and how you got into it',
  "Describe a place you've traveled to or would like to visit",
  'Share your opinion on how technology has changed communication',
  'Talk about your career goals or dream job',
  'Describe a typical day in your life',
  'Share advice you would give to your younger self',
] as const;

export type PracticePrompt = (typeof practicePrompts)[number];
