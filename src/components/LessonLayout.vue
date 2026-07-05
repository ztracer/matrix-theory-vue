<template>
  <div ref="pageEl" class="lesson-page">
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
        <button class="theme-toggle" @click="toggle" :aria-label="theme === 'dark' ? '切换亮色' : '切换暗色'">
          {{ theme === 'dark' ? '☀️' : '🌙' }}
        </button>
      </div>
      <!-- V1: reading progress bar -->
      <div class="reading-progress" :style="{ width: progressPercent + '%' }"></div>
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

    <!-- Main Content + TOC -->
    <div class="lesson-content-wrap">
      <main ref="contentEl" class="container lesson-main">
        <slot></slot>
      </main>

      <!-- V1: Table of Contents -->
      <aside v-if="tocItems.length" class="lesson-toc" :class="{ collapsed: tocCollapsed }">
        <button
          class="toc-toggle"
          @click="tocCollapsed = !tocCollapsed"
          :aria-expanded="!tocCollapsed"
        >
          <span class="toc-toggle-label">本课目录</span>
          <span class="toc-toggle-icon">{{ tocCollapsed ? '▶' : '▼' }}</span>
        </button>
        <nav class="toc-list" v-show="!tocCollapsed">
          <a
            v-for="item in tocItems"
            :key="item.id"
            :href="'#' + item.id"
            class="toc-item"
            :class="{ active: activeSection === item.id }"
            @click.prevent="scrollToSection(item.id)"
          >{{ item.text }}</a>
        </nav>
      </aside>
    </div>

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
import { computed, ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
// E3: derive lesson list from quizBank.js lessonMeta (single source of truth)
import { lessonMeta } from '@/data/quizBank'
import { useTheme } from '@/composables/useTheme'

const { theme, toggle } = useTheme()

const props = defineProps({
  lessonId: { type: Number, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' }
})

const router = useRouter()

// E3: build the lessons array used for prev/next navigation from lessonMeta.
// The homework route (id=12) is appended to match the previous hardcoded list.
const lessons = [
  ...lessonMeta.map(l => ({ id: l.id, path: l.path, title: l.title, week: l.week })),
  { id: 12, path: '/homework', title: '课后作业', week: 4 }
]

const weekMap = computed(() => {
  const m = {}
  for (const l of lessons) m[l.id] = 'w' + l.week
  return m
})

const weekLabelMap = {
  w1: '第1周 · 空间变换与标准形',
  w2: '第2周 · 矩阵分解与广义逆',
  w3: '第3周 · 应用专题与真题',
  w4: '课后作业与真题'
}

const weekClass = computed(() => weekMap.value[props.lessonId] || 'w1')
const weekLabel = computed(() => weekLabelMap[weekClass.value])

const prevLesson = computed(() => {
  const idx = lessons.findIndex(l => l.id === props.lessonId)
  return idx > 0 ? lessons[idx - 1] : null
})

const nextLesson = computed(() => {
  const idx = lessons.findIndex(l => l.id === props.lessonId)
  return idx < lessons.length - 1 ? lessons[idx + 1] : null
})

// ===== V1: Table of Contents + reading progress =====
const pageEl = ref(null)
const contentEl = ref(null)
const tocItems = ref([])
const activeSection = ref(null)
const progressPercent = ref(0)
const tocCollapsed = ref(false)

// Restore collapse preference
try {
  tocCollapsed.value = localStorage.getItem('matrix-toc-collapsed') === 'true'
} catch { /* ignore */ }

// Persist collapse state
watch(tocCollapsed, (val) => {
  try { localStorage.setItem('matrix-toc-collapsed', String(val)) } catch { /* ignore */ }
})

let observer = null

function collectToc() {
  if (!contentEl.value) return
  // Collect headings within the slotted lesson content
  const headings = contentEl.value.querySelectorAll('h2, [data-section]')
  const items = []
  headings.forEach((h, i) => {
    if (!h.id) h.id = 'lesson-section-' + i
    items.push({ id: h.id, text: h.textContent.trim() })
  })
  tocItems.value = items
}

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    activeSection.value = id
  }
}

