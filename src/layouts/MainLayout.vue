<template>
  <q-layout view="lHh Lpr lFf">
    <q-header :class="uiStore.dark ? 'bg-dark text-white' : 'bg-white text-grey-9'" bordered>
      <q-toolbar class="q-px-md">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Toggle menu"
          @click="uiStore.toggleDrawer"
        />

        <q-toolbar-title class="row items-center no-wrap text-weight-bold">
          <img :src="logoIcon" alt="" width="22" height="22" class="q-mr-sm" />
          Quasar Dashboard PRO
        </q-toolbar-title>

        <q-btn
          flat
          round
          dense
          :icon="uiStore.dark ? 'light_mode' : 'dark_mode'"
          aria-label="Toggle dark mode"
          @click="uiStore.toggleDark"
        >
          <q-tooltip>{{ uiStore.dark ? 'Switch to light mode' : 'Switch to dark mode' }}</q-tooltip>
        </q-btn>

        <q-btn flat round dense icon="notifications" aria-label="Notifications">
          <q-menu anchor="bottom right" self="top right">
            <q-list style="min-width: 220px">
              <q-item-label header>Notifications</q-item-label>
              <q-item>
                <q-item-section class="text-grey-5">You're all caught up.</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <q-btn flat round dense icon="account_circle" aria-label="Account menu">
          <q-menu anchor="bottom right" self="top right">
            <q-list style="min-width: 200px">
              <q-item>
                <q-item-section>
                  <q-item-label class="text-weight-medium">{{ authStore.user?.name }}</q-item-label>
                  <q-item-label caption>{{ authStore.user?.email }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item v-close-popup clickable @click="onLogout">
                <q-item-section avatar>
                  <q-icon name="logout" />
                </q-item-section>
                <q-item-section>Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="uiStore.leftDrawerOpen" show-if-above dark :width="232" class="app-drawer">
      <div class="app-drawer__brand">
        <img :src="logoIcon" alt="" width="24" height="24" />
        <span class="text-weight-bold">Dashboard PRO</span>
      </div>

      <q-list padding class="app-drawer__list">
        <template v-for="section in navSections" :key="section.label">
          <q-item-label header class="app-drawer__section-label">{{ section.label }}</q-item-label>

          <q-item
            v-for="item in section.items"
            :key="item.to"
            clickable
            dense
            :to="item.to"
            exact
            class="app-drawer__item"
            active-class="app-drawer__item--active"
          >
            <q-item-section avatar class="app-drawer__item-icon">
              <q-icon :name="item.icon" size="18px" />
            </q-item-section>
            <q-item-section class="text-body2">{{ item.label }}</q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer
      :class="uiStore.dark ? 'bg-dark text-grey-5' : 'bg-white text-grey-7'"
      bordered
      class="app-footer"
    >
      Developed by
      <a href="https://github.com/patrickmonteiro" target="_blank" rel="noopener noreferrer">
        Patrick Monteiro
      </a>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth-store';
import { useUiStore } from '@/stores/ui-store';
import { moduleNavSections as navSections } from '@/modules';
import logoIcon from '@/assets/logo-icon.png';

const uiStore = useUiStore();
const authStore = useAuthStore();
const router = useRouter();

async function onLogout() {
  authStore.logout();
  await router.replace('/login');
}
</script>

<style lang="scss" scoped>
.app-drawer {
  background: $sidebar-bg;

  &__brand {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 18px 16px;
    color: #fff;
    font-size: 14px;
  }

  &__section-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #71717a;
    padding: 16px 16px 6px;
    min-height: 0;
  }

  &__item {
    border-radius: 8px;
    margin: 1px 8px;
    min-height: 36px;

    &--active {
      color: #fff;
      background: rgba(255, 255, 255, 0.08);
    }
  }

  &__item-icon {
    min-width: 28px;
  }

  &__list {
    padding-bottom: 24px;
  }
}

.app-footer {
  padding: 8px 16px;
  font-size: 11px;
  text-align: center;

  a {
    color: var(--q-primary);
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
