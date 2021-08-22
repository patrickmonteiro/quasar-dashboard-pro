<template>
  <q-card bordered>
    <q-card-section horizontal>
      <q-card-section>
        <div class="text-subtitle1 text-bold text-grey">
          {{ subTitle }}
        </div>
        <div class="text-h4 text-bold text-grey-10 q-mt-sm q-mb-xs">{{ title }}</div>
      </q-card-section>
    </q-card-section>

    <q-card-section>
      <q-linear-progress rounded :color="colorIcon" size="5px" :value="percentage" />
    </q-card-section>
    <q-separator />

    <q-card-actions>
      <q-btn flat color="grey-7" :icon="actionIcon" @click="$emit('refresh')">
        {{ actionText }}
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: 'CardFintech',
  props: {
    title: {
      type: String,
      required: true,
      default: ''
    },
    subTitle: {
      type: String,
      required: false,
      default: ''
    },
    icon: {
      type: String,
      required: false,
      default: 'mdi-database-plus-outline'
    },
    colorIcon: {
      type: String,
      required: false,
      default: 'warning'
    },
    actionText: {
      type: String,
      required: false,
      default: 'Refresh'
    },
    actionIcon: {
      type: String,
      required: false,
      default: 'mdi-refresh'
    },
    percentage: {
      type: Number,
      required: false,
      default: 0
    }
  }
}
</script>
