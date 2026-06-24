<template>
  <LessonLayout :lesson-id="4" title="矩阵函数与矩阵微分方程" subtitle="Matrix Functions & ODEs">
    <Section num="1" title="矩阵幂级数与矩阵函数">
      <p>设幂级数 <span class="formula-inline">f(z)=\sum_{k=0}^\infty a_k z^k</span> 的收敛半径为 <span class="formula-inline">R</span>，
        <span class="formula-inline">A\in\mathbb{C}^{n\times n}</span> 的谱半径 <span class="formula-inline">\rho(A)\lt R</span>，则矩阵幂级数</p>
      <Theorem title="矩阵函数定义" type="definition" icon="🧮">
        <Formula display>f(A) = \sum_{k=0}^\infty a_k A^k</Formula>
        绝对收敛。最重要的矩阵函数是<strong>矩阵指数</strong>：
        <Formula display>e^{At} = \sum_{k=0}^\infty \frac{(At)^k}{k!} = I + At + \frac{A^2t^2}{2!} + \frac{A^3t^3}{3!} + \cdots</Formula>
      </Theorem>
    </Section>

    <Section num="2" title="矩阵函数的计算">
      <Theorem title="对角化公式" type="theorem">
        若 <span class="formula-inline">A=PDP^{-1}</span>，<span class="formula-inline">D=\operatorname{diag}(\lambda_1,\dots,\lambda_n)</span>，则
        <Formula display>f(A) = P\,f(D)\,P^{-1} = P\operatorname{diag}(f(\lambda_1),\dots,f(\lambda_n))P^{-1}</Formula>
        特别地，<span class="formula-inline">e^{At}=P\operatorname{diag}(e^{\lambda_1t},\dots,e^{\lambda_nt})P^{-1}</span>。
      </Theorem>

      <Theorem title="Jordan 块的矩阵指数" type="theorem">
        对 <span class="formula-inline">k</span> 阶 Jordan 块 <span class="formula-inline">J_k(\lambda)=\lambda I+N</span>：
        <Formula display>e^{J_k(\lambda)t} = e^{\lambda t}\begin{pmatrix} 1 & t & \dfrac{t^2}{2!} & \cdots & \dfrac{t^{k-1}}{(k-1)!} \\ & 1 & t & \cdots & \dfrac{t^{k-2}}{(k-2)!} \\ & & \ddots & \ddots & \vdots \\ & & & 1 & t \\ & & & & 1 \end{pmatrix}</Formula>
        即 <span class="formula-inline">e^{Jt}=e^{\lambda t}\left(I+tN+\dfrac{t^2N^2}{2!}+\cdots+\dfrac{t^{k-1}N^{k-1}}{(k-1)!}\right)</span>。
      </Theorem>
    </Section>

    <Section num="3" title="线性微分方程组">
      <Theorem title="齐次线性方程组的解" type="theorem">
        初值问题 <span class="formula-inline">x'(t)=Ax(t),\ x(0)=x_0</span> 的解为
        <Formula display>x(t) = e^{At}x_0</Formula>
      </Theorem>

      <Theorem title="常数变易公式" type="theorem">
        非齐次方程组 <span class="formula-inline">x'(t)=Ax(t)+f(t),\ x(0)=x_0</span> 的解为
        <Formula display>x(t) = e^{At}x_0 + \int_0^t e^{A(t-\tau)}f(\tau)\,d\tau</Formula>
      </Theorem>
    </Section>

    <Section num="4" title="二维相图分类">
      <p>对于二维齐次线性系统 <span class="formula-inline">x'=Ax</span>，平衡点的类型由 <span class="formula-inline">A</span> 的特征值决定：</p>
      <ul style="margin:8px 0 0 20px;">
        <li><strong>稳定结点</strong>：两特征值为负实数 <span class="formula-inline">\lambda_1\lt\lambda_2\lt 0</span>，轨线收敛到原点</li>
        <li><strong>不稳定结点</strong>：两特征值为正实数 <span class="formula-inline">0\lt\lambda_1\lt\lambda_2</span>，轨线远离原点</li>
        <li><strong>鞍点</strong>：两特征值一正一负 <span class="formula-inline">\lambda_1\lt 0\lt\lambda_2</span>，有稳定/不稳定流形</li>
        <li><strong>稳定螺旋</strong>：特征值为共轭复数 <span class="formula-inline">\alpha\pm i\beta</span>，<span class="formula-inline">\alpha\lt 0</span>，螺旋收敛</li>
        <li><strong>中心</strong>：特征值为纯虚数 <span class="formula-inline">\pm i\beta</span>，闭轨（椭圆/圆）</li>
      </ul>

      <AnimationBox title="相图流：五种平衡点" :playing="playing1" @play="play1" @pause="pause1" @reset="reset1"
        :step="true" @step="step1" description="点击▶播放观察粒子流动，或⏭步进切换平衡点类型：稳定结点→不稳定结点→鞍点→稳定螺旋→中心。">
        <canvas ref="canvas1Ref" width="600" height="400" style="max-width:100%;"></canvas>
      </AnimationBox>
    </Section>

    <Section num="5" title="旋转矩阵的指数">
      <p>当 <span class="formula-inline">A=\begin{pmatrix}0&-\omega\\\omega&0\end{pmatrix}</span>（反对称矩阵）时，
        <span class="formula-inline">e^{At}</span> 就是<strong>旋转矩阵</strong>：</p>
      <Formula display>e^{\begin{pmatrix}0&-\omega\\\omega&0\end{pmatrix}t} = \begin{pmatrix}\cos\omega t&-\sin\omega t\\\sin\omega t&\cos\omega t\end{pmatrix}</Formula>
      <p>对应微分方程的解做匀速圆周运动，这是"中心"型平衡点的典型例子。</p>

      <AnimationBox title="e^At 的匀速圆周运动" :playing="playing2" @play="play2" @pause="pause2" @reset="reset2"
        description="旋转矩阵 e^At 作用于初始向量 x₀，产生匀速圆周运动 x(t)=e^At x₀，轨迹为圆。">
        <canvas ref="canvas2Ref" width="600" height="400" style="max-width:100%;"></canvas>
      </AnimationBox>
    </Section>

    <Section num="6" title="幂级数累加逼近">
      <p>矩阵指数通过幂级数 <span class="formula-inline">e^{At}=I+At+\frac{(At)^2}{2!}+\cdots</span> 定义，
        截断到有限项即可逼近 <span class="formula-inline">e^{At}</span>。对于旋转矩阵，前几项就能给出很好的近似。</p>

      <AnimationBox title="幂级数累加逼近 e^At" :playing="playing3" @play="play3" @pause="pause3" @reset="reset3"
        :step="true" @step="step3" description="逐步累加幂级数项 S_N = Σ_{k=0}^{N} (At)^k/k!，观察 S_N x₀ 如何逼近真实解 e^At x₀（圆周上的点）。">
        <canvas ref="canvas3Ref" width="600" height="400" style="max-width:100%;"></canvas>
      </AnimationBox>
    </Section>

    <Section num="7" title="真题例题详解">
      <ExampleBox source="2023年期末考试" badge="📝 真题">
        <template #problem>
          设 <span class="formula-inline">A=\begin{pmatrix}1&-1\\2&-1\end{pmatrix}</span>，求 <span class="formula-inline">e^{At}</span>，
          并解微分方程组 <span class="formula-inline">x'=Ax,\ x(0)=(1,0)^T</span>。
        </template>
        <template #solution>
          <div class="step">
            <div class="step-num">1</div>
            <div class="step-text">
              <strong>求特征值：</strong>
              <span class="formula-inline">\det(\lambda I-A)=\begin{vmatrix}\lambda-1&1\\-2&\lambda+1\end{vmatrix}=(\lambda-1)(\lambda+1)+2=\lambda^2+1=0</span>，
              所以 <span class="formula-inline">\lambda_{1,2}=\pm i</span>（纯虚数）。
            </div>
          </div>
          <div class="step">
            <div class="step-num">2</div>
            <div class="step-text">
              <strong>对角化（复对角化）：</strong>
              <span class="formula-inline">\lambda=i</span> 的特征向量：解 <span class="formula-inline">(iI-A)x=0</span>，
              即 <span class="formula-inline">(i-1)x_1+x_2=0</span>，取 <span class="formula-inline">x_1=1</span>，<span class="formula-inline">x_2=1-i</span>，
              故 <span class="formula-inline">p_1=(1,1-i)^T</span>，<span class="formula-inline">p_2=(1,1+i)^T</span>。
            </div>
          </div>
          <div class="step">
            <div class="step-num">3</div>
            <div class="step-text">
              <strong>用对角化公式：</strong>
              <span class="formula-inline">P=\begin{pmatrix}1&1\\1-i&1+i\end{pmatrix}</span>，
              <span class="formula-inline">P^{-1}=\dfrac{1}{2i}\begin{pmatrix}1+i&-1\\i-1&1\end{pmatrix}</span>。
              <Formula display>e^{At}=P\begin{pmatrix}e^{it}&0\\0&e^{-it}\end{pmatrix}P^{-1}</Formula>
            </div>
          </div>
          <div class="step">
            <div class="step-num">4</div>
            <div class="step-text">
              <strong>计算得（利用 Euler 公式）：</strong>
              <Formula display>e^{At} = \begin{pmatrix}\cos t+\sin t&-\sin t\\2\sin t&\cos t-\sin t\end{pmatrix}</Formula>
              验证：<span class="formula-inline">t=0</span> 时为 <span class="formula-inline">I</span>，求导后满足 <span class="formula-inline">\frac{d}{dt}e^{At}=Ae^{At}</span>。
            </div>
          </div>
          <div class="step">
            <div class="step-num">5</div>
            <div class="step-text">
              <strong>解微分方程：</strong>
              <span class="formula-inline">x(t)=e^{At}x(0)=e^{At}(1,0)^T</span>，即第一列：
              <Formula display>x(t) = \begin{pmatrix}\cos t + \sin t \\ 2\sin t\end{pmatrix}</Formula>
              这是一个周期解（中心型），轨线为椭圆。
            </div>
          </div>
        </template>
      </ExampleBox>

      <ExampleBox source="2022年期末考试" badge="📝 真题">
        <template #problem>
          设 <span class="formula-inline">A=\begin{pmatrix}1&1\\0&1\end{pmatrix}</span>（Jordan 块），求 <span class="formula-inline">e^{At}</span>，
          并解 <span class="formula-inline">x'=Ax,\ x(0)=(1,1)^T</span>。
        </template>
        <template #solution>
          <div class="step">
            <div class="step-num">1</div>
            <div class="step-text">
              <strong>识别 Jordan 块：</strong>
              <span class="formula-inline">A = I + N</span>，其中 <span class="formula-inline">N=\begin{pmatrix}0&1\\0&0\end{pmatrix}</span>，
              <span class="formula-inline">N^2=0</span>。
            </div>
          </div>
          <div class="step">
            <div class="step-num">2</div>
            <div class="step-text">
              <strong>利用 Jordan 块指数公式：</strong>
              <span class="formula-inline">It</span> 与 <span class="formula-inline">Nt</span> 可交换，所以
              <Formula display>e^{At}=e^{It+Nt}=e^{It}\cdot e^{Nt}=e^t(I+Nt)=e^t\begin{pmatrix}1&t\\0&1\end{pmatrix}</Formula>
              其中 <span class="formula-inline">e^{Nt}=I+Nt+\dfrac{(Nt)^2}{2!}+\cdots=I+Nt</span>（因为 <span class="formula-inline">N^2=0</span>，高阶项全为零）。
            </div>
          </div>
          <div class="step">
            <div class="step-num">3</div>
            <div class="step-text">
              <strong>解微分方程：</strong>
              <Formula display>x(t)=e^{At}x(0)=e^t\begin{pmatrix}1&t\\0&1\end{pmatrix}\begin{pmatrix}1\\1\end{pmatrix}=e^t\begin{pmatrix}1+t\\1\end{pmatrix}</Formula>
              特征值 <span class="formula-inline">\lambda=1>0</span>（二重），解按 <span class="formula-inline">e^t</span> 指数增长（不稳定退化结点）。
              注意出现了 <span class="formula-inline">te^t</span> 项——这是 Jordan 块导致的"共振"现象。
            </div>
          </div>
        </template>
      </ExampleBox>

      <ExampleBox source="2021年期末考试" badge="📝 真题">
        <template #problem>
          用常数变易公式解 <span class="formula-inline">x'=\begin{pmatrix}0&1\\-1&0\end{pmatrix}x+\begin{pmatrix}0\\1\end{pmatrix}</span>，
          <span class="formula-inline">x(0)=(0,0)^T</span>。
        </template>
        <template #solution>
          <div class="step">
            <div class="step-num">1</div>
            <div class="step-text">
              <strong>齐次解矩阵：</strong>
              <span class="formula-inline">A=\begin{pmatrix}0&1\\-1&0\end{pmatrix}</span>，
              特征值 <span class="formula-inline">\pm i</span>，
              <span class="formula-inline">e^{At}=\begin{pmatrix}\cos t&\sin t\\-\sin t&\cos t\end{pmatrix}</span>。
            </div>
          </div>
          <div class="step">
            <div class="step-num">2</div>
            <div class="step-text">
              <strong>常数变易公式：</strong>
              <Formula display>x(t)=\int_0^t e^{A(t-\tau)}f(\tau)\,d\tau=\int_0^t \begin{pmatrix}\cos(t-\tau)&\sin(t-\tau)\\-\sin(t-\tau)&\cos(t-\tau)\end{pmatrix}\begin{pmatrix}0\\1\end{pmatrix}d\tau</Formula>
            </div>
          </div>
          <div class="step">
            <div class="step-num">3</div>
            <div class="step-text">
              <strong>计算积分：</strong>
              <span class="formula-inline">x_1(t)=\int_0^t\sin(t-\tau)d\tau=\int_0^t\sin u\,du=1-\cos t</span>，
              <span class="formula-inline">x_2(t)=\int_0^t\cos(t-\tau)d\tau=\int_0^t\cos u\,du=\sin t</span>。
            </div>
          </div>
          <div class="step">
            <div class="step-num">4</div>
            <div class="step-text">
              <strong>解：</strong>
              <Formula display>x(t)=\begin{pmatrix}1-\cos t\\\sin t\end{pmatrix}</Formula>
              这是中心附近的周期运动。
            </div>
          </div>
        </template>
      </ExampleBox>
    </Section>

    <Section title="📌 知识点小结">
      <Steps :steps="[
        '矩阵指数 e^At = Σ (At)^k/k!，对任何方阵 A 都收敛',
        '对角化：A=PDP⁻¹ ⇒ f(A)=Pf(D)P⁻¹，e^At=P·diag(e^λᵢt)·P⁻¹',
        'Jordan 块指数：e^{Jt}=e^{λt}(I+tN+t²N²/2!+…+t^{k-1}N^{k-1}/(k-1)!)，出现 t^m e^{λt} 项',
        '齐次解 x(t)=e^At·x(0)；非齐次用常数变易公式',
        '二维相图分类：由特征值实部/虚部决定（结点、鞍点、螺旋、中心）',
        '反对称矩阵 A=[[0,-ω],[ω,0]] 的 e^At 是旋转矩阵，产生匀速圆周运动'
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
import { useKatex } from '../../composables/useKatex'
import { ref, onMounted, onUnmounted } from 'vue'

