import { shallowMount, createLocalVue } from '@vue/test-utils';
import RakuItemId from '../../../pages/RakutenItemDetail/_itemId.vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
// import VueMeta from 'vue-meta'

import { createStore } from '../../../.nuxt/store';
import { initialiseStores } from '../../../utils/store-accsessor.ts';

const localVue = createLocalVue();
const router = new VueRouter();
localVue.use(VueRouter);
localVue.use(Vuex);
// localVue.use(VueMeta, { keyName: 'head' })

describe('Testing pages/RakutenItemDetail/_itemid.vue component', () => {
  let wrapper;
  let divWrapper;
//   let divWrapper;
  beforeEach(() => {
    initialiseStores(createStore());
    wrapper = shallowMount(RakuItemId, {
      localVue,
      router,
    //   store,
    });
    divWrapper = wrapper.find('div');
  });
  it('itemId.vueが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
//   it('headが表示されるか', () => {
//     expect(wrapper.vm.$metaInfo.title).toBe('商品詳細')
//   });
  it('clickイベント(back_onStep)が発火されている', () => {
    divWrapper.get('div').trigger('click');
  });
});
