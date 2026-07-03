import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Formula from '@/components/ui/Formula.vue'
import Section from '@/components/ui/Section.vue'
import Theorem from '@/components/ui/Theorem.vue'

describe('UI Components', () => {
  it('Formula mounts', () => {
    const wrapper = mount(Formula, {
      props: { display: false },
      slots: { default: 'x^2' }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('Section mounts', () => {
    const wrapper = mount(Section, {
      props: { num: '1', title: 'Test' },
      slots: { default: 'content' }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('Theorem mounts', () => {
    const wrapper = mount(Theorem, {
      props: { type: 'theorem', title: '定理' },
      slots: { default: 'content' }
    })
    expect(wrapper.exists()).toBe(true)
  })
})
