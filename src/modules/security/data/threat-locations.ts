export type ThreatSeverity = 'Critical' | 'High' | 'Medium' | 'Low';

export interface ThreatLocation {
  id: string;
  country: string;
  lat: number;
  lng: number;
  severity: ThreatSeverity;
  attackCount: number;
}

export function threatSeverityColor(severity: ThreatSeverity) {
  const map: Record<ThreatSeverity, string> = {
    Critical: '#ef4444',
    High: '#f59e0b',
    Medium: '#eab308',
    Low: '#64748b',
  };
  return map[severity];
}

// Placeholder data — wire this up to a real threat-intel feed when available.
export const threatLocations: ThreatLocation[] = [
  { id: 't1', country: 'Russia', lat: 61.52, lng: 105.32, severity: 'Critical', attackCount: 142 },
  { id: 't2', country: 'China', lat: 35.86, lng: 104.2, severity: 'Critical', attackCount: 118 },
  { id: 't3', country: 'Iran', lat: 32.43, lng: 53.69, severity: 'High', attackCount: 76 },
  { id: 't4', country: 'Ukraine', lat: 48.38, lng: 31.17, severity: 'High', attackCount: 54 },
  { id: 't5', country: 'Vietnam', lat: 14.06, lng: 108.28, severity: 'Medium', attackCount: 33 },
  { id: 't6', country: 'Nigeria', lat: 9.08, lng: 8.68, severity: 'Medium', attackCount: 27 },
  { id: 't7', country: 'Brazil', lat: -14.24, lng: -51.93, severity: 'Low', attackCount: 12 },
  { id: 't8', country: 'USA', lat: 37.09, lng: -95.71, severity: 'Low', attackCount: 9 },
];
