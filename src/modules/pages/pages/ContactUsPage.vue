<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-weight-bold q-mb-xs">Contact Us</div>
    <div class="text-body2 text-grey-6 q-mb-md">
      Have a question? Send us a message and we'll get back to you.
    </div>

    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-7">
        <q-card flat bordered>
          <q-card-section class="row q-col-gutter-sm">
            <div class="col-12 col-sm-6">
              <q-input v-model="form.name" dense outlined label="Full name" />
            </div>
            <div class="col-12 col-sm-6">
              <q-input v-model="form.email" dense outlined type="email" label="Email" />
            </div>
            <div class="col-12">
              <q-input v-model="form.subject" dense outlined label="Subject" />
            </div>
            <div class="col-12">
              <q-input
                v-model="form.message"
                dense
                outlined
                type="textarea"
                rows="5"
                label="Message"
              />
            </div>
            <div class="col-12">
              <q-btn
                unelevated
                no-caps
                color="primary"
                icon="send"
                label="Send message"
                :disable="!canSend"
                @click="send"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-5">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle1 text-weight-medium q-mb-md">Contact information</div>

            <div class="row items-center q-gutter-sm q-mb-md">
              <q-avatar color="primary" text-color="white" size="36px">
                <q-icon name="mail" size="18px" />
              </q-avatar>
              <div>
                <div class="text-caption text-grey-5">Email</div>
                <div class="text-weight-medium">support@quasardashboardpro.dev</div>
              </div>
            </div>

            <div class="row items-center q-gutter-sm q-mb-md">
              <q-avatar color="primary" text-color="white" size="36px">
                <q-icon name="call" size="18px" />
              </q-avatar>
              <div>
                <div class="text-caption text-grey-5">Phone</div>
                <div class="text-weight-medium">+1 (123) 456-7890</div>
              </div>
            </div>

            <div class="row items-center q-gutter-sm">
              <q-avatar color="primary" text-color="white" size="36px">
                <q-icon name="place" size="18px" />
              </q-avatar>
              <div>
                <div class="text-caption text-grey-5">Address</div>
                <div class="text-weight-medium">1234 Elm Street, Springfield, IL 62704</div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const form = ref({ name: '', email: '', subject: '', message: '' });

const canSend = computed(() => Boolean(form.value.name && form.value.email && form.value.message));

function send() {
  $q.notify({
    message: "Message sent — we'll get back to you soon.",
    color: 'positive',
    position: 'bottom',
    timeout: 2000,
  });
  form.value = { name: '', email: '', subject: '', message: '' };
}
</script>
