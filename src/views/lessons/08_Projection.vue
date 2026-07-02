<template>
  <LessonLayout :lesson-id="8" title="投影矩阵与广义逆应用" subtitle="Projection Matrices & Applications">
    <!-- Section 1: 投影矩阵基本概念 -->
    <Section title="投影矩阵：从几何到代数" :num="1">
      <p>
        投影矩阵是矩阵论中连接"几何直观"与"代数计算"的核心工具。给定一个向量空间
        <span class="formula-inline">V</span>
        和它的一个子空间
        <span class="formula-inline">L</span>，投影算子将每个向量映射到
        <span class="formula-inline">L</span>中，且保持
        <span class="formula-inline">L</span>中的向量不变。
      </p>

      <Theorem title="投影矩阵的定义（幂等性）" type="definition" icon="📐">
        <p>
          方阵
          <span class="formula-inline">P \in \mathbb{C}^{n \times n}</span>
          称为<strong>投影矩阵</strong>（投影算子），当且仅当
          <span class="formula-inline">P</span>满足<strong>幂等性</strong>：
        </p>
        <Formula>P^2 = P</Formula>
        <p>
          几何含义：将向量投影一次和投影两次，结果完全相同——投影已经"到达目的地"，再投影不会移动。
        </p>
      </Theorem>

      <Theorem title="幂等矩阵的基本性质" type="theorem" icon="✨">
        <p>若<span class="formula-inline">P^2 = P</span>，则：</p>
        <ul>
          <li>
            <span class="formula-inline">P</span>的特征值只能是
            <span class="formula-inline">0</span>或<span class="formula-inline">1</span>（由<span class="formula-inline">P^2x = \lambda^2 x = \lambda x</span>即得）
          </li>
          <li>
            <span class="formula-inline">\operatorname{tr}(P) = \operatorname{rank}(P)</span>（迹等于秩，因为特征值1的个数等于值域维数）
          </li>
          <li>
            <span class="formula-inline">I - P</span>也是投影矩阵，且<span class="formula-inline">R(I-P) = N(P)</span>，<span class="formula-inline">N(I-P) = R(P)</span>
          </li>
        </ul>
      </Theorem>

      <h3>正交投影 vs 斜投影</h3>
      <p>
        当投影方向与目标子空间<strong>正交</strong>时，投影矩阵额外满足
        <span class="formula-inline">P^{\mathsf{T}} = P</span>（对称性），此时称为<strong>正交投影矩阵</strong>。
        不满足对称性的投影矩阵称为<strong>斜投影矩阵</strong>。
      </p>

      <Theorem title="正交投影矩阵的特征刻画" type="theorem" icon="🎯">
        <p>方阵<span class="formula-inline">P</span>是正交投影矩阵当且仅当：</p>
        <Formula>P^2 = P \quad \text{且} \quad P^{\mathsf{T}} = P \quad (\text{Hermite: } P^H = P)</Formula>
        <p>
          正交投影具有<strong>最短距离</strong>性质：<span class="formula-inline">Px</span>是子空间
          <span class="formula-inline">R(P)</span>中距<span class="formula-inline">x</span>最近的点。
        </p>
      </Theorem>
    </Section>

    <Section num="2" title="核心实例：正交投影与斜投影">
      <p>
        下面通过两个具体例子，彻底搞懂投影矩阵的计算方法和几何本质。
        设 <span class="formula-inline">L = \operatorname{span}\{(1,0,0)\T\}</span>（即 <span class="formula-inline">x</span> 轴），
        <span class="formula-inline">M = \operatorname{span}\{(1,1,0)\T, (0,1,1)\T\}</span>。
      </p>

      <ExampleBox title="例3：正交投影到 L" badge="📝 正交投影">
        <template #problem>
          <p>求到 <span class="formula-inline">L</span> 的<strong>正交投影矩阵</strong> <span class="formula-inline">P_L</span>，
            并将 <span class="formula-inline">x = (2,2,1)\T</span> 正交投影到 <span class="formula-inline">L</span> 上。</p>
        </template>
        <template #solution>
          <div class="step">
            <div class="step-num">1</div>
            <div>
              <p><strong>写出公式。</strong><span class="formula-inline">L</span> 由单个向量 <span class="formula-inline">u = (1,0,0)\T</span> 张成，正交投影矩阵为：</p>
              <Formula>P_L = \frac{uu\T}{u\T u}</Formula>
              <p>分母 <span class="formula-inline">u\T u</span> 是一个数（归一化），分子 <span class="formula-inline">uu\T</span> 是矩阵（决定投影方向）。</p>
            </div>
          </div>
          <div class="step">
            <div class="step-num">2</div>
            <div>
              <p><strong>计算。</strong><span class="formula-inline">u\T u = 1</span>，<span class="formula-inline">uu\T = \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}(1,0,0) = \begin{pmatrix} 1 &amp; 0 &amp; 0 \\ 0 &amp; 0 &amp; 0 \\ 0 &amp; 0 &amp; 0 \end{pmatrix}</span>。</p>
              <Formula>P_L = \begin{pmatrix} 1 &amp; 0 &amp; 0 \\ 0 &amp; 0 &amp; 0 \\ 0 &amp; 0 &amp; 0 \end{pmatrix} = \operatorname{diag}(1,0,0)</Formula>
            </div>
          </div>
          <div class="step">
            <div class="step-num">3</div>
            <div>
              <p><strong>投影向量 x。</strong></p>
              <Formula>P_L x = \begin{pmatrix} 1 &amp; 0 &amp; 0 \\ 0 &amp; 0 &amp; 0 \\ 0 &amp; 0 &amp; 0 \end{pmatrix}\begin{pmatrix} 2 \\ 2 \\ 1 \end{pmatrix} = \begin{pmatrix} 2 \\ 0 \\ 0 \end{pmatrix}</Formula>
              <p><strong>直觉：</strong><span class="formula-inline">L</span> 就是 <span class="formula-inline">x</span> 轴，正交投影后 <span class="formula-inline">y</span> 和 <span class="formula-inline">z</span> 坐标归零，只保留 <span class="formula-inline">x</span> 坐标。矩阵 <span class="formula-inline">\operatorname{diag}(1,0,0)</span> 完美刻画这一几何操作。</p>
            </div>
          </div>
        </template>
      </ExampleBox>

      <ExampleBox title="例4：斜投影——沿 M 到 L" badge="📝 斜投影">
        <template #problem>
          <p><span class="formula-inline">\R^3 = L \oplus M</span>。求沿 <span class="formula-inline">M</span> 到 <span class="formula-inline">L</span> 的<strong>斜投影矩阵</strong> <span class="formula-inline">P</span>，
            并将 <span class="formula-inline">x = (2,2,1)\T</span> 沿 <span class="formula-inline">M</span> 斜投影到 <span class="formula-inline">L</span> 上。</p>
        </template>
        <template #solution>
          <div class="step">
            <div class="step-num">1</div>
            <div>
              <p><strong>核心思想：空间分解。</strong>斜投影的本质是把 <span class="formula-inline">x</span> 唯一拆成两部分：</p>
              <Formula>x = \underbrace{l}_{\in L} + \underbrace{m}_{\in M}</Formula>
              <p>我们要的投影就是 <span class="formula-inline">l</span>。</p>
            </div>
          </div>
          <div class="step">
            <div class="step-num">2</div>
            <div>
              <p><strong>设出一般表达式。</strong>任取 <span class="formula-inline">x = (x_1, x_2, x_3)\T</span>。</p>
              <p><span class="formula-inline">l \in L</span>：<span class="formula-inline">l = a(1,0,0)\T = (a, 0, 0)\T</span></p>
              <p><span class="formula-inline">m \in M</span>：<span class="formula-inline">m = s(1,1,0)\T + t(0,1,1)\T = (s,\; s+t,\; t)\T</span></p>
            </div>
          </div>
          <div class="step">
            <div class="step-num">3</div>
            <div>
              <p><strong>列方程组解系数。</strong>由 <span class="formula-inline">x = l + m</span>：</p>
              <div class="formula-block">
                \begin{cases} x_1 = a + s \\ x_2 = 0 + (s+t) \\ x_3 = 0 + t \end{cases}
                \implies \quad
                t = x_3,\quad s = x_2 - x_3,\quad a = x_1 - x_2 + x_3
              </div>
            </div>
          </div>
          <div class="step">
            <div class="step-num">4</div>
            <div>
              <p><strong>写出投影矩阵。</strong>投影 <span class="formula-inline">l = (a, 0, 0)\T = (x_1 - x_2 + x_3,\; 0,\; 0)\T</span>。提取系数：</p>
              <Formula>P = \begin{pmatrix} 1 &amp; -1 &amp; 1 \\ 0 &amp; 0 &amp; 0 \\ 0 &amp; 0 &amp; 0 \end{pmatrix}</Formula>
              <p>验证：<span class="formula-inline">P^2 = P</span> ✓，<span class="formula-inline">R(P) = L</span> ✓，<span class="formula-inline">N(P) = M</span> ✓。</p>
            </div>
          </div>
          <div class="step">
            <div class="step-num">5</div>
            <div>
              <p><strong>代入具体向量。</strong><span class="formula-inline">x = (2,2,1)\T</span>：</p>
              <Formula>Px = \begin{pmatrix} 1 &amp; -1 &amp; 1 \\ 0 &amp; 0 &amp; 0 \\ 0 &amp; 0 &amp; 0 \end{pmatrix}\begin{pmatrix} 2 \\ 2 \\ 1 \end{pmatrix} = \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}</Formula>
              <p>直接用前面推导的 <span class="formula-inline">a = x_1 - x_2 + x_3 = 2 - 2 + 1 = 1</span>，投影结果 <span class="formula-inline">(1, 0, 0)\T</span> → 正交投影得 <span class="formula-inline">(2,0,0)\T</span>，斜投影得 <span class="formula-inline">(1,0,0)\T</span>，两者不同！</p>
            </div>
          </div>
        </template>
      </ExampleBox>

      <div class="compare-project">
        <div class="cp-card cp-card-ortho">
          <div class="cp-title">正交投影（垂直投射）</div>
          <div class="cp-detail"><strong>公式：</strong><span class="formula-inline">P_L = \dfrac{uu\T}{u\T u}</span></div>
          <div class="cp-detail"><strong>结果：</strong><span class="formula-inline">P_L(2,2,1)\T = (2, 0, 0)\T</span></div>
        </div>
        <div class="cp-card cp-card-oblq">
          <div class="cp-title">斜投影（沿 M 投射）</div>
          <div class="cp-detail"><strong>方法：</strong>拆分 <span class="formula-inline">x = l + m</span>，解出 <span class="formula-inline">l</span></div>
          <div class="cp-detail"><strong>结果：</strong><span class="formula-inline">P(2,2,1)\T = (1, 0, 0)\T</span></div>
        </div>
      </div>

      <h3>3D 可视化：在 R³ 中观察投影过程</h3>
      <p>
        在三维空间中观察向量 <span class="formula-inline">x = (2,2,1)</span> 投影到
        <span class="formula-inline">L</span>（<span class="formula-inline">x</span> 轴）的过程。
        正交投影（绿）沿法线垂直落下，斜投影（紫）沿 <span class="formula-inline">M</span> 平面方向倾斜映射。
        <strong>拖动画面旋转视角，滚轮缩放。</strong>
      </p>

      <AnimationBox
        title="R³ 正交投影与斜投影"
        :playing="proj3dPlaying"
        description="蓝色=向量x, 绿色=正交投影, 紫色=斜投影l, 粉色=M平面与m分量, 橙色=x轴(L)。斜投影展示 x = l + m 的平行四边形分解。"
        step
        @play="proj3dPlay"
        @pause="proj3dPause"
        @reset="proj3dReset"
        @step="proj3dAdvanceStep"
      >
        <template #controls>
          <label class="proj3d-mode-control">
            显示方式：
            <select v-model="proj3dMode" class="proj3d-select">
              <option value="both">两者都显示</option>
              <option value="ortho">仅正交</option>
              <option value="oblq">仅斜投影</option>
            </select>
          </label>
        </template>
        <div class="proj3d-stage">
          <div ref="proj3dViewport" class="proj3d-viewport" aria-label="3D projection interactive view"></div>
          <div class="proj3d-legend">
            <span><i class="proj3d-key proj3d-key-x"></i>向量 x</span>
            <span :class="{ 'is-muted': !showProj3dOrtho }"><i class="proj3d-key proj3d-key-o"></i>正交投影 P_ortho·x</span>
            <span :class="{ 'is-muted': !showProj3dOblq }"><i class="proj3d-key proj3d-key-q"></i>斜投影 P_oblq·x</span>
            <strong>{{ proj3dStepText }}</strong>
            <em>步骤 {{ proj3dStep }} / {{ proj3dMaxStep }}</em>
          </div>
        </div>
      </AnimationBox>
    </Section>

    <!-- Animation 1: 正交投影vs斜投影对比 (几何演示 - 保留interactive) -->
    <Section title="动画：正交投影 vs 斜投影" :num="3">
      <AnimationBox
        title="正交投影与斜投影对比（可调节斜投影角度）"
        :playing="playing1"
        description="蓝色向量 x 投影到橙色直线 L 上。正交投影（绿色）垂直于 L，斜投影（紫色）沿可调方向投影。拖动滑块改变斜投影方向。"
        @play="play1"
        @pause="pause1"
        @reset="reset1"
      >
        <template #controls>
          <label style="font-size:12px;color:#64748b;display:flex;align-items:center;gap:6px;">
            斜投影角：<input type="range" v-model.number="obliqueAngle" min="10" max="170" step="1" style="width:100px;">
            {{ obliqueAngle }}°
          </label>
        </template>
        <svg ref="svg1" viewBox="0 0 500 400" class="responsive-svg">
          <defs>
            <marker id="arrow1" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#334155"/>
            </marker>
            <marker id="arrowOrtho" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#10b981"/>
            </marker>
            <marker id="arrowOblique" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#7c3aed"/>
            </marker>
            <marker id="arrowBlue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#2563eb"/>
            </marker>
          </defs>
          <!-- Grid -->
          <g opacity="0.1">
            <line v-for="i in 20" :key="'v'+i" :x1="i*25" y1="0" :x2="i*25" y2="400" stroke="#94a3b8" stroke-width="0.5"/>
            <line v-for="i in 16" :key="'h'+i" x1="0" :y1="i*25" :x2="500" :y2="i*25" stroke="#94a3b8" stroke-width="0.5"/>
          </g>
          <!-- Axes -->
          <line x1="250" y1="20" x2="250" y2="380" stroke="#334155" stroke-width="1" marker-end="url(#arrow1)"/>
          <line x1="20" y1="300" x2="480" y2="300" stroke="#334155" stroke-width="1" marker-end="url(#arrow1)"/>
          <text x="485" y="305" font-size="12" fill="#334155">x</text>
          <text x="255" y="25" font-size="12" fill="#334155">y</text>

          <!-- Subspace L (line through origin at angle lineAngle) -->
          <line :x1="250 - 200*Math.cos(lineAngleRad)" :y1="300 - 200*Math.sin(lineAngleRad)"
                :x2="250 + 200*Math.cos(lineAngleRad)" :y2="300 + 200*Math.sin(lineAngleRad)"
                stroke="#ea580c" stroke-width="2.5" stroke-dasharray="6,3"/>
          <text :x="250 + 185*Math.cos(lineAngleRad)" :y="300 + 185*Math.sin(lineAngleRad) - 8"
                fill="#ea580c" font-size="13" font-weight="600">L</text>

          <!-- Original vector x (animated) -->
          <line x1="250" y1="300" :x2="250 + px" :y2="300 - py"
                stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrowBlue)"/>
          <text :x="250 + px + 8" :y="300 - py" fill="#2563eb" font-size="13" font-weight="600">x</text>

          <!-- Orthogonal projection -->
          <line x1="250" y1="300" :x2="250 + opx" :y2="300 - opy"
                stroke="#10b981" stroke-width="2.5" marker-end="url(#arrowOrtho)"/>
          <!-- Dashed perpendicular line from x to orthogonal projection -->
          <line :x1="250 + px" :y1="300 - py" :x2="250 + opx" :y2="300 - opy"
                stroke="#10b981" stroke-width="1.2" stroke-dasharray="4,3" opacity="0.7"/>
          <text :x="250 + opx - 5" :y="300 - opy - 10" fill="#10b981" font-size="12" font-weight="600">P_ortho·x</text>
          <!-- Right angle marker -->
          <rect :x="250 + opx - 6" :y="300 - opy - 6" width="8" height="8" fill="none" stroke="#10b981" stroke-width="1" transform="rotate(0)"/>

          <!-- Oblique projection -->
          <line x1="250" y1="300" :x2="250 + obpx" :y2="300 - obpy"
                stroke="#7c3aed" stroke-width="2.5" marker-end="url(#arrowOblique)"/>
          <!-- Oblique projection direction line from x to oblique projection -->
          <line :x1="250 + px" :y1="300 - py" :x2="250 + obpx" :y2="300 - obpy"
                stroke="#7c3aed" stroke-width="1.2" stroke-dasharray="4,3" opacity="0.7"/>
          <text :x="250 + obpx + 5" :y="300 - obpy + 15" fill="#7c3aed" font-size="12" font-weight="600">P_oblq·x</text>

          <!-- Legend -->
          <rect x="20" y="20" width="180" height="90" rx="8" fill="#fff" stroke="#e2e8f0"/>
          <line x1="32" y1="40" x2="60" y2="40" stroke="#2563eb" stroke-width="2.5"/>
          <text x="68" y="44" font-size="11" fill="#334155">原向量 x</text>
          <line x1="32" y1="60" x2="60" y2="60" stroke="#10b981" stroke-width="2.5"/>
          <text x="68" y="64" font-size="11" fill="#334155">正交投影 P_ortho·x</text>
          <line x1="32" y1="80" x2="60" y2="80" stroke="#7c3aed" stroke-width="2.5"/>
          <text x="68" y="84" font-size="11" fill="#334155">斜投影 P_oblq·x</text>
          <line x1="32" y1="100" x2="60" y2="100" stroke="#ea580c" stroke-width="2" stroke-dasharray="4,2"/>
          <text x="68" y="104" font-size="11" fill="#334155">子空间 L</text>
        </svg>
      </AnimationBox>
    </Section>

    <!-- Section 2: 重要投影公式 -->
    <Section title="重要投影矩阵公式" :num="4">
      <h3>1. 一维投影（投影到向量 u 张成的直线）</h3>
      <Theorem title="一维正交投影公式" type="theorem" icon="📍">
        <p>设<span class="formula-inline">u \neq 0</span>，到<span class="formula-inline">\operatorname{span}\{u\}</span>的正交投影矩阵为：</p>
        <Formula>P_u = \frac{uu^{\mathsf{T}}}{u^{\mathsf{T}}u} = \frac{uu^{\mathsf{T}}}{\|u\|^2}</Formula>
        <p>
          验证幂等性：<span class="formula-inline">P_u^2 = \frac{uu^{\mathsf{T}}uu^{\mathsf{T}}}{(u^{\mathsf{T}}u)^2} = \frac{u(u^{\mathsf{T}}u)u^{\mathsf{T}}}{(u^{\mathsf{T}}u)^2} = P_u</span>。
          显然<span class="formula-inline">P_u^{\mathsf{T}} = P_u</span>，故为正交投影。
        </p>
      </Theorem>

      <h3>2. 列空间投影（投影到 R(A)）</h3>
      <Theorem title="列空间正交投影公式" type="theorem" icon="🔮">
        <p>设<span class="formula-inline">A \in \mathbb{R}^{m \times n}</span>列满秩，则到列空间<span class="formula-inline">R(A)</span>的正交投影矩阵为：</p>
        <Formula>P = A(A^{\mathsf{T}}A)^{-1}A^{\mathsf{T}} = AA^+</Formula>
        <p>
          其中<span class="formula-inline">A^+ = (A^{\mathsf{T}}A)^{-1}A^{\mathsf{T}}</span>是列满秩矩阵的M-P广义逆。
          验证：<span class="formula-inline">P^2 = A(A^{\mathsf{T}}A)^{-1}A^{\mathsf{T}}A(A^{\mathsf{T}}A)^{-1}A^{\mathsf{T}} = A(A^{\mathsf{T}}A)^{-1}A^{\mathsf{T}} = P</span>，
          且<span class="formula-inline">P^{\mathsf{T}} = P</span>。
        </p>
      </Theorem>

      <Theorem title="一般情形：投影到 R(A) 沿 N(B) 的斜投影" type="definition" icon="📏">
        <p>
          若<span class="formula-inline">V = L \oplus M</span>，则存在唯一投影矩阵<span class="formula-inline">P_{L,M}</span>，
          使得<span class="formula-inline">R(P_{L,M}) = L</span>，<span class="formula-inline">N(P_{L,M}) = M</span>。
          当<span class="formula-inline">L = R(A)</span>，<span class="formula-inline">M = N(B)</span>且<span class="formula-inline">BA</span>可逆时：
        </p>
        <Formula>P_{L,M} = A(BA)^{-1}B</Formula>
        <p>
          正交投影是<span class="formula-inline">B = A^{\mathsf{T}}</span>的特殊情形，此时<span class="formula-inline">P = A(A^{\mathsf{T}}A)^{-1}A^{\mathsf{T}}</span>。
        </p>
      </Theorem>
    </Section>

    <!-- Animation 2: 幂等性动画 (几何演示 - 保留interactive) -->
    <Section title="动画：投影幂等性 P²=P" :num="5">
      <AnimationBox
        title="投影的幂等性：P(Px) = Px"
        :playing="playing2"
        description="点击播放，观察向量 x 第一次投影得到 Px，第二次投影 P(Px) 结果与 Px 完全重合——投影后不再移动。"
        @play="play2"
        @pause="pause2"
        @reset="reset2"
      >
        <svg ref="svg2" viewBox="0 0 500 400" class="responsive-svg">
          <defs>
            <marker id="arrow2a" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#334155"/>
            </marker>
            <marker id="arrowX2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#2563eb"/>
            </marker>
            <marker id="arrowPx" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#ea580c"/>
            </marker>
            <marker id="arrowPPx" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#7c3aed"/>
            </marker>
          </defs>
          <!-- Grid -->
          <g opacity="0.1">
            <line v-for="i in 20" :key="'gv2'+i" :x1="i*25" y1="0" :x2="i*25" y2="400" stroke="#94a3b8" stroke-width="0.5"/>
            <line v-for="i in 16" :key="'gh2'+i" x1="0" :y1="i*25" :x2="500" :y2="i*25" stroke="#94a3b8" stroke-width="0.5"/>
          </g>
          <!-- Axes -->
          <line x1="250" y1="20" x2="250" y2="380" stroke="#334155" stroke-width="1" marker-end="url(#arrow2a)"/>
          <line x1="20" y1="300" x2="480" y2="300" stroke="#334155" stroke-width="1" marker-end="url(#arrow2a)"/>

          <!-- Subspace L (x-axis, i.e. y=0 in screen coords) -->
          <rect x="20" y="295" width="460" height="10" rx="5" fill="#fed7aa" opacity="0.5"/>
          <text x="455" y="290" fill="#ea580c" font-size="13" font-weight="600">L = R(P)</text>

          <!-- Vector x -->
          <line x1="250" y1="300" :x2="250 + x2px" :y2="300 - x2py"
                stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrowX2)"/>
          <text :x="250 + x2px + 8" :y="300 - x2py" fill="#2563eb" font-size="13" font-weight="700">x</text>

          <!-- First projection Px (animates along projection) -->
          <line x1="250" y1="300" :x2="250 + px1x" :y2="300 - px1y"
                stroke="#ea580c" stroke-width="2.5" :opacity="projAlpha1" marker-end="url(#arrowPx)"/>
          <text v-if="projAlpha1 > 0.3" :x="250 + px1x - 5" :y="300 - px1y - 12" fill="#ea580c" font-size="12" font-weight="600">Px</text>

          <!-- Projection path from x to Px -->
          <line v-if="stage2 >= 1" :x1="250 + x2px" :y1="300 - x2py" :x2="250 + px1x" :y2="300 - px1y"
                stroke="#ea580c" stroke-width="1.2" stroke-dasharray="4,3" opacity="0.6"/>

          <!-- Second projection P(Px) -->
          <line x1="250" y1="300" :x2="250 + ppx" :y2="300 - ppy"
                stroke="#7c3aed" stroke-width="3" :opacity="projAlpha2" marker-end="url(#arrowPPx)"/>
          <text v-if="projAlpha2 > 0.3" :x="250 + ppx - 20" :y="300 - ppy + 25" fill="#7c3aed" font-size="12" font-weight="700">P(Px)=Px</text>

          <!-- Check mark when done -->
          <g v-if="stage2 >= 2">
            <circle cx="250" cy="50" r="22" fill="#10b981" opacity="0.9"/>
            <path d="M240,50 L248,58 L262,42" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>
            <text x="280" y="55" font-size="13" fill="#10b981" font-weight="600">P² = P 验证完毕！</text>
          </g>
        </svg>
      </AnimationBox>
    </Section>

    <!-- Section 3: 直和分解 -->
    <Section title="值域与零空间的直和分解" :num="6">
      <Theorem title="投影矩阵的直和分解定理" type="theorem" icon="🧩">
        <p>若<span class="formula-inline">P</span>是<span class="formula-inline">V</span>上的投影矩阵（<span class="formula-inline">P^2 = P</span>），则：</p>
        <Formula>V = R(P) \oplus N(P)</Formula>
        <p>即整个空间可分解为投影的值域（投影后到达的子空间）与零空间（被投影映射为零的方向）的<strong>直和</strong>。</p>
        <ul>
          <li><span class="formula-inline">R(P) = \{x : Px = x\}</span>（不动点集）</li>
          <li><span class="formula-inline">N(P) = \{x : Px = 0\}</span>（投影方向）</li>
          <li>对任意<span class="formula-inline">x \in V</span>，<span class="formula-inline">x = Px + (I-P)x</span>，其中<span class="formula-inline">Px \in R(P)</span>，<span class="formula-inline">(I-P)x \in N(P)</span></li>
        </ul>
      </Theorem>

      <Theorem title="正交投影的直和 = 正交直和" type="note" icon="⚡">
        <p>
          对于<strong>正交投影</strong><span class="formula-inline">P</span>，<span class="formula-inline">N(P) = R(P)^\perp</span>，
          即零空间恰好是值域的正交补，此时直和为正交直和：
          <span class="formula-inline">V = R(P) \stackrel{\perp}{\oplus} R(P)^\perp</span>。
        </p>
      </Theorem>
    </Section>

    <!-- Animation 3: 直和分解可视化 (几何演示 - 保留interactive) -->
    <Section title="动画：R(P)⊕N(P) 直和分解" :num="7">
      <AnimationBox
        title="直和分解可视化：x = Px + (I-P)x"
        :playing="playing3"
        description="绿色子空间为值域 R(P)，粉色子空间为零空间 N(P)。蓝色向量 x 被唯一分解为橙色(Px)和紫色((I-P)x)分量，二者分别属于两个子空间。"
        @play="play3"
        @pause="pause3"
        @reset="reset3"
      >
        <svg ref="svg3" viewBox="0 0 500 400" class="responsive-svg">
          <defs>
            <marker id="arrow3a" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#334155"/>
            </marker>
          </defs>
          <!-- R(P) subspace (green, horizontal) -->
          <rect x="20" y="193" width="460" height="14" rx="7" fill="#d1fae5" opacity="0.6"/>
          <text x="440" y="188" fill="#059669" font-size="13" font-weight="700">R(P)</text>

          <!-- N(P) subspace (pink, oblique) -->
          <polygon points="250,20 100,380 400,380" fill="#fce7f3" opacity="0.5"/>
          <text x="100" y="50" fill="#db2777" font-size="13" font-weight="700">N(P)</text>
          <line x1="250" y1="30" x2="250" y2="370" stroke="#db2777" stroke-width="1.5" stroke-dasharray="5,3"/>

          <!-- Origin -->
          <circle cx="250" cy="200" r="4" fill="#334155"/>
          <text x="235" y="218" font-size="11" fill="#334155">O</text>

          <!-- Vector x -->
          <line x1="250" y1="200" :x2="250 + x3x" :y2="200 - x3y"
                stroke="#2563eb" stroke-width="2.5"/>
          <polygon :points="arrowHead(250+x3x, 200-x3y, Math.atan2(-x3y, x3x), '#2563eb')" fill="#2563eb"/>
          <text :x="250 + x3x + 8" :y="200 - x3y" fill="#2563eb" font-size="14" font-weight="700">x</text>

          <!-- Px component (in R(P), orange) -->
          <line v-if="decomp3 > 0.3" x1="250" y1="200" :x2="250 + px3" :y2="200"
                stroke="#ea580c" stroke-width="3" :opacity="Math.min(decomp3, 1)"/>
          <polygon v-if="decomp3 > 0.5" :points="arrowHead(250+px3, 200, 0, '#ea580c')" fill="#ea580c"/>
          <text v-if="decomp3 > 0.5" :x="250 + px3/2 - 10" y="190" fill="#ea580c" font-size="12" font-weight="600">Px ∈ R(P)</text>

          <!-- (I-P)x component (in N(P), purple) -->
          <line v-if="decomp3 > 0.5" :x1="250 + px3" :y1="200" :x2="250 + x3x" :y2="200 - x3y"
                stroke="#7c3aed" stroke-width="2.5" :opacity="Math.min((decomp3-0.5)*2, 1)"/>
          <polygon v-if="decomp3 > 0.7" :points="arrowHead(250+x3x, 200-x3y, Math.atan2(-(x3y), x3x-px3), '#7c3aed')" fill="#7c3aed"/>
          <text v-if="decomp3 > 0.7" :x="250 + px3 + 15" :y="200 - x3y/2" fill="#7c3aed" font-size="11" font-weight="600">(I-P)x ∈ N(P)</text>

          <!-- Parallelogram (dashed) -->
          <line v-if="decomp3 > 0.8" x1="250" y1="200" :x2="250 + (x3x-px3)" :y2="200 - x3y"
                stroke="#7c3aed" stroke-width="1" stroke-dasharray="3,3" opacity="0.5"/>

          <!-- Formula text -->
          <g v-if="decomp3 >= 1">
            <rect x="120" y="340" width="260" height="36" rx="8" fill="#fff" stroke="#e2e8f0"/>
            <text x="250" y="363" text-anchor="middle" font-size="15" font-weight="700" fill="#7c3aed">x = Px + (I-P)x</text>
          </g>
        </svg>
      </AnimationBox>
    </Section>

    <!-- Section 4: 矩阵方程 AXB=D -->
    <Section title="矩阵方程 AXB = D" :num="8">
      <p>
        投影矩阵的一个重要应用是求解矩阵方程<span class="formula-inline">AXB = D</span>。
        利用广义逆和投影算子，可以给出解的存在条件和通解结构。
      </p>

      <Theorem title="矩阵方程 AXB=D 有解的充要条件与通解" type="theorem" icon="📝">
        <p>矩阵方程<span class="formula-inline">AXB = D</span>有解的充要条件是：</p>
        <Formula>AA^+DB^+B = D \quad (\text{即} \quad AA^-DB^-B = D)</Formula>
        <p>当方程有解时，通解为：</p>
        <Formula>X = A^+DB^+ + Y - A^+AYBB^+</Formula>
        <p>
          其中<span class="formula-inline">Y</span>为任意阶数相容矩阵。<span class="formula-inline">P_{R(A^{\mathsf{T}})} = A^+A</span>
          和<span class="formula-inline">P_{R(B)} = BB^+</span>是正交投影矩阵，
          <span class="formula-inline">Y - A^+AYBB^+ = (I - A^+A)Y(I - BB^+)</span>对应齐次方程<span class="formula-inline">AXB = 0</span>的通解。
        </p>
      </Theorem>

      <Theorem title="常用特殊情形" type="tip" icon="💡">
        <ul>
          <li><strong>线性方程组</strong><span class="formula-inline">Ax = b</span>：取<span class="formula-inline">B=I</span>，有解条件<span class="formula-inline">AA^+b = b</span>，通解<span class="formula-inline">x = A^+b + (I-A^+A)y</span></li>
          <li><strong>矩阵方程</strong><span class="formula-inline">AX = D</span>：取<span class="formula-inline">B=I</span>，通解<span class="formula-inline">X = A^+D + (I-A^+A)Y</span></li>
          <li><strong>极小范数最小二乘解</strong>：<span class="formula-inline">x = A^+b</span>是唯一满足<span class="formula-inline">\|x\|</span>最小的最小二乘解</li>
        </ul>
      </Theorem>
    </Section>

    <!-- 真题例题 -->
    <Section title="真题例题" :num="9">
      <ExampleBox source="矩阵论期末考试真题" badge="📝 真题1">
        <template #problem>
          <p>设<span class="formula-inline">A = \begin{pmatrix} 1 & 1 \\ 0 & 1 \\ 1 & 0 \end{pmatrix}</span>，求到列空间<span class="formula-inline">R(A)</span>的正交投影矩阵<span class="formula-inline">P</span>，并验证<span class="formula-inline">P^2 = P</span>和<span class="formula-inline">P^{\mathsf{T}} = P</span>。</p>
        </template>
        <template #solution>
          <div class="step">
            <div class="step-num">1</div>
            <div>
              <p><strong>计算<span class="formula-inline">A^{\mathsf{T}}A</span>：</strong></p>
              <Formula>A^{\mathsf{T}}A = \begin{pmatrix} 1 & 0 & 1 \\ 1 & 1 & 0 \end{pmatrix}\begin{pmatrix} 1 & 1 \\ 0 & 1 \\ 1 & 0 \end{pmatrix} = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}</Formula>
            </div>
          </div>
          <div class="step">
            <div class="step-num">2</div>
            <div>
              <p><strong>求逆<span class="formula-inline">(A^{\mathsf{T}}A)^{-1}</span>：</strong></p>
              <Formula>\det(A^{\mathsf{T}}A) = 4 - 1 = 3, \quad (A^{\mathsf{T}}A)^{-1} = \frac{1}{3}\begin{pmatrix} 2 & -1 \\ -1 & 2 \end{pmatrix}</Formula>
            </div>
          </div>
          <div class="step">
            <div class="step-num">3</div>
            <div>
              <p><strong>计算投影矩阵<span class="formula-inline">P = A(A^{\mathsf{T}}A)^{-1}A^{\mathsf{T}}</span>：</strong></p>
              <Formula>P = \begin{pmatrix} 1 & 1 \\ 0 & 1 \\ 1 & 0 \end{pmatrix}\cdot\frac{1}{3}\begin{pmatrix} 2 & -1 \\ -1 & 2 \end{pmatrix}\cdot\begin{pmatrix} 1 & 0 & 1 \\ 1 & 1 & 0 \end{pmatrix}</Formula>
              <Formula>= \frac{1}{3}\begin{pmatrix} 1 & 1 \\ -1 & 2 \\ 2 & -1 \end{pmatrix}\begin{pmatrix} 1 & 0 & 1 \\ 1 & 1 & 0 \end{pmatrix} = \frac{1}{3}\begin{pmatrix} 2 & 1 & 1 \\ 1 & 2 & -1 \\ 1 & -1 & 2 \end{pmatrix}</Formula>
            </div>
          </div>
          <div class="step">
            <div class="step-num">4</div>
            <div>
              <p><strong>验证幂等性<span class="formula-inline">P^2 = P</span>：</strong></p>
              <Formula>P^2 = \frac{1}{9}\begin{pmatrix} 2 & 1 & 1 \\ 1 & 2 & -1 \\ 1 & -1 & 2 \end{pmatrix}\begin{pmatrix} 2 & 1 & 1 \\ 1 & 2 & -1 \\ 1 & -1 & 2 \end{pmatrix} = \frac{1}{9}\begin{pmatrix} 6 & 3 & 3 \\ 3 & 6 & -3 \\ 3 & -3 & 6 \end{pmatrix} = \frac{1}{3}\begin{pmatrix} 2 & 1 & 1 \\ 1 & 2 & -1 \\ 1 & -1 & 2 \end{pmatrix} = P \checkmark</Formula>
            </div>
          </div>
          <div class="step">
            <div class="step-num">5</div>
            <div>
              <p><strong>验证对称性<span class="formula-inline">P^{\mathsf{T}} = P</span>：</strong>P显然对称，因为<span class="formula-inline">P_{ij} = P_{ji}</span>。因此<span class="formula-inline">P</span>是正交投影矩阵。</p>
            </div>
          </div>
        </template>
      </ExampleBox>

      <ExampleBox source="考研真题改编" badge="📝 真题2">
        <template #problem>
          <p>在<span class="formula-inline">\mathbb{R}^3</span>中，设<span class="formula-inline">L = \operatorname{span}\{(1,0,0)^{\mathsf{T}}\}</span>，<span class="formula-inline">M = \operatorname{span}\{(1,1,0)^{\mathsf{T}}, (0,1,1)^{\mathsf{T}}\}</span>。验证<span class="formula-inline">\mathbb{R}^3 = L \oplus M</span>，并求沿<span class="formula-inline">M</span>到<span class="formula-inline">L</span>的投影矩阵<span class="formula-inline">P</span>。</p>
        </template>
        <template #solution>
          <div class="step">
            <div class="step-num">1</div>
            <div>
              <p><strong>验证直和：</strong>取<span class="formula-inline">A = (1,0,0)^{\mathsf{T}}</span>（L的基），<span class="formula-inline">B = \begin{pmatrix}1&0\\1&1\\0&1\end{pmatrix}</span>（M的基的转置，即N(P)相关矩阵）。需要验证<span class="formula-inline">L \cap M = \{0\}</span>。</p>
              <p>设<span class="formula-inline">a(1,0,0) = b(1,1,0) + c(0,1,1)</span>，则<span class="formula-inline">a=b, b+c=0, c=0</span>，得<span class="formula-inline">a=b=c=0</span>。又<span class="formula-inline">\dim L + \dim M = 1+2=3</span>，故<span class="formula-inline">\mathbb{R}^3 = L \oplus M</span>。</p>
            </div>
          </div>
          <div class="step">
            <div class="step-num">2</div>
            <div>
              <p><strong>构造投影矩阵：</strong>用公式<span class="formula-inline">P = A(B^{\mathsf{T}}A)^{-1}B^{\mathsf{T}}</span>（投影到R(A)沿N(Bᵀ)）。这里我们用待定系数法：设<span class="formula-inline">P(e_1) = e_1</span>，<span class="formula-inline">P(1,1,0)^{\mathsf{T}} = 0</span>，<span class="formula-inline">P(0,1,1)^{\mathsf{T}} = 0</span>。</p>
              <Formula>P = \begin{pmatrix} 1 & -1 & 1 \\ 0 & 0 & 0 \\ 0 & 0 & 0 \end{pmatrix}</Formula>
              <p>验证：<span class="formula-inline">P^2 = P</span>，<span class="formula-inline">R(P) = \operatorname{span}\{e_1\} = L</span>，<span class="formula-inline">N(P) = M</span>。</p>
            </div>
          </div>
        </template>
      </ExampleBox>

      <ExampleBox source="矩阵方程综合题" badge="📝 真题3">
        <template #problem>
          <p>设<span class="formula-inline">A = \begin{pmatrix} 1 & 1 \\ 0 & 1 \\ 1 & 0 \end{pmatrix}</span>，<span class="formula-inline">b = (1, 2, 2)^{\mathsf{T}}</span>。判断方程组<span class="formula-inline">Ax = b</span>是否有解；若无解，求其极小范数最小二乘解。</p>
        </template>
        <template #solution>
          <div class="step">
            <div class="step-num">1</div>
            <div>
              <p><strong>判断相容性：</strong>增广矩阵秩<span class="formula-inline">\operatorname{rank}(A|b)</span>。<span class="formula-inline">A^{\mathsf{T}}A = \begin{pmatrix}2&1\\1&2\end{pmatrix}</span>，<span class="formula-inline">\operatorname{rank}(A)=2</span>，<span class="formula-inline">AA^+b = Pb</span>。由于b不在R(A)中（验证略），方程组无解。</p>
            </div>
          </div>
          <div class="step">
            <div class="step-num">2</div>
            <div>
              <p><strong>极小范数最小二乘解：</strong><span class="formula-inline">x^+ = A^+b = (A^{\mathsf{T}}A)^{-1}A^{\mathsf{T}}b</span></p>
              <Formula>A^{\mathsf{T}}b = \begin{pmatrix} 1 & 0 & 1 \\ 1 & 1 & 0 \end{pmatrix}\begin{pmatrix} 1 \\ 2 \\ 2 \end{pmatrix} = \begin{pmatrix} 3 \\ 3 \end{pmatrix}</Formula>
            </div>
          </div>
          <div class="step">
            <div class="step-num">3</div>
            <div>
              <Formula>x^+ = \frac{1}{3}\begin{pmatrix} 2 & -1 \\ -1 & 2 \end{pmatrix}\begin{pmatrix} 3 \\ 3 \end{pmatrix} = \begin{pmatrix} 1 \\ 1 \end{pmatrix}</Formula>
              <p>验证残差<span class="formula-inline">r = b - Ax^+ = (1,2,2)^{\mathsf{T}} - (2,1,1)^{\mathsf{T}} = (-1,1,1)^{\mathsf{T}}</span>，<span class="formula-inline">A^{\mathsf{T}}r = (0,0)^{\mathsf{T}}</span> ✓</p>
            </div>
          </div>
        </template>
      </ExampleBox>

      <Steps :steps="[
        '识别投影类型：正交投影(<span class=&quot;formula-inline&quot;>P^{\\mathsf{T}}=P</span>)还是斜投影？目标子空间是什么？投影方向是什么？',
        '正交投影到列空间<span class=&quot;formula-inline&quot;>R(A)</span>：直接套公式 <span class=&quot;formula-inline&quot;>P = A(A^{\\mathsf{T}}A)^{-1}A^{\\mathsf{T}}</span>，注意A必须列满秩',
        '一维正交投影：<span class=&quot;formula-inline&quot;>P = uu^{\\mathsf{T}}/(u^{\\mathsf{T}}u)</span>，这是最简单的投影矩阵',
        '斜投影 <span class=&quot;formula-inline&quot;>P_{L,M}</span>：利用 <span class=&quot;formula-inline&quot;>V=L\\oplus M</span>，通过基矩阵A、B构造 <span class=&quot;formula-inline&quot;>P=A(BA)^{-1}B</span>',
        '验证：务必检查 <span class=&quot;formula-inline&quot;>P^2=P</span>（幂等性），正交投影额外检查 <span class=&quot;formula-inline&quot;>P^{\\mathsf{T}}=P</span>',
        '矩阵方程 <span class=&quot;formula-inline&quot;>AXB=D</span>：先验证有解条件 <span class=&quot;formula-inline&quot;>AA^+DB^+B=D</span>，再写通解 <span class=&quot;formula-inline&quot;>X=A^+DB^++(I-A^+A)Y(I-BB^+)</span>'
      ]"/>
    </Section>

    <!-- WeekQuizBank -->
    <Section title="🗂️ 真题与习题汇总">
      <WeekQuizBank :quizzes="quizzes" weekLabel="第3周" />
    </Section>

    <Section title="📝 课后作业" :num="10">
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
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { ref, onMounted, onUnmounted, nextTick, computed, watch } from 'vue'

