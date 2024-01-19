<template>
  <div class="q-pa-md flex flex-center" style="height:100%;width: 100%">
    <q-card
      class="flex flex-center column q-pa-md"
      style="height: 100%%;max-width: 600px;width: 100%"
    >
      <q-form
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
          v-model="email"
          label="Type your email address *"
          hint="Type a valid email address."
          lazy-rules
          outlined
          :error="!emailIsValid"
          :rules="[
            () => emailIsValid || 'Please enter a valid username.'
          ]"
        />

        <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

        <div style="display: flex; justify-content: space-between; width: 100%;">
          <q-btn
            class="q-ml-sm"
            label="Go back to login"
            to="/login"
            color="primary"
            flat
          />
          <q-btn
            @click="onSubmit"
            class="glossy"
            label="Send email"
            type="submit"
            color="primary"
            :disabled="!emailIsValid"
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
    const email = ref('');

    return {
      email,

      emailIsValid: computed(() => email.value && /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email.value)),

      async onSubmit(e) {
        try {
          e.preventDefault();
          await AuthServices.login({
            email: email.value,
          });

          return null;
        } catch (error) {
          return error;
        }
      },
    };
  },
};
</script>
