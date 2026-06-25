<template>
  <section class="week-quiz-section">
    <div class="week-quiz-header">
      <span class="wq-icon">🗂️</span>
      <div>
        <h3>{{ weekLabel }} · 真题与习题汇总</h3>
        <p class="wq-desc">共 {{ quizzes.length }} 道题，涵盖本知识点模块的所有题型，点击展开解答</p>
      </div>
    </div>
    <div class="quiz-list">
      <QuizProblem v-for="q in quizzes" :key="q.id" :quiz="q" :badge="q.lessonNum + ' ' + q.lessonTitle" />
    </div>
  </section>
</template>

<script setup>
import QuizProblem from './QuizProblem.vue'

defineProps({
  quizzes: { type: Array, required: true },
  weekLabel: { type: String, default: '本周' }
})
</script>

<style scoped>
.week-quiz-section {
  margin: 32px 0 24px;
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  border-radius: 16px;
  padding: 24px;
  border: 2px solid #f59e0b;
}
.week-quiz-header {
  display: flex; align-items: center; gap: 16px;
  padding-bottom: 16px;
  border-bottom: 2px dashed #f59e0b;
  margin-bottom: 16px;
}
.wq-icon { font-size: 36px; }
.week-quiz-header h3 {
  margin: 0; font-size: 20px; color: #92400e;
}
.wq-desc { margin: 4px 0 0; font-size: 13px; color: #b45309; }
.quiz-list { display: flex; flex-direction: column; gap: 12px; }
</style>
