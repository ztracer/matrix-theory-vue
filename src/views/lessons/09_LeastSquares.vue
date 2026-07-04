<template>
  <LessonLayout :lesson-id="9" title="最小二乘与范数" subtitle="Least Squares & Norms">
    <!-- Section 1: 最小二乘问题 -->
    <Section title="最小二乘问题：寻找最近点" :num="1">
      <p>
        当线性方程组<span class="formula-inline">Ax = b</span>无解时（即<span class="formula-inline">b \notin R(A)</span>），
        我们寻求<span class="formula-inline">x</span>使得残差<span class="formula-inline">r = b - Ax</span>的范数最小，这就是<strong>最小二乘问题</strong>。
      </p>

      <Theorem title="最小二乘问题" type="definition" icon="📊">
        <p>给定<span class="formula-inline">A \in \mathbb{R}^{m \times n}</span>，<span class="formula-inline">b \in \mathbb{R}^m</span>，求<span class="formula-inline">x \in \mathbb{R}^n</span>使得：</p>
        <Formula>\min_{x} \|Ax - b\|_2^2</Formula>
        <p>几何意义：在列空间<span class="formula-inline">R(A)</span>中找距<span class="formula-inline">b</span>最近的点<span class="formula-inline">Ax^*</span>，即<span class="formula-inline">b</span>到<span class="formula-inline">R(A)</span>的<strong>正交投影</strong>。</p>
      </Theorem>

      <Theorem title="正规方程（Normal Equations）" type="theorem" icon="🎯">
        <p><span class="formula-inline">x^*</span>是最小二乘解的充要条件是<span class="formula-inline">x^*</span>满足<strong>正规方程</strong>：</p>
        <Formula>A^{\mathsf{T}}Ax = A^{\mathsf{T}}b</Formula>
        <p>等价条件：<strong>残差正交于列空间</strong></p>
        <Formula>r = b - Ax^* \perp R(A) \iff A^{\mathsf{T}}r = 0 \iff A^{\mathsf{T}}(b - Ax^*) = 0</Formula>
        <p>当<span class="formula-inline">A</span>列满秩时，<span class="formula-inline">A^{\mathsf{T}}A</span>可逆，最小二乘解唯一：</p>
        <Formula>x^* = (A^{\mathsf{T}}A)^{-1}A^{\mathsf{T}}b = A^+b</Formula>
      </Theorem>

      <Theorem title="投影与最小二乘的关系" type="note" icon="🔗">
        <p>最小二乘解的投影就是<span class="formula-inline">b</span>到<span class="formula-inline">R(A)</span>的正交投影：</p>
        <Formula>Ax^* = A(A^{\mathsf{T}}A)^{-1}A^{\mathsf{T}}b = Pb</Formula>
        <p>其中<span class="formula-inline">P = A(A^{\mathsf{T}}A)^{-1}A^{\mathsf{T}}</span>是到<span class="formula-inline">R(A)</span>的正交投影矩阵，这正是上一课的核心公式！</p>
      </Theorem>
    </Section>

    <!-- Animation 1: 3D orthogonal projection to plane (几何演示 - 保留interactive) -->
    <Section title="动画：R³中b到平面R(A)的正交投影" :num="2">
      <AnimationBox
        title="正交投影找最近点"
        :playing="playing1"
        description="R³中，向量b不在平面R(A)内（方程组无解），最近点是b到平面的垂足——正交投影Pb，残差r=b-Pb垂直于平面。"
        @play="play1"
        @pause="pause1"
        @reset="reset1"
      >
        <div class="ls3d-stage">
          <div ref="projViewport" class="ls3d-viewport" aria-label="b orthogonal projection to column-space plane"></div>
          <div class="ls3d-legend">
            <span><i class="ls3d-key ls3d-key-plane"></i>R(A)</span>
            <span><i class="ls3d-key ls3d-key-b"></i>b</span>
            <span><i class="ls3d-key ls3d-key-p"></i>Pb = Ax*</span>
            <span><i class="ls3d-key ls3d-key-r"></i>r = b - Pb</span>
            <strong>{{ projStepText }}</strong>
          </div>
        </div>
      </AnimationBox>
    </Section>

    <!-- Section 2: 正规方程深入 -->
    <Section title="正规方程的几何理解" :num="3">
      <p>
        正规方程<span class="formula-inline">A^{\mathsf{T}}Ax = A^{\mathsf{T}}b</span>的核心是<strong>残差正交条件</strong>。
        设<span class="formula-inline">A = [a_1, a_2, \ldots, a_n]</span>（列分块），则残差<span class="formula-inline">r = b - Ax</span>与每个列向量<span class="formula-inline">a_i</span>都正交：
      </p>
      <Formula>a_i^{\mathsf{T}} r = 0 \quad (i = 1,2,\ldots,n) \iff A^{\mathsf{T}} r = 0</Formula>

      <Theorem title="最小二乘解的存在唯一性" type="theorem" icon="📌">
        <ul>
          <li><strong>解总是存在</strong>：最小二乘问题总有解（因为<span class="formula-inline">R(A)</span>是闭子空间，投影存在）</li>
          <li><strong>解唯一</strong>当且仅当<span class="formula-inline">\operatorname{rank}(A) = n</span>（A列满秩），此时<span class="formula-inline">x^* = (A^{\mathsf{T}}A)^{-1}A^{\mathsf{T}}b</span></li>
          <li><strong>最小范数解</strong>：当解不唯一时，所有最小二乘解中范数最小的是<span class="formula-inline">x^* = A^+b</span></li>
        </ul>
      </Theorem>
    </Section>

    <!-- Animation 2: Residual orthogonality (几何演示 - 保留interactive) -->
    <Section title="动画：残差与列向量正交" :num="4">
      <AnimationBox
        title="正规方程几何：r ⊥ a₁, r ⊥ a₂"
        :playing="playing2"
        description="在R(A)平面内，a₁、a₂是两个基向量。残差r垂直于整个平面，因此r⊥a₁且r⊥a₂。"
        @play="play2"
        @pause="pause2"
        @reset="reset2"
      >
        <div class="ls3d-stage">
          <div ref="orthoViewport" class="ls3d-viewport" aria-label="residual orthogonal to column vectors"></div>
          <div class="ls3d-legend">
            <span><i class="ls3d-key ls3d-key-a1"></i>a1, a2</span>
            <span><i class="ls3d-key ls3d-key-p"></i>Ax*</span>
            <span><i class="ls3d-key ls3d-key-r"></i>r</span>
            <span><i class="ls3d-key ls3d-key-note"></i>A^T r = 0</span>
            <strong>{{ orthoStepText }}</strong>
          </div>
        </div>
      </AnimationBox>
    </Section>

    <!-- Section 3: 向量范数 -->
    <Section title="向量范数" :num="5">
      <Theorem title="向量范数三公理" type="definition" icon="📏">
        <p>函数<span class="formula-inline">\|\cdot\|: V \to \mathbb{R}</span>称为向量范数，若满足：</p>
        <ol>
          <li><strong>正定性</strong>：<span class="formula-inline">\|x\| \geq 0</span>，且<span class="formula-inline">\|x\| = 0 \iff x = 0</span></li>
          <li><strong>齐次性</strong>：<span class="formula-inline">\|\alpha x\| = |\alpha| \cdot \|x\|</span>，对任意<span class="formula-inline">\alpha \in \mathbb{R}(\mathbb{C})</span></li>
          <li><strong>三角不等式</strong>：<span class="formula-inline">\|x + y\| \leq \|x\| + \|y\|</span></li>
        </ol>
      </Theorem>

      <h3>常用向量范数（<span class="formula-inline">\mathbb{R}^n</span>上）</h3>
      <Formula display="true">\|x\|_1 = \sum_{i=1}^n |x_i| \quad \text{(L¹范数，曼哈顿距离)}</Formula>
      <Formula display="true">\|x\|_2 = \sqrt{\sum_{i=1}^n |x_i|^2} = \sqrt{x^{\mathsf{T}}x} \quad \text{(L²范数，欧氏距离)}</Formula>
      <Formula display="true">\|x\|_\infty = \max_{1 \leq i \leq n} |x_i| \quad \text{(L∞范数，切比雪夫距离)}</Formula>

      <Theorem title="范数等价性" type="theorem" icon="⚖️">
        <p>有限维空间上所有范数都是等价的：对任意两种范数<span class="formula-inline">\|\cdot\|_\alpha, \|\cdot\|_\beta</span>，存在常数<span class="formula-inline">c_1, c_2 > 0</span>使得</p>
        <Formula>c_1 \|x\|_\alpha \leq \|x\|_\beta \leq c_2 \|x\|_\alpha, \quad \forall x</Formula>
        <p>例如：<span class="formula-inline">\|x\|_\infty \leq \|x\|_2 \leq \sqrt{n}\|x\|_\infty</span>，<span class="formula-inline">\|x\|_\infty \leq \|x\|_1 \leq n\|x\|_\infty</span>。</p>
      </Theorem>
    </Section>

    <!-- Animation 3: Unit balls for L1, L2, Linf (几何演示 - 保留interactive) -->
    <Section title="动画：L¹/L²/L∞ 单位球对比" :num="6">
      <AnimationBox
        title="不同范数的单位球"
        :playing="playing3"
        description="切换范数类型，观察单位球{ x : ||x||=1 }的形状变化：L¹是菱形，L²是圆形，L∞是正方形。"
        :hide-controls="false"
        @play="play3"
        @pause="pause3"
        @reset="reset3"
      >
        <template #controls>
          <label style="font-size:12px;display:flex;align-items:center;gap:4px;">
            范数：
            <select v-model="normType" style="padding:2px 6px;border-radius:4px;border:1px solid #e2e8f0;font-size:12px;">
              <option value="L1">L¹ 菱形</option>
              <option value="L2">L² 圆形</option>
              <option value="Linf">L∞ 正方形</option>
              <option value="all">全部对比</option>
            </select>
          </label>
        </template>
        <svg ref="svg3" viewBox="0 0 500 400" class="responsive-svg">
          <!-- Grid -->
          <g opacity="0.1">
            <line v-for="i in 20" :key="'gx'+i" :x1="i*25" y1="0" :x2="i*25" y2="400" stroke="#94a3b8" stroke-width="0.5"/>
            <line v-for="i in 16" :key="'gy'+i" x1="0" :y1="i*25" :x2="500" :y2="i*25" stroke="#94a3b8" stroke-width="0.5"/>
          </g>
          <!-- Axes -->
          <line x1="250" y1="20" x2="250" y2="380" stroke="#334155" stroke-width="1.2"/>
          <line x1="20" y1="200" x2="480" y2="200" stroke="#334155" stroke-width="1.2"/>
          <text x="485" y="205" font-size="12" fill="#334155">x₁</text>
          <text x="255" y="30" font-size="12" fill="#334155">x₂</text>
          <!-- Scale labels -->
          <text x="350" y="218" font-size="10" fill="#94a3b8">1</text>
          <text x="145" y="218" font-size="10" fill="#94a3b8">-1</text>
          <text x="258" y="100" font-size="10" fill="#94a3b8">1</text>
          <text x="258" y="305" font-size="10" fill="#94a3b8">-1</text>

          <!-- Unit ball L1 (diamond) -->
          <polygon
