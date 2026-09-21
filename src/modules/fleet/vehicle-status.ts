export type VehicleStatus = 'Ignition On' | 'Ignition Off' | 'Idle';

/** Quasar color name for a given vehicle status — shared across the fleet module. */
export function vehicleStatusColor(status: VehicleStatus) {
  const map: Record<VehicleStatus, string> = {
    'Ignition On': 'positive',
    Idle: 'warning',
    'Ignition Off': 'grey-6',
  };
  return map[status];
}

export function vehicleStatusIcon(status: VehicleStatus) {
  const map: Record<VehicleStatus, string> = {
    'Ignition On': 'directions_car',
    Idle: 'pause_circle',
    'Ignition Off': 'local_parking',
  };
  return map[status];
}
