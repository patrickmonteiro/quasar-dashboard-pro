<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-weight-bold q-mb-md">Checkout</div>

    <div v-if="cart.lines.length === 0" class="column items-center q-py-xl text-grey-5">
      <q-icon name="remove_shopping_cart" size="48px" class="q-mb-sm" />
      <div class="q-mb-md">Your cart is empty — add a product before checking out.</div>
      <q-btn unelevated no-caps color="primary" label="Browse products" to="/ecommerce/products" />
    </div>

    <div v-else class="row q-col-gutter-md">
      <div class="col-12 col-md-8">
        <q-card flat bordered>
          <q-stepper v-model="step" flat animated color="primary">
            <q-step :name="1" title="Shipping" icon="local_shipping" :done="step > 1">
              <div class="row q-col-gutter-sm">
                <div class="col-12 col-sm-6">
                  <q-input v-model="shipping.name" dense outlined label="Full name" />
                </div>
                <div class="col-12 col-sm-6">
                  <q-input v-model="shipping.phone" dense outlined label="Phone" />
                </div>
                <div class="col-12">
                  <q-input v-model="shipping.address1" dense outlined label="Address line 1" />
                </div>
                <div class="col-12 col-sm-6">
                  <q-input v-model="shipping.city" dense outlined label="City" />
                </div>
                <div class="col-6 col-sm-3">
                  <q-input v-model="shipping.state" dense outlined label="State" />
                </div>
                <div class="col-6 col-sm-3">
                  <q-input v-model="shipping.zip" dense outlined label="ZIP" />
                </div>
              </div>
            </q-step>

            <q-step :name="2" title="Payment" icon="credit_card" :done="step > 2">
              <div class="row q-col-gutter-sm">
                <div class="col-12">
                  <q-input v-model="payment.cardName" dense outlined label="Name on card" />
                </div>
                <div class="col-12 col-sm-6">
                  <q-input
                    v-model="payment.cardNumber"
                    dense
                    outlined
                    label="Card number"
                    mask="#### #### #### ####"
                  />
                </div>
                <div class="col-6 col-sm-3">
                  <q-input
                    v-model="payment.expiry"
                    dense
                    outlined
                    label="Expiry"
                    mask="##/##"
                    placeholder="MM/YY"
                  />
                </div>
                <div class="col-6 col-sm-3">
                  <q-input v-model="payment.cvv" dense outlined label="CVV" mask="###" />
                </div>
                <div class="col-12">
                  <q-select
                    v-model="payment.brand"
                    dense
                    outlined
                    label="Card brand"
                    :options="['Visa', 'Mastercard', 'Amex']"
                  />
                </div>
              </div>
            </q-step>

            <q-step :name="3" title="Review" icon="fact_check">
              <div class="text-subtitle2 text-weight-medium q-mb-sm">Items</div>
              <div
                v-for="line in cart.lines"
                :key="line.productId"
                class="row justify-between q-py-xs"
              >
                <div>{{ line.quantity }} × {{ line.name }}</div>
                <div class="text-weight-medium">${{ (line.price * line.quantity).toFixed(2) }}</div>
              </div>

              <q-separator class="q-my-sm" />

              <div class="text-subtitle2 text-weight-medium q-mb-xs">Ship to</div>
              <div class="text-body2 text-grey-8">
                {{ shipping.name }}, {{ shipping.address1 }}, {{ shipping.city }}
                {{ shipping.state }}
                {{ shipping.zip }}
              </div>

              <div class="text-subtitle2 text-weight-medium q-mt-sm q-mb-xs">Pay with</div>
              <div class="text-body2 text-grey-8">
                {{ payment.brand }} •••• {{ payment.cardNumber.slice(-4) || '0000' }}
              </div>
            </q-step>

            <template #navigation>
              <q-stepper-navigation class="row justify-between">
                <q-btn v-if="step > 1" flat no-caps label="Back" @click="step--" />
                <div v-else />
                <q-btn
                  v-if="step < 3"
                  unelevated
                  no-caps
                  color="primary"
                  label="Continue"
                  :disable="!canContinue"
                  @click="step++"
                />
                <q-btn
                  v-else
                  unelevated
                  no-caps
                  color="primary"
                  icon="check"
                  label="Place order"
                  @click="placeOrder"
                />
              </q-stepper-navigation>
            </template>
          </q-stepper>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle1 text-weight-medium q-mb-sm">Order Summary</div>
            <div class="row justify-between q-py-xs">
              <div class="text-grey-6">Subtotal</div>
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
            <div class="row justify-between items-center">
              <div class="text-subtitle1 text-weight-bold">Total</div>
              <div class="text-h6 text-weight-bold text-positive">${{ cart.total.toFixed(2) }}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useCartStore } from '../cart-store';

const router = useRouter();
const $q = useQuasar();
const cart = useCartStore();

const step = ref(1);

const shipping = ref({ name: '', phone: '', address1: '', city: '', state: '', zip: '' });
const payment = ref({ cardName: '', cardNumber: '', expiry: '', cvv: '', brand: 'Mastercard' });

const canContinue = computed(() => {
  if (step.value === 1)
    return Boolean(shipping.value.name && shipping.value.address1 && shipping.value.city);
  if (step.value === 2) return Boolean(payment.value.cardName && payment.value.cardNumber);
  return true;
});

function placeOrder() {
  const order = cart.checkout({
    recipient: shipping.value.name,
    phone: shipping.value.phone,
    address: [
      shipping.value.address1,
      `${shipping.value.city}, ${shipping.value.state} ${shipping.value.zip}`,
    ],
    paymentBrand: payment.value.brand,
    paymentLast4: payment.value.cardNumber.slice(-4) || '0000',
  });

  $q.notify({
    message: `Order ${order.id} placed`,
    color: 'positive',
    position: 'bottom',
    timeout: 1500,
  });
  void router.push('/ecommerce/order-summary');
}
</script>
