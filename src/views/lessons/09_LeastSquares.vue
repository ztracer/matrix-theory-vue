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
    <Section title='向量范数：高维空间里的"尺子"' :num="5">
      <p>
        在日常生活中，比较两个数的大小很简单：<span class="formula-inline">5 > 3</span>，一目了然。但<strong>如果要比较两个"向量"的大小呢？</strong>
        比如 <span class="formula-inline">x = [1,1,1]^{\mathsf{T}}</span> 和 <span class="formula-inline">y = [0,0,2]^{\mathsf{T}}</span>，哪一个"更大"？
        向量有多个维度，没有天然的排序。为了能在数学上定量地说清"这个向量有多长"或"两个向量之间隔得有多远"，
        数学家发明了<strong>范数（Norm）</strong>。
      </p>
      <Theorem title="范数的本质" type="definition" icon="💡">
        <p><strong>范数是一个"把向量映射为一个非负实数"的函数</strong>——它就是高维空间里的一把<strong>"尺子"</strong>，用来量度大小。</p>
        <p>一把"好尺子"必须满足三条不可妥协的公理：</p>
        <ol>
          <li><strong>正定性</strong>：<span class="formula-inline">\|x\| \geq 0</span>，且 <span class="formula-inline">\|x\| = 0 \iff x = 0</span>。只有零向量长度为零——"没有大小"即"什么都没有"。</li>
          <li><strong>齐次性</strong>：<span class="formula-inline">\|\alpha x\| = |\alpha| \cdot \|x\|</span>。把向量放缩 <span class="formula-inline">\alpha</span> 倍，长度也放缩 <span class="formula-inline">|\alpha|</span> 倍。方向不影响长度。</li>
          <li><strong>三角不等式</strong>：<span class="formula-inline">\|x + y\| \leq \|x\| + \|y\|</span>。绕路不会更近——先走 <span class="formula-inline">x</span> 再走 <span class="formula-inline">y</span> 的路程，不可能短于直达 <span class="formula-inline">x+y</span>。</li>
        </ol>
      </Theorem>

      <p style="margin-top:20px;">
        同一把"尺子"可以有不同的刻度方式。下面是最常用的三种——<strong>先理解直觉，再看公式</strong>：
      </p>

      <Theorem title='ℓ₁ 范数 — 曼哈顿距离：在网格城市里"数格子"' type="definition" icon="🚕">
        <p><strong>直觉</strong>：想象你在纽约曼哈顿，道路全是网格。从 A 点到 B 点你无法穿墙走直线，只能沿街道一格一格数过去。</p>
        <Formula display="true">\|x\|_1 = |x_1| + |x_2| + \cdots + |x_n| = \sum_{i=1}^n |x_i|</Formula>
        <p><strong>记忆法</strong>：1-范数就是"一步步走"——所有坐标绝对值直接相加。</p>
      </Theorem>

      <Theorem title='ℓ₂ 范数 — 欧几里得距离：从小用到大的"直尺"' type="definition" icon="📏">
        <p><strong>直觉</strong>：这就是我们从小就会的"两点之间直线距离"。勾股定理的 n 维推广，是物理意义上真正的"长度"。</p>
        <Formula display="true">\|x\|_2 = \sqrt{x_1^2 + x_2^2 + \cdots + x_n^2} = \sqrt{x^{\mathsf{T}}x}</Formula>
        <p><strong>记忆法</strong>：平方和开根号——初中就学过，没有任何记忆负担。</p>
      </Theorem>

      <Theorem title="ℓ∞ 范数 — 切比雪夫距离：木桶效应" type="definition" icon="🪣">
        <p><strong>直觉</strong>：一只木桶能装多少水取决于最短的木板，而 <span class="formula-inline">\ell_\infty</span> 关心的是向量里"最长的那根木头"——绝对值最大的分量。其他分量一律忽略。</p>
        <Formula display="true">\|x\|_\infty = \max\bigl\{|x_1|, |x_2|, \ldots, |x_n|\bigr\}</Formula>
        <p><strong>记忆法</strong>：只看队伍里最显眼的那个大个子。</p>
      </Theorem>

      <Theorem title="L^p 范数族：一个公式统一三者" type="theorem" icon="🔗">
        <Formula display="true">\|x\|_p = \left( \sum_{i=1}^n |x_i|^p \right)^{\!1/p}, \quad p \geq 1</Formula>
        <p>
          <span class="formula-inline">p=1</span> 给出 <span class="formula-inline">\ell_1</span>（曼哈顿），<span class="formula-inline">p=2</span> 给出 <span class="formula-inline">\ell_2</span>（欧氏）。
          条件 <span class="formula-inline">p \geq 1</span> 是<strong>Minkowski 不等式</strong>
          <span class="formula-inline">\|x+y\|_p \leq \|x\|_p + \|y\|_p</span> 的成立门槛——若 <span class="formula-inline">p &lt; 1</span>，
          三角不等式失效，这把"尺子"就不再是合法的范数了。
        </p>
        <p style="margin-top:10px;">
          当 <span class="formula-inline">p \to \infty</span> 时，<span class="formula-inline">L^p</span> 退化为 <span class="formula-inline">L^\infty</span>。推导：设 <span class="formula-inline">M = \max_i |x_i|</span>，则
        </p>
        <Formula display="true">\|x\|_p = M\!\left( \sum_{i=1}^n \Bigl(\frac{|x_i|}{M}\Bigr)^{\!p} \right)^{\!\!1/p} \longrightarrow M \cdot 1 = \|x\|_\infty</Formula>
        <p>
          括号内每一项 <span class="formula-inline">(|x_i|/M)^p \in [0,1]</span>。等于 1 的至多一项（最大值），其余在 <span class="formula-inline">p\to\infty</span> 时坍缩为 0。
          和趋向 1，1 的任意次幂仍为 1。所以 <span class="formula-inline">L^\infty</span> 本就是 <span class="formula-inline">L^p</span> 家族的一员。
        </p>
      </Theorem>

      <Theorem title='Cauchy–Schwarz 不等式 —— ℓ₂ 的"三角不等式引擎"' type="theorem" icon="✛">
        <p>对任意 <span class="formula-inline">x, y \in \mathbb{R}^n</span>：</p>
        <Formula display="true">|x^{\mathsf{T}} y| \leq \|x\|_2 \cdot \|y\|_2</Formula>
        <p>等号成立 <span class="formula-inline">\iff x, y</span> 线性相关。</p>
        <p>把它代入展开：</p>
        <Formula display="true">\|x + y\|_2^2 = \|x\|_2^2 + 2 x^{\mathsf{T}} y + \|y\|_2^2 \leq \|x\|_2^2 + 2\|x\|_2\|y\|_2 + \|y\|_2^2 = (\|x\|_2 + \|y\|_2)^2</Formula>
        <p>所以 <span class="formula-inline">\ell_2</span> 的三角不等式自动成立——C-S 不等式就是它的数学保证。</p>
      </Theorem>

      <Theorem title="范数等价性：选哪把尺子不影响极限" type="theorem" icon="⚖️">
        <p>有限维空间上所有范数都是<strong>等价的</strong>：对任意两种范数 <span class="formula-inline">\|\cdot\|_\alpha, \|\cdot\|_\beta</span>，存在常数 <span class="formula-inline">c_1, c_2 > 0</span> 使得</p>
        <Formula>c_1 \|x\|_\alpha \leq \|x\|_\beta \leq c_2 \|x\|_\alpha, \quad \forall x</Formula>
        <p>例如：<span class="formula-inline">\|x\|_\infty \leq \|x\|_2 \leq \sqrt{n}\|x\|_\infty</span>，<span class="formula-inline">\|x\|_\infty \leq \|x\|_1 \leq n\|x\|_\infty</span>。</p>
        <p><strong>"等价"意味着</strong>：相同的收敛序列、相同的有界集。所以"按 <span class="formula-inline">\ell_1</span> 收敛"与"按 <span class="formula-inline">\ell_2</span> 收敛"是同一件事——<strong>极限不依赖于你选哪把尺子</strong>。</p>
        <p style="margin-top:8px;"><strong>为什么成立</strong>：关键在有限维空间的<strong>紧性</strong>——单位球面 <span class="formula-inline">S = \{x : \|x\|_2 = 1\}</span> 是闭且有界的紧集，任何范数作为 <span class="formula-inline">x</span> 的连续函数在紧集上必取得最大值 <span class="formula-inline">c_2</span> 和最小值 <span class="formula-inline">c_1</span>。这也是定理在无穷维空间失效的根本原因。</p>
      </Theorem>

      <Theorem title="回到最小二乘：换一把尺子，换一个最优解" type="note" icon="🔄">
        <p>前面最小二乘用的是 <span class="formula-inline">\|b - Ax\|_2</span>。如果换一种范数呢？</p>
        <ul>
          <li><span class="formula-inline">\min \|Ax - b\|_2</span>——标准最小二乘（解析解由正规方程给出）。</li>
          <li><span class="formula-inline">\min \|Ax - b\|_1</span>——<strong>鲁棒回归</strong>，对离群点不敏感。</li>
          <li><span class="formula-inline">\min \|Ax - b\|_\infty</span>——<strong>极小极大逼近</strong>，严格控制最大偏差。</li>
        </ul>
        <p>范数等价只保证拓扑相同（"收敛"这个概念不受影响），但<strong>最优解会不同</strong>——
          哪把尺子量出来的"最近"取决于尺子的形状。</p>
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
    <Section title='矩阵范数：变换的"拉伸威力"与"自身能量"' :num="7">
      <p>
        向量范数量度的是"一个点的位置"。但矩阵不是点——<strong>矩阵是一个"变换"</strong>。
        它把一个向量拉伸、旋转、扭曲，变成另一个向量（<span class="formula-inline">y = Ax</span>）。
      </p>
      <p>
        那怎么量度一个矩阵的"大小"呢？不能光看它里面的元素大不大——一个全是 100 的矩阵，如果作用在接近零空间的向量上，可能输出几乎为零。<strong>矩阵范数量的是它的"破坏力"：最多能把一个单位向量拉多长。</strong>
      </p>

      <Theorem title="两大流派：诱导范数 vs 非诱导范数" type="definition" icon="🎛️">
        <p>矩阵范数分为两大流派，设计哲学截然不同：</p>
        <p><strong>流派 A — 诱导范数（算子范数）</strong>：让矩阵 <span class="formula-inline">A</span> 去<strong>"攻击"</strong>所有长度为 1 的向量，看它最多能把谁拉多长：</p>
        <Formula>\|A\| = \max_{\|x\|=1} \|Ax\| = \max_{x \neq 0} \frac{\|Ax\|}{\|x\|}</Formula>
        <p>这派范数的定义极其<strong>"浪漫"</strong>——它不是算矩阵自身的元素，而是算矩阵的"行为"。它回答的问题是：这个变换的"最大放大倍数"是多少？</p>
        <p style="margin-top:12px;"><strong>流派 B — 非诱导范数</strong>：不关心变换行为，单纯把矩阵"拉直"成一个长向量，用向量范数去量它。Frobenius 范数就是这一派的代表。</p>
      </Theorem>

      <p style="margin-top:20px;">
        下面逐一展开诱导范数的三种具体形式——<strong>每种都先给记忆口诀，再看推导</strong>：
      </p>

      <Theorem title='‖A‖₁ — 列和范数（记忆法："1"像竖线 → 算列和）' type="theorem" icon="📐">
        <Formula display="true">\|A\|_1 = \max_{1 \leq j \leq n} \sum_{i=1}^m |a_{ij}|</Formula>
        <p><strong>记忆法</strong>："1"是一竖——所以沿着<strong>列</strong>方向求和。先算每一列的绝对值之和，取最大的那一列。</p>
        <p><strong>推导</strong>：用 <span class="formula-inline">\|x\|_1 = \sum_j |x_j|</span>，</p>
        <Formula display="true">\|Ax\|_1 \leq \sum_{j=1}^n |x_j| \underbrace{\sum_{i=1}^m |a_{ij}|}_{=:\, c_j} \leq \bigl(\max_j c_j\bigr) \|x\|_1</Formula>
        <p>取 <span class="formula-inline">x = e_{j^*}</span>（第 <span class="formula-inline">j^*</span> 个单位坐标向量）即可达到上界。</p>
      </Theorem>

      <Theorem title='‖A‖∞ — 行和范数（记忆法："∞"是横着的8 → 算行和）' type="theorem" icon="📐">
        <Formula display="true">\|A\|_\infty = \max_{1 \leq i \leq m} \sum_{j=1}^n |a_{ij}|</Formula>
        <p><strong>记忆法</strong>：<span class="formula-inline">\infty</span> 是"横着的 8"，所以沿着<strong>行</strong>方向求和。先算每一行的绝对值之和，取最大的那一行。</p>
        <p><strong>推导</strong>：逐行放缩 + 符号向量取等号。</p>
        <Formula display="true">\|Ax\|_\infty \leq \max_i \sum_j |a_{ij}| \cdot \|x\|_\infty, \quad x_j = \operatorname{sign}(a_{kj}) \text{ 可达上界}</Formula>
      </Theorem>

      <Theorem title='‖A‖₂ — 谱范数（记忆法："2"是几何世界 → 找最长轴）' type="theorem" icon="📐">
        <Formula display="true">\|A\|_2 = \sqrt{\lambda_{\max}(A^{\mathsf{T}} A)} = \sigma_{\max}(A)</Formula>
        <p><strong>直觉</strong>：<span class="formula-inline">\ell_2</span> 是"真正的几何长度"。把单位球 <span class="formula-inline">\{x: \|x\|_2=1\}</span> 送进矩阵 <span class="formula-inline">A</span>，会被拉伸成一个<strong>椭球体</strong>。<span class="formula-inline">\|A\|_2</span> 就是这个椭球体<strong>最长的那根轴</strong>的长度——即最大的奇异值。</p>
        <p><strong>推导</strong>（Rayleigh 商）：</p>
        <Formula display="true">\|A\|_2^2 = \max_{\|x\|_2=1} \|Ax\|_2^2 = \max_{\|x\|_2=1} x^{\mathsf{T}} A^{\mathsf{T}} A\, x = \lambda_{\max}(A^{\mathsf{T}} A) = \sigma_{\max}(A)^2</Formula>
      </Theorem>

      <p style="margin:4px 0 12px;font-size:13px;color:var(--color-muted);">
        💡 <strong>三合一记忆口诀</strong>："1列——无横行（∞）——2找最长轴（谱）。"
      </p>

      <Theorem title='Frobenius 范数 — 把矩阵"拉平"成大向量' type="definition" icon="⊞">
        <Formula display="true">\|A\|_F = \sqrt{\sum_{i,j} |a_{ij}|^2} = \sqrt{\operatorname{tr}(A^{\mathsf{T}} A)} = \sqrt{\sum_i \sigma_i^2}</Formula>
        <p><strong>记忆法</strong>："F = Flat（拉平）"——不把矩阵当变换看，而是把所有元素拉成一个长向量，算它的 <span class="formula-inline">\ell_2</span> 范数。<strong>三种等价视角</strong>：元素平方和开根、<span class="formula-inline">A^{\mathsf{T}} A</span> 的迹开根、奇异值的 <span class="formula-inline">\ell_2</span> 组合。</p>
        <p><strong>注意</strong>：F-范数<strong>不是</strong>诱导范数——任何诱导范数都满足 <span class="formula-inline">\|I\| = 1</span>，但 <span class="formula-inline">\|I_n\|_F = \sqrt{n} \neq 1</span>。不过它仍然满足相容性 <span class="formula-inline">\|AB\|_F \leq \|A\|_F \|B\|_F</span>，且对正交变换不变（<span class="formula-inline">\|UA\|_F = \|A\|_F</span>）。</p>
        <Formula display="true">\|A\|_2 \leq \|A\|_F \leq \sqrt{r} \cdot \|A\|_2 \quad (r = \operatorname{rank}(A))</Formula>
        <p>秩 1 矩阵时两端相等：<span class="formula-inline">\|A\|_2 = \|A\|_F</span>。</p>
      </Theorem>

      <Theorem title='谱半径 — 所有范数的"底线"' type="theorem" icon="🎯">
        <p><span class="formula-inline">\rho(A) = \max\{|\lambda| : \lambda \text{ 是 }A\text{ 的特征值}\}</span> 称为<strong>谱半径</strong>。它是矩阵"放大能力"的绝对下限：</p>
        <Formula>\rho(A) \leq \|A\| \quad \text{（对任意矩阵范数）}</Formula>
        <p><strong>证明</strong>：取特征对 <span class="formula-inline">Ax = \lambda x, x \neq 0</span>，</p>
        <Formula>|\lambda| \cdot \|x\| = \|Ax\| \leq \|A\| \cdot \|x\| \implies |\lambda| \leq \|A\| \implies \rho(A) \leq \|A\|</Formula>
        <p><strong>关键推论</strong>：<span class="formula-inline">\rho(A) &lt; 1 \iff</span> 存在矩阵范数使 <span class="formula-inline">\|A\| &lt; 1</span>——这正是<strong>迭代法收敛</strong>的充要条件。</p>
      </Theorem>

      <Theorem title="实算：A=[1,2; 3,4] 五种大小对比" type="tip" icon="🧮">
        <p>取 <span class="formula-inline">A = \begin{pmatrix} 1 &amp; 2 \\ 3 &amp; 4 \end{pmatrix}</span>，过一遍所有范数：</p>

        <div class="step"><div class="step-num">1</div><div>
          <p><strong>列和范数 ‖A‖₁</strong>——逐列绝对值求和：</p>
          <Formula display="true">\text{列 1}: 1+3=4,\; \text{列 2}: 2+4=6 \implies \|A\|_1 = 6</Formula>
        </div></div>

        <div class="step"><div class="step-num">2</div><div>
          <p><strong>行和范数 ‖A‖∞</strong>——逐行绝对值求和：</p>
          <Formula display="true">\text{行 1}: 1+2=3,\; \text{行 2}: 3+4=7 \implies \|A\|_\infty = 7</Formula>
        </div></div>

        <div class="step"><div class="step-num">3</div><div>
          <p><strong>Frobenius 范数</strong>——所有元素平方和开方：</p>
          <Formula display="true">\|A\|_F = \sqrt{1^2 + 2^2 + 3^2 + 4^2} = \sqrt{30} \approx 5.477</Formula>
        </div></div>

        <div class="step"><div class="step-num">4</div><div>
          <p><strong>谱范数 ‖A‖₂</strong>——最大奇异值：</p>
          <Formula display="true">A^{\mathsf{T}} A = \begin{pmatrix} 10 &amp; 14 \\ 14 &amp; 20 \end{pmatrix},\; \lambda_{\max} = 15 + \sqrt{221} \implies \|A\|_2 = \sqrt{15 + \sqrt{221}} \approx 5.465</Formula>
        </div></div>

        <div class="step"><div class="step-num">5</div><div>
          <p><strong>谱半径 ρ(A)</strong>——A 自身特征值：</p>
          <Formula display="true">\rho(A) = \frac{5 + \sqrt{33}}{2} \approx 5.372</Formula>
        </div></div>

        <div class="step"><div class="step-num">6</div><div>
          <p><strong>排序验证</strong>：</p>
          <Formula display="true">\underbrace{\rho(A)}_{5.372} \;\leq\; \underbrace{\|A\|_2}_{5.465} \;\leq\; \underbrace{\|A\|_F}_{5.477} \;\leq\; \underbrace{\|A\|_1}_{6} \;\leq\; \underbrace{\|A\|_\infty}_{7}</Formula>
          <p>五种"大小"各不相同，但都老老实实 ≥ 谱半径。F 范数和谱范数非常接近——因为 A 的两个奇异值量级相近；对秩 1 矩阵，两者完全相等。</p>
        </div></div>
      </Theorem>

      <Theorem title="总结口诀" type="note" icon="🧠">
        <p style="font-size:15px;text-align:center;font-weight:700;">
          向量范数看距离，1步·2直·孤胆最（∞）。<br>
          矩阵 1列·无横行（∞），2看谱半径（奇异值），F拉平全连乘。
        </p>
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

/* Worked example steps inside Theorem cards */
.step {
  display: flex;
  gap: 12px;
  margin: 10px 0;
  padding: 10px 14px;
  background: var(--color-background);
  border-radius: 8px;
  border: 1px solid var(--color-border);
  min-width: 0;
  overflow-x: auto;
}
.step-num {
  min-width: 28px; height: 28px;
  background: var(--color-brand); color: var(--color-on-brand);
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 13px; flex-shrink: 0;
}
.step > :not(.step-num) {
  min-width: 0;
  overflow-wrap: break-word;
}

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
  background: color-mix(in srgb, var(--color-card) 90%, transparent);
  color: var(--color-foreground);
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
  min-width: 0;
}
.ls3d-legend span {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}
.ls3d-legend strong {
  color: var(--color-foreground);
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
    gap: 10px 12px;
    padding: 12px;
  }
  .ls3d-legend strong {
    grid-column: 1 / -1;
    text-align: left;
  }
}

@media (max-width: 600px) {
  .step {
    gap: 8px;
    padding: 8px 10px;
  }
  .step-num {
    min-width: 24px; height: 24px;
    font-size: 12px;
  }
}
</style>
