<template>
  <LessonLayout :lesson-id="2" title="线性变换及其矩阵" subtitle="Linear Transformations & Matrices">
    <Section num="1" title="线性变换的定义">
      <p>
        设 <span class="formula-inline">V,W</span> 是数域 <span class="formula-inline">\mathbb{F}</span> 上的线性空间，映射
        <span class="formula-inline">T:V\to W</span> 称为<strong>线性变换</strong>（线性映射），若对任意
        <span class="formula-inline">\alpha,\beta\in V</span> 和 <span class="formula-inline">k,l\in\mathbb{F}</span>，有
      </p>
      <Theorem title="线性变换定义式" type="definition" icon="🔄">
        <Formula display>T(k\alpha+l\beta)=kT(\alpha)+lT(\beta)</Formula>
        即：<strong>保持线性组合</strong>。特别地，<span class="formula-inline">T(0)=0</span>。
      </Theorem>

      <p>
        <strong>基本性质：</strong><br>
        ① 线性相关组映射后仍线性相关；<br>
        ② 线性变换由其在一组基上的像唯一确定；<br>
        ③ <span class="formula-inline">T(\sum k_i\alpha_i)=\sum k_i T(\alpha_i)</span>。
      </p>
    </Section>

    <Section num="2" title="线性变换的矩阵表示">
      <p>
        设 <span class="formula-inline">T:V\to V</span> 是 <span class="formula-inline">n</span> 维线性空间 <span class="formula-inline">V</span> 上的线性变换，
        取基 <span class="formula-inline">\varepsilon_1,\dots,\varepsilon_n</span>，若
      </p>
      <Formula display>T(\varepsilon_j)=a_{1j}\varepsilon_1+a_{2j}\varepsilon_2+\cdots+a_{nj}\varepsilon_n,\quad j=1,\dots,n</Formula>
      <p>
        则 <span class="formula-inline">A=(a_{ij})_{n\times n}</span> 称为 <span class="formula-inline">T</span> 在该基下的<strong>矩阵</strong>。
        <strong>关键理解：A 的第 j 列就是 <span class="formula-inline">T(\varepsilon_j)</span> 在基 <span class="formula-inline">\{\varepsilon_i\}</span> 下的坐标。</strong>
      </p>

      <Theorem title="坐标变换公式" type="theorem">
        设 <span class="formula-inline">\alpha</span> 在基 <span class="formula-inline">\{\varepsilon_i\}</span> 下坐标为 <span class="formula-inline">x</span>，
        则 <span class="formula-inline">T(\alpha)</span> 的坐标为 <span class="formula-inline">Ax</span>。
      </Theorem>

      <AnimationBox title="R² 中矩阵对单位正方形的变换" :playing="playing1" @play="play1" @pause="pause1" @reset="reset1"
        :step="true" @step="step1" description="观察不同 2×2 矩阵对单位正方形的作用：拉伸、旋转、剪切、反射等。点击▶播放自动循环，或⏭步进切换变换类型。">
        <canvas ref="canvas1Ref" width="600" height="400" style="max-width:100%;width:100%;"></canvas>
      </AnimationBox>
    </Section>

    <Section num="3" title="相似变换">
      <Theorem title="基变换与相似矩阵" type="theorem">
        线性变换 <span class="formula-inline">T</span> 在不同基下的矩阵 <span class="formula-inline">A,B</span> 满足：
        <Formula display>B = P^{-1}AP</Formula>
        其中 <span class="formula-inline">P</span> 是从旧基到新基的过渡矩阵。称 <span class="formula-inline">A</span> 与 <span class="formula-inline">B</span> <strong>相似</strong>。
      </Theorem>
      <p>相似矩阵有相同的：行列式、迹、秩、特征多项式、特征值。</p>
    </Section>

    <Section num="4" title="核、像与秩-零化度定理">
      <Theorem title="核与像" type="definition" icon="🎯">
        <ul style="margin:0; padding-left:20px;">
          <li><strong>核（零空间）</strong>：<span class="formula-inline">\Ker T=\{\alpha\in V\mid T(\alpha)=0\}</span>，是 <span class="formula-inline">V</span> 的子空间</li>
          <li><strong>像（值域）</strong>：<span class="formula-inline">\Im T=\{T(\alpha)\mid\alpha\in V\}</span>，是 <span class="formula-inline">V</span> 的子空间</li>
        </ul>
      </Theorem>
      <Theorem title="秩-零化度定理 (Rank-Nullity)" type="theorem">
        <Formula display>\dim\Ker T + \dim\Im T = \dim V = n</Formula>
        其中 <span class="formula-inline">\dim\Im T = \rank(A)</span>（矩阵的秩），<span class="formula-inline">\dim\Ker T = n-\rank(A)</span>（零化度）。
      </Theorem>
    </Section>

    <Section num="5" title="Gram-Schmidt 正交化">
      <p>
        Gram-Schmidt 过程将一组线性无关向量转化为<strong>单位正交向量组</strong>，是 QR 分解的核心。
      </p>
      <Theorem title="Gram-Schmidt 正交化公式" type="theorem">
        设 <span class="formula-inline">\alpha_1,\dots,\alpha_m</span> 线性无关，递推构造：
        <Formula display>\beta_1 = \alpha_1,\quad \gamma_1=\cfrac{\beta_1}{\|\beta_1\|}</Formula>
        <Formula display>\beta_k = \alpha_k - \sum_{i=1}^{k-1}(\alpha_k,\gamma_i)\gamma_i,\quad \gamma_k=\cfrac{\beta_k}{\|\beta_k\|}\quad (k\geq2)</Formula>
        则 <span class="formula-inline">\gamma_1,\dots,\gamma_m</span> 是单位正交组，且 <span class="formula-inline">\operatorname{span}\{\gamma_1,\dots,\gamma_k\}=\operatorname{span}\{\alpha_1,\dots,\alpha_k\}</span>。
      </Theorem>

      <AnimationBox title="Gram-Schmidt 逐步正交化（R³ 投影到2D）" :playing="playing2" @play="play2" @pause="pause2" @reset="reset2"
        :step="true" @step="step2" description="逐步演示：先单位化 a₁ 得 u₁；再从 a₂ 减去在 u₁ 上的投影分量，单位化得 u₂；最后从 a₃ 减去在 u₁、u₂ 上的投影，单位化得 u₃。点击▶自动播放或⏭单步推进。">
        <canvas ref="canvas2Ref" width="600" height="420" style="max-width:100%;width:100%;"></canvas>
      </AnimationBox>
    </Section>

    <Section num="6" title="Householder 反射">
      <Theorem title="Householder 矩阵" type="definition" icon="🪞">
        设单位向量 <span class="formula-inline">u\in\mathbb{R}^n</span>，Householder 反射矩阵定义为
        <Formula display>H = I - \frac{2uu^T}{u^Tu} = I - 2uu^T\quad(\|u\|=1)</Formula>
        <span class="formula-inline">H</span> 是<strong>对称正交矩阵</strong>：<span class="formula-inline">H^T=H</span>，<span class="formula-inline">H^TH=I</span>，<span class="formula-inline">H^2=I</span>。
        几何意义：关于以 <span class="formula-inline">u</span> 为法向量的超平面做镜像反射。
      </Theorem>

      <AnimationBox title="Householder 镜像反射" :playing="playing3" @play="play3" @pause="pause3" @reset="reset3"
        description="向量 x 经 Householder 反射后变为 Hx = x - 2(x·u)u，即关于法向量 u 的超平面（直线）做镜像反射。">
        <canvas ref="canvas3Ref" width="600" height="400" style="max-width:100%;width:100%;"></canvas>
      </AnimationBox>
    </Section>

    <Section num="7" title="真题例题详解">
      <ExampleBox source="2023年期末考试" badge="📝 真题">
        <template #problem>
          用 Gram-Schmidt 正交化方法将
          <span class="formula-inline">\alpha_1=(1,1,0)^T</span>，<span class="formula-inline">\alpha_2=(1,0,1)^T</span>，
          <span class="formula-inline">\alpha_3=(0,1,1)^T</span> 化为 <span class="formula-inline">\mathbb{R}^3</span> 中的单位正交基。
        </template>
        <template #solution>
          <div class="step">
            <div class="step-num">1</div>
            <div class="step-text">
              <strong>第一步：取 β₁ = α₁ = (1,1,0)ᵀ，单位化：</strong><br>
              <span class="formula-inline">\|\beta_1\|=\sqrt{1^2+1^2+0^2}=\sqrt{2}</span>，<br>
              <span class="formula-inline">\gamma_1=\dfrac{\beta_1}{\|\beta_1\|}=\dfrac{1}{\sqrt{2}}(1,1,0)^T=\left(\dfrac{1}{\sqrt{2}},\dfrac{1}{\sqrt{2}},0\right)^T</span>。
            </div>
          </div>
          <div class="step">
            <div class="step-num">2</div>
            <div class="step-text">
              <strong>第二步：求 β₂ = α₂ − (α₂,γ₁)γ₁：</strong><br>
              <span class="formula-inline">(\alpha_2,\gamma_1)=\dfrac{1}{\sqrt{2}}(1\cdot1+0\cdot1+1\cdot0)=\dfrac{1}{\sqrt{2}}</span>，<br>
              <span class="formula-inline">\beta_2=(1,0,1)^T-\dfrac{1}{\sqrt{2}}\cdot\dfrac{1}{\sqrt{2}}(1,1,0)^T=(1,0,1)^T-\dfrac{1}{2}(1,1,0)^T=\left(\dfrac{1}{2},-\dfrac{1}{2},1\right)^T</span>，<br>
              <span class="formula-inline">\|\beta_2\|=\sqrt{\dfrac{1}{4}+\dfrac{1}{4}+1}=\sqrt{\dfrac{3}{2}}=\dfrac{\sqrt{6}}{2}</span>，<br>
              <span class="formula-inline">\gamma_2=\dfrac{\beta_2}{\|\beta_2\|}=\dfrac{2}{\sqrt{6}}\left(\dfrac{1}{2},-\dfrac{1}{2},1\right)^T=\left(\dfrac{1}{\sqrt{6}},-\dfrac{1}{\sqrt{6}},\dfrac{2}{\sqrt{6}}\right)^T</span>。
            </div>
          </div>
          <div class="step">
            <div class="step-num">3</div>
            <div class="step-text">
              <strong>第三步：求 β₃ = α₃ − (α₃,γ₁)γ₁ − (α₃,γ₂)γ₂：</strong><br>
              <span class="formula-inline">(\alpha_3,\gamma_1)=\dfrac{1}{\sqrt{2}}(0+1+0)=\dfrac{1}{\sqrt{2}}</span>，<br>
              <span class="formula-inline">(\alpha_3,\gamma_2)=\dfrac{1}{\sqrt{6}}(0-1+2)=\dfrac{1}{\sqrt{6}}</span>，<br>
              <span class="formula-inline">\beta_3=(0,1,1)^T-\dfrac{1}{\sqrt{2}}\gamma_1-\dfrac{1}{\sqrt{6}}\gamma_2</span><br>
              <span class="formula-inline">=(0,1,1)^T-\dfrac{1}{2}(1,1,0)^T-\dfrac{1}{6}(1,-1,2)^T</span><br>
              <span class="formula-inline">=\left(-\dfrac{2}{3},\dfrac{2}{3},\dfrac{2}{3}\right)^T</span>，<br>
              <span class="formula-inline">\|\beta_3\|=\dfrac{2\sqrt{3}}{3}</span>，
              <span class="formula-inline">\gamma_3=\left(-\dfrac{1}{\sqrt{3}},\dfrac{1}{\sqrt{3}},\dfrac{1}{\sqrt{3}}\right)^T</span>。
            </div>
          </div>
          <div class="step">
            <div class="step-num">4</div>
            <div class="step-text">
              <strong>验证：</strong>
              <span class="formula-inline">\gamma_1,\gamma_2,\gamma_3</span> 两两内积为 0，且各向量模长为 1，构成单位正交基。
            </div>
          </div>
        </template>
      </ExampleBox>

      <ExampleBox source="2022年期末考试" badge="📝 真题">
        <template #problem>
          设向量 <span class="formula-inline">x=(1,2,2)^T</span>，构造 Householder 矩阵 <span class="formula-inline">H</span>，使 <span class="formula-inline">Hx</span>
          与 <span class="formula-inline">e_1=(1,0,0)^T</span> 同方向（即把 <span class="formula-inline">x</span> 反射到 <span class="formula-inline">e_1</span> 方向）。
        </template>
        <template #solution>
          <div class="step">
            <div class="step-num">1</div>
            <div class="step-text">
              <strong>计算 ||x||：</strong>
              <span class="formula-inline">\|x\|=\sqrt{1^2+2^2+2^2}=\sqrt{9}=3</span>。
              要使 <span class="formula-inline">Hx</span> 与 <span class="formula-inline">e_1</span> 同方向，即 <span class="formula-inline">Hx=\|x\|e_1=3e_1</span>。
            </div>
          </div>
          <div class="step">
            <div class="step-num">2</div>
            <div class="step-text">
              <strong>构造反射向量 v = x − ||x||e₁：</strong>
              取 <span class="formula-inline">v=x-\|x\|e_1</span>（保证 <span class="formula-inline">Hx</span> 与 <span class="formula-inline">e_1</span> 同向）：
              <span class="formula-inline">v=(1,2,2)^T-3(1,0,0)^T=(-2,2,2)^T</span>。
            </div>
          </div>
          <div class="step">
            <div class="step-num">3</div>
            <div class="step-text">
              <strong>单位化 u = v/||v||：</strong>
              <span class="formula-inline">\|v\|=\sqrt{(-2)^2+2^2+2^2}=\sqrt{12}=2\sqrt{3}</span>，
              <span class="formula-inline">u=\dfrac{v}{\|v\|}=\dfrac{1}{2\sqrt{3}}(-2,2,2)^T=\dfrac{1}{\sqrt{3}}(-1,1,1)^T</span>。
            </div>
          </div>
          <div class="step">
            <div class="step-num">4</div>
            <div class="step-text">
              <strong>计算 H = I − 2uuᵀ：</strong>
              <span class="formula-inline">uu^T=\dfrac{1}{3}\begin{pmatrix}1&-1&-1\\-1&1&1\\-1&1&1\end{pmatrix}</span>，
              <Formula display>H = I-\dfrac{2}{3}\begin{pmatrix}1&-1&-1\\-1&1&1\\-1&1&1\end{pmatrix}=\dfrac{1}{3}\begin{pmatrix}1&2&2\\2&1&-2\\2&-2&1\end{pmatrix}</Formula>
              验证：<span class="formula-inline">Hx=\dfrac{1}{3}(9,0,0)^T=3e_1</span>，方向沿 <span class="formula-inline">e_1</span>。
            </div>
          </div>
        </template>
      </ExampleBox>

      <ExampleBox source="2021年期末考试" badge="📝 真题">
        <template #problem>
          设线性变换 <span class="formula-inline">T</span> 在基 <span class="formula-inline">\varepsilon_1,\varepsilon_2,\varepsilon_3</span> 下的矩阵为
          <span class="formula-inline">A=\begin{pmatrix}1&2&3\\-1&0&3\\2&1&5\end{pmatrix}</span>，
          求 <span class="formula-inline">T</span> 在基 <span class="formula-inline">\eta_1=\varepsilon_1</span>，<span class="formula-inline">\eta_2=\varepsilon_1+\varepsilon_2</span>，
          <span class="formula-inline">\eta_3=\varepsilon_1+\varepsilon_2+\varepsilon_3</span> 下的矩阵 <span class="formula-inline">B</span>。
        </template>
        <template #solution>
          <div class="step">
            <div class="step-num">1</div>
            <div class="step-text">
              <strong>求过渡矩阵 P：</strong>
              由 <span class="formula-inline">(\eta_1,\eta_2,\eta_3)=(\varepsilon_1,\varepsilon_2,\varepsilon_3)P</span>，
              <Formula display>P=\begin{pmatrix}1&1&1\\0&1&1\\0&0&1\end{pmatrix}</Formula>
            </div>
          </div>
          <div class="step">
            <div class="step-num">2</div>
            <div class="step-text">
              <strong>求 P⁻¹：</strong>
              上三角矩阵求逆，
              <span class="formula-inline">P^{-1}=\begin{pmatrix}1&-1&0\\0&1&-1\\0&0&1\end{pmatrix}</span>（验证 <span class="formula-inline">PP^{-1}=I</span>）。
            </div>
          </div>
          <div class="step">
            <div class="step-num">3</div>
            <div class="step-text">
              <strong>计算 B = P⁻¹AP：</strong>
              <span class="formula-inline">AP=\begin{pmatrix}1&3&6\\-1&-1&2\\2&3&8\end{pmatrix}</span>，
              <Formula display>B=P^{-1}AP=\begin{pmatrix}1&-1&0\\0&1&-1\\0&0&1\end{pmatrix}\begin{pmatrix}1&3&6\\-1&-1&2\\2&3&8\end{pmatrix}=\begin{pmatrix}2&4&4\\-3&-4&-6\\2&3&8\end{pmatrix}</Formula>
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
        '线性变换：T(kα+lβ)=kT(α)+lT(β)，保持线性组合',
        '矩阵表示：A 的第 j 列 = T(εⱼ) 在基下的坐标；T(α) 的坐标 = Ax',
        '相似矩阵：B = P⁻¹AP，不同基下同一变换的矩阵，有相同的迹/秩/行列式/特征值',
        '秩-零化度定理：dim Ker(T) + dim Im(T) = n',
        'Gram-Schmidt：βₖ = αₖ − Σ(αₖ,γᵢ)γᵢ，再单位化 γₖ = βₖ/||βₖ||',
        'Householder：H = I − 2uuᵀ（||u||=1），对称正交矩阵，实现超平面镜像反射'
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
import WeekQuizBank from '../../components/quiz/WeekQuizBank.vue'
import { useKatex } from '../../composables/useKatex'
import { quizBank } from '../../data/quizBank'
import { ref, onMounted, onUnmounted } from 'vue'

