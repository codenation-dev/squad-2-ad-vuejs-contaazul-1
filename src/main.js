import Vue from 'vue';
import Vuelidate from 'vuelidate';
import Toasted from 'vue-toasted';
import App from './App.vue';
import router from './router';
import store from './store';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all';
import './plugins/axios';

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(Toasted);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
