<template>
  <div class="q-pa-md flex flex-center" style="height:100%;width: 100%">
    <q-card
      class="flex flex-center column q-pa-md"
      style="height: 100%%;max-width: 600px;width: 100%"
    >
      <q-form
        @reset="onReset"
        autocorrect="off"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
        class="q-gutter-md"
        style="height:25%;width: 100%"
      >
        <q-input
          autocorrect="off"
          autocapitalize="off"
          autocomplete="off"
          bottom-slots
          spellcheck="false"
          v-model="username"
          label="Your user name *"
          hint="Username, 4 characters minimum."
          lazy-rules
          outlined
          :error="!usernameIsValid"
          :rules="[
            () => usernameIsValid || 'Please enter a valid username.'
          ]"
        />

        <q-input
          autocorrect="off"
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
          type="password"
          v-model="password"
          label="Your password *"
          lazy-rules
          outlined
          :error="!passwordIsValid"
          :rules="[
            (val) => passwordIsValid || 'Please type a valid password.'
          ]"
        />

        <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

        <div style="display: flex; justify-content: space-between; width: 100%;">
          <q-btn
            class="q-ml-sm"
            label="Forgotten password"
            type="forgotten"
            to="/forgot"
            color="negative"
            rounded
          />
          <q-btn
            @click="onSubmit"
            class="glossy"
            label="Submit"
            type="submit"
            color="primary"
            :disabled="!(passwordIsValid && usernameIsValid)"
            rounded
          />
        </div>
      </q-form>
    </q-card>

  </div>
</template>

<script>
import { computed, ref } from 'vue';

import AuthServices from 'services/auth';

export default {
  setup() {
    const username = ref('');
    const password = ref('');

    return {
      username,
      password,

      passwordIsValid: computed(() => password.value && password.value.length >= 4 && /^[a-zA-Z0-9.!?@]{4,100}$/.test(password.value)),
      usernameIsValid: computed(() => username.value && username.value.length >= 4 && /^[a-zA-Z]{4,25}$/.test(username.value)),

      async onSubmit(e) {
        try {
          e.preventDefault();
          await AuthServices.login({
            password: password.value,
            username: username.value,
          });

          return null;
        } catch (error) {
          return error;
        }
      },

      onReset() {
        username.value = '';
        password.value = '';
      },
    };
  },
};
</script>
