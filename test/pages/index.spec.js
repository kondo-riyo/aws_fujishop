import { shallowMount, createLocalVue } from '@vue/test-utils';
import index from '../../pages/index.vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
// import VueMeta from 'vue-meta'

import { createStore } from '../../.nuxt/store';
import { initialiseStores } from '../../utils/store-accsessor.ts';

const localVue = createLocalVue();
const router = new VueRouter();
localVue.use(VueRouter);
localVue.use(Vuex);
// localVue.use(VueMeta, { keyName: 'head' })

describe('Testing pages/index.vue component', () => {
  let wrapper;
//   let divWrapper;
  beforeEach(() => {
    initialiseStores(createStore());
    wrapper = shallowMount(index, {
      localVue,
      router,
    //   store,
    });
  });
  it('adminが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
