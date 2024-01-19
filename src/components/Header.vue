<template>
  <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'">
      <q-toolbar>
        <q-btn
          flat
          v-if="authenticated"
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="onClick"
        />

        <q-toolbar-title>
          CNX-API-ADMIN
        </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  props: {
    authenticated: {
      type: Boolean,
      required: true,
    },

    onClick: {
      required: true,
    },
  },
};
</script>
