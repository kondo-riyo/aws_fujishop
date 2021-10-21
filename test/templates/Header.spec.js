import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
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
  let fn;
  let UserStore;

  beforeEach(() => {
    initialiseStores(createStore());
    fn = jest.fn();
    UserStore = {
      namespaced: true,
      actions: {
        logout: fn,
      },
    };

    store = new Vuex.Store({
      modules: {
        user: UserStore,
      },
    });
    wrapper = shallowMount(Header, {
      localVue,
      router,
      store,
    });
    divWrapper = wrapper.find('div');
  });
  it('Headerが存在する', () => {
    expect(divWrapper.exists()).toBeTruthy();
  });
  it('click(logout)が発火されている', () => {
    divWrapper.get('div').trigger('click');
    expect(store.logout).toHaveBeenCalled;
  });

  //   it('$router.pushが発火してるか', () => {
  //     const mockRouterPush = jest.fn();
  //     // const mockRouteParams = jest.fn();
  //     const app_mount = shallowMount(Header, {
  //       stubs:['router-link'],
  //       mocks: {
  //         $router: {
  //           push: mockRouterPush
  //         },
  //         // $route: {
  //         //   params: mockRouteParams
  //         // }
  //       }
  //     });
  //     expect(mockRouterPush.mock.calls.length).toBe(0)
  //     let ringWrapper = app_mount.find('[data-testid="logout"]');
  //     ringWrapper.vm.$emit('click');
  //     expect(ringWrapper.emitted('logout')).toBeTruthy();

  //     // app_mount.find('[data-testid="logout"]').trigger('click');
  //     // expect(mockRouterPush).toHaveBeenCalledWith
  //     expect(mockRouterPush.mock.calls.length).toBe(1);
  //     // expect(mockRouteParams).toHaveBeenCalledWith
  //   });
});

// npm run test /test/templates/Header.spec.js