const quizzes = (quizBank[8] || []).map(q => ({ ...q, lessonNum: '08', lessonTitle: '投影矩阵与广义逆应用' }))
const hwQuizzes = computed(() => (homeworkBank[8] || []).map(q => ({ ...q })))

const renderTrigger = ref(0)
const { renderMath } = useKatex(renderTrigger)

// ====== 3D Projection Animation ======
const proj3dPlaying = ref(false)
const proj3dStep = ref(0)
const proj3dStepText = ref('点击步进逐步观察投影过程')
const proj3dMaxStep = 2
const proj3dMode = ref('both')
const showProj3dOrtho = computed(() => proj3dMode.value === 'ortho' || proj3dMode.value === 'both')
const showProj3dOblq = computed(() => proj3dMode.value === 'oblq' || proj3dMode.value === 'both')
watch(proj3dMode, () => pRenderScene())
let proj3dRafId = null
let proj3dAnimateId = null
const proj3dViewport = ref(null)
let pScene = null, pCamera = null, pRenderer = null, pLabelRenderer = null, pControls = null
let pSceneLayer = null, pResizeObserver = null

const pData = {
  x: [2, 2, 1],
  l: [1, 0, 0],   // L basis
  m1: [1, 1, 0],  // M basis 1
  m2: [0, 1, 1]   // M basis 2
}
const pOrtho = [2, 0, 0]  // orthogonal proj of (2,2,1) onto x-axis
const pOblq  = [1, 0, 0]  // oblique proj of (2,2,1) along M onto L

