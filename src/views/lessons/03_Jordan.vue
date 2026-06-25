<template>
  <LessonLayout :lesson-id="3" title="对角化与Jordan标准形" subtitle="Diagonalization & Jordan Canonical Form">
    <Section num="1" title="特征值与特征向量">
      <p>设 <span class="formula-inline">A\in\mathbb{C}^{n\times n}</span>，若非零向量 <span class="formula-inline">x</span> 满足</p>
      <Theorem title="特征值定义" type="definition" icon="🎯">
        <Formula display>Ax = \lambda x,\quad x\neq 0</Formula>
        则 <span class="formula-inline">\lambda</span> 称为 <span class="formula-inline">A</span> 的<strong>特征值</strong>，<span class="formula-inline">x</span> 称为对应 <span class="formula-inline">\lambda</span> 的<strong>特征向量</strong>。
        <span class="formula-inline">\lambda</span> 是特征方程 <span class="formula-inline">\det(\lambda I-A)=0</span> 的根。
      </Theorem>

      <Theorem title="代数重数与几何重数" type="definition">
        <ul style="margin:0; padding-left:20px;">
          <li><strong>代数重数</strong> <span class="formula-inline">m(\lambda)</span>：<span class="formula-inline">\lambda</span> 作为特征多项式根的重数</li>
          <li><strong>几何重数</strong> <span class="formula-inline">g(\lambda)</span>：特征子空间 <span class="formula-inline">V_\lambda=\{x\mid Ax=\lambda x\}=\Ker(\lambda I-A)</span> 的维数，即 <span class="formula-inline">g(\lambda)=n-\rank(\lambda I-A)</span></li>
        </ul>
        <p style="margin-top:8px;">重要关系：<span class="formula-inline">1\leq g(\lambda)\leq m(\lambda)</span>。</p>
      </Theorem>

      <AnimationBox title="特征向量方向不变性" :playing="playing1" @play="play1" @pause="pause1" @reset="reset1"
        description="矩阵 A 作用于单位圆上各点（向量），得到椭圆。沿特征向量方向的向量仅被缩放（方向不变），其他方向向量同时被旋转和缩放。">
        <canvas ref="canvas1Ref" width="600" height="400" style="max-width:100%;width:100%;"></canvas>
      </AnimationBox>
    </Section>

    <Section num="2" title="矩阵对角化">
      <Theorem title="可对角化条件" type="theorem">
        <span class="formula-inline">A</span> 可对角化（即存在可逆矩阵 <span class="formula-inline">P</span> 使 <span class="formula-inline">P^{-1}AP=\Lambda</span> 为对角阵）
        <span class="formula-inline">\iff</span> <span class="formula-inline">A</span> 有 <span class="formula-inline">n</span> 个线性无关特征向量
        <span class="formula-inline">\iff</span> 对每个特征值 <span class="formula-inline">\lambda</span>，<span class="formula-inline">g(\lambda)=m(\lambda)</span>。
      </Theorem>
      <p>
        <strong>充分条件：</strong>若 <span class="formula-inline">A</span> 有 <span class="formula-inline">n</span> 个互异特征值，则 <span class="formula-inline">A</span> 可对角化。
      </p>
      <p>
        <strong>对角化方法：</strong>取 <span class="formula-inline">P=[x_1,x_2,\dots,x_n]</span>（特征向量为列），
        <span class="formula-inline">\Lambda=\operatorname{diag}(\lambda_1,\dots,\lambda_n)</span>，则 <span class="formula-inline">AP=P\Lambda</span>。
      </p>
    </Section>

    <Section num="3" title="Jordan 标准形">
      <p>当 <span class="formula-inline">A</span> 不可对角化时，通过广义特征向量可化为 Jordan 标准形——最接近对角形的"几乎对角"上三角矩阵。</p>

      <Theorem title="Jordan 块" type="definition" icon="🧱">
        <Formula display>J_k(\lambda) = \lambda I_k + N_k = \begin{pmatrix} \lambda & 1 & & \\ & \lambda & \ddots & \\ & & \ddots & 1 \\ & & & \lambda \end{pmatrix}_{k\times k}</Formula>
        其中 <span class="formula-inline">N_k</span> 是 <span class="formula-inline">k</span> 阶幂零矩阵（次对角线为1，其余为0），满足 <span class="formula-inline">N_k^k=0</span>。
      </Theorem>

      <Theorem title="Jordan 标准形定理" type="theorem">
        任意复方阵 <span class="formula-inline">A\in\mathbb{C}^{n\times n}</span> 都相似于一个 Jordan 矩阵
        <Formula display>J = \operatorname{diag}(J_{k_1}(\lambda_1), J_{k_2}(\lambda_2), \dots, J_{k_s}(\lambda_s))</Formula>
        其中各 Jordan 块的阶数和特征值由 <span class="formula-inline">A</span> 唯一确定（不计块的顺序）。
        Jordan 块的个数 <span class="formula-inline">s = \sum g(\lambda_i)</span> = 线性无关特征向量的总数。
      </Theorem>

      <AnimationBox title="Jordan 块的剪切效果" :playing="playing2" @play="play2" @pause="pause2" @reset="reset2"
        description="Jordan 块 J₂(λ)=[[λ,1],[0,λ]] 作用于正方形：不仅缩放，还产生沿 x 方向的剪切，这是不可对角化矩阵的特征——缺少一个方向的特征向量。">
        <canvas ref="canvas2Ref" width="600" height="400" style="max-width:100%;width:100%;"></canvas>
      </AnimationBox>
    </Section>

    <Section num="4" title="Jordan 链与广义特征向量">
      <Theorem title="Jordan 链" type="definition" icon="🔗">
        对应 <span class="formula-inline">k</span> 阶 Jordan 块 <span class="formula-inline">J_k(\lambda)</span>，存在<strong>广义特征向量</strong>链
        <span class="formula-inline">\{\xi_1,\xi_2,\dots,\xi_k\}</span>，满足
        <Formula display>(A-\lambda I)\xi_1 = 0,\quad (A-\lambda I)\xi_2 = \xi_1,\quad\dots,\quad (A-\lambda I)\xi_k = \xi_{k-1}</Formula>
        即 <span class="formula-inline">\xi_1</span> 是真正的特征向量，<span class="formula-inline">\xi_2,\dots,\xi_k</span> 是广义特征向量。
        这些向量构成 <span class="formula-inline">P</span> 中对应 Jordan 块的列。
      </Theorem>

      <Theorem title="Cayley-Hamilton 定理" type="theorem">
        设 <span class="formula-inline">\varphi(\lambda)=\det(\lambda I-A)</span> 为 <span class="formula-inline">A</span> 的特征多项式，则
        <Formula display>\varphi(A) = 0</Formula>
        即矩阵满足自身的特征方程。
      </Theorem>

      <AnimationBox title="Jordan 链构造 (A−λI)η = ξ" mode="auto"
        description="自动演示：从特征向量 ξ 出发，广义特征向量 η 经 (A−λI) 映射到 ξ，构成 Jordan 链。绿色标记为 Ker(A−λI)（特征子空间）。">
        <svg viewBox="0 0 600 400" style="width:100%;max-width:600px;">
          <defs>
            <marker id="arrG3" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#94a3b8"/></marker>
            <marker id="arrPk3j" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#ec4899"/></marker>
            <marker id="arrB3j" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#4338ca"/></marker>
            <marker id="arrO3j" markerWidth="10" markerHeight="8" refX="10" refY="4" orient="auto"><polygon points="0 0,10 4,0 8" fill="#f59e0b"/></marker>
          </defs>
          <!-- Left space -->
          <rect x="30" y="40" width="240" height="320" rx="12" fill="#eef2ff" stroke="#6366f1" stroke-width="1.5"/>
          <text x="150" y="65" text-anchor="middle" fill="#4338ca" font-weight="bold" font-size="14">原空间 V</text>
          <!-- Right space -->
          <rect x="330" y="40" width="240" height="320" rx="12" fill="#faf5ff" stroke="#7c3aed" stroke-width="1.5"/>
          <text x="450" y="65" text-anchor="middle" fill="#6d28d9" font-weight="bold" font-size="14">像空间 V</text>

          <!-- Axes in left -->
          <line x1="80" y1="300" x2="230" y2="300" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arrG3)"/>
          <line x1="80" y1="300" x2="80" y2="100" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arrG3)"/>
          <text x="235" y="305" fill="#64748b" font-size="11">x</text>
          <text x="70" y="95" fill="#64748b" font-size="11">y</text>

          <!-- Axes in right -->
          <line x1="380" y1="300" x2="530" y2="300" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arrG3)"/>
          <line x1="380" y1="300" x2="380" y2="100" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arrG3)"/>
          <text x="535" y="305" fill="#64748b" font-size="11">x</text>
          <text x="370" y="95" fill="#64748b" font-size="11">y</text>

          <!-- Eigenvector xi in left (red, along eigen-direction) -->
          <line x1="80" y1="300" :x2="80+xiX" :y2="300-xiY" stroke="#ec4899" stroke-width="3" marker-end="url(#arrPk3j)"/>
          <text :x="80+xiX+8" :y="300-xiY-5" fill="#be185d" font-weight="bold" font-size="14">ξ (特征向量)</text>

          <!-- Generalized eigenvector eta in left (blue, animated growing) -->
          <line x1="80" y1="300" :x2="80+etaX" :y2="300-etaY" stroke="#4338ca" stroke-width="3" marker-end="url(#arrB3j)"/>
          <text :x="80+etaX+8" :y="300-etaY-5" fill="#4338ca" font-weight="bold" font-size="14">η (广义特征向量)</text>

          <!-- (A-lambda I) mapping arrow across -->
          <path :d="`M ${80+etaX+20} ${300-etaY} C ${280} ${300-etaY-40}, ${330} ${300-xiY-40}, ${380+xiX-10} ${300-xiY}`"
                fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="6,3" marker-end="url(#arrO3j)"/>
          <text x="300" y="170" text-anchor="middle" fill="#d97706" font-weight="bold" font-size="13">(A−λI)</text>

          <!-- Image xi in right space -->
          <line x1="380" y1="300" :x2="380+xiX" :y2="300-xiY" stroke="#ec4899" stroke-width="3" marker-end="url(#arrPk3j)"/>
          <text :x="380+xiX+8" :y="300-xiY-5" fill="#be185d" font-weight="bold" font-size="14">ξ = (A−λI)η</text>

          <!-- Null space indicator (eigen-direction) -->
          <line x1="80" y1="300" :x2="80+xiX*0.4" :y2="300-xiY*0.4" stroke="#10b981" stroke-width="4" stroke-linecap="round" opacity="0.5"/>
          <text x="85" y="260" fill="#059669" font-size="11" opacity="0.7">Ker(A−λI)</text>

          <!-- Formula at bottom -->
          <text x="300" y="380" text-anchor="middle" fill="#4f46e5" font-size="15" font-weight="bold">(A−λI)ξ = 0    (A−λI)η = ξ    (A−λI)²η = 0</text>
        </svg>
      </AnimationBox>
    </Section>

    <Section num="5" title="真题例题详解">
      <ExampleBox source="2023年期末考试" badge="📝 真题">
        <template #problem>
          求矩阵 <span class="formula-inline">A=\begin{pmatrix} -1 & 1 & 0 \\ -4 & 3 & 0 \\ 1 & 0 & 2 \end{pmatrix}</span>
          的 Jordan 标准形 <span class="formula-inline">J</span> 及相似变换矩阵 <span class="formula-inline">P</span>。
        </template>
        <template #solution>
          <div class="step">
            <div class="step-num">1</div>
            <div class="step-text">
              <strong>求特征值：</strong>
              <Formula display>\det(\lambda I-A)=\begin{vmatrix}\lambda+1&-1&0\\4&\lambda-3&0\\-1&0&\lambda-2\end{vmatrix}=(\lambda-2)[(\lambda+1)(\lambda-3)+4]=(\lambda-2)(\lambda-1)^2</Formula>
              所以 <span class="formula-inline">\lambda_1=2</span>（代数重数 1），<span class="formula-inline">\lambda_2=1</span>（代数重数 2）。
            </div>
          </div>
          <div class="step">
            <div class="step-num">2</div>
            <div class="step-text">
              <strong>求 λ=2 的特征向量：</strong>
              解 <span class="formula-inline">(2I-A)x=0</span>：
              <span class="formula-inline">2I-A=\begin{pmatrix}3&-1&0\\4&-1&0\\-1&0&0\end{pmatrix}\to\begin{pmatrix}1&0&0\\0&1&0\\0&0&0\end{pmatrix}</span>，
              得 <span class="formula-inline">x_1=0,x_2=0</span>，取 <span class="formula-inline">p_1=(0,0,1)^T</span>。
            </div>
          </div>
          <div class="step">
            <div class="step-num">3</div>
            <div class="step-text">
              <strong>求 λ=1 的几何重数：</strong>
              <span class="formula-inline">I-A=\begin{pmatrix}2&-1&0\\4&-2&0\\-1&0&-1\end{pmatrix}\to\begin{pmatrix}2&-1&0\\0&0&0\\-1&0&-1\end{pmatrix}\to\begin{pmatrix}1&0&1\\0&1&2\\0&0&0\end{pmatrix}</span>，
              <span class="formula-inline">\rank(I-A)=2</span>，故 <span class="formula-inline">g(1)=3-2=1\lt m(1)=2</span>，
              对应一个 2 阶 Jordan 块。
            </div>
          </div>
          <div class="step">
            <div class="step-num">4</div>
            <div class="step-text">
              <strong>求特征向量 p₂（Jordan 链首）：</strong>
              由 <span class="formula-inline">(I-A)x=0</span>，取 <span class="formula-inline">x_3=1</span>，得 <span class="formula-inline">x_1=-1,x_2=-2</span>，
              所以 <span class="formula-inline">p_2=(-1,-2,1)^T</span>。
            </div>
          </div>
          <div class="step">
            <div class="step-num">5</div>
            <div class="step-text">
              <strong>求广义特征向量 p₃：</strong>解 <span class="formula-inline">(I-A)p_3=p_2</span>，即
              <Formula display>\begin{pmatrix}2&-1&0\\4&-2&0\\-1&0&-1\end{pmatrix}\begin{pmatrix}x_1\\x_2\\x_3\end{pmatrix}=\begin{pmatrix}-1\\-2\\1\end{pmatrix}</Formula>
              由前两个方程：<span class="formula-inline">2x_1-x_2=-1</span>，第三个：<span class="formula-inline">-x_1-x_3=1</span>。
              取 <span class="formula-inline">x_1=0</span>（自由取法），则 <span class="formula-inline">x_2=1,x_3=-1</span>，得
              <span class="formula-inline">p_3=(0,1,-1)^T</span>。
            </div>
          </div>
          <div class="step">
            <div class="step-num">6</div>
            <div class="step-text">
              <strong>写出结果：</strong>
              <Formula display>P = \begin{pmatrix}0&-1&0\\0&-2&1\\1&1&-1\end{pmatrix},\quad J = P^{-1}AP = \begin{pmatrix}2&0&0\\0&1&1\\0&0&1\end{pmatrix}</Formula>
            </div>
          </div>
        </template>
      </ExampleBox>

      <ExampleBox source="2020年期末考试" badge="📝 真题">
        <template #problem>
          判断 <span class="formula-inline">A=\begin{pmatrix}1&-3&4\\4&-7&8\\6&-7&7\end{pmatrix}</span> 是否可对角化；若不能，求其 Jordan 标准形。
        </template>
        <template #solution>
          <div class="step">
            <div class="step-num">1</div>
            <div class="step-text">
              <strong>特征多项式：</strong>
              <span class="formula-inline">\det(\lambda I-A)=(\lambda-3)(\lambda+1)^2</span>，
              所以 <span class="formula-inline">\lambda_1=3</span>（m=1），<span class="formula-inline">\lambda_2=-1</span>（m=2）。
            </div>
          </div>
          <div class="step">
            <div class="step-num">2</div>
            <div class="step-text">
              <strong>求 λ=−1 的几何重数：</strong>
              <span class="formula-inline">-I-A=\begin{pmatrix}-2&3&-4\\-4&6&-8\\-6&7&-8\end{pmatrix}\to\begin{pmatrix}-2&3&-4\\0&1&-2\\0&0&0\end{pmatrix}</span>，
              <span class="formula-inline">\rank(-I-A)=2</span>，<span class="formula-inline">g(-1)=1\lt 2</span>。
            </div>
          </div>
          <div class="step">
            <div class="step-num">3</div>
            <div class="step-text">
              <strong>结论：</strong>因 <span class="formula-inline">g(-1)=1\lt m(-1)=2</span>，A 不可对角化，Jordan 标准形为
              <Formula display>J = \begin{pmatrix}3&0&0\\0&-1&1\\0&0&-1\end{pmatrix}</Formula>
            </div>
          </div>
        </template>
      </ExampleBox>
    </Section>

    <Section title="🗂️ 真题与习题汇总">
      <WeekQuizBank :quizzes="quizzes" weekLabel="第1周" />
    </Section>

    <Section title="📌 知识点小结">
      <Steps :steps="[
        '特征值 λ、特征向量 x：Ax = λx (x≠0)，由 det(λI−A)=0 求 λ，解 (λI−A)x=0 求 x',
        '代数重数 m(λ)：特征多项式根的重数；几何重数 g(λ)=n−rank(λI−A)，恒有 g(λ)≤m(λ)',
        '可对角化 ⟺ 所有特征值 g(λ)=m(λ) ⟺ 有 n 个线性无关特征向量',
        'Jordan 块 J_k(λ)=λI+N，N 为幂零部分；Jordan 标准形由特征值和 Jordan 块大小唯一确定',
        'Jordan 链：(A−λI)ξ₁=0, (A−λI)ξ₂=ξ₁, …, 用于构造变换矩阵 P',
        'Cayley-Hamilton：矩阵满足自身特征方程 φ(A)=0'
      ]" />
    </Section>
  </LessonLayout>