const renderTrigger = ref(0)
useKatex(renderTrigger)

// ===== Animation 1: Phase portrait (Canvas) =====
const canvas1Ref = ref(null)
const playing1 = ref(false)
let ctx1 = null, rafId1 = null
let t1 = 0
let phaseType1 = 0  // 0: stable node, 1: unstable node, 2: saddle, 3: spiral, 4: center
const phaseNames = ['稳定结点', '不稳定结点', '鞍点', '稳定螺旋', '中心']

// Predefined matrices for each phase type
function getMatrix1(type) {
  switch(type) {
    case 0: return [[-2, 0.3], [0.3, -1]]  // stable node: evals -2.3, -0.7
    case 1: return [[2, -0.3], [-0.3, 1]]   // unstable node
    case 2: return [[1, 0], [0, -2]]        // saddle
    case 3: return [[-0.5, -2], [2, -0.5]]  // stable spiral: -0.5 ± 2i
    case 4: return [[0, -1.5], [1.5, 0]]    // center: ±1.5i
    default: return [[-1,0],[0,-2]]
  }
}

// Particles
let particles1 = []
function initParticles1() {
  particles1 = []
  for (let i = 0; i < 60; i++) {
    const ang = Math.random() * Math.PI * 2
    const r = 30 + Math.random() * 140
    particles1.push({
      x: Math.cos(ang) * r,
      y: Math.sin(ang) * r,
      life: 0
    })
  }
}

