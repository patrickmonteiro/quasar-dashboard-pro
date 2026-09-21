<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5 text-weight-bold">Products</div>
      <q-btn color="primary" unelevated no-caps icon="add" label="New product" />
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-12 col-sm-6">
        <q-input v-model="search" dense outlined placeholder="Search products">
          <template #prepend>
            <q-icon name="search" size="18px" />
          </template>
        </q-input>
      </div>
      <div class="col-6 col-sm-3">
        <q-select
          v-model="category"
          dense
          outlined
          emit-value
          map-options
          :options="categoryOptions"
          label="Category"
        />
      </div>
      <div class="col-6 col-sm-3">
        <q-select
          v-model="sortBy"
          dense
          outlined
          emit-value
          map-options
          :options="sortOptions"
          label="Sort by"
        />
      </div>
    </div>

    <div class="row q-col-gutter-md">
      <div v-for="product in visibleProducts" :key="product.id" class="col-12 col-sm-6 col-md-4">
        <ProductCard
          :product="product"
          :wishlisted="wishlist.has(product.id)"
          @click="goToProduct"
          @toggle-wishlist="toggleWishlist"
          @add-to-cart="addToCart"
        />
      </div>

      <div v-if="visibleProducts.length === 0" class="col-12 text-center text-grey-5 q-py-xl">
        No products match your search.
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import ProductCard from '../components/ProductCard.vue';
import { products, type Product } from '../data/products';
import { useCartStore } from '../cart-store';

const router = useRouter();
const $q = useQuasar();
const cart = useCartStore();

const search = ref('');
const category = ref('all');
const sortBy = ref('featured');
const wishlist = ref(new Set<string>());

const categoryOptions = computed(() => [
  { label: 'All categories', value: 'all' },
  ...[...new Set(products.map((p) => p.category))].map((c) => ({ label: c, value: c })),
]);

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: low to high', value: 'price-asc' },
  { label: 'Price: high to low', value: 'price-desc' },
  { label: 'Rating', value: 'rating' },
];

const visibleProducts = computed(() => {
  let list = products.filter(
    (p) =>
      (category.value === 'all' || p.category === category.value) &&
      p.name.toLowerCase().includes(search.value.toLowerCase()),
  );

  list = [...list];
  if (sortBy.value === 'price-asc') list.sort((a, b) => a.price - b.price);
  else if (sortBy.value === 'price-desc') list.sort((a, b) => b.price - a.price);
  else if (sortBy.value === 'rating') list.sort((a, b) => b.rating - a.rating);

  return list;
});

function goToProduct(product: Product) {
  void router.push(`/ecommerce/products/${product.id}`);
}

function toggleWishlist(product: Product) {
  if (wishlist.value.has(product.id)) wishlist.value.delete(product.id);
  else wishlist.value.add(product.id);
  wishlist.value = new Set(wishlist.value);
}

function addToCart(product: Product) {
  cart.add(product);
  $q.notify({
    message: `${product.name} added to cart`,
    color: 'positive',
    position: 'bottom',
    timeout: 1500,
    actions: [
      { label: 'View cart', color: 'white', handler: () => void router.push('/ecommerce/cart') },
    ],
  });
}
</script>
