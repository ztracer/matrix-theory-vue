<template>
  <span ref="rootEl" class="rich-math">
    <template v-for="(part, idx) in parts" :key="idx">
      <br v-if="part.type === 'break'">
      <strong v-else-if="part.type === 'strong'" class="rich-math-strong">{{ part.text }}</strong>
      <span v-else-if="part.type === 'math'" :class="part.display ? 'formula-block' : 'formula-inline'">
        {{ part.text }}
      </span>
      <span v-else>{{ part.text }}</span>
    </template>
  </span>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { renderMathInElement } from '@/composables/useKatex'

const props = defineProps({
  text: { type: [String, Number], default: '' }
})

const rootEl = ref(null)

const cjkPattern = /[\u3400-\u9fff]/
const cjkOrPunctuationPattern = /[\u3400-\u9fff，。：；、！？（）《》“”]/u
const blockMathEnvironments = [
  'aligned',
  'cases',
  'pmatrix',
  'bmatrix',
  'Bmatrix',
  'vmatrix',
  'Vmatrix',
  'matrix'
]

function isDisplayMathLine(line) {
  const text = line.trim()
  if (!text) return false
  if (cjkPattern.test(text)) return false
  return /\\|[_^=]|\\sum|\\frac|\\det|\\lambda/.test(text)
}

function hasCompleteEnvironment(line) {
  for (const env of blockMathEnvironments) {
    const beginStr = '\\begin{' + env + '}'
    const endStr = '\\end{' + env + '}'
    const beginIdx = line.indexOf(beginStr)
    if (beginIdx !== -1) {
      const endIdx = line.indexOf(endStr, beginIdx)
      if (endIdx !== -1) return true
    }
  }
  return false
}

function splitLineWithEnvironments(line) {
  const segments = []
  let cursor = 0

  while (cursor < line.length) {
    let nextBegin = -1
    let nextEnv = null
    for (const env of blockMathEnvironments) {
      const idx = line.indexOf('\\begin{' + env + '}', cursor)
      if (idx !== -1 && (nextBegin === -1 || idx < nextBegin)) {
        nextBegin = idx
        nextEnv = env
      }
    }

    if (nextBegin === -1) {
      const remaining = line.slice(cursor)
      if (remaining.trim()) {
        segments.push(...splitMixedLine(remaining))
      }
      break
    }

    const endStr = '\\end{' + nextEnv + '}'
    const endIdx = line.indexOf(endStr, nextBegin)
    if (endIdx === -1) {
      const before = line.slice(cursor, nextBegin)
      if (before.trim()) {
        segments.push(...splitMixedLine(before))
      }
      segments.push(...splitMixedLine(line.slice(nextBegin, nextBegin + ('\\begin{' + nextEnv + '}').length)))
      cursor = nextBegin + ('\\begin{' + nextEnv + '}').length
      continue
    }

    if (nextBegin > cursor) {
      const before = line.slice(cursor, nextBegin)
      if (before.trim()) {
        segments.push(...splitMixedLine(before))
      }
    }

    const mathText = line.slice(nextBegin, endIdx + endStr.length)
    segments.push({ type: 'math', text: mathText, display: false })

    cursor = endIdx + endStr.length
  }

  return segments
}

