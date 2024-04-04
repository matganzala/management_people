// ViewRegister.spec.js

import { mount } from '@vue/test-utils';
import ViewRegister from '@/views/ViewRegister.vue';

describe('ViewRegister', () => {
  test('renders correctly', () => {
    // Monta o componente ViewRegister
    const wrapper = mount(ViewRegister);

    // Verifica se o componente está renderizado corretamente
    expect(wrapper.exists()).toBe(true);
  });
});
