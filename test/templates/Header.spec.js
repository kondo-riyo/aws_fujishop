// import { shallowMount, createLocalVue } from '@vue/test-utils';
// import { createStore } from '../../.nuxt/store'
// import Vuex from 'vuex'
// import Header from '../../components/templates/Header.vue';
// // import assert from 'assert'
// import { initialiseStores } from '../../utils/store-accsessor'

// const localVue = createLocalVue();
// localVue.use(Vuex);

// // const res = [{
// //     email: 'sample@sample.com',
// //     password: '123456',
// //     name: 'kondo',
// //     tel: '00011112222',
// //     postalcode: '1230000',
// //     address: 'tokyo',
// //     uid: 'aaaa'
// // }]

// describe('Testing Header component', () => {
//   let store;
//   let headerStoreMock;
//   let wrapper;
//   let fn;

// beforeEach(()=> {
//     initialiseStores(createStore())
//     fn = jest.fn();
//     //vuexstoreのMockを作成
//     headerStoreMock = {
//       namespaced: true,
//       getters : {
//         getUserInfo: UserInfo,
//       },
//     };
//     const UserInfo = () => {
//         return {
//             userInfo:[{
//                 email: 'sample@sample.com',
//                 password: '123456',
//                 name: 'kondo',
//                 tel: '00011112222',
//                 postalcode: '1230000',
//                 address: 'tokyo',
//                 uid: 'aaaa'
//                 }]
//         };
//     };
//     store = new Vuex.Store({
//         modules: {
//           users:headerStoreMock 
//         },
//     });

//     window.confirm = () => {};

//     // shallowMountだと子コンポーネントをスタブによって描画しなくなる(高速化)
//     wrapper = shallowMount(Header, { 
//         // propsData: {

//         // }
//         store, 
//         localVue 
//     });
// });

//   it('Headerが存在する', () => {
//     expect(wrapper.exists()).toBeTruthy();
//   });
// });

//---------------------------

import { shallowMount, createLocalVue } from '@vue/test-utils';
import Header from '../../components/templates/Header.vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import { createStore } from '../../.nuxt/store';
import { initialiseStores } from '../../utils/store-accsessor.ts';

const localVue = createLocalVue();
const router = new VueRouter();
localVue.use(VueRouter);
localVue.use(Vuex);

describe('Testing Header component', () => {
  let wrapper;
  let divWrapper;
  let store;
//   let fn;
//   let CartStore;

  beforeEach(() => {
    initialiseStores(createStore());
    // fn = jest.fn();
    // CartStore = {
    //   namespaced: true,
    //   actions: {
    //     deleteCartItemAct: fn,
    //     fetchitemInfoAct: fn,
    //   },
    // };

    // store = new Vuex.Store({
    //   modules: {
    //     // cart: CartStore,
    //   },
    // });
    // window.confirm = () => {};
    wrapper = shallowMount(Header, {
      localVue,
      router,
    //   store,
    });
    divWrapper = wrapper.find('div')
  });
  it('Headerが存在する', () => {
    expect(divWrapper.exists()).toBeTruthy();
  });
  it('click(logout)が発火されている', () => {
    divWrapper.get('div').trigger('click');
  });
});
