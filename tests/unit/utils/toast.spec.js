import { createLocalVue } from '@vue/test-utils';
import Toasted from 'vue-toasted';
import '@/utils/toast';

const localVue = createLocalVue();

localVue.use(Toasted);

localVue.options.methods.$toasted = {
  show: jest.fn(),
};

describe('Teste do mixin do toast', () => {
  it('Verificar se o método useToast existe', () => {
    expect(localVue.options.methods.useToast).toBeDefined();
  });

  it('Chamar método useToast com type default', () => {
    const typeObj = { type: 'default' };
    const toasted = localVue.options.methods.$toasted.show;

    localVue.options.methods.useToast('Mensagem');

    expect(toasted).toBeCalledWith('Mensagem', expect.objectContaining(typeObj));
  });

  it('Chamar método useToast com type passado', () => {
    const typeObj = { type: 'error' };
    const toasted = localVue.options.methods.$toasted.show;

    localVue.options.methods.useToast('Mensagem', 'error');

    expect(toasted).toBeCalledWith('Mensagem', expect.objectContaining(typeObj));
  });
});
