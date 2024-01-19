import { defineStore } from 'pinia';

export const useMessagesStore = defineStore('message', {
  state: () => ({
    message: '',
    code: '',
    status: '',
  }),

  getters: {
    getMessage() {
      return {
        code: this.code,
        message: this.message,
        status: this.status,
      };
    },
  },
  actions: {
    clearMessage() {
      this.code = '';
      this.message = '';
      this.status = '';
    },
    setMessage(data) {
      this.code = data.code;
      this.message = data.message;
      this.status = data.status;
    },
  },
});
