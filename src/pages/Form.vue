<template>
  <q-page class="bg-secondary" padding>
    <div class="row">
      <div class="col-6">
        <basic-form />
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