v-if="showL1" points="350,200 250,100 150,200 250,300"
                   fill="#ec4899" :opacity="ballProg*0.2" stroke="#ec4899" stroke-width="2"/>
          <text v-if="showL1 && ballProg>0.5" x="60" y="120" fill="#ec4899" font-size="13" font-weight="700">‖x‖₁=1</text>

          <!-- Unit ball L2 (circle) -->
          <circle
v-if="showL2" cx="250" cy="200" :r="100*ballProg"
                  fill="#7c3aed" :opacity="ballProg*0.15" stroke="#7c3aed" stroke-width="2"/>
          <text v-if="showL2 && ballProg>0.5" x="400" y="140" fill="#7c3aed" font-size="13" font-weight="700">‖x‖₂=1</text>

          <!-- Unit ball Linf (square) -->
          <rect
v-if="showLinf" :x="250-100*ballProg" :y="200-100*ballProg" :width="200*ballProg" :height="200*ballProg"
                fill="#ea580c" :opacity="ballProg*0.12" stroke="#ea580c" stroke-width="2"/>
          <text v-if="showLinf && ballProg>0.5" x="360" y="95" fill="#ea580c" font-size="13" font-weight="700">‖x‖∞=1</text>

          <!-- Rotating vector on unit ball -->
          <g v-if="ballProg >= 1">
            <line
