<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5 text-weight-bold">Calendar</div>
      <q-btn
        unelevated
        no-caps
        color="primary"
        icon="add"
        label="New event"
        @click="openCreate()"
      />
    </div>

    <q-card flat bordered class="q-mb-md">
      <q-card-section class="row items-center justify-between calendar-toolbar">
        <div class="row items-center q-gutter-sm">
          <q-btn outline no-caps label="Today" @click="onToday" />
          <q-btn flat round dense icon="chevron_left" @click="onPrev" />
          <q-btn flat round dense icon="chevron_right" @click="onNext" />
          <div class="text-subtitle1 text-weight-medium">{{ periodLabel }}</div>
        </div>
        <q-btn-toggle
          v-model="view"
          no-caps
          unelevated
          toggle-color="primary"
          color="white"
          text-color="grey-8"
          :options="[
            { label: 'Day', value: 'day' },
            { label: 'Week', value: 'week' },
          ]"
        />
      </q-card-section>
    </q-card>

    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-9">
        <q-card flat bordered>
          <div class="calendar-wrap">
            <q-calendar-day
              ref="calendar"
              v-model="selectedDate"
              :view="view"
              animated
              bordered
              hoverable
              :interval-start="7"
              :interval-count="13"
              :interval-minutes="60"
              :interval-height="48"
              @change="onChange"
              @click-interval="onClickInterval"
            >
              <template #day-body="{ scope: { timestamp, timeStartPos, timeDurationHeight } }">
                <template v-for="event in getEvents(timestamp.date)" :key="event.id">
                  <div
                    class="calendar-event"
                    :class="[`bg-${event.color}`, eventSideClass(event)]"
                    :style="{
                      top: timeStartPos(event.time) + 'px',
                      height: timeDurationHeight(event.duration) + 'px',
                    }"
                    @click.stop="openEdit(event)"
                  >
                    <div class="calendar-event__title">{{ event.title }}</div>
                    <q-tooltip>{{ event.time }} · {{ event.title }}</q-tooltip>
                  </div>
                </template>
              </template>
            </q-calendar-day>
          </div>
        </q-card>
      </div>

      <div class="col-12 col-md-3">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle1 text-weight-medium">Upcoming</div>
          </q-card-section>

          <q-list separator>
            <q-item
              v-for="event in upcomingEvents"
              :key="event.id"
              clickable
              @click="openEdit(event)"
            >
              <q-item-section avatar>
                <q-avatar :color="event.color" text-color="white" size="36px">
                  <q-icon name="event" size="18px" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-medium">{{ event.title }}</q-item-label>
                <q-item-label caption>{{ formatDay(event.date) }} · {{ event.time }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item v-if="upcomingEvents.length === 0">
              <q-item-section class="text-grey-5 text-center q-py-lg">
                No upcoming events.
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>

    <q-dialog v-model="formOpen">
      <q-card style="width: 420px; max-width: 90vw">
        <q-card-section>
          <div class="text-subtitle1 text-weight-medium">
            {{ editingId ? 'Edit event' : 'New event' }}
          </div>
        </q-card-section>

        <q-card-section class="row q-col-gutter-sm">
          <div class="col-12">
            <q-input v-model="form.title" dense outlined label="Title" />
          </div>
          <div class="col-6">
            <q-input v-model="form.date" dense outlined type="date" label="Date" />
          </div>
          <div class="col-6">
            <q-input v-model="form.time" dense outlined type="time" label="Start time" />
          </div>
          <div class="col-6">
            <q-select
              v-model="form.duration"
              dense
              outlined
              label="Duration"
              :options="durationOptions"
              emit-value
              map-options
            />
          </div>
          <div class="col-6">
            <q-select
              v-model="form.color"
              dense
              outlined
              label="Color"
              :options="colorOptions"
              emit-value
              map-options
            >
              <template #option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section avatar>
                    <q-avatar :color="scope.opt.value" size="18px" />
                  </q-item-section>
                  <q-item-section>{{ scope.opt.label }}</q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="col-12">
            <q-input
              v-model="form.details"
              dense
              outlined
              type="textarea"
              rows="2"
              label="Details"
            />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn v-if="editingId" flat no-caps color="negative" label="Delete" @click="remove" />
          <q-space />
          <q-btn flat no-caps label="Cancel" v-close-popup />
          <q-btn
            unelevated
            no-caps
            color="primary"
            label="Save"
            :disable="!form.title"
            @click="save"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useQuasar } from 'quasar';
import { QCalendarDay } from '@quasar/quasar-ui-qcalendar';
import '@quasar/quasar-ui-qcalendar/index.css';
import { today, type Timestamp } from '@timestamp-js/core';
import { calendarEvents as initialEvents, type CalendarEvent } from '../data/calendar-events';

const $q = useQuasar();

const calendar = ref<QCalendarDay>();
const view = ref<'day' | 'week'>('week');
const selectedDate = ref(today());
const events = ref<CalendarEvent[]>([...initialEvents]);
const changeRange = ref<{ start: string; end: string } | null>(null);

const monthDayYearFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});
const monthDayFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});
const upcomingFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});

const periodLabel = computed(() => {
  if (view.value === 'day' || !changeRange.value) {
    return monthDayYearFormatter.format(new Date(selectedDate.value));
  }
  const start = monthDayFormatter.format(new Date(changeRange.value.start));
  const end = monthDayYearFormatter.format(new Date(changeRange.value.end));
  return `${start} – ${end}`;
});

function formatDay(date: string) {
  return upcomingFormatter.format(new Date(date));
}

function onChange(data: { start: string; end: string; days: Timestamp[] }) {
  changeRange.value = { start: data.start, end: data.end };
}

function onToday() {
  calendar.value?.moveToToday();
}
function onPrev() {
  calendar.value?.prev();
}
function onNext() {
  calendar.value?.next();
}

interface PositionedEvent extends CalendarEvent {
  side?: 'full' | 'left' | 'right';
}

function toMinutes(time: string) {
  const [hour, minute] = time.split(':').map(Number);
  return (hour ?? 0) * 60 + (minute ?? 0);
}

/** Naive pairwise overlap check — good enough for the light sample data here. */
function getEvents(date: string): PositionedEvent[] {
  const dayEvents: PositionedEvent[] = events.value
    .filter((event) => event.date === date)
    .map((event) => ({ ...event }))
    .sort((a, b) => a.time.localeCompare(b.time));

  dayEvents.forEach((event, i) => {
    if (event.side) return;
    const next = dayEvents[i + 1];
    if (next && toMinutes(next.time) < toMinutes(event.time) + event.duration) {
      event.side = 'left';
      next.side = 'right';
    } else {
      event.side = 'full';
    }
  });

  return dayEvents;
}

function eventSideClass(event: PositionedEvent) {
  return {
    'calendar-event--full': !event.side || event.side === 'full',
    'calendar-event--left': event.side === 'left',
    'calendar-event--right': event.side === 'right',
  };
}

const upcomingEvents = computed(() =>
  [...events.value]
    .filter((event) => event.date >= today())
    .sort((a, b) =>
      a.date === b.date ? a.time.localeCompare(b.time) : a.date.localeCompare(b.date),
    )
    .slice(0, 6),
);

const durationOptions = [
  { label: '30 min', value: 30 },
  { label: '1 hour', value: 60 },
  { label: '1.5 hours', value: 90 },
  { label: '2 hours', value: 120 },
];

const colorOptions = [
  { label: 'Indigo', value: 'primary' },
  { label: 'Teal', value: 'teal' },
  { label: 'Purple', value: 'purple' },
  { label: 'Orange', value: 'orange' },
  { label: 'Green', value: 'positive' },
  { label: 'Red', value: 'negative' },
];

const formOpen = ref(false);
const editingId = ref<number | null>(null);
const form = ref({
  title: '',
  date: today(),
  time: '09:00',
  duration: 60,
  color: 'primary',
  details: '',
});

function openCreate(date?: string, time?: string) {
  editingId.value = null;
  form.value = {
    title: '',
    date: date ?? today(),
    time: time ?? '09:00',
    duration: 60,
    color: 'primary',
    details: '',
  };
  formOpen.value = true;
}

function openEdit(event: CalendarEvent) {
  editingId.value = event.id;
  form.value = {
    title: event.title,
    date: event.date,
    time: event.time,
    duration: event.duration,
    color: event.color,
    details: event.details,
  };
  formOpen.value = true;
}

function onClickInterval(data: Timestamp) {
  openCreate(data.date, data.time);
}

function save() {
  if (editingId.value) {
    const index = events.value.findIndex((event) => event.id === editingId.value);
    if (index !== -1) events.value[index] = { id: editingId.value, ...form.value };
    $q.notify({ message: 'Event updated', color: 'positive', position: 'bottom', timeout: 1500 });
  } else {
    events.value.push({ id: Date.now(), ...form.value });
    $q.notify({ message: 'Event created', color: 'positive', position: 'bottom', timeout: 1500 });
  }
  formOpen.value = false;
}

function remove() {
  if (editingId.value == null) return;
  events.value = events.value.filter((event) => event.id !== editingId.value);
  formOpen.value = false;
  $q.notify({ message: 'Event deleted', color: 'dark', position: 'bottom', timeout: 1500 });
}
</script>

<style scoped>
.calendar-toolbar {
  flex-wrap: wrap;
  gap: 8px;
}

.calendar-wrap {
  display: flex;
  width: 100%;
  height: 700px;
}

.calendar-event {
  position: absolute;
  border-radius: 4px;
  padding: 2px 6px;
  color: white;
  font-size: 12px;
  overflow: hidden;
  cursor: pointer;
  z-index: 1;
}

.calendar-event--full {
  left: 2px;
  right: 2px;
}

.calendar-event--left {
  left: 2px;
  right: 50%;
}

.calendar-event--right {
  left: 50%;
  right: 2px;
}

.calendar-event__title {
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
