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
          <a href="#mindmap" class="btn btn-primary">🗺️ 知识地图</a>
          <a href="#lessons" class="btn btn-secondary">📚 开始学习</a>
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
          <h2>📊 知识体系架构图</h2>
          <p class="section-desc">点击节点跳转学习，理解各章节间的逻辑关联</p>
        </div>
        <div class="mindmap-card" @mousemove="moveTip" @mouseleave="hideTip">
          <svg viewBox="0 0 1000 620" class="mindmap-svg">
            <defs>
              <linearGradient id="gRoot" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#4f46e5"/><stop offset="50%" stop-color="#7c3aed"/><stop offset="100%" stop-color="#ec4899"/>
              </linearGradient>
              <linearGradient id="gW1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#4338ca"/><stop offset="100%" stop-color="#6366f1"/>
              </linearGradient>
              <linearGradient id="gW2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#0d9488"/><stop offset="100%" stop-color="#14b8a6"/>
              </linearGradient>
              <linearGradient id="gW3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#ea580c"/><stop offset="100%" stop-color="#f97316"/>
              </linearGradient>
            </defs>

            <!-- Connections (curved paths) -->
            <g class="edges">
              <!-- Root to Week nodes -->
              <path d="M500,330 C400,260 280,200 200,170" stroke="#c7d2fe" stroke-width="2.5" fill="none"/>
              <path d="M500,330 C500,240 500,180 500,150" stroke="#99f6e4" stroke-width="2.5" fill="none"/>
              <path d="M500,330 C600,260 720,200 800,170" stroke="#fed7aa" stroke-width="2.5" fill="none"/>

              <!-- Week 1 chain: w1→01→02→03→04→root -->
              <path d="M200,170 C160,220 130,270 110,320" stroke="#a5b4fc" stroke-width="2" fill="none"/>
              <path d="M110,320 C140,370 170,420 200,450" stroke="#a5b4fc" stroke-width="2" fill="none"/>
              <path d="M200,450 C260,440 320,410 380,390" stroke="#a5b4fc" stroke-width="2" fill="none"/>
              <path d="M380,390 C400,395 410,398 420,400" stroke="#a5b4fc" stroke-width="2" fill="none"/>
              <path d="M420,400 C440,380 470,350 500,330" stroke="#a5b4fc" stroke-width="2" fill="none" stroke-dasharray="4,4"/>

              <!-- Week 2 chain: w2→05→root, w2→06→07, w2→07, 07→root -->
              <path d="M500,150 C450,200 420,250 400,290" stroke="#5eead4" stroke-width="2" fill="none"/>
              <path d="M400,290 C430,305 465,320 500,330" stroke="#5eead4" stroke-width="2" fill="none" stroke-dasharray="4,4"/>
              <path d="M500,150 C550,200 580,250 600,290" stroke="#5eead4" stroke-width="2" fill="none"/>
              <path d="M600,290 C570,350 530,410 500,460" stroke="#5eead4" stroke-width="2" fill="none" stroke-dasharray="4,4"/>
              <path d="M500,150 C500,250 500,360 500,460" stroke="#5eead4" stroke-width="2" fill="none"/>
              <path d="M500,460 C500,420 500,370 500,330" stroke="#5eead4" stroke-width="2" fill="none" stroke-dasharray="4,4"/>

              <!-- Week 3 chain: w3→08→root, w3→09→08, w3→10→11, 11→w3 -->
              <path d="M800,170 C740,220 700,270 680,320" stroke="#fdba74" stroke-width="2" fill="none"/>
              <path d="M680,320 C630,325 570,328 500,330" stroke="#fdba74" stroke-width="2" fill="none" stroke-dasharray="4,4"/>
              <path d="M800,170 C820,230 830,290 820,350" stroke="#fdba74" stroke-width="2" fill="none"/>
              <path d="M820,350 C770,345 720,335 680,320" stroke="#fdba74" stroke-width="2" fill="none" stroke-dasharray="4,4"/>
              <path d="M800,170 C860,240 900,310 910,380" stroke="#fdba74" stroke-width="2" fill="none"/>
              <path d="M910,380 C880,420 850,470 830,500" stroke="#fdba74" stroke-width="2" fill="none"/>
              <path d="M830,500 C820,400 810,280 800,170" stroke="#f9a8d4" stroke-width="2" fill="none" stroke-dasharray="4,4"/>
            </g>

            <!-- Root node -->
            <g class="mm-node" @click="go('/')" @mouseenter="showTip($event, rootInfo)">
              <circle cx="500" cy="330" r="50" fill="url(#gRoot)"/>
              <text x="500" y="325" text-anchor="middle" fill="#fff" font-weight="700" font-size="17">矩阵论</text>
              <text x="500" y="345" text-anchor="middle" fill="rgba(255,255,255,.8)" font-size="11">Matrix Theory</text>
            </g>

            <!-- Week nodes -->
            <g class="mm-node" @mouseenter="showTip($event, weekInfo[0])">
              <circle cx="200" cy="170" r="38" fill="url(#gW1)"/>
              <text x="200" y="166" text-anchor="middle" fill="#fff" font-weight="600" font-size="12">第1周</text>
              <text x="200" y="182" text-anchor="middle" fill="rgba(255,255,255,.85)" font-size="10">空间变换</text>
            </g>
            <g class="mm-node" @mouseenter="showTip($event, weekInfo[1])">
              <circle cx="500" cy="150" r="38" fill="url(#gW2)"/>
              <text x="500" y="146" text-anchor="middle" fill="#fff" font-weight="600" font-size="12">第2周</text>
              <text x="500" y="162" text-anchor="middle" fill="rgba(255,255,255,.85)" font-size="10">矩阵分解</text>
            </g>
            <g class="mm-node" @mouseenter="showTip($event, weekInfo[2])">
              <circle cx="800" cy="170" r="38" fill="url(#gW3)"/>
              <text x="800" y="166" text-anchor="middle" fill="#fff" font-weight="600" font-size="12">第3周</text>
              <text x="800" y="182" text-anchor="middle" fill="rgba(255,255,255,.85)" font-size="10">应用专题</text>
            </g>

            <!-- Week 1 topic nodes -->
            <g v-for="n in w1Nodes" :key="n.id" class="mm-node topic" @click="go(n.path)" @mouseenter="showTip($event, n)">
              <circle :cx="n.x" :cy="n.y" r="30" :fill="n.color"/>
              <text :x="n.x" :y="n.y - 2" text-anchor="middle" fill="#fff" font-weight="600" font-size="11">{{ n.label1 }}</text>
              <text :x="n.x" :y="n.y + 11" text-anchor="middle" fill="rgba(255,255,255,.9)" font-size="10">{{ n.label2 }}</text>
            </g>

            <!-- Week 2 topic nodes -->
            <g v-for="n in w2Nodes" :key="n.id" class="mm-node topic" @click="go(n.path)" @mouseenter="showTip($event, n)">
              <circle :cx="n.x" :cy="n.y" r="30" :fill="n.color"/>
              <text :x="n.x" :y="n.y - 2" text-anchor="middle" fill="#fff" font-weight="600" font-size="11">{{ n.label1 }}</text>
              <text :x="n.x" :y="n.y + 11" text-anchor="middle" fill="rgba(255,255,255,.9)" font-size="10">{{ n.label2 }}</text>
            </g>

            <!-- Week 3 topic nodes -->
            <g v-for="n in w3Nodes" :key="n.id" class="mm-node topic" @click="go(n.path)" @mouseenter="showTip($event, n)">
              <circle :cx="n.x" :cy="n.y" r="30" :fill="n.color"/>
              <text :x="n.x" :y="n.y - 2" text-anchor="middle" fill="#fff" font-weight="600" font-size="11">{{ n.label1 }}</text>
              <text :x="n.x" :y="n.y + 11" text-anchor="middle" fill="rgba(255,255,255,.9)" font-size="10">{{ n.label2 }}</text>
            </g>
          </svg>

          <div class="mm-tooltip" ref="tip" :class="{ show: tipShow }">{{ tipText }}</div>

          <div class="mm-legend">
            <div class="legend-item"><span class="dot" style="background:linear-gradient(135deg,#4338ca,#6366f1)"></span>第1周：空间与标准形</div>
            <div class="legend-item"><span class="dot" style="background:linear-gradient(135deg,#0d9488,#14b8a6)"></span>第2周：分解与广义逆</div>
            <div class="legend-item"><span class="dot" style="background:linear-gradient(135deg,#ea580c,#f97316)"></span>第3周：应用与真题</div>
            <div class="legend-item"><span class="dot dashed"></span>知识点依赖</div>
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
                <span class="card-anim">🎬 {{ l.anims }} 个动画 · 📝 {{ getQuizCount(l.id) }} 道真题</span>
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
                <span class="card-anim">🎬 {{ l.anims }} 个动画 · 📝 {{ getQuizCount(l.id) }} 道真题</span>
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
                <span class="card-anim">🎬 {{ l.anims }} 个动画 · 📝 {{ getQuizCount(l.id) }} 道真题</span>
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