function stepParticles1(dt, A) {
  const speed = 0.03
  particles1.forEach(p => {
    const vx = A[0][0]*p.x + A[0][1]*p.y
    const vy = A[1][0]*p.x + A[1][1]*p.y
    p.x += vx * speed * dt
    p.y += vy * speed * dt
    p.life += dt
    // Reset if particle goes too far or converges too much
    const r = Math.hypot(p.x, p.y)
    if (r > 180 || r < 2 || p.life > 500) {
      const ang = Math.random() * Math.PI * 2
      const nr = 50 + Math.random() * 100
      p.x = Math.cos(ang) * nr
      p.y = Math.sin(ang) * nr
      p.life = 0
    }
  })
}

function drawCanvas1() {
  if (!ctx1) return
  const W = 600, H = 400
  const cx = W/2, cy = H/2
  const sc = 1.2
  ctx1.clearRect(0,0,W,H)

  // Background
  ctx1.fillStyle = '#fafbff'
  ctx1.fillRect(0,0,W,H)

  // Grid
  ctx1.strokeStyle = '#eef2ff'; ctx1.lineWidth = 1
  for (let i = -10; i <= 10; i++) {
    ctx1.beginPath(); ctx1.moveTo(cx+i*30, 0); ctx1.lineTo(cx+i*30, H); ctx1.stroke()
    ctx1.beginPath(); ctx1.moveTo(0, cy+i*30); ctx1.lineTo(W, cy+i*30); ctx1.stroke()
  }

  // Axes
  ctx1.strokeStyle = '#cbd5e1'; ctx1.lineWidth = 1.5
  ctx1.beginPath(); ctx1.moveTo(0,cy); ctx1.lineTo(W,cy); ctx1.stroke()
  ctx1.beginPath(); ctx1.moveTo(cx,0); ctx1.lineTo(cx,H); ctx1.stroke()

  // Draw vector field (small arrows)
  const A = getMatrix1(phaseType1)
  const gridStep = 40
  ctx1.strokeStyle = 'rgba(99,102,241,0.3)'; ctx1.fillStyle = 'rgba(99,102,241,0.5)'
  ctx1.lineWidth = 1
  for (let gx = gridStep; gx < W; gx += gridStep) {
    for (let gy = gridStep; gy < H; gy += gridStep) {
      const vx0 = (gx-cx)/sc, vy0 = -(gy-cy)/sc
      const vxv = A[0][0]*vx0 + A[0][1]*vy0
      const vyv = A[1][0]*vx0 + A[1][1]*vy0
      const mag = Math.hypot(vxv, vyv)
      if (mag < 0.01) continue
      const scale = 12 / Math.max(mag, 1)
      const dx = vxv * scale, dy = -vyv * scale
      ctx1.beginPath()
      ctx1.moveTo(gx, gy)
      ctx1.lineTo(gx+dx, gy+dy)
      ctx1.stroke()
      // arrow head
      const ang = Math.atan2(dy, dx)
      ctx1.beginPath()
      ctx1.moveTo(gx+dx, gy+dy)
      ctx1.lineTo(gx+dx-4*Math.cos(ang-0.4), gy+dy-4*Math.sin(ang-0.4))
      ctx1.lineTo(gx+dx-4*Math.cos(ang+0.4), gy+dy-4*Math.sin(ang+0.4))
      ctx1.closePath(); ctx1.fill()
    }
  }

  // Draw particles (flow lines)
  particles1.forEach(p => {
    const alpha = Math.min(1, p.life / 30)
    const colors = ['#4338ca', '#7c3aed', '#ec4899', '#0ea5e9', '#10b981']
    ctx1.fillStyle = colors[phaseType1]
    ctx1.globalAlpha = alpha * 0.8
    const px = cx + p.x*sc, py = cy - p.y*sc
    ctx1.beginPath(); ctx1.arc(px, py, 2.5, 0, Math.PI*2); ctx1.fill()
  })
  ctx1.globalAlpha = 1

  // Equilibrium point
  ctx1.fillStyle = '#dc2626'
  ctx1.beginPath(); ctx1.arc(cx, cy, 5, 0, Math.PI*2); ctx1.fill()
  ctx1.strokeStyle = '#fff'; ctx1.lineWidth = 2; ctx1.stroke()

  // Label
  ctx1.fillStyle = '#1e293b'; ctx1.font = 'bold 15px sans-serif'; ctx1.textAlign = 'center'
  ctx1.fillText(phaseNames[phaseType1], cx, 25)
  ctx1.font = '12px sans-serif'; ctx1.fillStyle = '#64748b'
  const evLabels = [
    'λ₁≈-2.3, λ₂≈-0.7 (两负)',
    'λ₁≈2.3, λ₂≈0.7 (两正)',
    'λ₁=1, λ₂=-2 (一正一负)',
    'λ=-0.5±2i (实部负)',
    'λ=±1.5i (纯虚)'
  ]
  ctx1.fillText(evLabels[phaseType1], cx, H-12)
  ctx1.textAlign = 'left'
}

