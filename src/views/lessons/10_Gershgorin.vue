<template>
  <LessonLayout :lesson-id="10" title="特征值估计与极大极小原理" subtitle="Gershgorin Circles & Min-Max Principle">
    <!-- Section 1: 盖尔圆盘定理 -->
    <Section title="盖尔圆盘定理" :num="1">
      <p>
        直接求矩阵特征值通常需要解特征方程，对于高阶矩阵计算量巨大。
        <strong>盖尔圆盘定理</strong>提供了一种在复平面上快速估计特征值所在区域的几何方法。
      </p>

      <Theorem title="盖尔圆盘（Gershgorin Discs）" type="definition" icon="⭕">
        <p>设<span class="formula-inline">A = (a_{ij}) \in \mathbb{C}^{n \times n}</span>，定义第<span class="formula-inline">i</span>个盖尔圆盘：</p>
        <Formula>G_i = \left\{ z \in \mathbb{C} : |z - a_{ii}| \leq R_i \right\}, \quad R_i = \sum_{j \neq i} |a_{ij}|</Formula>
        <p>其中<span class="formula-inline">a_{ii}</span>是圆心（第i个对角元），<span class="formula-inline">R_i</span>是半径（第i行非对角元的绝对值之和，即"去心行和"）。</p>
      </Theorem>

      <Theorem title="盖尔圆盘第一定理" type="theorem" icon="🎯">
        <p>矩阵<span class="formula-inline">A</span>的<strong>所有特征值</strong>都落在<span class="formula-inline">n</span>个盖尔圆盘的并集中：</p>
        <Formula>\lambda(A) \subseteq \bigcup_{i=1}^n G_i</Formula>
        <p><strong>证明思路</strong>：设<span class="formula-inline">Ax = \lambda x</span>，<span class="formula-inline">x \neq 0</span>，取<span class="formula-inline">|x_k| = \|x\|_\infty = \max|x_i|</span>，由第k个方程：</p>
        <Formula>(\lambda - a_{kk})x_k = \sum_{j \neq k} a_{kj}x_j \implies |\lambda - a_{kk}| \leq \sum_{j \neq k} |a_{kj}| \cdot \frac{|x_j|}{|x_k|} \leq R_k</Formula>
        <p>即<span class="formula-inline">\lambda \in G_k</span>。</p>
      </Theorem>

      <Theorem title="盖尔圆盘第二定理（隔离定理）" type="theorem" icon="🔍">
        <p>若<span class="formula-inline">n</span>个盖尔圆盘中有<span class="formula-inline">k</span>个圆盘的并集<span class="formula-inline">S</span>与其余<span class="formula-inline">n-k</span>个圆盘不交，则<span class="formula-inline">S</span>中恰含<span class="formula-inline">A</span>的<span class="formula-inline">k</span>个特征值（计代数重数）。</p>
        <p><strong>推论</strong>：若所有盖尔圆盘互不相交，则每个圆盘恰含一个特征值，且</p>
        <ul>
          <li>若<span class="formula-inline">A</span>是实矩阵，孤立圆盘与实轴相交时，其中的特征值必为实数</li>
          <li>实矩阵的复特征值必共轭成对出现于关于实轴对称的圆盘交集中</li>
        </ul>
      </Theorem>
    </Section>

    <!-- Animation 1: Gershgorin circles for preset matrices (几何演示 - 保留interactive) -->
    <Section title="动画：盖尔圆盘逐行绘制" :num="2">
      <AnimationBox
        title="复平面上的盖尔圆盘（3个预设三阶矩阵）"
        :playing="playing1"
        description="切换预设矩阵，观察盖尔圆盘的绘制过程。红色点标出实际特征值位置，验证它们落在圆盘并集内。"
        @play="play1"
        @pause="pause1"
        @reset="reset1"
      >
        <template #controls>
          <label style="font-size:12px;display:flex;align-items:center;gap:4px;">
            矩阵：
            <select v-model="matIdx" style="padding:2px 6px;border-radius:4px;border:1px solid #e2e8f0;font-size:12px;">
              <option :value="0">A₁（对角占优）</option>
              <option :value="1">A₂（圆盘相交）</option>
              <option :value="2">A₃（复特征值）</option>
            </select>
          </label>
        </template>
        <svg ref="svg1" viewBox="0 0 560 420" class="responsive-svg">
          <defs>
            <marker id="arr-re" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
              <polygon points="0 0,7 2.5,0 5" fill="#334155"/>
            </marker>
            <marker id="arr-im" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
              <polygon points="0 0,7 2.5,0 5" fill="#334155"/>
            </marker>
          </defs>
          <rect x="0" y="0" width="560" height="420" fill="#fafbff"/>
          <!-- Grid -->
          <g opacity="0.15">
            <line v-for="i in 28" :key="'gv'+i" :x1="i*20" y1="0" :x2="i*20" y2="420" stroke="#94a3b8" stroke-width="0.5"/>
            <line v-for="i in 21" :key="'gh'+i" x1="0" :y1="i*20" :x2="560" :y2="i*20" stroke="#94a3b8" stroke-width="0.5"/>
          </g>
          <!-- Axes -->
          <line x1="280" y1="10" x2="280" y2="410" stroke="#334155" stroke-width="1.2" marker-end="url(#arr-im)"/>
          <line x1="10" y1="210" x2="550" y2="210" stroke="#334155" stroke-width="1.2" marker-end="url(#arr-re)"/>
          <text x="540" y="225" font-size="12" fill="#334155">Re</text>
          <text x="288" y="22" font-size="12" fill="#334155">Im</text>
          <text x="285" y="225" font-size="10" fill="#94a3b8">O</text>

          <!-- Gershgorin discs -->
          <g v-for="(d, i) in currentDiscs" :key="i">
            <ellipse v-if="drawProgress[i] > 0"
                     :cx="toScreenX(d.center[0])" :cy="toScreenY(d.center[1])"
                     :rx="d.radius * gScale * drawProgress[i]"
                     :ry="d.radius * gScale * drawProgress[i]"
                     :fill="discColors[i]" :fill-opacity="0.15"
                     :stroke="discColors[i]" :stroke-width="2"/>
            <circle v-if="drawProgress[i] > 0.3"
                    :cx="toScreenX(d.center[0])" :cy="toScreenY(d.center[1])"
                    r="4" :fill="discColors[i]"/>
            <text v-if="drawProgress[i] > 0.5"
                  :x="toScreenX(d.center[0]) + 8 + i * 6" :y="toScreenY(d.center[1]) - 8"
                  :fill="discColors[i]" font-size="11" font-weight="600">
              a{{ i+1 }}{{ i+1 }}={{ formatComplex(d.center) }}
            </text>
            <text v-if="drawProgress[i] > 0.8"
                  :x="toScreenX(d.center[0]) + 8 + i * 6" :y="toScreenY(d.center[1]) + 14"
                  :fill="discColors[i]" font-size="10">
              R{{ i+1 }}={{ d.radius }}
            </text>
          </g>

          <!-- Actual eigenvalues -->
          <g v-if="eigenVisible">
            <circle v-for="(ev, i) in currentEigenvalues" :key="'e'+i"
                    :cx="toScreenX(ev[0])" :cy="toScreenY(ev[1])"
                    r="6" fill="#dc2626" stroke="#fff" stroke-width="2"/>
            <text v-for="(ev, i) in currentEigenvalues" :key="'et'+i"
                  :x="toScreenX(ev[0]) + 14" :y="toScreenY(ev[1]) - 22"
                  fill="#dc2626" font-size="11" font-weight="700">
              λ{{ i+1 }}={{ formatComplex(ev) }}
            </text>
          </g>

          <!-- Matrix display -->
          <g>
            <rect x="10" y="10" width="210" height="85" rx="8" fill="#fff" stroke="#e2e8f0"/>
            <text x="20" y="30" font-size="11" fill="#64748b" font-weight="600">当前矩阵 A{{ matIdx+1 }} =</text>
            <text x="20" y="50" font-size="12" font-family="monospace" fill="#334155">{{ currentMatrixText[0] }}</text>
            <text x="20" y="66" font-size="12" font-family="monospace" fill="#334155">{{ currentMatrixText[1] }}</text>
            <text x="20" y="82" font-size="12" font-family="monospace" fill="#334155">{{ currentMatrixText[2] }}</text>
          </g>
        </svg>
      </AnimationBox>
    </Section>

    <!-- Section 2: 隔离定理应用 -->
    <Section title="隔离定理的应用" :num="3">
      <Theorem title="利用对角相似缩放缩小圆盘" type="tip" icon="💡">
        <p>
          对任意对角矩阵<span class="formula-inline">D = \operatorname{diag}(d_1, \ldots, d_n)</span>，<span class="formula-inline">d_i > 0</span>，
          矩阵<span class="formula-inline">D^{-1}AD</span>与<span class="formula-inline">A</span>有相同特征值，而其盖尔圆盘为：
        </p>
        <Formula>G_i' = \left\{ z : |z - a_{ii}| \leq \frac{1}{d_i}\sum_{j \neq i} |a_{ij}| d_j \right\}</Formula>
        <p>适当选取<span class="formula-inline">d_i</span>可以缩小某些圆盘半径，实现特征值隔离！</p>
      </Theorem>

      <Theorem title="严格对角占优矩阵的可逆性" type="theorem" icon="✅">
        <p>若<span class="formula-inline">A</span>严格对角占优（<span class="formula-inline">|a_{ii}| > R_i</span>对所有i），则<span class="formula-inline">A</span>可逆。</p>
        <p>证明：若<span class="formula-inline">A</span>不可逆，则<span class="formula-inline">0</span>是特征值，由盖尔定理，存在i使得<span class="formula-inline">|0 - a_{ii}| \leq R_i</span>，即<span class="formula-inline">|a_{ii}| \leq R_i</span>，矛盾。</p>
      </Theorem>
    </Section>

    <!-- Animation 2: Isolation animation (几何演示 - 保留interactive) -->
    <Section title="动画：圆盘隔离与特征值计数" :num="4">
      <AnimationBox
        title="调节ε缩小圆盘半径观察隔离"
        :playing="playing2"
        description="拖动滑块改变缩放因子ε，圆盘半径被缩放。当连通分支分离时，每个分支内的特征值个数等于该分支包含的圆盘数。"
        @play="play2"
        @pause="pause2"
        @reset="reset2"
      >
        <template #controls>
          <label style="font-size:12px;display:flex;align-items:center;gap:6px;">
            缩放ε：<input type="range" v-model.number="isoEpsilon" min="0.2" max="1.5" step="0.05" style="width:120px;">
            {{ isoEpsilon.toFixed(2) }}
          </label>
        </template>
        <svg ref="svg2" viewBox="0 0 520 380" class="responsive-svg">
          <rect x="0" y="0" width="520" height="380" fill="#fafbff"/>
          <g opacity="0.12">
            <line v-for="i in 26" :key="'g2v'+i" :x1="i*20" y1="0" :x2="i*20" y2="380" stroke="#94a3b8" stroke-width="0.5"/>
            <line v-for="i in 19" :key="'g2h'+i" x1="0" :y1="i*20" :x2="520" :y2="i*20" stroke="#94a3b8" stroke-width="0.5"/>
          </g>
          <line x1="10" y1="190" x2="510" y2="190" stroke="#334155" stroke-width="1.2"/>
          <text x="505" y="205" font-size="11" fill="#334155">Re</text>

          <!-- Circle 1: center (10,0), radius=1*ε -->
          <ellipse :cx="isoCx(10)" :cy="isoCy(0)" :rx="1*isoEpsilon*isoScale" :ry="1*isoEpsilon*isoScale"
                   fill="#ea580c" fill-opacity="0.15" stroke="#ea580c" stroke-width="2"/>
          <circle :cx="isoCx(10)" :cy="isoCy(0)" r="4" fill="#ea580c"/>
          <text :x="isoCx(10)-10" :y="isoCy(0)-12" fill="#ea580c" font-size="11" font-weight="600">G₁(10, ε)</text>

          <!-- Circle 2: center (2,0), radius=0.8*ε -->
          <ellipse :cx="isoCx(2)" :cy="isoCy(0)" :rx="0.8*isoEpsilon*isoScale" :ry="0.8*isoEpsilon*isoScale"
                   fill="#7c3aed" fill-opacity="0.15" stroke="#7c3aed" stroke-width="2"/>
          <circle :cx="isoCx(2)" :cy="isoCy(0)" r="4" fill="#7c3aed"/>
          <text :x="isoCx(2)-5" :y="isoCy(0)-12" fill="#7c3aed" font-size="11" font-weight="600">G₂(2, 0.8ε)</text>

          <!-- Circle 3: center (-1,0), radius=1.2*ε -->
          <ellipse :cx="isoCx(-1)" :cy="isoCy(0)" :rx="1.2*isoEpsilon*isoScale" :ry="1.2*isoEpsilon*isoScale"
                   fill="#0d9488" fill-opacity="0.15" stroke="#0d9488" stroke-width="2"/>
          <circle :cx="isoCx(-1)" :cy="isoCy(0)" r="4" fill="#0d9488"/>
          <text :x="isoCx(-1)-5" :y="isoCy(0)-12" fill="#0d9488" font-size="11" font-weight="600">G₃(-1, 1.2ε)</text>

          <!-- Eigenvalues -->
          <circle :cx="isoCx(10)" :cy="isoCy(0)" r="5" fill="#dc2626" stroke="#fff" stroke-width="1.5"/>
          <circle :cx="isoCx(2)" :cy="isoCy(0)" r="5" fill="#dc2626" stroke="#fff" stroke-width="1.5"/>
          <circle :cx="isoCx(-1)" :cy="isoCy(0)" r="5" fill="#dc2626" stroke="#fff" stroke-width="1.5"/>

          <g>
            <rect x="10" y="10" width="280" height="50" rx="8" fill="#fff" stroke="#e2e8f0"/>
            <text x="20" y="30" font-size="12" fill="#334155" font-weight="600">{{ isoStatus }}</text>
            <text x="20" y="48" font-size="11" fill="#64748b">{{ isoHint }}</text>
          </g>
        </svg>
      </AnimationBox>
    </Section>

    <!-- Section 3: Rayleigh商 -->
    <Section title="Rayleigh商与极大极小原理" :num="5">
      <Theorem title="Rayleigh商" type="definition" icon="📐">
        <p>设<span class="formula-inline">A = A^{\mathsf{T}} \in \mathbb{R}^{n \times n}</span>是实对称矩阵，定义Rayleigh商：</p>
        <Formula>R(x) = \frac{x^{\mathsf{T}}Ax}{x^{\mathsf{T}}x}, \quad x \neq 0</Formula>
        <p>Rayleigh商将向量<span class="formula-inline">x</span>映射到一个实数，具有以下基本性质：</p>
        <ul>
          <li><span class="formula-inline">R(x)</span>是零次齐次函数：<span class="formula-inline">R(kx) = R(x)</span>（<span class="formula-inline">k \neq 0</span>）</li>
          <li>若<span class="formula-inline">x</span>是特征向量（<span class="formula-inline">Ax = \lambda x</span>），则<span class="formula-inline">R(x) = \lambda</span></li>
          <li><span class="formula-inline">\lambda_{\min}(A) \leq R(x) \leq \lambda_{\max}(A)</span></li>
        </ul>
      </Theorem>

      <Theorem title="Courant-Fischer极大极小原理" type="theorem" icon="⚖️">
        <p>设<span class="formula-inline">A</span>为<span class="formula-inline">n</span>阶实对称矩阵，特征值<span class="formula-inline">\lambda_1 \leq \lambda_2 \leq \cdots \leq \lambda_n</span>，则：</p>
        <Formula>\lambda_k = \min_{\dim V = k} \max_{x \in V, x \neq 0} R(x) = \max_{\dim V = n-k+1} \min_{x \in V, x \neq 0} R(x)</Formula>
        <p>特别地：<span class="formula-inline">\lambda_{\max} = \max_{x \neq 0} R(x)</span>，<span class="formula-inline">\lambda_{\min} = \min_{x \neq 0} R(x)</span>。</p>
      </Theorem>
    </Section>

    <!-- Animation 3: Rayleigh quotient (几何演示 - 保留interactive) -->
    <Section title="动画：Rayleigh商在单位圆上的极值" :num="6">
      <AnimationBox
        title="2×2对称矩阵Rayleigh商可视化"
        :playing="playing3"
        description="向量x在单位圆上旋转，实时计算Rayleigh商R(θ)=xᵀAx/xᵀx并绘制曲线。曲线的极大/极小值点对应特征值。"
        @play="play3"
        @pause="pause3"
        @reset="reset3"
      >
        <svg ref="svg3" viewBox="0 0 580 380" class="responsive-svg">
          <!-- Left: unit circle -->
          <rect x="0" y="0" width="280" height="380" fill="#fafbff"/>
          <g transform="translate(140,190)">
            <g opacity="0.1">
              <line v-for="i in 14" :key="'cgh'+i" x1="-130" :y1="i*20-130" x2="130" :y2="i*20-130" stroke="#94a3b8" stroke-width="0.5"/>
              <line v-for="i in 14" :key="'cgv'+i" :x1="i*20-130" y1="-130" :x2="i*20-130" y2="130" stroke="#94a3b8" stroke-width="0.5"/>
            </g>
            <line x1="-125" y1="0" x2="125" y2="0" stroke="#334155" stroke-width="1"/>
            <line x1="0" y1="-125" x2="0" y2="125" stroke="#334155" stroke-width="1"/>
            <circle cx="0" cy="0" r="100" fill="none" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4,3"/>
            <line x1="0" y1="0" :x2="rv3x" :y2="-rv3y" stroke="#2563eb" stroke-width="2.5"/>
            <circle :cx="rv3x" :cy="-rv3y" r="5" fill="#2563eb"/>
            <text :x="rv3x + 8" :y="-rv3y" fill="#2563eb" font-size="12" font-weight="600">x(θ)</text>
            <!-- Eigenvector directions -->
            <line v-if="rayProg > 0.5" x1="-70" :y1="70*eig1Dir" x2="70" :y2="-70*eig1Dir"
                  stroke="#10b981" stroke-width="1.5" stroke-dasharray="5,3"/>
            <line v-if="rayProg > 0.5" x1="-70" :y1="-70*eig2Dir" x2="70" :y2="70*eig2Dir"
                  stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5,3"/>
            <text v-if="rayProg > 0.7" x="-120" y="-80" fill="#f59e0b" font-size="10" font-weight="600">λ₂≈3.41</text>
            <text v-if="rayProg > 0.7" x="-120" y="95" fill="#10b981" font-size="10" font-weight="600">λ₁≈0.59</text>
          </g>
          <text x="140" y="25" text-anchor="middle" font-size="12" fill="#64748b">单位圆上的向量 x(θ)</text>
          <text x="140" y="370" text-anchor="middle" font-size="11" fill="#94a3b8">θ = {{ Math.round(rAngle*180/Math.PI) }}°</text>

          <!-- Right: R(θ) curve -->
          <rect x="290" y="0" width="290" height="380" fill="#fff" stroke="#e2e8f0"/>
          <g transform="translate(330,190)">
            <line x1="-30" y1="0" x2="250" y2="0" stroke="#334155" stroke-width="1"/>
            <line x1="0" y1="-120" x2="0" y2="120" stroke="#334155" stroke-width="1"/>
            <text x="245" y="15" font-size="10" fill="#334155">θ</text>
            <text x="-10" y="-115" font-size="10" fill="#334155">R</text>
            <line v-if="rayProg > 0.3" x1="-30" :y1="-eig2Screen" x2="240" :y2="-eig2Screen" stroke="#f59e0b" stroke-width="1" stroke-dasharray="3,3"/>
            <line v-if="rayProg > 0.3" x1="-30" :y1="-eig1Screen" x2="240" :y2="-eig1Screen" stroke="#10b981" stroke-width="1" stroke-dasharray="3,3"/>
            <text v-if="rayProg > 0.5" x="242" :y="-eig2Screen+4" font-size="9" fill="#f59e0b">λ₂</text>
            <text v-if="rayProg > 0.5" x="242" :y="-eig1Screen+4" font-size="9" fill="#10b981">λ₁</text>
            <polyline v-if="rayProg > 0.05" :points="rCurvePoints" fill="none" stroke="#7c3aed" stroke-width="2.5"/>
            <circle v-if="rayProg > 0.1" :cx="rCurX" :cy="rCurY" r="5" fill="#dc2626" stroke="#fff" stroke-width="2"/>
            <text v-if="rayProg > 0.3" :x="rCurX+8" :y="rCurY-8" font-size="11" fill="#dc2626" font-weight="600">
              R={{ rCurrent.toFixed(2) }}
            </text>
          </g>
          <text x="435" y="25" text-anchor="middle" font-size="12" fill="#64748b">Rayleigh商 R(θ) 曲线</text>
          <text x="320" y="370" font-size="10" fill="#94a3b8">A = [[3,1],[1,1]]</text>
        </svg>
      </AnimationBox>
    </Section>

    <!-- 真题例题 -->
    <Section title="真题例题" :num="7">
      <ExampleBox source="盖尔圆盘隔离真题" badge="📝 真题1">
        <template #problem>
          <p>用盖尔圆盘定理证明矩阵<span class="formula-inline">A = \begin{pmatrix} 10 & 1 & 1 \\ 1 & 2 & 0.5 \\ 1 & 0.5 & 1 \end{pmatrix}</span>可对角化，并估计特征值范围。</p>
        </template>
        <template #solution>
          <div class="step">
            <div class="step-num">1</div>
            <div>
              <p><strong>计算盖尔圆盘</strong>：</p>
              <Formula>G_1: |z - 10| \leq 1 + 1 = 2 \quad (\text{圆心}10,\text{半径}2 \Rightarrow [8,12])</Formula>
              <Formula>G_2: |z - 2| \leq 1 + 0.5 = 1.5 \quad (\text{圆心}2,\text{半径}1.5 \Rightarrow [0.5,3.5])</Formula>
              <Formula>G_3: |z - 1| \leq 1 + 0.5 = 1.5 \quad (\text{圆心}1,\text{半径}1.5 \Rightarrow [-0.5,2.5])</Formula>
            </div>
          </div>
          <div class="step">
            <div class="step-num">2</div>
            <div>
              <p><strong>分析圆盘连通性</strong>：<span class="formula-inline">G_1 = [8,12]</span>与<span class="formula-inline">G_2 \cup G_3 = [-0.5, 3.5]</span>完全分离！</p>
              <p>由隔离定理：<span class="formula-inline">G_1</span>中恰有1个特征值（实的，在[8,12]中）；<span class="formula-inline">G_2 \cup G_3</span>中恰有2个特征值。</p>
            </div>
          </div>
          <div class="step">
            <div class="step-num">3</div>
            <div>
              <p><strong>证明可对角化</strong>：A是<strong>实对称矩阵</strong>，实对称矩阵必正交相似于对角矩阵，因此A一定可对角化！三个特征值均为实数。</p>
            </div>
          </div>
        </template>
      </ExampleBox>

      <ExampleBox source="Rayleigh商证明题" badge="📝 真题2">
        <template #problem>
          <p>设A是实对称矩阵，证明Rayleigh商<span class="formula-inline">R(x) = \frac{x^{\mathsf{T}}Ax}{x^{\mathsf{T}}x}</span>的极值恰为A的特征值：<span class="formula-inline">\max_{x\neq 0}R(x)=\lambda_{\max}</span>，<span class="formula-inline">\min_{x\neq 0}R(x)=\lambda_{\min}</span>。</p>
        </template>
        <template #solution>
          <div class="step">
            <div class="step-num">1</div>
            <div>
              <p><strong>正交对角化</strong>：<span class="formula-inline">A = Q\Lambda Q^{\mathsf{T}}</span>，令<span class="formula-inline">y = Q^{\mathsf{T}}x</span>，则<span class="formula-inline">R(x) = \frac{y^{\mathsf{T}}\Lambda y}{y^{\mathsf{T}}y} = \frac{\sum \lambda_i y_i^2}{\sum y_i^2}</span>。</p>
            </div>
          </div>
          <div class="step">
            <div class="step-num">2</div>
            <div>
              <p><strong>上下界</strong>：<span class="formula-inline">\lambda_{\min}\sum y_i^2 \leq \sum \lambda_i y_i^2 \leq \lambda_{\max}\sum y_i^2</span>，故<span class="formula-inline">\lambda_{\min} \leq R(x) \leq \lambda_{\max}</span>。</p>
            </div>
          </div>
          <div class="step">
            <div class="step-num">3</div>
            <div>
              <p><strong>等号可达</strong>：<span class="formula-inline">x</span>为对应特征向量时取等号。</p>
            </div>
          </div>
        </template>
      </ExampleBox>

      <ExampleBox source="严格对角占优可逆性" badge="📝 真题3">
        <template #problem>
          <p>用盖尔圆盘定理证明：严格对角占优矩阵必可逆。并判断矩阵<span class="formula-inline">A = \begin{pmatrix} 5 & 1 & 1 \\ 1 & 4 & 1 \\ 1 & 1 & 3 \end{pmatrix}</span>是否可逆。</p>
        </template>
        <template #solution>
          <div class="step">
            <div class="step-num">1</div>
            <div>
              <p><strong>证明</strong>：若A不可逆，则<span class="formula-inline">0</span>是A的特征值。由盖尔圆盘第一定理，存在k使得<span class="formula-inline">|0 - a_{kk}| \leq R_k</span>，即<span class="formula-inline">|a_{kk}| \leq R_k</span>，与严格对角占优矛盾。故A可逆。</p>
            </div>
          </div>
          <div class="step">
            <div class="step-num">2</div>
            <div>
              <p><strong>应用到题目矩阵</strong>：<span class="formula-inline">|a_{11}|=5 > R_1=2</span>，<span class="formula-inline">|a_{22}|=4 > R_2=2</span>，<span class="formula-inline">|a_{33}|=3 > R_3=2</span>，严格对角占优，故可逆。</p>
              <p>盖尔圆盘：<span class="formula-inline">G_1:|z-5|\leq 2, G_2:|z-4|\leq 2, G_3:|z-3|\leq 2</span>，所有特征值在右半平面（实部>0）。</p>
            </div>
          </div>
        </template>
      </ExampleBox>

      <Steps :steps="[
        '盖尔圆盘：圆心<span class=&quot;formula-inline&quot;>a_{ii}</span>，半径<span class=&quot;formula-inline&quot;>R_i=\\sum_{j\\neq i}|a_{ij}|</span>（去心行和），特征值<span class=&quot;formula-inline&quot;>\\subseteq \\bigcup G_i</span>',
        '列盖尔圆盘：用<span class=&quot;formula-inline&quot;>A^{\\mathsf{T}}</span>（去心列和）得到另一组圆盘，取交集缩小范围',
        '隔离定理：k个不交圆盘的连通分支恰含k个特征值',
        '对角缩放<span class=&quot;formula-inline&quot;>D^{-1}AD</span>：调节<span class=&quot;formula-inline&quot;>d_i</span>缩放圆盘半径，实现隔离',
        '实对称矩阵：特征值全实，可对角化；Rayleigh商<span class=&quot;formula-inline&quot;>R(x)=x^{\\mathsf{T}}Ax/x^{\\mathsf{T}}x</span>',
        'Courant-Fischer：<span class=&quot;formula-inline&quot;>\\lambda_k = \\min_{\\dim V=k}\\max_{x\\in V} R(x)</span>，<span class=&quot;formula-inline&quot;>\\lambda_{\\max}=\\max R(x)</span>, <span class=&quot;formula-inline&quot;>\\lambda_{\\min}=\\min R(x)</span>'
      ]"/>
    </Section>

    <!-- WeekQuizBank -->
    <Section title="🗂️ 真题与习题汇总">
      <WeekQuizBank :quizzes="quizzes" weekLabel="第3周" />
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
import { ref, computed, onUnmounted } from 'vue'

