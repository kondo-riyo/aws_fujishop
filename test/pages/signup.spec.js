import { shallowMount, createLocalVue } from '@vue/test-utils';
import Signup from '../../pages/signup.vue';
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
describe('Testing Signup component', () => {
  let wrapper;
  let store;

  beforeAll(() => {
    initialiseStores(createStore());

    store = new Vuex.Store();
    wrapper = shallowMount(Signup, {
      localVue,
      router,
      store,
      data(){
          return{
              isChecked:true
          }
      }
    });
  });
  it('Signupが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('headが存在する', () => {
    expect(wrapper.vm.$metaInfo.title).toBe('会員登録');
  });
//   it('computedが正しい値(text)を返す', async() => {
//     let InputWrapper = wrapper.find('[data-testid="inputType"]');
//     //InputWrapper.trigger('input')
//     //await expect(InputWrapper.trigger('inputPassword')).toBeTruthy();
//    // expect(InputWrapper.isVisible()).toBe(false)
//     // InputWrapper.setValue("123456")
//     // expect(InputWrapper.element.value).toBe('123456');
//   });
  it('cickでイベント(Login)が Unable to find [data-testid="roundButton"] within:発火する',async () => {
    let cancelWrapper = wrapper.find('[data-testid="roundButton"]');
    //cancelWrapper.trigger('click')
    //expect(cancelWrapper.trigger('login')).toBeTruthy();
  })
//   it('cickでイベント(LonClick)が発火する',async () => {
//     let cancelWrapper = wrapper.get('[data-testid="onClick"]');
//     cancelWrapper.trigger('click')
//     expect(cancelWrapper.trigger('onClick')).toBeTruthy();
//   })
});
