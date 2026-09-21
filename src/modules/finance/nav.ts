import type { NavSection } from '../nav-item';

export const navSection: NavSection = {
  label: 'Finance',
  items: [
    { label: 'Overview', icon: 'dashboard', to: '/finance' },
    { label: 'Transactions', icon: 'receipt_long', to: '/finance/transactions' },
    { label: 'Accounts', icon: 'account_balance_wallet', to: '/finance/accounts' },
  ],
};
