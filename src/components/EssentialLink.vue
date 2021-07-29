<template>
  <q-item
    clickable
    class="text-grey-4"
    @click="goTo(routeName)"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <!-- <q-item-label caption class="text-grey-4">
        {{ caption }}
      </q-item-label> -->
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      default: ''
    },
    routeName: {
      type: String,
      default: 'home'
    },
    icon: {
      type: String,
      default: ''
    }
  },
  methods: {
    goTo (routeName) {
      this.$router.push({ name: routeName })
    }
  }
}
</script>
