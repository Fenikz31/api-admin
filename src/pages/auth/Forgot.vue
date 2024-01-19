<template>
  <q-page padding>
    <!-- content -->
    <ForgotForm />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import ForgotForm from 'components/auth/ForgotForm.vue';

export default defineComponent({
  name: 'Forgot',
  components: {
    ForgotForm,
  },
});
</script>
