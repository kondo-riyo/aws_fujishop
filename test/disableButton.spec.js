import { mount } from '@vue/test-utils';
import disableButton from '../components/atoms/button/disableButton.vue'

describe('Testing disapleButton component', () => {
    it('disableButtonが存在する', () => {
      const wrapper = mount(disableButton)
      expect(wrapper.exists()).toBeTruthy()
    })
})

//slotにコンテンツが挿入できてることもtest