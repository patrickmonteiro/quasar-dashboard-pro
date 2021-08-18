<template>
  <q-page class="bg-secondary" padding>
    <div class="row q-col-gutter-md justify-center">
      <div class="col-md-8 col-sm-12 col-xs-12">
        <selection-table />
      </div>
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'PageSelectionTable',
  components: {
    SelectionTable: () => import('components/active/table/SelectionTable')
  }
}
</script>