function onScroll() {
  const doc = document.documentElement
  const scrollTop = window.scrollY || doc.scrollTop
  const scrollHeight = doc.scrollHeight - doc.clientHeight
  progressPercent.value = scrollHeight > 0 ? Math.min(100, (scrollTop / scrollHeight) * 100) : 0
}

function setupObserver() {
  if (!contentEl.value || tocItems.value.length === 0) return
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
          markLessonRead()
        }
      }
    },
    { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
  )
  tocItems.value.forEach(item => {
    const el = document.getElementById(item.id)
    if (el) observer.observe(el)
  })
}

// V2 (tie-in): mark lesson as read in localStorage when a section enters view
let readMarked = false
function markLessonRead() {
  if (readMarked) return
  readMarked = true
  try {
    const readKey = 'matrix-read-lessons'
    const read = JSON.parse(localStorage.getItem(readKey) || '[]')
    if (!read.includes(props.lessonId)) {
      read.push(props.lessonId)
      localStorage.setItem(readKey, JSON.stringify(read))
    }
  } catch (e) {
    // ignore storage errors
  }
}

// ===== V3: keyboard shortcuts =====
function handleKeydown(e) {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
  if (e.key === 'ArrowLeft' && prevLesson.value) router.push(prevLesson.value.path)
  if (e.key === 'ArrowRight' && nextLesson.value) router.push(nextLesson.value.path)
}

