import Vue from 'vue';
import axios from 'axios';

Vue.use({
  install() {
    Vue.prototype.$http = axios.create({
      baseURL: 'http://localhost:3000',
    });
  },
});