function loop1() {
  t1 += 1
  const A = getMatrix1(phaseType1)
  stepParticles1(1, A)
  drawCanvas1()
  rafId1 = requestAnimationFrame(loop1)
}
function play1() { if (!playing1.value) { playing1.value = true; loop1() } }
function pause1() { playing1.value = false; if (rafId1) cancelAnimationFrame(rafId1) }
function reset1() { pause1(); initParticles1(); drawCanvas1() }
function step1() {
  phaseType1 = (phaseType1 + 1) % 5
  initParticles1()
  drawCanvas1()
}

// ===== Animation 2: e^At circular motion (Canvas) =====
const canvas2Ref = ref(null)
const playing2 = ref(false)
let ctx2 = null, rafId2 = null
let t2 = 0
const omega2 = 1.0
const cx2 = 300, cy2 = 220, sc2 = 130
// Trail
let trail2 = []

function drawCanvas2() {
  if (!ctx2) return
  const W = 600, H = 400
  ctx2.clearRect(0,0,W,H)

  // Grid
  ctx2.strokeStyle = '#f1f5f9'; ctx2.lineWidth = 1
  for (let i = -4; i <= 4; i++) {
    ctx2.beginPath(); ctx2.moveTo(cx2+i*50, 20); ctx2.lineTo(cx2+i*50, H-20); ctx2.stroke()
    ctx2.beginPath(); ctx2.moveTo(20, cy2+i*50); ctx2.lineTo(W-20, cy2+i*50); ctx2.stroke()
  }
  ctx2.strokeStyle = '#cbd5e1'; ctx2.lineWidth = 1.5
  ctx2.beginPath(); ctx2.moveTo(20,cy2); ctx2.lineTo(W-20,cy2); ctx2.stroke()
  ctx2.beginPath(); ctx2.moveTo(cx2,20); ctx2.lineTo(cx2,H-20); ctx2.stroke()

  // Circle orbit
  ctx2.strokeStyle = 'rgba(99,102,241,0.3)'; ctx2.lineWidth = 2; ctx2.setLineDash([5,4])
  ctx2.beginPath(); ctx2.arc(cx2, cy2, sc2, 0, Math.PI*2); ctx2.stroke()
  ctx2.setLineDash([])

  // Rotating vector: x(t) = R(t)*x0 where R(t) = [[cos,-sin],[sin,cos]], x0 = [1,0]
  const x0 = [1, 0]
  const ct = Math.cos(omega2 * t2), st = Math.sin(omega2 * t2)
  const xt = [ct*x0[0] - st*x0[1], st*x0[0] + ct*x0[1]]
  const px = cx2 + xt[0]*sc2, py = cy2 - xt[1]*sc2

  // Trail
  if (playing2.value && trail2.length < 200) {
    trail2.push({x: px, y: py})
  }
  if (trail2.length > 0) {
    ctx2.strokeStyle = '#ec4899'; ctx2.lineWidth = 2.5
    ctx2.beginPath()
    trail2.forEach((p,i) => {
      ctx2.globalAlpha = i / trail2.length
      i===0 ? ctx2.moveTo(p.x,p.y) : ctx2.lineTo(p.x,p.y)
    })
    ctx2.stroke(); ctx2.globalAlpha = 1
  }

  // Current vector
  ctx2.strokeStyle = '#4338ca'; ctx2.lineWidth = 3
  ctx2.beginPath(); ctx2.moveTo(cx2,cy2); ctx2.lineTo(px,py); ctx2.stroke()
  // Arrow head
  const ang = Math.atan2(py-cy2, px-cx2)
  ctx2.fillStyle = '#4338ca'
  ctx2.beginPath()
  ctx2.moveTo(px, py)
  ctx2.lineTo(px-12*Math.cos(ang-0.35), py-12*Math.sin(ang-0.35))
  ctx2.lineTo(px-12*Math.cos(ang+0.35), py-12*Math.sin(ang+0.35))
  ctx2.closePath(); ctx2.fill()

  // Point
  ctx2.fillStyle = '#ec4899'
  ctx2.beginPath(); ctx2.arc(px, py, 6, 0, Math.PI*2); ctx2.fill()

  // Initial vector (faded)
  ctx2.strokeStyle = 'rgba(148,163,184,0.4)'; ctx2.lineWidth = 1.5; ctx2.setLineDash([4,3])
  ctx2.beginPath(); ctx2.moveTo(cx2,cy2); ctx2.lineTo(cx2+sc2,cy2); ctx2.stroke()
  ctx2.setLineDash([])

  // Labels
  ctx2.fillStyle = '#1e293b'; ctx2.font = 'bold 14px sans-serif'; ctx2.textAlign = 'center'
  ctx2.fillText(`x(t) = e^{At}x₀,  t = ${t2.toFixed(2)}`, cx2, 25)
  ctx2.fillStyle = '#64748b'; ctx2.font = '13px sans-serif'
  ctx2.fillText('A = [[0,-ω],[ω,0]] → 旋转矩阵，匀速圆周运动', cx2, H-12)
  ctx2.textAlign = 'left'
  ctx2.fillStyle = '#4338ca'; ctx2.font = 'bold 12px sans-serif'
  ctx2.fillText('x₀', cx2+sc2+5, cy2+15)
}

