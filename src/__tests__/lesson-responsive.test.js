import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const lessonLayout = readFileSync(resolve(root, 'src/components/LessonLayout.vue'), 'utf8')
const globalCss = readFileSync(resolve(root, 'src/style.css'), 'utf8')

function mediaBlock(source, maxWidth) {
  const start = source.indexOf(`@media (max-width: ${maxWidth}px)`)
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

describe('Lesson responsive layout regression', () => {
  it('uses semantic classes for lesson nav links', () => {
    expect(lessonLayout).toContain('class="nav-link nav-home"')
    expect(lessonLayout).toContain('class="nav-link nav-prev"')
    expect(lessonLayout).toContain('class="nav-link nav-next"')
  })

  it('keeps lesson nav compact through tablet widths', () => {
    const compact = mediaBlock(lessonLayout, 1024)
    expect(compact).toMatch(/\.lesson-nav\s*\{[\s\S]*min-height:\s*59px/)
    expect(compact).toMatch(/\.nav-inner\s*\{[\s\S]*display:\s*grid/)
    expect(compact).toMatch(/\.nav-prev,\s*\n\s*\.nav-next\s*\{[\s\S]*display:\s*none/)
    expect(compact).toMatch(/\.lesson-header\s*\{[\s\S]*display:\s*none/)
  })

  it('constrains lesson body width before the mobile breakpoint', () => {
    const compact = mediaBlock(lessonLayout, 1024)
    expect(compact).toMatch(/\.lesson-content-wrap,\s*\n\s*\.lesson-main\s*\{[\s\S]*width:\s*100%/)
    expect(compact).toMatch(/\.lesson-content-wrap,\s*\n\s*\.lesson-main\s*\{[\s\S]*max-width:\s*100%/)
    expect(compact).toMatch(/\.lesson-main\s*\{[\s\S]*padding:\s*24px 24px 40px/)
  })

  it('inline formula should not overflow at tablet widths (parent container handles scrolling)', () => {
    const compact = mediaBlock(globalCss, 1024)
    expect(compact).toMatch(/scroll-padding-top:\s*64px/)
    expect(compact).toMatch(/\.lesson-main \.formula-inline\s*\{[\s\S]*display:\s*inline-block/)
    expect(compact).toMatch(/\.lesson-main \.formula-inline\s*\{[\s\S]*max-width:\s*100%/)
    expect(compact).not.toMatch(/\.lesson-main \.formula-inline\s*\{[\s\S]*overflow-x:\s*auto/)
  })
})
