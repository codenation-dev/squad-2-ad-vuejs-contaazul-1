import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      token: '123456',
      name: 'Ana',
    },
    errors: [],
    params: {
      order: 'desc',
      orderby: 'last_date',
    },
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
      return state.user?.token;
    },
    getParams(state) {
      return state.params;
    },
  },
  mutations: {
    setErrors(state, payload) {
      state.errors = payload;
    },
    logout(state) {
      state.user = {};
    },
    setParams(state, payload) {
      state.params = payload;
    },
  },
  actions: {
    setErrors({ commit }, payload) {
      commit('setErrors', payload);
    },
    logout({ commit }) {
      commit('logout');
    },
    setParams({ commit, state }, payload) {
      let { params } = state;

      if (!payload) {
        params = {
          orderby: 'last_date',
          order: 'desc',
        };
      } else if (payload !== params.orderby) {
        params = {
          orderby: payload,
          order: 'desc',
        };
      } else {
        params.order = params.order === 'desc' ? 'asc' : 'desc';
      }

      commit('setParams', params);
    },
  },
  modules: {},
});
