<template>
  <q-table
    title="Traffic"
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
    :loading="load"
  >
    <template v-slot:top-right v-if="search">
      <q-input dense debounce="300" v-model="filter" placeholder="Search" >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>

    <template v-slot:body-cell-percentage="props">
      <q-td>
        <q-linear-progress
          rounded
          stripe
          :color="props.row.color"
          size="5px"
          :value="props.row.percentage" />
      </q-td>
    </template>
    <template v-slot:body-cell-boost="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn
            icon="mdi-arrow-up"
            dense
            color="blue"
            size="sm"
            @click="setBoost(props.row.channel)"
          >
            <q-tooltip>
              Boost
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
  </q-table>
</template>

<script>
import { traffic } from 'src/utils/list'
export default {
  name: 'TrafficTable',
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
      load: false,
      columns: [
        {
          name: 'channel',
          field: 'channel',
          label: 'Channel',
          align: 'left',
          required: true
        },
        {
          name: 'sessions',
          field: 'sessions',
          label: 'Sessions',
          align: 'left',
          required: true
        },
        {
          name: 'rate',
          field: 'rate',
          label: 'Rate',
          align: 'left',
          required: true
        },
        {
          name: 'percentage',
          field: 'percentage',
          label: 'Percentage',
          align: 'left',
          required: true
        },
        {
          name: 'boost',
          field: 'boost',
          label: 'Boost',
          align: 'right',
          required: false
        }
      ],
      rows: []
    }
  },
  mounted () {
    this.getTraffic()
  },
  methods: {
    getTraffic () {
      this.rows = []
      this.load = true
      setTimeout(() => {
        this.rows = traffic
        this.load = false
      }, 2000)
    },
    setBoost (channel) {
      this.$q.dialog({
        title: 'Confirm',
        message: `Want to drive traffic via ${channel} ?`,
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$notifySuccess('Boost performed successfully!')
        this.getTraffic()
      })
    }
  }
}
</script>
