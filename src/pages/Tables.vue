<template>
  <q-page class="bg-secondary" padding>
    <div class="row q-col-gutter-md justify-center">
      <div class="col-md-8 col-sm-12 col-xs-12">
        <basic-table />
      </div>
      <!-- <div class="col-md-6 col-sm-12 col-xs-12">
      </div> -->
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'PageTables',
  components: {
    BasicTable: () => import('components/active/table/BasicTable')
  }
}
</script>