const quizzes = (quizBank[10] || []).map(q => ({ ...q, lessonNum: '10', lessonTitle: '特征值估计与极大极小原理' }))
const hwQuizzes = computed(() => (homeworkBank[10] || []).map(q => ({ ...q })))

const renderTrigger = ref(0)
const { renderMath } = useKatex(renderTrigger)

const gScale = 30
const cx0 = 280, cy0 = 210
const toScreenX = (x) => cx0 + x * gScale
const toScreenY = (y) => cy0 - y * gScale
const formatComplex = (c) => {
  if (c[1] === 0) return c[0]
  const sign = c[1] > 0 ? '+' : ''
  return c[0] + sign + c[1] + 'i'
}

const matrices = [
  {
    discs: [{ center: [5, 0], radius: 0.8 }, { center: [3, 0], radius: 0.6 }, { center: [1, 0], radius: 0.4 }],
    eigenvalues: [[5.06, 0], [2.98, 0], [0.96, 0]],
    text: ['[5   0.5  -0.3]', '[0.2  3    0.4]', '[-0.1 0.3  1  ]']
  },
  {
    discs: [{ center: [2, 0], radius: 1.5 }, { center: [3, 0], radius: 2 }, { center: [1, 0], radius: 1.5 }],
    eigenvalues: [[4.2, 0], [1.8, 0], [0, 0]],
    text: ['[2  1  0.5]', '[1  3  1  ]', '[0.5 1  1  ]']
  },
  {
    discs: [{ center: [1, 0], radius: 2 }, { center: [1, 0], radius: 2 }, { center: [3, 0], radius: 0.8 }],
    eigenvalues: [[1, 2], [1, -2], [3, 0]],
    text: ['[1   -2  0]', '[2    1  0]', '[0.5 0.3 3]']
  }
]

