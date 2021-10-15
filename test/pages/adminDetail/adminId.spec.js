import { shallowMount, createLocalVue } from '@vue/test-utils';
import adminDetailId from '../../../pages/adminDetail/_adminId.vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VueMeta from 'vue-meta'

import { createStore } from '../../../.nuxt/store';
import { initialiseStores } from '../../../utils/store-accsessor.ts';

const localVue = createLocalVue();
const router = new VueRouter();
localVue.use(VueRouter);
localVue.use(Vuex);
localVue.use(VueMeta, { keyName: 'head' })

describe('Testing pages/adminDetail/_adminId.vue component', () => {
  let wrapper;
  let divWrapper;
//   let squareBottunWrapper;
//   let divWrapper;
  beforeEach(() => {
    initialiseStores(createStore());
    wrapper = shallowMount(adminDetailId, {
      localVue,
      router,
    //   store,
    });
    divWrapper = wrapper.find('div');
    // squareBottunWrapper = wrapper.find('squareBottun')
  });
  it('adminId.vueが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('headが表示されるか', () => {
    expect(wrapper.vm.$metaInfo.title).toBe('注文履歴')
  });
  it('clickイベント(back_onStep)が発火されている', () => {
    divWrapper.get('div').trigger('click');
  });
//   it('squareBottunが存在', ()=> {
//     //   expect(squareBottunWrapper.exists()).toBeTruthy();
//     squareBottunWrapper.get('squareBottun').trigger('click')
//   })
});
