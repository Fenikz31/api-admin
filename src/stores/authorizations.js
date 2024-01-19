import { defineStore } from 'pinia';

export const useAuthorizationsStore = defineStore('authorizations', {
  state: () => ({
    applications: [],
    authorizations: {},
    project: null,
    project_id: null,
  }),

  getters: {
    getAuthorizations() {
      return {
        applications: this.applications,
        authorizations: this.authorizations,
        project: this.project,
        project_id: this.project_id,
      };
    },
    getApplications() {
      return this.application;
    },
  },
  actions: {
    setApplications(data) {
      this.application = data;
    },

    setAuthorizations(data) {
      this.applications = data.applications;
      this.authorizations = data.authorizations;
      this.project = data.project;
      this.project_id = data.project_id;
    },

    unsetAuthorizations() {
      this.applications = {};
      this.authorizations = [];
      this.project = null;
      this.project_id = null;
    },
  },
});
