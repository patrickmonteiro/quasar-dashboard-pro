<template>
  <q-page class="bg-secondary" padding>
    <div class="row q-col-gutter-md justify-center">
      <div class="col-md-8 col-sm-12 col-xs-12">
        <server-data-table
          :dark="dark"
          :dense="dense"
          :color="color"
          :hide-header="hideHeader"
          :hide-bottom="hideBottom"
          :grid="grid"
          :search="search"
        />
      </div>
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'PageServerDataTable',
  components: {
    ServerDataTable: () => import('components/active/table/ServerDataTable')
  },
  data () {
    return {
      dark: false,
      dense: false,
      color: false,
      hideHeader: false,
      hideBottom: false,
      grid: false,
      search: false
    }
  }
}
</script>