</template>

<script setup>
import LessonLayout from '../../components/LessonLayout.vue'
import Section from '../../components/ui/Section.vue'
import Formula from '../../components/ui/Formula.vue'
import Theorem from '../../components/ui/Theorem.vue'
import AnimationBox from '../../components/ui/AnimationBox.vue'
import ExampleBox from '../../components/ui/ExampleBox.vue'
import Steps from '../../components/ui/Steps.vue'
import QuizProblem from '../../components/quiz/QuizProblem.vue'
import WeekQuizBank from '../../components/quiz/WeekQuizBank.vue'
import { useKatex } from '../../composables/useKatex'
import { quizBank } from '../../data/quizBank'
import { ref, onMounted, onUnmounted } from 'vue'

const renderTrigger = ref(0)
useKatex(renderTrigger)

const quizzes = (quizBank[3] || []).map(q => ({ ...q, lessonNum: '03', lessonTitle: '对角化与Jordan标准形' }))

// ===== Animation 1: Eigenvector direction invariance (Canvas, interactive) =====
const canvas1Ref = ref(null)
const playing1 = ref(false)
let ctx1 = null, rafId1 = null
let t1 = 0
const A1 = [[2, 0.6], [0.6, 1.2]]
const cx1 = 300, cy1 = 220, sc1 = 90

