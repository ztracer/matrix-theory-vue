<template>
  <LessonLayout lesson-id="12" title="课后作业" subtitle="Homework Assignments — All Chapters">
    <div class="homework-overview">
      <p>共 {{ totalCount }} 道课后作业，覆盖第1-10章。</p>
    </div>
    <div v-for="(hws, lessonId) in homeworkBank" :key="lessonId" class="lesson-group">
      <h2 class="lesson-title">{{ lessonTitles[lessonId] || '第'+lessonId+'章' }}</h2>
      <div class="lesson-accent" :class="'accent-w' + ((lessonId - 1) % 3 + 1)"></div>
      <div v-for="hw in hws" :key="hw.id" class="hw-item">
        <div class="hw-meta">
          <span class="hw-id">{{ hw.id }}</span>
          <span class="hw-source">{{ hw.source }}</span>
          <span v-for="tag in hw.knowledge" :key="tag" class="hw-tag">{{ tag }}</span>
        </div>
        <QuizProblem :quiz="hw" />
      </div>
    </div>
  </LessonLayout>
</template>

<script setup>
import { computed } from 'vue'
import LessonLayout from '../components/LessonLayout.vue'
import QuizProblem from '../components/quiz/QuizProblem.vue'
import { homeworkBank } from '../data/homeworkBank'
import { useKatex } from '../composables/useKatex'

useKatex()

const totalCount = computed(() => {
  return Object.values(homeworkBank).reduce((s, arr) => s + arr.length, 0)
})

const lessonTitles = {
  1: '第1章 线性空间与线性子空间',
  2: '第2章 线性变换及其矩阵',
  3: '第3章 对角化与Jordan标准形',
  4: '第4章 矩阵函数与微分方程',
  5: '第5章 三角分解与QR分解',
  6: '第6章 SVD奇异值分解',
  7: '第7章 满秩分解与MP逆',
  8: '第8章 投影矩阵与应用',
  9: '第9章 最小二乘与范数',
  10: '第10章 特征值估计',
}
</script>

<style scoped>
.homework-overview {
  text-align: center;
  padding: 20px;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #ecfdf5, #d1fae5);
  border-radius: 16px;
  border: 1px solid #a7f3d0;
}
.homework-overview p {
  font-size: 18px;
  font-weight: 700;
  color: #065f46;
  margin: 0;
}

.lesson-group {
  margin-bottom: 48px;
  background: var(--card);
  border-radius: 16px;
  border: 1px solid var(--border);
  padding: 28px 24px 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 16px rgba(0,0,0,.04);
}
.lesson-accent {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
}
.accent-w1 { background: linear-gradient(90deg, #4338ca, #6366f1); }
.accent-w2 { background: linear-gradient(90deg, #0d9488, #14b8a6); }
.accent-w3 { background: linear-gradient(90deg, #ea580c, #f97316); }

.lesson-title {
  font-size: 22px;
  font-weight: 800;
  color: var(--text);
  margin: 0 0 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--border);
}

.hw-item {
  margin-bottom: 28px;
}
.hw-item:last-child {
  margin-bottom: 0;
}

.hw-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 8px;
  padding: 6px 0;
}
.hw-id {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-light);
  background: var(--bg);
  padding: 3px 10px;
  border-radius: 6px;
  border: 1px solid var(--border);
  font-family: 'SF Mono', 'Fira Code', monospace;
}
.hw-source {
  font-size: 13px;
  color: var(--text-light);
  font-weight: 500;
}
.hw-tag {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  color: #fff;
  background: linear-gradient(135deg, #059669, #10b981);
}
</style>
