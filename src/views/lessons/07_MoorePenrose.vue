<template>
  <LessonLayout :lesson-id="7" title="Moore-Penrose广义逆" subtitle="Moore-Penrose Pseudoinverse">

    <!-- 1. 广义逆的引入 -->
    <Section num="1" title="广义逆的引入">
      <p>
        当 <span class="formula-inline">A</span> 不是方阵或奇异时，逆矩阵不存在。Moore-Penrose 广义逆
        <span class="formula-inline">A^+</span> 将逆矩阵的概念推广到任意矩阵，在最小二乘、优化等领域有广泛应用。
      </p>
      <Theorem title="为什么需要广义逆？" type="tip" icon="💡">
        <ul>
          <li>方阵 <span class="formula-inline">A</span> 可逆时，<span class="formula-inline">Ax=b</span> 有唯一解 <span class="formula-inline">x=A^{-1}b</span>；</li>
          <li><span class="formula-inline">A</span> 不可逆或非方阵时，需要"类似逆"的矩阵来表示"解"：<span class="formula-inline">x=A^+b</span>；</li>
          <li><span class="formula-inline">A^+b</span> 给出矛盾方程组的<strong>极小范数最小二乘解</strong>。</li>
        </ul>
      </Theorem>
    </Section>

    <!-- 2. Penrose方程 -->
    <Section num="2" title="Penrose方程">
      <Theorem title="Moore-Penrose四个条件" type="definition" icon="🔮">
        设 <span class="formula-inline">A\in\C^{m\times n}</span>，若 <span class="formula-inline">X\in\C^{n\times m}</span> 满足：
        <ol>
          <li><span class="formula-inline">AXA = A</span>（<span class="formula-inline">AX</span> 是沿 <span class="formula-inline">N(A)</span> 到 <span class="formula-inline">R(A)</span> 的投影）</li>
          <li><span class="formula-inline">XAX = X</span>（<span class="formula-inline">XA</span> 是幂等的）</li>
          <li><span class="formula-inline">(AX)\T = AX</span>（<span class="formula-inline">AX</span> 是对称的）</li>
          <li><span class="formula-inline">(XA)\T = XA</span>（<span class="formula-inline">XA</span> 是对称的）</li>
        </ol>
        则称 <span class="formula-inline">X</span> 为 <span class="formula-inline">A</span> 的 M-P 广义逆，记为 <span class="formula-inline">A^+</span>。
      </Theorem>
      <Theorem title="存在唯一性" type="theorem">
        对任意矩阵 <span class="formula-inline">A</span>，M-P 广义逆 <span class="formula-inline">A^+</span> 存在且唯一。
      </Theorem>

      <Theorem title="特殊情形" type="note" icon="📌">
        <ul>
          <li>若 <span class="formula-inline">A</span> 可逆，则 <span class="formula-inline">A^+ = A^{-1}</span>；</li>
          <li>若 <span class="formula-inline">A</span> 列满秩，则 <span class="formula-inline">A^+ = (A\T A)^{-1}A\T</span>（左逆）；</li>
          <li>若 <span class="formula-inline">A</span> 行满秩，则 <span class="formula-inline">A^+ = A\T(AA\T)^{-1}</span>（右逆）；</li>
          <li>零矩阵 <span class="formula-inline">O</span> 的广义逆 <span class="formula-inline">O^+ = O</span>。</li>
        </ul>
      </Theorem>
    </Section>

    <!-- 3. A⁺的SVD构造 -->
    <Section num="3" title="A⁺的SVD构造">
      <Theorem title="利用SVD求A⁺" type="theorem">
        设 <span class="formula-inline">A = U\Sigma V\T</span> 为 <span class="formula-inline">A</span> 的奇异值分解，则
        <Formula display>A^+ = V\Sigma^+ U\T</Formula>
        其中 <span class="formula-inline">\Sigma^+</span> 是将 <span class="formula-inline">\Sigma</span> 中非零奇异值取倒数后转置得到的矩阵：
        <div class="formula-block">
          \Sigma = \begin{pmatrix} \sigma_1 & & & \\ & \ddots & & \\ & & \sigma_r & \\ & & & 0 \end{pmatrix}, \quad
          \Sigma^+ = \begin{pmatrix} 1/\sigma_1 & & & \\ & \ddots & & \\ & & 1/\sigma_r & \\ & & & 0 \end{pmatrix}\T
        </div>
      </Theorem>

      <Theorem title="满秩分解法求A⁺" type="theorem">
        若 <span class="formula-inline">A = FG</span> 为满秩分解（<span class="formula-inline">F</span> 列满秩，<span class="formula-inline">G</span> 行满秩），则：
        <Formula display>A^+ = G\T(GG\T)^{-1}(F\T F)^{-1}F\T</Formula>
      </Theorem>
    </Section>

    <!-- 4. AA⁺投影动画 -->
    <Section num="4" title="动画：AA⁺正交投影几何意义">
      <p>
        <span class="formula-inline">AA^+</span> 是到列空间 <span class="formula-inline">R(A)</span> 的正交投影矩阵，
        <span class="formula-inline">A^+A</span> 是到 <span class="formula-inline">R(A\T)</span> 的正交投影矩阵。
        观察向量 <span class="formula-inline">b</span> 经 <span class="formula-inline">AA^+</span> 投影到列空间的过程：
      </p>

      <AnimationBox
        title="AA⁺ 正交投影动画"
        :playing="projPlaying"
        description="红色向量b经AA⁺投影到列空间（蓝色直线），绿色为投影结果AA⁺b = Ax⁺"
        @play="projPlay"
        @pause="projPause"
        @reset="projReset"
      >
        <svg :width="projSvgWidth" height="380" viewBox="0 0 700 380">
          <g transform="translate(350, 200)">
            <!-- 坐标轴 -->
            <line x1="-280" y1="0" x2="280" y2="0" stroke="#e2e8f0" stroke-width="1"/>
            <line x1="0" y1="-170" x2="0" y2="170" stroke="#e2e8f0" stroke-width="1"/>
            <polygon points="280,0 272,-5 272,5" fill="#94a3b8"/>
            <polygon points="0,-170 -5,-162 5,-162" fill="#94a3b8"/>

            <!-- 列空间 R(A) (一条过原点的直线) -->
            <line x1="-220" :y1="-220*projSlope" x2="220" :y2="220*projSlope" stroke="#3b82f6" stroke-width="2.5" opacity="0.6"/>
            <text x="200" :y="200*projSlope - 10" font-size="13" fill="#2563eb" font-weight="600">R(A) 列空间</text>

            <!-- 正交补空间 N(A^T) (垂直于R(A)) -->
            <line x1="-120" :y1="120/projSlope" x2="120" :y2="-120/projSlope" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6,4"/>
            <text x="100" :y="-100/projSlope + 5" font-size="11" fill="#94a3b8">N(Aᵀ)</text>

            <!-- 原始向量 b (红色) -->
            <template v-if="projStep >= 0">
              <line x1="0" y1="0" :x2="projB[0]*80" :y2="-projB[1]*80" stroke="#ef4444" stroke-width="3" :opacity="projStep === 1 ? (1-projT) : 1"/>
              <circle :cx="projB[0]*80" :cy="-projB[1]*80" r="5" fill="#ef4444" :opacity="projStep === 1 ? (1-projT) : 1"/>
              <text :x="projB[0]*80 + 10" :y="-projB[1]*80" font-size="14" fill="#ef4444" font-weight="700" :opacity="projStep === 1 ? (1-projT) : 1">b</text>
            </template>

            <!-- 投影分量 (绿色) -->
            <template v-if="projStep >= 1">
              <line x1="0" y1="0" :x2="projProj[0]*80" :y2="-projProj[1]*80" stroke="#059669" stroke-width="3" :opacity="projStep === 1 ? projT : 1"/>
              <circle :cx="projProj[0]*80" :cy="-projProj[1]*80" r="5" fill="#059669" :opacity="projStep === 1 ? projT : 1"/>
              <text :x="projProj[0]*80 + 10" :y="-projProj[1]*80" font-size="14" fill="#059669" font-weight="700" :opacity="projStep === 1 ? projT : 1">Ax⁺=AA⁺b</text>
            </template>

            <!-- 残差 (橙色虚线) -->
            <template v-if="projStep >= 1">
              <line :x1="projB[0]*80" :y1="-projB[1]*80" :x2="projProj[0]*80" :y2="-projProj[1]*80"
                stroke="#f97316" stroke-width="2" stroke-dasharray="6,4" :opacity="projStep === 1 ? projT : 1"/>
              <text :x="(projB[0]+projProj[0])/2*80 + 8" :y="-(projB[1]+projProj[1])/2*80" font-size="11" fill="#f97316" :opacity="projStep === 1 ? projT : 1">残差⊥R(A)</text>
            </template>

            <!-- 投影动画中的投影线（垂直于R(A)的虚线） -->
            <template v-if="projStep >= 1">
              <line :x1="projB[0]*80" :y1="-projB[1]*80"
                :x2="(projB[0]+(projProj[0]-projB[0])*projT)*80"
                :y2="-(projB[1]+(projProj[1]-projB[1])*projT)*80"
                stroke="#8b5cf6" stroke-width="1.5" stroke-dasharray="4,3" opacity="0.6"/>
            </template>
          </g>

          <!-- 信息板 -->
          <rect x="30" y="290" width="640" height="75" rx="10" fill="#f0fdfa" stroke="#14b8a6" stroke-width="1.5"/>
          <text x="350" y="315" text-anchor="middle" font-size="14" font-weight="600" fill="#0d9488">{{ projStepText }}</text>
          <text x="350" y="337" text-anchor="middle" font-size="12" fill="#475569">b = Ax⁺ + (b-Ax⁺)，其中 Ax⁺ ∈ R(A)，b-Ax⁺ ⊥ R(A)</text>
          <text x="350" y="355" text-anchor="middle" font-size="11" fill="#94a3b8">步骤 {{ projStep }} / 2</text>
        </svg>
      </AnimationBox>
    </Section>

    <!-- 5. 广义逆与最小二乘 -->
    <Section num="5" title="广义逆与最小二乘">
      <Theorem title="极小范数最小二乘解" type="theorem">
        矛盾方程组 <span class="formula-inline">Ax=b</span> 的极小范数最小二乘解唯一存在，且为
        <Formula display>x^+ = A^+ b</Formula>
        其中 <span class="formula-inline">x^+</span> 同时满足：
        <ul>
          <li><strong>最小二乘：</strong><span class="formula-inline">\|Ax^+ - b\| = \min_x \|Ax - b\|</span></li>
          <li><strong>极小范数：</strong>在所有最小二乘解中，<span class="formula-inline">\|x^+\|</span> 最小。</li>
        </ul>
      </Theorem>

      <!-- Penrose方程关系图（auto模式） -->
      <AnimationBox
        mode="auto"
        title="Penrose方程与A⁺性质关系图"
        description="脉冲依次展示四个Penrose条件及其几何意义"
      >
        <div class="penrose-map">
          <div class="pm-center">A⁺</div>
          <div class="pm-nodes">
            <div class="pm-node pm-n1" style="animation-delay:0s">
              <div class="pm-eq">AXA=A</div>
              <div class="pm-desc">AX是投影到R(A)</div>
            </div>
            <div class="pm-node pm-n2" style="animation-delay:1.5s">
              <div class="pm-eq">XAX=X</div>
              <div class="pm-desc">XA是幂等的</div>
            </div>
            <div class="pm-node pm-n3" style="animation-delay:3s">
              <div class="pm-eq">(AX)ᵀ=AX</div>
              <div class="pm-desc">AX是对称投影</div>
            </div>
            <div class="pm-node pm-n4" style="animation-delay:4.5s">
              <div class="pm-eq">(XA)ᵀ=XA</div>
              <div class="pm-desc">XA是对称投影</div>
            </div>
          </div>
        </div>
      </AnimationBox>
    </Section>

    <!-- 6. 真题精讲 -->
    <Section num="6" title="真题精讲">
      <ExampleBox source="2021年期末考试" badge="📝 真题例题">
        <template #problem>
          <p>用SVD求矩阵 <span class="formula-inline">A = \begin{pmatrix} 1 & 1 \\ 1 & 1 \\ 0 & 0 \end{pmatrix}</span> 的M-P广义逆 <span class="formula-inline">A^+</span>。</p>
        </template>
        <template #solution>
          <div class="step">
            <span class="step-num">1</span>
            <div>
              <p><strong>求SVD：</strong></p>
              <p><span class="formula-inline">A\T A = \begin{pmatrix} 2 & 2 \\ 2 & 2 \end{pmatrix}</span>，特征值 <span class="formula-inline">\lambda_1=4, \lambda_2=0</span>，奇异值 <span class="formula-inline">\sigma_1=2</span>。</p>
              <p>特征向量 <span class="formula-inline">v_1 = \frac{1}{\sqrt{2}}(1,1)\T</span>，<span class="formula-inline">v_2 = \frac{1}{\sqrt{2}}(1,-1)\T</span>。</p>
            </div>
          </div>
          <div class="step">
            <span class="step-num">2</span>
            <div>
              <p><strong>求U：</strong></p>
              <p><span class="formula-inline">u_1 = \frac{1}{\sigma_1}Av_1 = \frac{1}{\sqrt{2}}(1,1,0)\T</span>，扩充得 <span class="formula-inline">u_2 = \frac{1}{\sqrt{2}}(1,-1,0)\T</span>，<span class="formula-inline">u_3=(0,0,1)\T</span>。</p>
            </div>
          </div>
          <div class="step">
            <span class="step-num">3</span>
            <div>
              <p><strong>构造Σ⁺：</strong></p>
              <p><span class="formula-inline">\Sigma = \begin{pmatrix} 2 & 0 \\ 0 & 0 \\ 0 & 0 \end{pmatrix}</span>，<span class="formula-inline">\Sigma^+ = \begin{pmatrix} 1/2 & 0 & 0 \\ 0 & 0 & 0 \end{pmatrix}</span></p>
            </div>
          </div>
          <div class="step">
            <span class="step-num">4</span>
            <div>
              <p><strong>计算A⁺ = VΣ⁺Uᵀ：</strong></p>
              <div class="formula-block">
                A^+ = \frac{1}{4}\begin{pmatrix} 1 & 1 & 0 \\ 1 & 1 & 0 \end{pmatrix}
              </div>
              <p>验证：<span class="formula-inline">AA^+ = \frac{1}{2}\begin{pmatrix}1&1&0\\1&1&0\\0&0&0\end{pmatrix}</span> 是到 <span class="formula-inline">R(A)=\operatorname{span}\{(1,1,0)\T\}</span> 的正交投影矩阵。</p>
            </div>
          </div>
        </template>
      </ExampleBox>

      <ExampleBox source="教材经典习题" badge="📝 满秩分解法">
        <template #problem>
          <p>用满秩分解求 <span class="formula-inline">A = \begin{pmatrix} 1 & 1 & 2 \\ 0 & 1 & 1 \end{pmatrix}</span> 的M-P广义逆 <span class="formula-inline">A^+</span>，并求 <span class="formula-inline">Ax=b</span> 的极小范数最小二乘解，其中 <span class="formula-inline">b=(1,0)\T</span>。</p>
        </template>
        <template #solution>
          <div class="step">
            <span class="step-num">1</span>
            <div>
              <p><strong>满秩分解 A=FG：</strong></p>
              <p><span class="formula-inline">F = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}</span>（列满秩，取A的主元列），<span class="formula-inline">G = \begin{pmatrix} 1 & 0 & 1 \\ 0 & 1 & 1 \end{pmatrix}</span>（行满秩，行标准形的非零行）。</p>
            </div>
          </div>
          <div class="step">
            <span class="step-num">2</span>
            <div>
              <p><strong>计算 Gᵀ(GGᵀ)⁻¹ 和 (FᵀF)⁻¹Fᵀ：</strong></p>
              <p><span class="formula-inline">GG\T = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}</span>，<span class="formula-inline">(GG\T)^{-1} = \frac{1}{3}\begin{pmatrix} 2 & -1 \\ -1 & 2 \end{pmatrix}</span></p>
              <p><span class="formula-inline">F\T F = \begin{pmatrix} 1 & 1 \\ 1 & 2 \end{pmatrix}</span>，<span class="formula-inline">(F\T F)^{-1} = \begin{pmatrix} 2 & -1 \\ -1 & 1 \end{pmatrix}</span></p>
            </div>
          </div>
          <div class="step">
            <span class="step-num">3</span>
            <div>
              <p><strong>A⁺ = Gᵀ(GGᵀ)⁻¹(FᵀF)⁻¹Fᵀ：</strong></p>
              <div class="formula-block">
                A^+ = \frac{1}{3}\begin{pmatrix} 2 & -1 \\ 1 & 1 \\ 1 & 0 \end{pmatrix}
              </div>
            </div>
          </div>
          <div class="step">
            <span class="step-num">4</span>
            <div>
              <p><strong>极小范数最小二乘解：</strong></p>
              <p><span class="formula-inline">x^+ = A^+ b = \frac{1}{3}\begin{pmatrix} 2 & -1 \\ 1 & 1 \\ 1 & 0 \end{pmatrix}\begin{pmatrix} 1 \\ 0 \end{pmatrix} = \frac{1}{3}(2, 1, 1)\T</span></p>
            </div>
          </div>
        </template>
      </ExampleBox>
    </Section>

    <!-- 7. 知识点小结 -->
    <Section num="7" title="知识点小结">
      <Steps :steps="[
        'M-P广义逆 A⁺ 由四个Penrose方程定义，存在且唯一',
        'A⁺ 同时满足 AXA=A, XAX=X, (AX)ᵀ=AX, (XA)ᵀ=XA',
        'SVD构造：A=UΣVᵀ ⟹ A⁺=VΣ⁺Uᵀ（非零奇异值取倒数再转置）',
        '满秩分解构造：A=FG ⟹ A⁺=Gᵀ(GGᵀ)⁻¹(FᵀF)⁻¹Fᵀ',
        'AA⁺是到R(A)的正交投影矩阵，A⁺A是到R(Aᵀ)的正交投影矩阵',
        'A⁺b 是 Ax=b 的极小范数最小二乘解',
        'A 可逆时 A⁺ = A⁻¹；A 列满秩时 A⁺ = (AᵀA)⁻¹Aᵀ'
      ]" />
    </Section>

    <!-- 8. 真题与习题汇总 -->
    <Section title="🗂️ 真题与习题汇总">
      <WeekQuizBank :quizzes="quizzes" weekLabel="第2周" />
    </Section>

    <Section title="📝 课后作业" :num="8">
      <div v-if="hwQuizzes.length === 0" class="empty-state">暂无课后作业</div>
      <template v-for="hw in hwQuizzes" :key="hw.id">
        <QuizProblem :quiz="hw" badge="📝 课后作业" />
      </template>
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
import QuizProblem from '../../components/quiz/QuizProblem.vue'
import { quizBank } from '../../data/quizBank'
import { homeworkBank } from '../../data/homeworkBank'
import { useKatex } from '../../composables/useKatex'
import { ref, onUnmounted, computed } from 'vue'