function matVec1(M, v) { return [M[0][0]*v[0]+M[0][1]*v[1], M[1][0]*v[0]+M[1][1]*v[1]] }

function drawCanvas1() {
  if (!ctx1) return
  const W = 600, H = 400
  ctx1.clearRect(0,0,W,H)

  ctx1.strokeStyle = '#f1f5f9'; ctx1.lineWidth = 1
  for (let i = -3; i <= 3; i++) {
    ctx1.beginPath(); ctx1.moveTo(cx1+i*sc1, 30); ctx1.lineTo(cx1+i*sc1, H-30); ctx1.stroke()
    ctx1.beginPath(); ctx1.moveTo(30, cy1+i*sc1); ctx1.lineTo(W-30, cy1+i*sc1); ctx1.stroke()
  }
  ctx1.strokeStyle = '#cbd5e1'; ctx1.lineWidth = 1.5
  ctx1.beginPath(); ctx1.moveTo(30,cy1); ctx1.lineTo(W-30,cy1); ctx1.stroke()
  ctx1.beginPath(); ctx1.moveTo(cx1,30); ctx1.lineTo(cx1,H-30); ctx1.stroke()

  const e1Dir = [1, 0.535], e2Dir = [1, -1.868]
  const e1Len = Math.hypot(e1Dir[0], e1Dir[1]), e2Len = Math.hypot(e2Dir[0], e2Dir[1])
  const eig1 = [e1Dir[0]/e1Len, e1Dir[1]/e1Len]
  const eig2 = [e2Dir[0]/e2Len, e2Dir[1]/e2Len]

  ctx1.fillStyle = 'rgba(99,102,241,0.08)'
  ctx1.strokeStyle = '#94a3b8'; ctx1.lineWidth = 1.5; ctx1.setLineDash([5,3])
  ctx1.beginPath()
  ctx1.arc(cx1, cy1, sc1, 0, Math.PI*2)
  ctx1.fill(); ctx1.stroke(); ctx1.setLineDash([])

  const numPts = 200
  ctx1.fillStyle = 'rgba(99,102,241,0.15)'
  ctx1.strokeStyle = '#6366f1'; ctx1.lineWidth = 2
  ctx1.beginPath()
  for (let i = 0; i <= numPts; i++) {
    const theta = (i/numPts)*Math.PI*2
    const v = [Math.cos(theta), Math.sin(theta)]
    const av = matVec1(A1, v)
    const x = cx1 + av[0]*sc1, y = cy1 - av[1]*sc1
    i===0 ? ctx1.moveTo(x,y) : ctx1.lineTo(x,y)
  }
  ctx1.closePath(); ctx1.fill(); ctx1.stroke()

  drawLine1(ctx1, cx1, cy1, eig1, 2.5*sc1, '#ec4899', 2.5)
  drawLine1(ctx1, cx1, cy1, eig2, 2.5*sc1, '#f59e0b', 2.5)

  const theta = t1
  const v = [Math.cos(theta), Math.sin(theta)]
  const av = matVec1(A1, v)
  const ox = cx1 + v[0]*sc1, oy = cy1 - v[1]*sc1
  ctx1.fillStyle = '#4338ca'
  ctx1.beginPath(); ctx1.arc(ox, oy, 5, 0, Math.PI*2); ctx1.fill()
  drawArrowDyn1(ctx1, cx1, cy1, ox, oy, '#4338ca', 2)
  ctx1.fillStyle = '#4338ca'; ctx1.font = '12px sans-serif'
  ctx1.fillText('x', ox+7, oy-5)

  const ax = cx1 + av[0]*sc1, ay = cy1 - av[1]*sc1
  ctx1.fillStyle = '#7c3aed'
  ctx1.beginPath(); ctx1.arc(ax, ay, 6, 0, Math.PI*2); ctx1.fill()
  drawArrowDyn1(ctx1, cx1, cy1, ax, ay, '#7c3aed', 2.5)
  ctx1.fillStyle = '#6d28d9'; ctx1.font = 'bold 12px sans-serif'
  ctx1.fillText('Ax', ax+8, ay-5)

  ctx1.fillStyle = '#be185d'; ctx1.font = 'bold 13px sans-serif'
  ctx1.fillText('特征方向 (λ₁≈2.3)', cx1+eig1[0]*sc1*2.2+5, cy1-eig1[1]*sc1*2.2)
  ctx1.fillStyle = '#d97706'
  ctx1.fillText('特征方向 (λ₂≈0.9)', cx1+eig2[0]*sc1*2.2+5, cy1-eig2[1]*sc1*2.2)

  ctx1.fillStyle = '#1e293b'; ctx1.font = 'bold 14px sans-serif'; ctx1.textAlign = 'center'
  ctx1.fillText('单位圆 → A 作用后 → 椭圆；特征向量方向只缩放不旋转', W/2, 25)
  ctx1.textAlign = 'left'
}

