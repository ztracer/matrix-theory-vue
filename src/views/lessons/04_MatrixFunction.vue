<template>
  <LessonLayout :lesson-id="4" title="矩阵函数与微分方程" subtitle="Matrix Functions & Differential Equations">
    <Section num="1" title="矩阵函数的定义与性质">
      <p>矩阵函数是以矩阵为自变量的函数，在线性微分方程组求解、控制理论、Markov过程等领域有广泛应用。</p>

      <Theorem title="矩阵函数的Jordan表示法" type="definition">
        设 <span class="formula-inline">A = PJP^{-1}</span>，其中 <span class="formula-inline">J</span> 是A的Jordan标准形。定义矩阵函数
        <span class="formula-block">f(A) = P\,f(J)\,P^{-1}</span>
        其中 <span class="formula-inline">f(J) = \operatorname{diag}(f(J_{r_1}(\lambda_1)), \ldots, f(J_{r_k}(\lambda_k)))</span>，且每个Jordan块对应的矩阵为
        <span class="formula-block">f(J_r(\lambda)) = \begin{pmatrix} f(\lambda) & f'(\lambda) & \dfrac{f''(\lambda)}{2!} & \cdots & \dfrac{f^{(r-1)}(\lambda)}{(r-1)!} \\ & f(\lambda) & f'(\lambda) & \cdots & \dfrac{f^{(r-2)}(\lambda)}{(r-2)!} \\ & & \ddots & \ddots & \vdots \\ & & & f(\lambda) & f'(\lambda) \\ & & & & f(\lambda) \end{pmatrix}</span>
      </Theorem>

        <div class="flow-diagram">
          <div class="flow-node active">① 求A的Jordan标准形 J = P⁻¹AP</div>
          <div class="flow-arrow active">↓</div>
          <div class="flow-node active">② 对每个Jordan块 J_r(λ) 计算 f(J_r(λ))</div>
          <div class="flow-arrow active">↓</div>
          <div class="flow-node active">③ 组装 f(J) = diag(f(J_{r₁}),…,f(J_{rk}))</div>
          <div class="flow-arrow active">↓</div>
          <div class="flow-node active">④ f(A) = P·f(J)·P⁻¹</div>
        </div>

      <div class="key-point">
        <strong>常用矩阵函数：</strong>
        <ul>
          <li><span class="formula-inline">e^A = \sum_{k=0}^{\infty} \dfrac{A^k}{k!}</span> （矩阵指数）</li>
          <li><span class="formula-inline">\sin A = \sum_{k=0}^{\infty} \dfrac{(-1)^k A^{2k+1}}{(2k+1)!}</span></li>
          <li><span class="formula-inline">\cos A = \sum_{k=0}^{\infty} \dfrac{(-1)^k A^{2k}}{(2k)!}</span></li>
          <li><span class="formula-inline">(I-A)^{-1} = \sum_{k=0}^{\infty} A^k</span>（ρ(A)<1时收敛）</li>
        </ul>
      </div>
    </Section>

    <Section num="2" title="矩阵函数的计算方法">
      <h3>方法一：多项式插值法（最小多项式法）</h3>

      <Theorem title="Cayley-Hamilton定理">
        设矩阵A的特征多项式为 <span class="formula-inline">\varphi(\lambda) = \det(\lambda I - A)</span>，则 <span class="formula-inline">\varphi(A) = 0</span>。即矩阵A满足自身的特征方程。
      </Theorem>

      <p>设A的最小多项式为 <span class="formula-inline">m_A(\lambda) = (\lambda-\lambda_1)^{r_1}(\lambda-\lambda_2)^{r_2}\cdots(\lambda-\lambda_s)^{r_s}</span>，其中 <span class="formula-inline">\sum r_i \le n</span>。存在次数 <span class="formula-inline">< \sum r_i</span> 的多项式 <span class="formula-inline">p(\lambda)</span>，使得：</p>

      <div class="formula-block">f^{(l)}(\lambda_i) = p^{(l)}(\lambda_i), \quad i=1,\ldots,s;\; l=0,1,\ldots,r_i-1</div>

      <p>从而 <span class="formula-inline">f(A) = p(A)</span>。</p>

      <Steps :steps="[
        '求最小多项式 m_A(λ) 及其各根 λᵢ 的重数 rᵢ',
        '设插值多项式 p(λ) = a₀ + a₁λ + … + a_{m−1}λ^{m−1}，其中 m = deg(m_A)',
        '列插值条件 f^{(l)}(λᵢ) = p^{(l)}(λᵢ)，共 m 个方程',
        '解方程组求系数 a₀,…,a_{m−1}',
        '计算 f(A) = a₀I + a₁A + … + a_{m−1}A^{m−1}'
      ]" />

      <h3>方法二：幂级数法</h3>

      <p>对于整函数（如 <span class="formula-inline">e^A</span>, sin A, cos A），可直接用幂级数展开计算。但对于低阶矩阵，插值法更高效。</p>

      <AnimationBox title="最小多项式与插值条件示意" mode="auto"
        description="特征值 λ₁,λ₂,λ₃ 处的各阶导数匹配条件，脉冲高亮循环。">
        <svg viewBox="0 0 600 300" style="width:100%;max-width:600px;">
          <defs>
            <marker id="arrow4" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6"/>
            </marker>
          </defs>
          <!-- Axes -->
          <line x1="50" y1="250" x2="550" y2="250" stroke="#64748b" stroke-width="1.5" marker-end="url(#arrow4)"/>
          <line x1="50" y1="250" x2="50" y2="30" stroke="#64748b" stroke-width="1.5" marker-end="url(#arrow4)"/>
          <text x="555" y="255" font-size="13" fill="#64748b">λ</text>
          <text x="35" y="30" font-size="13" fill="#64748b">f(λ)</text>

          <!-- Curve f(λ) -->
          <path d="M 80 220 Q 200 80 350 120 T 530 60" fill="none" stroke="#3b82f6" stroke-width="2.5"/>
          <text x="480" y="50" font-size="14" fill="#3b82f6" font-weight="bold">f(λ)</text>

          <!-- Interpolation points with pulse animation -->
          <g :class="{'pulse-dot': ipActive === 0}">
            <circle cx="150" cy="190" r="6" fill="#ef4444"/>
            <text x="140" y="275" font-size="13" fill="#ef4444" font-weight="bold">λ₁</text>
            <text x="125" y="180" font-size="12" fill="#ef4444">f(λ₁)=p(λ₁)</text>
          </g>
          <g :class="{'pulse-dot': ipActive === 1}">
            <circle cx="320" cy="135" r="6" fill="#10b981"/>
            <text x="310" y="275" font-size="13" fill="#10b981" font-weight="bold">λ₂</text>
            <text x="295" y="125" font-size="12" fill="#10b981">f(λ₂)=p(λ₂)</text>
          </g>
          <g :class="{'pulse-dot': ipActive === 2}">
            <circle cx="470" cy="80" r="6" fill="#f59e0b"/>
            <text x="460" y="275" font-size="13" fill="#f59e0b" font-weight="bold">λ₃</text>
            <text x="445" y="70" font-size="12" fill="#f59e0b">f(λ₃)=p(λ₃)</text>
          </g>
          <!-- Tangent line at λ₁ -->
          <g :class="{'pulse-line': ipActive === 0}">
            <line x1="100" y1="225" x2="200" y2="155" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="5,3"/>
            <text x="205" y="155" font-size="11" fill="#ef4444">f'(λ₁)=p'(λ₁)</text>
          </g>
        </svg>
      </AnimationBox>
    </Section>

    <Section num="3" title="矩阵指数与微分方程组">
      <Theorem title="线性常系数微分方程组">
        考虑齐次线性微分方程组
        <span class="formula-block">\dfrac{d\mathbf{x}}{dt} = A\mathbf{x}(t), \quad \mathbf{x}(0) = \mathbf{x}_0</span>
        其解为
        <span class="formula-block">\mathbf{x}(t) = e^{At}\,\mathbf{x}_0</span>
        其中 <span class="formula-inline">e^{At}</span> 称为矩阵指数函数。
      </Theorem>

      <div class="key-point">
        <strong>矩阵指数的性质：</strong>
        <ul>
          <li><span class="formula-inline">e^{0} = I</span></li>
          <li><span class="formula-inline">(e^{At})^{-1} = e^{-At}</span></li>
          <li>若 <span class="formula-inline">AB = BA</span>，则 <span class="formula-inline">e^{At}e^{Bt} = e^{(A+B)t}</span></li>
          <li><span class="formula-inline">\dfrac{d}{dt}e^{At} = A\,e^{At} = e^{At}\,A</span></li>
        </ul>
      </div>

      <ExampleBox title="例题：计算e^{At}" :showSolution="false">
        已知 A = <span class="formula-inline">\begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix}</span>，求 <span class="formula-inline">e^{At}</span>。
        <template #solution>
          <p><strong>方法：幂级数法</strong></p>
          <p>计算得 <span class="formula-inline">A^2 = -I</span>, <span class="formula-inline">A^3 = -A</span>, <span class="formula-inline">A^4 = I</span>，周期为4。</p>
          <div class="formula-block">e^{At} = \sum_{k=0}^{\infty}\frac{(At)^k}{k!} = I + At + \frac{A^2 t^2}{2!} + \frac{A^3 t^3}{3!} + \cdots</div>
          <div class="formula-block">= I\left(1-\frac{t^2}{2!}+\frac{t^4}{4!}-\cdots\right) + A\left(t-\frac{t^3}{3!}+\frac{t^5}{5!}-\cdots\right)</div>
          <div class="formula-block">= I\cos t + A\sin t = \begin{pmatrix} \cos t & \sin t \\ -\sin t & \cos t \end{pmatrix}</div>
        </template>
      </ExampleBox>

      <QuizProblem :quiz="{
        id: '04-extra-1',
        question: '设 A = [[2,0],[0,3]]（2阶对角矩阵），则 e^{At} = ?',
        options: ['[[e^{2t},0],[0,e^{3t}]]', '[[e^{2},0],[0,e^{3}]]', '[[2e^t,0],[0,3e^t]]', '[[t^2,0],[0,t^3]]'],
        answer: 0,
        explanation: '对角矩阵的矩阵指数就是对角元取指数函数：e^{At} = diag(e^{2t}, e^{3t})。'
      }" />
    </Section>

    <Section title="🗂️ 真题与习题汇总">
      <WeekQuizBank :quizzes="quizzes" weekLabel="第1周" />
    </Section>

    <Section title="📝 课后作业" :num="4">
      <div v-if="hwQuizzes.length === 0" class="empty-state">暂无课后作业</div>
      <template v-for="hw in hwQuizzes" :key="hw.id">
        <QuizProblem :quiz="hw" badge="📝 课后作业" />
      </template>
    </Section>
  </LessonLayout>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import LessonLayout from '../../components/LessonLayout.vue'
