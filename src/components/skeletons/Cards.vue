<template>
<div class="row q-col-gutter-lg">
  <div
    :class="customClass"
    v-for="card in showNumber"
    :key="card"
  >
    <q-card bordered rounded>
      <q-item>
        <!-- <q-item-section avatar>
          <q-skeleton type="QAvatar" />
        </q-item-section> -->

        <q-item-section>
          <q-item-label caption>
            <q-skeleton type="text" />
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-skeleton :height="height" square />

      <q-card-actions align="left" class="q-gutter-md">
        <q-skeleton type="QBtn" />
      </q-card-actions>
    </q-card>
  </div>
</div>
</template>

<script>
export default {
  name: 'CardsSkeleton',
  props: {
    showNumber: {
      type: Number,
      required: false,
      default: 4
    },
    customClass: {
      type: String,
      require: false,
      default: 'col-md-3 col-sm-12 col-xs-12'
    },
    height: {
      type: String,
      require: false,
      default: '50px'
    }
  }
}
</script>
