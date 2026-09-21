<template>
  <div class="row items-center no-wrap delivery-stepper">
    <template v-for="(step, i) in steps" :key="step">
      <div class="column items-center delivery-stepper__step">
        <div
          class="delivery-stepper__dot"
          :class="i <= currentStep ? 'delivery-stepper__dot--active' : ''"
        />
        <div
          class="text-caption q-mt-xs"
          :class="i <= currentStep ? 'text-weight-medium' : 'text-grey-5'"
        >
          {{ step }}
        </div>
      </div>
      <div
        v-if="i < steps.length - 1"
        class="delivery-stepper__line"
        :class="i < currentStep ? 'delivery-stepper__line--active' : ''"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { deliverySteps } from '../order-status';

defineProps<{
  currentStep: number;
}>();

const steps = deliverySteps;
</script>

<style scoped>
.delivery-stepper {
  padding: 4px 0;
}

.delivery-stepper__step {
  flex: none;
}

.delivery-stepper__dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid var(--q-primary);
  background: transparent;
}

.delivery-stepper__dot--active {
  background: var(--q-primary);
}

.delivery-stepper__line {
  flex: 1 1 auto;
  height: 2px;
  background: rgba(127, 127, 127, 0.3);
  margin-bottom: 20px;
}

.delivery-stepper__line--active {
  background: var(--q-primary);
}
</style>
