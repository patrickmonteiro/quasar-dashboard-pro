<template>
  <q-item
    v-if="childrens.length <= 0"
    clickable
    class="text-grey-4"
    :to="{ name: routeName }"
    exact
    active-class="bg-grey-9"
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
  <q-expansion-item
    v-else
    expand-separator
    :icon="icon"
    :label="title"
    class="text-grey-4"
    active-class="bg-grey-9"
  >
    <q-item
      v-for="(children, index) in childrens"
      :key="index"
      clickable
      class="text-grey-4 q-pl-lg"
      :to="{ name: children.routeName }"
      exact
      active-class="bg-grey-9"
    >
      <q-item-section
        v-if="children.icon"
        avatar
      >
        <q-icon :name="children.icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ children.title }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-expansion-item>
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
    },
    childrens: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  methods: {
    goTo (routeName) {
      this.$router.push({ name: routeName })
    }
  }
}
</script>
