<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5 text-weight-bold">File Manager</div>
      <div class="row q-gutter-sm">
        <q-btn
          outline
          no-caps
          icon="create_new_folder"
          label="New folder"
          @click="notifyPlaceholder('Folder created')"
        />
        <q-btn
          unelevated
          no-caps
          color="primary"
          icon="upload"
          label="Upload"
          @click="notifyPlaceholder('Upload started')"
        />
      </div>
    </div>

    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-3">
        <q-card flat bordered class="q-mb-md">
          <q-card-section>
            <div class="text-subtitle1 text-weight-medium">Storage</div>
            <div class="text-caption text-grey-5">
              {{ storageUsage.usedGb }} GB of {{ storageUsage.totalGb }} GB used
            </div>
          </q-card-section>

          <q-card-section class="flex flex-center q-py-none">
            <apexchart
              type="radialBar"
              height="150"
              :options="storageChart.options"
              :series="storageChart.series"
            />
          </q-card-section>

          <q-card-section class="column q-gutter-sm">
            <div
              v-for="b in storageUsage.breakdown"
              :key="b.label"
              class="row items-center no-wrap"
            >
              <span class="storage-dot" :style="{ background: b.color }" />
              <div class="col text-caption q-ml-sm">{{ b.label }}</div>
              <div class="text-caption text-weight-medium">{{ b.gb }} GB</div>
            </div>
          </q-card-section>
        </q-card>

        <q-card flat bordered>
          <q-list>
            <q-item
              v-for="cat in categories"
              :key="cat.value"
              clickable
              :active="activeCategory === cat.value"
              active-class="fm-cat--active"
              @click="selectCategory(cat.value)"
            >
              <q-item-section avatar>
                <q-icon :name="cat.icon" size="20px" />
              </q-item-section>
              <q-item-section>{{ cat.label }}</q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>

      <div class="col-12 col-md-9">
        <q-card flat bordered>
          <q-card-section class="row items-center justify-between">
            <q-breadcrumbs v-if="activeCategory === 'drive'" class="text-caption">
              <q-breadcrumbs-el label="My Drive" clickable @click="goToFolder(null)" />
              <q-breadcrumbs-el
                v-for="crumb in breadcrumb"
                :key="crumb.id"
                :label="crumb.name"
                clickable
                @click="goToFolder(crumb.id)"
              />
            </q-breadcrumbs>
            <div v-else class="text-subtitle2 text-weight-medium">{{ activeCategoryLabel }}</div>

            <q-input
              v-model="search"
              dense
              outlined
              placeholder="Search files"
              style="max-width: 220px"
            >
              <template #prepend>
                <q-icon name="search" size="18px" />
              </template>
            </q-input>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <div class="row q-col-gutter-md">
              <div v-for="entry in visibleEntries" :key="entry.id" class="col-6 col-sm-4 col-md-3">
                <q-card
                  flat
                  bordered
                  clickable
                  class="fm-card"
                  @click="entry.kind === 'folder' ? openFolder(entry) : openFile(entry)"
                >
                  <q-card-section class="column items-center q-gutter-xs">
                    <div class="fm-card__icon" :style="{ background: entryColor(entry.kind) }">
                      <q-icon :name="entryIcon(entry.kind)" size="26px" color="white" />
                    </div>
                    <div class="text-caption text-weight-medium ellipsis fm-card__name">
                      {{ entry.name }}
                    </div>
                    <div class="text-caption text-grey-5">
                      {{ entry.kind === 'folder' ? `${childCount(entry.id)} items` : entry.size }}
                    </div>
                  </q-card-section>

                  <q-btn
                    v-if="entry.kind !== 'folder' && activeCategory !== 'trash'"
                    flat
                    round
                    dense
                    size="sm"
                    :icon="entry.starred ? 'star' : 'star_border'"
                    :color="entry.starred ? 'warning' : 'grey-5'"
                    class="fm-card__action"
                    @click.stop="toggleStar(entry)"
                  />

                  <q-btn
                    v-if="activeCategory === 'trash'"
                    flat
                    round
                    dense
                    size="sm"
                    icon="restore"
                    color="primary"
                    class="fm-card__action"
                    @click.stop="restore(entry)"
                  />
                </q-card>
              </div>

              <div
                v-if="visibleEntries.length === 0"
                class="col-12 text-center text-grey-5 q-pa-lg"
              >
                No items here.
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>

  <RecordDetailDialog
    v-model="detailOpen"
    :title="detailTitle"
    :subtitle="detailSubtitle"
    :fields="detailFields"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useQuasar } from 'quasar';
