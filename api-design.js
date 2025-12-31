const response = {
  transcript: {
    id: "transcript_123",
    language: "en",
    text: "Hi. My name is Samuel ...",
    words: [],
  },
  annotations: {
    fillers: [],
    // can be added later
    // pauses: [],
    // pace: [],
    // sentiment: [],
    // clarity: [],
  },
  metadata: {},
};

export const TRANSCRIPT_DUMMY = {
  transcript: `Hi. My name is Samuel, and I was thinking that, you know, we could start with a simple approach and, um, see how things go over time. 
    It's not a rush decision or anything like that, but rather a chance to, I guess, um, explore the idea properly and just adjust as needed. 
    There's a clear goal in mind and, like, the plan is mostly solid. 
    Even if a few details still work. So, you know, as long as, like, we stay flexible and keep communicating, it should turn out fine in the end. 
    Thank you.`,
  words: [
    {
      word: "hi",
      start: 0.88,
      end: 1.36,
      confidence: 0.99853516,
      punctuated_word: "Hi.",
    },
    {
      word: "my",
      start: 1.36,
      end: 1.5999999,
      confidence: 1,
      punctuated_word: "My",
    },
  ],
};

const transcriptObj = {
  id: "transcript_123",
  language: "en",
  text: "Hi. My name is Samuel, and I was thinking that, you know...",
  words: [
    {
      index: 0,
      text: "hi",
      startChar: 0,
      endChar: 2,
    },
    {
      index: 1,
      text: "my",
      startChar: 3,
      endChar: 5,
    },
  ],
};

const fillers = {
  fillers: [
    {
      id: "filler_1",
      type: "filler",
      startIndex: 8,
      endIndex: 9,
      phrase: "you know",
      confidence: 0.95,
    },
  ],
};

// chunks: [
//   {
//     type: "normal",
//     words: [{ index: 0, displayText: "So" }],
//   },
//   {
//     type: "filler",
//     fillerId: 0,
//     words: [{ index: 1, displayText: "um" }],
//   },
//   {
//     type: "normal",
//     words: [{ index: 2, displayText: "I" }],
//   },
//   {
//     type: "filler",
//     fillerId: 1,
//     words: [
//       { index: 3, displayText: "you" },
//       { index: 4, displayText: "know" },
//     ],
//   },
//   {
//     type: "normal",
//     words: [
//       { index: 5, displayText: "went" },
//       { index: 6, displayText: "to" },
//       { index: 7, displayText: "the" },
//     ],
//   },
//   {
//     type: "filler",
//     fillerId: 2,
//     words: [{ index: 8, displayText: "basically" }],
//   },
//   {
//     type: "normal",
//     words: [{ index: 9, displayText: "store" }],
//   },
// ];
