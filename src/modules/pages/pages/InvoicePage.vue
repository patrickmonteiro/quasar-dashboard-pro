<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-md no-print">
      <div class="text-h5 text-weight-bold">Invoice</div>
      <div class="row q-gutter-sm">
        <q-btn flat no-caps icon="download" label="Download PDF" @click="print" />
        <q-btn unelevated no-caps color="primary" icon="print" label="Print" @click="print" />
      </div>
    </div>

    <q-card flat bordered class="invoice-card">
      <q-card-section class="row items-start justify-between">
        <div class="row items-center q-gutter-sm">
          <img :src="logoIcon" alt="" width="32" height="32" />
          <div>
            <div class="text-subtitle1 text-weight-bold">Quasar Dashboard PRO</div>
            <div class="text-caption text-grey-6">1234 Elm Street, Springfield, IL 62704</div>
          </div>
        </div>
        <div class="text-right">
          <div class="text-h5 text-weight-bold text-primary">INVOICE</div>
          <q-badge rounded outline color="positive" class="q-mt-xs">Paid</q-badge>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="row q-col-gutter-md">
        <div class="col-12 col-sm-4">
          <div class="text-caption text-grey-5">Invoice number</div>
          <div class="text-weight-medium">{{ invoice.number }}</div>
        </div>
        <div class="col-12 col-sm-4">
          <div class="text-caption text-grey-5">Issue date</div>
          <div class="text-weight-medium">{{ invoice.issueDate }}</div>
        </div>
        <div class="col-12 col-sm-4">
          <div class="text-caption text-grey-5">Due date</div>
          <div class="text-weight-medium">{{ invoice.dueDate }}</div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="row q-col-gutter-md">
        <div class="col-12 col-sm-6">
          <div class="text-caption text-grey-5 q-mb-xs">Billed to</div>
          <div class="text-weight-medium">{{ invoice.billTo.name }}</div>
          <div class="text-body2 text-grey-7">{{ invoice.billTo.company }}</div>
          <div class="text-body2 text-grey-7">{{ invoice.billTo.address }}</div>
        </div>
        <div class="col-12 col-sm-6">
          <div class="text-caption text-grey-5 q-mb-xs">From</div>
          <div class="text-weight-medium">Quasar Dashboard PRO Store</div>
          <div class="text-body2 text-grey-7">billing@quasardashboardpro.dev</div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-table
          flat
          hide-pagination
          :rows="invoice.items"
          :columns="itemColumns"
          row-key="description"
          :rows-per-page-options="[0]"
        >
          <template #body-cell-unitPrice="cellProps">
            <q-td :props="cellProps">${{ cellProps.value.toFixed(2) }}</q-td>
          </template>
          <template #body-cell-total="cellProps">
            <q-td :props="cellProps">${{ cellProps.value.toFixed(2) }}</q-td>
          </template>
        </q-table>
      </q-card-section>

      <q-separator />

      <q-card-section class="row justify-end">
        <div class="invoice-totals">
          <div class="row justify-between q-py-xs">
            <div class="text-grey-6">Subtotal</div>
            <div class="text-weight-medium">${{ subtotal.toFixed(2) }}</div>
          </div>
          <div class="row justify-between q-py-xs">
            <div class="text-grey-6">Tax (8%)</div>
            <div class="text-weight-medium">${{ tax.toFixed(2) }}</div>
          </div>
          <q-separator class="q-my-sm" />
          <div class="row justify-between items-center">
            <div class="text-subtitle1 text-weight-bold">Total</div>
            <div class="text-h6 text-weight-bold text-primary">${{ total.toFixed(2) }}</div>
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="text-caption text-grey-6">
        Thank you for your business. Payment is due within 14 days of the issue date.
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { QTableColumn } from 'quasar';
import logoIcon from '@/assets/logo-icon.png';

// Placeholder data — wire this up to a real billing API when available.
const invoice = {
  number: 'INV-2026-0142',
  issueDate: 'Sep 21, 2026',
  dueDate: 'Oct 5, 2026',
  billTo: {
    name: 'Robert Fox',
    company: 'Nimbus Ltd.',
    address: '1234 Elm Street, Apt 56, Springfield, IL 62704',
  },
  items: [
    { description: 'Dashboard Pro — Annual license', quantity: 1, unitPrice: 249.0, total: 249.0 },
    { description: 'Priority support (3 months)', quantity: 1, unitPrice: 89.0, total: 89.0 },
    { description: 'Extra seats', quantity: 4, unitPrice: 12.0, total: 48.0 },
  ],
};

const itemColumns: QTableColumn[] = [
  { name: 'description', label: 'Description', field: 'description', align: 'left' },
  { name: 'quantity', label: 'Qty', field: 'quantity', align: 'left' },
  { name: 'unitPrice', label: 'Unit price', field: 'unitPrice', align: 'left' },
  { name: 'total', label: 'Total', field: 'total', align: 'right' },
];

const subtotal = computed(() => invoice.items.reduce((sum, item) => sum + item.total, 0));
const tax = computed(() => subtotal.value * 0.08);
const total = computed(() => subtotal.value + tax.value);

function print() {
  window.print();
}
</script>

<style scoped>
.invoice-card {
  max-width: 900px;
  margin: 0 auto;
}

.invoice-totals {
  width: 260px;
}
</style>

<style>
@media print {
  .no-print,
  .app-drawer,
  .q-header {
    display: none !important;
  }

  .invoice-card {
    max-width: none;
    box-shadow: none !important;
    border: none !important;
  }
}
</style>
