<template>
  <q-layout class="" style="height: 100%; width: 100%;" view="hHh Lpr lFf">
    <HeaderComponent :authenticated="authenticated" :onClick="onDrawerClick"/>
      <q-drawer
        v-model="drawer"
        v-if="authenticated"
        :breakpoint="500"
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
        :width="200"
        elevated
        show-if-above

        :mini="mini"
        @mouseover="mini = false"
        @mouseout="mini = true"
      >
        <q-scroll-area class="fit">
          <q-list>
            <q-item
              clickable
              @click="onClick"
              :active="'Home' === selected"
              id="Home"
              v-ripple
              to="/applications"
            >
              <q-icon
                id="Home"
                name="home"
                size="24px"
                class="q-pa-sm"
              />
              <q-item-section
                class="text-bold"
                id="Home"
              >Home</q-item-section>
            </q-item>
            <div
              v-for="(value,key) in applications"
              :key="key"
              @click="onClick"
              @handleSelected="handleSelected"
              :name="value.name"
              :id="value.name"
            >
              <q-item
                :clickable=false
                :active="value.name === selected"
                :id="value.name"
                :to="value.link"
                v-ripple
              >
                <q-icon
                  :name="value.icon ? value.icon  : 'apps'"
                  :id="value.name"
                  size='24px'
                  class="q-pa-sm"
                />
                <q-item-section
                  class="text-bold"
                  :id="value.name"
                >
                  {{ value.name }}
                </q-item-section>
              </q-item>
            </div>

          </q-list>
        </q-scroll-area>
      </q-drawer>
    <q-page-container
      id='dashboard'
      class=" fit"
      style="height: 100%; width: 100%;"
    >
      <q-toolbar class="bg-primary text-white shadow-2">
        <q-breadcrumbs
            active-color="white">
          <q-breadcrumbs-el
            v-for="breadcrumb in breadcrumbs"
            @click="breadcrumb.click"
            :icon="breadcrumb.icon"
            :key="breadcrumb.text"
            :label="breadcrumb.text"
            :to="breadcrumb.url"
          />
        </q-breadcrumbs>
        <q-space />
        <q-select
          borderless
          class="text-white"
          v-model="project"
          :options="projects"
          label="Project"
          emit-value
          map-options
        />
      </q-toolbar>
      <q-tabs
        v-model="model"
        dense
        align='justify'
        class="bg-primary fit text-white shadow-2"
      >
        <q-tab
          v-for="(value,name) in authorizations[selected]"
          :id="name"
          :key="name"
          :label="name"
          :name="name"
          exact
          no-caps
          @="routingFromTabs(name)"
        />
      </q-tabs>
      <router-view class="relative  q-pa-md" style="height: 100%;width: 100%;"/>
      <Notifications />
    </q-page-container>
  </q-layout>
</template>

<script>
import {
  defineComponent, provide, ref, watchEffect,
} from 'vue';
import { storeToRefs } from 'pinia';

import HeaderComponent from 'components/Header.vue';
import Notifications from 'components/Notifications.vue';

import crud from 'services/crud';

import { useAuthStore } from 'stores/auth';
import { useAuthorizationsStore } from 'stores/authorizations';

export default defineComponent({
  name: 'Dashboard',

  components: {
    HeaderComponent,
    Notifications,
  },

  created() {
    this.$router.beforeEach((to) => {
      // Générer les breadcrumbs pour la nouvelle route
      this.generateBreadcrumbs(to.matched);
    });
  },
  methods: {
    generateBreadcrumbs(matchedRoutes) {
      // Cette fonction génère les breadcrumbs en fonction des routes correspondantes
      this.breadcrumbs = matchedRoutes
        .filter(({ name }) => name !== 'home')
        .map((Route) => {
          if (Route.name === 'applications') {
            return {
              text: Route.name,
              icon: 'home',
              url: Route.path,
              click: () => {
                this.selected = 'Home';
              },
            };
          }

          const application = this.applications.filter(({ link }) => link === Route.path)[0]
            ? this.applications.filter(({ link }) => link === Route.path)[0].name
            : null;
          if (application !== null) {
            this.selected = application;
          }
          return {
            text: Route.meta.breadcrumb || Route.name,
            url: Route.path,
            click: () => null,
          };
        });
    },
    async getProjects() {
      const options = {};

      if (this.project_id !== null) {
        options.params = {
          _w: `(id,eq,${this.project_id})`,
        };
      }

      const { rows } = await crud.get({ resource: '/provisioning/projects', options });

      const projects = rows.map(({ id, name }) => ({
        label: name,
        value: id,
      }));
      this.projects = [{ label: 'None', id: null }, ...projects];
    },
    routingFromTabs(name) {
      if (this.selected !== 'Home' && name === this.model) {
        console.log('this.selected: ', this.selected);
        const desiredRoute = `/applications/${this.selected.toLowerCase().replace(/\s/g, '-')}/${name.toLowerCase()}`;
        if (this.$route.fullPath !== desiredRoute) {
          console.log('this.$route: ', this.$route);
          console.log('desiredRoute: ', desiredRoute);
          this.$router.push(desiredRoute);
        }
        if (this.$route !== desiredRoute && this.$route.params.project === undefined) {
          console.log('this.$route: ', this.$route);
          this.$route.params = {
            ...this.$route.params,
            project: this.project,
          };
          console.log('this.$route: ', this.$route);
        }
        // eslint-disable-next-line max-len
        // $router.push(`/applications/${selected.toLowerCase().replace(/\s/g,'-')}/${name.toLowerCase()}`)
      }
      return {};
    },
  },
  mounted() {
    if (this.authenticated && this.project === '') {
      this.getProjects();
    }
  },

  setup() {
    const breadcrumbs = ref([]);
    const drawer = ref(true);
    const mini = ref(true);
    const model = ref(null);
    const project = ref('');
    const projects = ref([]);
    const selected = ref('Home');

    const auth = useAuthStore();
    const { authenticated } = storeToRefs(auth);

    const permissions = useAuthorizationsStore();
    const { applications, authorizations, project_id } = storeToRefs(permissions);

    function onClick(e) {
      selected.value = e.target.id;
    }

    function onDrawerClick(e) {
      drawer.value = !drawer.value;
    }

    provide('acls', authorizations.value);
    provide('applications', applications.value);
    // console.log('selected: ', selected);
    // console.log('authorizations.value; ', authorizations.value);

    // console.log('applications: ', applications);
    // console.log('selected: ', selected);
    watchEffect(
      () => {
        if (selected.value === 'Home') {
          model.value = null;
        }

        if (selected.value !== 'Home') {
          const firstTab = Object.keys(authorizations.value[selected.value])
            .map((item) => ({
              name: item, ...authorizations.value[selected.value][item],
            }))
            .filter((key) => (key.resource_order !== null
              ? key.resource_order === 1
              : key))[0].name;

          if (model.value === null) {
            model.value = firstTab;
          }

          if (model.value !== null) {
            const currentTabExist = Object.keys(authorizations.value[selected.value])
              .indexOf(model.value) !== -1;

            if (!currentTabExist) {
              model.value = firstTab;
            }
          }
        }
      },
    );

    return {
      applications,
      breadcrumbs,
      authenticated,
      authorizations,
      drawer,
      mini,
      model,
      project,
      project_id,
      projects,
      onClick,
      onDrawerClick,
      selected,
    };
  },
});
</script>
