<template>
  <q-page class="bg-secondary">
    <q-layout view="hHh Lpr lff" container style="height: 94vh" class="rounded-borders text-black">
      <q-header  class="bg-white">
        <q-toolbar class="text-black">
          <q-btn flat @click="drawer = !drawer" round dense icon="mdi-backburger" />
          <q-toolbar-title>Course Quasar Framework </q-toolbar-title>
        </q-toolbar>
      </q-header>

        <q-drawer
        v-model="drawer"
        :width="350"
        :breakpoint="500"
        bordered
        show-if-above
        content-class="bg-grey-1"
      >
        <q-scroll-area class="fit">
          <q-list padding separator class="menu-list">
            <q-item
              v-ripple v-for="item in youtubeList"
              :key="item"
              clickable
              @click="setVideo(item)"
              :active="item.title === title ? true : false"
              active-class="text-primary"
            >
              <q-item-section class="text-bold">
                {{ item.title}}
              </q-item-section>
            </q-item>
          </q-list>
          <q-separator />
        </q-scroll-area>
      </q-drawer>
      <q-page-container>
        <q-page class="q-px-sm">
          <!-- <p class="text-subtitle1 text-bold q-pa-sm">
            {{ title }}
          </p>
          <q-separator /> -->
          <q-video
            v-if="videoSelected"
            :ratio="16/9"
            :src="videoSelected"
          />
        </q-page>
      </q-page-container>
    </q-layout>
  </q-page>
</template>

<script>
import { youtube } from 'src/utils/list'
export default {
  name: 'PageVideo',
  components: {
    // VideoComponent: () => import('components/active/video/Video')
  },
  data () {
    return {
      drawer: true,
      youtubeList: youtube,
      videoSelected: '',
      title: ''
    }
  },
  methods: {
    setVideo (video) {
      this.title = video.title
      this.videoSelected = video.url
      if (this.$q.platform.is.mobile) {
        this.drawer = false
      }
    }
  }
}
</script>
