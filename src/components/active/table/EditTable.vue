<template>
  <q-table
    title="Editable"
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
  >
    <template v-slot:top-right v-if="search">
      <q-input dense debounce="300" v-model="filter" placeholder="Search" >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>

    <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn
            icon="mdi-pencil-outline"
            dense
            color="info"
            size="sm"
          >
            <q-tooltip>
              Edit this line
            </q-tooltip>
          </q-btn>
          <q-btn
            icon="mdi-delete-outline"
            dense
            color="negative"
            size="sm"
          >
            <q-tooltip>
              Delete this line
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
  </q-table>
</template>

<script>
import { users } from 'src/utils/list'
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
          name: 'actions',
          field: 'actions',
          label: 'Actions',
          align: 'right',
          required: false
        }
      ],
      rows: users
    }
  }
}
</script>
