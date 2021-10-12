import { shallowMount } from '@vue/test-utils';
import searchGroup from '../../components/morecules/searchGroup.vue';

describe('Testing searchGroup component', () => {
  const wrapper = shallowMount(searchGroup);
  it('searchGroupが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
//   it('propsが受け取れている', () => {
//     expect(wrapper.vm.$props.item.img).toBe('imgimg');
//   });
});
