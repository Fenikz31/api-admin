<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'">

    </q-header>
    <q-page-container>
      <router-view />
      <Notifications />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue';

import Notifications from 'components/Notifications.vue';

import { useAuthorizationsStore } from 'stores/authorizations';

export default defineComponent({
  name: 'MainLayout',

  components: {
    Notifications,
  },

  setup() {
    const project = ref(null);
    const projects = ref([]);
    const store = useAuthorizationsStore();
    const getAuthorizations = () => store.getAuthorizations;
    const { project_id } = getAuthorizations();

    return {
      project,
      project_id,
      projects,
    };
  },
});
</script>
