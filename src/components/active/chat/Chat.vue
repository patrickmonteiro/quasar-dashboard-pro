<template>
  <div class="container q-pa-md">
    <div class="row" v-for="(chat, index) in chatDefault" :key="index" :class="chat.type === 'send' ? 'justify-end': ''">
        <q-chat-message
          style="minWidth: 300px"
          :text="chat.text"
          :avatar="chat.type === 'send' ? avatar1 : avatar2"
          size="6"
          :sent="chat.type === 'send'"
          :class="chat.type === 'send' ? 'text-right' : '' "
          :name="chat.name"
        />
    </div>
    <q-footer>
      <q-toolbar class="bg-grey-3 text-black row">
        <q-input
          rounded
          outlined
          dense
          class="WAL__field col-grow q-mr-sm"
          bg-color="white"
          placeholder="Type a message"
          v-model="text"
          @keypress.enter="sendMessage"
        />
        <q-btn round flat icon="send" @click="sendMessage" />
      </q-toolbar>
    </q-footer>
  </div>
</template>

<script>
import { chat } from 'src/utils/list'
export default {
  name: 'Chat',
  data () {
    return {
      chatDefault: [...chat],
      text: '',
      avatar1: 'https://cdn.quasar.dev/img/avatar3.jpg',
      avatar2: 'https://cdn.quasar.dev/img/avatar4.jpg'
    }
  },
  methods: {
    sendMessage () {
      if (this.text) {
        this.chatDefault.push({
          name: 'Mary Jane',
          type: 'send',
          text: [this.text]
        })
        this.text = ''
      }
    }
  }
}
</script>
