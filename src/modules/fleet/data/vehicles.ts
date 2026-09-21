import type { VehicleStatus } from '../vehicle-status';

export interface Vehicle {
  id: string;
  plate: string;
  model: string;
  driver: string;
  status: VehicleStatus;
  speed: number;
  fuel: number;
  lat: number;
  lng: number;
  location: string;
  lastUpdate: string;
}

// Placeholder data — wire this up to a real telemetry/GPS API when available.
export const vehicles: Vehicle[] = [
  {
    id: 'v1',
    plate: 'ABC-1D23',
    model: 'Fiat Strada',
    driver: 'Carlos Mendes',
    status: 'Ignition On',
    speed: 42,
    fuel: 68,
    lat: -23.5613,
    lng: -46.6565,
    location: 'Av. Paulista, São Paulo - SP',
    lastUpdate: '2 min ago',
  },
  {
    id: 'v2',
    plate: 'DEF-4E56',
    model: 'VW Saveiro',
    driver: 'Ana Ferreira',
    status: 'Ignition On',
    speed: 58,
    fuel: 41,
    lat: -23.5335,
    lng: -46.6357,
    location: 'Marginal Tietê, São Paulo - SP',
    lastUpdate: '1 min ago',
  },
  {
    id: 'v3',
    plate: 'GHI-7F89',
    model: 'Chevrolet Montana',
    driver: 'Li Wei',
    status: 'Idle',
    speed: 0,
    fuel: 22,
    lat: -23.5729,
    lng: -46.6899,
    location: 'Av. Rebouças, São Paulo - SP',
    lastUpdate: '5 min ago',
  },
  {
    id: 'v4',
    plate: 'JKL-0G12',
    model: 'Renault Master',
    driver: 'Tom Becker',
    status: 'Ignition Off',
    speed: 0,
    fuel: 85,
    lat: -23.5015,
    lng: -46.6197,
    location: 'Rodovia dos Bandeirantes, São Paulo - SP',
    lastUpdate: '32 min ago',
  },
  {
    id: 'v5',
    plate: 'MNO-3H45',
    model: 'Fiat Toro',
    driver: 'Priya Nair',
    status: 'Ignition On',
    speed: 71,
    fuel: 54,
    lat: -23.6108,
    lng: -46.6926,
    location: 'Av. Santo Amaro, São Paulo - SP',
    lastUpdate: 'Just now',
  },
  {
    id: 'v6',
    plate: 'PQR-6I78',
    model: 'Hyundai HR',
    driver: 'Diego Alvez',
    status: 'Idle',
    speed: 0,
    fuel: 9,
    lat: -23.5205,
    lng: -46.5822,
    location: 'Av. Aricanduva, São Paulo - SP',
    lastUpdate: '8 min ago',
  },
  {
    id: 'v7',
    plate: 'STU-9J01',
    model: 'Iveco Daily',
    driver: 'Elena Petrova',
    status: 'Ignition Off',
    speed: 0,
    fuel: 63,
    lat: -23.4816,
    lng: -46.6291,
    location: 'Av. Otávio Braga de Mesquita, Guarulhos - SP',
    lastUpdate: '1 h ago',
  },
];
