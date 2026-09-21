<template>
  <q-card v-ripple flat bordered class="product-card" @click="emit('click', product)">
    <div class="product-card__image-wrap">
      <q-img :src="product.images[0]" :ratio="4 / 3" class="product-card__image" />

      <q-badge v-if="product.badge" :color="badgeColor" class="product-card__badge" rounded>
        {{ product.badge }}
      </q-badge>

      <div class="product-card__actions">
        <q-btn
          round
          dense
          size="sm"
          :color="wishlisted ? 'negative' : 'white'"
          :text-color="wishlisted ? 'white' : 'grey-8'"
          :icon="wishlisted ? 'favorite' : 'favorite_border'"
          @click.stop="emit('toggle-wishlist', product)"
        />
        <q-btn
          round
          dense
          size="sm"
          color="white"
          text-color="grey-8"
          icon="add_shopping_cart"
          @click.stop="emit('add-to-cart', product)"
        />
      </div>
    </div>

    <q-card-section>
      <div class="text-caption text-grey-5">{{ product.category }}</div>
      <div class="text-subtitle1 text-weight-medium ellipsis">{{ product.name }}</div>

      <div class="row items-center justify-between q-mt-xs">
        <div class="text-weight-bold">${{ product.price.toFixed(2) }}</div>
        <q-badge color="warning" text-color="white" rounded>
          <q-icon name="star" size="12px" class="q-mr-xs" />
          {{ product.rating }}
        </q-badge>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Product } from '../data/products';

const props = defineProps<{
  product: Product;
  wishlisted?: boolean;
}>();

const emit = defineEmits<{
  click: [product: Product];
  'toggle-wishlist': [product: Product];
  'add-to-cart': [product: Product];
}>();

const badgeColor = computed(() => {
  const map: Record<string, string> = { New: 'info', Featured: 'primary', Sale: 'negative' };
  return props.product.badge ? map[props.product.badge] : 'grey';
});
</script>

<style scoped>
.product-card {
  cursor: pointer;
  overflow: hidden;
  transition:
    box-shadow 0.15s ease,
    border-color 0.15s ease,
    transform 0.15s ease;
}

.product-card:hover {
  border-color: var(--q-primary);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.product-card__image-wrap {
  position: relative;
}

.product-card__badge {
  position: absolute;
  top: 10px;
  left: 10px;
}

.product-card__actions {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
</style>
