<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-weight-bold q-mb-md">Order History</div>

    <q-card flat bordered>
      <q-card-section>
        <div class="row items-center justify-between q-col-gutter-md">
          <div class="col-12 col-md-auto">
            <q-tabs
              v-model="filter"
              dense
              no-caps
              inline-label
              class="order-tabs"
              indicator-color="transparent"
            >
              <q-tab
                v-for="tab in tabs"
                :key="tab.value"
                :name="tab.value"
                :label="tab.label"
                class="order-tabs__tab"
              />
            </q-tabs>
          </div>
          <div class="col-12 col-md-3">
            <q-input v-model="search" dense outlined placeholder="Search">
              <template #prepend>
                <q-icon name="search" size="18px" />
              </template>
            </q-input>
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-list separator>
        <template v-for="order in filteredOrders" :key="order.id">
          <q-item clickable @click="toggle(order.id)">
            <q-item-section avatar>
              <q-avatar square size="48px" rounded>
                <img :src="order.items[0]!.image" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <div>
                Order No: <span class="text-weight-bold">{{ order.id }}</span>
              </div>
            </q-item-section>

            <q-item-section class="col-shrink">
              <q-badge :color="orderStatusColor(order.status)" rounded outline class="q-pa-sm">
                {{
                  order.status === 'In Progress'
                    ? 'Order in progress'
                    : `Order ${order.status.toLowerCase()}`
                }}
              </q-badge>
            </q-item-section>

            <q-item-section class="col-shrink text-grey-6">{{ order.date }}</q-item-section>

            <q-item-section class="col-shrink text-weight-bold text-positive">
              ${{ orderTotal(order).toFixed(2) }}
            </q-item-section>

            <q-item-section avatar>
              <q-icon :name="expanded.has(order.id) ? 'expand_less' : 'expand_more'" />
            </q-item-section>
          </q-item>

          <q-slide-transition>
            <div v-if="expanded.has(order.id)" class="order-detail q-pa-md">
              <div class="row q-col-gutter-lg">
                <div class="col-12 col-md-7">
                  <div class="row items-center q-gutter-xs text-caption text-grey-6">
                    <span>Seller</span>
                    <q-icon name="verified" color="primary" size="14px" />
                    <span class="text-weight-medium text-dark">{{ order.seller }}</span>
                  </div>

                  <div class="row items-center q-gutter-md q-mt-sm">
                    <q-avatar square size="64px" rounded>
                      <img :src="order.items[0]!.image" />
                    </q-avatar>
                    <div>
                      <div class="text-subtitle1 text-weight-medium">
                        {{ order.items[0]!.name }}
                      </div>
                      <div class="text-caption text-grey-6">{{ order.items[0]!.subtitle }}</div>
                      <div v-if="order.items[0]!.size" class="text-caption text-grey-6">
                        Select Number/Size:
                        <span class="text-weight-medium">{{ order.items[0]!.size }}</span>
                      </div>
                    </div>
                  </div>

                  <DeliveryStepper :current-step="order.deliveryStep" class="q-mt-lg" />

                  <div class="row items-center justify-between q-mt-sm">
                    <div class="text-caption text-grey-6">
                      Estimated delivery date:
                      <span class="text-weight-medium text-dark">{{
                        order.estimatedDelivery
                      }}</span>
                    </div>
                    <q-btn
                      flat
                      dense
                      no-caps
                      color="primary"
                      icon="local_shipping"
                      label="Cargo tracking"
                    />
                  </div>

                  <div class="text-caption text-grey-6 q-mt-xs">
                    Person to receive:
                    <span class="text-weight-medium text-dark">{{ order.recipient }}</span>
                  </div>
                </div>

                <div class="col-12 col-md-5">
                  <div class="text-subtitle2 text-weight-medium q-mb-sm">Credit Card</div>
                  <q-card flat bordered class="row items-center q-pa-sm q-gutter-sm q-mb-md">
                    <q-icon name="credit_card" color="primary" size="28px" />
                    <div>
                      <div class="text-weight-medium">
                        {{ order.paymentBrand }} •••• {{ order.paymentLast4 }}
                      </div>
                      <div class="text-caption text-grey-6">
                        ${{ orderTotal(order).toFixed(2) }}
                      </div>
                    </div>
                  </q-card>

                  <div class="text-subtitle2 text-weight-medium q-mb-sm">Delivery Address</div>
                  <div class="text-body2">
                    <div v-for="line in order.address" :key="line">{{ line }}</div>
                    <div class="text-grey-6">
                      {{ order.recipient }} · {{ order.recipientPhone }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-slide-transition>
        </template>

        <div v-if="filteredOrders.length === 0" class="text-center text-grey-5 q-pa-lg">
          No orders match this filter.
        </div>
      </q-list>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { orders, type Order } from '../data/orders';
import { orderStatusColor, type OrderStatus } from '../order-status';
import DeliveryStepper from '../components/DeliveryStepper.vue';

const tabs: { label: string; value: string }[] = [
  { label: 'All', value: 'all' },
  { label: 'Ongoing Orders', value: 'In Progress' },
  { label: 'Returns', value: 'Returned' },
  { label: 'Cancellations', value: 'Cancelled' },
  { label: 'Completed', value: 'Completed' },
];

const filter = ref('all');
const search = ref('');
const expanded = ref(new Set<string>());

function toggle(id: string) {
  if (expanded.value.has(id)) expanded.value.delete(id);
  else expanded.value.add(id);
  expanded.value = new Set(expanded.value);
}

function orderTotal(order: Order) {
  return (
    order.items.reduce((sum, item) => sum + item.price, 0) +
    order.shipping +
    order.vat -
    order.discount
  );
}

const filteredOrders = computed(() =>
  orders.filter(
    (order) =>
      (filter.value === 'all' || order.status === (filter.value as OrderStatus)) &&
      (order.id.includes(search.value) ||
        order.items.some((item) => item.name.toLowerCase().includes(search.value.toLowerCase()))),
  ),
);
</script>

<style scoped>
.order-tabs :deep(.q-tab) {
  border: 1px solid rgba(127, 127, 127, 0.25);
  border-radius: 999px;
  margin-right: 8px;
  min-height: 36px;
  padding: 0 16px;
}

.order-tabs :deep(.q-tab--active) {
  background: var(--q-primary);
  color: white;
}

.order-detail {
  background: rgba(127, 127, 127, 0.05);
}
</style>
