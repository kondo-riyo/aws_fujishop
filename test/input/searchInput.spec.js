import { shallowMount } from '@vue/test-utils';
import searchInput from '../../components/atoms/input/searchInput.vue';

describe('イベント発動', () => {
    const wrapper = shallowMount(searchInput);
    it('onInputメソッドが実行されること', () => {
      wrapper.vm.onInput();
      expect(wrapper.emitted()['input']).toBeTruthy();
    });
  });