onMounted(async () => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', handleKeydown)
  await nextTick()
  collectToc()
  setupObserver()
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', handleKeydown)
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.lesson-page {
  min-height: 100vh;
  background: var(--color-background);
  padding-bottom: 40px;
  color: var(--color-foreground);
  overflow-x: clip;
}

.lesson-nav {
  position: sticky; top: 0; z-index: 100;
  background: color-mix(in srgb, var(--color-card) 94%, transparent);
  border-bottom: 1px solid var(--color-border);
  backdrop-filter: blur(12px);
}
.nav-inner {
  width: 100%;
  max-width: 1200px; margin: 0 auto;
  display: flex; align-items: center; gap: 24px;
  padding: 14px 24px;
  min-width: 0;
}

.nav-brand {
  display: flex; align-items: center; gap: 8px;
  color: var(--color-primary); text-decoration: none; font-weight: 700; font-size: 16px;
}
.brand-icon { font-size: 18px; opacity: .72; }
.nav-brand span {
  max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.nav-links { display: flex; gap: 12px; margin-left: auto; flex-wrap: wrap; min-width: 0; }
.nav-link {
  color: var(--color-secondary); text-decoration: none;
  padding: 7px 12px; border-radius: 8px; font-size: 14px;
  transition: background .18s ease, color .18s ease;
  overflow-wrap: anywhere;
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

/* V1: reading progress bar */
.reading-progress { position: absolute; bottom: 0; left: 0; height: 3px; background: var(--color-accent); transition: width .1s linear; }

.lesson-header {
  padding: 64px 24px 44px;
  background: var(--color-card);
  border-bottom: 1px solid var(--color-border);
  text-align: left;
}
.header-content { max-width: 900px; margin: 0; }
.week-badge {
  display: inline-block; padding: 7px 12px; border-radius: 8px;
  color: var(--color-accent); font-size: 12px; font-weight: 700; margin-bottom: 18px;
  border: 1px solid var(--color-border);
  background: var(--color-background);
  letter-spacing: .08em;
}

.lesson-header h1 {
  font-size: clamp(32px, 5vw, 48px);
  color: var(--color-foreground); margin: 0 0 12px;
  font-weight: 700;
}
.subtitle { color: var(--color-muted-foreground); font-size: 16px; margin: 0; max-width: 760px; }

.lesson-main { padding: 40px 24px; }

/* ===== V1: Table of Contents ===== */
.lesson-content-wrap {
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  min-width: 0;
}

.lesson-toc {
  width: calc(100% - 48px);
  min-width: 0;
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
  margin: 0 24px 32px;
}

.toc-toggle {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: var(--color-card);
  border: none;
  border-bottom: 1px solid var(--color-border);
  font-size: 12px;
  font-weight: 700;
  color: var(--color-foreground);
  cursor: pointer;
  letter-spacing: .06em;
  text-transform: uppercase;
}
.toc-toggle:hover { background: var(--color-muted); }
.toc-toggle-icon { font-size: 10px; opacity: .6; }

.lesson-toc.collapsed .toc-toggle {
  border-bottom: none;
}
.lesson-toc.collapsed {
  border-radius: 8px;
}

.toc-list {
  padding: 8px;
  max-height: calc(100vh - 240px);
  overflow-y: auto;
}

.toc-item {
  display: block;
  padding: 7px 10px;
  border-radius: 6px;
  color: var(--color-muted-foreground);
  text-decoration: none;
  font-size: 13px;
  line-height: 1.5;
  transition: background .18s ease, color .18s ease;
  cursor: pointer;
}
.toc-item:hover {
  background: var(--color-muted);
  color: var(--color-foreground);
}
.toc-item.active {
  background: var(--color-muted);
  color: var(--color-foreground);
  font-weight: 700;
}

/* Desktop: two-column grid with sticky TOC sidebar */
@media (min-width: 1280px) {
  .lesson-content-wrap {
    grid-template-columns: 1fr 200px;
    gap: 32px;
    padding: 0 24px;
    align-items: start;
  }
  .lesson-main { padding-left: 0; padding-right: 0; }
  .lesson-toc {
    position: sticky;
    top: 88px;
    max-height: calc(100vh - 120px);
    align-self: start;
    margin: 40px 0 0;
  }
}

.lesson-footer { margin-top: 60px; padding: 24px; }
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
  transition: transform .18s ease, border-color .18s ease;
  min-width: 0;
}
.footer-card:hover {
  transform: translateY(-1px);
  border-color: var(--color-muted-foreground);
}
.footer-card.prev { text-align: left; }
.footer-card.next { text-align: right; }
.footer-card.home { text-align: center; padding: 16px 24px; }
.footer-label {
  display: block; font-size: 12px; color: var(--color-muted-foreground);
  margin-bottom: 4px;
}
.footer-title { font-weight: 700; font-size: 15px; overflow-wrap: anywhere; }

@media (max-width: 768px) {
  .nav-inner { flex-wrap: wrap; gap: 8px; padding: 10px 14px; }
  .nav-brand { min-width: 0; flex: 1 1 auto; }
  .nav-brand span:last-child { max-width: min(260px, 58vw); }
  .nav-links { margin-left: 0; width: 100%; }
  .nav-link {
    flex: 1 1 min(100%, 160px);
    font-size: 12px;
    min-height: 44px;
    padding: 10px 12px;
    display: inline-flex;
    align-items: center;
  }
  .theme-toggle {
    min-width: 44px;
    min-height: 44px;
    margin-left: 0;
    padding: 8px 10px;
  }
  .lesson-header { padding: 40px 14px 28px; }
  .lesson-header h1 { font-size: clamp(26px, 8vw, 34px); overflow-wrap: anywhere; }
  .lesson-main {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    padding: 24px 14px;
  }
  .lesson-content-wrap {
    width: 100%;
    max-width: 100%;
    padding: 0;
  }
  .lesson-toc {
    width: auto;
    max-width: calc(100% - 28px);
    margin: 0 14px 24px;
  }
  .toc-toggle {
    min-height: 44px;
    padding: 12px 14px;
  }
  .toc-item {
    min-height: 44px;
    display: flex;
    align-items: center;
    padding: 10px 12px;
  }
  .lesson-footer {
    margin-top: 32px;
    padding: 18px 14px;
  }
  .footer-nav { grid-template-columns: 1fr; }
  .footer-card { padding: 16px; }
  .footer-card.prev, .footer-card.next, .footer-card.home { text-align: center; }
}
</style>
