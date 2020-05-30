import Vue from 'vue';
import Vuex from 'vuex';
import Persistence from 'vuex-persist';

Vue.use(Vuex);

const local = new Persistence({
  storage: window.localStorage,
});

export default new Vuex.Store({
  plugins: [
    local.plugin,
  ],
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
    setParamsOrder(state, payload) {
      state.params = payload;
    },
    setParamsEnvironment(state, payload) {
      state.params.environment = payload;
    },
    setParamsField(state, payload) {
      state.params.field = payload;
    },
    setParamsSearchValue(state, payload) {
      state.params.searchValue = payload;
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
    setParamsOrder({ commit, state }, payload) {
      const { params } = state;

      if (!payload) {
        params.orderby = 'last_date';
        params.order = 'desc';
      } else if (payload !== params.orderby) {
        params.orderby = payload;
        params.order = 'desc';
      } else {
        params.order = params.order === 'desc' ? 'asc' : 'desc';
      }

      commit('setParamsOrder', params);
    },
    setParamsEnvironment({ commit }, payload) {
      commit('setParamsEnvironment', payload);
    },
    setParamsField({ commit }, payload) {
      commit('setParamsField', payload);
    },
    setParamsSearchValue({ commit }, payload) {
      commit('setParamsSearchValue', payload);
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