const quizzes = (quizBank[7] || []).map(q => ({ ...q, lessonNum: '07', lessonTitle: 'Moore-Penrose广义逆' }))
const hwQuizzes = computed(() => (homeworkBank[7] || []).map(q => ({ ...q })))

const renderTrigger = ref(0)
const { renderMath } = useKatex(renderTrigger)

// ========== AA⁺投影动画 ==========
const projPlaying = ref(false)
let projAnimId = null
let projRafId = null
const projSvgWidth = ref(700)
const projStep = ref(0)
const projT = ref(0)
const projStepText = ref('点击播放观察AA⁺正交投影过程')

// 列空间方向 (斜率)
const projSlope = ref(0.6)
// 向量b
const projB = ref([2, 1.5])
// 投影结果
const projProj = computed(() => {
  // 投影到y=slope*x直线上
  const m = projSlope.value
  const [bx, by] = projB.value
  // 投影公式: proj = (b·v)/(v·v) * v, 其中v=(1,m)
  const dot = bx + by * m
  const v2 = 1 + m * m
  const s = dot / v2
  return [s, s * m]
})

function projAdvance() {
  if (projStep.value >= 2) {
    projPlaying.value = false
    return
  }
  projStep.value++
  if (projStep.value === 1) {
    projStepText.value = '投影中：b经正交投影映射到列空间R(A)'
    animateProj()
  } else if (projStep.value === 2) {
    projStepText.value = '绿色Ax⁺=AA⁺b是b在R(A)上的正交投影'
  }
  renderTrigger.value++
}

