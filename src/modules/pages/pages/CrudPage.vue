<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5 text-weight-bold">Products</div>
      <div class="row q-gutter-sm">
        <q-btn
          v-if="selected.length > 0"
          flat
          no-caps
          color="negative"
          icon="delete"
          :label="`Delete (${selected.length})`"
          @click="confirmDeleteSelected"
        />
        <q-btn
          unelevated
          no-caps
          color="primary"
          icon="add"
          label="New product"
          @click="openCreate"
        />
      </div>
    </div>

    <q-card flat bordered>
      <q-card-section>
        <q-input
          v-model="search"
          dense
          outlined
          placeholder="Search products"
          style="max-width: 280px"
        >
          <template #prepend>
            <q-icon name="search" size="18px" />
          </template>
        </q-input>
      </q-card-section>

      <q-separator />

      <q-table
        v-model:selected="selected"
        flat
        :rows="filteredItems"
        :columns="columns"
        row-key="id"
        selection="multiple"
        :rows-per-page-options="[10, 25, 0]"
      >
        <template #body-cell-status="cellProps">
          <q-td :props="cellProps">
            <q-badge :color="cellProps.value === 'Active' ? 'positive' : 'grey-6'" rounded outline>
              {{ cellProps.value }}
            </q-badge>
          </q-td>
        </template>

        <template #body-cell-price="cellProps">
          <q-td :props="cellProps">${{ cellProps.value.toFixed(2) }}</q-td>
        </template>

        <template #body-cell-actions="cellProps">
          <q-td :props="cellProps" class="text-right">
            <q-btn flat round dense icon="edit" size="sm" @click="openEdit(cellProps.row)" />
            <q-btn
              flat
              round
              dense
              icon="delete"
              size="sm"
              color="negative"
              @click="confirmDelete(cellProps.row)"
            />
          </q-td>
        </template>
      </q-table>
    </q-card>

    <q-dialog v-model="formOpen">
      <q-card style="width: 420px; max-width: 90vw">
        <q-card-section>
          <div class="text-subtitle1 text-weight-medium">
            {{ editingId ? 'Edit product' : 'New product' }}
          </div>
        </q-card-section>

        <q-card-section class="row q-col-gutter-sm">
          <div class="col-12">
            <q-input v-model="form.name" dense outlined label="Name" />
          </div>
          <div class="col-12">
            <q-select
              v-model="form.category"
              dense
              outlined
              label="Category"
              :options="categoryOptions"
            />
          </div>
          <div class="col-6">
            <q-input
              v-model.number="form.price"
              dense
              outlined
              type="number"
              label="Price"
              prefix="$"
            />
          </div>
          <div class="col-6">
            <q-input v-model.number="form.quantity" dense outlined type="number" label="Quantity" />
          </div>
          <div class="col-12">
            <q-select
              v-model="form.status"
              dense
              outlined
              label="Status"
              :options="['Active', 'Inactive']"
            />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat no-caps label="Cancel" v-close-popup />
          <q-btn
            unelevated
            no-caps
            color="primary"
            label="Save"
            :disable="!form.name"
            @click="save"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useQuasar } from 'quasar';
import type { QTableColumn } from 'quasar';
import { items as initialItems, type CrudItem } from '../data/items';

const $q = useQuasar();

const items = ref<CrudItem[]>([...initialItems]);
const search = ref('');
const selected = ref<CrudItem[]>([]);

const filteredItems = computed(() =>
  items.value.filter(
    (item) =>
      item.name.toLowerCase().includes(search.value.toLowerCase()) ||
      item.category.toLowerCase().includes(search.value.toLowerCase()),
  ),
);

const categoryOptions = computed(() => Array.from(new Set(initialItems.map((i) => i.category))));

const columns: QTableColumn[] = [
  { name: 'name', label: 'Name', field: 'name', align: 'left', sortable: true },
  { name: 'category', label: 'Category', field: 'category', align: 'left', sortable: true },
  { name: 'price', label: 'Price', field: 'price', align: 'left', sortable: true },
  { name: 'quantity', label: 'Qty', field: 'quantity', align: 'left', sortable: true },
  { name: 'status', label: 'Status', field: 'status', align: 'left' },
  { name: 'actions', label: '', field: 'id', align: 'right' },
];

const formOpen = ref(false);
const editingId = ref<string | null>(null);
const form = ref<{
  name: string;
  category: string;
  price: number;
  quantity: number;
  status: CrudItem['status'];
}>({ name: '', category: categoryOptions.value[0] ?? '', price: 0, quantity: 0, status: 'Active' });

function openCreate() {
  editingId.value = null;
  form.value = {
    name: '',
    category: categoryOptions.value[0] ?? '',
    price: 0,
    quantity: 0,
    status: 'Active',
  };
  formOpen.value = true;
}

function openEdit(item: CrudItem) {
  editingId.value = item.id;
  form.value = {
    name: item.name,
    category: item.category,
    price: item.price,
    quantity: item.quantity,
    status: item.status,
  };
  formOpen.value = true;
}

function save() {
  if (editingId.value) {
    const index = items.value.findIndex((i) => i.id === editingId.value);
    if (index !== -1) items.value[index] = { id: editingId.value, ...form.value };
    $q.notify({ message: 'Product updated', color: 'positive', position: 'bottom', timeout: 1500 });
  } else {
    items.value.unshift({ id: crypto.randomUUID(), ...form.value });
    $q.notify({ message: 'Product created', color: 'positive', position: 'bottom', timeout: 1500 });
  }
  formOpen.value = false;
}

function removeItems(ids: string[]) {
  items.value = items.value.filter((item) => !ids.includes(item.id));
  selected.value = selected.value.filter((item) => !ids.includes(item.id));
}

function confirmDelete(item: CrudItem) {
  $q.dialog({
    title: 'Delete product',
    message: `Delete "${item.name}"? This can't be undone.`,
    cancel: true,
    persistent: true,
  }).onOk(() => {
    removeItems([item.id]);
    $q.notify({ message: 'Product deleted', color: 'dark', position: 'bottom', timeout: 1500 });
  });
}

function confirmDeleteSelected() {
  const ids = selected.value.map((item) => item.id);
  $q.dialog({
    title: 'Delete products',
    message: `Delete ${ids.length} selected product(s)? This can't be undone.`,
    cancel: true,
    persistent: true,
  }).onOk(() => {
    removeItems(ids);
    $q.notify({ message: 'Products deleted', color: 'dark', position: 'bottom', timeout: 1500 });
  });
}
</script>
