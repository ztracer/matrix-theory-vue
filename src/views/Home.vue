<template>
  <div class="home-page">
    <!-- Hero -->
    <section class="hero">
      <div v-for="(m, i) in mathSymbols" :key="i" class="floating-math" :style="m.style">{{ m.sym }}</div>
      <div class="container hero-content">
        <span class="hero-badge">MATRIX THEORY · INTERACTIVE LEARNING</span>
        <h1>矩阵论<br>可视化交互学习</h1>

        <div class="hero-stats">
          <div class="stat"><div class="stat-num">{{ totalLessons }}</div><div class="stat-label">知识模块</div></div>
          <div class="stat"><div class="stat-num">{{ totalAnims }}+</div><div class="stat-label">交互动画</div></div>
          <div class="stat"><div class="stat-num">{{ totalWeeks }}</div><div class="stat-label">周复习规划</div></div>
          <div class="stat"><div class="stat-num">{{ totalQuizzes }}</div><div class="stat-label">道真题</div></div>
        </div>
        <div class="hero-btns">
          <a href="#mindmap" class="btn btn-primary" @click.prevent="scrollTo('mindmap')">🗺️ 知识地图</a>
          <a href="#lessons" class="btn btn-secondary" @click.prevent="scrollTo('lessons')">📚 开始学习</a>
          <router-link to="/exam" class="btn btn-exam">📋 真题汇总</router-link>
          <router-link to="/homework" class="btn btn-homework">📝 课后作业</router-link>
        </div>
        <button class="theme-toggle home-theme-toggle" @click="toggle" :aria-label="theme === 'dark' ? '切换亮色' : '切换暗色'">
          {{ theme === 'dark' ? '☀️' : '🌙' }}
        </button>
      </div>
      <div class="scroll-hint">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>
    </section>

    <!-- Mind Map -->
    <section id="mindmap" class="section mindmap-section">
      <div class="container">
        <div class="section-header reveal">
          <div class="section-tag">Knowledge Architecture</div>
          <h2>📊 矩阵论知识图谱</h2>
          <p class="section-desc">按小知识点展示前置依赖、推导路径和考试关联；点击节点进入对应课程。</p>
        </div>
        <div class="mindmap-card" @mousemove="moveTip" @mouseleave="hideTip">
          <div class="kg-toolbar">
            <button
              v-for="g in knowledgeGroups"
              :key="g.id"
              class="kg-filter"
              :class="{ active: activeKnowledgeGroup === g.id }"
              :style="{ '--group-color': g.color }"
              @click="setKnowledgeGroup(g.id)"
            >
              {{ g.label }}
            </button>
          </div>

          <div class="kg-scroll">
            <svg viewBox="0 0 1380 700" class="mindmap-svg">
            <defs>
              <marker id="kgArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="context-stroke"/>
              </marker>
            </defs>

            <g class="kg-lanes">
              <template v-for="lane in knowledgeLanes" :key="lane.label">
                <text :x="lane.x" y="34" text-anchor="middle">{{ lane.label }}</text>
                <line :x1="lane.x" y1="52" :x2="lane.x" y2="672"/>
              </template>
            </g>

            <g class="edges">
              <path
                v-for="edge in visibleKnowledgeEdges"
                :key="edge.from + '-' + edge.to"
                :d="edgePath(edge)"
                :stroke="edgeStyle(edge).color"
                :stroke-dasharray="edgeStyle(edge).dash"
                :class="edgeClass(edge)"
                fill="none"
                marker-end="url(#kgArrow)"
              />
            </g>

            <g
              v-for="n in visibleKnowledgeNodes"
              :key="n.id"
              class="mm-node kg-node"
              :class="nodeClass(n)"
              :transform="`translate(${n.x}, ${n.y})`"
              @click="selectKnowledgeNode(n)"
              @mouseenter="selectedKnowledgeNodeId = n.id; showTip($event, nodeTip(n))"
            >
              <rect x="-58" y="-23" width="116" height="46" rx="8" :fill="groupColor(n.group)"/>
              <text y="-3" text-anchor="middle" fill="#fff" font-weight="700" font-size="12">{{ n.label }}</text>
              <text y="13" text-anchor="middle" fill="rgba(255,255,255,.86)" font-size="10">L{{ String(n.lesson).padStart(2, '0') }} · {{ n.formula }}</text>
              <g v-if="nodeQuestionCount(n) > 0" transform="translate(47,-28)">
                <circle r="12" fill="#fff" :stroke="groupColor(n.group)" stroke-width="2"/>
                <text y="4" text-anchor="middle" :fill="groupColor(n.group)" font-weight="800" font-size="10">{{ nodeQuestionCount(n) }}</text>
              </g>
            </g>
          </svg>
          </div>

          <div ref="tip" class="mm-tooltip" :class="{ show: tipShow }">{{ tipText }}</div>

          <div class="mm-legend">
            <div v-for="g in knowledgeGroups.slice(1)" :key="g.id" class="legend-item"><span class="dot" :style="{ background: g.color }"></span>{{ g.label }}</div>
            <div v-for="(type, key) in edgeTypes" :key="key" class="legend-item"><span class="edge-sample" :style="{ borderTopColor: type.color, borderTopStyle: type.dash ? 'dashed' : 'solid' }"></span>{{ type.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Lessons -->
    <section id="lessons" class="section lessons-section">
      <div class="container">
        <div class="section-header reveal">
          <div class="section-tag">Interactive Lessons</div>
          <h2>📚 课程内容</h2>
          <p class="section-desc">每个知识点包含概念讲解、交互动画、定理公式和真题详解</p>
        </div>

        <!-- Week 1 -->
        <div class="week-block reveal" :style="{ '--i': 0 }">
          <div class="week-header">
            <span class="week-badge w1">WEEK 1</span>
            <div>
              <div class="week-title">空间变换与标准形</div>
              <div class="week-theme">线性空间 → 线性变换 → 特征分析 → 矩阵函数</div>
            </div>
          </div>
          <div class="cards">
            <router-link v-for="(l, i) in week1" :key="l.id" :to="l.path" class="card w1 reveal" :style="{ '--i': i }">
              <div class="card-num">{{ l.num }}</div>
              <div class="card-top">
                <div class="card-icon">{{ l.icon }}</div>
              </div>
              <div class="card-title">{{ l.title }}</div>
              <div class="card-en">{{ l.en }}</div>
              <div class="card-desc">{{ l.desc }}</div>
              <div class="card-tags">
                <span v-for="t in l.tags" :key="t" class="tag">{{ t }}</span>
              </div>
              <div class="card-footer">
                <span class="card-anim">🎬 {{ l.anims }} 个动画 · 📝 {{ getQuizCount(l.id) }} 真题{{ getHwCount(l.id) ? ' + ' + getHwCount(l.id) + ' 作业' : '' }}</span>
                <span v-if="readLessons.has(l.id)" class="card-read">✓ 已访问</span>
                <span class="card-arrow">→</span>
              </div>
            </router-link>
          </div>
        </div>

        <!-- Week 2 -->
        <div class="week-block reveal" :style="{ '--i': 1 }">
          <div class="week-header">
            <span class="week-badge w2">WEEK 2</span>
            <div>
              <div class="week-title">矩阵分解与广义逆</div>
              <div class="week-theme">三角分解 → QR分解 → SVD → 广义逆</div>
            </div>
          </div>
          <div class="cards">
            <router-link v-for="(l, i) in week2" :key="l.id" :to="l.path" class="card w2 reveal" :style="{ '--i': i }">
              <div class="card-num">{{ l.num }}</div>
              <div class="card-top">
                <div class="card-icon">{{ l.icon }}</div>
              </div>
              <div class="card-title">{{ l.title }}</div>
              <div class="card-en">{{ l.en }}</div>
              <div class="card-desc">{{ l.desc }}</div>
              <div class="card-tags">
                <span v-for="t in l.tags" :key="t" class="tag">{{ t }}</span>
              </div>
              <div class="card-footer">
                <span class="card-anim">🎬 {{ l.anims }} 个动画 · 📝 {{ getQuizCount(l.id) }} 真题{{ getHwCount(l.id) ? ' + ' + getHwCount(l.id) + ' 作业' : '' }}</span>
                <span v-if="readLessons.has(l.id)" class="card-read">✓ 已访问</span>
                <span class="card-arrow">→</span>
              </div>
            </router-link>
          </div>
        </div>

        <!-- Week 3 -->
        <div class="week-block reveal" :style="{ '--i': 2 }">
          <div class="week-header">
            <span class="week-badge w3">WEEK 3</span>
            <div>
              <div class="week-title">应用专题与真题模拟</div>
              <div class="week-theme">投影应用 → 最小二乘 → 特征值估计 → 考前冲刺</div>
            </div>
          </div>
          <div class="cards">
            <router-link v-for="(l, i) in week3" :key="l.id" :to="l.path" class="card w3 reveal" :style="{ '--i': i }">
              <div class="card-num">{{ l.num }}</div>
              <div class="card-top">
                <div class="card-icon">{{ l.icon }}</div>
              </div>
              <div class="card-title">{{ l.title }}</div>
              <div class="card-en">{{ l.en }}</div>
              <div class="card-desc">{{ l.desc }}</div>
              <div class="card-tags">
                <span v-for="t in l.tags" :key="t" class="tag">{{ t }}</span>
              </div>
              <div class="card-footer">
                <span class="card-anim">🎬 {{ l.anims }} 个动画 · 📝 {{ getQuizCount(l.id) }} 真题{{ getHwCount(l.id) ? ' + ' + getHwCount(l.id) + ' 作业' : '' }}</span>
                <span v-if="readLessons.has(l.id)" class="card-read">✓ 已访问</span>
                <span class="card-arrow">→</span>
              </div>
            </router-link>
          </div>
        </div>

        <!-- Week 4 -->
        <div class="week-block reveal" :style="{ '--i': 3 }">
          <div class="week-header">
            <span class="week-badge w4">WEEK 4</span>
            <div>
              <div class="week-title">课后作业与真题冲刺</div>
              <div class="week-theme">教材习题精解 → 历年真题 → 考前模拟</div>
            </div>
          </div>
          <div class="cards">
            <router-link to="/homework" class="card w4 reveal" :style="{ '--i': 0 }">
              <div class="card-num">📝</div>
              <div class="card-top">
                <div class="card-icon">📝</div>
              </div>
              <div class="card-title">课后作业</div>
              <div class="card-en">Homework</div>
              <div class="card-desc">62 道教材习题精解，按章节分组，含详细计算步骤与知识点标签。</div>
              <div class="card-tags">
                <span class="tag">教材习题</span>
                <span class="tag">章节分组</span>
              </div>
              <div class="card-footer">
                <span class="card-anim">📝 62 道习题</span>
                <span class="card-arrow">→</span>
              </div>
            </router-link>
            <router-link to="/exam" class="card w4 reveal" :style="{ '--i': 1 }">
              <div class="card-num">📋</div>
              <div class="card-top">
                <div class="card-icon">📋</div>
              </div>
              <div class="card-title">真题汇总</div>
              <div class="card-en">Exam Bank</div>
              <div class="card-desc">34 道历年考试真题，按知识点分类检索，含完整解答步骤。</div>
              <div class="card-tags">
                <span class="tag">历年真题</span>
                <span class="tag">知识点检索</span>
              </div>
              <div class="card-footer">
                <span class="card-anim">📝 34 道真题</span>
                <span class="card-arrow">→</span>
              </div>
            </router-link>
            <router-link to="/preview" class="card w4 reveal" :style="{ '--i': 2 }">
              <div class="card-num">🔮</div>
              <div class="card-top">
                <div class="card-icon">🔮</div>
              </div>
              <div class="card-title">考前预测</div>
              <div class="card-en">Exam Prediction</div>
              <div class="card-desc">25 道期末考预测题，覆盖全部知识点，含计算题与证明题完整解答。</div>
              <div class="card-tags">
                <span class="tag">考点预测</span>
                <span class="tag">综合模拟</span>
              </div>
              <div class="card-footer">
                <span class="card-anim">📝 25 道预测题</span>
                <span class="card-arrow">→</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Learning Path -->
    <section class="section path-section">
      <div class="container">
        <div class="section-header reveal">
          <div class="section-tag">Learning Path</div>
          <h2>🗺️ 推荐学习路径</h2>
          <p class="section-desc">从基础到应用，循序渐进掌握矩阵论</p>
          <button v-if="readLessons.size > 0" class="reset-progress-btn" @click="resetProgress">🔄 重置访问记录</button>
        </div>
        <div class="path-map">
          <section
            v-for="(phase, phaseIndex) in pathPhases"
            :key="phase.name"
            class="path-phase reveal"
            :class="'phase-' + (phaseIndex + 1)"
            :style="{ '--i': phaseIndex }"
          >
            <div class="phase-meta">
              <div class="phase-kicker">{{ phase.range }}</div>
              <h3>{{ phase.name }}</h3>
              <p>{{ phase.goal }}</p>
              <div class="phase-check">{{ phase.check }}</div>
            </div>

            <div class="phase-lessons">
              <router-link
                v-for="(s, lessonIndex) in phase.lessons"
                :key="s.lesson"
                :to="s.path"
                class="path-node"
                :class="{ 'is-read': isPathRead(s), 'is-next': nextPathLesson?.lesson === s.lesson }"
                :style="{ '--i': lessonIndex }"
              >
                <div class="path-node-top">
                  <span class="path-lesson">L{{ s.lesson }}</span>
                  <span class="path-token">{{ s.token }}</span>
                </div>
                <div class="path-step">{{ s.step }}</div>
                <div class="path-name">{{ s.name }}</div>
                <div class="path-desc">{{ s.desc }}</div>
                <div class="path-outcome">{{ s.outcome }}</div>
                <div class="path-node-footer">
                  <span v-for="tag in s.tags" :key="tag" class="path-tag">{{ tag }}</span>
                  <span v-if="isPathRead(s)" class="path-state">已访问</span>
                  <span v-else-if="nextPathLesson?.lesson === s.lesson" class="path-state next">继续</span>
                </div>
              </router-link>
            </div>
          </section>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="home-footer">
      <div class="container">
        <h3>矩阵论可视化交互学习系统</h3>
        <p>让抽象的数学概念变得直观可见</p>
        <div class="footer-tech">
          <span>Vue 3</span><span>Vite</span><span>SVG/Canvas</span><span>KaTeX</span><span>GitHub Pages</span>
        </div>
        <div class="footer-copy">© 2026 Matrix Theory Interactive Learning</div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { quizBank, lessonMeta } from '@/data/quizBank'
import { homeworkBank } from '@/data/homeworkBank'
import { knowledgeEdges, knowledgeGroups, knowledgeNodes, edgeTypes } from '@/data/knowledgeGraph'
import { useKatex } from '@/composables/useKatex'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { useTheme } from '@/composables/useTheme'

const { theme, toggle } = useTheme()

useKatex()
useScrollReveal('.home-page .reveal')

const router = useRouter()
const readLessons = ref(new Set())

onMounted(() => {
  try {
    const stored = JSON.parse(localStorage.getItem('matrix-read-lessons') || '[]')
    readLessons.value = new Set(stored)
  } catch {
    readLessons.value = new Set()
  }
})

function resetProgress() {
  if (!confirm('确定要重置所有课程的访问记录吗？这将清除"已访问"标记，方便你开始新一轮复习。')) return
  try {
    localStorage.removeItem('matrix-read-lessons')
    readLessons.value = new Set()
  } catch {
    readLessons.value = new Set()
  }
}

const tip = ref(null)
const tipShow = ref(false)
const tipText = ref('')
const activeKnowledgeGroup = ref('all')
const selectedKnowledgeNodeId = ref(null)

// 动态获取某课的真题数量
const getQuizCount = (id) => quizBank[id]?.length || 0
function getHwCount(lessonId) {
  return (homeworkBank[lessonId] || []).length
}

// Hero区动态统计
const totalLessons = lessonMeta.length
const totalAnims = lessonMeta.reduce((s, l) => s + l.anims, 0)
const totalQuizzes = Object.values(quizBank).reduce((s, q) => s + q.length, 0)
const totalWeeks = computed(() => new Set([...lessonMeta.map(l => l.week), 4]).size)

const mathSymbols = [
  { sym: 'A=UΣVᵀ', style: 'top:8%;left:5%;font-size:42px;animation-delay:0s' },
  { sym: 'eᴬᵗ', style: 'top:15%;right:8%;font-size:56px;animation-delay:-5s' },
  { sym: 'J=P⁻¹AP', style: 'bottom:20%;left:8%;font-size:36px;animation-delay:-10s' },
  { sym: 'Ax=λx', style: 'bottom:12%;right:5%;font-size:48px;animation-delay:-15s' },
]

const knowledgeLanes = [
  { label: '基础对象', x: 90 },
  { label: '变换结构', x: 300 },
  { label: '标准形/函数', x: 500 },
  { label: '分解工具', x: 700 },
  { label: 'SVD/广义逆', x: 900 },
  { label: '几何优化', x: 1090 },
  { label: '估计/考点', x: 1280 }
]

const groupColor = (groupId) => knowledgeGroups.find(g => g.id === groupId)?.color || '#64748b'

const nodeById = computed(() => Object.fromEntries(knowledgeNodes.map(n => [n.id, n])))

function textMatchesNode(text, node) {
  if (!text) return false
  const terms = [node.label, node.formula, ...(node.aliases || [])].filter(Boolean)
  return terms.some(term => text.includes(term))
}

function countBankMatches(bank, node) {
  let count = 0
  for (const items of Object.values(bank)) {
    for (const item of items || []) {
      const knowledgeText = Array.isArray(item.knowledge) ? item.knowledge.join(' ') : (item.knowledge || '')
      const haystack = `${knowledgeText} ${item.title || ''} ${item.question || ''}`
      if (textMatchesNode(haystack, node)) count++
    }
  }
  return count
}

const nodeQuestionCounts = computed(() => {
  const counts = {}
  for (const node of knowledgeNodes) {
    counts[node.id] = countBankMatches(quizBank, node) + countBankMatches(homeworkBank, node)
  }
  return counts
})

const nodeQuestionCount = (node) => nodeQuestionCounts.value[node.id] || 0

const selectedNeighborIds = computed(() => {
  if (!selectedKnowledgeNodeId.value) return new Set()
  const ids = new Set([selectedKnowledgeNodeId.value])
  knowledgeEdges.forEach(edge => {
    if (edge.from === selectedKnowledgeNodeId.value) ids.add(edge.to)
    if (edge.to === selectedKnowledgeNodeId.value) ids.add(edge.from)
  })
  return ids
})

const visibleKnowledgeNodes = computed(() => {
  if (activeKnowledgeGroup.value === 'all') return knowledgeNodes
  const related = new Set()
  knowledgeEdges.forEach(edge => {
    const from = nodeById.value[edge.from]
    const to = nodeById.value[edge.to]
    if (from?.group === activeKnowledgeGroup.value || to?.group === activeKnowledgeGroup.value) {
      related.add(edge.from)
      related.add(edge.to)
    }
  })
  return knowledgeNodes.filter(n => n.group === activeKnowledgeGroup.value || related.has(n.id))
})

const visibleKnowledgeNodeIds = computed(() => new Set(visibleKnowledgeNodes.value.map(n => n.id)))

const visibleKnowledgeEdges = computed(() => {
  return knowledgeEdges.filter(edge => (
    visibleKnowledgeNodeIds.value.has(edge.from) &&
    visibleKnowledgeNodeIds.value.has(edge.to)
  ))
})

function setKnowledgeGroup(groupId) {
  activeKnowledgeGroup.value = groupId
  selectedKnowledgeNodeId.value = null
}

function selectKnowledgeNode(node) {
  selectedKnowledgeNodeId.value = node.id
  go(node.path)
}

function edgeStyle(edge) {
  return edgeTypes[edge.type] || edgeTypes.requires
}

function edgePath(edge) {
  const from = nodeById.value[edge.from]
  const to = nodeById.value[edge.to]
  if (!from || !to) return ''
  const startX = from.x + 58
  const endX = to.x - 58
  const sameDirection = endX > startX
  const c = Math.max(55, Math.abs(endX - startX) * 0.45)
  const c1x = sameDirection ? startX + c : startX - c
  const c2x = sameDirection ? endX - c : endX + c
  return `M ${startX} ${from.y} C ${c1x} ${from.y}, ${c2x} ${to.y}, ${endX} ${to.y}`
}

function nodeTip(node) {
  const lesson = lessonMeta.find(l => l.id === node.lesson)
  const count = nodeQuestionCount(node)
  return {
    tip: `${node.label} · ${lesson?.num || ''} ${lesson?.title || ''}\n${node.formula}\n\n${node.desc}\n\n关联题目：${count} 道`
  }
}

function nodeClass(node) {
  return {
    muted: activeKnowledgeGroup.value !== 'all' && node.group !== activeKnowledgeGroup.value,
    selected: selectedKnowledgeNodeId.value === node.id,
    related: selectedNeighborIds.value.has(node.id)
  }
}

function edgeClass(edge) {
  const hasSelection = Boolean(selectedKnowledgeNodeId.value)
  const connected = edge.from === selectedKnowledgeNodeId.value || edge.to === selectedKnowledgeNodeId.value
  return {
    muted: hasSelection && !connected,
    active: connected
  }
}

// 从 lessonMeta 按周派生课程列表（anims 从 lessonMeta 读取，quizCount 通过 quizBank 动态计算）
const week1 = computed(() => lessonMeta.filter(l => l.week === 1))
const week2 = computed(() => lessonMeta.filter(l => l.week === 2))
const week3 = computed(() => lessonMeta.filter(l => l.week === 3))

const phaseCopy = {
  concept: {
    name: '概念建模',
    range: '01-04',
    goal: '主线：空间提供对象，线性变换提供作用，标准形揭示结构，矩阵函数处理演化。',
    check: '典型任务：子空间判定、换基矩阵、Jordan 块、e^A'
  },
  decomposition: {
    name: '分解工具',
    range: '05-07',
    goal: '主线：LU 来自消元，QR 来自正交化，SVD 来自主轴拉伸，MP 逆延伸求解边界。',
    check: '典型任务：消元分解、正交化、低秩逼近、MP 逆'
  },
  geometry: {
    name: '几何与应用',
    range: '08-10',
    goal: '主线：投影描述子空间分量，最小二乘刻画误差正交，圆盘定理给出谱位置。',
    check: '典型任务：投影矩阵、正规方程、范数估计、圆盘定位'
  },
  review: {
    name: '考前整合',
    range: '11',
    goal: '主线：按题型整理计算入口、证明条件和易错边界，形成考前检索表。',
    check: '典型任务：综合计算、证明模板、真题拆解'
  }
}

const path = [
  {lesson:'01', phase:'concept', step:'空间对象', name:'线性空间与子空间', desc:'封闭性决定子空间，基与维数描述空间规模，直和刻画分解方式。', token:'V', outcome:'子空间判定、基与维数、直和分解', tags:['判定', '维数'], path:'/lesson/01'},
  {lesson:'02', phase:'concept', step:'变换表示', name:'线性变换及其矩阵', desc:'矩阵表示记录变换在一组基下的坐标作用，核、像和秩描述结构信息。', token:'[T]', outcome:'矩阵表示、换基关系、核与像', tags:['矩阵表示', '换基'], path:'/lesson/02'},
  {lesson:'03', phase:'concept', step:'标准形', name:'Jordan标准形', desc:'特征值给出不变方向，重数差异解释对角化条件，Jordan 链补足缺失方向。', token:'J', outcome:'可对角化判定、小阶 Jordan 形构造', tags:['重数', 'Jordan链'], path:'/lesson/03'},
  {lesson:'04', phase:'concept', step:'函数演化', name:'矩阵函数与微分方程', desc:'C-H 降阶、Jordan 分块和幂级数提供 f(A) 与 e^A 的三条计算路径。', token:'e^A', outcome:'矩阵函数计算、线性微分方程解', tags:['C-H', '矩阵指数'], path:'/lesson/04'},
  {lesson:'05', phase:'decomposition', step:'消元与正交', name:'LU与QR分解', desc:'LU 记录行消元过程，QR 记录正交基构造，两者分别服务求解和稳定计算。', token:'QR', outcome:'三阶 LU/QR、Gram-Schmidt、Householder', tags:['消元', '正交化'], path:'/lesson/05'},
  {lesson:'06', phase:'decomposition', step:'主轴分解', name:'SVD奇异值分解', desc:'奇异值来自 AᵀA 的谱结构，左右奇异向量给出输入和输出的主方向。', token:'SVD', outcome:'奇异值、低秩逼近、几何解释', tags:['奇异值', '低秩'], path:'/lesson/06'},
  {lesson:'07', phase:'decomposition', step:'广义求解', name:'满秩分解与MP逆', desc:'满秩分解揭示秩结构，Penrose 方程刻画 MP 逆的唯一性和最小范数性质。', token:'A+', outcome:'一类逆、MP 逆、最小范数解', tags:['广义逆', 'Penrose'], path:'/lesson/07'},
  {lesson:'08', phase:'geometry', step:'子空间投影', name:'投影矩阵', desc:'投影由目标子空间和补空间共同决定，正交投影额外满足对称性。', token:'P²', outcome:'列空间投影矩阵、幂等性验证', tags:['投影', '幂等'], path:'/lesson/08'},
  {lesson:'09', phase:'geometry', step:'误差正交', name:'最小二乘与范数', desc:'正规方程来自残差与列空间正交，范数选择决定误差度量方式。', token:'AᵀA', outcome:'正规方程、残差正交、范数比较', tags:['正规方程', '残差'], path:'/lesson/09'},
  {lesson:'10', phase:'geometry', step:'谱位置', name:'盖尔圆盘估计', desc:'行圆盘给出特征值粗定位，隔离定理和 Rayleigh 商提供进一步约束。', token:'Gᵢ', outcome:'圆盘绘制、隔离判定、谱半径估计', tags:['圆盘', 'Rayleigh'], path:'/lesson/10'},
  {lesson:'11', phase:'review', step:'题型索引', name:'考前复习与真题', desc:'计算题关注入口公式，证明题关注条件链，综合题关注章节之间的连接点。', token:'Exam', outcome:'题型索引、证明条件、易错边界', tags:['真题', '模板'], path:'/lesson/11'},
]

const pathPhases = computed(() => {
  return Object.entries(phaseCopy).map(([key, meta]) => ({
    ...meta,
    lessons: path.filter(item => item.phase === key)
  }))
})

const isPathRead = (item) => readLessons.value.has(Number(item.lesson))

const nextPathLesson = computed(() => path.find(item => !isPathRead(item)) || null)

const go = (p) => { if(p) router.push(p) }

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const showTip = (e, info) => {
  if(!info || !info.tip) return
  const rect = e.currentTarget.closest('.mindmap-card').getBoundingClientRect()
  tipText.value = info.tip
  tip.value.style.left = (e.clientX - rect.left) + 'px'
  tip.value.style.top = (e.clientY - rect.top - 20) + 'px'
  tip.value.style.transform = 'translate(-50%, -100%)'
  tipShow.value = true
}
const moveTip = (e) => {
  if(!tipShow.value) return
  const rect = e.currentTarget.getBoundingClientRect()
  tip.value.style.left = (e.clientX - rect.left) + 'px'
  tip.value.style.top = (e.clientY - rect.top - 20) + 'px'
}
const hideTip = () => { tipShow.value = false }
</script>

<style scoped>
.home-page { overflow-x: hidden; background: var(--color-background); color: var(--color-foreground); }

.home-page {
  --ease-out-strong: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out-strong: cubic-bezier(0.77, 0, 0.175, 1);
}

/* Scroll reveal */
:global(.scroll-reveal-enabled) .reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 400ms var(--ease-out-strong), transform 400ms var(--ease-out-strong);
}
:global(.scroll-reveal-enabled) .reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}
:global(.scroll-reveal-enabled) .card.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition-delay: calc(var(--i, 0) * 80ms);
}
:global(.scroll-reveal-enabled) .card.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}
:global(.scroll-reveal-enabled) .path-phase.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition-delay: calc(var(--i, 0) * 90ms);
}
:global(.scroll-reveal-enabled) .path-phase.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}
:global(.scroll-reveal-enabled) .section-header.reveal {
  opacity: 0;
  transform: translateY(20px);
}
:global(.scroll-reveal-enabled) .section-header.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}
:global(.scroll-reveal-enabled) .week-block.reveal {
  transition-delay: calc(var(--i, 0) * 80ms);
}

