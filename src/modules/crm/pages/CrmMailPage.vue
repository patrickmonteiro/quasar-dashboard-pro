<template>
  <q-page class="q-pa-md column mail-page">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5 text-weight-bold">Mail</div>
      <q-btn
        color="primary"
        unelevated
        no-caps
        icon="edit"
        label="Compose"
        @click="composeOpen = true"
      />
    </div>

    <q-card flat bordered class="mail-shell col">
      <q-splitter v-model="folderSplit" :limits="[16, 28]" class="fit">
        <template #before>
          <div class="column fit q-pa-md mail-folders">
            <q-input v-model="search" dense outlined placeholder="Search mail" class="q-mb-md">
              <template #prepend>
                <q-icon name="search" size="18px" />
              </template>
            </q-input>

            <q-list>
              <q-item
                v-for="folder in folders"
                :key="folder.key"
                clickable
                :active="activeFolder === folder.key"
                active-class="mail-folder--active"
                class="mail-folder"
                @click="selectFolder(folder.key)"
              >
                <q-item-section avatar>
                  <q-icon :name="folder.icon" size="20px" />
                </q-item-section>
                <q-item-section>{{ folder.label }}</q-item-section>
                <q-item-section v-if="folderCounts[folder.key]" side>
                  <q-badge rounded color="grey-4" text-color="grey-9">
                    {{ folderCounts[folder.key] }}
                  </q-badge>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </template>

        <template #after>
          <q-splitter v-model="listSplit" :limits="[32, 55]" class="fit">
            <template #before>
              <q-scroll-area class="fit">
                <q-list separator>
                  <q-item
                    v-for="email in filteredEmails"
                    :key="email.id"
                    clickable
                    :active="selectedEmail?.id === email.id"
                    active-class="mail-item--active"
                    @click="openEmail(email)"
                  >
                    <q-item-section avatar>
                      <q-avatar :color="email.avatarColor" text-color="white" size="36px">
                        {{ email.initials }}
                      </q-avatar>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label :class="email.unread ? 'text-weight-bold' : ''">
                        {{ email.from }}
                      </q-item-label>
                      <q-item-label :class="email.unread ? 'text-weight-medium' : ''" lines="1">
                        {{ email.subject }}
                      </q-item-label>
                      <q-item-label caption lines="1">{{ email.preview }}</q-item-label>
                    </q-item-section>

                    <q-item-section side top>
                      <q-item-label caption>{{ email.time }}</q-item-label>
                      <q-icon
                        :name="email.starred ? 'star' : 'star_border'"
                        :color="email.starred ? 'warning' : 'grey-5'"
                        size="18px"
                        class="q-mt-sm cursor-pointer"
                        @click.stop="toggleStar(email)"
                      />
                    </q-item-section>
                  </q-item>

                  <div v-if="filteredEmails.length === 0" class="text-center text-grey-5 q-pa-lg">
                    No emails here.
                  </div>
                </q-list>
              </q-scroll-area>
            </template>

            <template #after>
              <q-scroll-area class="fit">
                <div v-if="selectedEmail" class="q-pa-md">
                  <div class="row items-center justify-between">
                    <div class="text-h6 text-weight-bold">{{ selectedEmail.subject }}</div>
                    <div>
                      <q-btn
                        flat
                        round
                        dense
                        :icon="selectedEmail.starred ? 'star' : 'star_border'"
                        :color="selectedEmail.starred ? 'warning' : undefined"
                        @click="toggleStar(selectedEmail)"
                      />
                      <q-btn
                        v-if="selectedEmail.folder !== 'archived'"
                        flat
                        round
                        dense
                        icon="archive"
                        @click="moveTo(selectedEmail, 'archived')"
                      >
                        <q-tooltip>Archive</q-tooltip>
                      </q-btn>
                      <q-btn
                        v-if="selectedEmail.folder !== 'trash'"
                        flat
                        round
                        dense
                        icon="delete"
                        @click="moveTo(selectedEmail, 'trash')"
                      >
                        <q-tooltip>Delete</q-tooltip>
                      </q-btn>
                    </div>
                  </div>

                  <q-separator class="q-my-md" />

                  <div class="row items-center q-gutter-sm">
                    <q-avatar :color="selectedEmail.avatarColor" text-color="white">
                      {{ selectedEmail.initials }}
                    </q-avatar>
                    <div>
                      <div class="text-weight-medium">{{ selectedEmail.from }}</div>
                      <div class="text-caption text-grey-5">{{ selectedEmail.fromEmail }}</div>
                    </div>
                    <q-space />
                    <div class="text-caption text-grey-5">{{ selectedEmail.time }}</div>
                  </div>

                  <div class="q-mt-lg mail-body">{{ selectedEmail.body }}</div>

                  <q-btn
                    outline
                    no-caps
                    color="primary"
                    icon="reply"
                    label="Reply"
                    class="q-mt-lg"
                  />
                </div>

                <div v-else class="column fit items-center justify-center text-grey-5">
                  <q-icon name="mail" size="48px" class="q-mb-sm" />
                  Select an email to read
                </div>
              </q-scroll-area>
            </template>
          </q-splitter>
        </template>
      </q-splitter>
    </q-card>

    <q-dialog v-model="composeOpen">
      <q-card style="width: 480px; max-width: 90vw">
        <q-card-section class="text-subtitle1 text-weight-medium">New message</q-card-section>
        <q-separator />
        <q-card-section class="column q-gutter-sm">
          <q-input v-model="compose.to" dense outlined label="To" />
          <q-input v-model="compose.subject" dense outlined label="Subject" />
          <q-input v-model="compose.body" dense outlined type="textarea" label="Message" rows="6" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn v-close-popup flat no-caps label="Cancel" />
          <q-btn
            v-close-popup
            unelevated
            no-caps
            color="primary"
            label="Send"
            @click="sendCompose"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useQuasar } from 'quasar';
