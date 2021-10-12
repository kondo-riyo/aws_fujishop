import { shallowMount } from '@vue/test-utils';
import deliverySelect from '../../../components/atoms/input/deliverySelect.vue';
// @ts-ignore
describe('Testing inputSearch component', () => {
  let selectWrapper;
  beforeEach(() => {
    // 子コンポーネントのマウントを行わないマウント
    const wrapper = shallowMount(deliverySelect, {
      // propsプロパティの設定
      propsData: {
        value: 'value',
        options: [{option:'option'}],
        name: 'name',
      },
    });
    selectWrapper = wrapper.find('select');
  });

  it('deliverySelectが存在する', () => {
    expect(selectWrapper.exists()).toBeTruthy();
  });
  it('selectイベントが発火する', async () => {
    await selectWrapper.find('select').trigger('select');
  });
});
