import { shallowMount, createLocalVue } from '@vue/test-utils';
import cartTable from '../../components/templates/cart/cartTable.vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import { createStore } from '../../.nuxt/store';
import { initialiseStores, CartStore } from '../../utils/store-accsessor.ts';

const localVue = createLocalVue();
const router = new VueRouter();
localVue.use(VueRouter);
localVue.use(Vuex);

describe('Testing cartTable component', () => {
  let wrapper;
  let CartStore;
  let actions;

  beforeEach(() => {
    initialiseStores(createStore());

    actions = {
      deleteCartItemAct: jest.fn(),
      fetchitemInfoAct: jest.fn(),
    };
    CartStore = new Vuex.Store({
      modules: {
        items: {},
        toppings: {},
        user: {},
        cart: {
          namespaced: true,
          actions,
        },
        cart: {},
        apiItmes: {},
        admin: {},
      },
    });

    wrapper = shallowMount(cartTable, {
      propsData: {
        cartItemFromStore: {
          itemInfo:[]
        },
        routerName: '',
      },
      localVue,
      router,
      CartStore,
    });
  });
  it('cartTableが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  //  storeのモック化
});