import { emails as seedEmails, type Email } from '../data/emails';

const $q = useQuasar();
const emails = ref<Email[]>(structuredClone(seedEmails));

type FolderKey = 'inbox' | 'starred' | 'sent' | 'archived' | 'trash';

const folders: { key: FolderKey; label: string; icon: string }[] = [
  { key: 'inbox', label: 'Inbox', icon: 'inbox' },
  { key: 'starred', label: 'Starred', icon: 'star' },
  { key: 'sent', label: 'Sent', icon: 'send' },
  { key: 'archived', label: 'Archived', icon: 'archive' },
  { key: 'trash', label: 'Trash', icon: 'delete' },
];

const activeFolder = ref<FolderKey>('inbox');
const search = ref('');
const selectedEmail = ref<Email | null>(null);
const folderSplit = ref(20);
const listSplit = ref(40);

const folderCounts = computed<Record<string, number>>(() => ({
  inbox: emails.value.filter((e) => e.folder === 'inbox' && e.unread).length,
  starred: emails.value.filter((e) => e.starred).length,
  sent: 0,
  archived: 0,
  trash: 0,
}));

const filteredEmails = computed(() => {
  const bySearch = (e: Email) =>
    !search.value ||
    e.subject.toLowerCase().includes(search.value.toLowerCase()) ||
    e.from.toLowerCase().includes(search.value.toLowerCase());

  const byFolder =
    activeFolder.value === 'starred'
      ? (e: Email) => e.starred
      : (e: Email) => e.folder === activeFolder.value;

  return emails.value.filter((e) => byFolder(e) && bySearch(e));
});

function selectFolder(key: FolderKey) {
  activeFolder.value = key;
  selectedEmail.value = null;
}

function openEmail(email: Email) {
  email.unread = false;
  selectedEmail.value = email;
}

function toggleStar(email: Email) {
  email.starred = !email.starred;
}

function moveTo(email: Email, folder: Email['folder']) {
  email.folder = folder;
  selectedEmail.value = null;
  $q.notify({ message: `Moved to ${folder}`, color: 'dark', position: 'bottom', timeout: 1500 });
}

const composeOpen = ref(false);
const compose = ref({ to: '', subject: '', body: '' });

function sendCompose() {
  $q.notify({ message: 'Message sent', color: 'positive', position: 'bottom', timeout: 1500 });
  compose.value = { to: '', subject: '', body: '' };
}
</script>

<style scoped>
.mail-page {
  height: calc(100vh - 130px);
  min-height: 500px;
}

.mail-shell {
  min-height: 0;
}

.mail-folders {
  overflow-y: auto;
}

.mail-folder {
  border-radius: 8px;
  margin-bottom: 2px;
}

.mail-folder--active {
  background: rgba(79, 70, 229, 0.1);
  color: var(--q-primary);
}

.mail-item--active {
  background: rgba(79, 70, 229, 0.06);
}

.mail-body {
  white-space: pre-line;
  line-height: 1.6;
}
</style>
