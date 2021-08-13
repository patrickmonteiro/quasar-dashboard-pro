<template>
  <q-page class="bg-secondary" padding>
    <div class="row q-col-gutter-md">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <basic-table />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
      </div>
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'PageTables',
  components: {
    BasicTable: () => import('components/active/table/BasicTable')
  },
  data () {
    return {
    }
  }
}
</script>
