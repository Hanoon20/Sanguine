export interface WeddingEvent {
  name: string;
  time: string;
  place: string;
  detail: string;
}

export interface StoryChapter {
  year: string;
  title: string;
  body: string;
}

export const wedding = {
  groom: 'Victor',
  bride: 'Paula',
  monogram: 'V&P',
  /** Display date, written the way it appears on the stationery. */
  date: '05.07.26',
  dateLong: 'Sunday, the fifth of July, two thousand twenty-six',
  /** ISO date used by the countdown. */
  dateISO: '2026-07-05T16:00:00',
  venue: 'Quinta da Serra',
  city: 'Sintra, Portugal',
  invitationLine: 'Together with their families',
  requestLine: 'request the pleasure of your company',
  dressCode: 'Black tie optional',

  events: [
    {
      name: 'Welcome drinks',
      time: 'Saturday · 7 pm',
      place: 'Terrace of the old orangery',
      detail: 'Port, olives and introductions before the day itself.',
    },
    {
      name: 'The ceremony',
      time: 'Sunday · 4 pm',
      place: 'Chapel garden',
      detail: 'Please be seated by a quarter to four.',
    },
    {
      name: 'Dinner & dancing',
      time: 'Sunday · 7 pm until late',
      place: 'The long hall',
      detail: 'Seven courses, one very long table, no seating plan after midnight.',
    },
  ] as WeddingEvent[],

  story: [
    {
      year: '2019',
      title: 'A queue in the rain',
      body: 'We met waiting for the same bakery to open, argued about whether it was worth it, and then shared the last loaf.',
    },
    {
      year: '2022',
      title: 'The long way round',
      body: 'Two cities, one shared calendar, and a habit of buying tickets before checking the price.',
    },
    {
      year: '2025',
      title: 'A quiet yes',
      body: 'No photographer, no crowd. Only a cold morning on the coast and a question that took no time at all to answer.',
    },
  ] as StoryChapter[],

  gallery: [
    { caption: 'Lisbon, the first summer' },
    { caption: 'The bakery, still there' },
    { caption: 'Sintra, the morning of the yes' },
    { caption: 'Home' },
  ],

  rsvp: {
    deadline: 'Kindly reply before the first of May',
    /** Digits only, international format. Leave empty to hide the WhatsApp button. */
    whatsapp: '',
    email: 'victorandpaula@example.com',
  },

  /** Optional. Leave empty and a drawn crest is used instead of a photograph. */
  heroImage: '',
  /** Optional. A short, soft sound played when the seal is broken. */
  sealSound: '',
} as const;

export type Wedding = typeof wedding;
