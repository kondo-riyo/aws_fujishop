import { shallowMount } from '@vue/test-utils';
import orderModal from '../../components/organisms/orderModal.vue';

describe('Testing orderModal component', () => {
  const wrapper = shallowMount(orderModal, {
    propsData: {
      orderInfo: {
        address: '東京',
        allPrice: 3240,
        creditCardNum: '',
        deliveryDate: '2021-10-28',
        deliveryTime: '17',
        email: 'check@co.jp',
        name: 'テストユーザ',
        payment: 1,
        postalcode: '0150041',
        selectPayment: false,
        tel: '12312341234',
      },
      status: 1,
    },
  });
  it('orderModalが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('selectタグで@changeが発火されている', () => {
    wrapper.find('button').trigger('click');
  });

  it('filter statusが1の時は未入金と表示する', () => {
    let modalWrapper = wrapper.get('[data-testid="paymentStatus"]');
    expect(modalWrapper.text()).toBe('未入金');
  });
  it('filter statusが2の時は入金済と表示する', () => {
    const newWrapper = shallowMount(orderModal, {
      propsData: {
        orderInfo: {
          name: 'テストユーザ2',
        },
        status: 2,
      },
    });
    let modalWrapper = newWrapper.get('[data-testid="paymentStatus"]');
    expect(modalWrapper.text()).toBe('入金済み');
  });
  it('filter statusが９の時はキャンセル済と表示する', () => {
    const newWrapper = shallowMount(orderModal, {
      propsData: {
        orderInfo: {
          name: 'テストユーザ3',
        },
        status: 9,
      },
    });
    let modalWrapper = newWrapper.get('[data-testid="paymentStatus"]');
    expect(modalWrapper.text()).toBe('キャンセル済み');
  });
});
