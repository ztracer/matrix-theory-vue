import { nextTick, onMounted, watch } from 'vue'
import katex from 'katex'

export function useKatex(renderTrigger) {
  const renderMath = () => {
    nextTick(() => {
      document.querySelectorAll('.formula-block, .formula-inline, [data-katex]').forEach(el => {
        if (el.dataset.katexRendered) return
        const isBlock = el.classList.contains('formula-block') || el.dataset.katex === 'block'
        try {
          katex.render(el.textContent.trim(), el, {
            throwOnError: false,
            displayMode: isBlock,
            macros: {
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
          })
          el.dataset.katexRendered = 'true'
        } catch (e) {
          console.warn('KaTeX render error:', e.message, el.textContent)
        }
      })
    })
  }

  onMounted(() => {
    setTimeout(renderMath, 50)
  })

  if (renderTrigger) {
    watch(renderTrigger, () => {
      setTimeout(renderMath, 50)
    }, { deep: true })
  }

  return { renderMath }
}