x1="250" y1="200" :x2="250 + rvx" :y2="200 - rvy"
                  stroke="#dc2626" stroke-width="2"/>
            <circle :cx="250 + rvx" :cy="200 - rvy" r="5" fill="#dc2626"/>
            <text :x="250 + rvx + 8" :y="200 - rvy" fill="#dc2626" font-size="12" font-weight="600">x(θ)</text>
            <text x="20" y="380" font-size="12" fill="#64748b">
              ‖x(θ)‖{{ normLabel }} = 1，旋转角θ = {{ Math.round(rotAngle*180/Math.PI) }}°
            </text>
          </g>
        </svg>
      </AnimationBox>
    </Section>

    <!-- Section 4: 矩阵范数 -->
    <Section title="矩阵范数" :num="7">
      <Theorem title="矩阵范数公理" type="definition" icon="🔢">
        <p>函数<span class="formula-inline">\|\cdot\|: \mathbb{R}^{m \times n} \to \mathbb{R}</span>称为矩阵范数，若满足正定性、齐次性、三角不等式，且满足<strong>相容性</strong>：</p>
        <Formula>\|AB\| \leq \|A\| \cdot \|B\|</Formula>
      </Theorem>

      <h3>从属范数（算子范数）</h3>
      <p>由向量范数诱导的矩阵范数：</p>
      <Formula>\|A\| = \max_{x \neq 0} \frac{\|Ax\|}{\|x\|} = \max_{\|x\|=1} \|Ax\|</Formula>

      <Theorem title="常用从属范数公式" type="theorem" icon="📐">
        <ul>
          <li><strong>列和范数</strong>（L¹诱导）：<span class="formula-inline">\|A\|_1 = \max_j \sum_{i=1}^m |a_{ij}|</span></li>
          <li><strong>谱范数</strong>（L²诱导）：<span class="formula-inline">\|A\|_2 = \sqrt{\lambda_{\max}(A^{\mathsf{T}}A)} = \sigma_{\max}(A)</span>（最大奇异值）</li>
          <li><strong>行和范数</strong>（L∞诱导）：<span class="formula-inline">\|A\|_\infty = \max_i \sum_{j=1}^n |a_{ij}|</span></li>
        </ul>
      </Theorem>

      <h3>Frobenius 范数</h3>
      <Formula>\|A\|_F = \sqrt{\sum_{i,j} |a_{ij}|^2} = \sqrt{\operatorname{tr}(A^{\mathsf{T}}A)} = \sqrt{\sum_i \sigma_i^2}</Formula>
      <p>Frobenius范数不是从属范数，但满足相容性，且是酉不变范数。</p>

      <Theorem title="谱半径与范数的关系" type="theorem" icon="🎯">
        <p>对任意矩阵范数<span class="formula-inline">\|\cdot\|</span>，有：</p>
        <Formula>\rho(A) \leq \|A\|</Formula>
        <p>其中<span class="formula-inline">\rho(A) = \max\{|\lambda| : \lambda \text{ 是 }A\text{ 的特征值}\}</span>为<strong>谱半径</strong>。</p>
        <p>进一步，对任意<span class="formula-inline">\varepsilon > 0</span>，存在矩阵范数使得<span class="formula-inline">\|A\| \leq \rho(A) + \varepsilon</span>。</p>
      </Theorem>
    </Section>

    <!-- 真题例题 -->
    <Section title="真题例题" :num="8">
      <ExampleBox source="期末数据拟合真题" badge="📝 真题1">
        <template #problem>
          <p>给定数据点<span class="formula-inline">(0,1), (1,2), (2,4), (3,5)</span>，用最小二乘法求最佳拟合直线<span class="formula-inline">y = a + bx</span>。</p>
        </template>
        <template #solution>
          <div class="step">
            <div class="step-num">1</div>
            <div>
              <p><strong>建立超定方程组</strong>：将四个点代入<span class="formula-inline">y = a + bx</span>：</p>
              <Formula>\begin{cases} a = 1 \\ a + b = 2 \\ a + 2b = 4 \\ a + 3b = 5 \end{cases} \implies \begin{pmatrix} 1 & 0 \\ 1 & 1 \\ 1 & 2 \\ 1 & 3 \end{pmatrix}\begin{pmatrix} a \\ b \end{pmatrix} = \begin{pmatrix} 1 \\ 2 \\ 4 \\ 5 \end{pmatrix}</Formula>
            </div>
          </div>
          <div class="step">
            <div class="step-num">2</div>
            <div>
              <p><strong>计算正规方程</strong> <span class="formula-inline">A^{\mathsf{T}}Ax = A^{\mathsf{T}}b</span>：</p>
              <Formula>A^{\mathsf{T}}A = \begin{pmatrix} 4 & 6 \\ 6 & 14 \end{pmatrix}, \quad A^{\mathsf{T}}b = \begin{pmatrix} 12 \\ 25 \end{pmatrix}</Formula>
            </div>
          </div>
          <div class="step">
            <div class="step-num">3</div>
            <div>
              <p><strong>求解</strong>：<span class="formula-inline">\det(A^{\mathsf{T}}A) = 56 - 36 = 20</span></p>
              <Formula>(A^{\mathsf{T}}A)^{-1} = \frac{1}{20}\begin{pmatrix} 14 & -6 \\ -6 & 4 \end{pmatrix}</Formula>
              <Formula>\begin{pmatrix} a \\ b \end{pmatrix} = \frac{1}{20}\begin{pmatrix} 14 & -6 \\ -6 & 4 \end{pmatrix}\begin{pmatrix} 12 \\ 25 \end{pmatrix} = \frac{1}{20}\begin{pmatrix} 18 \\ 28 \end{pmatrix} = \begin{pmatrix} 0.9 \\ 1.4 \end{pmatrix}</Formula>
            </div>
          </div>
          <div class="step">
            <div class="step-num">4</div>
            <div>
              <p><strong>最佳拟合直线</strong>：<span class="formula-inline">y = 0.9 + 1.4x</span></p>
              <p>验证残差：<span class="formula-inline">r = (0.1, -0.3, 0.3, -0.1)^{\mathsf{T}}</span>，<span class="formula-inline">A^{\mathsf{T}}r = (0, 0)^{\mathsf{T}}</span> ✓</p>
            </div>
          </div>
        </template>
      </ExampleBox>

      <ExampleBox source="范数证明题" badge="📝 真题2">
        <template #problem>
          <p>证明：对任意矩阵从属范数，<span class="formula-inline">\rho(A) \leq \|A\|</span>。</p>
        </template>
        <template #solution>
          <div class="step">
            <div class="step-num">1</div>
            <div>
              <p><strong>设<span class="formula-inline">\lambda</span>是<span class="formula-inline">A</span>的任一特征值</strong>，<span class="formula-inline">x \neq 0</span>为对应的特征向量：<span class="formula-inline">Ax = \lambda x</span>。</p>
            </div>
          </div>
          <div class="step">
            <div class="step-num">2</div>
            <div>
              <p><strong>两边取范数</strong>（利用相容性和齐次性）：</p>
              <Formula>\|Ax\| = \|\lambda x\| = |\lambda| \cdot \|x\|</Formula>
            </div>
          </div>
          <div class="step">
            <div class="step-num">3</div>
            <div>
              <p><strong>由从属范数定义</strong>：<span class="formula-inline">\|Ax\| \leq \|A\| \cdot \|x\|</span>，故</p>
              <Formula>|\lambda| \cdot \|x\| \leq \|A\| \cdot \|x\| \implies |\lambda| \leq \|A\|</Formula>
            </div>
          </div>
          <div class="step">
            <div class="step-num">4</div>
            <div>
              <p><strong>由<span class="formula-inline">\lambda</span>的任意性</strong>：<span class="formula-inline">\rho(A) = \max|\lambda| \leq \|A\|</span>。 ∎</p>
            </div>
          </div>
        </template>
      </ExampleBox>

      <ExampleBox source="二次拟合真题" badge="📝 真题3">
        <template #problem>
          <p>给定数据点<span class="formula-inline">(-1,0), (0,1), (1,2), (2,3)</span>，用最小二乘法求二次多项式拟合<span class="formula-inline">y = a_0 + a_1 x + a_2 x^2</span>。</p>
        </template>
        <template #solution>
          <div class="step">
            <div class="step-num">1</div>
            <div>
              <p><strong>建立超定方程组</strong>：</p>
              <Formula>A = \begin{pmatrix} 1 & -1 & 1 \\ 1 & 0 & 0 \\ 1 & 1 & 1 \\ 1 & 2 & 4 \end{pmatrix}, \quad b = \begin{pmatrix} 0 \\ 1 \\ 2 \\ 3 \end{pmatrix}</Formula>
            </div>
          </div>
          <div class="step">
            <div class="step-num">2</div>
            <div>
              <p><strong>正规方程</strong>：<span class="formula-inline">A^{\mathsf{T}}A = \begin{pmatrix}4&2&6\\2&6&8\\6&8&18\end{pmatrix}</span>，<span class="formula-inline">A^{\mathsf{T}}b = (6,8,14)^{\mathsf{T}}</span></p>
            </div>
          </div>
          <div class="step">
            <div class="step-num">3</div>
            <div>
              <p><strong>求解</strong>：<span class="formula-inline">(a_0,a_1,a_2)^{\mathsf{T}} = (A^{\mathsf{T}}A)^{-1}A^{\mathsf{T}}b = (1, 1.3, -0.1)^{\mathsf{T}}</span>（近似值），最佳拟合为<span class="formula-inline">y \approx 1 + 1.3x - 0.1x^2</span>。</p>
            </div>
          </div>
        </template>
      </ExampleBox>

      <Steps
