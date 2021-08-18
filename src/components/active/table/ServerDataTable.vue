<template>
  <q-table
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
    <template v-slot:top>
        <span class="text-h6">
          Server Data
        </span>
        <q-space />
        <q-btn class="q-ml-sm" color="primary" icon="mdi-refresh" label="Request" @click="getPosts" />
    </template>

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
  name: 'ServerDataTable',
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
          name: 'id',
          field: 'id',
          label: 'Id',
          align: 'left',
          required: true
        },
        {
          name: 'title',
          field: 'title',
          label: 'Title',
          align: 'left',
          required: true
        }
      ],
      rows: []
    }
  },
  methods: {
    async getPosts () {
      this.rows = []
      try {
        const response = await this.$axios.get('https://jsonplaceholder.typicode.com/posts')
        this.rows = response.data
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>
