import { shallowMount, createLocalVue } from '@vue/test-utils';
import searchFujiItems from '../../pages/searchFujiItems.vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VueMeta from 'vue-meta';

import { createStore } from '../../.nuxt/store';
import { initialiseStores } from '../../utils/store-accsessor.ts';

const localVue = createLocalVue();
const router = new VueRouter();
localVue.use(VueRouter);
localVue.use(Vuex);
localVue.use(VueMeta, { keyName: 'head' });
describe('Testing searchFujiItems component', () => {
  let wrapper;
  let store;
  let ItemsStore;

  beforeAll(() => {
    initialiseStores(createStore());

    let fn = jest.fn();
    ItemsStore = {
      namespaced: true,
      getters: {
        getItems: fn,
      },
    };

    store = new Vuex.Store({
      modules: {
        items: ItemsStore,
      },
    });
    wrapper = shallowMount(searchFujiItems, {
      localVue,
      router,
      store,
      data() {
        return {
          KeyWord: '',
          keywordNullFlg: false,
        };
      },
    });
  });
  it('searchFujiItemsが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('headが存在する', () => {
    expect(wrapper.vm.$metaInfo.title).toBe('FUJIオリジナル商品');
  });
  it('@searchItemsでイベント(search)が発火する', async () => {
    let cancelWrapper = wrapper.find('[data-testid="search"]');
    cancelWrapper.vm.$emit('searchItems');
    expect(cancelWrapper.trigger('search')).toBeTruthy();
  });
  it(' seaachが正しく動く：キーワード＝"" ', async () => {
    let cancelWrapper = wrapper.find('[data-testid="search"]');
    cancelWrapper.vm.$emit('searchItems');
    cancelWrapper.trigger('search')
   await expect(wrapper.vm.keywordNullFlg).toBe(false)
  });
  it(' seaachが正しく動く：キーワード＝"みかん" ', () => {
    const newWrapper = shallowMount(searchFujiItems, {
        localVue,
        router,
        store,
        data() {
          return {
            KeyWord: 'みかん',
            keywordNullFlg: false,
          };
        },
      });
      let cancelWrapper = newWrapper.find('[data-testid="search"]');
      cancelWrapper.vm.$emit('searchItems');
      cancelWrapper.trigger('search')
     expect(newWrapper.vm.keywordNullFlg).toBe(false)
      });
});
