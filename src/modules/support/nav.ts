import type { NavSection } from '../nav-item';

export const navSection: NavSection = {
  label: 'Support',
  items: [
    { label: 'Overview', icon: 'dashboard', to: '/support' },
    { label: 'Inbox', icon: 'forum', to: '/support/inbox' },
    { label: 'Tickets', icon: 'confirmation_number', to: '/support/tickets' },
  ],
};
