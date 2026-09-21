export type AlertType = 'Speeding' | 'Geofence' | 'Low fuel' | 'Maintenance';
export type AlertSeverity = 'Critical' | 'Warning' | 'Info';

export interface FleetAlert {
  id: string;
  vehicleId: string;
  vehiclePlate: string;
  type: AlertType;
  severity: AlertSeverity;
  message: string;
  timestamp: string;
  resolved: boolean;
}

export function alertSeverityColor(severity: AlertSeverity) {
  const map: Record<AlertSeverity, string> = {
    Critical: 'negative',
    Warning: 'warning',
    Info: 'primary',
  };
  return map[severity];
}

export function alertTypeIcon(type: AlertType) {
  const map: Record<AlertType, string> = {
    Speeding: 'speed',
    Geofence: 'fence',
    'Low fuel': 'local_gas_station',
    Maintenance: 'build',
  };
  return map[type];
}

// Placeholder data — wire this up to a real alerting/telemetry API when available.
export const fleetAlerts: FleetAlert[] = [
  {
    id: 'a1',
    vehicleId: 'v5',
    vehiclePlate: 'MNO-3H45',
    type: 'Speeding',
    severity: 'Critical',
    message: 'Vehicle exceeded 80 km/h on Av. Santo Amaro',
    timestamp: '2 min ago',
    resolved: false,
  },
  {
    id: 'a2',
    vehicleId: 'v3',
    vehiclePlate: 'GHI-7F89',
    type: 'Geofence',
    severity: 'Critical',
    message: 'Entered "Centro — high theft rate" risk zone',
    timestamp: '9 min ago',
    resolved: false,
  },
  {
    id: 'a3',
    vehicleId: 'v6',
    vehiclePlate: 'PQR-6I78',
    type: 'Low fuel',
    severity: 'Warning',
    message: 'Fuel level dropped below 10%',
    timestamp: '14 min ago',
    resolved: false,
  },
  {
    id: 'a4',
    vehicleId: 'v4',
    vehiclePlate: 'JKL-0G12',
    type: 'Maintenance',
    severity: 'Warning',
    message: 'Scheduled oil change due in 3 days',
    timestamp: '1 h ago',
    resolved: false,
  },
  {
    id: 'a5',
    vehicleId: 'v2',
    vehiclePlate: 'DEF-4E56',
    type: 'Speeding',
    severity: 'Warning',
    message: 'Vehicle exceeded 70 km/h on Marginal Tietê',
    timestamp: '2 h ago',
    resolved: true,
  },
  {
    id: 'a6',
    vehicleId: 'v1',
    vehiclePlate: 'ABC-1D23',
    type: 'Geofence',
    severity: 'Info',
    message: 'Left assigned delivery zone',
    timestamp: '3 h ago',
    resolved: true,
  },
  {
    id: 'a7',
    vehicleId: 'v7',
    vehiclePlate: 'STU-9J01',
    type: 'Maintenance',
    severity: 'Info',
    message: 'Tire rotation completed',
    timestamp: '1 d ago',
    resolved: true,
  },
];
