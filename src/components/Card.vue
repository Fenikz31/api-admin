<template>
  <div :id="id">
    <q-card class="my-card q-pa-sm column col-xs-12 col-sm-6 col-md-4 justify-between">
      <q-card-section class="row justify-center">
        <div class="text-h6">{{ title }}</div>
      </q-card-section>

      <q-separator dark />
      <div class="flex justify-center">
        <q-icon :name="icon" size="64px"/>
      </div>
      <q-card-actions class="justify-center">
        <q-btn
          class="my-card-btn"
          filled
          color="primary"
          :to="link"
          @click="$emit('select', title)"
        >
          Get to {{ title }}
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Card',

  methods: {
    handleSelected() {
      console.log(this.title);
      this.$emit('handleSelected', this.title);
    },
  },
  props: {
    id: {
      id: Number,
      required: true,
    },
    icon: {
      type: String,
      default: 'apps',
    },
    link: {
      type: String,
      default: '#',
    },
    title: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 400px
  min-width: 260px
  min-height: 260px
.my-card-btn
  width: 100%
  max-width: 380px
  min-width: 240px
</style>
