import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskAsignementForm from '../TaskAsignementForm.vue'

// const MessageComponent = {
//   template: '<p>{{ msg }}</p>',
//   props: ['msg']
// }

describe('TaskAsignementForm', () => {
  console.log(TaskAsignementForm)
  it('renders properly', () => {
    // const wrapper = mount(MessageComponent, {
    //   props: {
    //     msg: 'Hello world'
    //   }
    // })
    // expect(wrapper.text()).toContain('Hello world')

    const wrapper = mount(TaskAsignementForm)
    expect(wrapper.props()).toEqual({ task: { id: 0, label: 'test', startTime: new Date, endTime: new Date } })
  })
})
