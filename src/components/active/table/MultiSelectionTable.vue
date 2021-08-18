<template>
  <q-table
    title="Multiple Selection"
    :data="rows"
    :columns="columns"
    row-key="name"
    :dark="dark"
    :dense="dense"
    :card-class="color ? 'bg-primary text-white' : ''"
    :hide-header="hideHeader"
    :hide-bottom="hideBottom"
    :grid="grid"
    :filter="filter"
    selection="multiple"
    :selected.sync="selected"
  >
    <template v-slot:top-right v-if="search">
      <q-input dense debounce="300" v-model="filter" placeholder="Search" >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
  </q-table>
</template>

<script>
export default {
  name: 'BasicleTable',
  props: {
    dark: {
      type: Boolean,
      required: false,
      default: false
    },
    dense: {
      type: Boolean,
      required: false,
      default: false
    },
    color: {
      type: Boolean,
      required: false,
      default: false
    },
    hideHeader: {
      type: Boolean,
      required: false,
      default: false
    },
    hideBottom: {
      type: Boolean,
      required: false,
      default: false
    },
    grid: {
      type: Boolean,
      required: false,
      default: false
    },
    search: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  watch: {
    search: function (val) {
      if (!val) {
        this.filter = ''
      }
    }
  },
  data () {
    return {
      filter: '',
      selected: [],
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
          label: 'Country',
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
