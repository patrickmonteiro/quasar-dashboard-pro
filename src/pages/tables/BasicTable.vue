<template>
  <q-page class="bg-secondary" padding>
    <div class="row q-col-gutter-md justify-center">
      <div class="col-md-9 col-sm-12 col-xs-12 text-center">
        <q-toggle
          v-model="dark"
          label="Dark"
        />
        <q-toggle
          v-model="dense"
          label="Dense"
        />
        <q-toggle
          v-model="color"
          label="Color"
        />
        <q-toggle
          v-model="hideHeader"
          label="Hide Header"
        />
        <q-toggle
          v-model="hideBottom"
          label="Hide Bottom"
        />
        <q-toggle
          v-model="grid"
          label="Grid"
        />
        <q-toggle
          v-model="search"
          label="Search"
        />
      </div>
    </div>
    <div class="row q-col-gutter-md justify-center">
      <div class="col-md-8 col-sm-12 col-xs-12">
        <basic-table
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
  name: 'PageBasicTable',
  components: {
    BasicTable: () => import('components/active/table/BasicTable')
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