/* Hero */
.hero {
  min-height: 86vh;
  background: #0B1220;
  color: #F1F5F9;
  padding: 64px 24px 56px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.hero::before {
  content:'';
  position:absolute;
  inset:0;
  border: 24px solid rgba(241,245,249,.03);
  pointer-events: none;
}
.floating-math {
  position: absolute;
  font-family: "Cambria Math", "STIX Two Math", math, serif;
  font-weight: 600;
  opacity: .045;
  color: #F1F5F9;
  pointer-events: none;
  animation: float 20s ease-in-out infinite;
}
@keyframes float {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(20px, -20px) rotate(5deg); }
}
.hero-content { text-align: left; position: relative; z-index:1; display:grid; grid-template-columns: 1.35fr .65fr; gap:48px; align-items:end; }
.hero-badge {
  display:inline-block;
  padding:0 0 10px;
  font-size:12px;
  margin-bottom:24px;
  color: #94A3B8;
  letter-spacing:.18em;
  text-transform:uppercase;
  border-bottom: 1px solid rgba(241,245,249,.22);
}
.hero h1 {
  font-size: clamp(48px, 8vw, 96px);
  font-weight: 700;
  line-height: .98;
  margin-bottom: 24px;
  color:#F8FAFC;
  letter-spacing:-.03em;
}
.hero-stats { grid-column:2; grid-row:1 / span 4; display:grid; grid-template-columns:1fr 1fr; gap:1px; background: rgba(241,245,249,.08); border: 1px solid rgba(241,245,249,.15); }
.stat { background: rgba(15,23,42,.92); padding:24px; min-width:132px; }
.stat-num {
  font-size:40px; font-weight:700; color:#F8FAFC; line-height:1;
}
.stat-label { font-size:13px; color: #94A3B8; margin-top:10px; }
.hero-btns { display:flex; gap:12px; justify-content:flex-start; flex-wrap:wrap; }
.btn {
  padding:13px 20px; border-radius:10px; font-size:14px; font-weight:650;
  text-decoration:none; transition:all .18s ease; cursor:pointer; border: 1px solid rgba(241,245,249,.22);
}
.btn-primary, .btn-exam { background:#F8FAFC; color:#0B1220; }
.btn-secondary, .btn-homework { background:transparent; color:#F8FAFC; }
.btn:hover { transform:translateY(-1px); text-decoration:none; border-color:#F8FAFC; }
.scroll-hint {
  position:absolute; bottom:28px; left:50%; transform:translateX(-50%);
  opacity:.45; color:#F8FAFC;
}

.home-theme-toggle {
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 10;
  background: rgba(241,245,249,.08);
  border: 1px solid rgba(241,245,249,.2);
  border-radius: 8px;
  color: #F1F5F9;
  padding: 8px 12px;
  font-size: 16px;
  cursor: pointer;
  transition: background .18s ease;
}
.home-theme-toggle:hover { background: rgba(241,245,249,.16); }

/* Section base */
.section { padding: 64px 0; }
.section-header { margin-bottom:28px; }
.section-tag {
  display:inline-block; font-size:12px; font-weight:700;
  text-transform:uppercase; letter-spacing:.18em;
  color:var(--color-accent); margin-bottom:12px;
}
.section-header h2 {
  font-size:clamp(32px,4vw,48px); font-weight:700;
  color:var(--color-foreground); margin-bottom:8px;
}
.section-desc { color:var(--color-muted-foreground); font-size:15px; max-width:680px; margin:0; grid-column: 1 / -1; }

/* Mind Map */
.mindmap-section { background: var(--color-background); }
.mindmap-card {
  background:var(--color-card); border-radius:16px;
  border:1px solid var(--color-border);
  padding:24px; position:relative;
  overflow:hidden;
}
.kg-toolbar {
  display:flex;
  gap:10px;
  align-items:center;
  justify-content:center;
  flex-wrap:wrap;
  margin-bottom:18px;
}
.kg-filter {
  border:1px solid var(--color-border);
  background:var(--color-card);
  color:var(--color-secondary);
  border-radius:10px;
  padding:8px 14px;
  font-size:13px;
  font-weight:650;
  cursor:pointer;
  transition:all .18s ease;
}
.kg-filter:hover,
.kg-filter.active {
  color: var(--color-on-brand);
  background: var(--color-brand);
  border-color: var(--color-brand);
}
.kg-scroll {
  overflow-x:auto;
  overflow-y:hidden;
  padding-bottom:8px;
}
.mindmap-svg {
  width:100%;
  min-width:1180px;
  height:auto;
  display:block;
  max-width:none;
  border-radius:12px;
  background:var(--color-background);
  border:1px solid var(--color-border);
}
.kg-lanes text {
  fill: var(--color-muted-foreground);
  font-size:13px;
  font-weight:700;
  letter-spacing:.5px;
}
.kg-lanes line {
  stroke: var(--color-border);
  stroke-width:1;
  stroke-dasharray:4 8;
}
.edges path {
  stroke-width:2;
  opacity:.72;
  transition:opacity .2s, stroke-width .2s;
}
.edges path.muted { opacity:.09; }
.edges path.active {
  opacity:1;
  stroke-width:3;
}
.mm-node { cursor:pointer; }
.kg-node {
  transition:opacity .2s, filter .2s, transform .2s;
}
.kg-node rect {
  stroke: color-mix(in srgb, var(--color-foreground) 22%, transparent);
  stroke-width:1;
  transition:filter .2s, stroke .2s, stroke-width .2s;
}
.kg-node:hover rect,
.kg-node.selected rect {
  filter:brightness(1.03);
  stroke: var(--color-foreground);
  stroke-width:2;
}
.kg-node.muted {
  opacity:.34;
}
.kg-node.related {
  opacity:1;
}
.mm-tooltip {
  position:absolute; background: var(--color-brand); color: var(--color-on-brand);
  padding:12px 16px; border-radius:10px; font-size:13px;
  max-width:320px; pointer-events:none; opacity:0;
  transition:opacity .15s; z-index:10; line-height:1.7;
  box-shadow: none; white-space:pre-line;
}
.mm-tooltip.show { opacity:1; }
.mm-tooltip::after {
  content:none;
}
.mm-legend {
  display:flex; gap:24px; justify-content:center;
  margin-top:20px; flex-wrap:wrap; font-size:13px; color:var(--color-muted-foreground);
}
.legend-item { display:flex; align-items:center; gap:8px; }
.legend-item .dot { width:14px; height:14px; border-radius:50%; }
.edge-sample {
  width:24px;
  height:0;
  border-top: 2px solid var(--color-muted-foreground);
}

/* Week blocks */
.week-block { margin-bottom:56px; }
.week-header {
  display:flex; align-items:center; gap:18px;
  margin-bottom:20px; padding-bottom:16px;
  border-bottom:1px solid var(--color-border);
}
.week-badge {
  padding:7px 12px; border-radius:8px; color:var(--color-primary);
  font-weight:700; font-size:12px; border:1px solid var(--color-border); background:var(--color-card);
  letter-spacing:.08em;
}
.week-title { font-size:24px; font-weight:700; color:var(--color-foreground); }
.week-theme { color:var(--color-muted-foreground); font-size:14px; margin-top:4px; }

/* Cards */
.cards { display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:20px; justify-content:center; }
.card {
  min-height:260px;
  background:var(--color-card); border-radius:14px; padding:24px;
  border:1px solid var(--color-border); text-decoration:none; color:var(--color-card-foreground);
  transition:transform .18s ease, border-color .18s ease; position:relative; overflow:hidden; display:flex; flex-direction:column;
}
.card.w1 { background:var(--color-card); }
.card.w2 { background:var(--color-card); }
.card.w3 { background:var(--color-card); }
.card.w4 { background:var(--color-card); }
.card:hover { transform:scale(1.01); border-color: var(--color-muted-foreground); text-decoration:none; }
.card-num {
  position:absolute; top:12px; right:16px;
  font-size:48px; font-weight:700; line-height:1; opacity:.08; color:var(--color-primary);
}
.card-icon {
  width:44px; height:44px; border-radius:10px;
  display:flex; align-items:center; justify-content:center; font-size:20px; background:var(--color-muted); border:1px solid var(--color-border);
}
.card-title { font-size:20px; font-weight:700; margin:18px 0 4px; }
.card-en { font-size:12px; color:var(--color-muted-foreground); margin-bottom:12px; letter-spacing:.06em; text-transform:uppercase; }
.card-desc { font-size:14px; color:var(--color-secondary); line-height:1.75; margin-bottom:16px; }
.card-tags { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:14px; }
.tag {
  font-size:11px; padding:4px 9px; border-radius:7px; font-weight:600; background:var(--color-muted); color:var(--color-secondary); border:1px solid var(--color-border);
}
.card-footer {
  margin-top:auto;
  display:flex; justify-content:space-between; align-items:center;
  padding-top:14px; border-top:1px solid var(--color-border);
}
.card-anim { font-size:12px; color:var(--color-muted-foreground); }
.card-read { font-size: 12px; color: var(--color-accent); font-weight: 600; }
.card-arrow { font-size:20px; transition:transform .18s ease; color:var(--color-accent); }
.card:hover .card-arrow { transform:translateX(4px); }

/* Reset progress */
.reset-progress-btn {
  display: inline-block;
  margin-top: 12px;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-secondary);
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  cursor: pointer;
  transition: all .18s ease;
}
.reset-progress-btn:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
}

/* Path map */
.path-section {
  background:
    radial-gradient(circle at 12% 10%, color-mix(in srgb, var(--color-accent) 9%, transparent), transparent 24%),
    linear-gradient(180deg, var(--color-card), var(--color-background));
  border-top:1px solid var(--color-border);
}
.path-map {
  display:grid;
  gap:18px;
  position:relative;
}
.path-phase {
  --phase-accent: var(--color-accent);
  display:grid;
  grid-template-columns:minmax(240px, 300px) minmax(0, 1fr);
  align-items:stretch;
  min-width:0;
  border:1px solid var(--color-border);
  border-radius:16px;
  background:var(--color-card);
  overflow:hidden;
}
.path-phase.phase-2 { --phase-accent: #0d9488; }
.path-phase.phase-3 { --phase-accent: #ea580c; }
.path-phase.phase-4 { --phase-accent: #7c3aed; }
.phase-meta {
  position:relative;
  display:flex;
  flex-direction:column;
  gap:12px;
  padding:22px;
  border-right:1px solid var(--color-border);
  background:
    linear-gradient(145deg, color-mix(in srgb, var(--phase-accent) 11%, transparent), transparent 58%),
    var(--color-surface-inset);
  min-width:0;
}
.phase-kicker {
  display:inline-flex;
  align-items:center;
  justify-content:center;
  min-height:30px;
  min-width:84px;
  padding:4px 12px;
  border-radius:8px;
  background:color-mix(in srgb, var(--phase-accent) 14%, var(--color-card));
  border:1px solid color-mix(in srgb, var(--phase-accent) 34%, var(--color-border));
  color:var(--phase-accent);
  font-size:13px;
  font-weight:800;
  font-variant-numeric:tabular-nums;
}
.phase-meta h3 {
  position:relative;
  margin:0;
  font-size:clamp(24px, 3vw, 34px);
  color:var(--color-foreground);
}
.phase-meta p {
  position:relative;
  margin:0;
  color:var(--color-secondary);
  line-height:1.6;
  font-size:14px;
}
.phase-check {
  position:relative;
  margin-top:auto;
  padding:12px;
  border-left:3px solid var(--phase-accent);
  background:color-mix(in srgb, var(--phase-accent) 8%, transparent);
  color:var(--color-muted-foreground);
  font-size:13px;
  line-height:1.55;
}
.phase-lessons {
  position:relative;
  display:grid;
  grid-template-columns:repeat(4, minmax(150px, 1fr));
  gap:12px;
  min-width:0;
  align-content:start;
  padding:22px;
  background:var(--color-card);
}
.phase-lessons::before {
  content:'';
  position:absolute;
  left:40px;
  right:40px;
  top:45px;
  height:3px;
  border-radius:999px;
  background:linear-gradient(90deg, var(--phase-accent), color-mix(in srgb, var(--phase-accent) 18%, transparent));
  pointer-events:none;
}
.phase-2 .phase-lessons,
.phase-3 .phase-lessons {
  grid-template-columns:repeat(3, minmax(170px, 1fr));
}
.phase-4 .phase-lessons {
  grid-template-columns:minmax(220px, 300px);
}
.path-node {
  position:relative;
  z-index:1;
  display:flex;
  flex-direction:column;
  min-width:0;
  min-height:172px;
  margin:0;
  padding:14px;
  border-radius:12px;
  border:1px solid color-mix(in srgb, var(--color-border) 92%, transparent);
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--phase-accent) 9%, transparent), transparent 46%),
    var(--color-card);
  color:var(--color-card-foreground);
  text-decoration:none;
  transition:transform .2s var(--ease-out-strong), border-color .2s ease, background-color .2s ease;
}
.path-node:nth-child(even) {
  margin-top:0;
}
.path-node::before {
  content:none;
}
.path-node:hover {
  transform:translateY(-3px);
  border-color:color-mix(in srgb, var(--phase-accent) 58%, var(--color-border));
  text-decoration:none;
}
.path-node:active {
  transform:translateY(-1px) scale(.99);
}
.path-node:focus-visible {
  outline:3px solid color-mix(in srgb, var(--phase-accent) 38%, transparent);
  outline-offset:3px;
}
.path-node.is-read {
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--phase-accent) 5%, transparent), transparent 48%),
    var(--color-surface-inset);
}
.path-node.is-next {
  border-color:color-mix(in srgb, var(--phase-accent) 74%, var(--color-border));
  box-shadow:0 16px 34px color-mix(in srgb, var(--phase-accent) 13%, transparent);
}
.path-node-top {
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:10px;
  margin-bottom:10px;
}
.path-lesson {
  display:inline-flex;
  align-items:center;
  gap:8px;
  color:var(--phase-accent);
  font-size:15px;
  font-weight:800;
  font-variant-numeric:tabular-nums;
}
.path-lesson::before {
  content:'';
  width:11px;
  height:11px;
  border-radius:50%;
  background:var(--phase-accent);
  box-shadow:0 0 0 4px color-mix(in srgb, var(--phase-accent) 14%, transparent);
}
.path-token {
  display:inline-flex;
  align-items:center;
  justify-content:center;
  min-width:38px;
  height:30px;
  padding:0 8px;
  border-radius:8px;
  background:color-mix(in srgb, var(--phase-accent) 13%, var(--color-card));
  border:1px solid color-mix(in srgb, var(--phase-accent) 28%, var(--color-border));
  color:var(--phase-accent);
  font-family:"Cambria Math", "STIX Two Math", math, serif;
  font-size:14px;
  font-weight:800;
  line-height:1;
  white-space:nowrap;
}
.path-step {
  color:var(--color-muted-foreground);
  font-size:12px;
  font-weight:800;
  margin-bottom:4px;
}
.path-name {
  color:var(--color-foreground);
  font-size:17px;
  font-weight:800;
  line-height:1.35;
  margin-bottom:6px;
  text-wrap:balance;
}
.path-desc {
  color:var(--color-secondary);
  font-size:12px;
  line-height:1.55;
  display:-webkit-box;
  -webkit-line-clamp:3;
  -webkit-box-orient:vertical;
  overflow:hidden;
}
.path-outcome {
  margin-top:auto;
  padding-top:10px;
  border-top:1px solid var(--color-border);
  color:var(--color-muted-foreground);
  font-size:12px;
  line-height:1.5;
  display:-webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
  overflow:hidden;
}
.path-outcome::before {
  content:'信号：';
  color:var(--phase-accent);
  font-weight:800;
}
.path-node-footer {
  display:flex;
  align-items:center;
  gap:5px;
  flex-wrap:wrap;
  margin-top:8px;
  padding-top:0;
}
.path-tag,
.path-state {
  display:inline-flex;
  align-items:center;
  min-height:24px;
  padding:3px 7px;
  border-radius:7px;
  border:1px solid var(--color-border);
  background:var(--color-muted);
  color:var(--color-secondary);
  font-size:11px;
  font-weight:700;
}
.path-tag {
  display:none;
}
.path-state {
  margin-left:auto;
  color:var(--color-accent);
  background:color-mix(in srgb, var(--color-accent) 9%, var(--color-card));
  border-color:color-mix(in srgb, var(--color-accent) 24%, var(--color-border));
}
.path-state.next {
  color:var(--phase-accent);
  background:color-mix(in srgb, var(--phase-accent) 13%, var(--color-card));
  border-color:color-mix(in srgb, var(--phase-accent) 34%, var(--color-border));
}

