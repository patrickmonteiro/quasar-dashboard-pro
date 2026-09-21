import type { Lead } from './components/LeadsTable.vue';

/** Quasar color name for a given pipeline stage — shared by the leads table and the deals board. */
export function stageColor(stage: Lead['stage']) {
  const map: Record<Lead['stage'], string> = {
    Lead: 'grey-6',
    Qualified: 'info',
    Proposal: 'warning',
    Negotiation: 'accent',
    Won: 'positive',
  };
  return map[stage];
}