:steps="[
        '最小二乘问题：判断<span class=&quot;formula-inline&quot;>Ax=b</span>是否无解（<span class=&quot;formula-inline&quot;>r(A)\\neq r(A|b)</span>），写出<span class=&quot;formula-inline&quot;>\\min\\|Ax-b\\|^2</span>',
        '正规方程：计算<span class=&quot;formula-inline&quot;>A^{\\mathsf{T}}A</span>和<span class=&quot;formula-inline&quot;>A^{\\mathsf{T}}b</span>，解<span class=&quot;formula-inline&quot;>A^{\\mathsf{T}}Ax=A^{\\mathsf{T}}b</span>；列满秩时<span class=&quot;formula-inline&quot;>x=(A^{\\mathsf{T}}A)^{-1}A^{\\mathsf{T}}b=A^+b</span>',
        '几何验证：残差<span class=&quot;formula-inline&quot;>r=b-Ax^*</span>应满足<span class=&quot;formula-inline&quot;>A^{\\mathsf{T}}r=0</span>（<span class=&quot;formula-inline&quot;>r\\perp R(A)</span>），可用此检查计算',
        '向量范数：验证三公理（正定/齐次/三角不等式），注意L¹/L²/L∞公式',
        '矩阵从属范数：<span class=&quot;formula-inline&quot;>\\|A\\|=\\max(\\|Ax\\|/\\|x\\|)</span>，记列和/谱/行和范数公式',
        '谱半径不等式：<span class=&quot;formula-inline&quot;>\\rho(A)\\leq\\|A\\|</span>对任意矩阵范数成立，证明思路是取特征对用定义'
      ]"/>
    </Section>

    <!-- WeekQuizBank -->
    <Section title="🗂️ 真题与习题汇总">
      <WeekQuizBank :quizzes="quizzes" week-label="第3周" />
    </Section>

    <Section title="📝 课后作业" :num="9">
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
import { ref, computed, onMounted, nextTick, onUnmounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js'

const quizzes = (quizBank[9] || []).map(q => ({ ...q, lessonNum: '09', lessonTitle: '最小二乘与范数' }))
const hwQuizzes = computed(() => (homeworkBank[9] || []).map(q => ({ ...q })))

const renderTrigger = ref(0)
useKatex(renderTrigger)

// ====== Vector math library ======
function vecAdd(a, b) { return a.map((v, i) => v + b[i]) }
function vecScale(a, s) { return a.map(v => v * s) }
function vecDot(a, b) { return a.reduce((s, v, i) => s + v * b[i], 0) }
function vecCross(a, b) {
  return [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]]
}
function vecNorm(a) { return Math.sqrt(vecDot(a, a)) }
function vecUnit(a) {
  const n = vecNorm(a)
  return n < 0.0001 ? [0, 0, 0] : vecScale(a, 1 / n)
}
function vecLerp(a, b, t) { return a.map((v, i) => v + (b[i] - v) * t) }

