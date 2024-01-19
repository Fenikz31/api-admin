<template>
  <div class="notifications">
  </div>
</template>

<script>
import { useQuasar } from 'quasar';
import { defineComponent } from 'vue';

import { useMessagesStore } from 'stores/messages';

export default defineComponent({
  name: 'Notifications',

  setup() {
    const store = useMessagesStore();
    const timeout = 5000; // Durée de la notification en millisecondes

    const clearMessage = () => store.clearMessage;
    const getMessage = () => store.getMessage;
    const $q = useQuasar();

    function showNotification() {
      const { message, status } = getMessage();
      if (message) {
        $q.notify({
          type: status <= 200 ? 'positive' : 'negative',
          message,
          timeout,
        });
      }

      // Efface le message du store Pinia après un délai
      setTimeout(
        () => {
          store.clearMessage();
        },
        timeout,
      );
    }

    store.$subscribe((props) => {
      showNotification();
    });

    return {
      clearMessage,
      getMessage,
      timeout,
    };
  },
});
</script>

<style>
.notifications {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
}
</style>