function pToV3(v) { return new THREE.Vector3(v[0], v[2], v[1]) }

function pMakeLabel(text, cls = '') {
  const el = document.createElement('div')
  el.className = 'proj3d-label ' + cls
  el.textContent = text
  return new CSS2DObject(el)
}

function pClearLayer() {
  if (!pSceneLayer) return
  while (pSceneLayer.children.length) {
    const c = pSceneLayer.children[0]
    pSceneLayer.remove(c)
    c.traverse?.(o => { o.geometry?.dispose?.(); if (Array.isArray(o.material)) o.material.forEach(m => m.dispose?.()); else o.material?.dispose?.() })
  }
}

function pAddArrow(from, to, color, label = '', opacity = 1) {
  const s = pToV3(from), e = pToV3(to)
  const d = e.clone().sub(s)
  if (d.length() < 0.001) return
  const a = new THREE.ArrowHelper(d.clone().normalize(), s, d.length(), color, 0.16, 0.1)
  a.line.material.transparent = true; a.line.material.opacity = opacity
  a.cone.material.transparent = true; a.cone.material.opacity = opacity
  pSceneLayer.add(a)
  if (label) {
    const lp = s.clone().lerp(e, 0.55).add(new THREE.Vector3(0.06, 0.08, 0.05))
    const lab = pMakeLabel(label, 'proj3d-lbl')
    lab.position.copy(lp)
    pSceneLayer.add(lab)
  }
}