// ====== Shared geometry (computed once, never mutated) ======
const GEOM = (() => {
  const a1 = [2.65, 0.35, 0]
  const a2 = [0.55, 2.25, 0]
  const n = vecUnit(vecCross(a1, a2))
  const p = vecAdd(vecScale(a1, 0.72), vecScale(a2, 0.62))
  const r = vecScale(n, 1.55)
  const b  = vecAdd(p, r)
  const planeCorners = [
    vecAdd(vecScale(a1, -0.2), vecScale(a2, -0.2)),
    vecAdd(vecScale(a1, 1.25), vecScale(a2, -0.2)),
    vecAdd(vecScale(a1, 1.25), vecScale(a2, 1.12)),
    vecAdd(vecScale(a1, -0.2), vecScale(a2, 1.12))
  ]
  return { a1, a2, n, p, r, b, planeCorners }
})()

function toVector3(v) {
  return new THREE.Vector3(v[0], v[2], v[1])
}

// ====== Animation 1: b → plane projection ======
const playing1 = ref(false)
const projStepText = ref('点击播放：从 b 垂直落到列空间 R(A)')
const projViewport = ref(null)
let projCtx = null
let projTimer = null
let projTweenRaf = null

// ====== Animation 2: residual orthogonality ======
const playing2 = ref(false)
const orthoStepText = ref('点击播放：观察 r 与 a1、a2 同时正交')
const orthoViewport = ref(null)
let orthoCtx = null
let orthoTimer = null

const PROJ_STEPS = [
  '列空间 R(A) 是由 a1、a2 张成的过原点平面',
  'b 不在 R(A) 内，方程 Ax = b 无精确解',
  'Pb = Ax* 是 b 在 R(A) 上的正交投影',
  '残差 r = b - Pb 垂直于 R(A)，所以 Pb 是最近点'
]
const ORTHO_STEPS = [
  '列向量 a1、a2 都在 R(A) 平面内',
  '最小二乘把 b 分解成 Ax* + r',
  'r 沿平面法向量方向离开 R(A)',
  '因此 a1^T r = 0，a2^T r = 0，也就是 A^T r = 0'
]

function makeLabel(text, className = '') {
  const el = document.createElement('div')
  el.className = `ls3d-label ${className}`
  el.textContent = text
  return new CSS2DObject(el)
}

function addLabel(ctx, text, position, className = '') {
  const label = makeLabel(text, className)
  label.position.copy(position)
  ctx.layer.add(label)
  return label
}

function addArrow(ctx, from, to, color, label = '', options = {}) {
  const start = toVector3(from)
  const end = toVector3(to)
  const diff = end.clone().sub(start)
  if (diff.length() < 0.0001) return null
  const arrow = new THREE.ArrowHelper(
    diff.clone().normalize(),
    start,
    diff.length(),
    color,
    options.headLength ?? 0.18,
    options.headWidth ?? 0.1
  )
  arrow.line.material.linewidth = options.lineWidth ?? 3
  arrow.line.material.transparent = true
  arrow.line.material.opacity = options.opacity ?? 1
  arrow.cone.material.transparent = true
  arrow.cone.material.opacity = options.opacity ?? 1
  ctx.layer.add(arrow)
  if (label) {
    const labelPos = start.clone().lerp(end, options.labelAt ?? 0.9).add(new THREE.Vector3(0.08, 0.1, 0.06))
    addLabel(ctx, label, labelPos, options.labelClass ?? '')
  }
  return arrow
}

function addVector(ctx, v, color, label, options = {}) {
  return addArrow(ctx, [0, 0, 0], v, color, label, options)
}

function addDashedLine(ctx, from, to, color, label = '', options = {}) {
  const points = [toVector3(from), toVector3(to)]
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const material = new THREE.LineDashedMaterial({
    color,
    dashSize: options.dashSize ?? 0.12,
    gapSize: options.gapSize ?? 0.08,
    transparent: true,
    opacity: options.opacity ?? 0.78
  })
  const line = new THREE.Line(geometry, material)
  line.computeLineDistances()
  ctx.layer.add(line)
  if (label) {
    const labelPos = points[0].clone().lerp(points[1], options.labelAt ?? 0.5).add(new THREE.Vector3(0.08, 0.1, 0.05))
    addLabel(ctx, label, labelPos, options.labelClass ?? '')
  }
  return line
}

