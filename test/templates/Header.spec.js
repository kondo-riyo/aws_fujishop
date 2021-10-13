import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex'
import Header from '../../components/templates/Header.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Testing Header component', () => {
  let store;
  let headerStoreMock;
  let wrapper;

//   const wrapper = shallowMount(Header);
//   const inputWrapper = wrapper.find('input');

beforeEach(()=> {
    //vuexstoreのMockを作成
    headerStoreMock = {
      namespaced: true,
      actions : {
        increment: jest.fn(),
      },
      getters : {
        count: () => 0,
      },
    }
    store = new Vuex.Store({
        modules: {
          count:headerStoreMock 
        }
    })
    // shallowMountだと子コンポーネントをスタブによって描画しなくなる(高速化)
    wrapper = shallowMount(Header, { store, localVue })
})

// it('renders the correct markup', () => {
//     expect(wrapper.html()).toContain('<span class="count">0</span>')
//   })

  it('Headerが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
//   it('inputイベントが発火する', async () => {
//     await wrapper.find('input').trigger('input');
//   });
});
