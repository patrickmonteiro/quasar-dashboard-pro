<template>
  <q-card flat bordered class="full-height">
    <q-card-section class="row items-center no-wrap q-pb-none">
      <div class="text-subtitle1 text-weight-medium">{{ title }}</div>
      <q-space />
      <q-icon :name="icon" size="20px" :color="iconColor" />
    </q-card-section>

    <q-list v-if="loading && coins.length === 0" class="q-py-sm">
      <q-item v-for="n in 5" :key="n">
        <q-item-section avatar><q-skeleton type="QAvatar" size="28px" /></q-item-section>
        <q-item-section><q-skeleton type="text" width="60%" /></q-item-section>
        <q-item-section side><q-skeleton type="text" width="48px" /></q-item-section>
      </q-item>
    </q-list>

    <q-list v-else class="q-py-sm">
      <q-item v-for="coin in coins" :key="coin.id" clickable :to="`/crypto/coins/${coin.id}`">
        <q-item-section avatar>
          <q-avatar size="28px">
            <img :src="coin.image" :alt="coin.name" loading="lazy" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-weight-medium">{{ coin.name }}</q-item-label>
          <q-item-label caption>{{ formatPrice(coin.price) }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <PriceChange :value="coin.change24h" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script setup lang="ts">
import type { CoinMarket } from '@/services/coingecko';
import PriceChange from './PriceChange.vue';
import { formatPrice } from '../format';

defineProps<{
  title: string;
  icon: string;
  iconColor: string;
  coins: CoinMarket[];
  loading?: boolean;
}>();
</script>
