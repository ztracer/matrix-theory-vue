<template>
  <div class="preview-page">
    <!-- Navigation -->
    <nav class="preview-nav">
      <div class="nav-inner">
        <router-link to="/" class="nav-brand">
          <span class="brand-icon">🔮</span>
          <span>考前预测</span>
        </router-link>
        <div class="nav-links">
          <router-link to="/" class="nav-link">← 返回首页</router-link>
        </div>
        <button class="theme-toggle" @click="toggle" :aria-label="theme === 'dark' ? '切换亮色' : '切换暗色'">
          {{ theme === 'dark' ? '☀️' : '🌙' }}
        </button>
      </div>
    </nav>

    <!-- Header -->
    <header class="preview-header">
      <div class="container">
        <div class="header-content">
          <span class="preview-badge">🔮 EXAM PREDICTION · 第4周</span>
          <h1>考前预测</h1>
          <p class="subtitle">根据历年考点预测的期末考模拟题 — 共 {{ totalQuestions }} 道计算与证明题，覆盖全部 10 讲知识点</p>
          <p class="header-desc">
            这是一套用于考前收束的预测题清单：每讲精选一道高频综合题，围绕期末考试最容易出现的计算路线、证明模板与易错细节展开。
            建议先独立完成题目，再展开解答核对步骤，把它当作最后一轮模拟训练。
          </p>
        </div>
      </div>
    </header>

    <!-- Stats bar -->
    <section class="stats-bar">
      <div class="container">
        <div class="stats-inner">
          <div class="stat-item w1">
            <span class="stat-num">{{ weekQuestionCounts.w1 }}</span>
            <span class="stat-label">第1周 · 1–4讲</span>
          </div>
          <div class="stat-item w2">
            <span class="stat-num">{{ weekQuestionCounts.w2 }}</span>
            <span class="stat-label">第2周 · 5–7讲</span>
          </div>
          <div class="stat-item w3">
            <span class="stat-num">{{ weekQuestionCounts.w3 }}</span>
            <span class="stat-label">第3周 · 8–10讲</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Week sections -->
    <main class="container preview-main">
      <section v-for="group in weekGroups" :key="group.week" class="week-section">
        <div class="week-title-bar" :class="group.colorClass">
          <span class="week-icon">{{ group.icon }}</span>
          <div>
            <h2>{{ group.weekLabel }}</h2>
            <p class="week-count">{{ group.lessons.length }} 个知识点 · {{ group.totalQuestions }} 道预测题</p>
          </div>
        </div>

        <div class="question-grid">
          <article v-for="lesson in group.lessons" :key="lesson.id" class="prediction-card" :class="group.colorClass">
            <div class="lesson-ribbon">
              <div class="lesson-info">
                <span class="lesson-icon">{{ lesson.icon }}</span>
                <div>
                  <span class="lesson-num">第 {{ lesson.num }} 讲</span>
                  <h3>{{ lesson.title }}</h3>
                </div>
              </div>
              <span class="question-count">{{ lesson.questions.length }} 题</span>
            </div>

            <div class="prediction-body">
              <QuizProblem
                v-for="question in lesson.questions"
                :key="question.id"
                :quiz="question"
                :badge="question.source"
              />
            </div>
          </article>
        </div>
      </section>

      <!-- Empty state -->
      <div v-if="totalQuestions === 0" class="empty-state">
        <div class="empty-icon">📭</div>
        <h3>暂无预测题数据</h3>
        <p>预测题库正在建设中，请稍后再来</p>
      </div>
    </main>

    <!-- Footer -->
    <footer class="preview-footer">
      <div class="container">
        <router-link to="/" class="footer-btn">← 返回课程首页</router-link>
        <p class="footer-copy">© 2026 Matrix Theory Interactive Learning · 考前预测</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { load } from 'js-yaml'
import QuizProblem from '@/components/quiz/QuizProblem.vue'
import { lessonMeta } from '@/data/quizBank'
import { useKatex } from '@/composables/useKatex'
import { useTheme } from '@/composables/useTheme'

const { theme, toggle } = useTheme()
const { renderMath } = useKatex()

const yamlSources = import.meta.glob('../data/preview/*.yaml', {
  eager: true,
  query: '?raw',
  import: 'default'
})

const allQuestions = Object.values(yamlSources)
  .map((content) => load(content))
  .sort((a, b) => a.id.localeCompare(b.id))

const previewBank = allQuestions.reduce((bank, question) => {
  const lessonId = Number(question.lesson)
  if (!bank[lessonId]) bank[lessonId] = []
  bank[lessonId].push(question)
  return bank
}, {})

