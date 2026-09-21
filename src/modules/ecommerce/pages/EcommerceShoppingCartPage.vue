<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-weight-bold q-mb-md">Shopping Cart</div>

    <div v-if="cart.lines.length === 0" class="column items-center q-py-xl text-grey-5">
      <q-icon name="shopping_cart" size="48px" class="q-mb-sm" />
      <div class="q-mb-md">Your cart is empty.</div>
      <q-btn unelevated no-caps color="primary" label="Browse products" to="/ecommerce/products" />
    </div>

    <div v-else class="row q-col-gutter-md">
      <div class="col-12 col-md-8">
        <q-card v-for="line in cart.lines" :key="line.productId" flat bordered class="q-mb-md">
          <q-card-section class="row items-center q-gutter-md no-wrap">
            <q-avatar square size="72px" rounded>
              <img :src="line.image" />
            </q-avatar>

            <div class="col">
              <div class="text-subtitle1 text-weight-medium">{{ line.name }}</div>
              <div class="text-caption text-grey-6">{{ line.subtitle }}</div>
              <div class="text-weight-bold text-primary q-mt-xs">${{ line.price.toFixed(2) }}</div>
            </div>

            <div class="row items-center q-gutter-sm">
              <q-btn
                round
                dense
                outline
                size="sm"
                icon="remove"
                @click="cart.updateQuantity(line.productId, line.quantity - 1)"
              />
              <div class="text-weight-bold" style="min-width: 20px; text-align: center">
                {{ line.quantity }}
              </div>
              <q-btn
                round
                dense
                outline
                size="sm"
                icon="add"
                @click="cart.updateQuantity(line.productId, line.quantity + 1)"
              />
            </div>

            <div class="text-weight-bold" style="min-width: 80px; text-align: right">
              ${{ (line.price * line.quantity).toFixed(2) }}
            </div>

            <q-btn
              flat
              round
              dense
              icon="delete_outline"
              color="negative"
              @click="cart.remove(line.productId)"
            />
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle1 text-weight-medium q-mb-sm">Order Summary</div>

            <div class="row justify-between q-py-xs">
              <div class="text-grey-6">Subtotal ({{ cart.count }} items)</div>
              <div class="text-weight-medium">${{ cart.subtotal.toFixed(2) }}</div>
            </div>
            <div class="row justify-between q-py-xs">
              <div class="text-grey-6">Estimated VAT</div>
              <div class="text-weight-medium">${{ cart.vat.toFixed(2) }}</div>
            </div>
            <div class="row justify-between q-py-xs">
              <div class="text-grey-6">Shipping</div>
              <div class="text-weight-medium text-positive">Free</div>
            </div>

            <q-separator class="q-my-sm" />

            <div class="row justify-between items-center q-mb-md">
              <div class="text-subtitle1 text-weight-bold">Total</div>
              <div class="text-h6 text-weight-bold text-positive">${{ cart.total.toFixed(2) }}</div>
            </div>

            <q-btn
              unelevated
              no-caps
              color="primary"
              icon="arrow_forward"
              label="Proceed to checkout"
              class="full-width"
              to="/ecommerce/checkout"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useCartStore } from '../cart-store';

const cart = useCartStore();
</script>
