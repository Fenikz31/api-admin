<template>
  <q-page id="login_page" class="flex flex-center column" style="height: 100%;width: 100%">
    <!-- content -->
    <LoginForm />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import LoginForm from 'components/auth/LoginForm.vue';

export default defineComponent({
  name: 'Login',

  components: {
    LoginForm,
  },
});
</script>
