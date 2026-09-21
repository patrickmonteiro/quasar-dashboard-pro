<template>
  <q-page v-if="product" class="q-pa-md">
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-12 col-md-7">
        <div class="row q-col-gutter-sm">
          <div v-for="(image, i) in product.images" :key="i" class="col-6">
            <q-img :src="image" :ratio="4 / 5" class="rounded-borders" />
          </div>
        </div>
      </div>

      <div class="col-12 col-md-5">
        <q-card flat bordered>
          <q-card-section>
            <q-badge v-if="product.badge" :color="badgeColor" rounded class="q-mb-sm">
              {{ product.badge }}
            </q-badge>

            <div class="text-h5 text-weight-bold">{{ product.name }}</div>
            <div class="text-caption text-grey-5 q-mb-sm">{{ product.subtitle }}</div>

            <div class="text-h4 text-weight-bold text-primary">${{ product.price.toFixed(2) }}</div>

            <div class="row items-center q-gutter-xs q-mt-xs">
              <q-badge color="warning" text-color="white" rounded>
                <q-icon name="star" size="12px" class="q-mr-xs" />
                {{ product.rating }}
              </q-badge>
              <span class="text-caption text-grey-5">
                {{ product.views.toLocaleString('en-US') }} views in the last 30 days
              </span>
            </div>

            <q-separator class="q-my-md" />

            <div class="text-subtitle2 text-weight-medium q-mb-sm">Quantity</div>
            <div class="row items-center q-gutter-sm q-mb-md">
              <q-btn
                round
                dense
                outline
                icon="remove"
                @click="quantity = Math.max(1, quantity - 1)"
              />
              <div class="text-weight-bold" style="min-width: 24px; text-align: center">
                {{ quantity }}
              </div>
              <q-btn round dense outline icon="add" @click="quantity++" />
            </div>

            <div class="row q-gutter-sm">
              <q-btn
                color="primary"
                unelevated
                no-caps
                icon="add_shopping_cart"
                label="Add to cart"
                class="col"
                @click="addToCart"
              />
              <q-btn
                round
                outline
                :color="wishlisted ? 'negative' : 'grey-7'"
                :icon="wishlisted ? 'favorite' : 'favorite_border'"
                @click="wishlisted = !wishlisted"
              />
              <q-btn round outline color="grey-7" icon="share" @click="shareProduct" />
            </div>
          </q-card-section>
        </q-card>

        <div class="row q-col-gutter-sm q-mt-md">
          <div v-for="perk in perks" :key="perk.label" class="col-6">
            <q-card flat bordered>
              <q-card-section class="row items-center no-wrap q-gutter-sm">
                <q-icon :name="perk.icon" color="primary" size="20px" />
                <div class="text-caption">{{ perk.label }}</div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>

    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle1 text-weight-medium q-mb-sm">Description</div>
        <div class="text-body2 text-grey-8">{{ product.description }}</div>
      </q-card-section>
    </q-card>

    <div v-if="relatedProducts.length" class="text-subtitle1 text-weight-medium q-mb-sm">
      You may also like
    </div>
    <div class="row q-col-gutter-md">
      <div v-for="related in relatedProducts" :key="related.id" class="col-12 col-sm-6 col-md-4">
        <ProductCard :product="related" @click="goToProduct" />
      </div>
    </div>
  </q-page>

  <q-page v-else class="q-pa-md flex flex-center text-grey-5">Product not found.</q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import ProductCard from '../components/ProductCard.vue';
import { products, type Product } from '../data/products';
import { useCartStore } from '../cart-store';

const route = useRoute();
const router = useRouter();
const $q = useQuasar();
const cart = useCartStore();

const product = computed(() => products.find((p) => p.id === route.params.id));
const quantity = ref(1);
const wishlisted = ref(false);

const badgeColor = computed(() => {
  const map: Record<string, string> = { New: 'info', Featured: 'primary', Sale: 'negative' };
  return product.value?.badge ? map[product.value.badge] : 'grey';
});

const perks = [
  { icon: 'local_shipping', label: 'Free shipping' },
  { icon: 'verified_user', label: 'Secure payment' },
  { icon: 'autorenew', label: 'Easy 30-day returns' },
  { icon: 'workspace_premium', label: 'Quality guaranteed' },
];

const relatedProducts = computed(() => {
  const others = products.filter((p) => p.id !== product.value?.id);
  const sameCategory = others.filter((p) => p.category === product.value?.category);
  const rest = others.filter((p) => p.category !== product.value?.category);
  return [...sameCategory, ...rest].slice(0, 3);
});

function goToProduct(target: Product) {
  quantity.value = 1;
  wishlisted.value = false;
  void router.push(`/ecommerce/products/${target.id}`);
}

function addToCart() {
  if (!product.value) return;
  cart.add(product.value, quantity.value);
  $q.notify({
    message: `${quantity.value} × ${product.value.name} added to cart`,
    color: 'positive',
    position: 'bottom',
    timeout: 1500,
    actions: [
      { label: 'View cart', color: 'white', handler: () => void router.push('/ecommerce/cart') },
    ],
  });
}

function shareProduct() {
  $q.notify({
    message: 'Link copied to clipboard',
    color: 'dark',
    position: 'bottom',
    timeout: 1500,
  });
}
</script>
