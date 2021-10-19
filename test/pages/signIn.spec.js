import {mount, shallowMount, createLocalVue } from '@vue/test-utils';
import Signin from '../../pages/signin.vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VueMeta from 'vue-meta';

import { createStore } from '../../.nuxt/store';
import { initialiseStores } from '../../utils/store-accsessor.ts';

const localVue = createLocalVue();
const router = new VueRouter();
localVue.use(VueRouter);
localVue.use(Vuex);
localVue.use(VueMeta, { keyName: 'head' });
describe('Testing Signin component', () => {
  let wrapper;
  let store;

  beforeAll(() => {
    initialiseStores(createStore());

    store = new Vuex.Store();
    wrapper = shallowMount(Signin, {
      localVue,
      router,
      store,
      data() {
        return {
          isChecked: true,
        };
      },
    });
  });
  it('Signinが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('headが存在する', () => {
    expect(wrapper.vm.$metaInfo.title).toBe('ログイン');
  });
  it('computedが正しい値(text)を返す', async () => {
    expect(wrapper.vm.inputType).toBe('text');
  });
  it('computedが正しい値(passwprd)を返す', async () => {
    await wrapper.setData({ isChecked: false });
    expect(wrapper.vm.inputType).toBe('password');
  });
  it('cickでイベント(onClick)が発火し、処理が正しく動作する', async () => {
    let passWrapper = wrapper.get('div');
    passWrapper.trigger('click');
    // expect(passWrapper.trigger('onClick')).toBeTruthy();
    expect(wrapper.vm.$data.isChecked).toBe(false);
  });
    //it('cickでイベント(Login)が発火する',async () => {
   // let loginWrapper = wrapper.get('[data-testid="roundButton"]');
   // console.log(loginWrapper)
    //loginWrapper.trigger('click')
    //expect(loginWrapper.trigger('login')).toBeTruthy();
 // })
});
