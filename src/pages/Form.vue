<template>
  <q-page class="bg-secondary" padding>
    <div class="row q-col-gutter-md justify-center">
      <div class="col-md-9 col-sm-12 col-xs-12">
        <q-toggle
          v-model="outlined"
          label="Outlined"
        />
        <q-toggle
          v-model="filled"
          label="Filled"
        />
        <q-toggle
          v-model="rounded"
          label="Rounded"
        />
        <q-toggle
          v-model="stackLabel"
          label="Stack Label"
        />
        <q-toggle
          v-model="standout"
          label="Standout"
        />
        <q-toggle
          v-model="dense"
          label="Dense"
        />
        <q-toggle
          v-model="borderless"
          label="Borderless"
        />
        <q-toggle
          v-model="prependIcon"
          label="Prepend Icon"
        />
        <q-toggle
          v-model="appendIcon"
          label="Append Icon"
        />
        <q-toggle
          v-model="clearable"
          label="Clearable"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <basic-form
          :title="'Basic Form - Standard'"
          :outlined="outlined"
          :filled="filled"
          :rounded="rounded"
          :stack-label="stackLabel"
          :standout="standout"
          :dense="dense"
          :borderless="borderless"
          :prependIcon="prependIcon"
          :appendIcon="appendIcon"
          :clearable="clearable"
        />
      </div>
      <!-- <div class="col-md-6 col-sm-12 col-xs-12">
        <basic-form
          :title="'Basic Form - Outlined'"
          outlined
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <basic-form
          :title="'Basic Form - Filled'"
          filled
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <basic-form
          :title="'Basic Form - Outlined & Rounded'"
          rounded
          outlined
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <basic-form
          :title="'Basic Form - Stack Label'"
          stack-label
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <basic-form
          :title="'Basic Form - Outlined & Stack Label'"
          stack-label
          outlined
        />
      </div> -->
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'PageForm',
  components: {
    BasicForm: () => import('components/active/form/BasicForm')
  },
  data () {
    return {
      outlined: false,
      filled: false,
      rounded: false,
      stackLabel: false,
      standout: false,
      dense: false,
      borderless: false,
      prependIcon: false,
      appendIcon: false,
      clearable: false
    }
  }
}
</script>
