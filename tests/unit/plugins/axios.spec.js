import Vue from 'vue';
import '@/plugins/axios';

describe('Teste de axios', () => {
  it('Instância do axios está rodando direto no Vue', () => {
    expect(Vue.prototype.$http).toBeDefined();
  });

  it('Rodar em ambiente de desenvolvimento', async () => {
    const response = await Vue.prototype.$http.get('/errors');

    expect(response.config.baseURL).toEqual('http://localhost:3000');
  });
});
