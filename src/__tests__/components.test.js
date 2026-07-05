import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Formula from '@/components/ui/Formula.vue'
import Section from '@/components/ui/Section.vue'
import Theorem from '@/components/ui/Theorem.vue'
import RichMath from '@/components/ui/RichMath.vue'

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

  it('RichMath keeps text separate from math fragments', () => {
    const wrapper = mount(RichMath, {
      props: {
        text: '设 x=(\\xi_1,\\xi_2)^T，\\textbf{坐标为 C^{-1}x。}'
      }
    })

    expect(wrapper.text()).toContain('设')
    expect(wrapper.text()).toContain('坐标为 C^{-1}x。')
    expect(wrapper.findAll('.formula-inline').length).toBeGreaterThan(0)
    expect(wrapper.find('.rich-math-strong').exists()).toBe(true)
    expect(wrapper.text()).not.toContain('\\textbf')
  })

  it('RichMath keeps multiline environments as one block formula', () => {
    const wrapper = mount(RichMath, {
      props: {
        text: '\\begin{aligned}\nA&=B\\\\\nC&=D\n\\end{aligned}'
      }
    })

    expect(wrapper.findAll('.formula-block')).toHaveLength(1)
    expect(wrapper.find('.formula-block').text()).toContain('\\begin{aligned}')
    expect(wrapper.find('.formula-block').text()).toContain('\\end{aligned}')
  })
})
