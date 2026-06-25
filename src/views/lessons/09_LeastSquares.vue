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
        <svg ref="svg1" viewBox="0 0 520 400" class="responsive-svg">
          <defs>
            <marker id="arr-b" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0,8 3,0 6" fill="#2563eb"/>
            </marker>
            <marker id="arr-p" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0,8 3,0 6" fill="#ea580c"/>
            </marker>
            <marker id="arr-r" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0,8 3,0 6" fill="#dc2626"/>
            </marker>
          </defs>

          <!-- 3D-like plane (parallelogram) R(A) -->
          <polygon :points="planePoints" fill="#fed7aa" opacity="0.35" stroke="#ea580c" stroke-width="1.5"/>
          <text :x="planeLabels[0]" :y="planeLabels[1]" fill="#ea580c" font-size="13" font-weight="700">R(A)</text>

          <!-- Coordinate axes (isometric-ish) -->
          <line x1="60" y1="350" x2="480" y2="350" stroke="#94a3b8" stroke-width="1"/>
          <line x1="60" y1="350" x2="140" y2="120" stroke="#94a3b8" stroke-width="1"/>
          <line x1="60" y1="350" x2="280" y2="380" stroke="#94a3b8" stroke-width="1"/>
          <text x="485" y="355" font-size="11" fill="#94a3b8">x₁</text>
          <text x="130" y="115" font-size="11" fill="#94a3b8">x₂</text>
          <text x="285" y="395" font-size="11" fill="#94a3b8">x₃</text>
          <circle cx="60" cy="350" r="3" fill="#334155"/>
          <text x="42" y="365" font-size="11" fill="#334155">O</text>

          <!-- Vector b (blue, animated) -->
          <line x1="60" y1="350" :x2="60 + bx" :y2="350 - by"
                stroke="#2563eb" stroke-width="2.5" marker-end="url(#arr-b)"/>
          <text :x="60 + bx + 5" :y="350 - by - 5" fill="#2563eb" font-size="13" font-weight="700">b</text>

          <!-- Projection Pb (orange) -->
          <line v-if="lsProg > 0.1" x1="60" y1="350" :x2="60 + pbx" :y2="350 - pby"
                stroke="#ea580c" stroke-width="3" :opacity="lsProg" marker-end="url(#arr-p)"/>
          <text v-if="lsProg > 0.5" :x="60 + pbx + 5" :y="350 - pby - 5" fill="#ea580c" font-size="12" font-weight="600">Pb=Ax*</text>

          <!-- Residual r = b - Pb (red, perpendicular) -->
          <line v-if="lsProg > 0.5" :x1="60 + pbx" :y1="350 - pby" :x2="60 + bx" :y2="350 - by"
                stroke="#dc2626" stroke-width="2" :opacity="(lsProg-0.5)*2" stroke-dasharray="5,3" marker-end="url(#arr-r)"/>
          <text v-if="lsProg > 0.8" :x="60 + (bx+pbx)/2 + 8" :y="350 - (by+pby)/2" fill="#dc2626" font-size="12" font-weight="600">r=b-Pb</text>

          <!-- Right angle mark -->
          <g v-if="lsProg > 0.9">
            <rect :x="60+pbx-5" :y="350-pby-5" width="8" height="8" fill="none" stroke="#dc2626" stroke-width="1"
                  transform="rotate(0)"/>
          </g>

          <!-- Info box -->
          <g v-if="lsProg >= 1">
            <rect x="130" y="20" width="260" height="50" rx="10" fill="#fff" stroke="#e2e8f0"/>
            <text x="260" y="42" text-anchor="middle" font-size="13" font-weight="600" fill="#ea580c">r ⊥ R(A) ⟹ Aᵀr = 0</text>
            <text x="260" y="60" text-anchor="middle" font-size="12" fill="#64748b">残差垂直于列空间中所有向量</text>
          </g>
        </svg>
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
        <svg ref="svg2" viewBox="0 0 500 380" class="responsive-svg">
          <defs>
            <marker id="arr-a1" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
              <polygon points="0 0,7 2.5,0 5" fill="#0d9488"/>
            </marker>
            <marker id="arr-a2" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
              <polygon points="0 0,7 2.5,0 5" fill="#14b8a6"/>
            </marker>
          </defs>
          <!-- R(A) plane -->
          <polygon points="80,300 420,260 440,120 100,100" fill="#ccfbf1" opacity="0.4" stroke="#0d9488" stroke-width="1.5"/>
          <text x="430" y="115" fill="#0d9488" font-size="12" font-weight="600">R(A) = span{a₁,a₂}</text>

          <!-- Origin -->
          <circle cx="150" cy="250" r="3" fill="#334155"/>
          <text x="135" y="270" font-size="11" fill="#334155">O</text>

          <!-- a1 vector -->
          <line x1="150" y1="250" :x2="150 + a1x" :y2="250 - a1y" stroke="#0d9488" stroke-width="2.5" marker-end="url(#arr-a1)"/>
          <text :x="150 + a1x + 5" :y="250 - a1y" fill="#0d9488" font-size="13" font-weight="700">a₁</text>

          <!-- a2 vector -->
          <line x1="150" y1="250" :x2="150 + a2x" :y2="250 - a2y" stroke="#14b8a6" stroke-width="2.5" marker-end="url(#arr-a2)"/>
          <text :x="150 + a2x - 15" :y="250 - a2y - 8" fill="#14b8a6" font-size="13" font-weight="700">a₂</text>

          <!-- Pb point on plane -->
          <circle v-if="orthoProg > 0.3" :cx="150 + p2x" :cy="250 - p2y" r="4" fill="#ea580c"/>
          <line v-if="orthoProg > 0.3" x1="150" y1="250" :x2="150 + p2x" :y2="250 - p2y" stroke="#ea580c" stroke-width="2"/>
          <text v-if="orthoProg > 0.5" :x="150 + p2x + 5" :y="250 - p2y - 5" fill="#ea580c" font-size="11">Ax*</text>

          <!-- b vector -->
          <line v-if="orthoProg > 0.1" x1="150" y1="250" :x2="150 + b2x" :y2="250 - b2y" stroke="#2563eb" stroke-width="2.5"/>
          <polygon :points="ah(150+b2x, 250-b2y, Math.atan2(-b2y, b2x), '#2563eb')" fill="#2563eb"/>
          <text :x="150 + b2x + 5" :y="250 - b2y" fill="#2563eb" font-size="13" font-weight="700">b</text>

          <!-- Residual r (perpendicular to plane) -->
          <line v-if="orthoProg > 0.5" :x1="150 + p2x" :y1="250 - p2y" :x2="150 + b2x" :y2="250 - b2y"
                stroke="#dc2626" stroke-width="2.5" stroke-dasharray="5,3"/>
          <polygon v-if="orthoProg > 0.7" :points="ah(150+b2x, 250-b2y, Math.atan2(-(b2y-p2y), b2x-p2x), '#dc2626')" fill="#dc2626"/>
          <text v-if="orthoProg > 0.7" :x="150 + (b2x+p2x)/2 + 10" :y="250 - (b2y+p2y)/2" fill="#dc2626" font-size="12" font-weight="600">r</text>

          <!-- Right angle with a1 -->
          <g v-if="orthoProg > 0.9">
            <rect x="150" :y="250 - 12" width="12" height="12" fill="none" stroke="#dc2626" stroke-width="1" opacity="0.7"
                  transform="skewX(-15)"/>
            <text x="100" y="100" font-size="12" fill="#dc2626" font-weight="600">a₁ᵀr = 0 ✓</text>
            <text x="100" y="120" font-size="12" fill="#dc2626" font-weight="600">a₂ᵀr = 0 ✓</text>
            <text x="100" y="140" font-size="12" fill="#dc2626" font-weight="600">Aᵀr = 0 ⟹ AᵀAx*=Aᵀb</text>
          </g>
        </svg>
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
          <polygon v-if="showL1" points="350,200 250,100 150,200 250,300"
                   fill="#ec4899" :opacity="ballProg*0.2" stroke="#ec4899" stroke-width="2"/>
          <text v-if="showL1 && ballProg>0.5" x="60" y="120" fill="#ec4899" font-size="13" font-weight="700">‖x‖₁=1</text>

          <!-- Unit ball L2 (circle) -->
          <circle v-if="showL2" cx="250" cy="200" :r="100*ballProg"
                  fill="#7c3aed" :opacity="ballProg*0.15" stroke="#7c3aed" stroke-width="2"/>
          <text v-if="showL2 && ballProg>0.5" x="400" y="140" fill="#7c3aed" font-size="13" font-weight="700">‖x‖₂=1</text>

          <!-- Unit ball Linf (square) -->
          <rect v-if="showLinf" :x="250-100*ballProg" :y="200-100*ballProg" :width="200*ballProg" :height="200*ballProg"
                fill="#ea580c" :opacity="ballProg*0.12" stroke="#ea580c" stroke-width="2"/>
          <text v-if="showLinf && ballProg>0.5" x="360" y="95" fill="#ea580c" font-size="13" font-weight="700">‖x‖∞=1</text>

          <!-- Rotating vector on unit ball -->
          <g v-if="ballProg >= 1">
            <line x1="250" y1="200" :x2="250 + rvx" :y2="200 - rvy"
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

      <Steps :steps="[
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
      <WeekQuizBank :quizzes="quizzes" weekLabel="第3周" />
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
import { quizBank } from '../../data/quizBank'
import { useKatex } from '../../composables/useKatex'
import { ref, computed, onUnmounted } from 'vue'

