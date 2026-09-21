<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-subtitle1 text-weight-medium">Upcoming activities</div>
    </q-card-section>

    <q-list separator>
      <q-item v-for="activity in activities" :key="activity.id">
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            <q-icon :name="activity.icon" size="18px" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ activity.title }}</q-item-label>
          <q-item-label caption>{{ activity.with }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <div class="text-caption text-grey-5">{{ activity.when }}</div>
        </q-item-section>
      </q-item>
    </q-list>

    <q-separator />

    <q-card-section class="column q-gutter-sm">
      <q-btn color="primary" unelevated no-caps icon="add" label="Add activity" />
      <q-btn outline no-caps color="primary" icon="event" label="View calendar" />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
interface Activity {
  id: string;
  icon: string;
  title: string;
  with: string;
  when: string;
}

defineProps<{
  activities: Activity[];
}>();
</script>
