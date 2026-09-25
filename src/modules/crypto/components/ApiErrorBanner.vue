<template>
  <q-banner rounded class="api-error-banner q-mb-md">
    <template #avatar>
      <q-icon
        :name="error.code === 'RATE_LIMITED' ? 'hourglass_top' : 'cloud_off'"
        color="negative"
      />
    </template>
    <div class="text-weight-medium">{{ title }}</div>
    <div class="text-caption">{{ error.message }}</div>
    <div v-if="error.code === 'RATE_LIMITED'" class="text-caption text-grey-6">
      The keyless CoinGecko tier allows only a few calls per minute — add a free Demo key in
      <code>.env</code> (<code>QCLI_COINGECKO_API_KEY</code>) for a higher quota.
    </div>
    <template #action>
      <q-btn
        flat
        no-caps
        color="primary"
        label="Try again"
        :loading="retrying"
        @click="emit('retry')"
      />
    </template>
  </q-banner>
</template>

<script setup lang="ts">
import type { ApiError } from '@/services/api-client';

withDefaults(defineProps<{ error: ApiError; title?: string; retrying?: boolean }>(), {
  title: "Couldn't load market data",
  retrying: false,
});

const emit = defineEmits<{ retry: [] }>();
</script>

<style scoped>
.api-error-banner {
  border: 1px solid color-mix(in srgb, var(--q-negative) 35%, transparent);
  background: color-mix(in srgb, var(--q-negative) 6%, transparent);
}
</style>
