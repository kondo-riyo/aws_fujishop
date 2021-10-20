
import { mount, createLocalVue } from '@vue/test-utils';
import OrderInfo from '../../pages/OrderInfo.vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import { createStore } from '../../.nuxt/store';
import { initialiseStores } from '../../utils/store-accsessor.ts';
import VueMeta from 'vue-meta'
import { config } from '@vue/test-utils'

config.showDeprecationWarnings = false
const localVue = createLocalVue();
const router = new VueRouter();
localVue.use(VueRouter);
localVue.use(Vuex);
localVue.use(VueMeta, { keyName: 'head' })

// const ifFactory = (values = {}) => {
//   return mount(OrderInfo, {
//     data () {
//       return {
//         ...values
//       }
//     }
//   })
// }

describe('Testing OrderInfo component', () => {
  let wrapper;
  let inputWrapper;
  let UserStore;
  let CartStore;
  let AdminStore;
  let store;
  let confirmSpy;

  const ifFactory = (values = {}) => {
    return mount(OrderInfo, {
      stubs:['DeliverySelect','round-bottun','inputA'],
      data () {
        return {
          ...values
        }
      }
    })
  }    

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
      },
      actions: {
        updateOrderAct: fn
      }
    };
    AdminStore = {
      namespaced: true,
      actions: {
        addAdminAct: fn
      }
    }
    store = new Vuex.Store({
      modules: {
        user: UserStore,
        cart: CartStore,
        admin: AdminStore
      }
    })

    confirmSpy = jest.spyOn(window, 'confirm');
    confirmSpy.mockImplementation(jest.fn(() => true));
    
    wrapper = mount(OrderInfo, {
      localVue,
      router,
      store,
      stubs: stub2,
      data() {
        return{
          name: '',
          // selectPayment: true
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
  afterAll(() => confirmSpy.mockRestore());

  it('OrderInfoが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('headが表示されるか', () => {
    expect(wrapper.vm.$metaInfo.title).toBe('お届け先情報入力')
  });
  it('OrderSubmit()が発火されている', () => {
    // const ifWrapper = ifFactory({invalid: false})

    let buttonWrapper = wrapper.find('[data-testid="OrderSubmit"]');
    buttonWrapper.trigger('click')
    expect(buttonWrapper.trigger('OrderSubmit')).toBeTruthy();

    // expect(window.confirm).toBeCalled();
  });
  it('creditPay()が発火されている', () => {
    inputWrapper.get('input').trigger('click');
  });
  it('yubinbango()が発火されている', () => {
    let squbuttonWrapper = wrapper.find('[data-testid="yubinbango"]');
    squbuttonWrapper.vm.$emit('click')
    expect(squbuttonWrapper.trigger('yubinbango')).toBeTruthy();
  });
  it('inputName()が発火されている', () => {
    let inputAWrapper = wrapper.find('[data-testid="inputName"]');
    inputAWrapper.vm.$emit('input')
    expect(inputAWrapper.trigger('inputName')).toBeTruthy();
  });
  it('inputMail()が発火されている', () => {
    let inputAWrapper = wrapper.find('[data-testid="inputMail"]');
    inputAWrapper.vm.$emit('input')
    expect(inputAWrapper.trigger('inputMail')).toBeTruthy();
  });
  it('inputPostalcode()が発火されている', () => {
    let inputAWrapper = wrapper.find('[data-testid="inputPostalcode"]');
    inputAWrapper.vm.$emit('input')
    expect(inputAWrapper.trigger('inputPostalcode')).toBeTruthy();
  });
  it('inputAddress()が発火されている', () => {
    let inputAWrapper = wrapper.find('[data-testid="inputAddress"]');
    inputAWrapper.vm.$emit('input')
    expect(inputAWrapper.trigger('inputAddress')).toBeTruthy();
  });
  it('inputTel()が発火されている', () => {
    let inputAWrapper = wrapper.find('[data-testid="inputTel"]');
    inputAWrapper.vm.$emit('input')
    expect(inputAWrapper.trigger('inputTel')).toBeTruthy();
  });
  it('inputDeliveryDate()が発火されている', () => {
    let inputAWrapper = wrapper.find('[data-testid="inputDeliveryDate"]');
    inputAWrapper.vm.$emit('input')
    expect(inputAWrapper.trigger('inputDeliveryDate')).toBeTruthy();
  });
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
  it('v-if="selectPayment"がfalseかどうか', ()=> {
    // const ifWrapper = wrapper.find('#selectPayment')
    // expect(ifWrapper.exists()).toBe(false)
    const ifWrapper = ifFactory({selectPayment: true})
    // expect(ifWrapper.find('[data-testid="inputCreditCardNum"]').exists()).toBeTruthy()
    // inputWrapper.get('input').trigger('click');

    let inputWrapper = ifWrapper.find('[data-testid="inputCreditCardNum"]');
    inputWrapper.vm.$emit('input')
    expect(inputWrapper.trigger('inputCreditCardNum')).toBeTruthy();
  });

});


// npm run test /test/pages/OrderInfo.spec.js