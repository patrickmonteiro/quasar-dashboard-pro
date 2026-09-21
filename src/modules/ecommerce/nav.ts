import type { NavSection } from '../nav-item';

export const navSection: NavSection = {
  label: 'E-Commerce',
  items: [
    { label: 'Products', icon: 'inventory_2', to: '/ecommerce/products' },
    { label: 'Shopping Cart', icon: 'shopping_cart', to: '/ecommerce/cart' },
    { label: 'Checkout', icon: 'fact_check', to: '/ecommerce/checkout' },
    { label: 'Order History', icon: 'history', to: '/ecommerce/orders' },
    { label: 'Order Summary', icon: 'receipt_long', to: '/ecommerce/order-summary' },
  ],
};
