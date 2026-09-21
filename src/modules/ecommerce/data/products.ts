export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  price: number;
  rating: number;
  badge?: 'New' | 'Featured' | 'Sale';
  views: number;
  images: string[];
  description: string;
}

function gallery(seed: string, count: number) {
  return Array.from(
    { length: count },
    (_, i) => `https://picsum.photos/seed/qdp-${seed}-${i}/640/720`,
  );
}

// Placeholder data & Lorem Picsum images — wire this up to a real catalog API when available.
export const products: Product[] = [
  {
    id: 'aurawave-headphones',
    name: 'AuraWave™ Headphones',
    subtitle: 'Wireless noise-cancelling over-ear headphones',
    category: 'Audio',
    price: 249.99,
    rating: 4.7,
    badge: 'New',
    views: 7230,
    images: gallery('headphones', 4),
    description:
      'Immersive sound with adaptive noise cancellation and 40 hours of battery life. Memory-foam ear cushions keep you comfortable through all-day listening sessions.',
  },
  {
    id: 'pulseflex-smartwatch',
    name: 'PulseFlex™ Smartwatch',
    subtitle: 'Fitness tracking with always-on display',
    category: 'Wearables',
    price: 319.99,
    rating: 4.8,
    badge: 'Featured',
    views: 5410,
    images: gallery('smartwatch', 4),
    description:
      'Track heart rate, sleep, and workouts with precision. Water-resistant to 50 meters, with a battery that lasts up to 7 days on a single charge.',
  },
  {
    id: 'traillite-backpack',
    name: 'TrailLite™ Backpack',
    subtitle: '28L weatherproof daily carry backpack',
    category: 'Bags',
    price: 129.99,
    rating: 4.6,
    badge: 'Sale',
    views: 4120,
    images: gallery('backpack', 4),
    description:
      'A padded 15" laptop sleeve, weatherproof shell, and a back panel built for all-day comfort. Designed for commuting, travel, and everything in between.',
  },
  {
    id: 'lumora-desklamp',
    name: 'Lumora™ Desk Lamp',
    subtitle: 'Adjustable LED lamp with wireless charging base',
    category: 'Home',
    price: 79.99,
    rating: 4.5,
    views: 2890,
    images: gallery('desklamp', 4),
    description:
      'Five brightness levels and three color temperatures, with a built-in Qi wireless charging pad at the base. Fully adjustable arm and head.',
  },
  {
    id: 'strydex-sneakers',
    name: 'Strydex™ Running Shoes',
    subtitle: 'Lightweight responsive running sneakers',
    category: 'Footwear',
    price: 159.99,
    rating: 4.9,
    badge: 'Featured',
    views: 8890,
    images: gallery('sneakers', 4),
    description:
      'Responsive foam midsole and a breathable knit upper built for daily training. Reflective details keep you visible on low-light runs.',
  },
  {
    id: 'novaframe-camera',
    name: 'NovaFrame™ Mirrorless Camera',
    subtitle: '24MP full-frame mirrorless camera, body only',
    category: 'Electronics',
    price: 1499.99,
    rating: 4.8,
    views: 3340,
    images: gallery('camera', 4),
    description:
      'A 24MP full-frame sensor with in-body stabilization and 4K video. Fast, accurate autofocus keeps every shot sharp.',
  },
  {
    id: 'brewcraft-kettle',
    name: 'BrewCraft™ Pour-Over Kettle',
    subtitle: 'Precision-temperature electric gooseneck kettle',
    category: 'Home',
    price: 89.99,
    rating: 4.4,
    badge: 'Sale',
    views: 1980,
    images: gallery('kettle', 4),
    description:
      'Precise temperature control to the degree, with a gooseneck spout built for slow, even pour-over brewing. Keeps your set temperature for up to 60 minutes.',
  },
  {
    id: 'driftcase-luggage',
    name: 'DriftCase™ Carry-On',
    subtitle: 'Hardshell spinner carry-on with built-in charger',
    category: 'Bags',
    price: 189.99,
    rating: 4.6,
    views: 2510,
    images: gallery('luggage', 4),
    description:
      'A polycarbonate hardshell built to take a beating, with a built-in USB charging port and 360° spinner wheels for effortless maneuvering.',
  },
  {
    id: 'echoblock-speaker',
    name: 'EchoBlock™ Speaker',
    subtitle: 'Portable waterproof Bluetooth speaker',
    category: 'Audio',
    price: 99.99,
    rating: 4.5,
    badge: 'New',
    views: 4670,
    images: gallery('speaker', 4),
    description:
      'Room-filling sound in a pocketable, IP67-rated shell. 20 hours of playtime and pairs with a second speaker for stereo sound.',
  },
];
