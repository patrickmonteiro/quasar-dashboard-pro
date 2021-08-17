<template>
  <q-table
    title="Basic"
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
        },
        {
          name: 'age',
          field: 'age',
          label: 'Age',
          align: 'left',
          required: true
        },
        {
          name: 'country',
          field: 'country',
          label: 'Countr',
          align: 'left',
          required: true
        }
      ],
      rows: [
        {
          name: 'Patrick Monteiro',
          age: 18,
          country: 'Brazil'
        },
        {
          name: 'Luiz Patel',
          age: 22,
          country: 'Indian'
        },
        {
          name: 'Arnold Smith',
          age: 30,
          country: 'EUA'
        }
      ]
    }
  }
}
</script>
