<template>
  <div ref="rootEl" class="quiz-card">
    <div class="quiz-header">
      <span class="quiz-badge">{{ badge || '📝 题目' }}</span>
      <span v-if="quiz.source" class="quiz-source">{{ quiz.source }}</span>
      <span v-if="quiz.id" class="quiz-id">#{{ quiz.id }}</span>
    </div>
    <div class="quiz-problem">
      <strong>【题目】</strong>
      <span class="formula-inline">{{ quiz.problem || quiz.question }}</span>
      <div v-if="quiz.options" class="quiz-options">
        <div v-for="(opt, idx) in quiz.options" :key="idx" class="quiz-option" :class="{ correct: show && idx === quiz.answer }">
          <span class="option-label">{{ String.fromCharCode(65 + idx) }}.</span>
          <span class="formula-inline">{{ opt }}</span>
        </div>
      </div>
    </div>
    <button v-if="quiz.steps || quiz.explanation" class="quiz-toggle" @click="show=!show">
      <span class="toggle-icon">{{ show ? '▼' : '▶' }}</span>
      {{ show ? '收起解答' : '点击查看详细解答' }}
    </button>
    <transition name="slide">
      <div v-if="show" class="quiz-solution">
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
import { ref, onMounted, watch } from 'vue'
import { renderMathInElement } from '@/composables/useKatex.js'

const props = defineProps({
  quiz: { type: Object, required: true },
  badge: { type: String, default: '📝 题目' },
  defaultOpen: { type: Boolean, default: false }
})

const show = ref(props.defaultOpen)
const rootEl = ref(null)

onMounted(() => {
  renderMathInElement(rootEl.value)
})

watch(show, () => {
  renderMathInElement(rootEl.value)
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