function addPoint(ctx, point, color, label = '', options = {}) {
  const geometry = new THREE.SphereGeometry(options.radius ?? 0.055, 24, 16)
  const material = new THREE.MeshStandardMaterial({ color, roughness: 0.5, metalness: 0.05 })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.copy(toVector3(point))
  ctx.layer.add(mesh)
  if (label) {
    addLabel(ctx, label, mesh.position.clone().add(new THREE.Vector3(0.08, 0.12, 0.06)), options.labelClass ?? '')
  }
  return mesh
}

function addColumnPlane(ctx, color = 0xfed7aa, edge = 0xea580c) {
  const corners = GEOM.planeCorners.map(toVector3)
  const geometry = new THREE.BufferGeometry().setFromPoints(corners)
  geometry.setIndex([0, 1, 2, 0, 2, 3])
  geometry.computeVertexNormals()
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.38,
    side: THREE.DoubleSide,
    depthWrite: false
  })
  const plane = new THREE.Mesh(geometry, material)
  ctx.layer.add(plane)

  const lineGeometry = new THREE.BufferGeometry().setFromPoints([...corners, corners[0]])
  const line = new THREE.Line(
    lineGeometry,
    new THREE.LineBasicMaterial({ color: edge, transparent: true, opacity: 0.8 })
  )
  ctx.layer.add(line)

  addLabel(ctx, 'R(A) = span{a1,a2}', corners[2].clone().add(new THREE.Vector3(0.08, 0.1, 0)), 'ls3d-label-plane')
}

function addRightAngle(ctx, base, dirA, dirB, color = 0xdc2626, size = 0.24) {
  const a = vecAdd(base, vecScale(dirA, size))
  const c = vecAdd(base, vecScale(dirB, size))
  const b = vecAdd(a, vecScale(dirB, size))
  const points = [base, a, b, c, base].map(toVector3)
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.88 })
  const line = new THREE.Line(geometry, material)
  ctx.layer.add(line)
  return line
}

function clearLayer(ctx) {
  if (!ctx?.layer) return
  while (ctx.layer.children.length) {
    const child = ctx.layer.children[0]
    ctx.layer.remove(child)
    child.traverse?.((obj) => {
      obj.geometry?.dispose?.()
      if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose?.())
      else obj.material?.dispose?.()
    })
  }
}

function renderProjectionScene(step = 0, dropPoint = null) {
  if (!projCtx) return
  clearLayer(projCtx)
  addColumnPlane(projCtx, 0xfed7aa, 0xea580c)
  addPoint(projCtx, [0, 0, 0], 0x334155, 'O', { labelClass: 'ls3d-label-axis', radius: 0.04 })
  addVector(projCtx, GEOM.a1, 0x0d9488, 'a1', { labelClass: 'ls3d-label-a' })
  addVector(projCtx, GEOM.a2, 0x14b8a6, 'a2', { labelClass: 'ls3d-label-a' })

  if (step >= 1) {
    addVector(projCtx, GEOM.b, 0x2563eb, 'b', { labelClass: 'ls3d-label-b', headLength: 0.22, headWidth: 0.12 })
    addPoint(projCtx, GEOM.b, 0x2563eb)
  }
  if (step >= 2) {
    const current = dropPoint ?? GEOM.p
    addDashedLine(projCtx, GEOM.b, current, 0x2563eb, 'orthogonal drop', { opacity: 0.45, labelClass: 'ls3d-label-b' })
    addVector(projCtx, current, 0xea580c, 'Pb = Ax*', { labelClass: 'ls3d-label-p', headLength: 0.2, headWidth: 0.12 })
    addPoint(projCtx, current, 0xea580c)
  }
  if (step >= 3) {
    addArrow(projCtx, GEOM.p, GEOM.b, 0xdc2626, 'r = b - Pb', { labelClass: 'ls3d-label-r', labelAt: 0.52 })
    addRightAngle(projCtx, GEOM.p, vecUnit(GEOM.a1), GEOM.n)
    addLabel(projCtx, 'r ⟂ R(A)  =>  A^T r = 0', new THREE.Vector3(-1.15, 2.35, -1.15), 'ls3d-label-note')
  }
  projStepText.value = PROJ_STEPS[Math.min(step, PROJ_STEPS.length - 1)]
}

function renderOrthogonalityScene(step = 0) {
  if (!orthoCtx) return
  clearLayer(orthoCtx)
  addColumnPlane(orthoCtx, 0xccfbf1, 0x0d9488)
  addPoint(orthoCtx, [0, 0, 0], 0x334155, 'O', { labelClass: 'ls3d-label-axis', radius: 0.04 })
  addVector(orthoCtx, GEOM.a1, 0x0d9488, 'a1', { labelClass: 'ls3d-label-a' })
  addVector(orthoCtx, GEOM.a2, 0x14b8a6, 'a2', { labelClass: 'ls3d-label-a' })

  if (step >= 1) {
    addVector(orthoCtx, GEOM.b, 0x2563eb, 'b', { labelClass: 'ls3d-label-b', opacity: 0.82 })
    addVector(orthoCtx, GEOM.p, 0xea580c, 'Ax*', { labelClass: 'ls3d-label-p' })
    addPoint(orthoCtx, GEOM.p, 0xea580c)
  }
  if (step >= 2) {
    addArrow(orthoCtx, GEOM.p, GEOM.b, 0xdc2626, 'r', { labelClass: 'ls3d-label-r', labelAt: 0.55 })
    addDashedLine(orthoCtx, GEOM.b, GEOM.p, 0xdc2626, '', { opacity: 0.35 })
  }
  if (step >= 3) {
    addRightAngle(orthoCtx, GEOM.p, vecUnit(GEOM.a1), GEOM.n)
    addRightAngle(orthoCtx, GEOM.p, vecUnit(GEOM.a2), GEOM.n, 0xdc2626, 0.19)
    addLabel(orthoCtx, 'a1^T r = 0', toVector3(vecAdd(GEOM.p, vecAdd(vecScale(vecUnit(GEOM.a1), 0.68), vecScale(GEOM.n, 0.35)))), 'ls3d-label-note')
    addLabel(orthoCtx, 'a2^T r = 0', toVector3(vecAdd(GEOM.p, vecAdd(vecScale(vecUnit(GEOM.a2), 0.62), vecScale(GEOM.n, 0.62)))), 'ls3d-label-note')
    addLabel(orthoCtx, 'A^T r = 0  =>  A^T A x* = A^T b', new THREE.Vector3(-1.2, 2.35, -1.15), 'ls3d-label-note')
  }
  orthoStepText.value = ORTHO_STEPS[Math.min(step, ORTHO_STEPS.length - 1)]
}

