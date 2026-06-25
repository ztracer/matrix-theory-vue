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
        <p class="footer-copy">© 2025 Matrix Theory Interactive Learning · 真题题库</p>
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
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  box-shadow: 0 2px 12px rgba(0,0,0,.15);
}
.nav-inner {
  max-width: 1200px; margin: 0 auto;
  display: flex; align-items: center; gap: 24px;
  padding: 12px 24px;
}
.nav-brand {
  display: flex; align-items: center; gap: 8px;
  color: #fff; text-decoration: none; font-weight: 700; font-size: 16px;
}
.brand-icon { font-size: 20px; }
.nav-links { display: flex; gap: 12px; margin-left: auto; }
.nav-link {
  color: rgba(255,255,255,.9); text-decoration: none;
  padding: 6px 14px; border-radius: 6px; font-size: 14px;
  transition: background .2s;
}
.nav-link:hover { background: rgba(255,255,255,.2); color: #fff; }

/* ===== Header ===== */
.exam-header {
  padding: 56px 24px 40px;
  background: linear-gradient(135deg, #eef2ff 0%, #faf5ff 50%, #fef3c7 100%);
  text-align: center;
}
.header-content { max-width: 800px; margin: 0 auto; }
.exam-badge {
  display: inline-block; padding: 8px 24px; border-radius: 30px;
  background: linear-gradient(135deg, #4f46e5, #ec4899);
  color: #fff; font-size: 13px; font-weight: 700; margin-bottom: 20px;
  letter-spacing: 2px;
}
.exam-header h1 {
  font-size: clamp(30px, 5vw, 44px);
  color: #1e293b; margin: 0 0 12px; font-weight: 800;
}
.subtitle { color: #64748b; font-size: 16px; margin: 0 0 12px; }
.header-desc { color: #94a3b8; font-size: 14px; line-height: 1.8; max-width: 600px; margin: 0 auto; }

/* ===== Stats bar ===== */
.stats-bar {
  padding: 24px 0;
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
}
.stats-inner {
  display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;
}
.stat-item {
  display: flex; flex-direction: column; align-items: center;
  padding: 16px 28px; border-radius: 14px;
  min-width: 160px;
}
.stat-item.w1 { background: linear-gradient(135deg, #eef2ff, #e0e7ff); }
.stat-item.w2 { background: linear-gradient(135deg, #f0fdfa, #ccfbf1); }
.stat-item.w3 { background: linear-gradient(135deg, #fff7ed, #ffedd5); }
.stat-num {
  font-size: 36px; font-weight: 800; line-height: 1;
}
.stat-item.w1 .stat-num { color: #4338ca; }
.stat-item.w2 .stat-num { color: #0d9488; }
.stat-item.w3 .stat-num { color: #ea580c; }
.stat-label { font-size: 13px; color: #64748b; margin-top: 6px; }

/* ===== Main content ===== */
.exam-main { padding: 32px 24px 60px; }

.week-section { margin-bottom: 40px; }

.week-title-bar {
  display: flex; align-items: center; gap: 16px;
  padding: 20px 24px; border-radius: 16px 16px 0 0;
  margin-bottom: 0;
}
.week-title-bar.w1 { background: linear-gradient(135deg, #4338ca, #6366f1); }
.week-title-bar.w2 { background: linear-gradient(135deg, #0d9488, #14b8a6); }
.week-title-bar.w3 { background: linear-gradient(135deg, #ea580c, #f97316); }
.week-icon { font-size: 32px; }
.week-title-bar h2 {
  margin: 0; font-size: 22px; color: #fff; font-weight: 700;
}
.week-count { margin: 4px 0 0; font-size: 13px; color: rgba(255,255,255,.8); }

.topic-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-top: none;
  overflow: hidden;
}
.topic-card:last-of-type { border-radius: 0 0 16px 16px; margin-bottom: 24px; }

.topic-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 2px solid #f1f5f9;
}
.topic-header.w1 { background: #fafbff; }
.topic-header.w2 { background: #f8fdfb; }
.topic-header.w3 { background: #fffbf8; }
.topic-info { display: flex; align-items: center; gap: 12px; }
.topic-icon { font-size: 22px; }
.topic-num {
  display: inline-block; padding: 3px 10px;
  border-radius: 16px; font-weight: 700; font-size: 12px;
  color: #fff; margin-right: 8px;
}
.topic-header.w1 .topic-num { background: linear-gradient(135deg, #4338ca, #6366f1); }
.topic-header.w2 .topic-num { background: linear-gradient(135deg, #0d9488, #14b8a6); }
.topic-header.w3 .topic-num { background: linear-gradient(135deg, #ea580c, #f97316); }
.topic-title { font-size: 16px; font-weight: 600; color: #1e293b; }
.topic-quiz-count {
  font-size: 14px; font-weight: 600; padding: 4px 14px;
  border-radius: 20px;
}
.topic-header.w1 .topic-quiz-count { background: #eef2ff; color: #4338ca; }
.topic-header.w2 .topic-quiz-count { background: #f0fdfa; color: #0d9488; }
.topic-header.w3 .topic-quiz-count { background: #fff7ed; color: #ea580c; }

.topic-body { padding: 16px; display: flex; flex-direction: column; gap: 12px; }

/* ===== Empty state ===== */
.empty-state {
  text-align: center; padding: 80px 24px;
}
.empty-icon { font-size: 64px; margin-bottom: 20px; }
.empty-state h3 { font-size: 22px; color: #1e293b; margin: 0 0 8px; }
.empty-state p { color: #94a3b8; font-size: 15px; }

/* ===== Footer ===== */
.exam-footer {
  background: #1e1b4b; padding: 40px 24px; text-align: center;
}
.footer-btn {
  display: inline-block; padding: 12px 28px;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: #fff; border-radius: 10px; text-decoration: none;
  font-weight: 600; font-size: 15px; transition: all .2s;
}
.footer-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(79,70,229,.4); }
.footer-copy {
  font-size: 12px; color: #64748b; margin-top: 20px;
  border-top: 1px solid rgba(255,255,255,.1); padding-top: 16px;
}

@media (max-width: 768px) {
  .nav-inner { padding: 10px 16px; }
  .nav-link { font-size: 12px; padding: 4px 10px; }
  .stats-inner { flex-direction: column; gap: 10px; }
  .stat-item { flex-direction: row; gap: 12px; justify-content: center; }
  .topic-header { flex-direction: column; gap: 8px; align-items: flex-start; }
  .topic-body { padding: 10px; }
}
</style>
