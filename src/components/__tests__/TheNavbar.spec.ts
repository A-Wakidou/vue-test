import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TheNavbar from '../TheNavbar.vue'

describe('TheNavbar', () => {
  it('renders properly', () => {
    const wrapper = mount(TheNavbar)
    expect(wrapper).toMatchSnapshot()
  })
})
