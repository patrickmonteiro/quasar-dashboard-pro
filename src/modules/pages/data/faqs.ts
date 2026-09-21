export interface Faq {
  category: string;
  question: string;
  answer: string;
}

// Placeholder data — replace with the product's real FAQ content.
export const faqs: Faq[] = [
  {
    category: 'Licensing',
    question: 'Is Quasar Dashboard PRO really free to use?',
    answer:
      'Yes — it is released under the Apache License 2.0. You can use it in personal or commercial projects, with no attribution required.',
  },
  {
    category: 'Licensing',
    question: 'Can I use it for a client project?',
    answer: 'Yes. The license places no restriction on the type of project you ship it in.',
  },
  {
    category: 'Getting started',
    question: 'What do I need installed to run it locally?',
    answer: 'Node.js 22.12+ (or 24/26) and pnpm. Then run "pnpm install" followed by "pnpm dev".',
  },
  {
    category: 'Getting started',
    question: "How do I remove a module I don't need?",
    answer:
      'Delete its folder under src/modules/<segment> and remove its two registration lines from src/modules/index.ts.',
  },
  {
    category: 'Customization',
    question: 'How do I change the accent color?',
    answer:
      'Update the $primary token in src/css/quasar.variables.scss — it propagates through every component automatically.',
  },
  {
    category: 'Customization',
    question: 'Can I add my own business module?',
    answer:
      'Yes — copy the shape of an existing module (pages/, components/, data/, routes.ts, nav.ts) and register it in src/modules/index.ts.',
  },
  {
    category: 'Support',
    question: 'Where do I report a bug or request a feature?',
    answer: 'Open an issue on the GitHub repository — issues and PRs are both welcome.',
  },
];
