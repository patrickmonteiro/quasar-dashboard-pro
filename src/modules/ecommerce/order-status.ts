export type OrderStatus = 'In Progress' | 'Completed' | 'Returned' | 'Cancelled';

export const deliverySteps = ['Received', 'Processing', 'Shipping', 'Delivered'] as const;

/** Quasar color name for a given order status — shared by order history and order summary. */
export function orderStatusColor(status: OrderStatus) {
  const map: Record<OrderStatus, string> = {
    'In Progress': 'info',
    Completed: 'positive',
    Returned: 'warning',
    Cancelled: 'negative',
  };
  return map[status];
}
