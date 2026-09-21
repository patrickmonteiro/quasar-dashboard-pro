<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="row items-center justify-center auth-page">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.auth-page {
  background: linear-gradient(135deg, var(--q-primary) 0%, #15151f 100%);
}
</style>