function resizeScene(ctx) {
  if (!ctx?.viewport?.value || !ctx.camera || !ctx.renderer || !ctx.labelRenderer) return
  const rect = ctx.viewport.value.getBoundingClientRect()
  const width = Math.max(rect.width, 320)
  const height = Math.max(rect.height, 360)
  ctx.camera.aspect = width / height
  ctx.camera.updateProjectionMatrix()
  ctx.renderer.setSize(width, height)
  ctx.labelRenderer.setSize(width, height)
}

function drawFrame(ctx) {
  if (!ctx?.renderer || !ctx.scene || !ctx.camera) return
  ctx.controls?.update()
  ctx.renderer.render(ctx.scene, ctx.camera)
  ctx.labelRenderer?.render(ctx.scene, ctx.camera)
  ctx.raf = requestAnimationFrame(() => drawFrame(ctx))
}

function initScene(viewport) {
  if (!viewport.value) return null
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf8fafc)
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 100)
  camera.position.set(5.2, 4.2, 6.2)

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.domElement.className = 'ls3d-canvas'
  viewport.value.appendChild(renderer.domElement)

  const labelRenderer = new CSS2DRenderer()
  labelRenderer.domElement.className = 'ls3d-label-layer'
  viewport.value.appendChild(labelRenderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.08
  controls.target.set(1.25, 0.45, 1.1)
  controls.minDistance = 3.2
  controls.maxDistance = 13
  controls.enablePan = true

  scene.add(new THREE.HemisphereLight(0xffffff, 0xdbeafe, 2.3))
  scene.add(new THREE.DirectionalLight(0xffffff, 1.2))
  const grid = new THREE.GridHelper(6, 12, 0xcbd5e1, 0xe2e8f0)
  grid.position.y = -0.03
  scene.add(grid)

  const axes = [
    { v: [3, 0, 0], color: 0x94a3b8, label: 'x1' },
    { v: [0, 3, 0], color: 0x94a3b8, label: 'x3' },
    { v: [0, 0, 3], color: 0x94a3b8, label: 'x2' }
  ]
  axes.forEach(axis => {
    const end = new THREE.Vector3(...axis.v)
    scene.add(new THREE.ArrowHelper(end.clone().normalize(), new THREE.Vector3(0, 0, 0), end.length(), axis.color, 0.12, 0.08))
    const label = makeLabel(axis.label, 'ls3d-label-axis')
    label.position.copy(end.multiplyScalar(1.05))
    scene.add(label)
  })

  const layer = new THREE.Group()
  scene.add(layer)
  const ctx = { viewport, scene, camera, renderer, labelRenderer, controls, layer, observer: null, raf: null }
  ctx.observer = new ResizeObserver(() => resizeScene(ctx))
  ctx.observer.observe(viewport.value)
  resizeScene(ctx)
  drawFrame(ctx)
  return ctx
}

function disposeScene(ctx) {
  if (!ctx) return
  if (ctx.raf) cancelAnimationFrame(ctx.raf)
  ctx.observer?.disconnect()
  ctx.controls?.dispose()
  clearLayer(ctx)
  ctx.scene?.traverse((obj) => {
    obj.geometry?.dispose?.()
    if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose?.())
    else obj.material?.dispose?.()
  })
  ctx.renderer?.dispose()
  ctx.renderer?.domElement?.remove()
  ctx.labelRenderer?.domElement?.remove()
}

function animateDrop(duration = 1200) {
  if (projTweenRaf) cancelAnimationFrame(projTweenRaf)
  return new Promise(resolve => {
    const start = performance.now()
    function tick(now) {
      if (!playing1.value) { resolve(false); return }
      const t = easeOutCubic(Math.min((now - start) / duration, 1))
      renderProjectionScene(2, vecLerp(GEOM.b, GEOM.p, t))
      if (t < 1) projTweenRaf = requestAnimationFrame(tick)
      else {
        projTweenRaf = null
        resolve(true)
      }
    }
    projTweenRaf = requestAnimationFrame(tick)
  })
}

async function playProjectionSequence() {
  renderProjectionScene(0)
  await delay(800, () => playing1.value)
  if (!playing1.value) return
  renderProjectionScene(1)
  await delay(900, () => playing1.value)
  if (!playing1.value) return
  const dropped = await animateDrop()
  if (!dropped || !playing1.value) return
  renderProjectionScene(3)
  playing1.value = false
}

function play1() {
  if (playing1.value) return
  playing1.value = true
  playProjectionSequence()
}
function pause1() {
  playing1.value = false
  if (projTimer) clearTimeout(projTimer)
  if (projTweenRaf) cancelAnimationFrame(projTweenRaf)
  projTweenRaf = null
}
function reset1() {
  pause1()
  renderProjectionScene(0)
}

async function playOrthogonalitySequence() {
  for (let step = 0; step <= 3; step++) {
    if (!playing2.value) return
    renderOrthogonalityScene(step)
    if (step < 3) await delay(900, () => playing2.value, 'ortho')
  }
  playing2.value = false
}

