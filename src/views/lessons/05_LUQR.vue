<template>
  <LessonLayout :lesson-id="5" title="三角分解与QR分解" subtitle="LU & QR Decomposition">

    <!-- 1. LU分解概念 -->
    <Section title="LU分解：Gauss消元的矩阵记录" :num="1">
      <p>
        LU分解是将矩阵 <span class="formula-inline">A</span> 分解为一个单位下三角矩阵 <span class="formula-inline">L</span>
        和一个上三角矩阵 <span class="formula-inline">U</span> 的乘积，即：
      </p>
      <Formula>A = LU</Formula>
      <p>其中：</p>
      <ul>
        <li><span class="formula-inline">L</span> —— 单位下三角矩阵（对角线元素均为1），记录Gauss消元过程中使用的乘数；</li>
        <li><span class="formula-inline">U</span> —— 上三角矩阵，即消元后的结果。</li>
      </ul>

      <Theorem title="LU分解存在定理" type="theorem" icon="📌">
        若 <span class="formula-inline">n</span> 阶矩阵 <span class="formula-inline">A</span> 的顺序主子式
        <span class="formula-inline">\Delta_k \neq 0\ (k=1,2,\ldots,n-1)</span>，
        则 <span class="formula-inline">A</span> 可以唯一分解为 <span class="formula-inline">A = LU</span>，
        其中 <span class="formula-inline">L</span> 为单位下三角矩阵，<span class="formula-inline">U</span> 为上三角矩阵。
      </Theorem>

      <Theorem title="LDU分解" type="definition" icon="📖">
        将 <span class="formula-inline">U</span> 的对角线元素提出构成对角矩阵 <span class="formula-inline">D</span>，可得LDU分解：
        <Formula>A = L D U</Formula>
        其中 <span class="formula-inline">L</span> 为单位下三角，<span class="formula-inline">D</span> 为对角矩阵，
        <span class="formula-inline">U</span> 为单位上三角。当 <span class="formula-inline">A</span> 对称正定时，
        <span class="formula-inline">U = L\T</span>，得到Cholesky分解 <span class="formula-inline">A = LL\T</span>。
      </Theorem>
    </Section>

    <!-- 2. LU消元动画 -->
    <Section title="动画：LU消元过程可视化" :num="2">
      <p>点击"播放"观察3×3矩阵Gauss消元过程：逐列将主元下方元素清零，乘数填入 <span class="formula-inline">L</span>，消元结果留在 <span class="formula-inline">U</span>。</p>

      <AnimationBox
        title="LU分解逐列消元动画"
        :playing="luPlaying"
        description="红色高亮显示当前消元列，绿色数字为填入L的乘数，U逐步变为上三角"
        @play="luPlay"
        @pause="luPause"
        @reset="luReset"
      >
        <svg :width="luSvgWidth" :height="340" viewBox="0 0 700 340">
          <!-- 背景网格 -->
          <defs>
            <linearGradient id="luGradA" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#e0f2fe"/>
              <stop offset="100%" stop-color="#ccfbf1"/>
            </linearGradient>
            <linearGradient id="luGradL" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#dbeafe"/>
              <stop offset="100%" stop-color="#e0e7ff"/>
            </linearGradient>
            <linearGradient id="luGradU" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#fef3c7"/>
              <stop offset="100%" stop-color="#fde68a"/>
            </linearGradient>
          </defs>

          <!-- A矩阵 -->
          <text x="100" y="35" text-anchor="middle" font-size="16" font-weight="bold" fill="#0d9488">A</text>
          <g transform="translate(30, 50)">
            <rect x="0" y="0" width="140" height="140" rx="8" fill="url(#luGradA)" stroke="#0d9488" stroke-width="2"/>
            <template v-for="(row, i) in luA" :key="'a'+i">
              <template v-for="(val, j) in row" :key="'a'+i+j">
                <rect :x="j*46+2" :y="i*46+2" width="42" height="42" rx="4"
                  :fill="luHighlight(i,j) ? '#fca5a5' : (luZeroOut(i,j) ? '#d1fae5' : '#ffffff')"
                  :stroke="luHighlight(i,j) ? '#ef4444' : '#94a3b8'" stroke-width="1"/>
                <text :x="j*46+23" :y="i*46+28" text-anchor="middle" font-size="16" font-weight="600"
                  :fill="luZeroOut(i,j) ? '#059669' : '#1e293b'">{{ luDisplayVal(val) }}</text>
              </template>
            </template>
          </g>
          <text x="100" y="210" text-anchor="middle" font-size="13" fill="#64748b">原始矩阵</text>

          <!-- = 符号 -->
          <text x="200" y="130" font-size="36" font-weight="bold" fill="#0d9488">=</text>

          <!-- L矩阵 -->
          <text x="300" y="35" text-anchor="middle" font-size="16" font-weight="bold" fill="#3b82f6">L (单位下三角)</text>
          <g transform="translate(230, 50)">
            <rect x="0" y="0" width="140" height="140" rx="8" fill="url(#luGradL)" stroke="#3b82f6" stroke-width="2"/>
            <template v-for="i in 3" :key="'lr'+i">
              <template v-for="j in 3" :key="'lc'+j">
                <rect :x="(j-1)*46+2" :y="(i-1)*46+2" width="42" height="42" rx="4"
                  :fill="luLfill(i-1,j-1)" stroke="#94a3b8" stroke-width="1"/>
                <text :x="(j-1)*46+23" :y="(i-1)*46+28" text-anchor="middle" font-size="16" font-weight="600"
                  :fill="luL[i-1][j-1] !== null && i-1 > j-1 ? '#059669' : '#1e293b'">{{ luLdisplay(i-1,j-1) }}</text>
              </template>
            </template>
          </g>
          <text x="300" y="210" text-anchor="middle" font-size="13" fill="#64748b">乘数填入L</text>

          <!-- × 符号 -->
          <text x="400" y="130" font-size="28" font-weight="bold" fill="#0d9488">×</text>

          <!-- U矩阵 -->
          <text x="500" y="35" text-anchor="middle" font-size="16" font-weight="bold" fill="#d97706">U (上三角)</text>
          <g transform="translate(430, 50)">
            <rect x="0" y="0" width="140" height="140" rx="8" fill="url(#luGradU)" stroke="#d97706" stroke-width="2"/>
            <template v-for="(row, i) in luU" :key="'ur'+i">
              <template v-for="(val, j) in row" :key="'uc'+i+j">
                <rect :x="j*46+2" :y="i*46+2" width="42" height="42" rx="4"
                  :fill="i > j && val === 0 ? '#e2e8f0' : '#ffffff'" stroke="#94a3b8" stroke-width="1"/>
                <text :x="j*46+23" :y="i*46+28" text-anchor="middle" font-size="16" font-weight="600"
                  :fill="i > j && val === 0 ? '#94a3b8' : '#1e293b'">{{ i > j && val === 0 ? '0' : luDisplayVal(val) }}</text>
              </template>
            </template>
          </g>
          <text x="500" y="210" text-anchor="middle" font-size="13" fill="#64748b">消元结果</text>

          <!-- 步骤说明 -->
          <rect x="30" y="240" width="640" height="80" rx="10" fill="#f0fdfa" stroke="#14b8a6" stroke-width="1.5"/>
          <text x="350" y="268" text-anchor="middle" font-size="15" font-weight="600" fill="#0d9488">{{ luStepText }}</text>
          <text x="350" y="295" text-anchor="middle" font-size="13" fill="#475569">{{ luStepDetail }}</text>
          <text x="350" y="315" text-anchor="middle" font-size="12" fill="#94a3b8">步骤 {{ luStep }} / 6</text>
        </svg>
      </AnimationBox>
    </Section>

    <!-- 3. QR分解概念 -->
    <Section title="QR分解：正交三角化" :num="3">
      <p>
        QR分解将矩阵 <span class="formula-inline">A</span> 分解为正交矩阵 <span class="formula-inline">Q</span>
        和上三角矩阵 <span class="formula-inline">R</span> 的乘积：
      </p>
      <Formula>A = QR</Formula>
      <ul>
        <li><span class="formula-inline">Q</span> —— 正交矩阵，满足 <span class="formula-inline">Q\T Q = QQ\T = I</span>，列向量组为标准正交基；</li>
        <li><span class="formula-inline">R</span> —— 上三角矩阵。</li>
      </ul>

      <Theorem title="QR分解存在性" type="theorem" icon="📌">
        设 <span class="formula-inline">A \in \R^{m \times n}</span> 且列满秩 <span class="formula-inline">(m \geq n)</span>，
        则 <span class="formula-inline">A</span> 可唯一分解为 <span class="formula-inline">A = QR</span>，
        其中 <span class="formula-inline">Q \in \R^{m \times n}</span> 满足 <span class="formula-inline">Q\T Q = I</span>，
        <span class="formula-inline">R \in \R^{n \times n}</span> 为对角元为正的上三角矩阵。
      </Theorem>

      <h3>方法一：Gram-Schmidt 正交化</h3>
      <p>对 <span class="formula-inline">A</span> 的列向量 <span class="formula-inline">a_1, a_2, \ldots, a_n</span> 依次做正交化：</p>
      <div class="formula-block">
        \begin{aligned}
        b_1 &= a_1 \\
        b_2 &= a_2 - \frac{(a_2, b_1)}{(b_1, b_1)} b_1 \\
        b_3 &= a_3 - \frac{(a_3, b_1)}{(b_1, b_1)} b_1 - \frac{(a_3, b_2)}{(b_2, b_2)} b_2 \\
        &\vdots \\
        b_k &= a_k - \sum_{j=1}^{k-1} \frac{(a_k, b_j)}{(b_j, b_j)} b_j
        \end{aligned}
      </div>
      <p>单位化 <span class="formula-inline">q_i = b_i / \|b_i\|</span>，则 <span class="formula-inline">Q = [q_1\ q_2\ \cdots\ q_n]</span>，
      <span class="formula-inline">R</span> 的元素 <span class="formula-inline">r_{ij} = (a_j, q_i)\ (i \leq j)</span>。</p>
    </Section>

    <!-- 4. Gram-Schmidt动画 -->
    <Section title="动画：Gram-Schmidt正交化过程" :num="4">
      <p>在 <span class="formula-inline">\R^3</span> 中观察3个向量逐步正交化的过程：先取第一个向量，第二个向量减去在第一个上的投影，第三个向量减去在前两个正交方向上的投影。橙色虚线显示被减去的投影分量。</p>

      <AnimationBox
        title="Gram-Schmidt正交化 (R³)"
        :playing="gsPlaying"
        description="蓝色为原始向量aᵢ，绿色为正交向量bᵢ，橙色虚线为被减去的投影分量"
        @play="gsPlay"
        @pause="gsPause"
        @reset="gsReset"
      >
        <svg :width="gsSvgWidth" height="380" viewBox="0 0 700 380">
          <!-- 3D坐标系 -->
          <g transform="translate(350, 200)">
            <!-- 坐标轴 -->
            <line x1="-180" y1="90" x2="180" y2="-90" stroke="#cbd5e1" stroke-width="1.5"/>
            <line x1="-180" y1="-30" x2="180" y2="30" stroke="#cbd5e1" stroke-width="1.5"/>
            <line x1="0" y1="-150" x2="0" y2="150" stroke="#cbd5e1" stroke-width="1.5"/>
            <text x="190" y="-90" font-size="12" fill="#94a3b8">x</text>
            <text x="190" y="35" font-size="12" fill="#94a3b8">y</text>
            <text x="8" y="-155" font-size="12" fill="#94a3b8">z</text>

            <!-- 原始向量 a1, a2, a3 (蓝色) -->
            <template v-for="(v, idx) in gsA" :key="'a'+idx">
              <line v-if="gsStep >= idx" x1="0" y1="0" :x2="gsProject(v,0).x" :y2="gsProject(v,0).y"
                stroke="#3b82f6" stroke-width="2.5" opacity="0.5"/>
              <circle v-if="gsStep >= idx" :cx="gsProject(v,0).x" :cy="gsProject(v,0).y" r="4" fill="#3b82f6"/>
              <text v-if="gsStep >= idx" :x="gsProject(v,0).x + 8" :y="gsProject(v,0).y" font-size="12" fill="#3b82f6" font-weight="600">a{{ idx+1 }}</text>
            </template>

            <!-- 正交向量 b1 (绿色) -->
            <template v-if="gsStep >= 1">
              <line x1="0" y1="0" :x2="gsProject(gsB[0], gsScale).x" :y2="gsProject(gsB[0], gsScale).y"
                stroke="#059669" stroke-width="3"/>
              <circle :cx="gsProject(gsB[0], gsScale).x" :cy="gsProject(gsB[0], gsScale).y" r="5" fill="#059669"/>
              <text :x="gsProject(gsB[0], gsScale).x + 8" :y="gsProject(gsB[0], gsScale).y" font-size="13" fill="#059669" font-weight="700">b₁</text>
            </template>

            <!-- b2的投影分量（橙色虚线） -->
            <template v-if="gsStep >= 2">
              <!-- proj_b1(a2) 橙色虚线 -->
              <line v-if="gsProj1" x1="0" y1="0" :x2="gsProject(gsProj1, gsScale).x" :y2="gsProject(gsProj1, gsScale).y"
                stroke="#f97316" stroke-width="2" stroke-dasharray="6,4"/>
              <line :x1="gsProject(gsProj1, gsScale).x" :y1="gsProject(gsProj1, gsScale).y"
                :x2="gsProject(gsA[1],0).x" :y2="gsProject(gsA[1],0).y"
                stroke="#f97316" stroke-width="1.5" stroke-dasharray="4,3" opacity="0.6"/>
              <!-- b2 -->
              <line x1="0" y1="0" :x2="gsProject(gsB[1], gsScale).x" :y2="gsProject(gsB[1], gsScale).y"
                stroke="#059669" stroke-width="3"/>
              <circle :cx="gsProject(gsB[1], gsScale).x" :cy="gsProject(gsB[1], gsScale).y" r="5" fill="#059669"/>
              <text :x="gsProject(gsB[1], gsScale).x + 8" :y="gsProject(gsB[1], gsScale).y" font-size="13" fill="#059669" font-weight="700">b₂</text>
            </template>

            <!-- b3的投影分量 -->
            <template v-if="gsStep >= 3">
              <line v-if="gsProj2a" x1="0" y1="0" :x2="gsProject(gsProj2a, gsScale).x" :y2="gsProject(gsProj2a, gsScale).y"
                stroke="#f97316" stroke-width="2" stroke-dasharray="6,4"/>
              <line v-if="gsProj2b" :x1="gsProject(gsProj2a, gsScale).x" :y1="gsProject(gsProj2a, gsScale).y"
                :x2="gsProject([gsProj2a[0]+gsProj2b[0], gsProj2a[1]+gsProj2b[1], gsProj2a[2]+gsProj2b[2]], gsScale).x"
                :y2="gsProject([gsProj2a[0]+gsProj2b[0], gsProj2a[1]+gsProj2b[1], gsProj2a[2]+gsProj2b[2]], gsScale).y"
                stroke="#f97316" stroke-width="2" stroke-dasharray="6,4"/>
              <line :x1="gsProject([gsProj2a[0]+gsProj2b[0], gsProj2a[1]+gsProj2b[1], gsProj2a[2]+gsProj2b[2]], gsScale).x"
                :y1="gsProject([gsProj2a[0]+gsProj2b[0], gsProj2a[1]+gsProj2b[1], gsProj2a[2]+gsProj2b[2]], gsScale).y"
                :x2="gsProject(gsA[2],0).x" :y2="gsProject(gsA[2],0).y"
                stroke="#f97316" stroke-width="1.5" stroke-dasharray="4,3" opacity="0.6"/>
              <!-- b3 -->
              <line x1="0" y1="0" :x2="gsProject(gsB[2], gsScale).x" :y2="gsProject(gsB[2], gsScale).y"
                stroke="#059669" stroke-width="3"/>
              <circle :cx="gsProject(gsB[2], gsScale).x" :cy="gsProject(gsB[2], gsScale).y" r="5" fill="#059669"/>
              <text :x="gsProject(gsB[2], gsScale).x + 8" :y="gsProject(gsB[2], gsScale).y" font-size="13" fill="#059669" font-weight="700">b₃</text>
            </template>

            <!-- 正交标记 -->
            <template v-if="gsStep >= 2">
              <text x="-160" y="-130" font-size="11" fill="#059669">✓ b₁ ⊥ b₂</text>
            </template>
            <template v-if="gsStep >= 3">
              <text x="-160" y="-115" font-size="11" fill="#059669">✓ b₁ ⊥ b₃</text>
              <text x="-160" y="-100" font-size="11" fill="#059669">✓ b₂ ⊥ b₃</text>
            </template>
          </g>

          <!-- 图例 -->
          <rect x="20" y="310" width="660" height="55" rx="8" fill="#f8fafc" stroke="#e2e8f0"/>
          <line x1="40" y1="330" x2="70" y2="330" stroke="#3b82f6" stroke-width="2.5"/>
          <text x="78" y="335" font-size="12" fill="#475569">原始向量 aᵢ</text>
          <line x1="180" y1="330" x2="210" y2="330" stroke="#059669" stroke-width="3"/>
          <text x="218" y="335" font-size="12" fill="#475569">正交向量 bᵢ</text>
          <line x1="320" y1="330" x2="350" y2="330" stroke="#f97316" stroke-width="2" stroke-dasharray="6,4"/>
          <text x="358" y="335" font-size="12" fill="#475569">投影分量(被减去)</text>
          <text x="500" y="335" font-size="13" font-weight="600" fill="#0d9488">{{ gsStepText }}</text>
          <text x="350" y="358" text-anchor="middle" font-size="12" fill="#94a3b8">步骤 {{ gsStep }} / 3</text>
        </svg>
      </AnimationBox>
    </Section>

    <!-- 5. Householder -->
    <Section title="方法二：Householder反射" :num="5">
      <p>Gram-Schmidt数值稳定性较差，实际计算中常用Householder反射进行QR分解。</p>

      <Theorem title="Householder矩阵（初等反射矩阵）" type="definition" icon="📖">
        设单位向量 <span class="formula-inline">u \in \R^n</span>，则Householder矩阵定义为：
        <Formula>H = I - \frac{2uu\T}{u\T u} = I - 2uu\T</Formula>
        （第二个等号在 <span class="formula-inline">\|u\|=1</span> 时成立）。<br/>
        性质：<span class="formula-inline">H</span> 是对称正交矩阵（<span class="formula-inline">H\T = H</span>，<span class="formula-inline">H\T H = I</span>），
        且 <span class="formula-inline">\det(H) = -1</span>。
      </Theorem>

      <p>
        <strong>核心思想：</strong>给定向量 <span class="formula-inline">x</span>，取
        <span class="formula-inline">u = x + \sign(x_1)\|x\| e_1</span>，
        则 <span class="formula-inline">Hx = -\sign(x_1)\|x\| e_1</span>，
        即通过一次镜面反射将 <span class="formula-inline">x</span> 映射到与 <span class="formula-inline">e_1</span> 平行的方向，
        从而将 <span class="formula-inline">x</span> 除第一个分量外全部清零。
      </p>
    </Section>

    <!-- 6. Householder动画 -->
    <Section title="动画：Householder反射清零" :num="6">
      <p>观察向量 <span class="formula-inline">x</span> 经Householder反射映射到 <span class="formula-inline">e_1</span> 方向的过程，镜面法向量 <span class="formula-inline">u</span> 以紫色显示。</p>

      <AnimationBox
        title="Householder反射几何直观"
        :playing="hhPlaying"
        description="红色向量x经紫色镜面反射后映射到绿色的-σe₁方向，镜面垂直于u（紫色法向量）"
        @play="hhPlay"
        @pause="hhPause"
        @reset="hhReset"
      >
        <svg :width="hhSvgWidth" height="380" viewBox="0 0 700 380">
          <g transform="translate(350, 200)">
            <!-- 坐标轴 -->
            <line x1="-280" y1="0" x2="280" y2="0" stroke="#e2e8f0" stroke-width="1"/>
            <line x1="0" y1="-170" x2="0" y2="170" stroke="#e2e8f0" stroke-width="1"/>
            <text x="285" y="5" font-size="13" fill="#94a3b8">e₁方向</text>
            <text x="5" y="-175" font-size="13" fill="#94a3b8">e₂方向</text>
            <polygon points="280,0 272,-5 272,5" fill="#94a3b8"/>
            <polygon points="0,-170 -5,-162 5,-162" fill="#94a3b8"/>

            <!-- 镜面（垂直于u的直线） -->
            <line v-if="hhStep >= 1"
              :x1="hhMirror[0].x" :y1="hhMirror[0].y"
              :x2="hhMirror[1].x" :y2="hhMirror[1].y"
              stroke="#8b5cf6" stroke-width="2.5" stroke-dasharray="8,4"/>
            <text v-if="hhStep >= 1" :x="hhMirror[1].x + 5" :y="hhMirror[1].y" font-size="12" fill="#8b5cf6" font-weight="600">镜面 (u⊥)</text>

            <!-- u向量（法向量）紫色 -->
            <template v-if="hhStep >= 1">
              <line x1="0" y1="0" :x2="hhU[0]*80" :y2="-hhU[1]*80" stroke="#8b5cf6" stroke-width="2.5"/>
              <circle :cx="hhU[0]*80" :cy="-hhU[1]*80" r="4" fill="#8b5cf6"/>
              <text :x="hhU[0]*80 + 8" :y="-hhU[1]*80 + 4" font-size="13" fill="#8b5cf6" font-weight="700">u</text>
            </template>

            <!-- 反射前向量x（红色） -->
            <template v-if="hhStep <= 2">
              <line x1="0" y1="0" :x2="hhX[0]*100" :y2="-hhX[1]*100" stroke="#ef4444" stroke-width="3" :opacity="hhStep === 2 ? (1 - hhT) : 1"/>
              <circle :cx="hhX[0]*100" :cy="-hhX[1]*100" r="5" fill="#ef4444" :opacity="hhStep === 2 ? (1 - hhT) : 1"/>
              <text :x="hhX[0]*100 + 8" :y="-hhX[1]*100" font-size="14" fill="#ef4444" font-weight="700" :opacity="hhStep === 2 ? (1 - hhT) : 1">x</text>
            </template>

            <!-- 反射中间过程 -->
            <template v-if="hhStep === 2">
              <line x1="0" y1="0" :x2="hhReflected[0]*100" :y2="-hhReflected[1]*100" stroke="#f97316" stroke-width="2.5" stroke-dasharray="5,3"/>
              <circle :cx="hhReflected[0]*100" :cy="-hhReflected[1]*100" r="4" fill="#f97316"/>
            </template>

            <!-- 反射后向量 -σe1（绿色） -->
            <template v-if="hhStep >= 2">
              <line x1="0" y1="0" :x2="hhHx[0]*100" :y2="-hhHx[1]*100" stroke="#059669" stroke-width="3" :opacity="hhStep === 2 ? hhT : 1"/>
              <circle :cx="hhHx[0]*100" :cy="-hhHx[1]*100" r="5" fill="#059669" :opacity="hhStep === 2 ? hhT : 1"/>
              <text :x="hhHx[0]*100 - 30" :y="-hhHx[1]*100 - 8" font-size="13" fill="#059669" font-weight="700" :opacity="hhStep === 2 ? hhT : 1">Hx = -σe₁</text>
            </template>

            <!-- 反射弧 -->
            <template v-if="hhStep === 2">
              <path :d="hhArc" fill="none" stroke="#f97316" stroke-width="1.5" stroke-dasharray="3,3"/>
            </template>
          </g>

          <!-- 信息板 -->
          <rect x="20" y="280" width="660" height="80" rx="10" fill="#f0fdfa" stroke="#14b8a6" stroke-width="1.5"/>
          <text x="350" y="308" text-anchor="middle" font-size="15" font-weight="600" fill="#0d9488">{{ hhStepText }}</text>
          <text x="350" y="330" text-anchor="middle" font-size="13" fill="#475569">x = ({{ hhX[0].toFixed(1) }}, {{ hhX[1].toFixed(1) }}),  σ = sign(x₁)‖x‖ = {{ hhSigma.toFixed(2) }},  u = x + σe₁</text>
          <text x="350" y="350" text-anchor="middle" font-size="12" fill="#94a3b8">步骤 {{ hhStep }} / 3</text>
        </svg>
      </AnimationBox>
    </Section>

    <!-- 7. 例题 -->
    <Section title="真题精讲" :num="7">
      <ExampleBox source="研究生矩阵论考试真题" badge="📝 真题例题">
        <template #problem>
          <p>用Householder变换求矩阵
            <span class="formula-inline">A = \begin{pmatrix} 0 & 4 & 1 \\ 1 & 1 & 3 \\ 1 & 1 & -1 \end{pmatrix}</span>
            的QR分解。
          </p>
        </template>
        <template #solution>
          <div class="step">
            <span class="step-num">1</span>
            <div>
              <p><strong>第一步：构造 <span class="formula-inline">H_1</span> 消去第一列次对角元</strong></p>
              <p>取第一列 <span class="formula-inline">x = (0, 1, 1)\T</span>，则
              <span class="formula-inline">\|x\| = \sqrt{0^2+1^2+1^2} = \sqrt{2}</span>，
              <span class="formula-inline">\sign(x_1) = \sign(0) = 1</span>（按惯例取正），故
              <span class="formula-inline">\sigma_1 = \sqrt{2}</span>。</p>
              <p><span class="formula-inline">u_1 = x + \sigma_1 e_1 = (\sqrt{2}, 1, 1)\T</span>，
              <span class="formula-inline">\|u_1\|^2 = 2+1+1 = 4</span></p>
              <p><span class="formula-inline">H_1 = I - \frac{2u_1 u_1\T}{4} = I - \frac{1}{2}u_1 u_1\T</span></p>
              <p>计算得 <span class="formula-inline">H_1 = \begin{pmatrix} 0 & 1/\sqrt{2} & 1/\sqrt{2} \\ 1/\sqrt{2} & 1/2 & -1/2 \\ 1/\sqrt{2} & -1/2 & 1/2 \end{pmatrix}</span></p>
            </div>
          </div>
          <div class="step">
            <span class="step-num">2</span>
            <div>
              <p><strong>计算 <span class="formula-inline">H_1 A</span>：</strong></p>
              <div class="formula-block">
                H_1 A = \begin{pmatrix} \sqrt{2} & \sqrt{2} & \sqrt{2} \\ 0 & 3\sqrt{2}/2 & \sqrt{2} \\ 0 & 3\sqrt{2}/2 & -2\sqrt{2}/2 \end{pmatrix}
              </div>
            </div>
          </div>
          <div class="step">
            <span class="step-num">3</span>
            <div>
              <p><strong>第二步：对右下角2×2子块构造 <span class="formula-inline">H_2</span></strong></p>
              <p>取 <span class="formula-inline">\tilde{x} = (3\sqrt{2}/2, 3\sqrt{2}/2)\T</span>，
              <span class="formula-inline">\|\tilde{x}\| = 3</span>，<span class="formula-inline">\sigma_2 = 3</span></p>
              <p><span class="formula-inline">\tilde{u}_2 = \tilde{x} + 3e_1 = (3\sqrt{2}/2+3, 3\sqrt{2}/2)\T</span></p>
              <p>构造 <span class="formula-inline">\tilde{H}_2</span>，嵌入3阶矩阵得 <span class="formula-inline">H_2 = \diag(1, \tilde{H}_2)</span></p>
            </div>
          </div>
          <div class="step">
            <span class="step-num">4</span>
            <div>
              <p><strong>得到QR分解：</strong></p>
              <p><span class="formula-inline">R = H_2 H_1 A</span> 为上三角矩阵，
              <span class="formula-inline">Q = H_1 H_2</span> 为正交矩阵。</p>
              <div class="formula-block">
                Q = H_1 H_2, \quad R = H_2 H_1 A, \quad A = QR
              </div>
              <p><strong>注意：</strong>Householder方法每次消去一列中主元以下的所有元素，共需 <span class="formula-inline">n-1</span> 次反射，数值稳定性优于Gram-Schmidt。</p>
            </div>
          </div>
        </template>
      </ExampleBox>
    </Section>

    <!-- 8. 知识结构图（auto模式） -->
    <Section title="知识结构：矩阵三角分解方法谱系" :num="8">
      <p>下图自动循环展示矩阵三角分解的各类方法及其关系：</p>
      <AnimationBox
        mode="auto"
        title="矩阵分解方法关系图"
        description="脉冲高亮依次展示：Gauss消元→LU→LDU→Cholesky；Gram-Schmidt/Householder→QR"
      >
        <div class="concept-map">
          <div class="cm-root">矩阵分解</div>
          <div class="cm-branches">
            <div class="cm-branch cm-branch-lu">
              <div class="cm-node cm-n1" style="animation-delay:0s">LU分解</div>
              <div class="cm-children">
                <div class="cm-node cm-n2" style="animation-delay:1s">Gauss消元</div>
                <div class="cm-node cm-n3" style="animation-delay:2s">LDU分解</div>
                <div class="cm-node cm-n4" style="animation-delay:3s">Cholesky<br/><span class="cm-small">A=LLᵀ(正定)</span></div>
              </div>
            </div>
            <div class="cm-branch cm-branch-qr">
              <div class="cm-node cm-n5" style="animation-delay:4s">QR分解</div>
              <div class="cm-children">
                <div class="cm-node cm-n6" style="animation-delay:5s">Gram-Schmidt<br/><span class="cm-small">(正交化)</span></div>
                <div class="cm-node cm-n7" style="animation-delay:6s">Householder<br/><span class="cm-small">(反射·数值稳定)</span></div>
                <div class="cm-node cm-n8" style="animation-delay:7s">Givens旋转<br/><span class="cm-small">(平面旋转)</span></div>
              </div>
            </div>
          </div>
        </div>
      </AnimationBox>
    </Section>

    <!-- 9. 例题2：LU分解 -->
    <Section title="真题精讲（续）" :num="9">
      <ExampleBox source="教材经典习题" badge="📝 LU分解例题">
        <template #problem>
          <p>用Gauss消元法对矩阵 <span class="formula-inline">A = \begin{pmatrix} 2 & 1 & 1 \\ 4 & 3 & 3 \\ 2 & 2 & 1 \end{pmatrix}</span> 做LU分解，并用结果解方程组 <span class="formula-inline">Ax = b</span>，其中 <span class="formula-inline">b = (1,2,1)\T</span>。</p>
        </template>
        <template #solution>
          <div class="step">
            <span class="step-num">1</span>
            <div>
              <p><strong>第一步消元（第1列）：</strong></p>
              <p>主元 <span class="formula-inline">a_{11}=2</span>，乘数 <span class="formula-inline">l_{21}=a_{21}/a_{11}=4/2=2</span>，<span class="formula-inline">l_{31}=a_{31}/a_{11}=2/2=1</span>。</p>
              <p><span class="formula-inline">R_2 \leftarrow R_2 - 2R_1</span>，<span class="formula-inline">R_3 \leftarrow R_3 - R_1</span>：</p>
              <div class="formula-block">A^{(1)} = \begin{pmatrix} 2 & 1 & 1 \\ 0 & 1 & 1 \\ 0 & 1 & 0 \end{pmatrix}</div>
            </div>
          </div>
          <div class="step">
            <span class="step-num">2</span>
            <div>
              <p><strong>第二步消元（第2列）：</strong></p>
              <p>主元 <span class="formula-inline">a_{22}^{(1)}=1</span>，乘数 <span class="formula-inline">l_{32}=1/1=1</span>。</p>
              <p><span class="formula-inline">R_3 \leftarrow R_3 - R_2</span>：</p>
              <div class="formula-block">U = A^{(2)} = \begin{pmatrix} 2 & 1 & 1 \\ 0 & 1 & 1 \\ 0 & 0 & -1 \end{pmatrix}</div>
            </div>
          </div>
          <div class="step">
            <span class="step-num">3</span>
            <div>
              <p><strong>写出L和U：</strong></p>
              <div class="formula-block">L = \begin{pmatrix} 1 & 0 & 0 \\ 2 & 1 & 0 \\ 1 & 1 & 1 \end{pmatrix}, \quad U = \begin{pmatrix} 2 & 1 & 1 \\ 0 & 1 & 1 \\ 0 & 0 & -1 \end{pmatrix}</div>
            </div>
          </div>
          <div class="step">
            <span class="step-num">4</span>
            <div>
              <p><strong>解 Ly=b（前代）：</strong></p>
              <p><span class="formula-inline">y_1=1,\ y_2=2-2\cdot 1=0,\ y_3=1-1\cdot 1-1\cdot 0=0</span></p>
              <p><strong>解 Ux=y（回代）：</strong></p>
              <p><span class="formula-inline">-x_3=0\Rightarrow x_3=0,\ x_2+x_3=0\Rightarrow x_2=0,\ 2x_1+x_2+x_3=1\Rightarrow x_1=1/2</span></p>
              <p>故 <span class="formula-inline">x = (1/2, 0, 0)\T</span>。</p>
            </div>
          </div>
        </template>
      </ExampleBox>
    </Section>

    <!-- 10. 小结 -->
    <Section title="知识点小结" :num="10">
      <Steps :steps="[
        'LU分解 A=LU：L单位下三角记录Gauss乘数，U上三角为消元结果；顺序主子式非零则存在唯一。',
        'LDU分解 A=LDU：D为对角阵，对称正定时得Cholesky分解 A=LLᵀ。',
        'QR分解 A=QR：Q正交，R上三角；列满秩矩阵存在QR分解。',
        'Gram-Schmidt正交化：逐次减去投影分量得到正交基，再单位化；计算简单但数值稳定性差。',
        'Householder反射 H=I-2uuᵀ/(uᵀu)：对称正交矩阵，取u=x+sign(x₁)‖x‖e₁可将x反射到-σe₁方向，一次清零多个元素。',
        '用Householder方法做QR分解：依次对第1列到第n-1列构造反射矩阵，数值稳定性好，是实际计算的首选方法。'
      ]"/>
    </Section>

    <!-- 11. 真题与习题汇总 -->
    <Section title="🗂️ 真题与习题汇总">
      <WeekQuizBank :quizzes="quizzes" weekLabel="第2周" />
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
import { ref, onUnmounted, computed } from 'vue'

