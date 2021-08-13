<template>
<div>
  <q-table
    title="Treats"
    :rows="rows"
    row-key="calories"
  />
</div>
</template>

<script>
export default {
  name: 'BasicTable',
  data () {
    return {
      columns: [
        { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true }
      ],
      rows: [
        {
          calories: 159
        }
      ]
    }
  }
}
</script>
