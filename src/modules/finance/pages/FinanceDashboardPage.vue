<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5 text-weight-bold">Finance</div>
      <q-btn-toggle
        v-model="period"
        no-caps
        unelevated
        toggle-color="primary"
        color="white"
        text-color="grey-8"
        :options="[
          { label: 'Weekly', value: 'weekly' },
          { label: 'Monthly', value: 'monthly' },
          { label: 'Yearly', value: 'yearly' },
        ]"
      />
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div v-for="account in accounts" :key="account.currency" class="col-12 col-sm-6 col-md-3">
        <CurrencyCard
          :currency="account.currency"
          :account="account.account"
          :amount="account.amount"
          :change-percent="account.changePercent"
          :color="account.color"
          :data="account.data"
        />
      </div>
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-12 col-md-8">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle1 text-weight-medium">Income &amp; expenditure</div>
            <div class="text-caption text-grey-5">Trends summary, performance analysis</div>
          </q-card-section>
          <q-card-section>
            <apexchart
              type="area"
              height="300"
              :options="overviewChart.options"
              :series="overviewChart.series"
            />
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <BudgetCard
          :spent="7243"
          :remaining="2757"
          :categories="categories"
          :saved="18500"
          :goal="25000"
        />
      </div>
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-12 col-md-4">
        <CreditScoreCard
          :score="780"
          :loan-amount="40000"
          :interest-rate="1.2"
          :installments="24"
          :repay-amount="44000"
        />
      </div>

      <div class="col-12 col-md-8">
        <TransactionsTable
          :transactions="transactions"
          :page-size="5"
          see-all-to="/finance/transactions"
        />
      </div>
    </div>

    <MoneyFlowDiagram />
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useQuasar } from 'quasar';
import CurrencyCard from '../components/CurrencyCard.vue';
import BudgetCard from '../components/BudgetCard.vue';
import CreditScoreCard from '../components/CreditScoreCard.vue';
import TransactionsTable from '../components/TransactionsTable.vue';
import MoneyFlowDiagram from '../components/MoneyFlowDiagram.vue';
import { accounts } from '../data/accounts';
import { transactions } from '../data/transactions';

const $q = useQuasar();
const period = ref<'weekly' | 'monthly' | 'yearly'>('weekly');

// Placeholder data — wire this up to a real API when available.
const categories = [
  { label: 'Food', amount: 3243, percent: 45, color: '#4f46e5' },
  { label: 'Clothing', amount: 2111, percent: 30, color: '#f59e0b' },
  { label: 'Other', amount: 2485, percent: 25, color: '#3b82f6' },
];

const overviewChart = computed(() => ({
  options: {
    chart: { toolbar: { show: false }, background: $q.dark.isActive ? '#18181b' : '#ffffff' },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 1.5 },
    theme: { mode: $q.dark.isActive ? 'dark' : 'light' },
    grid: { borderColor: $q.dark.isActive ? '#3f3f46' : '#e5e7eb' },
    xaxis: {
      categories: ['Aug 16', 'Aug 23', 'Aug 30', 'Sep 6', 'Sep 13', 'Sep 20', 'Sep 27'],
    },
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0 },
    },
    colors: ['#4f46e5', '#a1a1aa'],
    legend: { show: false },
  },
  series: [
    { name: 'Income', data: [22, 28, 24, 32, 38, 35, 48] },
    { name: 'Expenditure', data: [12, 15, 14, 18, 20, 19, 22] },
  ],
}));
</script>