function play2() {
  if (playing2.value) return
  playing2.value = true
  playOrthogonalitySequence()
}
function pause2() {
  playing2.value = false
  if (orthoTimer) clearTimeout(orthoTimer)
}
function reset2() {
  pause2()
  renderOrthogonalityScene(0)
}

function delay(ms, shouldContinue, which = 'proj') {
  return new Promise(resolve => {
    const timer = setTimeout(() => resolve(shouldContinue()), ms)
    if (which === 'proj') projTimer = timer
    else orthoTimer = timer
  })
}

// ====== Animation 3: Unit balls ======
const playing3 = ref(false)
let rafId3 = null, t3 = 0
const normType = ref('all')
const ballProg = ref(0)
const rotAngle = ref(0)

const showL1 = computed(() => normType.value === 'L1' || normType.value === 'all')
const showL2 = computed(() => normType.value === 'L2' || normType.value === 'all')
const showLinf = computed(() => normType.value === 'Linf' || normType.value === 'all')

const normLabel = computed(() => {
  if (normType.value === 'L1') return '₁'
  if (normType.value === 'L2') return '₂'
  if (normType.value === 'Linf') return '∞'
  return ''
})

const rvx = computed(() => {
  const th = rotAngle.value
  let r = 1
  if (normType.value === 'L1') r = 1/(Math.abs(Math.cos(th)) + Math.abs(Math.sin(th)))
  else if (normType.value === 'L2') r = 1
  else if (normType.value === 'Linf') r = 1/Math.max(Math.abs(Math.cos(th)), Math.abs(Math.sin(th)))
  else r = 1
  return 100 * r * Math.cos(th)
})
const rvy = computed(() => {
  const th = rotAngle.value
  let r = 1
  if (normType.value === 'L1') r = 1/(Math.abs(Math.cos(th)) + Math.abs(Math.sin(th)))
  else if (normType.value === 'L2') r = 1
  else if (normType.value === 'Linf') r = 1/Math.max(Math.abs(Math.cos(th)), Math.abs(Math.sin(th)))
  else r = 1
  return 100 * r * Math.sin(th)
})

const animate3 = () => {
  t3 += 0.012
  ballProg.value = Math.min(easeOutCubic(t3 * 1.5), 1)
  rotAngle.value += 0.015
  if (rotAngle.value > Math.PI * 2) rotAngle.value -= Math.PI * 2
  rafId3 = requestAnimationFrame(animate3)
}
const play3 = () => { if (!playing3.value) { playing3.value = true; t3 = 0; animate3() } }
const pause3 = () => { playing3.value = false; if (rafId3) cancelAnimationFrame(rafId3) }
const reset3 = () => { pause3(); t3 = 0; ballProg.value = 0; rotAngle.value = 0 }

function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3) }

onMounted(() => {
  nextTick(() => {
    projCtx = initScene(projViewport)
    orthoCtx = initScene(orthoViewport)
    renderProjectionScene(0)
    renderOrthogonalityScene(0)
  })
})

onUnmounted(() => {
  pause1()
  pause2()
  if (rafId3) cancelAnimationFrame(rafId3)
  disposeScene(projCtx)
  disposeScene(orthoCtx)
})
</script>

<style scoped>
.formula-inline { display: inline; }
.formula-block { display: block; text-align: center; }
h3 { color: #7c3aed; }
.responsive-svg { max-width: 100%; height: auto; display: block; }
:deep(.formula-block), :deep(.formula-inline) { overflow-x: auto; }

.ls3d-stage {
  width: min(100%, 980px);
  margin: 0 auto;
}
.ls3d-viewport {
  position: relative;
  height: clamp(380px, 54vw, 560px);
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-background);
  touch-action: none;
}
.ls3d-canvas,
.ls3d-label-layer {
  position: absolute;
  inset: 0;
  display: block;
}
.ls3d-label-layer {
  pointer-events: none;
}
:deep(.ls3d-label) {
  padding: 3px 7px;
  border-radius: 6px;
  background: rgba(248, 250, 252, 0.9);
  color: #0f172a;
  font-size: 13px;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
  box-shadow: 0 1px 5px rgba(15, 23, 42, 0.1);
  user-select: none;
}
:deep(.ls3d-label-plane) { color: #c2410c; }
:deep(.ls3d-label-a) { color: #0f766e; }
:deep(.ls3d-label-b) { color: #2563eb; }
:deep(.ls3d-label-p) { color: #ea580c; }
:deep(.ls3d-label-r),
:deep(.ls3d-label-note) { color: #dc2626; }
:deep(.ls3d-label-axis) {
  background: transparent;
  color: #64748b;
  box-shadow: none;
  font-size: 13px;
}
.ls3d-legend {
  display: grid;
  grid-template-columns: repeat(4, auto) minmax(220px, 1fr);
  align-items: center;
  gap: 14px;
  margin: 12px 0 0;
  padding: 14px 18px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-card);
  color: var(--color-secondary);
  font-size: 13px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
}
.ls3d-legend span {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}
.ls3d-legend strong {
  color: #0f172a;
  font-size: 14px;
  text-align: right;
}
.ls3d-key {
  width: 30px;
  height: 4px;
  display: inline-block;
  border-radius: 999px;
}
.ls3d-key-plane { background: #fed7aa; border: 1px solid #ea580c; }
.ls3d-key-b { background: #2563eb; }
.ls3d-key-p { background: #ea580c; }
.ls3d-key-r {
  height: 0;
  border-top: 3px dashed #dc2626;
  background: transparent;
}
.ls3d-key-a1 { background: #0d9488; }
.ls3d-key-note { background: #dc2626; }

@media (max-width: 760px) {
  .ls3d-viewport {
    height: 380px;
  }
  .ls3d-legend {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .ls3d-legend strong {
    grid-column: 1 / -1;
    text-align: left;
  }
}
</style>
