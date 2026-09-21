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

/** Hex equivalent of {@link stageColor}, for contexts that need a raw color (SVG/canvas, not a Quasar class). */
export function stageHexColor(stage: Lead['stage']) {
  const map: Record<Lead['stage'], string> = {
    Lead: '#9e9e9e',
    Qualified: '#31ccec',
    Proposal: '#f59e0b',
    Negotiation: '#9c27b0',
    Won: '#22c55e',
  };
  return map[stage];
}
