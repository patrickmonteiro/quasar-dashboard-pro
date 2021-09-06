<template>
  <q-page class="bg-secondary" padding>
    <div class="row q-col-gutter-md">
      <div class="col-md-4 col-xs-12 col-sm-12">
        <q-card class="">
          <q-card-section class="text-center q-pb-none">
            <img
              alt="Quasar logo"
              src="/question.svg"
              style="width: 200px"
            >
          </q-card-section>
          <q-card-section class="text-center">
            <p class="text-h6">
              Not finding the help you need?
            </p>
            <q-btn
              color="purple"
              label="Contact Suport"
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-8 col-sm-12 col-xs-12 ">
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
