import type { NavSection } from '../nav-item';

export const navSection: NavSection = {
  label: 'Fleet Tracking',
  items: [
    { label: 'Live Map', icon: 'map', to: '/fleet' },
    { label: 'Vehicles', icon: 'local_shipping', to: '/fleet/vehicles' },
    { label: 'Trip History', icon: 'route', to: '/fleet/trips' },
    { label: 'Alerts & Maintenance', icon: 'notification_important', to: '/fleet/alerts' },
  ],
};