function pAddDashed(from, to, color = 0x94a3b8, opacity = 0.6) {
  const pts = [pToV3(from), pToV3(to)]
  const g = new THREE.BufferGeometry().setFromPoints(pts)
  const m = new THREE.LineDashedMaterial({ color, dashSize: 0.15, gapSize: 0.1, transparent: true, opacity })
  const l = new THREE.Line(g, m); l.computeLineDistances()
  pSceneLayer.add(l)
}

function pAddMPlanePatch() {
  const s = 1.35
  const m1 = pToV3(pData.m1)
  const m2 = pToV3(pData.m2)

  const pts = [
    m1.clone().multiplyScalar(s).add(m2.clone().multiplyScalar(s)),
    m1.clone().multiplyScalar(s).sub(m2.clone().multiplyScalar(s)),
    m1.clone().multiplyScalar(-s).sub(m2.clone().multiplyScalar(s)),
    m1.clone().multiplyScalar(-s).add(m2.clone().multiplyScalar(s))
  ]

  const g = new THREE.BufferGeometry().setFromPoints(pts)
  g.setIndex([0, 1, 2, 0, 2, 3])
  g.computeVertexNormals()

  const mat = new THREE.MeshBasicMaterial({
    color: 0xf472b6,
    transparent: true,
    opacity: 0.18,
    side: THREE.DoubleSide,
    depthWrite: false
  })

  const mesh = new THREE.Mesh(g, mat)
  mesh.renderOrder = -1
  pSceneLayer.add(mesh)

  const edgeGeom = new THREE.BufferGeometry().setFromPoints([...pts, pts[0]])
  const edgeMat = new THREE.LineDashedMaterial({
    color: 0xe11d48,
    dashSize: 0.12,
    gapSize: 0.08,
    transparent: true,
    opacity: 0.55
  })

  const outline = new THREE.Line(edgeGeom, edgeMat)
  outline.computeLineDistances()
  pSceneLayer.add(outline)
}

