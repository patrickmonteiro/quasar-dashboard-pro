<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-weight-bold q-mb-md">Order Summary</div>

    <q-banner rounded class="bg-positive-fade q-mb-md">
      <template #avatar>
        <q-avatar color="positive" text-color="white" icon="check" />
      </template>
      <div class="text-caption text-grey-6">Thanks!</div>
      <div class="text-h6 text-weight-bold text-positive">Successful Order</div>
      <div class="text-body2 text-grey-8">
        Your order is on the way. It'll be shipped today. We'll notify you.
      </div>
    </q-banner>

    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-8">
        <q-card v-for="item in order.items" :key="item.name" flat bordered class="q-mb-md">
          <q-card-section class="row items-center q-gutter-md no-wrap">
            <q-avatar square size="72px" rounded>
              <img :src="item.image" />
            </q-avatar>
            <div class="col">
              <div class="text-subtitle1 text-weight-medium">
                {{ item.name }}
                <span v-if="(item.quantity ?? 1) > 1" class="text-grey-6 text-body2">
                  × {{ item.quantity }}
                </span>
              </div>
              <div class="text-caption text-grey-6">{{ item.subtitle }}</div>
              <div class="text-h6 text-weight-bold text-primary q-mt-xs">
                ${{ (item.price * (item.quantity ?? 1)).toFixed(2) }}
              </div>
            </div>
            <div class="text-caption text-grey-6 row items-center q-gutter-xs">
              <q-icon name="event" size="16px" />
              Estimated {{ order.estimatedDelivery }}
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card flat bordered class="order-summary-card">
          <q-card-section>
            <div class="text-subtitle2 text-weight-medium q-mb-sm">Credit Card</div>
            <div class="row items-center q-gutter-sm">
              <q-icon name="credit_card" color="primary" size="28px" />
              <div>
                <div class="text-weight-medium">{{ order.paymentBrand }}</div>
                <div class="text-caption text-grey-6">•••• {{ order.paymentLast4 }}</div>
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <div class="text-subtitle2 text-weight-medium q-mb-sm">Delivery Address</div>
            <div class="text-body2">
              <div v-for="line in order.address" :key="line">{{ line }}</div>
              <div class="text-grey-6">{{ order.recipient }} · {{ order.recipientPhone }}</div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <div class="row justify-between q-py-xs">
              <div class="text-grey-6">Shipping</div>
              <div class="text-weight-medium">
                {{ order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}` }}
              </div>
            </div>
            <div class="row justify-between q-py-xs">
              <div class="text-grey-6">Discount</div>
              <div class="text-weight-medium text-positive">-${{ order.discount.toFixed(2) }}</div>
            </div>
            <div class="row justify-between q-py-xs">
              <div class="text-grey-6">VAT</div>
              <div class="text-weight-medium">${{ order.vat.toFixed(2) }}</div>
            </div>

            <q-separator class="q-my-sm" />

            <div class="row justify-between items-center">
              <div class="text-subtitle1 text-weight-bold">Total</div>
              <div class="text-h6 text-weight-bold text-positive">${{ total.toFixed(2) }}</div>
            </div>
          </q-card-section>

          <q-card-section>
            <q-btn
              unelevated
              no-caps
              color="primary"
              icon="download"
              label="Download Invoice"
              class="full-width"
              @click="downloadInvoice"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useQuasar } from 'quasar';
import { latestOrder } from '../data/orders';
import { useCartStore } from '../cart-store';

const $q = useQuasar();
const cart = useCartStore();

// Shows the order just placed at checkout, if any — otherwise a sample receipt.
const order = computed(() => cart.lastOrder ?? latestOrder);

const total = computed(
  () =>
    order.value.items.reduce((sum, item) => sum + item.price * (item.quantity ?? 1), 0) +
    order.value.shipping +
    order.value.vat -
    order.value.discount,
);

function downloadInvoice() {
  $q.notify({
    message: 'Invoice download started',
    color: 'dark',
    position: 'bottom',
    timeout: 1500,
  });
}
</script>

<style scoped>
.bg-positive-fade {
  background: rgba(34, 197, 94, 0.08);
}

.order-summary-card {
  position: sticky;
  top: 16px;
}
</style>
