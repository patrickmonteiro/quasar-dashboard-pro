<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5 text-weight-bold">Accounts</div>
      <q-btn color="primary" unelevated no-caps icon="add" label="New account" />
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-12 col-sm-4">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-caption text-grey-5">Total accounts</div>
            <div class="text-h5 text-weight-bold q-mt-xs">{{ accounts.length }}</div>
            <div class="text-caption text-grey-5">across {{ currencyCount }} currencies</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-4">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-caption text-grey-5">Avg. monthly change</div>
            <div
              class="text-h5 text-weight-bold q-mt-xs"
              :class="avgChangePercent >= 0 ? 'text-positive' : 'text-negative'"
            >
              {{ avgChangePercent >= 0 ? '+' : '' }}{{ avgChangePercent.toFixed(1) }}%
            </div>
            <div class="text-caption text-grey-5">
              {{ growingCount }} of {{ accounts.length }} growing
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-4">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-caption text-grey-5">Account types</div>
            <div class="text-h5 text-weight-bold q-mt-xs">{{ accountTypeCount }}</div>
            <div class="text-caption text-grey-5">checking, savings &amp; business</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div v-for="account in accounts" :key="account.account" class="col-12 col-sm-6 col-md-3">
        <AccountCard :account="account" />
      </div>
    </div>

    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-5">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle1 text-weight-medium">Balance distribution</div>
            <div class="text-caption text-grey-5">Share of funds by account</div>
          </q-card-section>
          <q-card-section>
            <apexchart
              type="donut"
              height="260"
              :options="distributionChart.options"
              :series="distributionChart.series"
            />
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-7">
        <q-card flat bordered>
          <q-card-section class="row items-center justify-between">
            <div class="text-subtitle1 text-weight-medium">Recent activity</div>
            <q-btn flat dense no-caps color="primary" label="See all" to="/finance/transactions" />
          </q-card-section>

          <q-list separator>
            <q-item
              v-for="tx in recentActivity"
              :key="tx.id"
              clickable
              @click="onActivityClick(tx)"
            >
              <q-item-section avatar>
                <q-avatar
                  size="32px"
                  :color="tx.avatarColor"
                  text-color="white"
                  class="text-caption"
                >
                  {{ tx.initials }}
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ tx.name }}</q-item-label>
                <q-item-label caption>{{ tx.account }}</q-item-label>
              </q-item-section>

              <q-item-section side>
                <div
                  class="text-weight-medium"
                  :class="tx.amount >= 0 ? 'text-positive' : 'text-negative'"
                >
                  {{ tx.amount >= 0 ? '+' : '-' }}{{ tx.currencySymbol
                  }}{{ Math.abs(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2 }) }}
                </div>
                <div class="text-caption text-grey-5">{{ tx.date }}</div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>
  </q-page>

  <RecordDetailDialog
    v-model="detailOpen"
    :title="detailTitle"
    :subtitle="detailSubtitle"
    :avatar-text="detailAvatarText"
    :avatar-color="detailAvatarColor"
    :fields="detailFields"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useQuasar } from 'quasar';
import AccountCard from '../components/AccountCard.vue';
import { accounts } from '../data/accounts';
import { transactions } from '../data/transactions';
import type { Transaction } from '../components/TransactionsTable.vue';
import RecordDetailDialog, { type DetailField } from '@/components/RecordDetailDialog.vue';

const $q = useQuasar();

const currencyCount = computed(() => new Set(accounts.map((a) => a.currency)).size);
const accountTypeCount = computed(() => new Set(accounts.map((a) => a.type)).size);
const avgChangePercent = computed(
  () => accounts.reduce((sum, a) => sum + a.changePercent, 0) / accounts.length,
);
const growingCount = computed(() => accounts.filter((a) => a.changePercent >= 0).length);

const recentActivity = computed(() => transactions.slice(0, 4));

function formatAmount(tx: Transaction) {
  const sign = tx.amount < 0 ? '-' : '+';
  return `${sign}${tx.currencySymbol}${Math.abs(tx.amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

const detailOpen = ref(false);
const detailTitle = ref('');
const detailSubtitle = ref('');
const detailAvatarText = ref('');
const detailAvatarColor = ref('');
const detailFields = ref<DetailField[]>([]);

function onActivityClick(tx: Transaction) {
  detailTitle.value = tx.name;
  detailSubtitle.value = tx.account;
  detailAvatarText.value = tx.initials;
  detailAvatarColor.value = tx.avatarColor;
  detailFields.value = [
    { label: 'Date', value: tx.date },
    { label: 'Amount', value: formatAmount(tx), color: tx.amount >= 0 ? 'positive' : 'negative' },
    { label: 'Account', value: tx.account },
  ];
  detailOpen.value = true;
}

const distributionChart = computed(() => ({
  options: {
    chart: { background: $q.dark.isActive ? '#18181b' : '#ffffff' },
    labels: accounts.map((a) => a.currency),
    theme: { mode: $q.dark.isActive ? 'dark' : 'light' },
    legend: { position: 'bottom', fontSize: '13px', markers: { size: 6 } },
    colors: accounts.map((a) => a.color),
    stroke: { width: 0 },
    dataLabels: {
      style: { fontSize: '13px', fontWeight: 600 },
      dropShadow: { enabled: false },
    },
    plotOptions: {
      pie: {
        borderRadius: 12,
        spacing: 5,
        donut: { size: '70%' },
      },
    },
  },
  series: accounts.map((a) => Number(a.amount.replace(/[^0-9.]/g, ''))),
}));
</script>
