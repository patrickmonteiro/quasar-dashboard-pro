import { defineStore } from 'pinia';
import type { Product } from './data/products';
import type { Order } from './data/orders';

export interface CartLine {
  productId: string;
  name: string;
  subtitle: string;
  image: string;
  price: number;
  quantity: number;
}

export interface CheckoutDetails {
  recipient: string;
  phone: string;
  address: string[];
  paymentBrand: string;
  paymentLast4: string;
}

const VAT_RATE = 0.08;

function randomOrderId() {
  return String(Math.floor(100_000_000 + Math.random() * 900_000_000));
}

export const useCartStore = defineStore('ecommerce-cart', {
  state: () => ({
    lines: [] as CartLine[],
    /** Snapshot of the most recently placed order, read by the Order Summary page. */
    lastOrder: null as Order | null,
  }),

  getters: {
    count: (state) => state.lines.reduce((sum, line) => sum + line.quantity, 0),
    subtotal: (state) => state.lines.reduce((sum, line) => sum + line.price * line.quantity, 0),
    vat(): number {
      return Math.round(this.subtotal * VAT_RATE * 100) / 100;
    },
    total(): number {
      return this.subtotal + this.vat;
    },
  },

  actions: {
    add(product: Product, quantity = 1) {
      const existing = this.lines.find((line) => line.productId === product.id);
      if (existing) {
        existing.quantity += quantity;
        return;
      }
      this.lines.push({
        productId: product.id,
        name: product.name,
        subtitle: product.subtitle,
        image: product.images[0]!,
        price: product.price,
        quantity,
      });
    },

    updateQuantity(productId: string, quantity: number) {
      if (quantity <= 0) {
        this.remove(productId);
        return;
      }
      const line = this.lines.find((l) => l.productId === productId);
      if (line) line.quantity = quantity;
    },

    remove(productId: string) {
      this.lines = this.lines.filter((line) => line.productId !== productId);
    },

    clear() {
      this.lines = [];
    },

    /** Builds an Order from the current cart, stores it as `lastOrder`, and empties the cart. */
    checkout(details: CheckoutDetails): Order {
      const order: Order = {
        id: randomOrderId(),
        status: 'In Progress',
        date: 'Today',
        seller: 'Quasar Dashboard PRO Store',
        paymentBrand: details.paymentBrand,
        paymentLast4: details.paymentLast4,
        deliveryStep: 0,
        estimatedDelivery: 'In 5–7 business days',
        recipient: details.recipient,
        recipientPhone: details.phone,
        address: details.address,
        shipping: 0,
        discount: 0,
        vat: this.vat,
        items: this.lines.map((line) => ({
          name: line.name,
          subtitle: line.subtitle,
          image: line.image,
          price: line.price,
          quantity: line.quantity,
        })),
      };

      this.lastOrder = order;
      this.lines = [];
      return order;
    },
  },
});