/* Footer */
.home-footer {
  background: var(--color-brand); color: var(--color-on-brand-muted);
  padding:48px 24px 28px; text-align:center;
}
.home-footer h3 { color: var(--color-on-brand); font-size:20px; margin-bottom:10px; }
.home-footer p { font-size:14px; margin-bottom:20px; opacity:.8; }
.footer-tech { display:flex; gap:16px; justify-content:center; flex-wrap:wrap; margin-bottom:24px; }
.footer-tech span {
  background: color-mix(in srgb, var(--color-on-brand) 6%, transparent); padding:6px 14px;
  border-radius:8px; font-size:13px; border: 1px solid color-mix(in srgb, var(--color-on-brand) 18%, transparent);
}
.footer-copy { font-size:12px; opacity:.72; border-top: 1px solid color-mix(in srgb, var(--color-on-brand) 18%, transparent); padding-top:20px; }

@media (max-width:1024px) {
  .path-phase {
    grid-template-columns:1fr;
  }
  .phase-meta {
    display:grid;
    grid-template-columns:auto minmax(0, 1fr);
    gap:8px 14px;
    align-items:start;
    border-right:0;
    border-bottom:1px solid var(--color-border);
  }
  .phase-kicker {
    grid-row:1;
  }
  .phase-meta h3 {
    grid-row:1;
    margin:0;
  }
  .phase-meta p {
    grid-column:1 / -1;
    max-width:60ch;
  }
  .phase-check {
    grid-column:1 / -1;
    margin-top:0;
  }
  .phase-lessons,
  .phase-2 .phase-lessons,
  .phase-3 .phase-lessons {
    grid-template-columns:repeat(2, minmax(0, 1fr));
  }
  .phase-4 .phase-lessons {
    grid-template-columns:minmax(0, 1fr);
  }
}

