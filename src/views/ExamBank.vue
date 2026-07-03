<template>
  <div class="exam-page">
    <!-- Navigation -->
    <nav class="exam-nav">
      <div class="nav-inner">
        <router-link to="/" class="nav-brand">
          <span class="brand-icon">📐</span>
          <span>历年真题汇总</span>
        </router-link>
        <div class="nav-links">
          <router-link to="/" class="nav-link">← 返回首页</router-link>
        </div>
      </div>
    </nav>

    <!-- Header -->
    <header class="exam-header">
      <div class="container">
        <div class="header-content">
          <span class="exam-badge">📋 EXAM BANK · 第4周</span>
          <h1>历年真题汇总</h1>
          <p class="subtitle">Past Exam Questions by Topic — 按知识点分类，共 {{ totalQuizzes }} 道真题</p>
          <p class="header-desc">
            汇集 2021–2025 年期末考试真题与经典习题，按知识点模块分色归类。
            点击题目卡片展开详细解答，涵盖计算题与证明题全部题型。
          </p>
        </div>
      </div>
    </header>

    <!-- Stats bar -->
    <section class="stats-bar">
      <div class="container">
        <div class="stats-inner">
          <div class="stat-item w1">
            <span class="stat-num">{{ weekQuizzes['w1'] }}</span>
            <span class="stat-label">第1周 · 空间与标准形</span>
          </div>
          <div class="stat-item w2">
            <span class="stat-num">{{ weekQuizzes['w2'] }}</span>
            <span class="stat-label">第2周 · 分解与广义逆</span>
          </div>
          <div class="stat-item w3">
            <span class="stat-num">{{ weekQuizzes['w3'] }}</span>
            <span class="stat-label">第3周 · 应用与真题</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic sections -->
    <main class="container exam-main">
      <div v-for="group in topicGroups" :key="group.week" class="week-section">
        <div class="week-title-bar" :class="group.colorClass">
          <span class="week-icon">{{ group.week === 1 ? '🔷' : group.week === 2 ? '🔶' : '🔺' }}</span>
          <div>
            <h2>{{ group.weekLabel }}</h2>
            <p class="week-count">{{ group.lessons.length }} 个知识点 · {{ group.totalQuizzes }} 道题目</p>
          </div>
        </div>

        <div v-for="lesson in group.lessons" :key="lesson.id" class="topic-card" :class="group.colorClass">
          <div class="topic-header" :class="group.colorClass">
            <div class="topic-info">
              <span class="topic-icon">{{ lesson.icon }}</span>
              <div>
                <span class="topic-num">{{ lesson.num }}</span>
                <span class="topic-title">{{ lesson.title }}</span>
              </div>
            </div>
            <span class="topic-quiz-count">{{ lesson.quizzes.length }} 题</span>
          </div>
          <div class="topic-body">
            <QuizProblem
              v-for="q in lesson.quizzes"
              :key="q.id"
              :quiz="q"
              :badge="q.source"
            />
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="totalQuizzes === 0" class="empty-state">
        <div class="empty-icon">📭</div>
        <h3>暂无真题数据</h3>
        <p>题库正在建设中，请稍后再来</p>
      </div>
    </main>

    <!-- Footer -->
    <footer class="exam-footer">
      <div class="container">
        <router-link to="/" class="footer-btn">← 返回课程首页</router-link>
        <p class="footer-copy">© 2026 Matrix Theory Interactive Learning · 真题题库</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { quizBank, lessonMeta } from '../data/quizBank'
import QuizProblem from '../components/quiz/QuizProblem.vue'
import { useKatex } from '../composables/useKatex'

const { renderMath } = useKatex()
onMounted(() => { setTimeout(renderMath, 100) })

// Week color configuration
const weekConfig = {
  1: { colorClass: 'w1', weekLabel: '第1周 · 空间变换与标准形', icon: '🔷' },
  2: { colorClass: 'w2', weekLabel: '第2周 · 矩阵分解与广义逆', icon: '🔶' },
  3: { colorClass: 'w3', weekLabel: '第3周 · 应用专题与真题', icon: '🔺' }
}

// Group lessons by week, attach quizzes
const topicGroups = computed(() => {
  const groups = {}
  for (const meta of lessonMeta) {
    const week = meta.week
    if (!groups[week]) {
      groups[week] = {
        week,
        ...weekConfig[week],
        lessons: [],
        totalQuizzes: 0
      }
    }
    const quizzes = (quizBank[meta.id] || []).map(q => ({
      ...q,
      lessonId: meta.id,
      lessonTitle: meta.title,
      lessonNum: meta.num
    }))
    groups[week].lessons.push({
      ...meta,
      quizzes
    })
    groups[week].totalQuizzes += quizzes.length
  }
  return Object.values(groups).sort((a, b) => a.week - b.week)
})

// Quiz count by week for stats bar
const weekQuizzes = computed(() => {
  const result = { w1: 0, w2: 0, w3: 0 }
  for (const meta of lessonMeta) {
    const count = (quizBank[meta.id] || []).length
    if (meta.week === 1) result.w1 += count
    else if (meta.week === 2) result.w2 += count
    else if (meta.week === 3) result.w3 += count
  }
  return result
})

