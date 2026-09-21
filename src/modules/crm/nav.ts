import type { NavSection } from '../nav-item';

export const navSection: NavSection = {
  label: 'CRM',
  items: [
    { label: 'Overview', icon: 'dashboard', to: '/crm' },
    { label: 'Leads', icon: 'person_search', to: '/crm/leads' },
    { label: 'Deals', icon: 'handshake', to: '/crm/deals' },
    { label: 'Mail', icon: 'mail', to: '/crm/mail' },
  ],
};