const quizzes = (quizBank[5] || []).map(q => ({ ...q, lessonNum: '05', lessonTitle: '三角分解与QR分解' }))

const renderTrigger = ref(0)
const { renderMath } = useKatex(renderTrigger)

// ========== LU消元动画 ==========
const luPlaying = ref(false)
let luAnimId = null
const luStep = ref(0)
const luSvgWidth = ref(700)

const luA0 = [
  [2, 1, 1],
  [4, 3, 3],
  [8, 7, 9]
]
const luA = ref(luA0.map(r => [...r]))
const luL = ref([[1,null,null],[null,1,null],[null,null,1]])
const luU = ref(luA0.map(r => [...r]))
const luStepText = ref('点击播放开始LU分解')
const luStepDetail = ref('')

const multipliers = [
  { i: 1, j: 0, m: 2 },
  { i: 2, j: 0, m: 4 },
  { i: 2, j: 1, m: 3 }
]

function luHighlight(i, j) {
  if (luStep.value === 0) return false
  const s = luStep.value
  if (s <= 2) return j === 0 && i > 0
  if (s <= 4) return j === 1 && i > 1
  if (s === 5) return false
  return false
}

function luZeroOut(i, j) {
  if (luStep.value >= 2 && i === 1 && j === 0) return true
  if (luStep.value >= 3 && i === 2 && j === 0) return true
  if (luStep.value >= 5 && i === 2 && j === 1) return true
  return false
}

