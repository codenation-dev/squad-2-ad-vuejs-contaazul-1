import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import ErrorsList from '@/components/errors/ErrorsList.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const getters = {
  getParams: (state) => state.params,
  getErrors: (state) => state.errors,
  getSelectedItems: (state) => state.selectedItems,
};

const actions = {
  setErrors: jest.fn(),
  setParamsOrder: jest.fn(),
  setSelectedItems: jest.fn(),
  useToast: jest.fn(),
};

const state = {
  errors: [{ id: '123' }, { id: '456' }],
  params: {
    order: 'desc',
    archived: false,
  },
  selectedItems: [],
};

describe('Teste de métodos computados', () => {
  it('Pega a ordem do store', () => {
    const store = new Vuex.Store({ state, getters, actions });
    const wrapper = shallowMount(ErrorsList, { store, localVue });

    expect(wrapper.vm.actionsClasses).toEqual('is-disabled');
  });

  it('Pega a ordem do store', () => {
    state.selectedItems = ['a', 'b'];

    const store = new Vuex.Store({ state, getters, actions });
    const wrapper = shallowMount(ErrorsList, { store, localVue });

    expect(wrapper.vm.actionsClasses).toEqual('');
  });

  it('Pega a ordem do store', () => {
    const store = new Vuex.Store({ state, getters, actions });
    const wrapper = shallowMount(ErrorsList, { store, localVue });

    expect(wrapper.vm.currentOrder).toEqual('desc');
  });

  it('Pega a ordem do store', () => {
    state.params.order = 'asc';

    const store = new Vuex.Store({ state, getters, actions });
    const wrapper = shallowMount(ErrorsList, { store, localVue });

    expect(wrapper.vm.currentOrder).toEqual('asc');
  });

  it('Classe ativa baseado na ordem do store', () => {
    const store = new Vuex.Store({ state, getters, actions });
    const wrapper = shallowMount(ErrorsList, { store, localVue });

    expect(wrapper.vm.activeClasses).toEqual('is-active is-asc');
  });

  it('Classe ativa baseado na ordem do store', () => {
    state.params.order = 'desc';

    const store = new Vuex.Store({ state, getters, actions });
    const wrapper = shallowMount(ErrorsList, { store, localVue });

    expect(wrapper.vm.activeClasses).toEqual('is-active is-desc');
  });

  it('Retorna todos os ids de erros do store', () => {
    const store = new Vuex.Store({ state, getters, actions });
    const wrapper = shallowMount(ErrorsList, { store, localVue });

    expect(wrapper.vm.allIds).toEqual(['123', '456']);
  });
});
