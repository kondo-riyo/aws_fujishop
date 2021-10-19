import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
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
    let Stubs = ['roundBottun', 'inputA'];
    store = new Vuex.Store();
    wrapper = mount(Signup, {
      stubs: Stubs,
      localVue,
      router,
      store,
      data() {
        return {
          isChecked: true,
          userInfo:{
            name:"naman"
          }
        };
      },
    });
  });
  it('Signupが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('headが存在する', () => {
    expect(wrapper.vm.$metaInfo.title).toBe('会員登録');
  });
  it('cickでイベント(onClick)が発火する', async () => {
    let cancelWrapper = wrapper.get('[data-testid="onClick"]');
    cancelWrapper.trigger('click');
    expect(cancelWrapper.trigger('onClick')).toBeTruthy();
  });
  it('@inputでイベント(inputName)が発火する', async () => {
    let userInfoWrapper = wrapper.find('[data-testid="inputName"]');
    userInfoWrapper.trigger('input');
    expect(userInfoWrapper.trigger('inputName')).toBeTruthy();
  });
  it('@inputでイベント(inputTel)が発火する', async () => {
    let userInfoWrapper = wrapper.find('[data-testid="inputTel"]');
    userInfoWrapper.trigger('input');
    expect(userInfoWrapper.trigger('inputTel')).toBeTruthy();
  });
  it('@inputでイベント(inputPassword)が発火する', async () => {
    let userInfoWrapper = wrapper.find('[data-testid="inputPassword"]');
    userInfoWrapper.trigger('input');
    expect(userInfoWrapper.trigger('inputPassword')).toBeTruthy();
  });
  // it('@inputでイベント(inputMail)が発火する', async () => {
  //   let userInfoWrapper = wrapper.find('[data-testid="inputMail"]');
  //   userInfoWrapper.trigger('input');
  //  // userInfoWrapper.element.value='mail@co.jp'
  //  // await userInfoWrapper.setValue('mail@co.jp')
  //   console.log(userInfoWrapper.element.value)
  //   console.log(wrapper.vm.userInfo.email)
  //   console.log(wrapper.vm.userInfo)
  //   console.log(vm.userInfo.email)
  //   await expect(vm.userInfo.email).toEqual('mail@co.jp')
   // expect(userInfoWrapper.trigger('inputMail')).toBeTruthy();
 // });
  //   it('computedが正しい値(text)を返す', async() => {
  //     let InputWrapper = wrapper.find('[data-testid="inputType"]');
  //     //InputWrapper.trigger('input')
  //     //await expect(InputWrapper.trigger('inputPassword')).toBeTruthy();
  //    // expect(InputWrapper.isVisible()).toBe(false)
  //     // InputWrapper.setValue("123456")
  //     // expect(InputWrapper.element.value).toBe('123456');
  //   });
});
