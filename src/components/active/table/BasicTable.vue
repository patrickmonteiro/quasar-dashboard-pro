<template>
  <q-table
    title="Users"
    :data="rows"
    :columns="columns"
    row-key="name"
  ></q-table>
</template>

<script>
export default {
  name: 'BasicleTable',
  data () {
    return {
      columns: [
        {
          name: 'name',
          field: 'name',
          label: 'Name',
          align: 'left',
          required: true
        }
      ],
      rows: [
        {
          name: 'Patrick'
        },
        {
          name: 'Luiz'
        },
        {
          name: 'Arnold'
        }
      ]
    }
  }
}
</script>
