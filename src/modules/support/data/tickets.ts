import type { ChatChannel } from './conversations';

export type TicketStatus = 'Open' | 'Pending' | 'Resolved' | 'Closed';
export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface Ticket {
  id: string;
  subject: string;
  requester: string;
  channel: ChatChannel;
  priority: TicketPriority;
  status: TicketStatus;
  assignee: string;
  updated: string;
}

export function ticketStatusColor(status: TicketStatus) {
  const map: Record<TicketStatus, string> = {
    Open: 'primary',
    Pending: 'warning',
    Resolved: 'positive',
    Closed: 'grey-6',
  };
  return map[status];
}

export function ticketPriorityColor(priority: TicketPriority) {
  const map: Record<TicketPriority, string> = {
    Low: 'grey-6',
    Medium: 'primary',
    High: 'warning',
    Urgent: 'negative',
  };
  return map[priority];
}

// Placeholder data — wire this up to a real helpdesk API when available.
export const tickets: Ticket[] = [
  {
    id: 'T-4821',
    subject: "Can't apply discount code at checkout",
    requester: 'Marina Costa',
    channel: 'chat',
    priority: 'High',
    status: 'Open',
    assignee: 'You',
    updated: '2 min ago',
  },
  {
    id: 'T-4820',
    subject: 'Billing discrepancy on latest invoice',
    requester: 'John Pierce',
    channel: 'whatsapp',
    priority: 'Urgent',
    status: 'Pending',
    assignee: 'Sara',
    updated: '18 min ago',
  },
  {
    id: 'T-4818',
    subject: 'Export button greyed out on reports page',
    requester: 'Ana Ferreira',
    channel: 'email',
    priority: 'Medium',
    status: 'Resolved',
    assignee: 'You',
    updated: '1 h ago',
  },
  {
    id: 'T-4815',
    subject: 'How to invite teammates to workspace',
    requester: 'Diego Alvez',
    channel: 'chat',
    priority: 'Low',
    status: 'Open',
    assignee: 'Sara',
    updated: '2 h ago',
  },
  {
    id: 'T-4809',
    subject: 'Priority support coverage on Business plan',
    requester: 'Li Wei',
    channel: 'whatsapp',
    priority: 'Low',
    status: 'Closed',
    assignee: 'You',
    updated: 'Yesterday',
  },
  {
    id: 'T-4802',
    subject: 'Bulk CSV export request',
    requester: 'Priya Nair',
    channel: 'email',
    priority: 'Medium',
    status: 'Pending',
    assignee: 'Sara',
    updated: '2 d ago',
  },
  {
    id: 'T-4795',
    subject: 'API rate limit hit during migration',
    requester: 'Tom Becker',
    channel: 'email',
    priority: 'Urgent',
    status: 'Open',
    assignee: 'You',
    updated: '3 d ago',
  },
  {
    id: 'T-4788',
    subject: 'Dashboard widgets not saving layout',
    requester: 'Elena Petrova',
    channel: 'chat',
    priority: 'Medium',
    status: 'Resolved',
    assignee: 'Sara',
    updated: '4 d ago',
  },
];
