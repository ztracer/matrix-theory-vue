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
        <svg viewBox="0 0 520 400" class="responsive-svg">
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
            <marker id="arr-a1" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
              <polygon points="0 0,7 2.5,0 5" fill="#0d9488"/>
            </marker>
            <marker id="arr-a2" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
              <polygon points="0 0,7 2.5,0 5" fill="#14b8a6"/>
            </marker>
          </defs>

          <!-- Phase 0: plane R(A) with O as vertex -->
          <polygon :points="planePoly" :fill="'#fed7aa'" :opacity="0.35 * op1(0)" stroke="#ea580c" stroke-width="1.5"/>
          <text :x="raLabel.x" :y="raLabel.y" :text-anchor="raLabel.anchor" fill="#ea580c" font-size="13" font-weight="700" :opacity="op1(0)">R(A)</text>
          <circle :cx="P.O.x" :cy="P.O.y" r="3" fill="#334155"/>
          <text :x="P.O.x - 14" :y="P.O.y + 16" font-size="11" fill="#334155">O</text>

          <!-- Phase 1: a1, a2 -->
          <g :opacity="op1(1)">
            <line :x1="P.O.x" :y1="P.O.y" :x2="P.a1.x" :y2="P.a1.y" stroke="#0d9488" stroke-width="2.5" marker-end="url(#arr-a1)"/>
            <text :x="P.a1.x + 6" :y="P.a1.y + 4" fill="#0d9488" font-size="13" font-weight="700">a₁</text>
            <line :x1="P.O.x" :y1="P.O.y" :x2="P.a2.x" :y2="P.a2.y" stroke="#14b8a6" stroke-width="2.5" marker-end="url(#arr-a2)"/>
            <text :x="P.a2.x - 18" :y="P.a2.y - 6" fill="#14b8a6" font-size="13" font-weight="700">a₂</text>
          </g>

          <!-- Phase 2: b above plane -->
          <g :opacity="op1(2)">
            <line :x1="P.O.x" :y1="P.O.y" :x2="P.b.x" :y2="P.b.y" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arr-b)"/>
            <text :x="P.b.x + 6" :y="P.b.y - 6" fill="#2563eb" font-size="13" font-weight="700">b</text>
          </g>

          <!-- Phase 3: Pb = Ax* -->
          <g :opacity="op1(3)">
            <line :x1="P.O.x" :y1="P.O.y" :x2="P.p.x" :y2="P.p.y" stroke="#ea580c" stroke-width="3" marker-end="url(#arr-p)"/>
            <circle :cx="P.p.x" :cy="P.p.y" r="4" fill="#ea580c"/>
            <text :x="P.p.x + 6" :y="P.p.y + 14" fill="#ea580c" font-size="12" font-weight="600">Pb = Ax*</text>
          </g>

          <!-- Phase 4: residual r = b-Pb with right-angle -->
          <g :opacity="op1(4)">
            <line :x1="P.p.x" :y1="P.p.y" :x2="P.b.x" :y2="P.b.y" stroke="#dc2626" stroke-width="2.2" stroke-dasharray="5,3" marker-end="url(#arr-r)"/>
            <text :x="(P.p.x + P.b.x) / 2 + 8" :y="(P.p.y + P.b.y) / 2" fill="#dc2626" font-size="12" font-weight="600">r = b − Pb</text>
            <polygon :points="raSquare" fill="none" stroke="#dc2626" stroke-width="1.2"/>
          </g>

          <!-- Phase 5: conclusion -->
          <g v-if="phase1 >= 5">
            <rect x="120" y="18" width="280" height="54" rx="10" fill="#fff" stroke="#e2e8f0"/>
            <text x="260" y="40" text-anchor="middle" font-size="13" font-weight="600" fill="#ea580c">r ⊥ R(A) ⟹ Aᵀr = 0</text>
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
        <svg viewBox="0 0 520 400" class="responsive-svg">
          <defs>
            <marker id="arr2-a1" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
              <polygon points="0 0,7 2.5,0 5" fill="#0d9488"/>
            </marker>
            <marker id="arr2-a2" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
              <polygon points="0 0,7 2.5,0 5" fill="#14b8a6"/>
            </marker>
            <marker id="arr2-p" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0,8 3,0 6" fill="#ea580c"/>
            </marker>
            <marker id="arr2-b" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0,8 3,0 6" fill="#2563eb"/>
            </marker>
            <marker id="arr2-r" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0,8 3,0 6" fill="#dc2626"/>
            </marker>
          </defs>

          <!-- Phase 0: plane -->
          <polygon :points="planePoly" :fill="'#ccfbf1'" :opacity="0.4 * op2(0)" stroke="#0d9488" stroke-width="1.5"/>
          <text :x="raLabel.x" :y="raLabel.y" :text-anchor="raLabel.anchor" fill="#0d9488" font-size="12" font-weight="600" :opacity="op2(0)">R(A) = span{a₁,a₂}</text>
          <circle :cx="P.O.x" :cy="P.O.y" r="3" fill="#334155"/>
          <text :x="P.O.x - 14" :y="P.O.y + 16" font-size="11" fill="#334155">O</text>

          <!-- Phase 1: a1, a2 -->
          <g :opacity="op2(1)">
            <line :x1="P.O.x" :y1="P.O.y" :x2="P.a1.x" :y2="P.a1.y" stroke="#0d9488" stroke-width="2.5" marker-end="url(#arr2-a1)"/>
            <text :x="P.a1.x + 6" :y="P.a1.y + 4" fill="#0d9488" font-size="13" font-weight="700">a₁</text>
            <line :x1="P.O.x" :y1="P.O.y" :x2="P.a2.x" :y2="P.a2.y" stroke="#14b8a6" stroke-width="2.5" marker-end="url(#arr2-a2)"/>
            <text :x="P.a2.x - 18" :y="P.a2.y - 6" fill="#14b8a6" font-size="13" font-weight="700">a₂</text>
          </g>

          <!-- Phase 2: b above plane -->
          <g :opacity="op2(2)">
            <line :x1="P.O.x" :y1="P.O.y" :x2="P.b.x" :y2="P.b.y" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arr2-b)"/>
            <text :x="P.b.x + 6" :y="P.b.y - 6" fill="#2563eb" font-size="13" font-weight="700">b</text>
          </g>

          <!-- Phase 3: Ax* in plane -->
          <g :opacity="op2(3)">
            <line :x1="P.O.x" :y1="P.O.y" :x2="P.p.x" :y2="P.p.y" stroke="#ea580c" stroke-width="2.2" marker-end="url(#arr2-p)"/>
            <circle :cx="P.p.x" :cy="P.p.y" r="4" fill="#ea580c"/>
            <text :x="P.p.x + 6" :y="P.p.y + 14" fill="#ea580c" font-size="11" font-weight="600">Ax*</text>
          </g>

          <!-- Phase 4: r perpendicular -->
          <g :opacity="op2(4)">
            <line :x1="P.p.x" :y1="P.p.y" :x2="P.b.x" :y2="P.b.y" stroke="#dc2626" stroke-width="2.5" stroke-dasharray="5,3" marker-end="url(#arr2-r)"/>
            <text :x="(P.p.x + P.b.x) / 2 + 8" :y="(P.p.y + P.b.y) / 2" fill="#dc2626" font-size="12" font-weight="600">r = b − Ax*</text>
          </g>

          <!-- Phase 5: right-angle marks + conclusion -->
          <g :opacity="op2(5)">
            <polygon :points="raA1Tip" fill="none" stroke="#dc2626" stroke-width="1.2"/>
            <polygon :points="raA2Tip" fill="none" stroke="#dc2626" stroke-width="1.2"/>
            <rect x="120" y="18" width="280" height="62" rx="10" fill="#fff" stroke="#e2e8f0"/>
            <text x="260" y="38" text-anchor="middle" font-size="13" font-weight="600" fill="#dc2626">a₁ᵀr = 0 ✓   a₂ᵀr = 0 ✓</text>
            <text x="260" y="56" text-anchor="middle" font-size="12" fill="#64748b">r ⊥ R(A) ⟹ Aᵀr = 0</text>
            <text x="260" y="72" text-anchor="middle" font-size="12" fill="#64748b">⟹ AᵀAx* = Aᵀb（正规方程）</text>
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
import { ref, computed, onUnmounted } from 'vue'

