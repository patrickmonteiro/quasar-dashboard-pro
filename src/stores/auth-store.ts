import { defineStore } from 'pinia';

interface AuthUser {
  name: string;
  email: string;
}

const STORAGE_KEY = 'qdp.auth.user';

function loadUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: loadUser(),
  }),

  getters: {
    isAuthenticated: (state) => state.user !== null,
  },

  actions: {
    /**
     * Demo-only auth: accepts any email, password isn't checked.
     * Replace with a real API call when wiring up a backend.
     */
    login(email: string) {
      const user: AuthUser = { name: email.split('@')[0] || 'User', email };
      this.user = user;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    },

    logout() {
      this.user = null;
      localStorage.removeItem(STORAGE_KEY);
    },
  },
});
