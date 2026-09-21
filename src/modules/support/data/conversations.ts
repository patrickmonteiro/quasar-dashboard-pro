export type ChatChannel = 'chat' | 'whatsapp' | 'email';

export interface ChatMessage {
  id: string;
  from: 'customer' | 'agent';
  text: string;
  time: string;
}

export interface Conversation {
  id: string;
  customerName: string;
  initials: string;
  avatarColor: string;
  channel: ChatChannel;
  lastMessage: string;
  time: string;
  unread: boolean;
  online: boolean;
  messages: ChatMessage[];
}

export function channelIcon(channel: ChatChannel) {
  const map: Record<ChatChannel, string> = {
    chat: 'forum',
    whatsapp: 'sms',
    email: 'mail',
  };
  return map[channel];
}

export function channelLabel(channel: ChatChannel) {
  const map: Record<ChatChannel, string> = {
    chat: 'Website chat',
    whatsapp: 'WhatsApp',
    email: 'Email',
  };
  return map[channel];
}

// Placeholder data — wire this up to a real chat/helpdesk API when available.
export const conversations: Conversation[] = [
  {
    id: '1',
    customerName: 'Marina Costa',
    initials: 'MC',
    avatarColor: 'indigo-6',
    channel: 'chat',
    lastMessage: "I still can't apply my discount code at checkout.",
    time: '2 min ago',
    unread: true,
    online: true,
    messages: [
      {
        id: '1-1',
        from: 'customer',
        text: "Hi! I still can't apply my discount code at checkout.",
        time: '10:02 AM',
      },
      {
        id: '1-2',
        from: 'agent',
        text: "Hey Marina, sorry about that! Could you share the code you're trying?",
        time: '10:03 AM',
      },
      { id: '1-3', from: 'customer', text: "Sure, it's WELCOME15", time: '10:04 AM' },
      {
        id: '1-4',
        from: 'agent',
        text: "That one expired last week — I've applied SUPPORT15 to your cart instead.",
        time: '10:05 AM',
      },
      { id: '1-5', from: 'customer', text: 'Amazing, it worked. Thank you!', time: '10:06 AM' },
    ],
  },
  {
    id: '2',
    customerName: 'John Pierce',
    initials: 'JP',
    avatarColor: 'blue-6',
    channel: 'whatsapp',
    lastMessage: 'Any update on ticket #4821?',
    time: '18 min ago',
    unread: true,
    online: true,
    messages: [
      { id: '2-1', from: 'customer', text: 'Any update on ticket #4821?', time: '9:40 AM' },
      {
        id: '2-2',
        from: 'agent',
        text: "Checking now — it's with our billing team, ETA today.",
        time: '9:44 AM',
      },
    ],
  },
  {
    id: '3',
    customerName: 'Ana Ferreira',
    initials: 'AF',
    avatarColor: 'pink-5',
    channel: 'email',
    lastMessage: 'Thanks for the quick fix, closing this out.',
    time: '1 h ago',
    unread: false,
    online: false,
    messages: [
      {
        id: '3-1',
        from: 'customer',
        text: 'My export button is greyed out on the reports page.',
        time: 'Yesterday',
      },
      {
        id: '3-2',
        from: 'agent',
        text: "That's a permissions issue — I've upgraded your role, try again now.",
        time: 'Yesterday',
      },
      {
        id: '3-3',
        from: 'customer',
        text: 'Thanks for the quick fix, closing this out.',
        time: 'Yesterday',
      },
    ],
  },
  {
    id: '4',
    customerName: 'Diego Alvez',
    initials: 'DA',
    avatarColor: 'teal-6',
    channel: 'chat',
    lastMessage: 'How do I invite teammates to my workspace?',
    time: '2 h ago',
    unread: false,
    online: true,
    messages: [
      {
        id: '4-1',
        from: 'customer',
        text: 'How do I invite teammates to my workspace?',
        time: '8:10 AM',
      },
      {
        id: '4-2',
        from: 'agent',
        text: 'Settings → Team → Invite by email. Want me to send one for you?',
        time: '8:12 AM',
      },
      { id: '4-3', from: 'customer', text: 'Yes please, orbital.inc addresses.', time: '8:13 AM' },
    ],
  },
  {
    id: '5',
    customerName: 'Li Wei',
    initials: 'LW',
    avatarColor: 'purple-5',
    channel: 'whatsapp',
    lastMessage: 'Perfect, that answers it 👍',
    time: 'Yesterday',
    unread: false,
    online: false,
    messages: [
      {
        id: '5-1',
        from: 'customer',
        text: 'Does the Business plan include priority support?',
        time: 'Yesterday',
      },
      { id: '5-2', from: 'agent', text: 'Yes — under 1h first response, 24/7.', time: 'Yesterday' },
      { id: '5-3', from: 'customer', text: 'Perfect, that answers it 👍', time: 'Yesterday' },
    ],
  },
  {
    id: '6',
    customerName: 'Priya Nair',
    initials: 'PN',
    avatarColor: 'orange-5',
    channel: 'email',
    lastMessage: 'Following up on the bulk export request.',
    time: '2 d ago',
    unread: false,
    online: false,
    messages: [
      {
        id: '6-1',
        from: 'customer',
        text: 'Following up on the bulk export request I sent last week.',
        time: '2 d ago',
      },
      {
        id: '6-2',
        from: 'agent',
        text: 'It shipped in yesterday\'s release — look for "Export all" on the Reports page.',
        time: '2 d ago',
      },
    ],
  },
];
