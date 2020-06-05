import Vue from 'vue';
import axios from 'axios';

const baseURL = process.env.VUE_APP_APIURL || 'http://localhost:3000';

Vue.use({
  install() {
    Vue.prototype.$http = axios.create({
      baseURL,
    });
  },
});
