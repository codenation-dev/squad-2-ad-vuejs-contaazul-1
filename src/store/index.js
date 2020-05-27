import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      token: null,
    },
    errors: [],
    params: {
      order: 'desc',
      orderby: 'last_date',
      environment: null,
      field: null,
      searchValue: null,
    },
    selectedItems: [],
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
    getSelectedItems(state) {
      return state.selectedItems;
    },
    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    setErrors(state, payload) {
      state.errors = payload;
    },
    logout(state) {
      state.user = {};
    },
    login(state, user) {
      state.user = user;
    },
    setParams(state, payload) {
      state.params = payload;
    },
    addSelectedItem(state, payload) {
      state.selectedItems.push(payload);
    },
    removeSelectedItem(state, payload) {
      state.selectedItems.splice(payload, 1);
    },
    setSelectedItems(state, payload) {
      state.selectedItems = [...payload];
    },
  },
  actions: {
    setErrors({ commit }, payload) {
      commit('setErrors', payload);
    },
    logout({ commit }) {
      commit('logout');
    },
    login({ commit }, user) {
      commit('login', user);
    },
    setParams({ commit, state }, payload) {
      let { params } = state;

      if (!payload.orderBy) {
        params = {
          orderby: 'last_date',
          order: 'desc',
        };
      } else if (payload.orderBy !== params.orderby) {
        params = {
          orderby: payload,
          order: 'desc',
        };
      } else {
        params.order = params.order === 'desc' ? 'asc' : 'desc';
      }

      params.environment = payload.environment;
      params.field = payload.field;
      params.searchValue = payload.searchValue;
      commit('setParams', params);
    },
    toggleSelectedItem({ commit, state }, payload) {
      const existId = state.selectedItems.findIndex((item) => item === payload);

      if (existId >= 0) {
        commit('removeSelectedItem', existId);
      } else {
        commit('addSelectedItem', payload);
      }
    },
    setSelectedItems({ commit }, payload) {
      commit('setSelectedItems', payload);
    },
  },
});