const renderTrigger = ref(0)
useKatex(renderTrigger)

const quizzes = (quizBank[2] || []).map(q => ({ ...q, lessonNum: '02', lessonTitle: '线性变换及其矩阵' }))

// ===== Animation 1: Matrix transforms on unit square (Canvas) =====
const canvas1Ref = ref(null)
const playing1 = ref(false)
let ctx1 = null, rafId1 = null
let anim1Time = 0
let transIdx1 = 0
const transforms = [
  { name: '恒等变换', mat: [[1,0],[0,1]], color: '#6366f1' },
  { name: '拉伸 (×1.8, ×0.7)', mat: [[1.8,0],[0,0.7]], color: '#7c3aed' },
  { name: '反射 (x轴翻转)', mat: [[1,0],[0,-1]], color: '#ec4899' },
  { name: '剪切 (水平)', mat: [[1,0.6],[0,1]], color: '#4338ca' },
  { name: '旋转 45°', mat: [[Math.cos(Math.PI/4),-Math.sin(Math.PI/4)],[Math.sin(Math.PI/4),Math.cos(Math.PI/4)]], color: '#818cf8' },
  { name: '缩放+旋转', mat: [[1.2*Math.cos(Math.PI/6),-1.2*Math.sin(Math.PI/6)],[0.8*Math.sin(Math.PI/6),0.8*Math.cos(Math.PI/6)]], color: '#a78bfa' }
]
let interpT1 = 0

