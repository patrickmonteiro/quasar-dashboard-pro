<template>
  <q-card bordered class="fit">
    <q-card-section class="q-pb-xs">
      <div class="text-h6">{{ title }}</div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-y-xs"
      >
        <q-input
          :outlined="outlined"
          :filled="filled"
          :rounded="rounded"
          :stack-label="stackLabel"
          :standout="standout"
          :dense="dense"
          :borderless="borderless"
          clearable
          v-model="form.name"
          label="Name"
          lazy-rules
          :rules="[val => val !== null && val !== '' || 'Please type your name']"
        >
          <template v-slot:prepend v-if="prependIcon">
            <q-icon name="mdi-account" />
          </template>
          <template v-slot:append v-if="appendIcon">
            <q-icon name="mdi-account" />
          </template>
        </q-input>

        <q-input
          :outlined="outlined"
          :filled="filled"
          :rounded="rounded"
          :stack-label="stackLabel"
          :standout="standout"
          :dense="dense"
          :borderless="borderless"
          clearable
          v-model="form.email"
          label="Email"
          lazy-rules
          :rules="[val => val !== null && val !== '' || 'Please type your email']"
          type="email"
        >
          <template v-slot:prepend v-if="prependIcon">
            <q-icon name="mdi-email" />
          </template>
          <template v-slot:append v-if="appendIcon">
            <q-icon name="mdi-email" />
          </template>

        </q-input>

        <div class="row justify-end">
          <q-btn label="Reset" color="primary" type="reset" flat class="q-ml-sm" />
          <q-btn label="Submit" color="primary" class="on-right" type="submit" />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'BasicForm',
  props: {
    title: {
      type: String,
      required: false,
      default: 'Basic Form'
    },
    outlined: {
      type: Boolean,
      required: false,
      default: false
    },
    filled: {
      type: Boolean,
      required: false,
      default: false
    },
    rounded: {
      type: Boolean,
      required: false,
      default: false
    },
    stackLabel: {
      type: Boolean,
      required: false,
      default: false
    },
    standout: {
      type: Boolean || String,
      required: false,
      default: false
    },
    dense: {
      type: Boolean,
      required: false,
      default: false
    },
    borderless: {
      type: Boolean,
      required: false,
      default: false
    },
    prependIcon: {
      type: Boolean,
      required: false,
      default: false
    },
    appendIcon: {
      type: Boolean,
      required: false,
      default: false
    },
    clearable: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      form: {
        name: '',
        email: ''
      }
    }
  },
  methods: {
    onSubmit () {
      this.$q.notify({
        message: 'Form submitted successfully!',
        caption: '5 minutes ago',
        color: 'primary'
      })
    },
    onReset () {
      this.form = {
        name: '',
        email: ''
      }
    }
  }
}
</script>
