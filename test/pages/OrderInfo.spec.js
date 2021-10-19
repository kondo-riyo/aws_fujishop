
import { mount, createLocalVue } from '@vue/test-utils';
import OrderInfo from '../../pages/OrderInfo.vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import { createStore } from '../../.nuxt/store';
import { initialiseStores } from '../../utils/store-accsessor.ts';
import VueMeta from 'vue-meta'

const localVue = createLocalVue();
const router = new VueRouter();
localVue.use(VueRouter);
localVue.use(Vuex);
localVue.use(VueMeta, { keyName: 'head' })

describe('Testing OrderInfo component', () => {
  let wrapper;
  let inputWrapper;
  let UserStore;
  let CartStore;
  let store;
//   let fn;
//   let CartStore;

  beforeAll(() => {
    initialiseStores(createStore());
    let fn = jest.fn();
    let stub2 = ['DeliverySelect','roundBottun','inputA'];
    UserStore = {
      namespaced: true,
      getters: {
        getUserInfo: fn
      }
    };
    CartStore = {
      namespaced: true,
      getters: {
        getitemInfo: fn
      }
    }
    store = new Vuex.Store({
      modules: {
        user: UserStore,
        cart: CartStore,
      }
    })
    wrapper = mount(OrderInfo, {
      localVue,
      router,
      store,
      stubs: stub2,
      data() {
        return{
          name: '',
                // email: 'fuji@sample.com',
                // postalcode: '1230000',
                // address: 'tokyo',
                // tel: '00011112222'
            }
      },
      computed: {
        userInfoFromStore() {
          return [{
            email: 'sample@sample.com',
            password: '12345',
            name: 'fuji',
            tel: '11122223333',
            postalcode: '1230000',
            address: 'tokyo',
            uid: 'asdf'    
          }]
        },
        itemInfoFromStore() {
          return {
            // orderInfo: { allPrice: 0 },
            orderId: '123456',
            itemInfo: [{ totalPrice: 400 }, { totalPrice: 400 }],
            status: '1',
          };
        },
        getAllPrice(){
          let allPrice = 0;
          //@ts-ignore
          this.itemInfoFromStore.itemInfo.forEach(item=>{
           allPrice = allPrice + item.totalPrice
          })
          return allPrice;
        },
      },

    });
    inputWrapper = wrapper.find('input')
  });
  it('OrderInfoが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('headが表示されるか', () => {
    expect(wrapper.vm.$metaInfo.title).toBe('お届け先情報入力')
  });
  it('OrderSubmit()が発火されている', () => {
      // inputWrapper.get('[data-testid="inputCredit"]').trigger('click')
    // inputWrapper.get('input').trigger('click');
    // wrapper.get('[data-testid="show_cartItems"]').trigger('click');
    let buttonWrapper = wrapper.find('[data-testid="OrderSubmit"]');
    buttonWrapper.trigger('click')
    expect(buttonWrapper.trigger('OrderSubmit')).toBeTruthy();
  });
  it('creditPay()が発火されている', () => {
    inputWrapper.get('input').trigger('click');
  });
  // it('yubinbango()が発火されている', () => {
  //   let squbuttonWrapper = wrapper.find('data-testid="yubinbango"');
  //   squbuttonWrapper.trigger('click')
  //   expect(squbuttonWrapper.trigger('yubinbango')).toBeTruthy();
  // });
  // it('inputName()が発火されている', () => {
  //   let squbuttonWrapper = wrapper.find('name="名前"');
  //   squbuttonWrapper.trigger('input')
  //   expect(squbuttonWrapper.trigger('inputName')).toBeTruthy();
  // });
  it('userInfoFromStoreが期待通りか', async () => {
    await expect(wrapper.vm.userInfoFromStore).toEqual([
      {
        email: 'sample@sample.com',
        password: '12345',
        name: 'fuji',
        tel: '11122223333',
        postalcode: '1230000',
        address: 'tokyo',
        uid: 'asdf'
        },
    ]);
  });
  it('getAllPriceが期待通りか', async () => {
    await expect(wrapper.vm.getAllPrice).toEqual(800);
  });
});


// npm run test /test/pages/OrderInfo.spec.js