function matVec(M, v) {
  return [M[0][0]*v[0]+M[0][1]*v[1], M[1][0]*v[0]+M[1][1]*v[1]]
}
function lerpMat(A, B, t) {
  return [[A[0][0]+(B[0][0]-A[0][0])*t, A[0][1]+(B[0][1]-A[0][1])*t],
          [A[1][0]+(B[1][0]-A[1][0])*t, A[1][1]+(B[1][1]-A[1][1])*t]]
}

function drawCanvas1() {
  if (!ctx1) return
  const W = 600, H = 400, cx = W/2, cy = H/2 + 20
  const scale = 70
  ctx1.clearRect(0, 0, W, H)

  ctx1.strokeStyle = '#f1f5f9'
  ctx1.lineWidth = 1
  for (let i = -4; i <= 4; i++) {
    ctx1.beginPath(); ctx1.moveTo(cx+i*scale, 20); ctx1.lineTo(cx+i*scale, H-20); ctx1.stroke()
    ctx1.beginPath(); ctx1.moveTo(20, cy+i*scale); ctx1.lineTo(W-20, cy+i*scale); ctx1.stroke()
  }
  ctx1.strokeStyle = '#cbd5e1'; ctx1.lineWidth = 1.5
  ctx1.beginPath(); ctx1.moveTo(20,cy); ctx1.lineTo(W-20,cy); ctx1.stroke()
  ctx1.beginPath(); ctx1.moveTo(cx,20); ctx1.lineTo(cx,H-20); ctx1.stroke()

  const origPts = [[0,0],[1,0],[1,1],[0,1]]
  ctx1.fillStyle = 'rgba(148,163,184,0.12)'
  ctx1.strokeStyle = '#94a3b8'; ctx1.lineWidth = 1.5; ctx1.setLineDash([4,4])
  ctx1.beginPath()
  origPts.forEach((p,i) => {
    const x = cx + p[0]*scale, y = cy - p[1]*scale
    i===0 ? ctx1.moveTo(x,y) : ctx1.lineTo(x,y)
  })
  ctx1.closePath(); ctx1.fill(); ctx1.stroke(); ctx1.setLineDash([])

  const cur = transforms[transIdx1]
  const prev = transforms[(transIdx1-1+transforms.length)%transforms.length]
  const M = lerpMat(prev.mat, cur.mat, interpT1)

  const tPts = origPts.map(p => {
    const v = matVec(M, p)
    return [cx + v[0]*scale, cy - v[1]*scale]
  })

  ctx1.fillStyle = cur.color + '33'
  ctx1.strokeStyle = cur.color; ctx1.lineWidth = 2.5
  ctx1.beginPath()
  tPts.forEach((p,i) => i===0 ? ctx1.moveTo(p[0],p[1]) : ctx1.lineTo(p[0],p[1]))
  ctx1.closePath(); ctx1.fill(); ctx1.stroke()

  const e1 = matVec(M, [1,0]), e2 = matVec(M, [0,1])
  drawArrow1(ctx1, cx, cy, cx+e1[0]*scale, cy-e1[1]*scale, '#4338ca', 2.5)
  drawArrow1(ctx1, cx, cy, cx+e2[0]*scale, cy-e2[1]*scale, '#7c3aed', 2.5)
  ctx1.fillStyle = '#4338ca'; ctx1.font = 'bold 13px sans-serif'
  ctx1.fillText('T(e₁)', cx+e1[0]*scale+8, cy-e1[1]*scale-5)
  ctx1.fillStyle = '#7c3aed'
  ctx1.fillText('T(e₂)', cx+e2[0]*scale+8, cy-e2[1]*scale-5)

  ctx1.fillStyle = '#1e293b'; ctx1.font = 'bold 16px sans-serif'; ctx1.textAlign = 'center'
  ctx1.fillText(cur.name, cx, 30)
  ctx1.font = '13px sans-serif'; ctx1.fillStyle = '#64748b'
  const a=M[0][0].toFixed(2), b=M[0][1].toFixed(2), c=M[1][0].toFixed(2), d=M[1][1].toFixed(2)
  ctx1.fillText(`M = [${a}  ${b}; ${c}  ${d}]`, cx, H-15)
  ctx1.textAlign = 'left'
}
function drawArrow1(ctx, x1,y1,x2,y2,color,w) {
  ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = w
  ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke()
  const ang = Math.atan2(y2-y1, x2-x1), len = 10
  ctx.beginPath()
  ctx.moveTo(x2,y2)
  ctx.lineTo(x2-len*Math.cos(ang-0.3), y2-len*Math.sin(ang-0.3))
  ctx.lineTo(x2-len*Math.cos(ang+0.3), y2-len*Math.sin(ang+0.3))
  ctx.closePath(); ctx.fill()
}

