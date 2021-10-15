import { shallowMount, createLocalVue } from '@vue/test-utils';
import admin from '../../pages/admin.vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VueMeta from 'vue-meta'

import { createStore } from '../../.nuxt/store';
import { initialiseStores } from '../../utils/store-accsessor.ts';
// import { UserStore } from '~/store';

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
  let UserStore;
//   let divWrapper;
  beforeAll(()=> {
      initialiseStores(createStore());

      let fn = jest.fn();
      UserStore = {
          namespaced: true,
          getters: {
              getUsers: fn,
          },
        //   actions: {
        //   }
      };
      store = new Vuex.Store({
          modules: {
              users: UserStore,
          }
      });
      wrapper = shallowMount(admin, {
          localVue,
          router,
          store,
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
                // UserStore.getUserInfo
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
  })
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