import Section from '../../components/ui/Section.vue'
import Theorem from '../../components/ui/Theorem.vue'
import Steps from '../../components/ui/Steps.vue'
import AnimationBox from '../../components/ui/AnimationBox.vue'
import ExampleBox from '../../components/ui/ExampleBox.vue'
import QuizProblem from '../../components/quiz/QuizProblem.vue'
import WeekQuizBank from '../../components/quiz/WeekQuizBank.vue'
import { quizBank } from '../../data/quizBank'
import { homeworkBank } from '../../data/homeworkBank'
import { useKatex } from '../../composables/useKatex'

const quizzes = (quizBank[4] || []).map(q => ({ ...q, lessonNum: '04', lessonTitle: '矩阵函数' }))
const hwQuizzes = computed(() => (homeworkBank[4] || []).map(q => ({ ...q })))

// 插值点脉冲动画
const ipActive = ref(-1)
let ipTimer = null
function startIpPulse() {
  ipActive.value = -1
  let i = 0
  ipTimer = setInterval(() => {
    ipActive.value = i
    i++
    if (i > 2) {
      clearInterval(ipTimer)
      setTimeout(() => { startIpPulse() }, 2000)
    }
  }, 900)
}

useKatex()

onMounted(() => {
  startIpPulse()
})

