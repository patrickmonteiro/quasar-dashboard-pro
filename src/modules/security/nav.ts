import type { NavSection } from '../nav-item';

export const navSection: NavSection = {
  label: 'Security',
  items: [
    { label: 'Overview', icon: 'dashboard', to: '/security' },
    { label: 'Incidents', icon: 'report', to: '/security/incidents' },
    { label: 'Threat Map', icon: 'public', to: '/security/threat-map' },
  ],
};