function pAddDecompositionParallelogram() {
  const zero = [0, 0, 0]
  const l = pOblq
  const m = [1, 2, 1] // m = x - l = (2,2,1) - (1,0,0)
  const x = pData.x

  const pts = [zero, l, x, m].map(pToV3)

  const g = new THREE.BufferGeometry().setFromPoints(pts)
  g.setIndex([0, 1, 2, 0, 2, 3])

  const mat = new THREE.MeshBasicMaterial({
    color: 0x8b5cf6,
    transparent: true,
    opacity: 0.10,
    side: THREE.DoubleSide,
    depthWrite: false
  })

  const mesh = new THREE.Mesh(g, mat)
  mesh.renderOrder = 1
  pSceneLayer.add(mesh)

  pAddDashed(zero, m, 0xe11d48, 0.65)
  pAddDashed(m, x, 0xf97316, 0.6)
  pAddDashed(l, x, 0xe11d48, 0.75)

  pAddArrow(zero, l, 0x8b5cf6, 'l=Px=(1,0,0)', 0.95)
  pAddArrow(zero, m, 0xe11d48, 'm=x-l=(1,2,1)∈M', 0.75)

  const lab = pMakeLabel('x = l + m', 'proj3d-lbl')
  lab.position.copy(pToV3(x).clone().multiplyScalar(0.48).add(new THREE.Vector3(0.08, 0.12, 0.04)))
  pSceneLayer.add(lab)
}

