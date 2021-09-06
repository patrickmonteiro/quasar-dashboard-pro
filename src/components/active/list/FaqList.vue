<template>
  <q-list bordered>
    <q-expansion-item
      v-for="(faq, index) in faqs"
      :key="index"
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
        <q-card-section>
          <strong>Was this article helpful?</strong> <br>
          <div class="q-gutter-sm q-pt-sm">
            <q-btn outline dense color="positive" label="Yes" style="min-width: 75px" icon="mdi-emoticon-happy-outline" />
            <q-btn outline dense color="negative" label="No" style="min-width: 75px" icon="mdi-emoticon-sad-outline" />
          </div>

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
