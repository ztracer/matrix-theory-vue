<template>
  <div class="home-page">
    <!-- Hero -->
    <section class="hero">
      <div class="floating-math" v-for="(m, i) in mathSymbols" :key="i" :style="m.style">{{ m.sym }}</div>
      <div class="container hero-content">
        <span class="hero-badge">MATRIX THEORY · INTERACTIVE LEARNING</span>
        <h1>矩阵论<br>可视化交互学习</h1>
        <p class="hero-subtitle">
          通过 Vue 驱动的 SVG/Canvas 动画，直观理解矩阵论的几何意义与代数本质。
          <br>11 个核心知识点，33+ 交互动画，让抽象概念一目了然。
        </p>
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
      </div>
      <div class="scroll-hint">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>
    </section>

    <!-- Mind Map -->
    <section class="section mindmap-section" id="mindmap">
      <div class="container">
        <div class="section-header">
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

          <div class="mm-tooltip" ref="tip" :class="{ show: tipShow }">{{ tipText }}</div>

          <div class="mm-legend">
            <div v-for="g in knowledgeGroups.slice(1)" :key="g.id" class="legend-item"><span class="dot" :style="{ background: g.color }"></span>{{ g.label }}</div>
            <div v-for="(type, key) in edgeTypes" :key="key" class="legend-item"><span class="edge-sample" :style="{ borderTopColor: type.color, borderTopStyle: type.dash ? 'dashed' : 'solid' }"></span>{{ type.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Lessons -->
    <section class="section lessons-section" id="lessons">
      <div class="container">
        <div class="section-header">
          <div class="section-tag">Interactive Lessons</div>
          <h2>📚 课程内容</h2>
          <p class="section-desc">每个知识点包含概念讲解、交互动画、定理公式和真题详解</p>
        </div>

        <!-- Week 1 -->
        <div class="week-block">
          <div class="week-header">
            <span class="week-badge w1">WEEK 1</span>
            <div>
              <div class="week-title">空间变换与标准形</div>
              <div class="week-theme">线性空间 → 线性变换 → 特征分析 → 矩阵函数</div>
            </div>
          </div>
          <div class="cards">
            <router-link v-for="l in week1" :key="l.id" :to="l.path" class="card w1">
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
                <span class="card-arrow">→</span>
              </div>
            </router-link>
          </div>
        </div>

        <!-- Week 2 -->
        <div class="week-block">
          <div class="week-header">
            <span class="week-badge w2">WEEK 2</span>
            <div>
              <div class="week-title">矩阵分解与广义逆</div>
              <div class="week-theme">三角分解 → QR分解 → SVD → 广义逆</div>
            </div>
          </div>
          <div class="cards">
            <router-link v-for="l in week2" :key="l.id" :to="l.path" class="card w2">
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
                <span class="card-arrow">→</span>
              </div>
            </router-link>
          </div>
        </div>

        <!-- Week 3 -->
        <div class="week-block">
          <div class="week-header">
            <span class="week-badge w3">WEEK 3</span>
            <div>
              <div class="week-title">应用专题与真题模拟</div>
              <div class="week-theme">投影应用 → 最小二乘 → 特征值估计 → 考前冲刺</div>
            </div>
          </div>
          <div class="cards">
            <router-link v-for="l in week3" :key="l.id" :to="l.path" class="card w3">
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
                <span class="card-arrow">→</span>
              </div>
            </router-link>
          </div>
        </div>

        <!-- Week 4 -->
        <section id="week4" class="week-section week4">
          <h2 class="week-title">
            <span class="week-num">WEEK 4</span>
            课后作业与真题
          </h2>
          <p class="week-desc">教材课后习题详解与历年真题汇总，支持按知识点检索</p>
          <div class="week4-links">
            <router-link to="/homework" class="week4-card homework">
              <span class="card-icon">📝</span>
              <span class="card-title">课后作业</span>
              <span class="card-desc">教材习题精解（62道）</span>
            </router-link>
            <router-link to="/exam" class="week4-card exam">
              <span class="card-icon">📋</span>
              <span class="card-title">真题汇总</span>
              <span class="card-desc">历年考试真题（34道）</span>
            </router-link>
          </div>
        </section>
      </div>
    </section>

    <!-- Learning Path -->
    <section class="section path-section">
      <div class="container">
        <div class="section-header">
          <div class="section-tag">Learning Path</div>
          <h2>🗺️ 推荐学习路径</h2>
          <p class="section-desc">从基础到应用，循序渐进掌握矩阵论</p>
        </div>
        <div class="path-timeline">
          <div class="path-line"></div>
          <div v-for="(s, i) in path" :key="i" class="path-item">
            <div class="path-dot" :class="'w' + Math.ceil((i+1)/4) === 'w1' ? 'w1' : Math.ceil((i+1)/4) === 2 ? 'w2' : 'w3'">{{ i+1 }}</div>
            <router-link :to="s.path" class="path-content">
              <div class="path-step">{{ s.step }}</div>
              <div class="path-name">{{ s.name }}</div>
              <div class="path-desc">{{ s.desc }}</div>
            </router-link>
          </div>
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
        <div class="footer-copy">© 2025 Matrix Theory Interactive Learning · Vue + Vite 重构版</div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { quizBank, lessonMeta } from '@/data/quizBank'
import { homeworkBank } from '../data/homeworkBank'
import { knowledgeEdges, knowledgeGroups, knowledgeNodes, edgeTypes } from '../data/knowledgeGraph'
import { useKatex } from '../composables/useKatex'

useKatex()

const router = useRouter()
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

const path = [
  {step:'基础概念',name:'线性空间与子空间',desc:'公理体系、子空间、基维数、直和',path:'/lesson/01'},
  {step:'映射观点',name:'线性变换及其矩阵',desc:'矩阵表示、相似、核与像',path:'/lesson/02'},
  {step:'特征分析',name:'Jordan标准形',desc:'特征值、重数、Jordan块',path:'/lesson/03'},
  {step:'动态系统',name:'矩阵函数与微分方程',desc:'矩阵指数、相图、稳定性',path:'/lesson/04'},
  {step:'基本分解',name:'LU与QR分解',desc:'Gauss消元、正交化、反射',path:'/lesson/05'},
  {step:'核心分解',name:'SVD奇异值分解',desc:'旋转-拉伸-旋转、低秩逼近',path:'/lesson/06'},
  {step:'逆的推广',name:'Moore-Penrose广义逆',desc:'Penrose方程、广义逆双重角色',path:'/lesson/07'},
  {step:'几何应用',name:'投影矩阵',desc:'正交投影、斜投影、幂等性',path:'/lesson/08'},
  {step:'数据拟合',name:'最小二乘与范数',desc:'正规方程、残差正交、范数',path:'/lesson/09'},
  {step:'特征值界',name:'盖尔圆盘估计',desc:'圆盘定理、隔离、Rayleigh商',path:'/lesson/10'},
  {step:'冲刺备考',name:'考前复习与真题',desc:'模板总结、解题流程、易错点',path:'/lesson/11'},
]

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
.home-page { overflow-x: hidden; }

/* Hero */
.hero {
  min-height: 100vh;
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 25%, #4338ca 55%, #7c3aed 100%);
  color: #fff;
  padding: 40px 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.hero::before {
  content:''; position:absolute; inset:0;
  background-image:
    radial-gradient(circle at 20% 30%, rgba(255,255,255,.08) 0%, transparent 45%),
    radial-gradient(circle at 80% 70%, rgba(236,72,153,.12) 0%, transparent 45%);
  pointer-events: none;
}
.floating-math {
  position: absolute;
  font-family: 'Cambria Math', 'Times New Roman', serif;
  font-weight: 700;
  opacity: .07;
  color: #fff;
  animation: float 20s ease-in-out infinite;
  pointer-events: none;
}
@keyframes float {
  0%,100% { transform: translate(0,0) rotate(0deg); }
  50% { transform: translate(20px,-20px) rotate(5deg); }
}
.hero-content { text-align: center; position: relative; z-index:1; }
.hero-badge {
  display:inline-block; background:rgba(255,255,255,.12);
  backdrop-filter:blur(12px); padding:8px 22px;
  border-radius:30px; font-size:13px; margin-bottom:24px;
  border:1px solid rgba(255,255,255,.2); letter-spacing:2px;
}
.hero h1 {
  font-size: clamp(36px, 7vw, 68px);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 20px;
  background: linear-gradient(135deg,#fff 0%,#c7d2fe 50%,#fbcfe8 100%);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
}
.hero-subtitle {
  font-size: clamp(15px, 2vw, 18px);
  color: #c7d2fe;
  max-width: 650px;
  margin: 0 auto 36px;
  line-height: 1.8;
}
.hero-stats { display:flex; gap:36px; justify-content:center; margin-bottom:36px; flex-wrap:wrap; }
.stat-num {
  font-size:36px; font-weight:800;
  background:linear-gradient(135deg,#fbbf24,#f59e0b);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
}
.stat-label { font-size:13px; color:#a5b4fc; margin-top:4px; }
.hero-btns { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }
.btn {
  padding:14px 30px; border-radius:12px; font-size:15px; font-weight:600;
  text-decoration:none; transition:all .3s; cursor:pointer; border:none;
}
.btn-primary {
  background:linear-gradient(135deg,#fbbf24,#f59e0b); color:#78350f;
  box-shadow:0 8px 32px rgba(251,191,36,.35);
}
.btn-primary:hover { transform:translateY(-2px); box-shadow:0 12px 40px rgba(251,191,36,.5); text-decoration:none; }
.btn-secondary {
  background:rgba(255,255,255,.1); color:#fff;
  border:1px solid rgba(255,255,255,.3); backdrop-filter:blur(10px);
}
.btn-secondary:hover { background:rgba(255,255,255,.2); transform:translateY(-2px); text-decoration:none; }
.btn-exam {
  background:linear-gradient(135deg,#ec4899,#f43f5e); color:#fff;
  box-shadow:0 8px 32px rgba(236,72,153,.35); animation:pulse-exam 2.5s ease-in-out infinite;
}
.btn-exam:hover { transform:translateY(-2px); box-shadow:0 12px 40px rgba(236,72,153,.5); text-decoration:none; }
@keyframes pulse-exam {
  0%,100% { box-shadow:0 8px 32px rgba(236,72,153,.35); }
  50% { box-shadow:0 12px 48px rgba(236,72,153,.55); }
}
.btn-homework {
  background:linear-gradient(135deg,#059669,#10b981); color:#fff;
  box-shadow:0 8px 32px rgba(5,150,105,.35); transition:all .3s;
}
.btn-homework:hover { transform:translateY(-2px); box-shadow:0 12px 40px rgba(5,150,105,.5); text-decoration:none; }
.scroll-hint {
  position:absolute; bottom:28px; left:50%; transform:translateX(-50%);
  animation:bounce 2s infinite; opacity:.5; color:#fff;
}
@keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(10px)} }

/* Section base */
.section { padding: 80px 0; }
.section-header { text-align:center; margin-bottom:48px; }
.section-tag {
  display:inline-block; font-size:12px; font-weight:700;
  text-transform:uppercase; letter-spacing:3px;
  color:var(--primary); margin-bottom:10px;
}
.section-header h2 {
  font-size:clamp(26px,4vw,38px); font-weight:800;
  color:var(--text); margin-bottom:10px;
}
.section-desc { color:var(--text-light); font-size:15px; max-width:600px; margin:0 auto; }

/* Mind Map */
.mindmap-section { background: linear-gradient(180deg,#fff 0%,#f8fafc 100%); }
.mindmap-card {
  background:#fff; border-radius:20px;
  box-shadow:0 4px 40px rgba(0,0,0,.06);
  border:1px solid var(--border);
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
  border:1px solid #e2e8f0;
  background:#fff;
  color:#475569;
  border-radius:999px;
  padding:8px 16px;
  font-size:13px;
  font-weight:700;
  cursor:pointer;
  transition:all .2s;
}
.kg-filter:hover,
.kg-filter.active {
  color:#fff;
  background:var(--group-color);
  border-color:var(--group-color);
  box-shadow:0 8px 20px color-mix(in srgb, var(--group-color) 24%, transparent);
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
  border-radius:14px;
  background:
    linear-gradient(90deg, rgba(248,250,252,.96), rgba(255,255,255,.96)),
    repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(226,232,240,.45) 80px);
}
.kg-lanes text {
  fill:#64748b;
  font-size:13px;
  font-weight:800;
  letter-spacing:.5px;
}
.kg-lanes line {
  stroke:#e2e8f0;
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
  stroke:rgba(255,255,255,.72);
  stroke-width:1.5;
  filter:drop-shadow(0 8px 14px rgba(15,23,42,.12));
  transition:filter .2s, stroke .2s, stroke-width .2s;
}
.kg-node:hover rect,
.kg-node.selected rect {
  filter:brightness(1.08) drop-shadow(0 12px 22px rgba(15,23,42,.18));
  stroke:#0f172a;
  stroke-width:2;
}
.kg-node.muted {
  opacity:.34;
}
.kg-node.related {
  opacity:1;
}
.mm-tooltip {
  position:absolute; background:#1e293b; color:#fff;
  padding:12px 16px; border-radius:10px; font-size:13px;
  max-width:320px; pointer-events:none; opacity:0;
  transition:opacity .15s; z-index:10; line-height:1.7;
  box-shadow:0 8px 24px rgba(0,0,0,.25); white-space:pre-line;
}
.mm-tooltip.show { opacity:1; }
.mm-tooltip::after {
  content:''; position:absolute; bottom:-6px; left:50%;
  transform:translateX(-50%); border-left:6px solid transparent;
  border-right:6px solid transparent; border-top:6px solid #1e293b;
}
.mm-legend {
  display:flex; gap:24px; justify-content:center;
  margin-top:20px; flex-wrap:wrap; font-size:13px; color:var(--text-light);
}
.legend-item { display:flex; align-items:center; gap:8px; }
.legend-item .dot { width:14px; height:14px; border-radius:50%; }
.edge-sample {
  width:24px;
  height:0;
  border-top:2px solid #94a3b8;
}

/* Week blocks */
.week-block { margin-bottom:56px; }
.week-header {
  display:flex; align-items:center; gap:16px;
  margin-bottom:24px; padding-bottom:16px;
  border-bottom:2px solid var(--border);
}
.week-badge {
  padding:8px 20px; border-radius:30px; color:#fff;
  font-weight:700; font-size:14px;
  box-shadow:0 4px 12px rgba(0,0,0,.12);
}
.week-badge.w1 { background:linear-gradient(135deg,#4338ca,#6366f1); }
.week-badge.w2 { background:linear-gradient(135deg,#0d9488,#14b8a6); }
.week-badge.w3 { background:linear-gradient(135deg,#ea580c,#f97316); }
.week-title { font-size:22px; font-weight:700; color:var(--text); }
.week-theme { color:var(--text-light); font-size:14px; }

/* Cards */
.cards { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:20px; }
.card {
  background:#fff; border-radius:16px; padding:24px;
  border:1px solid var(--border); text-decoration:none; color:var(--text);
  transition:all .3s cubic-bezier(.4,0,.2,1); position:relative; overflow:hidden; display:block;
}
.card::before {
  content:''; position:absolute; top:0; left:0; right:0; height:4px;
  transition:height .3s;
}
.card.w1::before { background:linear-gradient(90deg,#4338ca,#7c3aed); }
.card.w2::before { background:linear-gradient(90deg,#0d9488,#06b6d4); }
.card.w3::before { background:linear-gradient(90deg,#ea580c,#ec4899); }
.card:hover { transform:translateY(-5px); box-shadow:0 20px 50px rgba(0,0,0,.1); border-color:transparent; text-decoration:none; }
.card:hover::before { height:6px; }
.card-num {
  position:absolute; top:12px; right:16px;
  font-size:48px; font-weight:800; line-height:1; opacity:.12;
}
.card.w1 .card-num { color:var(--w1); }
.card.w2 .card-num { color:var(--w2); }
.card.w3 .card-num { color:var(--w3); }
.card-icon {
  width:48px; height:48px; border-radius:12px;
  display:flex; align-items:center; justify-content:center; font-size:22px;
}
.card.w1 .card-icon { background:linear-gradient(135deg,#eef2ff,#e0e7ff); }
.card.w2 .card-icon { background:linear-gradient(135deg,#f0fdfa,#ccfbf1); }
.card.w3 .card-icon { background:linear-gradient(135deg,#fff7ed,#ffedd5); }
.card-title { font-size:18px; font-weight:700; margin:14px 0 4px; }
.card-en { font-size:12px; color:var(--text-light); font-style:italic; margin-bottom:10px; }
.card-desc { font-size:13px; color:var(--text-light); line-height:1.7; margin-bottom:14px; }
.card-tags { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:14px; }
.tag {
  font-size:11px; padding:3px 10px; border-radius:20px; font-weight:500;
}
.card.w1 .tag { background:#eef2ff; color:var(--w1); }
.card.w2 .tag { background:#f0fdfa; color:var(--w2); }
.card.w3 .tag { background:#fff7ed; color:var(--w3); }
.card-footer {
  display:flex; justify-content:space-between; align-items:center;
  padding-top:12px; border-top:1px solid var(--border);
}
.card-anim { font-size:12px; color:var(--text-light); }
.card-arrow { font-size:20px; transition:transform .3s; }
.card.w1 .card-arrow { color:var(--w1-light); }
.card.w2 .card-arrow { color:var(--w2); }
.card.w3 .card-arrow { color:var(--w3); }
.card:hover .card-arrow { transform:translateX(6px); }

/* Path timeline */
.path-section { background:linear-gradient(180deg,#f8fafc 0%,#fff 100%); }
.path-timeline { position:relative; max-width:760px; margin:0 auto; }
.path-line {
  position:absolute; left:24px; top:0; bottom:0; width:3px;
  background:linear-gradient(180deg,var(--w1),var(--w2),var(--w3));
  border-radius:2px;
}
.path-item { display:flex; gap:20px; margin-bottom:20px; position:relative; }
.path-dot {
  width:48px; height:48px; border-radius:50%;
  display:flex; align-items:center; justify-content:center;
  color:#fff; font-weight:700; flex-shrink:0; z-index:1;
  box-shadow:0 4px 12px rgba(0,0,0,.15);
}
.path-dot.w1 { background:linear-gradient(135deg,#4338ca,#6366f1); }
.path-dot.w2 { background:linear-gradient(135deg,#0d9488,#14b8a6); }
.path-dot.w3 { background:linear-gradient(135deg,#ea580c,#f97316); }

/* Week 4 */
.week-section.week4 {
  text-align: center;
  padding: 48px 0;
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 50%, #f0fdfa 100%);
  border-radius: 20px;
  border: 2px solid #a7f3d0;
  margin-bottom: 24px;
}
.week-section.week4 .week-title {
  font-size: 28px;
  font-weight: 800;
  color: #065f46;
  margin-bottom: 10px;
}
.week-num {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, #059669, #10b981);
  margin-right: 10px;
  vertical-align: middle;
}
.week-desc {
  font-size: 15px;
  color: #047857;
  margin-bottom: 28px;
}
.week4-links {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}
.week4-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 28px 36px;
  border-radius: 16px;
  text-decoration: none;
  color: #1e293b;
  transition: all .3s cubic-bezier(.4,0,.2,1);
  min-width: 200px;
}
.week4-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0,0,0,.1);
  text-decoration: none;
}
.week4-card.homework {
  background: linear-gradient(135deg, #fff, #ecfdf5);
  border: 2px solid #6ee7b7;
}
.week4-card.homework:hover {
  border-color: #34d399;
  background: linear-gradient(135deg, #ecfdf5, #d1fae5);
}
.week4-card.exam {
  background: linear-gradient(135deg, #fff, #fce7f3);
  border: 2px solid #f9a8d4;
}
.week4-card.exam:hover {
  border-color: #f472b6;
  background: linear-gradient(135deg, #fce7f3, #fbcfe8);
}
.week4-card .card-icon { font-size: 36px; }
.week4-card .card-title { font-size: 20px; font-weight: 700; }
.week4-card .card-desc { font-size: 13px; color: var(--text-light); }
.path-content {
  background:#fff; border-radius:12px; padding:16px 20px;
  border:1px solid var(--border); flex:1; transition:all .2s;
  color:var(--text); text-decoration:none; display:block;
}
.path-content:hover { box-shadow:0 8px 24px rgba(0,0,0,.06); transform:translateX(4px); text-decoration:none; }
.path-step { font-size:11px; font-weight:600; color:var(--text-light); text-transform:uppercase; letter-spacing:1px; margin-bottom:4px; }
.path-name { font-size:16px; font-weight:700; margin-bottom:4px; }
.path-desc { font-size:13px; color:var(--text-light); }

/* Footer */
.home-footer {
  background:#1e1b4b; color:#a5b4fc;
  padding:48px 24px 28px; text-align:center;
}
.home-footer h3 { color:#fff; font-size:20px; margin-bottom:10px; }
.home-footer p { font-size:14px; margin-bottom:20px; opacity:.8; }
.footer-tech { display:flex; gap:16px; justify-content:center; flex-wrap:wrap; margin-bottom:24px; }
.footer-tech span {
  background:rgba(255,255,255,.08); padding:6px 14px;
  border-radius:20px; font-size:13px;
}
.footer-copy { font-size:12px; opacity:.5; border-top:1px solid rgba(255,255,255,.1); padding-top:20px; }

@media (max-width:768px) {
  .hero-stats { gap:20px; }
  .stat-num { font-size:28px; }
  .cards { grid-template-columns:1fr; }
  .mindmap-card { padding:12px; }
}
</style>
