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
  content: string; // markdown
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
    slug: 'voice-and-delivery',
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
    slug: 'stop-saying-um-5-systems-that-actually-work',
    title: 'Stop saying “um”: 5 systems that actually work',
    description:
      'Most advice is “just practice.” These systems reduce filler words while keeping you natural and sharp.',
    category: 'filler-words',
    date: '2026-01-20',
    coverImage: {
      src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2400&q=80',
      alt: 'Team discussion in a bright office',
    },
    author: { name: 'Speecha Team', role: 'Editorial' },
    tags: ['fillers', 'pauses', 'habits'],
    featured: true,
    content: `
# Stop saying “um”: 5 systems that actually work

Filler words are rarely a personality problem. They’re usually a **timing problem**: your brain is planning, but your mouth keeps moving.

Below are five systems that work because they change the *moment* fillers appear.

---

## 1) Replace fillers with a silent beat

When you feel a filler coming:

- stop for **half a second**
- keep your eyes up (listener or camera)
- continue with the next thought

Silence reads as control. Fillers read as searching.

---

## 2) Build “bridges” that buy time without sounding vague

Use a short phrase that signals structure:

- “The core point is…”
- “Here’s the trade-off…”
- “Two things matter here…”

You’re not stalling. You’re guiding.

---

## 3) Pre-plan the first sentence

Fillers spike early because you’re still deciding what you mean.

Before you speak, write:

- your first sentence (exact words)
- your conclusion (one sentence)

Then start.

---

## 4) Train with constraints

Do one minute with rules:

- you may pause
- you may not use **um / uh / like**
- if you do, restart immediately

This rewires your default response from “fill” to “pause”.

---

## 5) Review one metric per week

Progress stays fast when it stays simple. Pick one:

- fillers per minute
- most common filler
- longest streak without a filler

Track it for 7 days.

---

## A 7-day plan (10 minutes/day)

| Day | Drill | Target |
|---|---|---|
| 1 | Silent beats | Replace 10 fillers with pauses |
| 2 | Bridges | Use 5 bridges naturally |
| 3 | First sentence | Clean first 10 seconds |
| 4 | Constraint take | 3 clean takes |
| 5 | Pacing | Slow by 10% |
| 6 | Structure | Clear beginning → middle → end |
| 7 | Repeat | Make it automatic |

---

## Practice prompt

Record 60 seconds answering:

**“What’s something you recently changed your mind about?”**

Listen for where your planning time appears. That’s where fillers live.
`,
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
    content: `
# The 30-second meeting answer: Point → Proof → Next

If you freeze in meetings, it’s usually not lack of ideas. It’s lack of packaging.

Use this when giving updates, opinions, or pushback.

---

## Point (one sentence)

Say what you believe.

## Proof (one sentence)

Give the smallest evidence: a metric, example, or observation.

## Next (one sentence)

Make it actionable: what should happen now?

---

## Example

> “We should simplify onboarding.  
> Drop-off spikes at step two.  
> Next, ship a version with one fewer decision and measure completion.”

---

## Upgrades that make it smoother

### Add a softener (only when needed)
- “My current view is…”
- “One concern I have is…”
- “I might be wrong, but…”

### Add a time cap
- max **3 sentences**
- max **20 seconds**

Structure reduces fillers because you’re following a path.
`,
  },

  {
    slug: 'pause-like-a-pro-how-to-sound-confident-without-talking-more',
    title: 'Pause like a pro: how to sound confident without talking more',
    description:
      'The best speakers don’t rush. They place silence. Here’s how to pause without feeling awkward.',
    category: 'voice-and-delivery',
    date: '2026-01-16',
    coverImage: {
      src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2400&q=80',
      alt: 'Two people in a focused conversation',
    },
    author: { name: 'Speecha Team', role: 'Coaching' },
    tags: ['pauses', 'confidence', 'delivery'],
    content: `
# Pause like a pro: how to sound confident without talking more

A pause is not empty space. It’s emphasis.

---

## Where pauses belong

### 1) Before the point
Pause, then deliver the line you want remembered.

### 2) After numbers
People need a beat to process metrics.

### 3) After a question
Ask. Pause. Let it land.

---

## A simple rule

If you feel urgency, slow down one notch.
Urgency often shows up as speed, not strength.

---

## Drill (2 minutes)

Record 3 takes of the same sentence. Add a short pause:
- before the main verb
- before the key noun
- after the sentence

Keep the version that feels most controlled.
`,
  },

  {
    slug: 'story-in-60-seconds-the-problem-turn-solution-frame',
    title: 'Story in 60 seconds: Problem → Turn → Solution',
    description:
      'When you ramble, it’s usually missing structure. This frame turns any update into a clean mini story.',
    category: 'structure',
    date: '2026-01-14',
    coverImage: {
      src: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=2400&q=80',
      alt: 'Person speaking into a microphone on stage',
    },
    author: { name: 'Speecha Team', role: 'Editorial' },
    tags: ['story', 'structure', 'clarity'],
    content: `
# Story in 60 seconds: Problem → Turn → Solution

Most speaking problems are structure problems.

Use this frame for: project updates, lessons learned, interviews, and content.

---

## Problem (10–15s)
What was the situation and what made it hard?

## Turn (10–15s)
What changed? What did you notice? What decision did you make?

## Solution (20–30s)
What did you do and what improved?

---

## One constraint that keeps it clean

Only include details that change the outcome.
Everything else is noise.
`,
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
    content: `
# How to stop saying “like” without sounding stiff

“Like” often appears when you’re about to say something imprecise.

Instead of removing it, **replace its job**.

---

## Replacement patterns

### 1) Approximate with a number
- “like 10” → “about ten”
- “like a few” → “two or three”

### 2) Name the category
- “like, the thing is” → “the risk is”
- “like, it’s hard” → “the constraint is”

### 3) Use one clean bridge
- “like, basically” → “the short version is…”

---

## Drill (90 seconds)

Answer: **“What’s a trade-off you’ve made recently?”**

Each time “like” appears, restart the sentence with:
- “specifically…”
- “in practical terms…”
- “the constraint is…”
`,
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
    content: `
# What Speecha measures (and why it helps)

Practice without feedback is repetition. Practice with feedback is improvement.

---

## Filler rate
Not all fillers matter equally. The goal is to reduce the *interruptions* that break your message.

## Pacing variability
Speed swings often signal uncertainty or cognitive load. Smooth pacing sounds more confident.

## Streaks
Long streaks without fillers usually mean you’re clear on your structure.

---

## The takeaway

Metrics don’t make you robotic.
They make your practice **specific**, which makes progress fast.
`,
  },
];