function loop2() {
  t2 += 0.02
  if (t2 > Math.PI*2/omega2) {
    t2 = 0
    trail2 = []
  }
  drawCanvas2()
  rafId2 = requestAnimationFrame(loop2)
}
function play2() {
  if (!playing2.value) { playing2.value = true; if (trail2.length === 0) trail2 = []; loop2() }
}
function pause2() { playing2.value = false; if (rafId2) cancelAnimationFrame(rafId2) }
function reset2() { pause2(); t2 = 0; trail2 = []; drawCanvas2() }

// ===== Animation 3: Power series approximation (Canvas) =====
const canvas3Ref = ref(null)
const playing3 = ref(false)
let ctx3 = null, rafId3 = null
let t3 = 0
let N3 = 0  // current partial sum order
const omega3 = 1.0
const cx3 = 300, cy3 = 220, sc3 = 130
let approxTrail3 = []
let exactTrail3 = []
let animPhase3 = 0  // 0: adding terms, 1: showing evolution

// Compute e^{At} partial sum up to N terms for rotation matrix A=[[0,-1],[1,0]]
// A^k cycles every 4: A^0=I, A^1=A, A^2=-I, A^3=-A, A^4=I, ...
function partialSum(N, t) {
  // S_N = sum_{k=0}^N (At)^k / k!
  // For A = [[0,-1],[1,0]]:
  // (At)^0 = I = [[1,0],[0,1]]
  // (At)^1 = At = [[0,-t],[t,0]]
  // (At)^2 = -t^2 I = [[-t^2,0],[0,-t^2]]
  // (At)^3 = -t^3 A = [[0,t^3],[-t^3,0]]
  // (At)^4 = t^4 I
  // pattern: even k: (-1)^{k/2} t^k I for k/2 even, etc.
  // Actually just: S_N = [[sum (-1)^m t^{2m}/(2m)! , -sum (-1)^m t^{2m+1}/(2m+1)!],
  //                       [sum (-1)^m t^{2m+1}/(2m+1)! , sum (-1)^m t^{2m}/(2m)! ]]
  let c = 0, s = 0
  let tkC = 1, kC = 1  // t^k/k! for cos series (even)
  let tkS = t, kS = 1  // t^k/k! for sin series (odd)
  for (let k = 0; k <= N; k++) {
    if (k % 2 === 0) {
      const m = k/2
      const sign = (m % 2 === 0) ? 1 : -1
      c += sign * tkC
      // prepare for next even
      tkC *= t*t / ((k+1)*(k+2))
    } else {
      const m = (k-1)/2
      const sign = (m % 2 === 0) ? 1 : -1
      s += sign * tkS
      tkS *= t*t / ((k+1)*(k+2))
    }
  }
  return [[c, -s], [s, c]]
}

