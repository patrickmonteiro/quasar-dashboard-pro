<template>
  <q-card bordered class="fit">
    <q-card-section class="q-pb-xs">
      <div class="text-h6">Basic Form</div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-y-md"
      >
        <q-input
          outlined
          v-model="form.name"
          label="Name"
          lazy-rules
          :rules="[val => val !== null && val !== '' || 'Please type your name']"
        />

        <q-input
          outlined
          v-model="form.email"
          label="Email"
          lazy-rules
          :rules="[val => val !== null && val !== '' || 'Please type your email']"
          type="email"
        />

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