const totalQuizzes = computed(() => Object.values(quizBank).reduce((s, q) => s + q.length, 0))
</script>

<style scoped>
/* ===== Nav ===== */
.exam-nav {
  position: sticky; top: 0; z-index: 100;
  background: rgba(255,255,255,.94);
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

/* ===== Header ===== */
.exam-header {
  padding: 56px 24px 40px;
  background: var(--color-card);
  border-bottom: 1px solid var(--color-border);
  text-align: left;
}
.header-content { max-width: 820px; margin: 0; }
.exam-badge {
  display: inline-block; padding: 7px 12px; border-radius: 8px;
  background: var(--color-background);
  color: var(--color-accent); font-size: 12px; font-weight: 700; margin-bottom: 20px;
  letter-spacing: .08em; border: 1px solid var(--color-border);
}
.exam-header h1 {
  font-size: clamp(30px, 5vw, 44px);
  color: var(--color-foreground); margin: 0 0 12px; font-weight: 700;
}
.subtitle { color: var(--color-muted-foreground); font-size: 16px; margin: 0 0 12px; }
.header-desc { color: var(--color-muted-foreground); font-size: 14px; line-height: 1.75; max-width: 680px; margin: 0; }

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
  display: flex; flex-direction: column; align-items: center;
  padding: 16px 28px; border-radius: 12px;
  min-width: 160px;
  background: var(--color-card);
  border: 1px solid var(--color-border);
}
.stat-num {
  font-size: 36px; font-weight: 700; line-height: 1;
}
.stat-item.w1 .stat-num, .stat-item.w2 .stat-num, .stat-item.w3 .stat-num { color: var(--color-primary); }
.stat-label { font-size: 13px; color: var(--color-muted-foreground); margin-top: 6px; }

/* ===== Main content ===== */
.exam-main { padding: 32px 24px 60px; }

.week-section { margin-bottom: 40px; }

.week-title-bar {
  display: flex; align-items: center; gap: 16px;
  padding: 20px 24px; border-radius: 16px 16px 0 0;
  margin-bottom: 0;
  background: var(--color-primary);
}
.week-icon { font-size: 24px; opacity: .85; }
.week-title-bar h2 {
  margin: 0; font-size: 22px; color: var(--color-on-primary); font-weight: 700;
}
.week-count { margin: 4px 0 0; font-size: 13px; color: #cbd5e1; }

.topic-card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-top: none;
  overflow: hidden;
}
.topic-card:last-of-type { border-radius: 0 0 16px 16px; margin-bottom: 24px; }

.topic-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid var(--color-border);
}
.topic-header.w1, .topic-header.w2, .topic-header.w3 { background: var(--color-card); }
.topic-info { display: flex; align-items: center; gap: 12px; }
.topic-icon { font-size: 22px; }
.topic-num {
  display: inline-block; padding: 3px 10px;
  border-radius: 8px; font-weight: 700; font-size: 12px;
  color: var(--color-on-primary); margin-right: 8px;
  background: var(--color-primary);
}
.topic-title { font-size: 16px; font-weight: 700; color: var(--color-foreground); }
.topic-quiz-count {
  font-size: 14px; font-weight: 600; padding: 4px 14px;
  border-radius: 8px;
}
.topic-header.w1 .topic-quiz-count, .topic-header.w2 .topic-quiz-count, .topic-header.w3 .topic-quiz-count { background: var(--color-muted); color: var(--color-secondary); }

.topic-body { padding: 16px; display: flex; flex-direction: column; gap: 12px; }

/* ===== Empty state ===== */
.empty-state {
  text-align: center; padding: 80px 24px;
}
.empty-icon { font-size: 64px; margin-bottom: 20px; }
.empty-state h3 { font-size: 22px; color: var(--color-foreground); margin: 0 0 8px; }
.empty-state p { color: var(--color-muted-foreground); font-size: 15px; }

/* ===== Footer ===== */
.exam-footer {
  background: var(--color-primary); padding: 40px 24px; text-align: center;
}
.footer-btn {
  display: inline-block; padding: 12px 28px;
  background: var(--color-on-primary);
  color: var(--color-primary); border-radius: 10px; text-decoration: none;
  font-weight: 700; font-size: 15px; transition: all .18s ease;
}
.footer-btn:hover { transform: translateY(-1px); }
.footer-copy {
  font-size: 12px; color: #94a3b8; margin-top: 20px;
  border-top: 1px solid rgba(255,255,255,.1); padding-top: 16px;
}

@media (max-width: 768px) {
  .nav-inner { padding: 10px 16px; }
  .nav-link { font-size: 12px; min-height: 44px; padding: 10px 16px; }
  .stats-inner { flex-direction: column; gap: 10px; }
  .stat-item { flex-direction: row; gap: 12px; justify-content: center; }
  .topic-header { flex-direction: column; gap: 8px; align-items: flex-start; }
  .topic-body { padding: 10px; }
}
</style>