function loop1() {
  anim1Time += 0.012
  interpT1 = Math.min(interpT1 + 0.01, 1)
  if (interpT1 >= 1 && anim1Time > 2) {
    transIdx1 = (transIdx1 + 1) % transforms.length
    interpT1 = 0
    anim1Time = 0
  }
  drawCanvas1()
  rafId1 = requestAnimationFrame(loop1)
}
function play1() {
  if (!playing1.value) { playing1.value = true; loop1() }
}
function pause1() { playing1.value = false; if (rafId1) cancelAnimationFrame(rafId1) }
function reset1() {
  pause1(); transIdx1 = 0; interpT1 = 0; anim1Time = 0; drawCanvas1()
}
function step1() {
  transIdx1 = (transIdx1 + 1) % transforms.length
  interpT1 = 1; anim1Time = 2
  drawCanvas1()
}

// ===== Animation 2: Gram-Schmidt (Canvas) =====
const canvas2Ref = ref(null)
const playing2 = ref(false)
let ctx2 = null, rafId2 = null
let gsStep = 0, gsProgress = 0
function proj3d(p) {
  return [p[0] - 0.35*p[2], p[1] - 0.2*p[2]]
}
const gsAlpha = [
  [2.0, 0.3, 0.2],
  [0.6, 1.8, 0.5],
  [0.3, 0.4, 2.0]
]
let gsU = []
let gsBeta = []
const gsScale = 90, gsCx = 280, gsCy = 260