const router = useRouter()
const tip = ref(null)
const tipShow = ref(false)
const tipText = ref('')

// 动态获取某课的真题数量
const getQuizCount = (id) => quizBank[id]?.length || 0

// Hero区动态统计
const totalLessons = lessonMeta.length
const totalAnims = lessonMeta.reduce((s, l) => s + l.anims, 0)
const totalQuizzes = Object.values(quizBank).reduce((s, q) => s + q.length, 0)
const totalWeeks = new Set(lessonMeta.map(l => l.week)).size

const mathSymbols = [
  { sym: 'A=UΣVᵀ', style: 'top:8%;left:5%;font-size:42px;animation-delay:0s' },
  { sym: 'eᴬᵗ', style: 'top:15%;right:8%;font-size:56px;animation-delay:-5s' },
  { sym: 'J=P⁻¹AP', style: 'bottom:20%;left:8%;font-size:36px;animation-delay:-10s' },
  { sym: 'Ax=λx', style: 'bottom:12%;right:5%;font-size:48px;animation-delay:-15s' },
]

const rootInfo = { tip: '矩阵论 Matrix Theory\n\n研究线性空间上线性变换的数学分支，核心思想：几何直观 + 代数计算。' }
const weekInfo = [
  { tip: '第1周：空间变换与标准形\n建立线性空间和线性变换的基本概念，通过特征值分析得到标准形。' },
  { tip: '第2周：矩阵分解与广义逆\n矩阵分解（LU, QR, SVD）与广义逆理论，是数值计算的核心工具。' },
  { tip: '第3周：应用专题与真题\n投影、最小二乘、特征值估计等应用，结合真题进行考前冲刺。' },
]