function drawLine1(ctx, cx, cy, dir, len, color, w) {
  ctx.strokeStyle = color; ctx.lineWidth = w; ctx.setLineDash([6,4])
  ctx.beginPath()
  ctx.moveTo(cx-dir[0]*len, cy+dir[1]*len)
  ctx.lineTo(cx+dir[0]*len, cy-dir[1]*len)
  ctx.stroke(); ctx.setLineDash([])
}

function drawArrowDyn1(ctx, x1,y1,x2,y2,color,w) {
  ctx.strokeStyle = color; ctx.lineWidth = w
  ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke()
}

function loop1() {
  t1 += 0.015
  if (t1 > Math.PI*2) t1 -= Math.PI*2
  drawCanvas1()
  rafId1 = requestAnimationFrame(loop1)
}
function play1() { if (!playing1.value) { playing1.value = true; loop1() } }
function pause1() { playing1.value = false; if (rafId1) cancelAnimationFrame(rafId1) }
function reset1() { pause1(); t1 = 0; drawCanvas1() }

// ===== Animation 2: Jordan block shear (Canvas, interactive) =====
const canvas2Ref = ref(null)
const playing2 = ref(false)
let ctx2 = null, rafId2 = null
let t2 = 0
const cx2 = 300, cy2 = 240, sc2 = 70
const lambda2 = 1.2

