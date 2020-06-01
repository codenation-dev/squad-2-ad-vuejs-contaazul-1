import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMeta from 'vue-meta';
import Toasted from 'vue-toasted';
import store from '@/store';
import Home from '@/views/Home.vue';
import Charts from '@/views/errors/Charts.vue';
import errorsRoutes from './errorsRoutes';
import loginRoutes from './loginRoutes';
import NotFound from '../views/NotFound.vue';

Vue.use(VueRouter);
Vue.use(VueMeta);
Vue.use(Toasted);

const routes = [
  {
    path: '/',
    components: {
      default: Home,
    },
    children: [...errorsRoutes],
  },
  {
    path: '/charts',
    name: 'Charts',
    component: Charts,
    meta: {
      auth: true,
    },
  },
  ...loginRoutes,
  {
    path: '/404',
    name: '404',
    component: NotFound,
  },
  {
    path: '*',
    redirect: '/404',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const { isLogged } = store.getters;
  const isAuthNeeded = to?.meta?.auth;
  const isBeforeLogin = to?.meta?.beforeLogin;

  if (isLogged && isBeforeLogin) {
    router.push({ name: 'ErrorHome' });
  }

  if (!isLogged && isAuthNeeded) {
    router.push({ name: 'Login' });
  }

  next();
});

export default router;