function matVec3(M, v) { return [M[0][0]*v[0]+M[0][1]*v[1], M[1][0]*v[0]+M[1][1]*v[1]] }

function drawCanvas3() {
  if (!ctx3) return
  const W = 600, H = 400
  ctx3.clearRect(0,0,W,H)

  // Grid
  ctx3.strokeStyle = '#f1f5f9'; ctx3.lineWidth = 1
  for (let i = -4; i <= 4; i++) {
    ctx3.beginPath(); ctx3.moveTo(cx3+i*50, 20); ctx3.lineTo(cx3+i*50, H-20); ctx3.stroke()
    ctx3.beginPath(); ctx3.moveTo(20, cy3+i*50); ctx3.lineTo(W-20, cy3+i*50); ctx3.stroke()
  }
  ctx3.strokeStyle = '#cbd5e1'; ctx3.lineWidth = 1.5
  ctx3.beginPath(); ctx3.moveTo(20,cy3); ctx3.lineTo(W-20,cy3); ctx3.stroke()
  ctx3.beginPath(); ctx3.moveTo(cx3,20); ctx3.lineTo(cx3,H-20); ctx3.stroke()

  // Exact circle
  ctx3.strokeStyle = 'rgba(16,185,129,0.4)'; ctx3.lineWidth = 2; ctx3.setLineDash([5,4])
  ctx3.beginPath(); ctx3.arc(cx3, cy3, sc3, 0, Math.PI*2); ctx3.stroke()
  ctx3.setLineDash([])

  // Compute approximate position at time t3 using partial sum up to N3
  const S = partialSum(N3, t3)
  const x0 = [1, 0]
  const xApp = matVec3(S, x0)
  const xExact = [Math.cos(omega3*t3), Math.sin(omega3*t3)]

  const appX = cx3 + xApp[0]*sc3, appY = cy3 - xApp[1]*sc3
  const exaX = cx3 + xExact[0]*sc3, exaY = cy3 - xExact[1]*sc3

  // Approx trail
  if (playing3.value) {
    approxTrail3.push({x: appX, y: appY})
    exactTrail3.push({x: exaX, y: exaY})
    if (approxTrail3.length > 300) { approxTrail3.shift(); exactTrail3.shift() }
  }
  if (exactTrail3.length > 1) {
    ctx3.strokeStyle = '#10b981'; ctx3.lineWidth = 2
    ctx3.beginPath()
    exactTrail3.forEach((p,i) => i===0 ? ctx3.moveTo(p.x,p.y) : ctx3.lineTo(p.x,p.y))
    ctx3.stroke()
  }
  if (approxTrail3.length > 1) {
    ctx3.strokeStyle = '#6366f1'; ctx3.lineWidth = 2.5
    ctx3.beginPath()
    approxTrail3.forEach((p,i) => i===0 ? ctx3.moveTo(p.x,p.y) : ctx3.lineTo(p.x,p.y))
    ctx3.stroke()
  }

  // Current approx vector
  ctx3.strokeStyle = '#4338ca'; ctx3.lineWidth = 3
  ctx3.beginPath(); ctx3.moveTo(cx3,cy3); ctx3.lineTo(appX,appY); ctx3.stroke()
  ctx3.fillStyle = '#4338ca'
  ctx3.beginPath(); ctx3.arc(appX, appY, 6, 0, Math.PI*2); ctx3.fill()

  // Exact point
  ctx3.fillStyle = '#10b981'
  ctx3.beginPath(); ctx3.arc(exaX, exaY, 5, 0, Math.PI*2); ctx3.fill()

  // Legend
  ctx3.fillStyle = '#1e293b'; ctx3.font = 'bold 14px sans-serif'; ctx3.textAlign = 'center'
  ctx3.fillText(`N = ${N3}（幂级数前 ${N3+1} 项和）,  t = ${t3.toFixed(2)}`, cx3, 25)
  ctx3.fillStyle = '#4338ca'; ctx3.font = '12px sans-serif'
  ctx3.fillText(`S_N x₀ = (${xApp[0].toFixed(3)}, ${xApp[1].toFixed(3)})`, cx3-60, 48)
  ctx3.fillStyle = '#10b981'
  ctx3.fillText(`精确 e^{At}x₀ = (${xExact[0].toFixed(3)}, ${xExact[1].toFixed(3)})`, cx3+80, 48)
  ctx3.fillStyle = '#64748b'; ctx3.font = '12px sans-serif'
  ctx3.fillText('蓝色：幂级数逼近；绿色：精确解。N 越大，逼近越好。', cx3, H-12)
  ctx3.textAlign = 'left'
}

