export interface TripStop {
  label: string;
  time: string;
  lat: number;
  lng: number;
}

export interface Trip {
  id: string;
  vehicleId: string;
  date: string;
  distanceKm: number;
  durationMin: number;
  avgSpeed: number;
  maxSpeed: number;
  route: [number, number][];
  stops: TripStop[];
}

// Placeholder data — wire this up to a real telemetry/GPS API when available.
export const trips: Trip[] = [
  {
    id: 't1',
    vehicleId: 'v1',
    date: '2026-09-21',
    distanceKm: 18.4,
    durationMin: 42,
    avgSpeed: 38,
    maxSpeed: 64,
    route: [
      [-23.5505, -46.6333],
      [-23.5558, -46.6396],
      [-23.5613, -46.6565],
      [-23.5678, -46.6489],
      [-23.5729, -46.6899],
    ],
    stops: [
      { label: 'Depot — Centro', time: '08:02', lat: -23.5505, lng: -46.6333 },
      { label: 'Av. Paulista', time: '08:24', lat: -23.5613, lng: -46.6565 },
      { label: 'Av. Rebouças', time: '08:44', lat: -23.5729, lng: -46.6899 },
    ],
  },
  {
    id: 't2',
    vehicleId: 'v2',
    date: '2026-09-21',
    distanceKm: 27.1,
    durationMin: 55,
    avgSpeed: 45,
    maxSpeed: 78,
    route: [
      [-23.5205, -46.5822],
      [-23.5275, -46.6021],
      [-23.5335, -46.6357],
      [-23.5108, -46.6412],
    ],
    stops: [
      { label: 'Depot — Aricanduva', time: '09:10', lat: -23.5205, lng: -46.5822 },
      { label: 'Marginal Tietê', time: '09:52', lat: -23.5335, lng: -46.6357 },
    ],
  },
  {
    id: 't3',
    vehicleId: 'v5',
    date: '2026-09-20',
    distanceKm: 34.6,
    durationMin: 61,
    avgSpeed: 41,
    maxSpeed: 89,
    route: [
      [-23.5975, -46.6949],
      [-23.6041, -46.6912],
      [-23.6108, -46.6926],
      [-23.6187, -46.6733],
    ],
    stops: [
      { label: 'Depot — Marginal Pinheiros', time: '13:05', lat: -23.5975, lng: -46.6949 },
      { label: 'Av. Santo Amaro', time: '13:44', lat: -23.6108, lng: -46.6926 },
      { label: 'Client drop-off', time: '14:06', lat: -23.6187, lng: -46.6733 },
    ],
  },
];
