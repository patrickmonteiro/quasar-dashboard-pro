<template>
  <q-card class="auth-card q-pa-lg" style="width: 380px; max-width: 90vw">
    <div class="text-center q-mb-lg">
      <img :src="logoIcon" alt="Quasar Dashboard PRO" width="48" height="48" />
      <div class="text-h5 text-weight-bold q-mt-sm">Quasar Dashboard PRO</div>
      <div class="text-caption text-grey-5">Sign in to your account</div>
    </div>

    <q-form class="column q-gutter-md" @submit.prevent="onSubmit">
      <q-input
        v-model="email"
        type="email"
        label="Email"
        outlined
        dense
        lazy-rules
        :rules="[(val: string) => !!val || 'Email is required']"
      />

      <q-input
        v-model="password"
        :type="showPassword ? 'text' : 'password'"
        label="Password"
        outlined
        dense
        lazy-rules
        :rules="[(val: string) => !!val || 'Password is required']"
      >
        <template #append>
          <q-icon
            :name="showPassword ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="showPassword = !showPassword"
          />
        </template>
      </q-input>

      <q-btn
        type="submit"
        color="primary"
        label="Sign in"
        class="full-width"
        :loading="loading"
        no-caps
        unelevated
      />
    </q-form>

    <div class="text-caption text-grey-5 text-center q-mt-md">
      Demo only — any email &amp; password works.
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth-store';
import logoIcon from '@/assets/logo-icon.png';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const loading = ref(false);

async function onSubmit() {
  loading.value = true;
  try {
    authStore.login(email.value);
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/';
    await router.replace(redirect);
  } finally {
    loading.value = false;
  }
}
</script>
