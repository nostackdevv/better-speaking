export type BlogCategory = {
  slug: string;
  label: string;
  description?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: BlogCategory['slug'];
  date: string; // ISO string
  coverImage: { src: string; alt: string };
  author: { name: string; role?: string };
  tags: string[];
  featured?: boolean;
  showBlogCta?: boolean; // defaults to true
  dateModified?: string; // ISO string, defaults to date if not set
  readingTime?: number; // computed from content
};

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    slug: 'filler-words',
    label: 'Filler Words',
    description: 'Reduce ums and likes without sounding rehearsed.',
  },
  {
    slug: 'structure',
    label: 'Structure',
    description: 'Frameworks that make your point land fast and clean.',
  },
  {
    slug: 'speaking',
    label: 'Voice & Delivery',
    description: 'Pacing, emphasis, pausing, and sounding more certain.',
  },
  {
    slug: 'meetings-and-work',
    label: 'Meetings & Work',
    description: 'Updates, pushback, and clarity under time pressure.',
  },
  {
    slug: 'product-and-research',
    label: 'Product & Research',
    description: 'How Speecha measures progress and what the science suggests.',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-to-stop-saying-um-5-systems-that-actually-work',
    title: 'Stop saying “um”: 5 systems that actually work',
    description:
      'Learn why you say "um". These systems reduce filler words while keeping you natural and sharp. No fluff, just practical advice.',
    category: 'filler-words',
    date: '2026-01-20',
    coverImage: {
      src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2400&q=80',
      alt: 'Team discussion in a bright office',
    },
    author: { name: 'Speecha Team', role: 'Editorial' },
    tags: ['filler words', 'public speaking', 'communication', 'confidence'],
    featured: true,
  },

  {
    slug: 'the-30-second-meeting-answer-point-proof-next',
    title: 'The 30-second meeting answer: Point → Proof → Next',
    description:
      'Confidence isn’t volume. It’s structure. Use this three-line format to sound decisive without sounding scripted.',
    category: 'meetings-and-work',
    date: '2026-01-18',
    coverImage: {
      src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=2400&q=80',
      alt: 'Person presenting with a laptop',
    },
    author: { name: 'Speecha Team', role: 'Product' },
    tags: ['meetings', 'frameworks', 'clarity'],
  },

  {
    slug: 'pause-like-a-pro-how-to-sound-confident-without-talking-more',
    title: 'Pause like a pro: how to sound confident without talking more',
    description:
      'The best speakers don’t rush. They place silence. Here’s how to pause without feeling awkward.',
    category: 'speaking',
    date: '2026-01-16',
    coverImage: {
      src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2400&q=80',
      alt: 'Two people in a focused conversation',
    },
    author: { name: 'Speecha Team', role: 'Coaching' },
    tags: ['pauses', 'confidence', 'delivery'],
  },

  {
    slug: 'public-speaking-reduce-filler-words',
    title:
      'How to Reduce Filler Words: A Public Speaking Tip That Actually Works',
    description:
      "Discover why you say 'um' more than you think and learn practical techniques to reduce filler words. Record yourself and see your real filler word count instantly.",
    category: 'speaking',
    date: '2026-01-24',
    coverImage: {
      src: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=2400&q=80',
      alt: 'Person speaking into a microphone on stage',
    },
    author: { name: 'Speecha Team', role: 'Coaching' },
    tags: ['public speaking', 'confidence', 'filler words', 'speech practice'],
  },

  {
    slug: 'how-to-stop-saying-like-without-sounding-stiff',
    title: 'How to stop saying “like” without sounding stiff',
    description:
      '“Like” often replaces precision. Swap it with specificity, not silence, using these patterns.',
    category: 'filler-words',
    date: '2026-01-12',
    coverImage: {
      src: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=2400&q=80',
      alt: 'Close-up of someone thinking while speaking',
    },
    author: { name: 'Speecha Team', role: 'Coaching' },
    tags: ['like', 'precision', 'habits'],
  },

  {
    slug: 'what-speecha-measures-and-why-it-helps',
    title: 'What Speecha measures (and why it helps)',
    description:
      'Good feedback is specific. Here’s how metrics like filler rate and pacing variability translate into clearer speaking.',
    category: 'product-and-research',
    date: '2026-01-10',
    coverImage: {
      src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2400&q=80',
      alt: 'Analytics dashboard on a screen',
    },
    author: { name: 'Speecha Team', role: 'Research' },
    tags: ['metrics', 'practice', 'feedback'],
  },
];