function vecSub(a,b){return a.map((v,i)=>v-b[i])}
function vecAdd(a,b){return a.map((v,i)=>v+b[i])}
function vecScale(a,s){return a.map(v=>v*s)}
function vecDot(a,b){return a.reduce((s,v,i)=>s+v*b[i],0)}
function vecNorm(a){return Math.sqrt(vecDot(a,a))}

function drawGSArrow(ctx, v2d, color, width, label) {
  const [x,y] = v2d
  drawArrow1(ctx, gsCx, gsCy, gsCx+x*gsScale, gsCy-y*gsScale, color, width)
  if (label) {
    ctx.fillStyle = color; ctx.font = 'bold 14px sans-serif'
    ctx.fillText(label, gsCx+x*gsScale+8, gsCy-y*gsScale-5)
  }
}

function drawCanvas2() {
  if (!ctx2) return
  const W = 600, H = 420
  ctx2.clearRect(0,0,W,H)

  ctx2.strokeStyle = '#e2e8f0'; ctx2.lineWidth = 1
  ctx2.setLineDash([3,3])
  const axes = [[3.5,0,0],[0,3.5,0],[0,0,3.5]]
  const axLabels = ['x','y','z']
  axes.forEach((ax,i) => {
    const p = proj3d(ax)
    ctx2.beginPath(); ctx2.moveTo(gsCx, gsCy); ctx2.lineTo(gsCx+p[0]*gsScale, gsCy-p[1]*gsScale); ctx2.stroke()
    ctx2.fillStyle = '#94a3b8'; ctx2.font = '12px sans-serif'
    ctx2.fillText(axLabels[i], gsCx+p[0]*gsScale+5, gsCy-p[1]*gsScale+5)
  })
  ctx2.setLineDash([])

  gsAlpha.forEach((a,i) => {
    const p = proj3d(a)
    ctx2.globalAlpha = gsStep >= i ? 1 : 0.25
    drawGSArrow(ctx2, p, '#94a3b8', 2, null)
    ctx2.fillStyle = '#64748b'; ctx2.font = '13px sans-serif'
    ctx2.fillText(`α${i+1}`, gsCx+p[0]*gsScale+8, gsCy-p[1]*gsScale+12)
  })
  ctx2.globalAlpha = 1

  const t = gsProgress

  if (gsStep >= 1) {
    // u1 = a1/||a1||  (unit vector in direction of a1)
    const u1 = vecScale(gsAlpha[0], 1/vecNorm(gsAlpha[0]))
    gsU[0] = u1
    const pu1 = proj3d(u1)
    const a1p = proj3d(gsAlpha[0])
    if (gsStep === 1) {
      // Animate: a1 shrinking/normalizing to u1
      const cur = vecScale(gsAlpha[0], 1 - t + t/vecNorm(gsAlpha[0]))
      drawGSArrow(ctx2, proj3d(cur), '#4338ca', 3, null)
    } else {
      ctx2.globalAlpha = 0.3
      drawGSArrow(ctx2, a1p, '#94a3b8', 1.5, null)
      ctx2.globalAlpha = 1
      drawGSArrow(ctx2, pu1, '#4338ca', 3, 'u₁')
    }
  }

  if (gsStep >= 2) {
    const u1 = gsU[0]
    // proj = (a2·u1)u1  (projection of a2 onto span{u1})
    const proj = vecScale(u1, vecDot(gsAlpha[1], u1))
    gsBeta[1] = vecSub(gsAlpha[1], proj)
    const u2 = vecScale(gsBeta[1], 1/vecNorm(gsBeta[1]))
    gsU[1] = u2

    if (gsStep === 2) {
      if (t < 0.5) {
        // Show projection component growing (dashed line to a2)
        const curProj = vecScale(proj, t*2)
        ctx2.globalAlpha = 0.3
        drawGSArrow(ctx2, proj3d(gsAlpha[1]), '#94a3b8', 1.5, null)
        ctx2.globalAlpha = 1
        drawGSArrow(ctx2, proj3d(curProj), '#f59e0b', 2.5, null)
        const cp = proj3d(curProj), ap = proj3d(gsAlpha[1])
        ctx2.strokeStyle = '#f59e0b'; ctx2.lineWidth = 1; ctx2.setLineDash([4,3])
        ctx2.beginPath(); ctx2.moveTo(gsCx+cp[0]*gsScale, gsCy-cp[1]*gsScale); ctx2.lineTo(gsCx+ap[0]*gsScale, gsCy-ap[1]*gsScale); ctx2.stroke()
        ctx2.setLineDash([])
        ctx2.fillStyle = '#d97706'; ctx2.font = '13px sans-serif'
        ctx2.fillText('(a₂·u₁)u₁', gsCx+cp[0]*gsScale/2-20, gsCy-cp[1]*gsScale/2)
      } else {
        // Show beta2 = a2 - proj, then normalize
        const t2 = (t-0.5)*2
        const curBeta = vecScale(gsBeta[1], t2)
        ctx2.globalAlpha = 0.3
        drawGSArrow(ctx2, proj3d(proj), '#f59e0b', 1.5, null)
        ctx2.globalAlpha = 1
        drawGSArrow(ctx2, proj3d(curBeta), '#7c3aed', 3, null)
        const bp = proj3d(curBeta), ap = proj3d(gsAlpha[1])
        ctx2.strokeStyle = '#7c3aed'; ctx2.lineWidth = 1; ctx2.setLineDash([4,3])
        ctx2.beginPath(); ctx2.moveTo(gsCx+bp[0]*gsScale, gsCy-bp[1]*gsScale); ctx2.lineTo(gsCx+ap[0]*gsScale, gsCy-ap[1]*gsScale); ctx2.stroke()
        ctx2.setLineDash([])
        ctx2.fillStyle = '#6d28d9'; ctx2.font = 'bold 13px sans-serif'
        ctx2.fillText('β₂ = a₂ − proj', gsCx+bp[0]*gsScale+8, gsCy-bp[1]*gsScale-5)
      }
    } else {
      const pu2 = proj3d(u2)
      drawGSArrow(ctx2, pu1, '#4338ca', 3, 'u₁')
      drawGSArrow(ctx2, pu2, '#7c3aed', 3, 'u₂')
      // Right angle mark between u1 and u2
      const r = 15
      ctx2.strokeStyle = '#10b981'; ctx2.lineWidth = 1.5
      const u1p = proj3d(u1), u2p = proj3d(u2)
      const u1n = [u1p[0]/Math.hypot(u1p[0],u1p[1]), u1p[1]/Math.hypot(u1p[0],u1p[1])]
      const u2n = [u2p[0]/Math.hypot(u2p[0],u2p[1]), u2p[1]/Math.hypot(u2p[0],u2p[1])]
      ctx2.beginPath()
      ctx2.moveTo(gsCx+u1n[0]*r, gsCy-u1n[1]*r)
      ctx2.lineTo(gsCx+(u1n[0]+u2n[0])*r, gsCy-(u1n[1]+u2n[1])*r)
      ctx2.lineTo(gsCx+u2n[0]*r, gsCy-u2n[1]*r)
      ctx2.stroke()
    }
  }

  if (gsStep >= 3) {
    const u1 = gsU[0], u2 = gsU[1]
    // proj1 = (a3·u1)u1,  proj2 = (a3·u2)u2
    const proj1 = vecScale(u1, vecDot(gsAlpha[2], u1))
    const proj2 = vecScale(u2, vecDot(gsAlpha[2], u2))
    gsBeta[2] = vecSub(vecSub(gsAlpha[2], proj1), proj2)
    const u3 = vecScale(gsBeta[2], 1/vecNorm(gsBeta[2]))
    gsU[2] = u3

    if (gsStep === 3) {
      const t2 = t
      if (t2 < 0.4) {
        const cp = vecScale(proj1, t2/0.4)
        ctx2.globalAlpha = 0.25
        drawGSArrow(ctx2, proj3d(gsAlpha[2]), '#94a3b8', 1, null)
        ctx2.globalAlpha = 1
        drawGSArrow(ctx2, proj3d(cp), '#f59e0b', 2.5, null)
        ctx2.fillStyle = '#d97706'; ctx2.font = '12px sans-serif'
        ctx2.fillText('(a₃·u₁)u₁', gsCx+proj3d(cp)[0]*gsScale/2-10, gsCy-proj3d(cp)[1]*gsScale/2)
      } else if (t2 < 0.7) {
        const tt = (t2-0.4)/0.3
        const cp1 = proj1
        const cp2 = vecAdd(proj1, vecScale(proj2, tt))
        ctx2.globalAlpha = 0.25
        drawGSArrow(ctx2, proj3d(gsAlpha[2]), '#94a3b8', 1, null)
        ctx2.globalAlpha = 0.5
        drawGSArrow(ctx2, proj3d(cp1), '#f59e0b', 1.5, null)
        ctx2.globalAlpha = 1
        const p1 = proj3d(cp1), p2 = proj3d(cp2)
        ctx2.strokeStyle = '#f97316'; ctx2.lineWidth = 2.5
        drawArrow1(ctx2, gsCx+p1[0]*gsScale, gsCy-p1[1]*gsScale, gsCx+p2[0]*gsScale, gsCy-p2[1]*gsScale, '#f97316', 2.5)
        ctx2.fillStyle = '#c2410c'; ctx2.font = '12px sans-serif'
        ctx2.fillText('(a₃·u₂)u₂', gsCx+(p1[0]+p2[0])*gsScale/2, gsCy-(p1[1]+p2[1])*gsScale/2-8)
      } else {
        const tt = (t2-0.7)/0.3
        const beta = vecScale(gsBeta[2], tt)
        ctx2.globalAlpha = 0.2
        drawGSArrow(ctx2, proj3d(gsAlpha[2]), '#94a3b8', 1, null)
        ctx2.globalAlpha = 0.4
        drawGSArrow(ctx2, proj3d(vecAdd(proj1,proj2)), '#f59e0b', 1.5, null)
        ctx2.globalAlpha = 1
        drawGSArrow(ctx2, proj3d(beta), '#ec4899', 3, null)
        ctx2.fillStyle = '#be185d'; ctx2.font = 'bold 13px sans-serif'
        ctx2.fillText('β₃', gsCx+proj3d(beta)[0]*gsScale+8, gsCy-proj3d(beta)[1]*gsScale-5)
      }
    } else {
      drawGSArrow(ctx2, proj3d(u1), '#4338ca', 3, 'u₁')
      drawGSArrow(ctx2, proj3d(u2), '#7c3aed', 3, 'u₂')
      drawGSArrow(ctx2, proj3d(u3), '#ec4899', 3, 'u₃')
    }
  }

  ctx2.fillStyle = '#1e293b'
  ctx2.beginPath(); ctx2.arc(gsCx, gsCy, 3, 0, Math.PI*2); ctx2.fill()

  const statusText = [
    '点击 ▶ 开始 Gram-Schmidt 正交化',
    '第 1 步：单位化 α₁ → u₁',
    '第 2 步：β₂ = α₂ − (α₂·u₁)u₁，单位化 → u₂',
    '第 3 步：β₃ = α₃ − (α₃·u₁)u₁ − (α₃·u₂)u₂，单位化 → u₃',
    '第 4 步：单位正交基 {u₁, u₂, u₃} 构造完毕'
  ]
  ctx2.fillStyle = '#4f46e5'; ctx2.font = 'bold 13px sans-serif'; ctx2.textAlign = 'center'
  ctx2.fillText(statusText[Math.min(gsStep, 4)], W/2, H-10)
  ctx2.textAlign = 'left'
}