const quizzes = quizBank[9]

const renderTrigger = ref(0)
const { renderMath } = useKatex(renderTrigger)

// ====== Animation 1: 3D projection to plane ======
const playing1 = ref(false)
let rafId1 = null, t1 = 0
const lsProg = ref(0)
const bx = ref(200), by = ref(220)
const pbx = computed(() => 180 * lsProg.value)
const pby = computed(() => 120 * lsProg.value)
const planePoints = '80,350 420,310 440,170 100,150'
const planeLabels = [420, 165]

const animate1 = () => {
  t1 += 0.012
  lsProg.value = Math.min(easeOutCubic(t1), 1)
  const ang = t1 * 0.3
  bx.value = 200 + 30 * Math.sin(ang)
  by.value = 220 + 20 * Math.cos(ang * 0.7)
  rafId1 = requestAnimationFrame(animate1)
}
const play1 = () => { if (!playing1.value) { playing1.value = true; t1 = 0; animate1() } }
const pause1 = () => { playing1.value = false; if (rafId1) cancelAnimationFrame(rafId1) }
const reset1 = () => { pause1(); t1 = 0; lsProg.value = 0; bx.value = 200; by.value = 220 }

// ====== Animation 2: Residual orthogonality ======
const playing2 = ref(false)
let rafId2 = null, t2 = 0
const orthoProg = ref(0)
const a1x = 200, a1y = 30
const a2x = 100, a2y = -10
const b2x = 220, b2y = 130
const p2x = computed(() => 190 * orthoProg.value)
const p2y = computed(() => 35 * orthoProg.value)

