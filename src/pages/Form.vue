<template>
  <q-page class="bg-secondary" padding>
    <div class="row q-col-gutter-md">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <basic-form
          :title="'Basic Form - Standard'"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
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
      </div>
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'PageForm',
  components: {
    BasicForm: () => import('components/active/form/BasicForm')
  }
}
</script>