function drawCanvas2() {
  if (!ctx2) return
  const W = 600, H = 400
  ctx2.clearRect(0,0,W,H)

  ctx2.strokeStyle = '#f1f5f9'; ctx2.lineWidth = 1
  for (let i = -4; i <= 4; i++) {
    ctx2.beginPath(); ctx2.moveTo(cx2+i*sc2, 30); ctx2.lineTo(cx2+i*sc2, H-30); ctx2.stroke()
    ctx2.beginPath(); ctx2.moveTo(30, cy2+i*sc2); ctx2.lineTo(W-30, cy2+i*sc2); ctx2.stroke()
  }
  ctx2.strokeStyle = '#cbd5e1'; ctx2.lineWidth = 1.5
  ctx2.beginPath(); ctx2.moveTo(30,cy2); ctx2.lineTo(W-30,cy2); ctx2.stroke()
  ctx2.beginPath(); ctx2.moveTo(cx2,30); ctx2.lineTo(cx2,H-30); ctx2.stroke()

  const shear = Math.min(t2 * 1.5, 1.5)
  const J = [[lambda2, shear], [0, lambda2]]

  const orig = [[0,0],[1,0],[1,1],[0,1]]
  ctx2.fillStyle = 'rgba(148,163,184,0.1)'
  ctx2.strokeStyle = '#94a3b8'; ctx2.lineWidth = 1.5; ctx2.setLineDash([4,4])
  ctx2.beginPath()
  orig.forEach((p,i) => {
    const x = cx2+p[0]*sc2, y = cy2-p[1]*sc2
    i===0 ? ctx2.moveTo(x,y) : ctx2.lineTo(x,y)
  })
  ctx2.closePath(); ctx2.fill(); ctx2.stroke(); ctx2.setLineDash([])

  const tPts = orig.map(p => [J[0][0]*p[0]+J[0][1]*p[1], J[1][0]*p[0]+J[1][1]*p[1]])
  ctx2.fillStyle = 'rgba(99,102,241,0.2)'
  ctx2.strokeStyle = '#6366f1'; ctx2.lineWidth = 2.5
  ctx2.beginPath()
  tPts.forEach((p,i) => {
    const x = cx2+p[0]*sc2, y = cy2-p[1]*sc2
    i===0 ? ctx2.moveTo(x,y) : ctx2.lineTo(x,y)
  })
  ctx2.closePath(); ctx2.fill(); ctx2.stroke()

  const eigDir = [1, 0]
  drawLine1(ctx2, cx2, cy2, eigDir, 4*sc2, '#ec4899', 2.5)
  ctx2.fillStyle = '#be185d'; ctx2.font = 'bold 13px sans-serif'
  ctx2.fillText('唯一特征方向 (x轴)', cx2+10, cy2-10)

  const e2 = [0,1]
  const Je2 = [shear, lambda2]
  drawArrowDyn1(ctx2, cx2, cy2, cx2+Je2[0]*sc2, cy2-Je2[1]*sc2, '#7c3aed', 2.5)
  ctx2.fillStyle = '#6d28d9'; ctx2.font = 'bold 13px sans-serif'
  ctx2.fillText('J·e₂ (被剪切)', cx2+Je2[0]*sc2+8, cy2-Je2[1]*sc2-5)

  const Je1 = [lambda2, 0]
  drawArrowDyn1(ctx2, cx2, cy2, cx2+Je1[0]*sc2, cy2-Je1[1]*sc2, '#ec4899', 2.5)
  ctx2.fillStyle = '#be185d'; ctx2.font = 'bold 13px sans-serif'
  ctx2.fillText('J·e₁ = λe₁', cx2+Je1[0]*sc2/2-20, cy2+20)

  ctx2.fillStyle = '#1e293b'; ctx2.font = 'bold 14px sans-serif'; ctx2.textAlign = 'center'
  ctx2.fillText(`J = [[${lambda2}, ${shear.toFixed(2)}], [0, ${lambda2}]] — 剪切强度随时间增大`, W/2, 25)
  ctx2.fillStyle = '#64748b'; ctx2.font = '13px sans-serif'
  ctx2.fillText('注意：只有x方向是特征方向，y方向被"拖拽"剪切', W/2, H-15)
  ctx2.textAlign = 'left'
}

