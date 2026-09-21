<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-weight-bold q-mb-xs">Frequently Asked Questions</div>
    <div class="text-body2 text-grey-6 q-mb-md">Answers to the most common questions.</div>

    <q-input
      v-model="search"
      dense
      outlined
      placeholder="Search questions"
      class="q-mb-md"
      style="max-width: 360px"
    >
      <template #prepend>
        <q-icon name="search" size="18px" />
      </template>
    </q-input>

    <div v-for="group in filteredGroups" :key="group.category" class="q-mb-md">
      <div class="text-caption text-weight-bold text-grey-5 q-mb-sm faq-category">
        {{ group.category }}
      </div>

      <q-card flat bordered>
        <q-list separator>
          <q-expansion-item
            v-for="faq in group.faqs"
            :key="faq.question"
            :label="faq.question"
            header-class="text-weight-medium"
          >
            <q-card-section class="text-body2 text-grey-7 q-pt-none">
              {{ faq.answer }}
            </q-card-section>
          </q-expansion-item>
        </q-list>
      </q-card>
    </div>

    <div v-if="filteredGroups.length === 0" class="text-center text-grey-5 q-py-xl">
      No questions match "{{ search }}".
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { faqs } from '../data/faqs';

const search = ref('');

const filteredGroups = computed(() => {
  const query = search.value.toLowerCase();
  const matching = faqs.filter(
    (faq) => faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query),
  );

  const categories = Array.from(new Set(matching.map((faq) => faq.category)));
  return categories.map((category) => ({
    category,
    faqs: matching.filter((faq) => faq.category === category),
  }));
});
</script>

<style scoped>
.faq-category {
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
</style>