const animate2 = () => {
  t2 += 0.01
  orthoProg.value = Math.min(easeOutCubic(t2), 1)
  rafId2 = requestAnimationFrame(animate2)
}
const play2 = () => { if (!playing2.value) { playing2.value = true; t2 = 0; animate2() } }
const pause2 = () => { playing2.value = false; if (rafId2) cancelAnimationFrame(rafId2) }
const reset2 = () => { pause2(); t2 = 0; orthoProg.value = 0 }

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
function ah(x, y, angle, color) {
  const s = 8
  const a1 = angle + Math.PI - 0.4
  const a2 = angle + Math.PI + 0.4
  return `${x},${y} ${x+s*Math.cos(a1)},${y+s*Math.sin(a1)} ${x+s*Math.cos(a2)},${y+s*Math.sin(a2)}`
}

onUnmounted(() => {
  if (rafId1) cancelAnimationFrame(rafId1)
  if (rafId2) cancelAnimationFrame(rafId2)
  if (rafId3) cancelAnimationFrame(rafId3)
})
</script>

<style scoped>
.formula-inline { display: inline; }
.formula-block { display: block; text-align: center; }
h3 { color: #7c3aed; }
.responsive-svg { max-width: 100%; height: auto; display: block; }
:deep(.formula-block), :deep(.formula-inline) { overflow-x: auto; }
</style>