function loop2() {
  gsProgress += 0.008
  if (gsStep === 1 && gsProgress >= 1) {
    gsStep = 2; gsProgress = 0
  } else if (gsStep === 2 && gsProgress >= 1) {
    gsStep = 3; gsProgress = 0
  } else if (gsStep === 3 && gsProgress >= 1) {
    gsStep = 4; gsProgress = 0
  }
  drawCanvas2()
  if (gsStep < 4) {
    rafId2 = requestAnimationFrame(loop2)
  } else {
    playing2.value = false
  }
}
function play2() {
  if (!playing2.value) {
    playing2.value = true
    if (gsStep >= 4) { gsStep = 0; gsProgress = 0; gsU = []; gsBeta = [] }
    if (gsStep === 0) gsStep = 1
    loop2()
  }
}
function pause2() { playing2.value = false; if (rafId2) cancelAnimationFrame(rafId2) }
function reset2() {
  pause2(); gsStep = 0; gsProgress = 0; gsU = []; gsBeta = []; drawCanvas2()
}
function step2() {
  if (gsStep < 4) {
    gsStep++
    gsProgress = (gsStep < 4) ? 1 : 0
  } else {
    gsStep = 0; gsProgress = 0; gsU = []; gsBeta = []
  }
  drawCanvas2()
}

