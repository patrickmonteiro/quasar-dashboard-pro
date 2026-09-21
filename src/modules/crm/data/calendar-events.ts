import { today, parsed, addToDate } from '@timestamp-js/core';

export interface CalendarEvent {
  id: number;
  title: string;
  details: string;
  date: string;
  time: string;
  duration: number;
  color: string;
}

/** Today +/- offsetDays, as a 'YYYY-MM-DD' string — keeps sample data relevant regardless of when the app is opened. */
function relativeDate(offsetDays: number): string {
  const base = parsed(today());
  if (!base) return today();
  return addToDate(base, { day: offsetDays }).date;
}

// Placeholder data — wire this up to a real calendar/scheduling API when available.
export const calendarEvents: CalendarEvent[] = [
  {
    id: 1,
    title: 'Team stand-up',
    details: 'Daily sync with the sales team',
    date: relativeDate(0),
    time: '09:00',
    duration: 30,
    color: 'primary',
  },
  {
    id: 2,
    title: 'Call with Acme Co.',
    details: 'Discuss contract renewal terms with Marina Costa',
    date: relativeDate(0),
    time: '11:00',
    duration: 60,
    color: 'teal',
  },
  {
    id: 3,
    title: 'Product demo — Nimbus Ltd.',
    details: 'Walkthrough of the new reporting features for John Pierce',
    date: relativeDate(1),
    time: '14:00',
    duration: 90,
    color: 'purple',
  },
  {
    id: 4,
    title: '1:1 with Sara',
    details: 'Monthly check-in',
    date: relativeDate(1),
    time: '16:00',
    duration: 30,
    color: 'orange',
  },
  {
    id: 5,
    title: 'Proposal review — Bluewave',
    details: 'Internal review before sending to Ana Ferreira',
    date: relativeDate(2),
    time: '10:00',
    duration: 60,
    color: 'primary',
  },
  {
    id: 6,
    title: 'Contract signing — Orbital Inc.',
    details: 'Final signature with Diego Alvez',
    date: relativeDate(3),
    time: '13:00',
    duration: 45,
    color: 'positive',
  },
  {
    id: 7,
    title: 'Pipeline review',
    details: 'Weekly review of the deals board with the team',
    date: relativeDate(4),
    time: '15:00',
    duration: 60,
    color: 'teal',
  },
];