function pRenderScene() {
  if (!pSceneLayer) return
  pClearLayer()

  // X-axis (L subspace) — orange
  pAddArrow([-0.5, 0, 0], [3, 0, 0], 0xf97316, 'L = x轴', 0.9)

  // M plane visualization — translucent parallelogram surface + basis arrows
  pAddMPlanePatch()
  pAddArrow([0, 0, 0], pData.m1, 0xe11d48, 'm₁=(1,1,0)', 0.65)
  pAddArrow([0, 0, 0], pData.m2, 0xe11d48, 'm₂=(0,1,1)', 0.6)

  // Vector x — blue (always shown)
  if (proj3dStep.value >= 0) {
    pAddArrow([0, 0, 0], pData.x, 0x3b82f6, 'x=(2,2,1)', 1)
  }

  // Orthogonal projection — green
  if (proj3dStep.value >= 1 && showProj3dOrtho.value) {
    pAddArrow([0, 0, 0], pOrtho, 0x10b981, 'P_ortho·x=(2,0,0)', 0.95)
    pAddDashed(pData.x, pOrtho, 0x10b981, 0.55)
  }

  // Oblique projection — x = l + m decomposition
  if (proj3dStep.value >= 2 && showProj3dOblq.value) {
    pAddDecompositionParallelogram()
  }
}