for (const key of Object.keys(previewBank)) {
  previewBank[key].sort((a, b) => a.id.localeCompare(b.id))
}

const weekConfig = {
  1: { colorClass: 'w1', weekLabel: '第1周 · 空间变换与标准形', icon: '🔷' },
  2: { colorClass: 'w2', weekLabel: '第2周 · 矩阵分解与广义逆', icon: '🔶' },
  3: { colorClass: 'w3', weekLabel: '第3周 · 应用专题与特征值估计', icon: '🔺' }
}

const targetLessons = computed(() => lessonMeta.filter((lesson) => lesson.id >= 1 && lesson.id <= 10))

const weekGroups = computed(() => {
  const groups = {}

  for (const meta of targetLessons.value) {
    if (!groups[meta.week]) {
      groups[meta.week] = {
        week: meta.week,
        ...weekConfig[meta.week],
        lessons: [],
        totalQuestions: 0
      }
    }

    const questions = (previewBank[meta.id] || []).map((question) => ({
      ...question,
      lessonId: meta.id,
      lessonTitle: meta.title,
      lessonNum: meta.num
    }))

    if (questions.length) {
      groups[meta.week].lessons.push({
        ...meta,
        questions
      })
      groups[meta.week].totalQuestions += questions.length
    }
  }

  return Object.values(groups).sort((a, b) => a.week - b.week)
})

const weekQuestionCounts = computed(() => ({
  w1: weekGroups.value.find((group) => group.week === 1)?.totalQuestions || 0,
  w2: weekGroups.value.find((group) => group.week === 2)?.totalQuestions || 0,
  w3: weekGroups.value.find((group) => group.week === 3)?.totalQuestions || 0
}))

const totalQuestions = computed(() => allQuestions.length)

onMounted(() => {
  setTimeout(renderMath, 100)
})
</script>

<style scoped>
/* ===== Nav ===== */
.preview-nav {
  position: sticky; top: 0; z-index: 100;
  background: color-mix(in srgb, var(--color-card) 94%, transparent);
  border-bottom: 1px solid var(--color-border);
  backdrop-filter: blur(12px);
}
.nav-inner {
  max-width: 1200px; margin: 0 auto;
  display: flex; align-items: center; gap: 24px;
  padding: 12px 24px;
}
.nav-brand {
  display: flex; align-items: center; gap: 8px;
  color: var(--color-primary); text-decoration: none; font-weight: 700; font-size: 16px;
}
.brand-icon { font-size: 20px; }
.nav-links { display: flex; gap: 12px; margin-left: auto; }
.nav-link {
  color: var(--color-secondary); text-decoration: none;
  padding: 7px 12px; border-radius: 8px; font-size: 14px;
  transition: background .18s ease, color .18s ease;
}
.nav-link:hover { background: var(--color-muted); color: var(--color-primary); }

.theme-toggle {
  background: none;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 15px;
  cursor: pointer;
  line-height: 1;
  transition: background .18s ease;
  margin-left: 8px;
}
.theme-toggle:hover { background: var(--color-muted); }

/* ===== Header ===== */
.preview-header {
  position: relative;
  overflow: hidden;
  padding: 64px 24px 46px;
  background:
    radial-gradient(circle at 82% 18%, color-mix(in srgb, var(--color-accent) 22%, transparent), transparent 28%),
    radial-gradient(circle at 10% 90%, color-mix(in srgb, var(--color-primary) 16%, transparent), transparent 34%),
    var(--color-card);
  border-bottom: 1px solid var(--color-border);
  text-align: left;
}
.preview-header::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: .35;
  background-image: linear-gradient(135deg, color-mix(in srgb, var(--color-border) 55%, transparent) 1px, transparent 1px);
  background-size: 34px 34px;
  mask-image: linear-gradient(90deg, transparent, black 18%, black 72%, transparent);
}
.header-content { position: relative; z-index: 1; max-width: 860px; margin: 0; }
.preview-badge {
  display: inline-block; padding: 7px 12px; border-radius: 8px;
  background: var(--color-background);
  color: var(--color-accent); font-size: 12px; font-weight: 700; margin-bottom: 20px;
  letter-spacing: .08em; border: 1px solid var(--color-border);
}
.preview-header h1 {
  font-size: clamp(34px, 6vw, 54px);
  color: var(--color-foreground); margin: 0 0 12px; font-weight: 800;
  letter-spacing: -0.04em;
}
.subtitle { color: var(--color-muted-foreground); font-size: 16px; margin: 0 0 12px; }
.header-desc { color: var(--color-muted-foreground); font-size: 14px; line-height: 1.75; max-width: 720px; margin: 0; }