const quizzes = (quizBank[9] || []).map(q => ({ ...q, lessonNum: '09', lessonTitle: '最小二乘与范数' }))
const hwQuizzes = computed(() => (homeworkBank[9] || []).map(q => ({ ...q })))

const renderTrigger = ref(0)
const { renderMath } = useKatex(renderTrigger)

// ====== Vector math library ======
function vecAdd(a, b) { return a.map((v, i) => v + b[i]) }
function vecSub(a, b) { return a.map((v, i) => v - b[i]) }
function vecScale(a, s) { return a.map(v => v * s) }
function vecDot(a, b) { return a.reduce((s, v, i) => s + v * b[i], 0) }
function vecCross(a, b) {
  return [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]]
}
function vecNorm(a) { return Math.sqrt(vecDot(a, a)) }

// ====== 3D → 2D isometric projection ======
const ISO = { ex: [22, -22, 0], ey: [-9, -9, -26], ox: 90, oy: 330 }
function project2D(v) {
  return {
    x: ISO.ox + v[0]*ISO.ex[0] + v[1]*ISO.ex[1] + v[2]*ISO.ex[2],
    y: ISO.oy + v[0]*ISO.ey[0] + v[1]*ISO.ey[1] + v[2]*ISO.ey[2]
  }
}

// ====== Shared geometry (computed once, never mutated) ======
const GEOM = (() => {
  const a1 = [2.2, 0.2, 0.0]
  const a2 = [0.6, 2.0, 0.0]
  const n  = vecCross(a1, a2)
  const p  = vecAdd(vecScale(a1, 0.9), vecScale(a2, 0.7))
  const r  = vecScale(n, 0.045)
  const b  = vecAdd(p, r)
  const raSize = 0.35
  const inPlaneDir = vecScale(a1, 1 / vecNorm(a1))
  const upDir = vecScale(n, 1 / vecNorm(n))
  const raBase = p
  const raP1 = vecAdd(raBase, vecScale(inPlaneDir, raSize))
  const raP2 = vecAdd(raP1, vecScale(upDir, raSize))
  const raP3 = vecAdd(raBase, vecScale(upDir, raSize))
  return { a1, a2, n, p, r, b, raBase, raP1, raP2, raP3 }
})()

