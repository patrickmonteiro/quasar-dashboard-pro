<template>
  <q-page class="bg-secondary" padding>
    <div class="row">
      <div class="col-8 bg-white">
        <q-card>
          <q-card-section>
            <div class="text-h6">FAQ</div>
          </q-card-section>
          <q-card-section>
            <faq-list />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'PageFaqs',
  components: {
    FaqList: () => import('components/active/list/FaqList')
  },
  data () {
    return {
    }
  }
}
</script>
