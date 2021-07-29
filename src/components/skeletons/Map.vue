<template>
<div class="row q-col-gutter-md">
  <div
    class="col-md-12 col-sm-12 col-xs-12"
  >
    <q-skeleton height="80px" square :style="`height: calc(${height}vh - 100px)`" />
  </div>
</div>
</template>

<script>
export default {
  name: 'MapSkeleton',
  props: {
    height: {
      type: Number,
      required: false,
      default: 100
    }
  }
}
</script>