function animateProj() {
  const start = performance.now()
  const dur = 1500
  function tick(now) {
    projT.value = Math.min((now - start) / dur, 1)
    renderTrigger.value++
    if (projT.value < 1 && projPlaying.value) {
      projRafId = requestAnimationFrame(tick)
    } else {
      projT.value = 1
      projStep.value = 2
      projStepText.value = '绿色Ax⁺=AA⁺b是b在R(A)上的正交投影'
      renderTrigger.value++
      if (projPlaying.value) {
        projAnimId = setTimeout(projLoop, 1500)
      }
    }
  }
  projRafId = requestAnimationFrame(tick)
}

function projLoop() {
  if (!projPlaying.value) return
  projAdvance()
}

function projPlay() {
  if (projStep.value >= 2) projReset()
  projPlaying.value = true
  projStep.value = 1
  projStepText.value = '投影中：b经正交投影映射到列空间R(A)'
  animateProj()
}
function projPause() {
  projPlaying.value = false
  if (projAnimId) clearTimeout(projAnimId)
  if (projRafId) cancelAnimationFrame(projRafId)
}
function projReset() {
  projPlaying.value = false
  if (projAnimId) clearTimeout(projAnimId)
  if (projRafId) cancelAnimationFrame(projRafId)
  projStep.value = 0
  projT.value = 0
  projStepText.value = '点击播放观察AA⁺正交投影过程'
  renderTrigger.value++
}