// ====== Project all points once ======
const P = {
  O: project2D([0,0,0]), a1: project2D(GEOM.a1), a2: project2D(GEOM.a2),
  a1a2: project2D(vecAdd(GEOM.a1, GEOM.a2)),
  p: project2D(GEOM.p), b: project2D(GEOM.b),
  raBase: project2D(GEOM.raBase), raP1: project2D(GEOM.raP1),
  raP2: project2D(GEOM.raP2), raP3: project2D(GEOM.raP3)
}
const planePoly = `${P.O.x},${P.O.y} ${P.a1.x},${P.a1.y} ${P.a1a2.x},${P.a1a2.y} ${P.a2.x},${P.a2.y}`
const raLabel = { x: P.a1a2.x, y: P.a1a2.y - 10, anchor: 'end' }
const raSquare = `${P.raBase.x},${P.raBase.y} ${P.raP1.x},${P.raP1.y} ${P.raP2.x},${P.raP2.y} ${P.raP3.x},${P.raP3.y}`

// ====== Animation 1: b → plane projection ======
const playing1 = ref(false)
let rafId1 = null, t1 = 0
const phase1 = ref(0)
const op1 = (start) => Math.min(1, Math.max(0, phase1.value - start))
const PHASE1_DUR = [0.5, 0.9, 1.3, 1.7, 2.1, 2.5]
function phaseFromT(t, cuts) {
  for (let i = 0; i < cuts.length; i++) if (t < cuts[i]) return i
  return cuts.length
}
const animate1 = () => {
  t1 += 1/60
  const top = PHASE1_DUR[PHASE1_DUR.length-1]
  const eased = easeOutCubic(Math.min(t1/top, 1))
  phase1.value = phaseFromT(eased * top, PHASE1_DUR)
  if (t1 >= top) { phase1.value = PHASE1_DUR.length; playing1.value = false; return }
  rafId1 = requestAnimationFrame(animate1)
}
const play1 = () => { if (!playing1.value) { playing1.value = true; t1 = 0; phase1.value = 0; animate1() } }
const pause1 = () => { playing1.value = false; if (rafId1) cancelAnimationFrame(rafId1) }
const reset1 = () => { pause1(); t1 = 0; phase1.value = 0 }

// ====== Animation 2: residual orthogonality ======
const playing2 = ref(false)
let rafId2 = null, t2 = 0
const phase2 = ref(0)
const op2 = (start) => Math.min(1, Math.max(0, phase2.value - start))
const PHASE2_DUR = [0.5, 0.9, 1.3, 1.7, 2.1, 2.5]

// Right-angle marks at a1/a2 tips
const ra2Size = 0.3
const _dA1 = vecScale(GEOM.a1, 1/vecNorm(GEOM.a1))
const _dA2 = vecScale(GEOM.a2, 1/vecNorm(GEOM.a2))
const _dN  = vecScale(GEOM.n, 1/vecNorm(GEOM.n))
function rightAngleAt(base, dirA, dirB) {
  const a = vecAdd(base, vecScale(dirA, ra2Size))
  const c = vecAdd(base, vecScale(dirB, ra2Size))
  const b2 = vecAdd(a, vecScale(dirB, ra2Size))
  const pa = project2D(a), pb = project2D(b2), pc = project2D(c), p0 = project2D(base)
  return `${p0.x},${p0.y} ${pa.x},${pa.y} ${pb.x},${pb.y} ${pc.x},${pc.y}`
}
const raA1Tip = rightAngleAt(GEOM.a1, _dA1, _dN)
const raA2Tip = rightAngleAt(GEOM.a2, _dA2, _dN)

const animate2 = () => {
  t2 += 1/60
  const top = PHASE2_DUR[PHASE2_DUR.length-1]
  const eased = easeOutCubic(Math.min(t2/top, 1))
  phase2.value = phaseFromT(eased * top, PHASE2_DUR)
  if (t2 >= top) { phase2.value = PHASE2_DUR.length; playing2.value = false; return }
  rafId2 = requestAnimationFrame(animate2)
}
const play2 = () => { if (!playing2.value) { playing2.value = true; t2 = 0; phase2.value = 0; animate2() } }
const pause2 = () => { playing2.value = false; if (rafId2) cancelAnimationFrame(rafId2) }
const reset2 = () => { pause2(); t2 = 0; phase2.value = 0 }

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