function loop2() {
  t2 += 0.01
  if (t2 > 2) t2 = 2
  drawCanvas2()
  rafId2 = requestAnimationFrame(loop2)
}
function play2() {
  if (!playing2.value) {
    playing2.value = true
    if (t2 >= 2) t2 = 0
    loop2()
  }
}
function pause2() { playing2.value = false; if (rafId2) cancelAnimationFrame(rafId2) }
function reset2() { pause2(); t2 = 0; drawCanvas2() }

// ===== Animation 3: Jordan chain (SVG, auto-mode) =====
const xiX = ref(0), xiY = ref(0)
const etaX = ref(0), etaY = ref(0)
let rafId3 = null
const xiTarget = {x: 100, y: 70}
const etaTarget = {x: 60, y: 160}
let phase3 = 0

function loop3() {
  if (phase3 === 0) {
    xiX.value = Math.min(xiX.value + 2, xiTarget.x)
    xiY.value = Math.min(xiY.value + 1.5, xiTarget.y)
    if (xiX.value >= xiTarget.x && xiY.value >= xiTarget.y) phase3 = 1
  } else if (phase3 === 1) {
    etaX.value = Math.min(etaX.value + 1.2, etaTarget.x)
    etaY.value = Math.min(etaY.value + 3, etaTarget.y)
    if (etaX.value >= etaTarget.x && etaY.value >= etaTarget.y) phase3 = 2
  } else {
    setTimeout(() => {
      phase3 = 0
      xiX.value = 0; xiY.value = 0; etaX.value = 0; etaY.value = 0
    }, 2500)
    return
  }
  rafId3 = requestAnimationFrame(loop3)
}

onMounted(() => {
  const c1 = canvas1Ref.value
  if (c1) { ctx1 = c1.getContext('2d'); drawCanvas1() }
  const c2 = canvas2Ref.value
  if (c2) { ctx2 = c2.getContext('2d'); drawCanvas2() }
  renderTrigger.value++
  // Auto-start auto-mode animation (Jordan chain)
  loop3()
})
onUnmounted(() => {
  if (rafId1) cancelAnimationFrame(rafId1)
  if (rafId2) cancelAnimationFrame(rafId2)
  if (rafId3) cancelAnimationFrame(rafId3)
})
</script>
