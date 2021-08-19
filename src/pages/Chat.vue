<template>
  <q-page class="bg-secondary" padding>
    <chat />
  </q-page>
</template>

<script>

export default {
  name: 'PageChat',
  components: {
    Chat: () => import('components/active/chat/Chat')
  }
}
</script>
