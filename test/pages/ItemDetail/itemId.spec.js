import { shallowMount, createLocalVue } from '@vue/test-utils';
import FujiItemId from '../../../pages/ItemDetail/_itemId.vue';
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

describe('Testing pages/itemDetail/_itemid.vue component', () => {
  let wrapper;
  let divWrapper;
  let squareBottunWrapper;
  let inputWrapper;

//   let divWrapper;
  beforeEach(() => {
    initialiseStores(createStore());
    wrapper = shallowMount(FujiItemId, {
      localVue,
      router,
    //   store,
    });
    divWrapper = wrapper.find('div');
    squareBottunWrapper = wrapper.find('squareBottun')
    inputWrapper = wrapper.find('input')
  });
  it('itemId.vueが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('headが表示されるか', () => {
    expect(wrapper.vm.$metaInfo.title).toBe('商品詳細')
  });
  it('clickイベント(back_onStep)が発火されている', () => {
    divWrapper.get('div').trigger('click');
  });
//   it('changeイベント(selectToppngSize)が発火', ()=> {
//       inputWrapper.get('input').trigger('change')
//   })
//   it('squareBottunが存在', ()=> {
//     //   expect(squareBottunWrapper.exists()).toBeTruthy();
//     squareBottunWrapper.get('squareBottun').trigger('click')
//   })
});

// npm run test /test/pages/ItemDetail/itemId.spec.js