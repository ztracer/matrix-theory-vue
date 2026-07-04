import { nextTick, onMounted, watch } from 'vue'

// Shared KaTeX macros — single source of truth (E2: deduplicate)
export const katexMacros = {
  "\\R": "\\mathbb{R}",
  "\\C": "\\mathbb{C}",
  "\\diag": "\\operatorname{diag}",
  "\\rank": "\\operatorname{rank}",
  "\\Ker": "\\operatorname{Ker}",
  "\\Im": "\\operatorname{Im}",
  "\\tr": "\\operatorname{tr}",
  "\\det": "\\operatorname{det}",
  "\\sign": "\\operatorname{sign}",
  "\\T": "^\\mathsf{T}",
  "\\H": "^\\mathsf{H}"
}

// E1: CSS is loaded once on first KaTeX render (was eagerly imported in main.js)
let cssLoaded = false
async function ensureKatexCss() {
  if (cssLoaded) return
  if (!document.querySelector('#katex-css')) {
    const link = document.createElement('link')
    link.id = 'katex-css'
    link.rel = 'stylesheet'
    link.href = import.meta.env.BASE_URL + 'katex.min.css'
    // Wait for the stylesheet to actually load before rendering
    await new Promise((resolve) => {
      link.onload = resolve
      link.onerror = resolve  // don't block rendering on error
      document.head.appendChild(link)
    })
  }
  cssLoaded = true
}

// E2: shared element-scoped renderer (replaces duplicate logic in QuizProblem.vue)
export async function renderMathInElement(el) {
  if (!el) return
  await ensureKatexCss()
  const katex = (await import('katex')).default
  await nextTick()
  el.querySelectorAll('.formula-block, .formula-inline, [data-katex]').forEach(node => {
    if (node.dataset.katexRendered) return
    const isBlock = node.classList.contains('formula-block') || node.dataset.katex === 'block'
    try {
      katex.render(node.textContent.trim(), node, {
        throwOnError: false,
        displayMode: isBlock,
        macros: katexMacros
      })
      node.dataset.katexRendered = 'true'
    } catch (e) {
      console.warn('KaTeX render error:', e.message, node.textContent)
    }
  })
}

export function useKatex(renderTrigger) {
  // E1 + F5: async, dynamic katex import, nextTick + rAF timing
  const renderMath = async () => {
    await ensureKatexCss()
    const katex = (await import('katex')).default
    await nextTick()
    requestAnimationFrame(() => {
      document.querySelectorAll('.formula-block, .formula-inline, [data-katex]').forEach(el => {
        if (el.dataset.katexRendered) return
        const isBlock = el.classList.contains('formula-block') || el.dataset.katex === 'block'
        try {
          katex.render(el.textContent.trim(), el, {
            throwOnError: false,
            displayMode: isBlock,
            macros: katexMacros
          })
          el.dataset.katexRendered = 'true'
        } catch (e) {
          console.warn('KaTeX render error:', e.message, el.textContent)
        }
      })
    })
  }

  // F5: replace setTimeout(renderMath, 50) with nextTick + rAF
  onMounted(async () => {
    await nextTick()
    requestAnimationFrame(() => renderMath())
  })

  if (renderTrigger) {
    watch(renderTrigger, async () => {
      await nextTick()
      requestAnimationFrame(() => renderMath())
    }, { deep: true })
  }

  return { renderMath }
}
