<template>
  <div class="lesson-page">
    <!-- Navigation -->
    <nav class="lesson-nav" :class="weekClass">
      <div class="nav-inner">
        <router-link to="/" class="nav-brand">
          <span class="brand-icon">📐</span>
          <span>{{ title }}</span>
        </router-link>
        <div class="nav-links">
          <router-link to="/" class="nav-link">← 返回首页</router-link>
          <router-link v-if="prevLesson" :to="prevLesson.path" class="nav-link">
            ← 上一课：{{ prevLesson.title }}
          </router-link>
          <router-link v-if="nextLesson" :to="nextLesson.path" class="nav-link">
            下一课：{{ nextLesson.title }} →
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Header -->
    <header class="lesson-header">
      <div class="container">
        <div class="header-content">
          <span class="week-badge" :class="weekClass">{{ weekLabel }}</span>
          <h1>{{ title }}</h1>
          <p class="subtitle">{{ subtitle }}</p>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container lesson-main">
      <slot></slot>
    </main>

    <!-- Footer Nav -->
    <footer class="lesson-footer">
      <div class="container">
        <div class="footer-nav">
          <router-link v-if="prevLesson" :to="prevLesson.path" class="footer-card prev">
            <span class="footer-label">← 上一课</span>
            <span class="footer-title">{{ prevLesson.title }}</span>
          </router-link>
          <router-link to="/" class="footer-card home">
            <span class="footer-label">🏠</span>
            <span class="footer-title">返回课程首页</span>
          </router-link>
          <router-link v-if="nextLesson" :to="nextLesson.path" class="footer-card next">
            <span class="footer-label">下一课 →</span>
            <span class="footer-title">{{ nextLesson.title }}</span>
          </router-link>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  lessonId: { type: Number, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' }
})

const lessons = [
  { id: 1, path: '/lesson/01', title: '线性空间与子空间' },
  { id: 2, path: '/lesson/02', title: '线性变换及其矩阵' },
  { id: 3, path: '/lesson/03', title: '对角化与Jordan标准形' },
  { id: 4, path: '/lesson/04', title: '矩阵函数与微分方程' },
  { id: 5, path: '/lesson/05', title: '三角分解与QR分解' },
  { id: 6, path: '/lesson/06', title: 'SVD奇异值分解' },
  { id: 7, path: '/lesson/07', title: '满秩分解与MP逆' },
  { id: 8, path: '/lesson/08', title: '投影矩阵与应用' },
  { id: 9, path: '/lesson/09', title: '最小二乘与范数' },
  { id: 10, path: '/lesson/10', title: '特征值估计' },
  { id: 11, path: '/lesson/11', title: '考前复习' },
  { id: 12, path: '/homework', title: '课后作业' }
]

const weekMap = {
  1: 'w1', 2: 'w1', 3: 'w1', 4: 'w1',
  5: 'w2', 6: 'w2', 7: 'w2',
  8: 'w3', 9: 'w3', 10: 'w3', 11: 'w3',
  12: 'w4'
}

const weekLabelMap = {
  w1: '第1周 · 空间变换与标准形',
  w2: '第2周 · 矩阵分解与广义逆',
  w3: '第3周 · 应用专题与真题',
  w4: '课后作业与真题'
}

const weekClass = computed(() => weekMap[props.lessonId] || 'w1')
const weekLabel = computed(() => weekLabelMap[weekClass.value])

const prevLesson = computed(() => {
  const idx = lessons.findIndex(l => l.id === props.lessonId)
  return idx > 0 ? lessons[idx - 1] : null
})

const nextLesson = computed(() => {
  const idx = lessons.findIndex(l => l.id === props.lessonId)
  return idx < lessons.length - 1 ? lessons[idx + 1] : null
})
</script>

<style scoped>
.lesson-page { min-height: 100vh; background: var(--color-background); padding-bottom: 40px; color: var(--color-foreground); }

.lesson-nav {
  position: sticky; top: 0; z-index: 100;
  background: rgba(255,255,255,.94);
  border-bottom: 1px solid var(--color-border);
  backdrop-filter: blur(12px);
}
.nav-inner {
  max-width: 1200px; margin: 0 auto;
  display: flex; align-items: center; gap: 24px;
  padding: 14px 24px;
}

.nav-brand {
  display: flex; align-items: center; gap: 8px;
  color: var(--color-primary); text-decoration: none; font-weight: 750; font-size: 16px;
}
.brand-icon { font-size: 18px; opacity: .72; }
.nav-brand span {
  max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.nav-links { display: flex; gap: 12px; margin-left: auto; flex-wrap: wrap; }
.nav-link {
  color: var(--color-secondary); text-decoration: none;
  padding: 7px 12px; border-radius: 8px; font-size: 14px;
  transition: background .18s ease, color .18s ease;
}
.nav-link:hover { background: var(--color-muted); color: var(--color-primary); }

.lesson-header {
  padding: 64px 24px 44px;
  background: var(--color-card);
  border-bottom: 1px solid var(--color-border);
  text-align: left;
}
.header-content { max-width: 900px; margin: 0; }
.week-badge {
  display: inline-block; padding: 7px 12px; border-radius: 8px;
  color: var(--color-accent); font-size: 12px; font-weight: 750; margin-bottom: 18px;
  border: 1px solid var(--color-border);
  background: var(--color-background);
  letter-spacing: .08em;
}

.lesson-header h1 {
  font-size: clamp(32px, 5vw, 48px);
  color: var(--color-foreground); margin: 0 0 12px;
  font-weight: 780;
}
.subtitle { color: var(--color-muted-foreground); font-size: 16px; margin: 0; max-width: 760px; }

.lesson-main { padding: 40px 24px; }

.lesson-footer {
  margin-top: 60px; padding: 24px;
}
.footer-nav {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 16px;
  max-width: 900px; margin: 0 auto;
}
.footer-card {
  display: block; padding: 20px 24px;
  background: var(--color-card); border: 1px solid var(--color-border); border-radius: 12px;
  text-decoration: none; color: var(--color-foreground);
  transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease;
}
.footer-card:hover {
  transform: translateY(-1px);
  border-color: #cbd5e1;
  box-shadow: 0 1px 3px rgba(0,0,0,.06);
}
.footer-card.prev { text-align: left; }
.footer-card.next { text-align: right; }
.footer-card.home { text-align: center; padding: 16px 24px; }
.footer-label {
  display: block; font-size: 12px; color: var(--color-muted-foreground);
  margin-bottom: 4px;
}
.footer-title { font-weight: 700; font-size: 15px; }

@media (max-width: 768px) {
  .nav-inner { flex-wrap: wrap; gap: 8px; padding: 10px 16px; }
  .nav-links { margin-left: 0; width: 100%; }
  .nav-link { font-size: 12px; padding: 4px 10px; }
  .footer-nav { grid-template-columns: 1fr; }
  .footer-card.prev, .footer-card.next, .footer-card.home { text-align: center; }
}
</style>
