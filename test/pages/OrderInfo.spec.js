
import { shallowMount, createLocalVue } from '@vue/test-utils';
import OrderInfo from '../../pages/OrderInfo.vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import { createStore } from '../../.nuxt/store';
import { initialiseStores } from '../../utils/store-accsessor.ts';

const localVue = createLocalVue();
const router = new VueRouter();
localVue.use(VueRouter);
localVue.use(Vuex);

describe('Testing OrderInfo component', () => {
  let wrapper;
  let inputWrapper;
//   let store;
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
    wrapper = shallowMount(OrderInfo, {
        data() {
            return{
                name: '',
                // email: 'fuji@sample.com',
                // postalcode: '1230000',
                // address: 'tokyo',
                // tel: '00011112222'
            }
        },
      localVue,
      router,
    //   store,
    });
    inputWrapper = wrapper.find('input')
  });
  it('OrderInfoが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
//   it('dataが存在する', async() => {
//       await wrapper.setData({ name: 'fuji'})
//       const orders = wrapper.find('#name');
//       expect(orders.exists()).toBe('fuji')
//   })
//   it('OrderSubmit()が発火されている', () => {
//     //   inputWrapper.get('[data-testid="inputCredit"]').trigger('click')
//     // inputWrapper.get('input').trigger('click');
//     wrapper.get('[data-testid="show_cartItems"]').trigger('click');
//   });
});
