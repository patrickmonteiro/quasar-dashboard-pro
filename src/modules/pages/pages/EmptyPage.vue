<template>
  <q-page class="q-pa-md column items-center justify-center empty-page">
    <q-icon name="inbox" size="64px" class="text-grey-4 q-mb-md" />
    <div class="text-h6 text-weight-medium q-mb-xs">Nothing here yet</div>
    <div class="text-body2 text-grey-6 q-mb-lg empty-page__caption">
      This is a blank starting point — use it as a template for a new page, or wire it up to real
      data.
    </div>
    <q-btn unelevated no-caps color="primary" icon="add" label="Create something" />
  </q-page>
</template>

<style scoped>
.empty-page {
  min-height: 60vh;
  text-align: center;
}

.empty-page__caption {
  max-width: 360px;
}
</style>