function luDisplayVal(v) {
  if (v === null || v === undefined) return ''
  return Number.isInteger(v) ? v : v.toFixed(1)
}

function luLfill(i, j) {
  if (i === j) return '#fef3c7'
  if (i > j && luL.value[i][j] !== null) return '#d1fae5'
  return '#ffffff'
}

function luLdisplay(i, j) {
  if (i === j) return '1'
  if (luL.value[i][j] !== null) return luL.value[i][j]
  return i > j ? '?' : '0'
}

const luSteps_data = [
  { text: '初始状态：A为原始矩阵', detail: '准备对第1列消元，主元a₁₁=2' },
  { text: '消元第1列 → 第2行', detail: '乘数 l₂₁ = a₂₁/a₁₁ = 4/2 = 2，R₂ ← R₂ - 2R₁' },
  { text: '消元第1列 → 第3行', detail: '乘数 l₃₁ = a₃₁/a₁₁ = 8/2 = 4，R₃ ← R₃ - 4R₁' },
  { text: '第1列消元完成', detail: '准备对第2列消元，主元a₂₂=1' },
  { text: '消元第2列 → 第3行', detail: '乘数 l₃₂ = a₃₂/a₂₂ = 3/1 = 3，R₃ ← R₃ - 3R₂' },
  { text: 'LU分解完成！', detail: 'A = LU，L填好乘数，U为上三角' }
]

