import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Home from '../../views/HomeView.vue'

// const MessageComponent = {
//   template: '<p>{{ msg }}</p>',
//   props: ['msg']
// }

describe('TaskAsignementForm', () => {
  it('renders properly', () => {
    // const wrapper = mount(MessageComponent, {
    //   props: {
    //     msg: 'Hello world'
    //   }
    // })
    // expect(wrapper.text()).toContain('Hello world')

    const wrapper = mount(Home)
    expect(wrapper.props()).toEqual({ task: { id: 0, label: 'test', startTime: new Date, endTime: new Date } })
  })
})
