<template>
  <q-card bordered class="fit">
    <q-card-section class="q-pb-xs">
      <div class="text-h6">Top Regions</div>
    </q-card-section>
    <q-separator />
    <q-card-section class="">
      <q-list dense>
        <q-item clickable>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              C
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>Canada</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-item-label class="text-bold">2300</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced inset />

        <q-item clickable>
          <q-item-section avatar>
            <q-avatar color="green" text-color="white">
              B
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>Brazil</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-item-label class="text-bold">2100</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced inset />

        <q-item clickable>
          <q-item-section avatar>
            <q-avatar color="red-9" text-color="white">
              U
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>United State</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-item-label class="text-bold">1900</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced inset />

        <q-item clickable>
          <q-item-section avatar>
            <q-avatar color="red-5" text-color="white">
              J
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>Japan</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-item-label class="text-bold">1750</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced inset />

        <q-item clickable>
          <q-item-section avatar>
            <q-avatar color="amber" text-color="white">
              I
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>India</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-item-label class="text-bold">1590</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'CardList',
  components: {
  }
}
</script>
