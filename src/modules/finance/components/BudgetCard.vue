<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-subtitle1 text-weight-medium">Spending limit</div>
      <div class="text-caption text-grey-5 q-mb-sm">Monthly budget usage</div>

      <q-linear-progress
        :value="spent / (spent + remaining)"
        size="10px"
        rounded
        color="primary"
        track-color="grey-3"
        class="q-mb-sm"
      />

      <div class="row justify-between">
        <div>
          <div class="text-caption text-grey-5">Spent</div>
          <div class="text-weight-bold">{{ formatCurrency(spent) }}</div>
        </div>
        <div class="text-right">
          <div class="text-caption text-grey-5">Remaining</div>
          <div class="text-weight-bold">{{ formatCurrency(remaining) }}</div>
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <div class="text-subtitle1 text-weight-medium q-mb-sm">Expenditure</div>

      <div class="row expenditure-bar q-mb-sm">
        <div
          v-for="category in categories"
          :key="category.label"
          :style="{ width: category.percent + '%', backgroundColor: category.color }"
        />
      </div>

      <div class="row q-col-gutter-sm">
        <div v-for="category in categories" :key="category.label" class="col-4">
          <div class="row items-center no-wrap q-gutter-xs">
            <div class="legend-dot" :style="{ backgroundColor: category.color }" />
            <div class="text-caption text-grey-5 ellipsis">{{ category.label }}</div>
          </div>
          <div class="text-weight-bold">{{ formatCurrency(category.amount) }}</div>
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <div class="text-subtitle1 text-weight-medium">Savings goal</div>
      <div class="text-caption text-grey-5 q-mb-sm">Progress towards this year's target</div>

      <q-linear-progress
        :value="saved / goal"
        size="10px"
        rounded
        color="accent"
        track-color="grey-3"
        class="q-mb-sm"
      />

      <div class="row justify-between">
        <div>
          <div class="text-caption text-grey-5">Saved</div>
          <div class="text-weight-bold">{{ formatCurrency(saved) }}</div>
        </div>
        <div class="text-right">
          <div class="text-caption text-grey-5">Goal</div>
          <div class="text-weight-bold">{{ formatCurrency(goal) }}</div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
interface Category {
  label: string;
  amount: number;
  percent: number;
  color: string;
}

defineProps<{
  spent: number;
  remaining: number;
  categories: Category[];
  saved: number;
  goal: number;
}>();

function formatCurrency(value: number) {
  return `$${value.toLocaleString('en-US')}`;
}
</script>

<style scoped>
.expenditure-bar {
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
}

.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex: none;
}
</style>
