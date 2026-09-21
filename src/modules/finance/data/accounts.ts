export interface Account {
  currency: string;
  accountName: string;
  account: string;
  amount: string;
  changePercent: number;
  color: string;
  data: number[];
  type: 'Checking' | 'Savings' | 'Business';
  openedOn: string;
}

// Placeholder data — wire this up to a real API when available.
export const accounts: Account[] = [
  {
    currency: 'USD',
    accountName: 'Main checking',
    account: '**** **** 8234',
    amount: '$12,030.23',
    changePercent: 64,
    color: '#4f46e5',
    data: [30, 40, 35, 50, 49, 60, 70, 91, 80],
    type: 'Checking',
    openedOn: 'Jan 2021',
  },
  {
    currency: 'EUR',
    accountName: 'Europe operations',
    account: '**** **** 9284',
    amount: '€17,864.12',
    changePercent: 24,
    color: '#3b82f6',
    data: [40, 34, 44, 38, 52, 41, 60, 45, 55],
    type: 'Business',
    openedOn: 'Jun 2021',
  },
  {
    currency: 'GBP',
    accountName: 'UK reserve',
    account: '**** **** 8288',
    amount: '£27,789.56',
    changePercent: -8,
    color: '#ef4444',
    data: [60, 55, 58, 40, 45, 30, 35, 28, 25],
    type: 'Savings',
    openedOn: 'Mar 2022',
  },
  {
    currency: 'BRL',
    accountName: 'Brazil operations',
    account: '**** **** 2534',
    amount: 'R$142,847.23',
    changePercent: 17,
    color: '#14b8a6',
    data: [20, 30, 28, 38, 35, 48, 44, 58, 60],
    type: 'Business',
    openedOn: 'Sep 2022',
  },
];