function luAdvance() {
  if (luStep.value >= 6) {
    luPlaying.value = false
    return
  }
  luStep.value++
  if (luStep.value === 1) {
    luL.value[1][0] = 2
    luA.value[1] = [0, 1, 1]
    luU.value[1] = [0, 1, 1]
  } else if (luStep.value === 2) {
    luL.value[2][0] = 4
    luA.value[2] = [0, 3, 5]
    luU.value[2] = [0, 3, 5]
  } else if (luStep.value === 4) {
    luL.value[2][1] = 3
    luA.value[2] = [0, 0, 2]
    luU.value[2] = [0, 0, 2]
  }
  const sd = luSteps_data[luStep.value]
  if (sd) {
    luStepText.value = sd.text
    luStepDetail.value = sd.detail
  }
  renderTrigger.value++
}

function luLoop() {
  if (!luPlaying.value) return
  luAdvance()
  luAnimId = setTimeout(luLoop, 1500)
}

function luPlay() {
  if (luStep.value >= 6) luReset()
  luPlaying.value = true
  luLoop()
}
function luPause() {
  luPlaying.value = false
  if (luAnimId) clearTimeout(luAnimId)
}
function luReset() {
  luPlaying.value = false
  if (luAnimId) clearTimeout(luAnimId)
  luStep.value = 0
  luA.value = luA0.map(r => [...r])
  luL.value = [[1,null,null],[null,1,null],[null,null,1]]
  luU.value = luA0.map(r => [...r])
  luStepText.value = '点击播放开始LU分解'
  luStepDetail.value = ''
  renderTrigger.value++
}

