<template>
  <div class="quiz-card" ref="rootEl">
    <div class="quiz-header">
      <span class="quiz-badge">{{ badge || '📝 题目' }}</span>
      <span class="quiz-source" v-if="quiz.source">{{ quiz.source }}</span>
      <span class="quiz-id" v-if="quiz.id">#{{ quiz.id }}</span>
    </div>
    <div class="quiz-problem">
      <strong>【题目】</strong>
      <span class="formula-inline">{{ quiz.problem || quiz.question }}</span>
      <div class="quiz-options" v-if="quiz.options">
        <div class="quiz-option" v-for="(opt, idx) in quiz.options" :key="idx" :class="{ correct: show && idx === quiz.answer }">
          <span class="option-label">{{ String.fromCharCode(65 + idx) }}.</span>
          <span class="formula-inline">{{ opt }}</span>
        </div>
      </div>
    </div>
    <button class="quiz-toggle" @click="show=!show" v-if="quiz.steps || quiz.explanation">
      <span class="toggle-icon">{{ show ? '▼' : '▶' }}</span>
      {{ show ? '收起解答' : '点击查看详细解答' }}
    </button>
    <transition name="slide">
      <div class="quiz-solution" v-if="show">
        <div v-for="(step, i) in quiz.steps" :key="i" class="solution-step">
          <div class="step-num-circle">{{ i + 1 }}</div>
          <div class="step-body">
            <div class="step-title"><span class="formula-inline">{{ step.title }}</span></div>
            <div class="step-content">
              <span class="formula-inline">{{ step.content }}</span>
            </div>
          </div>
        </div>
        <div v-if="!quiz.steps && quiz.explanation" class="solution-step">
          <div class="step-num-circle">1</div>
          <div class="step-body">
            <div class="step-title">解答</div>
            <div class="step-content">
              <span class="formula-inline">{{ quiz.explanation }}</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import katex from 'katex'

const props = defineProps({
  quiz: { type: Object, required: true },
  badge: { type: String, default: '📝 题目' },
  defaultOpen: { type: Boolean, default: false }
})

const show = ref(props.defaultOpen)
const rootEl = ref(null)

function renderMathIn(el) {
  if (!el) return
  nextTick(() => {
    el.querySelectorAll('.formula-block, .formula-inline, [data-katex]').forEach(node => {
      if (node.dataset.katexRendered) return
      const isBlock = node.classList.contains('formula-block') || node.dataset.katex === 'block'
      try {
        katex.render(node.textContent.trim(), node, {
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
        node.dataset.katexRendered = 'true'
      } catch (e) {
        console.warn('KaTeX render error:', e.message)
      }
    })
  })
}

onMounted(() => {
  setTimeout(() => renderMathIn(rootEl.value), 50)
})

watch(show, () => {
  setTimeout(() => renderMathIn(rootEl.value), 50)
})
</script>

<style scoped>
.quiz-card {
  margin: 16px 0;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  overflow: hidden;
  background: var(--color-card);
}
.quiz-header {
  display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
  padding: 12px 16px;
  background: var(--color-primary);
}
.quiz-badge {
  color: var(--color-on-primary); font-weight: 700; font-size: 13px;
  padding: 4px 0;
}
.quiz-source { color: #cbd5e1; font-size: 13px; }
.quiz-id { color: #94a3b8; font-size: 12px; margin-left: auto; }
.quiz-problem {
  padding: 14px 16px;
  font-size: 15px; line-height: 1.75; color: var(--color-secondary);
  overflow-x: auto;
}
.quiz-problem strong { color: var(--color-foreground); margin-right: 6px; }
.quiz-options {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 10px;
}
.quiz-option {
  padding: 6px 12px;
  background: var(--color-background);
  border-radius: 8px;
  border: 1px solid var(--color-border);
  font-size: 14px;
  color: var(--color-secondary);
  transition: all .18s ease;
}
.quiz-option.correct {
  background: var(--color-muted);
  border-color: var(--color-accent);
  color: var(--color-primary);
  font-weight: 600;
}
.option-label { font-weight: 700; margin-right: 8px; color: var(--color-foreground); }
.quiz-option.correct .option-label { color: var(--color-accent); }
.quiz-toggle {
  width: 100%;
  padding: 10px 16px;
  border: none;
  background: var(--color-background);
  border-top: 1px solid var(--color-border);
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  color: var(--color-accent);
  font-family: inherit;
  text-align: left;
  transition: background .2s;
}
.quiz-toggle:hover { background: var(--color-muted); }
.toggle-icon { margin-right: 6px; }
.quiz-solution {
  padding: 4px 16px 16px;
  font-size: 14px; line-height: 1.75; color: var(--color-secondary);
}
.solution-step {
  display: flex; gap: 12px;
  margin: 10px 0;
  padding: 12px 14px;
  background: var(--color-background);
  border-radius: 10px;
  border: 1px solid var(--color-border);
  overflow-x: auto;
}
.step-num-circle {
  min-width: 28px; height: 28px;
  background: var(--color-primary); color:var(--color-on-primary);
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 13px; flex-shrink: 0;
}
.step-body { flex: 1; min-width: 0; }
.step-title { font-weight: 700; color: var(--color-foreground); margin-bottom: 4px; }
.step-content { color: var(--color-secondary); overflow-x: auto; }
.slide-enter-active, .slide-leave-active { transition: all .2s ease; }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
