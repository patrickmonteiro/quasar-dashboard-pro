<template>
  <q-list bordered>
    <q-expansion-item
      v-for="faq in faqs"
      :key="faq"
      group="faq"
      :label="faq.title"
      class="bg-grey-1"
      header-class="text-grey-8 text-bold"
      expand-icon="mdi-plus"
      expanded-icon="mdi-minus"
    >
      <q-card>
        <q-card-section>
          {{ faq.response }}
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <q-separator />
  </q-list>
</template>

<script>
import { faqs } from 'src/utils/list'
export default {
  name: 'FaqList',
  data () {
    return {
      faqs: faqs
    }
  }
}
</script>
