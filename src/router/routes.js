import { useAuthStore } from 'stores/auth';

const publicPages = ['login', 'forgot', 'reset'];

function BeforeEnter(to, from, next) {
  const store = useAuthStore();
  const isAuthenticated = store.authenticated;

  if (isAuthenticated) {
    next({ name: 'home' });
  } else {
    next();
  }
}

const routes = [
  {
    path: '/',
    name: 'root',
    component: () => import('layouts/MainLayout.vue'),
    // eslint-disable-next-line consistent-return
    beforeEnter(to, from, next) {
      const store = useAuthStore();
      const isAuthenticated = store.authenticated;

      if (!isAuthenticated && !publicPages.includes(to.name)) {
        // Si l'utilisateur n'est pas authentifié et tente d'accéder à une page non publique
        next({ name: 'login' });
      } else {
        // Si l'utilisateur est authentifié ou accède à une page publique
        next();
      }
    },
    children: [
      {
        name: 'login',
        path: 'login',
        component: () => import('pages/auth/Login.vue'),
        beforeEnter: BeforeEnter,
      },
      {
        name: 'forgot',
        path: 'forgot',
        component: () => import('pages/auth/Forgot.vue'),
        beforeEnter: BeforeEnter,
      },
      {
        name: 'reset',
        path: 'reset',
        component: () => import('pages/auth/Reset.vue'),
        beforeEnter: BeforeEnter,
      },
    ],
  },
  {
    alias: '/',
    path: '/applications',
    name: 'applications',
    component: () => import('layouts/Dashboard.vue'),
    // eslint-disable-next-line consistent-return
    beforeEnter(to, from, next) {
      const store = useAuthStore();
      const isAuthenticated = store.authenticated;

      if (!isAuthenticated && !publicPages.includes(to.name)) {
        // Si l'utilisateur n'est pas authentifié et tente d'accéder à une page non publique
        next({ name: 'login' });
      } else {
        // Si l'utilisateur est authentifié ou accède à une page publique
        next();
      }
    },
    children: [
      {
        name: 'home',
        path: '',
        component: () => import('pages/Home.vue'),
      },
      {
        name: 'acd-management',
        path: 'acd-management',
        component: () => import('pages/applications/acd-management/iv-api-acd.vue'),
      },
      {
        name: 'ivr-management',
        path: 'ivr-management',
        component: () => import('pages/applications/ivr-management/iv-api-ivr.vue'),
        children: [
          {
            name: 'sources',
            path: 'sources',
            component: () => import('pages/applications/ivr-management/sources.vue'),
          },
          {
            name: 'numbers',
            path: 'numbers',
            component: () => import('pages/applications/ivr-management/numbers.vue'),
          },
        ],
      },
      {
        name: 'mailconnectors',
        path: 'mailconnectors',
        component: () => import('pages/applications/mailconnectors/mailconnectors.vue'),
      },
      {
        name: 'messaging-server',
        path: 'messaging-server',
        component: () => import('pages/applications/messaging-server/messaging-server.vue'),
      },
      {
        name: 'provisioning',
        path: 'provisioning',
        component: () => import('pages/applications/provisioning/iv-api-provisioning.vue'),
      },
      {
        name: 'scp',
        path: 'scp',
        component: () => import('pages/applications/scp/iv-api-scp.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
