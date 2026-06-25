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
            <div class="step-title">{{ step.title }}</div>
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
import { ref } from 'vue'
import { useKatex } from '../../composables/useKatex'

const props = defineProps({
  quiz: { type: Object, required: true },
  badge: { type: String, default: '📝 题目' },
  defaultOpen: { type: Boolean, default: false }
})

const show = ref(props.defaultOpen)
const rootEl = ref(null)

const { renderMath } = useKatex(show)
</script>

<style scoped>
.quiz-card {
  margin: 16px 0;
  border-radius: 12px;
  border: 2px solid #fbbf24;
  overflow: hidden;
  background: linear-gradient(135deg, #fffbeb, #fef3c7);
}
.quiz-header {
  display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
  padding: 10px 16px;
  background: linear-gradient(135deg, #f59e0b, #fbbf24);
}
.quiz-badge {
  color: #fff; font-weight: 700; font-size: 13px;
  padding: 4px 10px; background: rgba(255,255,255,.2); border-radius: 6px;
}
.quiz-source { color: rgba(255,255,255,.9); font-size: 13px; }
.quiz-id { color: rgba(255,255,255,.6); font-size: 12px; margin-left: auto; }
.quiz-problem {
  padding: 14px 16px;
  font-size: 15px; line-height: 1.9; color: #78350f;
  overflow-x: auto;
}
.quiz-problem strong { color: #92400e; margin-right: 6px; }
.quiz-options {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 10px;
}
.quiz-option {
  padding: 6px 12px;
  background: rgba(255,255,255,.5);
  border-radius: 8px;
  border: 1px solid rgba(245,158,11,.25);
  font-size: 14px;
  color: #78350f;
  transition: all .3s;
}
.quiz-option.correct {
  background: rgba(16,185,129,.12);
  border-color: #10b981;
  color: #065f46;
  font-weight: 600;
}
.option-label { font-weight: 700; margin-right: 8px; color: #92400e; }
.quiz-option.correct .option-label { color: #065f46; }
.quiz-toggle {
  width: 100%;
  padding: 10px 16px;
  border: none;
  background: rgba(245,158,11,.08);
  border-top: 1px dashed #fcd34d;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  color: #b45309;
  font-family: inherit;
  text-align: left;
  transition: background .2s;
}
.quiz-toggle:hover { background: rgba(245,158,11,.15); }
.toggle-icon { margin-right: 6px; }
.quiz-solution {
  padding: 4px 16px 16px;
  font-size: 14px; line-height: 1.8; color: #78350f;
}
.solution-step {
  display: flex; gap: 12px;
  margin: 10px 0;
  padding: 12px 14px;
  background: rgba(255,255,255,.7);
  border-radius: 10px;
  border-left: 3px solid #f59e0b;
  overflow-x: auto;
}
.step-num-circle {
  min-width: 28px; height: 28px;
  background: linear-gradient(135deg,#f59e0b,#fbbf24); color:#fff;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 13px; flex-shrink: 0;
}
.step-body { flex: 1; min-width: 0; }
.step-title { font-weight: 700; color: #92400e; margin-bottom: 4px; }
.step-content { color: #78350f; overflow-x: auto; }
.slide-enter-active, .slide-leave-active { transition: all .3s ease; }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
