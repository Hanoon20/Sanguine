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
  groom: 'Hamdhan',
  bride: 'Sara',
  monogram: 'H&S',
  /** Display date, written the way it appears on the stationery. */
  date: '05.12.26',
  dateLong: 'Saturday, the 5th of December 2026',
  /** ISO date and time used by the countdown. Ceremony at 12.30 pm. */
  dateISO: '2026-12-05T12:30:00',
  venue: 'AJ Hall',
  city: 'Puttalam, Sri Lanka',
  invitationLine: 'Together with their families',
  requestLine: 'request the pleasure of your company',
  dressCode: 'Traditional or formal',

  events: [
    {
      name: 'Nikkah',
      time: 'Saturday · 12.30 pm',
      place: 'Main hall',
      detail: 'Please be seated by a quarter past twelve.',
    },
    {
      name: 'Lunch',
      time: 'Saturday · 1.30 pm',
      place: 'Banquet floor',
      detail: 'Served straight after the ceremony.',
    },
    {
      name: 'Reception',
      time: 'Saturday · 7 pm until late',
      place: 'Garden lawn',
      detail: 'Photographs, dinner and a long evening with everyone.',
    },
  ] as WeddingEvent[],

  story: [
    {
      year: '2019',
      title: 'The first time',
      body: 'Replace this with how the two of you first met.',
    },
    {
      year: '2023',
      title: 'The years between',
      body: 'Replace this with something from the middle of the story.',
    },
    {
      year: '2026',
      title: 'A quiet yes',
      body: 'Replace this with how the proposal happened.',
    },
  ] as StoryChapter[],

  gallery: [
    { caption: 'Where it started' },
    { caption: 'The engagement' },
    { caption: 'Family' },
    { caption: 'Home' },
  ],

  rsvp: {
    deadline: 'Kindly reply before the fifteenth of November',
    /** Digits only, international format. Leave empty to hide the WhatsApp button. */
    whatsapp: '',
    email: 'hamdhanandsara@example.com',
  },

  /** Cover photograph for the hero. Put the file in /public/images/. */
  heroImage: '',
  /** Optional. A short, soft sound played when the seal is broken. */
  sealSound: '',
} as const;

export type Wedding = typeof wedding;
