import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import ErrorHome from '@/views/errors/ErrorHome.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const getters = {
  getParams: (state) => state.params,
  countErrors: (state) => state.errors.length,
};

const state = {
  errors: [],
  params: {
    archived: false,
  },
};

describe('ErrorHome', () => {
  it('Renderiza o título padrão', () => {
    const store = new Vuex.Store({ state, getters });
    const wrapper = shallowMount(ErrorHome, { store, localVue });

    expect(wrapper.find('.page-header--title').text()).toEqual('Dashboard de Erros');
  });

  it('Renderiza o título de arquivados', () => {
    state.params.archived = true;

    const store = new Vuex.Store({ state, getters });
    const wrapper = shallowMount(ErrorHome, { store, localVue });

    expect(wrapper.find('.page-header--title').text()).toEqual('Erros Arquivados');
  });

  it('Renderiza a quantidade de erros certa', () => {
    state.errors = ['a', 'b', 'c'];

    const store = new Vuex.Store({ state, getters });
    const wrapper = shallowMount(ErrorHome, { store, localVue });

    expect(wrapper.find('.page-header--badge').text()).toEqual('(3)');
  });
});
