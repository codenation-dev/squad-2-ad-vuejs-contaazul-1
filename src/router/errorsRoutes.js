import ErrorsHome from '@/views/errors/ErrorHome.vue';
import ErrorDetails from '@/views/errors/ErrorDetails.vue';

export default [
  {
    path: '',
    name: 'ErrorHome',
    component: ErrorsHome,
    meta: {
      auth: true,
    },
  },
  {
    path: 'details/:id',
    name: 'ErrorDetails',
    component: ErrorDetails,
    props: true,
    meta: {
      auth: false,
    },
  },
];
