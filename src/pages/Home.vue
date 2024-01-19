<template>
  <q-page padding class='row wrap justify-around' >
    <Card
      v-for="(application) in applications"
      :key="application.id"
      v-bind="application"
      :icon="application.icon"
      :title="application.name"
      @select="() => application.name"
    />
  </q-page>
</template>

<script>
import {
  defineComponent,
  provide,
  ref,
} from 'vue';

import Card from 'components/Card.vue';
import { useAuthorizationsStore } from 'stores/authorizations';

export default defineComponent({
  name: 'Home',
  components: {
    Card,
  },
  setup() {
    const store = useAuthorizationsStore();
    const getAuthorizations = () => store.getAuthorizations;
    const { applications } = getAuthorizations();
    const application = ref(null);
    provide('application', application);
    return {
      getAuthorizations,
      applications,
    };
  },
});
</script>
