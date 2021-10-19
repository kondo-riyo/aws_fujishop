import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import FujiItemId from '../../../pages/ItemDetail/_itemId.vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VueMeta from 'vue-meta';
import { createStore } from '../../../.nuxt/store';
import { initialiseStores } from '../../../utils/store-accsessor.ts';
import { config } from '@vue/test-utils';

config.showDeprecationWarnings = false;
const localVue = createLocalVue();
const router = new VueRouter();
localVue.use(VueRouter);
localVue.use(Vuex);
localVue.use(VueMeta, { keyName: 'head' });

describe('Testing pages/itemDetail/_itemid.vue component', () => {
  let wrapper;
  let divWrapper;
  let CartStore;
  let store;
  let squareBottunWrapper;
  let inputWrapper;
  let confirmSpy;
  let fn = jest.fn();
  initialiseStores(createStore());

  beforeAll(() => {
    CartStore = {
      namespaced: true,
      getters: {
        getOrderLog: fn,
      },
      actions: {
        addItemToCartAct: fn,
      },
    };
    let stub2 = ['squareBottun', 'Detail'];
    store = new Vuex.Store({
      modules: {
        cart: CartStore,
      },
    });
    wrapper = mount(FujiItemId, {
      localVue,
      router,
      store,
      stubs: stub2,
      computed: {
        getToppings() {
          return [
            {
              id: 1,
              name: 'アイス',
              priceL: 300,
              priceM: 200,
              isActiveM: false,
              isActiveL: false,
            },
            {
              id: 2,
              name: 'はちみつ',
              priceL: 300,
              priceM: 200,
              isActiveM: false,
              isActiveL: false,
            },
          ];
        },
      },
    });
    divWrapper = wrapper.find('div');
    squareBottunWrapper = wrapper.find('squarebottun-stub');
    inputWrapper = wrapper.find('input');
    confirmSpy = jest.spyOn(window, 'confirm');
    confirmSpy.mockImplementation(jest.fn(() => true));
  });
  it('itemId.vueが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('headが表示されるか', () => {
    expect(wrapper.vm.$metaInfo.title).toBe('商品詳細');
  });
  it('clickイベント(back_onStep)が発火されている', () => {
    divWrapper.get('div').trigger('click');
    expect(divWrapper.trigger('back_onStep')).toBeTruthy();
  });
  it('squareBottunのクリックイベント(addCart)が発火されている', () => {
    squareBottunWrapper.trigger('click');
    expect(store.addItemToCartAct).toHaveBeenCalled;
  });
  it('changeイベント(selectToppngSize)が発火', () => {
    const radioWrapper = wrapper.get('#cal-modalM');
    radioWrapper.trigger('change');
  });
  it('changeイベント(selectToppngSize)が発火', () => {
    const radioWrapper = wrapper.get('#cal-modalL');
    radioWrapper.trigger('change');
  });
  it('changeイベント(selectToppngSize)が発火', () => {
    const radioWrapper = wrapper.get('#cal-modalNone');
    radioWrapper.trigger('change');
  });
  it('created(getItemdetail)が発火する', () => {
    wrapper.setMethods({
      getItemDetail:jest.fn()
      })
      expect(wrapper.vm.getItemDetail).toBeCalled
  });
  it('calcTotalPriceが正しく表示される(分岐➀:itemdetailが存在する場合)', async () => {
    wrapper.setData({
      itemDetail: {
        price: 100,
        img: 'https://hdhdhdhdh',
        nama: 'もか',
        description: 'ですです',
      },
      selectedItemNum: 1,
      allToppingPrice: 200,
    });
    await expect(wrapper.vm.calcTotalPrice).toEqual(300);
  });
  it('calcTotalPriceが正しく表示される(分岐➁:itemdetailがundefinedの場合)', async () => {
    wrapper.setData({
      itemDetail: {},
      selectedItemNum: 1,
      allToppingPrice: 200,
    });
    await expect(wrapper.vm.calcTotalPrice).toEqual(0);
  });
  // it('computed(getToppings)が正しく表示される', () => {
  //   expect(wrapper.vm.getToppings).toEqual([
  //     {
  //       id: 1,
  //       name: 'アイス',
  //       priceL: 300,
  //       priceM: 200,
  //       isActiveM: false,
  //       isActiveL: false,
  //     },
  //     {
  //       id: 2,
  //       name: 'はちみつ',
  //       priceL: 300,
  //       priceM: 200,
  //       isActiveM: false,
  //       isActiveL: false,
  //     },
  //   ]);
  // });
});

// npm run test /test/pages/ItemDetail/itemId.spec.js
