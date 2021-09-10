<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered class="bg-secondary">
      <q-toolbar class="bg-secondary text-dark">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Quasar PRO
        </q-toolbar-title>

        <div class="q-gutter-x-sm q-pr-sm">
          <q-btn
            flat
            dense
            round
            icon="mdi-bell-alert-outline"
            aria-label="Alert"
          >
            <q-badge color="negative" dense floating transparent>
              3
            </q-badge>
          </q-btn>
          <button-dropdown />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-dark"
      mini-to-overlay
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
    >
      <q-list>
        <q-item-label
          header
          class="text-white"
        >
          Menu
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Dashboards',
    icon: 'mdi-view-dashboard',
    childrens: [
      {
        title: 'Basic',
        icon: 'mdi-view-dashboard-outline',
        routeName: 'dashboard'
      },
      {
        title: 'Fintech',
        icon: 'mdi-finance',
        routeName: 'fintech'
      }
    ]
  },
  {
    title: 'Maps',
    icon: 'mdi-map',
    routeName: 'map'
  },
  {
    title: 'Charts',
    icon: 'mdi-chart-bar',
    routeName: '',
    childrens: [
      {
        title: 'ApexCharts',
        icon: 'mdi-chart-bell-curve',
        routeName: 'charts'
      }
    ]
  },
  {
    title: 'Audio & Video',
    icon: 'mdi-play-circle-outline',
    childrens: [
      {
        title: 'Audio Record',
        icon: 'mdi-microphone',
        routeName: 'audioRecord'
      },
      {
        title: 'Audio Player',
        icon: 'mdi-volume-high',
        routeName: 'audio'
      },
      {
        title: 'Video Player',
        icon: 'mdi-video-outline',
        routeName: 'video'
      }
    ]
  },
  {
    title: 'Forms',
    icon: 'mdi-format-list-checks',
    childrens: [
      {
        title: 'Basic',
        icon: 'mdi-format-list-checkbox',
        routeName: 'form'
      }
    ]
  },
  {
    title: 'Tables',
    icon: 'mdi-table-large',
    childrens: [
      {
        title: 'Basic',
        icon: 'mdi-table',
        routeName: 'basicTable'
      },
      {
        title: 'Single Selection',
        icon: 'mdi-table-check',
        routeName: 'selectionTable'
      },
      {
        title: 'Multiple Selection',
        icon: 'mdi-table-check',
        routeName: 'multiSelectionTable'
      },
      {
        title: 'Server Data',
        icon: 'mdi-table-refresh',
        routeName: 'serverDataTable'
      },
      {
        title: 'Editable',
        icon: 'mdi-table-edit',
        routeName: 'editTable'
      }
    ]
  },
  {
    title: 'Pages',
    icon: 'mdi-file',
    childrens: [
      {
        title: 'Login',
        icon: 'mdi-login',
        routeName: 'login'
      },
      {
        title: 'Pricing',
        icon: 'mdi-currency-usd',
        routeName: 'pricing'
      },
      {
        title: 'FAQs',
        icon: 'mdi-help-circle-outline',
        routeName: 'faqs'
      },
      {
        title: 'Video Course Platform',
        icon: 'mdi-message-video',
        routeName: 'videoCourse'
      }
    ]
  },
  {
    title: 'Chat',
    icon: 'mdi-chat',
    childrens: [
      {
        title: 'Basic Chat',
        icon: 'mdi-forum',
        routeName: 'chat'
      }
    ]
  },
  {
    title: 'QRCode',
    icon: 'mdi-qrcode',
    childrens: [
      {
        title: 'QRCode Reader',
        icon: 'mdi-qrcode-scan',
        routeName: 'qrcodeReader'
      },
      {
        title: 'QRCode Genarator',
        icon: 'mdi-qrcode-edit',
        routeName: 'qrcodeGenarator'
      }
    ]
  }
]

export default {
  name: 'MainLayout',
  components: {
    EssentialLink,
    ButtonDropdown: () => import('components/button/ButtonDropdown')
  },
  mounted () {
  },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
      miniState: true
    }
  }
}
</script>