// ========== Gram-Schmidt动画 ==========
const gsPlaying = ref(false)
let gsAnimId = null
const gsStep = ref(0)
const gsSvgWidth = ref(700)
const gsT = ref(0)
const gsScale = ref(1)
const gsProj1 = ref(null)
const gsProj2a = ref(null)
const gsProj2b = ref(null)
const gsStepText = ref('点击播放开始Gram-Schmidt正交化')

// 原始向量
const gsA = [
  [2, 1, 0.5],
  [1, 2, 0.5],
  [0.5, 0.5, 2]
]
const gsB = ref([null, null, null])

// 简单3D斜二测投影
function gsProject(v, s) {
  const scale = 60 * s
  return {
    x: (v[0] - v[1]) * 0.866 * scale,
    y: (v[2] - (v[0] + v[1]) * 0.5) * scale
  }
}

function vecSub(a, b) { return a.map((v,i) => v - b[i]) }
function vecScale(a, s) { return a.map(v => v * s) }
function vecDot(a, b) { return a.reduce((s,v,i) => s + v*b[i], 0) }
function vecNorm(a) { return Math.sqrt(vecDot(a,a)) }

function gsAdvance() {
  if (gsStep.value >= 4) {
    gsPlaying.value = false
    return
  }
  gsStep.value++
  if (gsStep.value === 1) {
    gsB.value[0] = [...gsA[0]]
    gsStepText.value = 'b₁ = a₁（第一个向量直接作为正交基）'
  } else if (gsStep.value === 2) {
    const a2 = gsA[1], b1 = gsB.value[0]
    const c1 = vecDot(a2, b1) / vecDot(b1, b1)
    gsProj1.value = vecScale(b1, c1)
    gsB.value[1] = vecSub(a2, gsProj1.value)
    gsStepText.value = 'b₂ = a₂ - proj_{b₁}(a₂)，减去在b₁上的投影'
  } else if (gsStep.value === 3) {
    const a3 = gsA[2], b1 = gsB.value[0], b2 = gsB.value[1]
    const c1 = vecDot(a3, b1) / vecDot(b1, b1)
    const c2 = vecDot(a3, b2) / vecDot(b2, b2)
    gsProj2a.value = vecScale(b1, c1)
    gsProj2b.value = vecScale(b2, c2)
    gsB.value[2] = vecSub(vecSub(a3, gsProj2a.value), gsProj2b.value)
    gsStepText.value = 'b₃ = a₃ - proj_{b₁}(a₃) - proj_{b₂}(a₃)，得到正交基{b₁,b₂,b₃}'
  }
  renderTrigger.value++
}

