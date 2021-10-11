import { mount } from '@vue/test-utils';
import roundButton from '../components/atoms/button/roundBottun.vue'

describe('Testing disapleButton component', () => {
    const wrapper = mount(roundButton)
    it('roundButtonが存在する', () => {
      expect(wrapper.exists()).toBeTruthy()
    })
    // it('clickイベントが発火する',()=>{
    //     const event = jest.fn()
    //      //find the button and trigger click event
    //      wrapper.find('button').trigger('click')
    //      expect(event).toBeCalled()
    // })
})