// ===== Animation 3: Householder reflection (Canvas) =====
const canvas3Ref = ref(null)
const playing3 = ref(false)
let ctx3 = null, rafId3 = null
let hhT = 0
const hhU = [Math.cos(Math.PI/3), Math.sin(Math.PI/3)]
const hhX = [2.2, 0.5]
const hhScale = 80, hhCx = 300, hhCy = 260

function drawCanvas3() {
  if (!ctx3) return
  const W = 600, H = 400
  ctx3.clearRect(0,0,W,H)

  ctx3.strokeStyle = '#f1f5f9'; ctx3.lineWidth = 1
  for (let i = -4; i <= 4; i++) {
    ctx3.beginPath(); ctx3.moveTo(hhCx+i*hhScale, 20); ctx3.lineTo(hhCx+i*hhScale, H-20); ctx3.stroke()
    ctx3.beginPath(); ctx3.moveTo(20, hhCy+i*hhScale); ctx3.lineTo(W-20, hhCy+i*hhScale); ctx3.stroke()
  }
  ctx3.strokeStyle = '#e2e8f0'; ctx3.lineWidth = 1.2
  ctx3.beginPath(); ctx3.moveTo(20,hhCy); ctx3.lineTo(W-20,hhCy); ctx3.stroke()
  ctx3.beginPath(); ctx3.moveTo(hhCx,20); ctx3.lineTo(hhCx,H-20); ctx3.stroke()

  const hx = -hhU[1], hy = hhU[0]
  const L = 5
  ctx3.strokeStyle = '#6366f1'; ctx3.lineWidth = 2.5; ctx3.setLineDash([8,4])
  ctx3.beginPath()
  ctx3.moveTo(hhCx+hx*L*hhScale, hhCy-hy*L*hhScale)
  ctx3.lineTo(hhCx-hx*L*hhScale, hhCy+hy*L*hhScale)
  ctx3.stroke(); ctx3.setLineDash([])
  ctx3.fillStyle = '#4338ca'; ctx3.font = 'bold 13px sans-serif'
  ctx3.fillText('镜面 (法向量 u)', hhCx+hx*L*hhScale-80, hhCy-hy*L*hhScale-10)

  drawArrow1(ctx3, hhCx, hhCy, hhCx+hhU[0]*hhScale*1.5, hhCy-hhU[1]*hhScale*1.5, '#f59e0b', 2)
  ctx3.fillStyle = '#d97706'; ctx3.font = 'bold 13px sans-serif'
  ctx3.fillText('u', hhCx+hhU[0]*hhScale*1.5+5, hhCy-hhU[1]*hhScale*1.5-5)

  const dot = hhX[0]*hhU[0] + hhX[1]*hhU[1]
  const hxX = [hhX[0] - 2*dot*hhU[0], hhX[1] - 2*dot*hhU[1]]

  const ang = Math.atan2(hhX[1], hhX[0])
  const hAng = Math.atan2(hxX[1], hxX[0])
  let curAng, curLen
  if (hhT < 1) {
    const t = hhT
    curAng = ang + (hAng - ang) * t
    curLen = Math.hypot(hhX[0], hhX[1])
  } else {
    curAng = hAng
    curLen = Math.hypot(hhX[0], hhX[1])
  }
  const cur = [curLen*Math.cos(curAng), curLen*Math.sin(curAng)]

  const proj = [dot*hhU[0], dot*hhU[1]]
  ctx3.strokeStyle = '#f59e0b'; ctx3.lineWidth = 1; ctx3.setLineDash([4,3])
  const onMirror = [hhX[0]-proj[0], hhX[1]-proj[1]]
  const curOnMirror = [cur[0] - (cur[0]*hhU[0]+cur[1]*hhU[1])*hhU[0], cur[1] - (cur[0]*hhU[0]+cur[1]*hhU[1])*hhU[1]]
  if (hhT > 0.01) {
    ctx3.beginPath()
    ctx3.moveTo(hhCx+curOnMirror[0]*hhScale, hhCy-curOnMirror[1]*hhScale)
    ctx3.lineTo(hhCx+cur[0]*hhScale, hhCy-cur[1]*hhScale)
    ctx3.stroke()
  }
  ctx3.setLineDash([])

  ctx3.globalAlpha = 0.25
  drawArrow1(ctx3, hhCx, hhCy, hhCx+hhX[0]*hhScale, hhCy-hhX[1]*hhScale, '#94a3b8', 1.5)
  ctx3.globalAlpha = 1

  ctx3.globalAlpha = 0.25
  drawArrow1(ctx3, hhCx, hhCy, hhCx+hxX[0]*hhScale, hhCy-hxX[1]*hhScale, '#ec4899', 1.5)
  ctx3.globalAlpha = 1

  const curColor = hhT < 0.5 ? '#4338ca' : '#ec4899'
  drawArrow1(ctx3, hhCx, hhCy, hhCx+cur[0]*hhScale, hhCy-cur[1]*hhScale, curColor, 3)
  ctx3.fillStyle = curColor; ctx3.font = 'bold 14px sans-serif'
  const lbl = hhT < 0.5 ? 'x' : 'Hx'
  ctx3.fillText(lbl, hhCx+cur[0]*hhScale+8, hhCy-cur[1]*hhScale-5)

  ctx3.strokeStyle = '#10b981'; ctx3.lineWidth = 1.2
  const r2 = 10
  ctx3.beginPath()
  const mx = curOnMirror[0]*hhScale, my = curOnMirror[1]*hhScale
  ctx3.moveTo(hhCx+mx+hx*r2, hhCy-my-hy*r2)
  ctx3.lineTo(hhCx+mx+hx*r2-hhU[0]*r2*0.7, hhCy-my-hy*r2+hhU[1]*r2*0.7)
  ctx3.lineTo(hhCx+mx-hhU[0]*r2*0.7, hhCy-my+hhU[1]*r2*0.7)
  ctx3.stroke()

  ctx3.fillStyle = '#1e293b'
  ctx3.beginPath(); ctx3.arc(hhCx, hhCy, 3, 0, Math.PI*2); ctx3.fill()

  ctx3.fillStyle = '#1e293b'; ctx3.font = 'bold 14px sans-serif'; ctx3.textAlign = 'center'
  const prog = Math.min(hhT, 1)
  ctx3.fillText(`Hx = x − 2(x·u)u   (进度 ${(prog*100).toFixed(0)}%)`, W/2, 28)
  ctx3.textAlign = 'left'
}

function loop3() {
  hhT += 0.008
  if (hhT > 2.2) hhT = 2.2
  drawCanvas3()
  rafId3 = requestAnimationFrame(loop3)
}
function play3() {
  if (!playing3.value) {
    playing3.value = true
    if (hhT >= 2.2) hhT = 0
    loop3()
  }
}
function pause3() { playing3.value = false; if (rafId3) cancelAnimationFrame(rafId3) }
function reset3() { pause3(); hhT = 0; drawCanvas3() }

onMounted(() => {
  const c1 = canvas1Ref.value
  if (c1) { ctx1 = c1.getContext('2d'); drawCanvas1() }
  const c2 = canvas2Ref.value
  if (c2) { ctx2 = c2.getContext('2d'); drawCanvas2() }
  const c3 = canvas3Ref.value
  if (c3) { ctx3 = c3.getContext('2d'); drawCanvas3() }
  renderTrigger.value++
  // Auto-start Gram-Schmidt animation on mount
  setTimeout(() => play2(), 600)
})

onUnmounted(() => {
  if (rafId1) cancelAnimationFrame(rafId1)
  if (rafId2) cancelAnimationFrame(rafId2)
  if (rafId3) cancelAnimationFrame(rafId3)
})
</script>
