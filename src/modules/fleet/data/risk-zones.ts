export interface RiskZone {
  id: string;
  name: string;
  level: 'High' | 'Medium' | 'Low';
  lat: number;
  lng: number;
  radius: number;
}

// Placeholder data — wire this up to a real risk/geofencing API when available.
export const riskZones: RiskZone[] = [
  {
    id: 'z1',
    name: 'Centro — high theft rate',
    level: 'High',
    lat: -23.5505,
    lng: -46.6333,
    radius: 1400,
  },
  {
    id: 'z2',
    name: 'Zona Leste — cargo robbery hotspot',
    level: 'High',
    lat: -23.5405,
    lng: -46.478,
    radius: 1800,
  },
  {
    id: 'z3',
    name: 'Marginal Pinheiros — frequent incidents',
    level: 'Medium',
    lat: -23.5975,
    lng: -46.6949,
    radius: 1200,
  },
];

export function riskZoneColor(level: RiskZone['level']) {
  const map: Record<RiskZone['level'], string> = {
    High: '#ef4444',
    Medium: '#f59e0b',
    Low: '#eab308',
  };
  return map[level];
}