function isMathSegment(segment) {
  const text = segment.trim()
  if (!text) return false
  if (/^[-–—,:;，。：；、！？()\[\]{}]+$/.test(text)) return false
  if (/\\/.test(text)) return true
  if (/[_^=+\/*<>]|[()[\]{}]/.test(text) && /[A-Za-z0-9α-ωΑ-Ωξξηηλ]/.test(text)) return true
  if (/^[A-Za-z](?:_\d+)?$/.test(text)) return true
  if (/^\d+(?:\.\d+)?$/.test(text)) return false
  return false
}

function splitMixedLine(line) {
  const parts = []
  let buffer = ''
  let mode = null

  for (let i = 0; i < line.length; i += 1) {
    const command = readLatexCommand(line, i)
    if (command) {
      if (mode && mode !== 'ascii' && buffer) {
        parts.push({ mode, text: buffer })
        buffer = ''
      }
      mode = 'ascii'
      buffer += command.text
      i = command.end
      continue
    }

    const char = line[i]
    const nextMode = cjkOrPunctuationPattern.test(char) ? 'text' : 'ascii'
    if (mode && nextMode !== mode) {
      parts.push({ mode, text: buffer })
      buffer = ''
    }
    mode = nextMode
    buffer += char
  }
  if (buffer) parts.push({ mode, text: buffer })

  return parts.map(part => {
    if (part.mode === 'ascii' && isMathSegment(part.text)) {
      return { type: 'math', text: part.text.trim(), display: false }
    }
    return { type: 'text', text: part.text }
  })
}

function parseText(value) {
  const output = []
  const raw = String(value ?? '')
  const lines = raw.split('\n')

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const line = lines[lineIndex]
    if (lineIndex > 0) output.push({ type: 'break' })
    if (!line.trim()) continue

    const environment = line.match(new RegExp(`\\\\begin\\{(${blockMathEnvironments.join('|')})\\}`))
    if (environment && !cjkPattern.test(line)) {
      const envName = environment[1]
      const collected = [line]
      while (lineIndex + 1 < lines.length && !lines[lineIndex].includes(`\\end{${envName}}`)) {
        lineIndex += 1
        collected.push(lines[lineIndex])
      }
      output.push({ type: 'math', text: collected.join('\n').trim(), display: true })
      continue
    }

    let cursor = 0
    while (cursor < line.length) {
      const start = line.indexOf('\\textbf{', cursor)
      if (start === -1) {
        output.push(...parseLineSegment(line.slice(cursor)))
        break
      }

      if (start > cursor) {
        output.push(...parseLineSegment(line.slice(cursor, start)))
      }

      const strong = readBraceContent(line, start + '\\textbf'.length)
      if (!strong) {
        output.push({ type: 'text', text: line.slice(start) })
        break
      }

      output.push({ type: 'strong', text: strong.content })
      cursor = strong.end + 1
    }
  }

  return output
}

function readBraceContent(text, openIndex) {
  if (text[openIndex] !== '{') return null
  let depth = 0
  let content = ''

  for (let i = openIndex; i < text.length; i += 1) {
    const char = text[i]
    if (char === '{') {
      if (depth > 0) content += char
      depth += 1
      continue
    }
    if (char === '}') {
      depth -= 1
      if (depth === 0) return { content, end: i }
      content += char
      continue
    }
    content += char
  }

  return null
}

function readLatexCommand(text, start) {
  if (text[start] !== '\\') return null
  const commandMatch = text.slice(start).match(/^\\[a-zA-Z]+/)
  if (!commandMatch) return null

  let cursor = start + commandMatch[0].length
  while (cursor < text.length && /\s/.test(text[cursor])) cursor += 1

  let end = cursor - 1
  let consumedBrace = false
  while (text[cursor] === '{') {
    const content = readBraceContent(text, cursor)
    if (!content) break
    cursor = content.end + 1
    end = content.end
    consumedBrace = true
    while (cursor < text.length && /\s/.test(text[cursor])) cursor += 1
  }

  if (!consumedBrace) return null
  return { text: text.slice(start, end + 1), end }
}

function parseLineSegment(line) {
  if (isDisplayMathLine(line)) {
    return [{ type: 'math', text: line.trim(), display: true }]
  }
  if (hasCompleteEnvironment(line)) {
    return splitLineWithEnvironments(line)
  }
  return splitMixedLine(line)
}

const parts = computed(() => parseText(props.text))

async function render() {
  await nextTick()
  await renderMathInElement(rootEl.value)
}

onMounted(render)
watch(parts, render)
</script>

<style scoped>
.rich-math {
  overflow-wrap: anywhere;
  max-width: 100%;
}

.rich-math-strong {
  color: var(--color-foreground);
  font-weight: 700;
}

.formula-block {
  max-width: 100%;
  overflow-x: auto !important;
  overflow-y: visible !important;
  -webkit-overflow-scrolling: touch;
}

.formula-inline {
  max-width: 100%;
  overflow-x: visible;
  overflow-y: visible;
}

.formula-inline {
  display: inline-block;
  vertical-align: middle;
}
</style>
