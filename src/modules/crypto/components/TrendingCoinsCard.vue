<template>
  <q-card flat bordered class="full-height">
    <q-card-section class="row items-center no-wrap q-pb-none">
      <div>
        <div class="text-subtitle1 text-weight-medium">Trending</div>
        <div class="text-caption text-grey-5">Most searched on CoinGecko · 24h</div>
      </div>
      <q-space />
      <q-icon name="local_fire_department" size="20px" color="warning" />
    </q-card-section>

    <q-list v-if="loading && coins.length === 0" class="q-py-sm">
      <q-item v-for="n in 5" :key="n">
        <q-item-section avatar><q-skeleton type="QAvatar" size="28px" /></q-item-section>
        <q-item-section><q-skeleton type="text" width="60%" /></q-item-section>
      </q-item>
    </q-list>

    <q-list v-else class="q-py-sm">
      <q-item
        v-for="(coin, index) in coins.slice(0, 5)"
        :key="coin.id"
        clickable
        :to="`/crypto/coins/${coin.id}`"
      >
        <q-item-section avatar>
          <q-avatar size="28px">
            <img :src="coin.thumb" :alt="coin.name" loading="lazy" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-weight-medium">{{ coin.name }}</q-item-label>
          <q-item-label caption>{{ coin.symbol }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <div class="row items-center no-wrap q-gutter-x-sm">
            <span v-if="coin.rank" class="text-caption text-grey-5">#{{ coin.rank }}</span>
            <q-badge rounded outline color="warning">{{ index + 1 }}</q-badge>
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script setup lang="ts">
import type { TrendingCoin } from '@/services/coingecko';

defineProps<{
  coins: TrendingCoin[];
  loading?: boolean;
}>();
</script>
