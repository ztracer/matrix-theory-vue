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
        '设插值多项式 p(λ) = a₀ + a₁λ + … + aₘ₋₁λᵐ⁻¹，其中 m = deg(m_A)',
        '列插值条件 f^{(l)}(λᵢ) = p^{(l)}(λᵢ)，共 m 个方程',
        '解方程组求系数 a₀, …, aₘ₋₁',
        '计算 f(A) = a₀I + a₁A + … + aₘ₋₁Aᵐ⁻¹'
      ]" />

      <Theorem title="&quot;ab公式&quot;的理解：为什么可以设 e^{At}=a(t)I+b(t)A？" type="tip" icon="💡">
        <p>Cayley-Hamilton 定理保证：任何一个 <span class="formula-inline">n \times n</span> 矩阵 <span class="formula-inline">A</span>，其 <span class="formula-inline">n</span> 次及以上的幂都可以用 <span class="formula-inline">I, A, \dots, A^{n-1}</span> 线性表出。</p>
        <p>由于 <span class="formula-inline">e^{At} = I + tA + \frac{t^2}{2!}A^2 + \cdots</span> 是无穷级数。对于 <strong>2×2 矩阵</strong>（或最小多项式次数 ≤ 2 的矩阵），<span class="formula-inline">A^2</span> 可表为 <span class="formula-inline">I</span> 和 <span class="formula-inline">A</span> 的线性组合，进而所有高次项皆可降为这两者的组合：</p>
        <Formula display>e^{At} = a(t)I + b(t)A</Formula>
        <p><strong>核心规律：</strong>若 <span class="formula-inline">A</span> 是 <span class="formula-inline">n \times n</span> 矩阵，则 <span class="formula-inline">e^{At}</span> 可表为 <span class="formula-inline">I, A, \dots, A^{n-1}</span> 的线性组合，系数仅为 <span class="formula-inline">t</span> 的函数（待定系数法的理论基础）。</p>
      </Theorem>

      <h3>方法二：标准形法（计算 e^{At} 的三种高效入口）</h3>

      <Theorem title="入口1：对角化法（最常考）" type="theorem" icon="🔑">
        <p>若 <span class="formula-inline">A</span> 可对角化，即存在可逆矩阵 <span class="formula-inline">P</span> 使 <span class="formula-inline">A = PDP^{-1}</span>（<span class="formula-inline">D</span> 为对角阵），则：</p>
        <Formula display>e^{At} = P\,e^{Dt}\,P^{-1}</Formula>
        <p>其中 <span class="formula-inline">e^{Dt}</span> 只需将对角元 <span class="formula-inline">\lambda_i</span> 替换为 <span class="formula-inline">e^{\lambda_i t}</span> 即可，其余位置为 0。</p>
      </Theorem>

      <Theorem title="入口2：Jordan 块法（对角化失败时使用）" type="theorem" icon="🔨">
        <p>若 <span class="formula-inline">A</span> 不可对角化，化为 Jordan 标准形 <span class="formula-inline">J = \lambda I + N</span>，其中 <span class="formula-inline">N</span> 是幂零矩阵（若干次方后变为零矩阵）。由于 <span class="formula-inline">\lambda I</span> 与 <span class="formula-inline">N</span> 可交换：</p>
        <Formula display>e^{Jt} = e^{\lambda t}\, e^{Nt} = e^{\lambda t}\left(I + tN + \frac{t^2}{2!}N^2 + \cdots + \frac{t^{k-1}}{(k-1)!}N^{k-1}\right)</Formula>
        <p><strong>示例：</strong>二阶 Jordan 块 <span class="formula-inline">J_2(\lambda) = \begin{pmatrix} \lambda &amp; 1 \\ 0 &amp; \lambda \end{pmatrix}</span> 对应 <span class="formula-inline">N = \begin{pmatrix} 0 &amp; 1 \\ 0 &amp; 0 \end{pmatrix}</span>（<span class="formula-inline">N^2=0</span>），则：</p>
        <Formula display>e^{J_2(\lambda)t} = e^{\lambda t}\begin{pmatrix} 1 &amp; t \\ 0 &amp; 1 \end{pmatrix}</Formula>
        <p>三阶时 <span class="formula-inline">N^3=0</span>，公式中会多出 <span class="formula-inline">\frac{t^2}{2}</span> 项。</p>
      </Theorem>

      <Theorem title="入口3：2×2 旋转矩阵秒杀公式" type="theorem" icon="⚡">
        <p>若矩阵形如 <span class="formula-inline">A = \begin{pmatrix} a &amp; b \\ -b &amp; a \end{pmatrix}</span>，可拆分为 <span class="formula-inline">A = aI + bJ</span>，其中 <span class="formula-inline">J = \begin{pmatrix} 0 &amp; 1 \\ -1 &amp; 0 \end{pmatrix}</span> 满足 <span class="formula-inline">J^2 = -I</span>（行为类似虚数单位 <span class="formula-inline">i</span>）。借用欧拉公式直接得：</p>
        <Formula display>e^{At} = e^{at}\Big(\cos(bt)I + \sin(bt)J\Big) = e^{at}\begin{pmatrix} \cos(bt) &amp; \sin(bt) \\ -\sin(bt) &amp; \cos(bt) \end{pmatrix}</Formula>
        <p><strong>优点：</strong>遇到复数特征值的 <span class="formula-inline">2\times 2</span> 矩阵，无需计算复特征向量和求逆矩阵，直接套公式秒杀。</p>
      </Theorem>

      <h3>方法三：幂级数法</h3>

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

      <Theorem title="非齐次系统 x' = Ax + b(t)" type="theorem">
        若方程组右侧多出非齐次项 <span class="formula-inline">\vec{b}(t)</span>，令 <span class="formula-inline">\vec{x}' = A\vec{x} + \vec{b}(t)</span>，其通解由常数变易法给出：
        <Formula display>\vec{x}(t) = e^{At}\vec{x}(0) + \int_0^t e^{A(t-\tau)}\vec{b}(\tau)\,d\tau</Formula>
      </Theorem>

      <Steps :steps="[
        '算特征值：求 det(A-λI)=0，判断特征值类型（互异/重根/复数）',
        '选路径：特征值互异→对角化法；重根且特征向量不够→Jordan块法',
        '2×2且形如 [[a,b],[-b,a]]→旋转矩阵秒杀公式',
        '矩阵阶数高且难以对角化→C-H待定系数法降次'
      ]" />

      <QuizProblem :quiz="{
        id: '04-extra-1',
        question: '设 A = [[2,0],[0,3]]（2阶对角矩阵），则 e^{At} = ?',
        options: ['[[e^{2t},0],[0,e^{3t}]]', '[[e^{2},0],[0,e^{3}]]', '[[2e^t,0],[0,3e^t]]', '[[t^2,0],[0,t^3]]'],
        answer: 0,
        explanation: '对角矩阵的矩阵指数就是对角元取指数函数：e^{At} = diag(e^{2t}, e^{3t})。'
      }" />
    </Section>

    <Section num="4" title="核心题型精讲">
      <ExampleBox title="题型一：利用泰勒级数直接截断" badge="📝 级数截断法">
        <template #problem>
          <p><strong>例1：</strong>若 <span class="formula-inline">A^2 = 0</span>，求 <span class="formula-inline">e^{At}</span>。</p>
          <p><strong>例2：</strong>若 <span class="formula-inline">A^2 = A</span>（幂等矩阵），求 <span class="formula-inline">e^{At}</span>。</p>
        </template>
        <template #solution>
          <p><strong>例1 解析：</strong></p>
          <p><span class="formula-inline">e^{At} = I + At + \frac{t^2}{2!}A^2 + \frac{t^3}{3!}A^3 + \cdots</span>，因为 <span class="formula-inline">A^2=0</span>，所有高次项全为零：</p>
          <Formula display>e^{At} = I + At</Formula>
          <p><strong>例2 解析：</strong></p>
          <p>当 <span class="formula-inline">A^2 = A</span> 时，<span class="formula-inline">A^3 = A^2 \cdot A = A</span>，所有高次幂均退化为 <span class="formula-inline">A</span>：</p>
          <Formula display>e^{At} = I + A\left(t + \frac{t^2}{2!} + \frac{t^3}{3!} + \cdots\right) = I + (e^t - 1)A</Formula>
        </template>
      </ExampleBox>

      <ExampleBox title="题型二：Cayley-Hamilton 待定系数法" badge="📝 待定系数法">
        <template #problem>
          <p>设 <span class="formula-inline">A</span> 满足 <span class="formula-inline">A^2 - 3A + 2I = 0</span>，用待定系数法将 <span class="formula-inline">e^{At}</span> 表示为 <span class="formula-inline">a(t)I + b(t)A</span>。</p>
        </template>
        <template #solution>
          <p><strong>步骤1：求特征值。</strong>由特征方程 <span class="formula-inline">\lambda^2 - 3\lambda + 2 = 0</span> 得 <span class="formula-inline">\lambda_1 = 1</span>，<span class="formula-inline">\lambda_2 = 2</span>。</p>
          <p><strong>步骤2：设标量方程。</strong>令 <span class="formula-inline">e^{\lambda t} = a(t) + b(t)\lambda</span>。分别代入两个特征值：</p>
          <p><span class="formula-inline">e^{t} = a(t) + b(t)</span>，<span class="formula-inline">e^{2t} = a(t) + 2b(t)</span></p>
          <p><strong>步骤3：解系数。</strong>两式相减得 <span class="formula-inline">b(t) = e^{2t} - e^t</span>，回代得 <span class="formula-inline">a(t) = 2e^t - e^{2t}</span>。</p>
          <p><strong>步骤4：写出结果。</strong></p>
          <Formula display>e^{At} = (2e^t - e^{2t})I + (e^{2t} - e^t)A</Formula>
        </template>
      </ExampleBox>

      <ExampleBox title="题型三：2×2 旋转矩阵秒杀（2023年真题）" badge="📝 真题">
        <template #problem>
          <p>已知 <span class="formula-inline">A = \begin{pmatrix} a &amp; b \\ -b &amp; a \end{pmatrix}</span>，求 <span class="formula-inline">e^{At}</span>，并给出 <span class="formula-inline">a=0,b=1</span> 时 <span class="formula-inline">e^{At}</span> 的值。</p>
        </template>
        <template #solution>
          <p><strong>通用公式：</strong>此类矩阵的特征值为 <span class="formula-inline">\lambda = a \pm bi</span>，对应复平面上的旋转 + 伸缩：</p>
          <Formula display>e^{At} = e^{at}\begin{pmatrix} \cos(bt) &amp; \sin(bt) \\ -\sin(bt) &amp; \cos(bt) \end{pmatrix}</Formula>
          <p><strong>当 a=0, b=1 时：</strong><span class="formula-inline">A = \begin{pmatrix} 0 &amp; 1 \\ -1 &amp; 0 \end{pmatrix}</span>，代入公式得：</p>
          <Formula display>e^{At} = \begin{pmatrix} \cos t &amp; \sin t \\ -\sin t &amp; \cos t \end{pmatrix}</Formula>
        </template>
      </ExampleBox>
    </Section>

    <Section num="5" title="🗂️ 真题与习题汇总">
      <WeekQuizBank :quizzes="quizzes" weekLabel="第1周" />
    </Section>

    <Section title="📝 课后作业" :num="6">
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
import Formula from '../../components/ui/Formula.vue'
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