function loop3() {
  t3 += 0.025
  if (t3 > Math.PI*2) {
    t3 = 0
    approxTrail3 = []
    exactTrail3 = []
    if (N3 < 10) N3++
    else N3 = 0
  }
  drawCanvas3()
  rafId3 = requestAnimationFrame(loop3)
}
function play3() { if (!playing3.value) { playing3.value = true; loop3() } }
function pause3() { playing3.value = false; if (rafId3) cancelAnimationFrame(rafId3) }
function reset3() { pause3(); t3 = 0; N3 = 0; approxTrail3 = []; exactTrail3 = []; drawCanvas3() }
function step3() {
  N3 = Math.min(N3 + 1, 12)
  t3 = 0
  approxTrail3 = []
  exactTrail3 = []
  drawCanvas3()
}

onMounted(() => {
  const c1 = canvas1Ref.value
  if (c1) { ctx1 = c1.getContext('2d'); initParticles1(); drawCanvas1() }
  const c2 = canvas2Ref.value
  if (c2) { ctx2 = c2.getContext('2d'); drawCanvas2() }
  const c3 = canvas3Ref.value
  if (c3) { ctx3 = c3.getContext('2d'); drawCanvas3() }
  renderTrigger.value++
})
onUnmounted(() => {
  if (rafId1) cancelAnimationFrame(rafId1)
  if (rafId2) cancelAnimationFrame(rafId2)
  if (rafId3) cancelAnimationFrame(rafId3)
})
</script>
