import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const home = readFileSync(resolve(root, 'src/views/Home.vue'), 'utf8')

function mediaBlock(source, maxWidth) {
  const start = source.indexOf(`@media (max-width:${maxWidth}px)`)
  expect(start).toBeGreaterThanOrEqual(0)

  const open = source.indexOf('{', start)
  let depth = 0
  for (let i = open; i < source.length; i += 1) {
    if (source[i] === '{') depth += 1
    if (source[i] === '}') depth -= 1
    if (depth === 0) return source.slice(open + 1, i)
  }
  throw new Error(`Unclosed media block: ${maxWidth}px`)
}

describe('Home learning path redesign', () => {
  it('uses a phase-based path map instead of the old timeline', () => {
    expect(home).toContain('class="path-map"')
    expect(home).toContain('class="path-phase reveal"')
    expect(home).toContain('const pathPhases = computed')
    expect(home).not.toContain('class="path-timeline"')
    expect(home).not.toContain('class="path-dot"')
  })

  it('adds learning feedback and lesson state to path nodes', () => {
    expect(home).toContain('outcome:')
    expect(home).toContain('token:')
    expect(home).toContain('isPathRead')
    expect(home).toContain('nextPathLesson')
    expect(home).toContain('信号：')
    expect(home).toContain('phase-check')
  })

  it('collapses the path map explicitly on mobile', () => {
    const mobile = mediaBlock(home, 768)
    expect(mobile).toMatch(/\.phase-lessons,[\s\S]*grid-template-columns:\s*1fr/)
    expect(mobile).toMatch(/\.path-node,[\s\S]*\.path-node:nth-child\(even\)[\s\S]*margin-top:\s*0/)
    expect(mobile).toMatch(/\.phase-lessons,[\s\S]*padding:\s*18px 18px 18px 34px/)
    expect(mobile).toMatch(/\.path-node\s*\{[\s\S]*padding:\s*14px/)
  })
})
