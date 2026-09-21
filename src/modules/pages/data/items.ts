export interface CrudItem {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  status: 'Active' | 'Inactive';
}

// Placeholder data — wire this up to a real API when available.
export const items: CrudItem[] = [
  {
    id: '1',
    name: 'AuraWave Headphones',
    category: 'Audio',
    price: 249.99,
    quantity: 84,
    status: 'Active',
  },
  {
    id: '2',
    name: 'PulseFlex Smartwatch',
    category: 'Wearables',
    price: 319.99,
    quantity: 42,
    status: 'Active',
  },
  {
    id: '3',
    name: 'TrailLite Backpack',
    category: 'Outdoor',
    price: 129.0,
    quantity: 0,
    status: 'Inactive',
  },
  {
    id: '4',
    name: 'NovaFrame Camera',
    category: 'Photography',
    price: 899.0,
    quantity: 17,
    status: 'Active',
  },
  {
    id: '5',
    name: 'StrydeX Sneakers',
    category: 'Footwear',
    price: 139.5,
    quantity: 63,
    status: 'Active',
  },
  {
    id: '6',
    name: 'DriftCase Luggage',
    category: 'Travel',
    price: 189.0,
    quantity: 8,
    status: 'Active',
  },
  {
    id: '7',
    name: 'LumoraDesk Lamp',
    category: 'Home',
    price: 59.99,
    quantity: 0,
    status: 'Inactive',
  },
  {
    id: '8',
    name: 'BrewCraft Kettle',
    category: 'Kitchen',
    price: 74.5,
    quantity: 29,
    status: 'Active',
  },
];