onUnmounted(() => {
  projPause()
})
</script>

<style scoped>
.formula-inline { display: inline; }
.formula-block { display: block; text-align: center; margin: 12px 0; }

/* Penrose方程关系图（auto模式） */
.penrose-map {
  padding: 28px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  min-height: 220px;
  position: relative;
}
.pm-center {
  background: linear-gradient(135deg,#4f46e5,#7c3aed);
  color: #fff;
  padding: 14px 36px;
  border-radius: 28px;
  font-size: 22px;
  font-weight: 700;
  box-shadow: 0 4px 18px rgba(79,70,229,.35);
  animation: pm-pulse 2s ease-in-out infinite;
  z-index: 2;
}
.pm-nodes {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}
.pm-node {
  padding: 14px 18px;
  border-radius: 14px;
  background: #fff;
  border: 2px solid #e2e8f0;
  text-align: center;
  opacity: 0;
  animation: pm-light 6s ease-in-out infinite;
  min-width: 140px;
}
.pm-eq {
  font-size: 15px;
  font-weight: 700;
  color: #4338ca;
  margin-bottom: 4px;
}
.pm-desc {
  font-size: 11px;
  color: #64748b;
}
.pm-n1 { border-color: #93c5fd; }
.pm-n2 { border-color: #6ee7b7; }
.pm-n3 { border-color: #fcd34d; }
.pm-n4 { border-color: #f9a8d4; }
@keyframes pm-pulse {
  0%,100% { box-shadow: 0 4px 18px rgba(79,70,229,.35); transform: scale(1); }
  50% { box-shadow: 0 6px 28px rgba(79,70,229,.55); transform: scale(1.05); }
}
@keyframes pm-light {
  0% { opacity: 0; transform: scale(0.7) translateY(10px); }
  6% { opacity: 1; transform: scale(1.08) translateY(0); }
  12% { transform: scale(1) translateY(0); }
  85% { opacity: 1; transform: scale(1) translateY(0); }
  95%,100% { opacity: 0.25; transform: scale(0.95) translateY(0); }
}
</style>