function gsLoop() {
  if (!gsPlaying.value) return
  gsAdvance()
  gsAnimId = setTimeout(gsLoop, 2000)
}
function gsPlay() {
  if (gsStep.value >= 3) gsReset()
  gsPlaying.value = true
  gsLoop()
}
function gsPause() {
  gsPlaying.value = false
  if (gsAnimId) clearTimeout(gsAnimId)
}
function gsReset() {
  gsPlaying.value = false
  if (gsAnimId) clearTimeout(gsAnimId)
  gsStep.value = 0
  gsB.value = [null, null, null]
  gsProj1.value = null
  gsProj2a.value = null
  gsProj2b.value = null
  gsStepText.value = '点击播放开始Gram-Schmidt正交化'
  renderTrigger.value++
}

// ========== Householder动画 ==========
const hhPlaying = ref(false)
let hhAnimId = null
let hhReflectRafId = null
const hhStep = ref(0)
const hhSvgWidth = ref(700)
const hhT = ref(0)
const hhStepText = ref('点击播放观察Householder反射')

const hhX = ref([1.5, 1])
const hhSigma = ref(0)
const hhU = ref([0, 0])
const hhHx = ref([0, 0])
const hhReflected = computed(() => {
  // 中间插值
  const angle = Math.atan2(hhX.value[1], hhX.value[0])
  const targetAngle = 0
  const a = angle + (targetAngle - angle) * hhT.value
  const r = vecNorm(hhX.value)
  return [Math.cos(a) * r, Math.sin(a) * r]
})