const matIdx = ref(0)
const currentDiscs = computed(() => matrices[matIdx.value].discs)
const currentEigenvalues = computed(() => matrices[matIdx.value].eigenvalues)
const currentMatrixText = computed(() => matrices[matIdx.value].text)
const discColors = ['#ea580c', '#7c3aed', '#0d9488']

const playing1 = ref(false)
let rafId1 = null, t1 = 0
const drawProgress = ref([0, 0, 0])
const eigenVisible = ref(false)

const animate1 = () => {
  t1 += 0.015
  if (t1 < 1) drawProgress.value = [easeOutCubic(t1), 0, 0]
  else if (t1 < 2) drawProgress.value = [1, easeOutCubic(t1-1), 0]
  else if (t1 < 3) { drawProgress.value = [1, 1, easeOutCubic(t1-2)]; eigenVisible.value = false }
  else { drawProgress.value = [1, 1, 1]; eigenVisible.value = true }
  rafId1 = requestAnimationFrame(animate1)
}
const play1 = () => { if (!playing1.value) { playing1.value = true; t1 = 0; eigenVisible.value = false; animate1() } }
const pause1 = () => { playing1.value = false; if (rafId1) cancelAnimationFrame(rafId1) }
const reset1 = () => { pause1(); t1 = 0; drawProgress.value = [0,0,0]; eigenVisible.value = false }

