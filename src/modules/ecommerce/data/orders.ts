import { products } from './products';
import type { OrderStatus } from '../order-status';

export interface OrderItem {
  name: string;
  subtitle: string;
  image: string;
  price: number;
  size?: string;
  quantity?: number;
}

export interface Order {
  id: string;
  status: OrderStatus;
  date: string;
  seller: string;
  paymentBrand: string;
  paymentLast4: string;
  /** Index into `deliverySteps` — how far the order has progressed. */
  deliveryStep: number;
  estimatedDelivery: string;
  recipient: string;
  recipientPhone: string;
  address: string[];
  shipping: number;
  discount: number;
  vat: number;
  items: OrderItem[];
}

function itemFor(productId: string, size?: string): OrderItem {
  const product = products.find((p) => p.id === productId);
  if (!product) throw new Error(`Unknown product id: ${productId}`);
  return {
    name: product.name,
    subtitle: product.subtitle,
    image: product.images[0]!,
    price: product.price,
    ...(size ? { size } : {}),
  };
}

const address = ['1234 Elm Street, Apt 56', 'Springfield, IL 62704, USA'];

// Placeholder data — wire this up to a real orders API when available.
export const orders: Order[] = [
  {
    id: '124812476',
    status: 'In Progress',
    date: 'Jan 4, 2025',
    seller: 'StyleHub',
    paymentBrand: 'Mastercard',
    paymentLast4: '1089',
    deliveryStep: 1,
    estimatedDelivery: 'Jan 18, 2025',
    recipient: 'Robert Fox',
    recipientPhone: '+1 (123) 456-7890',
    address,
    shipping: 0,
    discount: 0,
    vat: 0,
    items: [itemFor('traillite-backpack', 'M')],
  },
  {
    id: '124812477',
    status: 'In Progress',
    date: 'Jan 10, 2025',
    seller: 'AudioLoft',
    paymentBrand: 'Visa',
    paymentLast4: '4471',
    deliveryStep: 0,
    estimatedDelivery: 'Jan 22, 2025',
    recipient: 'Robert Fox',
    recipientPhone: '+1 (123) 456-7890',
    address,
    shipping: 0,
    discount: 0,
    vat: 0,
    items: [itemFor('pulseflex-smartwatch')],
  },
  {
    id: '124812478',
    status: 'Completed',
    date: 'Jan 12, 2025',
    seller: 'FrameWorks',
    paymentBrand: 'Mastercard',
    paymentLast4: '1089',
    deliveryStep: 3,
    estimatedDelivery: 'Jan 15, 2025',
    recipient: 'Robert Fox',
    recipientPhone: '+1 (123) 456-7890',
    address,
    shipping: 0,
    discount: 0,
    vat: 0,
    items: [itemFor('novaframe-camera')],
  },
  {
    id: '124812479',
    status: 'Completed',
    date: 'Jan 8, 2025',
    seller: 'StrydeSport',
    paymentBrand: 'Visa',
    paymentLast4: '4471',
    deliveryStep: 3,
    estimatedDelivery: 'Jan 11, 2025',
    recipient: 'Robert Fox',
    recipientPhone: '+1 (123) 456-7890',
    address,
    shipping: 0,
    discount: 0,
    vat: 0,
    items: [itemFor('strydex-sneakers', '42')],
  },
  {
    id: '124812480',
    status: 'Returned',
    date: 'Jan 14, 2025',
    seller: 'HomeCraft',
    paymentBrand: 'Mastercard',
    paymentLast4: '1089',
    deliveryStep: 3,
    estimatedDelivery: 'Jan 17, 2025',
    recipient: 'Robert Fox',
    recipientPhone: '+1 (123) 456-7890',
    address,
    shipping: 0,
    discount: 0,
    vat: 0,
    items: [itemFor('lumora-desklamp')],
  },
  {
    id: '124812481',
    status: 'Cancelled',
    date: 'Jan 2, 2025',
    seller: 'DriftGoods',
    paymentBrand: 'Visa',
    paymentLast4: '4471',
    deliveryStep: 0,
    estimatedDelivery: '—',
    recipient: 'Robert Fox',
    recipientPhone: '+1 (123) 456-7890',
    address,
    shipping: 0,
    discount: 0,
    vat: 0,
    items: [itemFor('driftcase-luggage')],
  },
  {
    id: '124812482',
    status: 'Completed',
    date: 'Jan 18, 2025',
    seller: 'BrewHouse',
    paymentBrand: 'Mastercard',
    paymentLast4: '1089',
    deliveryStep: 3,
    estimatedDelivery: 'Jan 21, 2025',
    recipient: 'Robert Fox',
    recipientPhone: '+1 (123) 456-7890',
    address,
    shipping: 0,
    discount: 0,
    vat: 0,
    items: [itemFor('brewcraft-kettle'), itemFor('echoblock-speaker')],
  },
];

// The order shown on the post-checkout "Order Summary" receipt page.
export const latestOrder: Order = {
  id: '124812483',
  status: 'In Progress',
  date: 'Today',
  seller: 'Quasar Dashboard PRO Store',
  paymentBrand: 'Mastercard',
  paymentLast4: '1089',
  deliveryStep: 0,
  estimatedDelivery: 'Saturday, January 18th',
  recipient: 'Robert Fox',
  recipientPhone: '+1 (123) 456-7890',
  address,
  shipping: 0,
  discount: 111.5,
  vat: 20,
  items: [
    itemFor('aurawave-headphones'),
    itemFor('pulseflex-smartwatch'),
    itemFor('traillite-backpack', 'M'),
  ],
};
