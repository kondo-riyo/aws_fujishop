import { shallowMount, createLocalVue } from '@vue/test-utils';
import cartTable from '../../components/templates/cart/cartTable.vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import { createStore } from '../../.nuxt/store';
import { initialiseStores } from '../../utils/store-accsessor.ts';
//import { CartStore } from '../store';

const localVue = createLocalVue();
const router = new VueRouter();
localVue.use(VueRouter);
localVue.use(Vuex);

describe('Testing cartTable component', () => {
  let wrapper;
  let store;
  let actions;
  let fn;
  let CartStore;
  let confirmSpy;
  beforeAll(() => {
    initialiseStores(createStore());
    fn = jest.fn();
    CartStore = {
      namespaced: true,
      actions: {
        deleteCartItemAct: fn,
        fetchitemInfoAct: fn,
      },
    };

    const itemInfo = () => {
      return { itemInfo: [{ itemName: 'name' }], status: 0 };
    };

    store = new Vuex.Store({
      modules: {
        cart: CartStore,
      },
    });
    confirmSpy = jest.spyOn(window, 'confirm');
    confirmSpy.mockImplementation(jest.fn(() => true));

    wrapper = shallowMount(cartTable, {
      propsData: {
        cartItemFromStore: { itemInfo: [{ itemName: 'name' }], status: 0 },
        routerName: '',
      },
      localVue,
      router,
      store,
      methods: {
        // toppingSize:jest.fn(el=> if(el==1){"多"})
      },
    });
  });
  //他のファイルにも[true]がリークするためテストの前後にモックと復元を行う
  afterAll(() => confirmSpy.mockRestore());

  it('cartTableが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('propsが受取れている', () => {
    expect(wrapper.vm.$props.cartItemFromStore.itemInfo[0].itemName).toBe(
      'name'
    );
    expect(wrapper.vm.$props.cartItemFromStore.status).toBe(0);
  });
  it('@clickでtoppingSizeが発火する', () => {
    wrapper.vm.toppingSize();
  });

  it('@clickでdeleteCartItemが発火する', () => {
    wrapper.get('[data-testid="show_cartItems"]').trigger('click');
    // confirm('カートから商品を削除しますか？')が呼ばれるか
    expect(window.confirm).toBeCalled();
  });
});
