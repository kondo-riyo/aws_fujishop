import { mount, createLocalVue } from '@vue/test-utils';
import RakuItemId from '../../../pages/RakutenItemDetail/_itemId.vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import { createStore } from '../../../.nuxt/store';
import { initialiseStores } from '../../../utils/store-accsessor.ts';

const localVue = createLocalVue();
const router = new VueRouter();
localVue.use(VueRouter);
localVue.use(Vuex);
// const $route = {
//   path: '/some/path'
// }
// const mockRouterPush = jest.fn();
// const mockRouteParams = jest.fn();

describe('Testing pages/RakutenItemDetail/_itemid.vue component', () => {
  let wrapper;
  let divWrapper;
  // let squareWrapper;
  let store;
  let ApiItemsStore;

  beforeAll(()=> {
      initialiseStores(createStore());
      let fn = jest.fn();
      // const mockRouterPush = jest.fn();
      // const mockRouteParams = jest.fn();
      ApiItemsStore = {
        namespaced: true,
        getters: {
          getItemDetail: fn,
        },
      };
      store = new Vuex.Store({
        modules: {
          apis: ApiItemsStore,
        }
      });
       
      let stub2 = ['squareBottun', 'Detail'];

      wrapper = mount(RakuItemId, {
          localVue,
          router,
          store,
          stubs: stub2,
          // mocks: {
          //   $route,
          // },
          // mocks: {
          //   $router: {
          //     push: mockRouterPush
          //   },
          //   $route: {
          //     params: mockRouteParams
          //   }
          // },
          data() {
            return {
                itemDetail: {id: 1, name:'コーヒー', price: 500, discription: '苦い', img: 'img', rank: 12},
                selectedItemNum: 1,
                params: 'asdf',
            }
          },
          // created() {
          //   this.params = this.$route.params.itemId;
          //   const getItemDetail =
          //     ApiItemsStore.getItemDetail(this.params);
          //   this.itemDetail = getItemDetail;
          // },
          computed: {
            calcTotalPrice() {
              if ( this.itemDetail == undefined || this.itemDetail.price == undefined) {
                return 0;
              }
                return this.selectedItemNum * this.itemDetail.price;
            },
          },
          // mocks: {
          //   $router: {
          //     push: mockRouterPush
          //   },
          //   $route: {
          //     params: mockRouteParams
          //   }
          // }
      })
      divWrapper = wrapper.find('div');
      // squareWrapper = wrapper.find('squareBottun')

  })

  it('itemId.vueが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('clickイベント(back_onStep)が発火されている', () => {
    divWrapper.get('div').trigger('click');
  });
  it('totalItemPriceが期待通りか', async () => {
    await expect(wrapper.vm.calcTotalPrice).toEqual(0);
  });
  it('$router.pushが発火してるか', () => {
    const mockRouterPush = jest.fn();
    const mockRouteParams = jest.fn();
    const app_mount = mount(RakuItemId, {
      mocks: {
        $router: {
          push: mockRouterPush
        },
        $route: {
          params: mockRouteParams
        }
      }
    });
    app_mount.find('div').trigger('click');
    expect(mockRouterPush).toHaveBeenCalledWith
    expect(mockRouteParams).toHaveBeenCalledWith
  });
  // it('addCart()が呼ばれているか', async()=> {
  //   const addCart = jest.fn();
  //   wrapper = mount(RakuItemId, {
  //     methods: { addCart }
  //   });
  //   await expect(addCart).toHaveBeenCalled();
  // })
  it('createdの発火', () =>{
    wrapper.setMethods({
      getItemDetail: jest.fn()
    })
    expect(wrapper.vm.getItemDetail).toBeCalled
  })

});

// npm run test /test/pages/RakutenItemDetail/itemId.spec.js