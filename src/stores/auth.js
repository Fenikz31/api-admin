import { acceptHMRUpdate, defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    user: null,
  }),

  actions: {
    authenticate() {
      this.authenticated = this.authenticated
        ? this.authenticated : !this.authenticated;
      return this;
    },

    setUser(user) {
      this.user = user;
      this.router.push('applications');
      return this;
    },
  },
});

// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
