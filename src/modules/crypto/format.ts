/** Display helpers for crypto values (USD). */

const compactUsd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 2,
});

const compactNumber = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 2,
});

/** Adapts decimals to the magnitude: $85,056 · $1.24 · $0.00001234. */
export function formatPrice(value: number): string {
  const abs = Math.abs(value);
  const maximumFractionDigits = abs >= 1000 ? 0 : abs >= 1 ? 2 : abs >= 0.01 ? 4 : 8;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: Math.min(2, maximumFractionDigits),
    maximumFractionDigits,
  }).format(value);
}

/** $1.71T, $35.9B, ... */
export function formatCompactUsd(value: number): string {
  return compactUsd.format(value);
}

/** 20.09M, 21M, ... */
export function formatCompactNumber(value: number): string {
  return compactNumber.format(value);
}

/** Treats changes that round to 0.00% as flat, so they don't render as a red "-0.00%". */
export function isFlat(value: number): boolean {
  return Math.abs(value) < 0.005;
}

export function formatPercent(value: number | null, { signed = true } = {}): string {
  if (value === null) return '—';
  if (isFlat(value)) return '0.00%';
  const sign = signed && value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

/** Quasar color name for a price change. */
export function changeColor(value: number | null): 'positive' | 'negative' | 'grey-6' {
  if (value === null || isFlat(value)) return 'grey-6';
  return value > 0 ? 'positive' : 'negative';
}

/** Hex used for charts/sparklines (ApexCharts and SVG need real colors). */
export function changeHex(value: number | null): string {
  if (value === null || isFlat(value)) return '#9ca3af';
  return value > 0 ? '#22c55e' : '#ef4444';
}

export function formatDate(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
