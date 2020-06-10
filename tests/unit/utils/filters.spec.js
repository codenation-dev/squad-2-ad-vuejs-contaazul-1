import { createLocalVue } from '@vue/test-utils';
import '@/utils/filters';

const localVue = createLocalVue();

describe('Testes dos Filtros', () => {
  it('Existe friltro formatDate', () => {
    expect(localVue.options.filters.formatDate).toBeDefined();
  });

  it('Filtro formatDate formatar corretamente', () => {
    const date = localVue.options.filters.formatDate('2020-04-20T17:44:14Z');

    expect(date).toEqual('4/20/2020, 2:44:14 PM');
  });

  it('Filtro formatDate retornar vazio quando nenhum valor for passado', () => {
    const date = localVue.options.filters.formatDate();

    expect(date).toEqual('');
  });
});
