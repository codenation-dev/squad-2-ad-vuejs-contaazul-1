import Login from '../views/login/Login.vue';
import Register from '../views/login/Register.vue';
import ResetPassword from '../views/login/ResetPassword.vue';
import NewPassword from '../views/login/NewPassword.vue';

export default [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      beforeLogin: true,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      beforeLogin: true,
    },
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword,
    meta: {
      beforeLogin: true,
    },
  },
  {
    path: '/new-password/:id',
    name: 'NewPassword',
    component: NewPassword,
    params: true,
    meta: {
      beforeLogin: true,
    },
  },
];
