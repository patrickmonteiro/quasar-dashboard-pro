<template>
  <q-card bordered>
    <q-card-section horizontal class="">
      <q-card-section class="q-pt-xs">
        <div class="text-h6 q-mt-sm q-mb-xs">{{ title }}</div>
        <div class="text-subtitle1 text-bold text-grey">
          {{ subTitle }}
        </div>
      </q-card-section>

      <q-card-section class="fit row justify-end content-end">
        <q-avatar
          size="70px"
          font-size="52px"
          :color="colorIcon"
          text-color="white"
          :icon="icon"
        />
      </q-card-section>
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
  name: 'CardDashboard',
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
    }
  }
}
</script>
