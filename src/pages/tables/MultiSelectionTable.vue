<template>
  <q-page class="bg-secondary" padding>
    <div class="row q-col-gutter-md justify-center">
      <div class="col-md-8 col-sm-12 col-xs-12">
        <multi-selection-table />
      </div>
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'PageMultiSelectionTable',
  components: {
    MultiSelectionTable: () => import('components/active/table/MultiSelectionTable')
  }
}
</script>