import RecordDetailDialog, { type DetailField } from '@/components/RecordDetailDialog.vue';
import {
  files as seedFiles,
  storageUsage,
  entryIcon,
  entryColor,
  type FileEntry,
} from '../data/files';

const $q = useQuasar();

type Category = 'drive' | 'starred' | 'shared' | 'trash';

const categories: { value: Category; label: string; icon: string }[] = [
  { value: 'drive', label: 'My Drive', icon: 'folder' },
  { value: 'starred', label: 'Starred', icon: 'star' },
  { value: 'shared', label: 'Shared with me', icon: 'people' },
  { value: 'trash', label: 'Trash', icon: 'delete' },
];

const activeCategory = ref<Category>('drive');
const currentFolderId = ref<string | null>(null);
const search = ref('');
const entries = ref<FileEntry[]>(structuredClone(seedFiles));

const activeCategoryLabel = computed(
  () => categories.find((c) => c.value === activeCategory.value)?.label ?? '',
);

const breadcrumb = computed(() => {
  const trail: FileEntry[] = [];
  let folderId = currentFolderId.value;
  while (folderId) {
    const folder = entries.value.find((e) => e.id === folderId);
    if (!folder) break;
    trail.unshift(folder);
    folderId = folder.parentId;
  }
  return trail;
});

const visibleEntries = computed(() => {
  let list: FileEntry[];
  if (activeCategory.value === 'drive') {
    list = entries.value.filter((e) => e.parentId === currentFolderId.value && !e.trashed);
  } else if (activeCategory.value === 'starred') {
    list = entries.value.filter((e) => e.starred && !e.trashed);
  } else if (activeCategory.value === 'shared') {
    list = entries.value.filter((e) => e.shared && !e.trashed);
  } else {
    list = entries.value.filter((e) => e.trashed);
  }
  return list.filter(
    (e) => !search.value || e.name.toLowerCase().includes(search.value.toLowerCase()),
  );
});

function selectCategory(cat: Category) {
  activeCategory.value = cat;
  currentFolderId.value = null;
  search.value = '';
}

function goToFolder(id: string | null) {
  currentFolderId.value = id;
}

function openFolder(entry: FileEntry) {
  currentFolderId.value = entry.id;
}

function childCount(folderId: string) {
  return entries.value.filter((e) => e.parentId === folderId && !e.trashed).length;
}

function toggleStar(entry: FileEntry) {
  entry.starred = !entry.starred;
}

function restore(entry: FileEntry) {
  entry.trashed = false;
  $q.notify({
    message: `${entry.name} restored`,
    color: 'positive',
    position: 'bottom',
    timeout: 1500,
  });
}

function notifyPlaceholder(message: string) {
  $q.notify({ message, color: 'dark', position: 'bottom', timeout: 1500 });
}

const detailOpen = ref(false);
const detailTitle = ref('');
const detailSubtitle = ref('');
const detailFields = ref<DetailField[]>([]);

function openFile(entry: FileEntry) {
  detailTitle.value = entry.name;
  detailSubtitle.value = entry.owner;
  detailFields.value = [
    { label: 'Type', value: entry.kind },
    { label: 'Size', value: entry.size ?? '—' },
    { label: 'Owner', value: entry.owner },
    { label: 'Modified', value: entry.modified },
  ];
  detailOpen.value = true;
}

const storageChart = computed(() => ({
  options: {
    chart: { sparkline: { enabled: true } },
    plotOptions: {
      radialBar: {
        hollow: { size: '55%' },
        dataLabels: { value: { fontSize: '16px', formatter: (v: number) => `${v}%` } },
      },
    },
    colors: ['#4f46e5'],
    labels: ['Used'],
  },
  series: [Math.round((storageUsage.usedGb / storageUsage.totalGb) * 100)],
}));
</script>

<style scoped>
.fm-card {
  position: relative;
}

.fm-card__icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fm-card__name {
  max-width: 100%;
}

.fm-card__action {
  position: absolute;
  top: 4px;
  right: 4px;
}

.storage-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

.fm-cat--active {
  background: rgba(79, 70, 229, 0.08);
  color: var(--q-primary);
}
</style>
