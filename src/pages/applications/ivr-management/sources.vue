<template style="height:100%;">
  <div style="height:100%;">
    <q-table
      flat bordered
      dense
      :rows="rows"
      :columns="columns"
      row-key="name"
      separator="cell"
      virtual-scroll
    />
  </div>
</template>

<script>
import { defineComponent, inject, ref } from 'vue';
import crud from 'services/crud';
import Column from 'helpers/constants';

export default defineComponent({
  name: 'sources',

  data() {
    return {
      count: null,
      resource: '/ivr/sources',
      rows: [],
      columns: [],
    };
  },

  methods: {
    async read() {
      const { count, rows } = await crud.get({ resource: this.resource });
      this.count = count;
      this.rows = rows;
      const columns = [
        {
          ...Column,
          name: 'project',
          label: 'project',
          field: 'project',
          required: false,
          align: 'left',
        },
        {
          ...Column,
          name: 'name',
          label: 'name',
          field: 'name',
          required: false,
          align: 'left',
        },
        {
          ...Column,
          name: 'custom_data',
          label: 'custom_data',
          field: 'custom_data',
          required: false,
          align: 'left',
        },
        {
          ...Column,
          name: 'data',
          label: 'data',
          field: 'data',
          required: false,
          align: 'left',
        },
        {
          ...Column,
          name: 'updated',
          label: 'updated',
          field: 'updated',
          required: false,
          align: 'left',
        },
        {
          ...Column,
          name: 'created',
          label: 'created',
          field: 'created',
          required: false,
          align: 'left',
        },
      ];

      this.columns = columns;
      // console.log('count: ', this.count);
      // console.log('rows: ', this.rows);
      console.log('columns: ', columns);
      console.log('rows: ', rows);
    },
  },

  mounted() {
    this.read();
  },
  setup() {
    const applications = inject('applications');
    const resource = ref();
  },
});
</script>