function pInitScene() {
  if (!proj3dViewport.value || pScene) return
  pScene = new THREE.Scene()
  pScene.background = new THREE.Color(0xf8fafc)

  pCamera = new THREE.PerspectiveCamera(44, 1, 0.1, 100)
  pCamera.position.set(5.0, 3.8, 5.8)

  pRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
  pRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  pRenderer.domElement.className = 'proj3d-canvas'
  proj3dViewport.value.appendChild(pRenderer.domElement)

  pLabelRenderer = new CSS2DRenderer()
  pLabelRenderer.domElement.className = 'proj3d-label-layer'
  proj3dViewport.value.appendChild(pLabelRenderer.domElement)

  pControls = new OrbitControls(pCamera, pRenderer.domElement)
  pControls.enableDamping = true; pControls.dampingFactor = 0.08
  pControls.target.set(0.8, 0.5, 0.5)
  pControls.minDistance = 2; pControls.maxDistance = 14
  pControls.enablePan = true

  pScene.add(new THREE.HemisphereLight(0xffffff, 0xdbeafe, 2.5))
  const grid = new THREE.GridHelper(6, 12, 0xcbd5e1, 0xe2e8f0)
  grid.position.y = -0.02; pScene.add(grid)

  // Axes
  const axes = [
    { v: [3.2, 0, 0], c: 0x94a3b8, lb: 'x' },
    { v: [0, 3.2, 0], c: 0x94a3b8, lb: 'z' },
    { v: [0, 0, 3.2], c: 0x94a3b8, lb: 'y' }
  ]
  axes.forEach(a => {
    const e = new THREE.Vector3(...a.v)
    pScene.add(new THREE.ArrowHelper(e.clone().normalize(), new THREE.Vector3(0,0,0), e.length(), a.c, 0.1, 0.07))
    const l = pMakeLabel(a.lb, 'proj3d-lbl-axis')
    l.position.copy(e.multiplyScalar(1.05)); pScene.add(l)
  })

  pSceneLayer = new THREE.Group(); pScene.add(pSceneLayer)

  pResizeObserver = new ResizeObserver(() => {
    if (!proj3dViewport.value || !pCamera || !pRenderer || !pLabelRenderer) return
    const r = proj3dViewport.value.getBoundingClientRect()
    const w = Math.max(r.width, 320), h = Math.max(r.height, 320)
    pCamera.aspect = w / h; pCamera.updateProjectionMatrix()
    pRenderer.setSize(w, h); pLabelRenderer.setSize(w, h)
  })
  pResizeObserver.observe(proj3dViewport.value)
  pRenderScene()
  pDrawFrame()
}

function pDrawFrame() {
  if (!pRenderer || !pScene || !pCamera) return
  pControls?.update()
  pRenderer.render(pScene, pCamera)
  pLabelRenderer?.render(pScene, pCamera)
  proj3dRafId = requestAnimationFrame(pDrawFrame)
}

function pDisposeScene() {
  if (proj3dRafId) cancelAnimationFrame(proj3dRafId)
  if (proj3dAnimateId) clearTimeout(proj3dAnimateId)
  pResizeObserver?.disconnect(); pControls?.dispose()
  pClearLayer()
  pScene?.traverse(o => { o.geometry?.dispose?.(); if (Array.isArray(o.material)) o.material.forEach(m => m.dispose?.()); else o.material?.dispose?.() })
  pRenderer?.dispose(); pRenderer?.domElement?.remove()
  pLabelRenderer?.domElement?.remove()
  pScene = null; pCamera = null; pRenderer = null; pLabelRenderer = null; pControls = null; pSceneLayer = null; pResizeObserver = null
}

function pApplyStep(s) {
  proj3dStep.value = Math.max(0, Math.min(proj3dMaxStep, s))
  const texts = [
    '点击步进：拖动旋转视角，滚轮缩放',
    '步骤1：正交投影——向量 x 垂直投影到 x 轴，绿色为投影结果 (2,0,0)',
    '步骤2：斜投影——x 分解为 l+m，l=(1,0,0)在x轴上，m=(1,2,1)在M平面中'
  ]
  proj3dStepText.value = texts[proj3dStep.value]
  pRenderScene()
}

function proj3dAdvanceStep() { pApplyStep(proj3dStep.value + 1) }
function proj3dPlay() {
  if (proj3dStep.value >= proj3dMaxStep) pApplyStep(0)
  proj3dPlaying.value = true
  async function loop() {
    if (!proj3dPlaying.value) return
    if (proj3dStep.value < proj3dMaxStep) { pApplyStep(proj3dStep.value + 1); proj3dAnimateId = setTimeout(loop, 3000) }
    else proj3dPlaying.value = false
  }
  loop()
}
function proj3dPause() { proj3dPlaying.value = false; if (proj3dAnimateId) clearTimeout(proj3dAnimateId) }
function proj3dReset() { proj3dPause(); pApplyStep(0) }

onMounted(() => { nextTick(pInitScene) })
onUnmounted(() => { proj3dPause(); pDisposeScene() })

// ====== Animation 1: Orthogonal vs Oblique Projection ======
const obliqueAngle = ref(60)
const playing1 = ref(false)
let rafId1 = null
let t1 = ref(0)
const lineAngleRad = Math.PI / 6 // 30 degrees - the subspace L direction

