import { defineStore } from 'pinia';
import { Dark } from 'quasar';

const STORAGE_KEY = 'qdp.ui.dark';

function loadDarkPreference(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export const useUiStore = defineStore('ui', {
  state: () => ({
    leftDrawerOpen: true,
    dark: loadDarkPreference(),
  }),

  actions: {
    toggleDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },

    toggleDark() {
      this.dark = !this.dark;
      Dark.set(this.dark);
      localStorage.setItem(STORAGE_KEY, String(this.dark));
    },

    /** Call once on app start to apply the persisted preference. */
    applyDarkPreference() {
      Dark.set(this.dark);
    },
  },
});