const hhMirror = computed(() => {
  // 镜面垂直于u，过原点
  const ux = hhU.value[0], uy = hhU.value[1]
  const len = Math.sqrt(ux*ux + uy*uy)
  const nx = -uy/len, ny = ux/len // 镜面方向
  return [
    { x: nx * 200, y: -ny * 200 },
    { x: -nx * 200, y: ny * 200 }
  ]
})

const hhArc = computed(() => {
  const r = vecNorm(hhX.value) * 30
  const a1 = Math.atan2(-hhX.value[1], hhX.value[0])
  const a2 = Math.atan2(-hhHx.value[1], hhHx.value[0])
  const x1 = Math.cos(a1)*r, y1 = Math.sin(a1)*r
  const x2 = Math.cos(a1 + (a2-a1)*hhT.value)*r
  const y2 = Math.sin(a1 + (a2-a1)*hhT.value)*r
  const sweep = Math.abs(a2-a1) > Math.PI ? 1 : 0
  return `M ${x1} ${y1} A ${r} ${r} 0 0 ${sweep} ${x2} ${y2}`
})

function hhAdvance() {
  if (hhStep.value >= 3) {
    hhPlaying.value = false
    return
  }
  hhStep.value++
  if (hhStep.value === 1) {
    const x = hhX.value
    const nx = vecNorm(x)
    hhSigma.value = x[0] >= 0 ? nx : -nx
    // u = x + sigma*e1, but sign(x1) convention: u = x + sign(x1)*||x||*e1
    // Hx = -sign(x1)*||x||*e1
    const sign = x[0] >= 0 ? 1 : -1
    hhSigma.value = sign * nx
    hhU.value = [x[0] + hhSigma.value, x[1]]
    // normalize for display
    const ulen = vecNorm(hhU.value)
    hhU.value = [hhU.value[0]/ulen, hhU.value[1]/ulen]
    hhHx.value = [-hhSigma.value, 0]
    hhStepText.value = '计算法向量 u = x + sign(x₁)‖x‖e₁，确定镜面位置'
  } else if (hhStep.value === 2) {
    animateHHReflect()
    return
  } else if (hhStep.value === 3) {
    hhStepText.value = '反射完成！Hx = -σe₁，第二分量被清零'
  }
  renderTrigger.value++
}