const w1Nodes = [
  { id:'01', x:110, y:320, color:'#4f46e5', label1:'线性', label2:'空间', path:'/lesson/01',
    tip:'01 线性空间与子空间\n8条公理、子空间判定、基与维数、直和分解、维数公式。' },
  { id:'02', x:200, y:450, color:'#6366f1', label1:'线性', label2:'变换', path:'/lesson/02',
    tip:'02 线性变换及其矩阵\n矩阵表示、相似变换、核与像、Gram-Schmidt正交化、Householder反射。' },
  { id:'03', x:380, y:390, color:'#7c3aed', label1:'Jordan', label2:'标准形', path:'/lesson/03',
    tip:'03 对角化与Jordan标准形\n特征值特征向量、代数与几何重数、Jordan块、Jordan链。' },
  { id:'04', x:420, y:400, color:'#8b5cf6', label1:'矩阵', label2:'函数', path:'/lesson/04',
    tip:'04 矩阵函数与微分方程\n矩阵指数、相图分析、线性微分方程组求解。' },
]

const w2Nodes = [
  { id:'05', x:400, y:290, color:'#0d9488', label1:'LU/QR', label2:'分解', path:'/lesson/05',
    tip:'05 三角分解与QR分解\nLU分解（Gauss消元）、QR分解、Gram-Schmidt、Householder反射。' },
  { id:'06', x:600, y:290, color:'#14b8a6', label1:'SVD', label2:'分解', path:'/lesson/06',
    tip:'06 满秩分解与SVD\n奇异值分解、几何意义（旋转-拉伸-旋转）、最佳低秩逼近。' },
  { id:'07', x:500, y:460, color:'#10b981', label1:'M-P', label2:'广义逆', path:'/lesson/07',
    tip:'07 Moore-Penrose广义逆\n四个Penrose方程、广义逆的SVD构造、极小范数最小二乘解。' },
]

const w3Nodes = [
  { id:'08', x:680, y:320, color:'#ea580c', label1:'投影', label2:'矩阵', path:'/lesson/08',
    tip:'08 投影矩阵与应用\n幂等性（投影两次等于投影一次）、正交投影与斜投影、到列空间的投影。' },
  { id:'09', x:820, y:350, color:'#f97316', label1:'最小', label2:'二乘', path:'/lesson/09',
    tip:'09 最小二乘与范数\n最小二乘极小化、正规方程、向量与矩阵范数、谱半径。' },
  { id:'10', x:910, y:380, color:'#fb923c', label1:'特征值', label2:'估计', path:'/lesson/10',
    tip:'10 特征值估计与极大极小原理\n盖尔圆盘定理、隔离定理、Rayleigh商。' },
  { id:'11', x:830, y:500, color:'#ec4899', label1:'考前', label2:'复习', path:'/lesson/11',
    tip:'11 考前预测与复习\n高频计算与证明模板、解题流程、易错点总结。' },
]

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
.mindmap-svg { width:100%; height:auto; display:block; max-width:100%; }
.mm-node { cursor:pointer; }
.mm-node:hover circle { filter:brightness(1.15); }
.mm-node circle { transition:filter .2s; transform-origin:center; }
.mm-tooltip {
  position:absolute; background:#1e293b; color:#fff;
  padding:12px 16px; border-radius:10px; font-size:13px;
  max-width:260px; pointer-events:none; opacity:0;
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
.legend-item .dot.dashed {
  background:repeating-linear-gradient(45deg,#cbd5e1,#cbd5e1 3px,transparent 3px,transparent 6px);
  border:1px solid #cbd5e1;
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
