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

  /** Three moments, a line each. Short is the whole point here. */
  story: [
    { year: '2019', title: 'We met', body: 'A wedding, a long table, and one conversation that ran late.' },
    { year: '2023', title: 'Two cities', body: 'One shared calendar and far too many bus tickets.' },
    { year: '2026', title: 'A quiet yes', body: 'A cold morning by the sea. No hesitation at all.' },
  ] as StoryChapter[],

  /**
   * Photographs. Only entries with an `image` are shown, so the gallery never
   * displays empty plates while you are still collecting pictures. Import the
   * files in Gallery.tsx and pass them here.
   */
  gallery: [
    { caption: 'Hamdhan and Sara', image: '' },
  ] as { caption: string; image: string }[],

  location: {
    name: 'AJ Hall',
    address: ['AJ Hall', 'Puttalam', 'Sri Lanka'],
    /** Replace with the exact pin once you have it. */
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=AJ+Hall+Puttalam',
    /** Embed URL. No API key needed — swap the query for the exact pin. */
    mapEmbedUrl: 'https://www.google.com/maps?q=AJ%20Hall%20Puttalam%20Sri%20Lanka&output=embed',
    note: 'Parking is available beside the hall. Guests enter from the main road side.',
  },

  rsvp: {
    deadline: 'Kindly reply before the fifteenth of November',
    /** Digits only, international format. Empty hides the WhatsApp button. */
    whatsapp: '',
    /** Empty hides the email button and the line in the footer. */
    email: '',
    /** Shown when neither of the above is filled in. */
    contactNote: 'Please reply to us directly, or to either of our families.',
  },

  closing: {
    line: 'Thank you for being part of our day',
    signoff: 'With love, from both our families',
  },

  /** The studio credit at the very bottom. Set `name` to '' to remove it. */
  credit: {
    label: 'Made by',
    name: 'dearday.lk',
    url: 'https://dearday.lk',
  },

  /** Cover photograph for the hero. Put the file in /public/images/. */
  heroImage: '',
  /** Optional. A short, soft sound played when the seal is broken. */
  sealSound: '',
} as const;

export type Wedding = typeof wedding;
