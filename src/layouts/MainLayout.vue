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
          <!-- <q-btn
            flat
            dense
            round
            icon="mdi-cog-outline"
            aria-label="Config"
          /> -->
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
          Essential Links
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
    title: 'Home',
    icon: 'mdi-home',
    routeName: 'home'
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
        title: 'Audio',
        icon: 'mdi-volume-high',
        routeName: 'audio'
      },
      {
        title: 'Video',
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
      }
    ]
  },
  {
    title: 'Chat',
    icon: 'mdi-forum',
    routeName: 'chat'
  }
]

export default {
  name: 'MainLayout',
  components: {
    EssentialLink,
    ButtonDropdown: () => import('components/button/ButtonDropdown')
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
