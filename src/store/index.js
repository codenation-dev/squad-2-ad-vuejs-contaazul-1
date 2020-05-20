import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      token: '123456',
    },
    errors: [],
  },
  getters: {
    getErrors(state) {
      return state.errors;
    },
    countErrors(state) {
      return state.errors.length;
    },
    isLogged(state) {
      return !!state.user.token;
    },
    getToken(state) {
      return state?.user?.token;
    },
  },
  mutations: {
    updateErrors(state, payload) {
      state.errors = payload;
    },
    logout(state) {
      state.user = {};
    },
  },
  actions: {
    updateErrors({ commit }, payload) {
      commit('updateErrors', payload);
    },
    logout({ commit }) {
      commit('logout');
    },
  },
  modules: {},
});