function animateHHReflect() {
  hhStepText.value = '反射进行中：x经镜面映射到e₁方向...'
  const start = performance.now()
  const dur = 1500
  function tick(now) {
    hhT.value = Math.min((now - start) / dur, 1)
    renderTrigger.value++
    if (hhT.value < 1 && hhPlaying.value) {
      hhReflectRafId = requestAnimationFrame(tick)
    } else {
      hhT.value = 1
      hhStep.value = 3
      hhStepText.value = '反射完成！Hx = -σe₁，第二分量被清零'
      renderTrigger.value++
      if (hhPlaying.value) {
        hhAnimId = setTimeout(hhLoop, 1200)
      }
    }
  }
  hhReflectRafId = requestAnimationFrame(tick)
}

function hhLoop() {
  if (!hhPlaying.value) return
  hhAdvance()
}
function hhPlay() {
  if (hhStep.value >= 3) hhReset()
  hhPlaying.value = true
  if (hhStep.value < 2) {
    hhAdvance()
    hhAnimId = setTimeout(hhLoop, 1500)
  } else {
    animateHHReflect()
  }
}
function hhPause() {
  hhPlaying.value = false
  if (hhAnimId) clearTimeout(hhAnimId)
  if (hhReflectRafId) cancelAnimationFrame(hhReflectRafId)
}
function hhReset() {
  hhPlaying.value = false
  if (hhAnimId) clearTimeout(hhAnimId)
  if (hhReflectRafId) cancelAnimationFrame(hhReflectRafId)
  hhStep.value = 0
  hhT.value = 0
  hhSigma.value = 0
  hhU.value = [0, 0]
  hhHx.value = [0, 0]
  hhStepText.value = '点击播放观察Householder反射'
  renderTrigger.value++
}

onUnmounted(() => {
  luPause()
  gsPause()
  hhPause()
})
</script>

<style scoped>
.formula-inline { display: inline; }
.formula-block { display: block; text-align: center; margin: 12px 0; }

/* 概念关系图（auto模式） */
.concept-map {
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  min-height: 280px;
}
.cm-root {
  background: linear-gradient(135deg,#4f46e5,#7c3aed);
  color: #fff;
  padding: 10px 28px;
  border-radius: 24px;
  font-size: 18px;
  font-weight: 700;
  box-shadow: 0 4px 14px rgba(79,70,229,.3);
  animation: cm-pulse 2s ease-in-out infinite;
}
.cm-branches {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  justify-content: center;
}
.cm-branch {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  position: relative;
  padding-top: 20px;
}
.cm-branch::before {
  content: '';
  position: absolute;
  top: -16px;
  left: 50%;
  width: 2px;
  height: 20px;
  background: #94a3b8;
}
.cm-children {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}
.cm-node {
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  background: #fff;
  border: 2px solid #e2e8f0;
  color: #475569;
  opacity: 0;
  animation: cm-light 8s ease-in-out infinite;
  line-height: 1.4;
}
.cm-small { font-size: 11px; font-weight: 400; color: #94a3b8; }
.cm-branch-lu .cm-node { border-color: #93c5fd; color: #1e40af; }
.cm-branch-qr .cm-node { border-color: #6ee7b7; color: #065f46; }
.cm-n1 { animation-delay: 0s !important; }
.cm-n5 { animation-delay: 4s !important; }
@keyframes cm-pulse {
  0%,100% { box-shadow: 0 4px 14px rgba(79,70,229,.3); transform: scale(1); }
  50% { box-shadow: 0 6px 24px rgba(79,70,229,.5); transform: scale(1.04); }
}
@keyframes cm-light {
  0% { opacity: 0; transform: scale(0.8); }
  5% { opacity: 1; transform: scale(1.1); }
  10% { transform: scale(1); }
  85% { opacity: 1; transform: scale(1); }
  95%,100% { opacity: 0.3; transform: scale(0.95); }
}
</style>
