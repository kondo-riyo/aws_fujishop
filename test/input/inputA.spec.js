import { shallowMount } from '@vue/test-utils';
import inputA from '../../components/atoms/input/inputA.vue';

// test('Testing inputA component', () => {
//     const wrapper = mount(inputA, {
//         props:{
//             value: 'Hello',
//         }
//     })
//     expect(wrapper.props()).toBe('Hello')
// })

describe('Testing disapleButton component', () => {
    const wrapper = mount(inputA)
    it('inputAが存在する', () => {
      expect(wrapper.exists()).toBeTruthy()
    })

//     it('$emit Test', () => {
//         const wrapper = shallowMount(inputA)
//         //ボタンをクリック
//         wrapper.find('input').trigger('click')
//         //カスタムイベントを取得
//         const emit = wrapper.emitted()
//         console.log(emit)

//         //inputイベントが発生しているか
//         expect(emit.input).toBeTruthy()

//     })
})

// describe('props', () => {
//     test('propsを受け取れること', () => {
//       const wrapper = shallowMount(inputA);
//       wrapper.setProps({
//         value: 'Hello',
//         // type: 'text',
//         // name: 'helloName',
//         // placeholder: 'Hi'
//       });
//       expect(wrapper.vm.$props.value).toBe('Hello');
//     //   expect(wrapper.vm.$props.type).toBe('text');
//     //   expect(wrapper.vm.$props.name).toBe('helloName');
//     //   expect(wrapper.vm.$props.placeholder).toBe('Hi');
//     });
//   });

// describe('props', () => {
//     test('requiredがtrueになっていること', () => {
//       const requiredProps = {
//         hoge: 'hogeだよ',
//       };
//       const wrapper = shallowMount(test, {
//         propsData: requiredProps,
//       });
//       expect(wrapper.vm.$options.props.hoge.required).toBe(true);
//     });
//   });

describe('イベント発動', () => {
    const wrapper = shallowMount(inputA);
    it('onInputメソッドが実行されること', () => {
      wrapper.vm.onInput();
      expect(wrapper.emitted()['input']).toBeTruthy();
    });
  });

