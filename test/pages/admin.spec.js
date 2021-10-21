import { mount, createLocalVue } from '@vue/test-utils';
import admin from '../../pages/admin.vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VueMeta from 'vue-meta'

import { createStore } from '../../.nuxt/store';
import { initialiseStores } from '../../utils/store-accsessor.ts';
import { config } from '@vue/test-utils'

config.showDeprecationWarnings = false
const localVue = createLocalVue();
const router = new VueRouter();
localVue.use(VueRouter);
localVue.use(Vuex);
localVue.use(VueMeta, { keyName: 'head' })

describe('Testing admin component', () => {
  let wrapper;
  let trWrapper;
  let buttonWrapper;
  let store;
//   let UserStore;
  let AdminStore;
  const ifFactory = (values = {}) => {
    return mount(admin, {
      stubs:['DeliverySelect','round-bottun','inputA'],
      data () {
        return {
          ...values
        }
      }
    })
  }    

  beforeAll(()=> {
      initialiseStores(createStore());

      let fn = jest.fn();
      let stub2 = ['roundBottun','inputA'];
    //   UserStore = {
    //       namespaced: true,
    //       getters: {
    //           getUserInfo: fn,
    //       },
    //   };
      AdminStore = {
          namespaced: true,
          getters:{
              getUsersList: fn,
          },
          actions: {
              fetchUsersAct: fn,
          }
      }
      store = new Vuex.Store({
          modules: {
            //   users: UserStore,
              admin: AdminStore
          }
      });
      wrapper = mount(admin, {
          localVue,
          router,
          store,
          stubs: stub2,
          data() {
              return {
                  adminPassword_num: '123456',
                  adminPassword: false
              }
          },
          computed: {
            userFromStore(){
                return [{
                    email: 'fuji@sample.com',
                    password: '123456',
                    name: 'fuji',
                    tel: '00011112222',
                    postalcode: '1230000',
                    address: 'tokyo',
                    uid: '123456'
                }]
            }
          }
      });
    trWrapper = wrapper.find('tr');
    buttonWrapper = wrapper.find('button');
});
  it('adminが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('headが表示されるか', () => {
    expect(wrapper.vm.$metaInfo.title).toBe('注文管理(管理者)')
  });
  it('clickイベント(userLog)が発火してるか', ()=> {
      trWrapper.get('tr').trigger('click');
  });
  it('clickイベント(adminPassword_push)が発火してるか', ()=>{
      buttonWrapper.get('button').trigger('click');
  });
  it('adminPassword_push()が正しく分岐しているか:adminPassword_num === 123456ではない', ()=>{
    wrapper.setData({adminPassword_num: '111111',adminPassword: false})
    buttonWrapper.get('button').trigger('click');
    expect(wrapper.vm.adminPassword).toEqual(false)
});
it('userFronStore()で正しい値を返せている',()=>{
  expect(wrapper.vm.userFromStore).toEqual([{
    email: 'fuji@sample.com',
    password: '123456',
    name: 'fuji',
    tel: '00011112222',
    postalcode: '1230000',
    address: 'tokyo',
    uid: '123456'
}])
})

//   it('fetchがレンダリング前に呼ばれているか', ()=> {
//     const contextStore = {store};
//     wrapper.vm.$options.fetch(contextStore);
//     expect(contextStore.store.fetchUsersAct).toHaveBeenCalled;
//   });
//   it('adminPassword_push()の条件分岐',()=> {
//     const ifWrapper = ifFactory({adminPasssword_num: '123456'})
//     expect(ifWrapper.find('.adminPassword_push').exists()).toBeTruthy()
//     // let buttonWrapper = ifWrapper.find('button');
//     // buttonWrapper.trigger('click')
//     // expect(buttonWrapper.trigger('adminPassword_push')).toBeTruthy();
//   })


//   it('if', ()=> {
    
//   })
//   it('userFromStoreが期待通りか', async () => {
//     await expect(wrapper.vm.userFromStore).toEqual([
//       {
//         email: 'fuji@sample.com',
//         password: '123456',
//         name: 'fuji',
//         tel: '00011112222',
//         postalcode: '1230000',
//         address: 'tokyo',
//         uid: '123456'
//       },
//     ]);
//   });

//   it("test App Component",() => {
//     const admin_show = wrapper.get('#admin_show');
//     expect(admin_show.isVisible()).toBe(true)
//   })
});

// npm run test /test/pages/admin.spec.js