@media (max-width:768px) {
  .hero { min-height:auto; }
  .hero-content { grid-template-columns:1fr; text-align:left; }
  .hero-stats { grid-column:auto; grid-row:auto; grid-template-columns:1fr 1fr; }
  .stat-num { font-size:28px; }
  .section-header { margin-bottom:20px; }
  .week-header { flex-wrap:wrap; gap:12px; }
  .cards { grid-template-columns:1fr; }
  .mindmap-card { padding:12px; }
  .path-section {
    background:var(--color-card);
  }
  .path-map {
    gap:18px;
  }
  .phase-meta {
    display:grid;
    grid-template-columns:1fr;
    padding:18px;
    border-radius:14px;
  }
  .phase-kicker,
  .phase-meta h3,
  .phase-meta p,
  .phase-check {
    grid-column:1;
  }
  .phase-meta h3 {
    margin:0;
  }
  .phase-meta p {
    max-width:none;
    font-size:14px;
  }
  .phase-lessons,
  .phase-2 .phase-lessons,
  .phase-3 .phase-lessons,
  .phase-4 .phase-lessons {
    grid-template-columns:1fr;
    gap:12px;
    padding:18px 18px 18px 34px;
  }
  .phase-lessons::before {
    left:22px;
    right:auto;
    top:28px;
    bottom:28px;
    width:2px;
    height:auto;
    background:linear-gradient(180deg, color-mix(in srgb, var(--phase-accent) 38%, transparent), color-mix(in srgb, var(--phase-accent) 8%, transparent));
  }
  .path-node,
  .path-node:nth-child(even) {
    margin-top:0;
  }
  .path-node {
    min-height:0;
    padding:14px;
    border-radius:13px;
  }
  .path-node:hover {
    transform:translateY(-2px);
  }
  .path-name {
    font-size:17px;
  }
  .path-node-footer {
    align-items:flex-start;
  }
  .path-state {
    margin-left:0;
  }
}
</style>
