<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-weight-bold q-mb-md">Transactions</div>

    <TransactionsTable :transactions="transactions" :page-size="8" />
  </q-page>
</template>

<script setup lang="ts">
import TransactionsTable from '../components/TransactionsTable.vue';
import { transactions } from '../data/transactions';
</script>