const playing2 = ref(false)
const isoEpsilon = ref(1)
const isoScale = 25
const isoCx = (x) => 60 + (x + 3) * isoScale
const isoCy = (y) => 190 - y * isoScale
const isoStatus = computed(() => {
  if (isoEpsilon.value > 1.05) return '状态：三圆盘可能连通'
  if (isoEpsilon.value > 0.6) return '状态：G₁已隔离，G₂∪G₃连通（2个特征值）'
  return '状态：三圆盘全部隔离，每个各含1个特征值'
})
const isoHint = computed(() => {
  if (isoEpsilon.value > 1.05) return '缩小ε观察圆盘分离过程'
  if (isoEpsilon.value > 0.6) return 'G₁: [8,12]含1个实特征值，G₂∪G₃含2个特征值'
  return '三个孤立圆盘各含一个实特征值，矩阵可对角化'
})
const play2 = () => { playing2.value = true }
const pause2 = () => { playing2.value = false }
const reset2 = () => { playing2.value = false; isoEpsilon.value = 1 }

const playing3 = ref(false)
let rafId3 = null, t3 = 0
const rayProg = ref(0)
const rAngle = ref(0)
const lambda1 = 2 - Math.SQRT2
const lambda2 = 2 + Math.SQRT2
const eig1Dir = 1 + Math.SQRT2
const eig2Dir = Math.SQRT2 - 1

