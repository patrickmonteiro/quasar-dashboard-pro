<template>
  <q-page class="bg-secondary" padding>
    <div class="row q-col-gutter-md justify-center">
      <div class="col-md-8 col-sm-12 col-xs-12">
        <edit-table
        />
      </div>
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'PageBasicTable',
  components: {
    EditTable: () => import('components/active/table/EditTable')
  },
  data () {
    return {
    }
  }
}
</script>
