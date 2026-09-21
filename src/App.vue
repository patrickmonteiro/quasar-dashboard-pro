<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useUiStore } from '@/stores/ui-store';

const uiStore = useUiStore();

onMounted(() => {
  uiStore.applyDarkPreference();
});
</script>