onUnmounted(() => {
  if (ipTimer) clearInterval(ipTimer)
})
</script>

<style scoped>
.key-point {
  background: #f0f9ff;
  border-left: 4px solid #3b82f6;
  border-radius: 8px;
  padding: 14px 18px;
  margin: 16px 0;
}
.key-point strong { color: #1e40af; }
.key-point ul { margin: 8px 0 0 0; padding-left: 20px; }
.key-point li { margin: 4px 0; }
.flow-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px;
}
.flow-node {
  background: #f1f5f9;
  border: 2px solid #cbd5e1;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  transition: all 0.5s ease;
  max-width: 480px;
  text-align: center;
}
.flow-node.active {
  background: #dbeafe;
  border-color: #3b82f6;
  color: #1e40af;
  box-shadow: 0 0 12px rgba(59,130,246,0.4);
  transform: scale(1.03);
}
.flow-arrow {
  font-size: 20px;
  color: #cbd5e1;
  transition: color 0.5s;
}
.flow-arrow.active { color: #3b82f6; }
.pulse-dot circle {
  animation: pulseGlow 1.5s ease-in-out;
}
.pulse-line line {
  animation: dashGlow 1.5s ease-in-out;
}
@keyframes pulseGlow {
  0% { r: 6; opacity: 0.5; }
  50% { r: 12; opacity: 1; }
  100% { r: 6; opacity: 1; }
}
@keyframes dashGlow {
  0% { opacity: 0.3; }
  50% { opacity: 1; stroke-width: 3; }
  100% { opacity: 1; stroke-width: 1.5; }
}
</style>
