import type { NavSection } from '../nav-item';

export const navSection: NavSection = {
  label: 'Pages',
  items: [
    { label: 'Auth', icon: 'login', to: '/login' },
    { label: 'Crud', icon: 'edit', to: '/pages/crud' },
    { label: 'Invoice', icon: 'attach_money', to: '/pages/invoice' },
    { label: 'FAQ', icon: 'help', to: '/pages/faq' },
    { label: 'Contact Us', icon: 'call', to: '/pages/contact' },
    { label: 'Empty', icon: 'inbox', to: '/pages/empty' },
  ],
};