// x vector endpoint (fixed for demo)
const xVec = { x: 80, y: 120 } // relative to origin

const cosL = Math.cos(lineAngleRad)
const sinL = Math.sin(lineAngleRad)

// Orthogonal projection onto L (line at angle lineAngleRad)
const px = ref(xVec.x)
const py = ref(xVec.y)
const opx = computed(() => {
  const dot = px.value * cosL + py.value * sinL
  return dot * cosL
})
const opy = computed(() => {
  const dot = px.value * cosL + py.value * sinL
  return dot * sinL
})

// Oblique projection: project along direction at angle obliqueAngle from horizontal
const obpx = computed(() => {
  const theta = (obliqueAngle.value * Math.PI) / 180
  const dx = Math.cos(theta)
  const dy = Math.sin(theta)
  const denom = dx * sinL - dy * cosL
  if (Math.abs(denom) < 0.001) return opx.value
  const t = (py.value * cosL - px.value * sinL) / denom
  return px.value + t * dx
})
const obpy = computed(() => {
  const theta = (obliqueAngle.value * Math.PI) / 180
  const dx = Math.cos(theta)
  const dy = Math.sin(theta)
  const denom = dx * sinL - dy * cosL
  if (Math.abs(denom) < 0.001) return opy.value
  const t = (py.value * cosL - px.value * sinL) / denom
  return py.value + t * dy
})

const animate1 = () => {
  t1.value += 0.008
  const ang = t1.value * 0.5
  px.value = 60 * Math.cos(ang) + 100 * Math.cos(ang + 0.5)
  py.value = 60 * Math.sin(ang) + 80 * Math.sin(ang + 0.3)
  rafId1 = requestAnimationFrame(animate1)
}
const play1 = () => { if (!playing1.value) { playing1.value = true; animate1() } }
const pause1 = () => { playing1.value = false; if (rafId1) cancelAnimationFrame(rafId1) }
const reset1 = () => {
  pause1(); t1.value = 0
  px.value = xVec.x; py.value = xVec.y
  obliqueAngle.value = 60
}

// ====== Animation 2: Idempotency P²=P ======
const playing2 = ref(false)
let rafId2 = null
const stage2 = ref(0)
const x2px = 140
const x2py = 100
const x2Vec = { x: 140, y: 100 }
const px1x = ref(0)
const px1y = ref(0)
const ppx = ref(0)
const ppy = ref(0)
const projAlpha1 = ref(0)
const projAlpha2 = ref(0)
let t2 = 0

const animate2 = () => {
  t2 += 0.015
  if (t2 < 1) {
    stage2.value = 1
    const progress = Math.min(t2, 1)
    px1x.value = x2Vec.x
    px1y.value = x2Vec.y * (1 - easeOutCubic(progress))
    projAlpha1.value = easeOutCubic(progress)
    ppx.value = 0; ppy.value = 0; projAlpha2.value = 0
  } else if (t2 < 2) {
    stage2.value = 2
    projAlpha1.value = 1
    px1x.value = x2Vec.x; px1y.value = 0
    const progress = easeOutCubic(Math.min((t2 - 1), 1))
    ppx.value = x2Vec.x * progress
    ppy.value = 0
    projAlpha2.value = progress
  } else {
    stage2.value = 2
    projAlpha1.value = 1; projAlpha2.value = 1
    px1x.value = x2Vec.x; px1y.value = 0
    ppx.value = x2Vec.x; ppy.value = 0
  }
  rafId2 = requestAnimationFrame(animate2)
}
const play2 = () => { if (!playing2.value) { playing2.value = true; t2 = 0; animate2() } }
const pause2 = () => { playing2.value = false; if (rafId2) cancelAnimationFrame(rafId2) }
const reset2 = () => {
  pause2(); t2 = 0; stage2.value = 0
  px1x.value = 0; px1y.value = 0; ppx.value = 0; ppy.value = 0
  projAlpha1.value = 0; projAlpha2.value = 0
}

// ====== Animation 3: Direct sum decomposition ======
const playing3 = ref(false)
let rafId3 = null
let t3 = 0
const decomp3 = ref(0)
const x3x = 120
const x3y = 80
const px3 = ref(0)

const animate3 = () => {
  t3 += 0.012
  const p = Math.min(t3, 1)
  decomp3.value = easeOutCubic(p)
  px3.value = x3x * decomp3.value
  rafId3 = requestAnimationFrame(animate3)
}
const play3 = () => { if (!playing3.value) { playing3.value = true; t3 = 0; animate3() } }
const pause3 = () => { playing3.value = false; if (rafId3) cancelAnimationFrame(rafId3) }
const reset3 = () => {
  pause3(); t3 = 0; decomp3.value = 0; px3.value = 0
}

// Helper
function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3) }

function arrowHead(x, y, angle, color) {
  const size = 8
  const a1 = angle + Math.PI - 0.4
  const a2 = angle + Math.PI + 0.4
  const p1x = x + size * Math.cos(a1)
  const p1y = y + size * Math.sin(a1)
  const p2x = x + size * Math.cos(a2)
  const p2y = y + size * Math.sin(a2)
  return `${x},${y} ${p1x},${p1y} ${p2x},${p2y}`
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

/* 投影对比卡片 */
.compare-project {
  display: flex;
  gap: 16px;
  margin: 18px 0;
}
.cp-card {
  flex: 1;
  padding: 16px 18px;
  border-radius: 12px;
  border: 1.5px solid #e2e8f0;
  background: #fff;
}
.cp-card-ortho { border-color: #10b981; background: #f0fdf6; }
.cp-card-oblq { border-color: #8b5cf6; background: #faf5ff; }
.cp-title { font-size: 15px; font-weight: 700; margin-bottom: 8px; }
.cp-card-ortho .cp-title { color: #059669; }
.cp-card-oblq .cp-title { color: #7c3aed; }
.cp-detail { font-size: 13px; color: #475569; margin: 4px 0; }
.cp-detail .formula-inline { font-size: 13px; }

/* 3D 投影动画 */
.proj3d-stage {
  width: min(100%, 920px);
  margin: 0 auto;
}
.proj3d-viewport {
  position: relative;
  height: clamp(360px, 52vw, 520px);
  overflow: hidden;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #f8fafc;
  touch-action: none;
}
.proj3d-canvas,
.proj3d-label-layer {
  position: absolute;
  inset: 0;
  display: block;
}
.proj3d-label-layer {
  pointer-events: none;
}
.proj3d-legend {
  display: grid;
  grid-template-columns: auto auto auto minmax(180px, 1fr) auto;
  align-items: center;
  gap: 16px;
  margin: 12px 0 0;
  padding: 14px 18px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: rgba(248, 250, 252, 0.93);
  color: #475569;
  font-size: 13px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
}
.proj3d-legend span {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}
.proj3d-legend strong {
  color: #0d9488;
  font-size: 14px;
  text-align: right;
}
.proj3d-legend em {
  color: #94a3b8;
  font-style: normal;
  text-align: right;
  white-space: nowrap;
}
.proj3d-key {
  width: 30px;
  height: 4px;
  display: inline-block;
  border-radius: 999px;
}
.proj3d-key-x { background: #3b82f6; }
.proj3d-key-o { background: #10b981; }
.proj3d-key-q { background: #8b5cf6; }
.proj3d-legend .is-muted {
  opacity: 0.35;
}
.proj3d-mode-control {
  font-size: 12px;
  color: #64748b;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.proj3d-select {
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 4px 8px;
  background: #fff;
  color: #334155;
  font-size: 12px;
  cursor: pointer;
}
:deep(.formula-block), :deep(.formula-inline) { overflow-x: auto; }

:deep(.proj3d-label) {
  padding: 2px 7px;
  border-radius: 6px;
  background: rgba(248, 250, 252, 0.88);
  color: #0f172a;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.08);
  user-select: none;
}
:deep(.proj3d-lbl) { color: #1e293b; }
:deep(.proj3d-lbl-m) { color: #be123c; font-size: 11px; }
:deep(.proj3d-lbl-axis) {
  background: transparent; color: #94a3b8; box-shadow: none; font-size: 14px;
}
</style>