/* ===== Stats bar ===== */
.stats-bar {
  padding: 24px 0;
  background: var(--color-background);
  border-bottom: 1px solid var(--color-border);
}
.stats-inner {
  display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;
}
.stat-item {
  position: relative;
  display: flex; flex-direction: column; align-items: center;
  padding: 16px 28px; border-radius: 14px;
  min-width: 172px;
  background: var(--color-card);
  border: 1px solid var(--color-border);
  box-shadow: 0 10px 30px color-mix(in srgb, var(--color-foreground) 7%, transparent);
}
.stat-item::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 3px;
  background: var(--color-brand);
  border-radius: 14px 14px 0 0;
}
.stat-num {
  font-size: 36px; font-weight: 800; line-height: 1; color: var(--color-primary);
}
.stat-label { font-size: 13px; color: var(--color-muted-foreground); margin-top: 6px; }

/* ===== Main content ===== */
.preview-main { padding: 34px 24px 64px; }
.week-section { margin-bottom: 42px; }

.week-title-bar {
  display: flex; align-items: center; gap: 16px;
  padding: 20px 24px; border-radius: 18px 18px 0 0;
  margin-bottom: 0;
  background: var(--color-brand);
  box-shadow: 0 18px 44px color-mix(in srgb, var(--color-brand) 18%, transparent);
}
.week-icon { font-size: 24px; opacity: .9; }
.week-title-bar h2 {
  margin: 0; font-size: 22px; color: var(--color-on-brand); font-weight: 800;
}
.week-count { margin: 4px 0 0; font-size: 13px; color: var(--color-on-brand-muted); }

.question-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
}
.prediction-card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-top: none;
  overflow: hidden;
}
.prediction-card:last-child { border-radius: 0 0 18px 18px; }
.lesson-ribbon {
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
  padding: 16px 24px;
  border-bottom: 1px solid var(--color-border);
  background:
    linear-gradient(90deg, color-mix(in srgb, var(--color-brand) 10%, transparent), transparent 55%),
    var(--color-card);
}
.lesson-info { display: flex; align-items: center; gap: 12px; min-width: 0; }
.lesson-icon { font-size: 22px; }
.lesson-num {
  display: inline-block; padding: 3px 10px;
  border-radius: 999px; font-weight: 800; font-size: 12px;
  color: var(--color-on-brand); margin-bottom: 5px;
  background: var(--color-brand);
}
.lesson-ribbon h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 800;
  color: var(--color-foreground);
}
.question-count {
  flex: 0 0 auto;
  font-size: 14px; font-weight: 700; padding: 5px 14px;
  border-radius: 999px;
  background: var(--color-muted); color: var(--color-secondary);
}
.prediction-body { padding: 16px; display: flex; flex-direction: column; gap: 12px; }
.prediction-body :deep(.quiz-card) { margin: 0; }

/* ===== Empty state ===== */
.empty-state { text-align: center; padding: 80px 24px; }
.empty-icon { font-size: 64px; margin-bottom: 20px; }
.empty-state h3 { font-size: 22px; color: var(--color-foreground); margin: 0 0 8px; }
.empty-state p { color: var(--color-muted-foreground); font-size: 15px; }

/* ===== Footer ===== */
.preview-footer {
  background: var(--color-brand); padding: 40px 24px; text-align: center;
}
.footer-btn {
  display: inline-block; padding: 12px 28px;
  background: var(--color-on-brand);
  color: var(--color-brand); border-radius: 10px; text-decoration: none;
  font-weight: 700; font-size: 15px; transition: all .18s ease;
}
.footer-btn:hover { transform: translateY(-1px); }
.footer-copy {
  font-size: 12px; color: var(--color-on-brand-muted); margin-top: 20px;
  border-top: 1px solid color-mix(in srgb, var(--color-on-brand) 18%, transparent); padding-top: 16px;
}

@media (max-width: 768px) {
  .nav-inner { padding: 10px 16px; gap: 12px; }
  .nav-link { font-size: 12px; min-height: 44px; padding: 10px 16px; }
  .preview-header { padding: 46px 18px 34px; }
  .stats-inner { flex-direction: column; gap: 10px; padding: 0 16px; }
  .stat-item { flex-direction: row; gap: 12px; justify-content: center; }
  .preview-main { padding: 26px 14px 52px; }
  .week-title-bar { padding: 18px; }
  .lesson-ribbon { flex-direction: column; gap: 10px; align-items: flex-start; padding: 16px; }
  .prediction-body { padding: 10px; }
}
</style>