const rayleigh = (th) => {
  const c = Math.cos(th), s = Math.sin(th)
  return 3*c*c + 2*c*s + s*s
}
const rv3x = computed(() => 100 * Math.cos(rAngle.value))
const rv3y = computed(() => 100 * Math.sin(rAngle.value))
const rPlotW = 240, rPlotH = 120
const rScaleY = (v) => (4 - v) / 4 * rPlotH * 2 - rPlotH
const rScaleX = (th) => (th / (2*Math.PI)) * rPlotW
const rCurrent = computed(() => rayleigh(rAngle.value))
const rCurX = computed(() => rScaleX(rAngle.value))
const rCurY = computed(() => rScaleY(rCurrent.value))
const eig1Screen = computed(() => rScaleY(lambda1))
const eig2Screen = computed(() => rScaleY(lambda2))
const rCurvePoints = computed(() => {
  const pts = []
  const steps = Math.floor(Math.min(rAngle.value / (2*Math.PI), 1) * 200) + 2
  for (let i = 0; i <= steps; i++) {
    const th = (i / 200) * 2 * Math.PI
    pts.push(`${rScaleX(th)},${rScaleY(rayleigh(th))}`)
  }
  return pts.join(' ')
})

const animate3 = () => {
  t3 += 0.012
  rayProg.value = Math.min(t3 * 0.8, 1)
  rAngle.value += 0.015
  if (rAngle.value > Math.PI * 2) rAngle.value -= Math.PI * 2
  rafId3 = requestAnimationFrame(animate3)
}
const play3 = () => { if (!playing3.value) { playing3.value = true; t3 = 0; animate3() } }
const pause3 = () => { playing3.value = false; if (rafId3) cancelAnimationFrame(rafId3) }
const reset3 = () => { pause3(); t3 = 0; rayProg.value = 0; rAngle.value = 0 }

function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3) }

onUnmounted(() => {
  if (rafId1) cancelAnimationFrame(rafId1)
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
