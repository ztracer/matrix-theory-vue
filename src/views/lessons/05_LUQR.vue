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
        description="拖动画面旋转视角，滚轮缩放；蓝色为原始向量aᵢ，绿色为正交向量bᵢ，橙色虚线为被减去的投影分量"
        step
        @play="gsPlay"
        @pause="gsPause"
        @reset="gsReset"
        @step="gsNextStep"
      >
        <template #controls>
          <button class="ctrl-btn" @click="gsPreviousStep" :disabled="gsStep === 0 || gsPlaying">上一步</button>
        </template>
        <div class="gs-stage">
          <div ref="gsViewport" class="gs-viewport" aria-label="Gram-Schmidt 3D interactive view"></div>
          <div class="gs-legend">
            <span><i class="gs-key gs-key-a"></i>原始向量 aᵢ</span>
            <span><i class="gs-key gs-key-b"></i>正交向量 bᵢ</span>
            <span><i class="gs-key gs-key-p"></i>投影分量(被减去)</span>
            <strong>{{ gsStepText }}</strong>
            <em>步骤 {{ gsStep }} / 3</em>
          </div>
        </div>
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

    <!-- 8. 知识结构图 -->
    <Section title="知识结构：矩阵三角分解方法谱系" :num="8">
      <p>下图展示矩阵三角分解的各类方法及其关系：</p>
      <AnimationBox
        title="矩阵分解方法关系图"
        description="三角分解侧重消元与正定结构；QR分解侧重正交化、反射和旋转。"
        hide-controls
      >
        <div class="concept-map">
          <div class="cm-root">矩阵分解方法</div>
          <div class="cm-columns">
            <div class="cm-family cm-family-lu">
              <div class="cm-family-title">消元 / 三角分解</div>
              <div class="cm-flow">
                <div class="cm-node">Gauss消元<span>行变换清零</span></div>
                <div class="cm-arrow">→</div>
                <div class="cm-node">LU分解<span>A = LU</span></div>
                <div class="cm-arrow">→</div>
                <div class="cm-node">LDU分解<span>抽出对角尺度</span></div>
                <div class="cm-arrow">→</div>
                <div class="cm-node">Cholesky<span>A = LLᵀ，正定特例</span></div>
              </div>
            </div>
            <div class="cm-family cm-family-qr">
              <div class="cm-family-title">正交 / QR分解</div>
              <div class="cm-method-grid">
                <div class="cm-node">Gram-Schmidt<span>逐次减投影</span></div>
                <div class="cm-node">Householder<span>反射清零，数值稳定</span></div>
                <div class="cm-node">Givens旋转<span>平面旋转逐个清零</span></div>
              </div>
              <div class="cm-merge">↓</div>
              <div class="cm-node cm-node-result">QR分解<span>A = QR，Q正交，R上三角</span></div>
            </div>
          </div>
          <div class="cm-note">核心区分：LU 记录消元过程；QR 构造正交基并保留上三角结构。</div>
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

    <Section title="📝 课后作业" :num="11">
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
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js'

const quizzes = (quizBank[5] || []).map(q => ({ ...q, lessonNum: '05', lessonTitle: '三角分解与QR分解' }))
const hwQuizzes = computed(() => (homeworkBank[5] || []).map(q => ({ ...q })))

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
  { text: '第1列消元完毕', detail: '准备对第2列消元，主元a₂₂=1' },
  { text: '消元第2列 → 第3行', detail: '乘数 l₃₂ = a₃₂/a₂₂ = 3/1 = 3，R₃ ← R₃ - 3R₂' },
  { text: 'LU分解完毕', detail: 'A = LU，L填好乘数，U为上三角' }
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
let gsRafId = null
let gsTweenRafId = null
const gsStep = ref(0)
const gsT = ref(0)
const gsProj1 = ref(null)
const gsProj2a = ref(null)
const gsProj2b = ref(null)
const gsCurrentB = ref(null)
const gsStepText = ref('点击播放开始Gram-Schmidt正交化')
const gsViewport = ref(null)
let gsScene = null
let gsCamera = null
let gsRenderer = null
let gsLabelRenderer = null
let gsControls = null
let gsSceneLayer = null
let gsResizeObserver = null

// 原始向量
const gsA = [
  [2, 1, 0.5],
  [1, 2, 0.5],
  [0.5, 0.5, 2]
]
const gsB = ref([null, null, null])
const GS_STEP_TEXT = [
  '点击“步进”逐步观察，或拖动画面先选择视角',
  'Step 1：b₁ = a₁，第一个向量直接进入正交组',
  'Step 2：a₂ = proj_{b₁}(a₂) + b₂，橙色是被减去的投影',
  'Step 3：a₃ = proj_{b₁}(a₃) + proj_{b₂}(a₃) + b₃，得到两两正交向量组'
]

function vecSub(a, b) { return a.map((v,i) => v - b[i]) }
function vecScale(a, s) { return a.map(v => v * s) }
function vecDot(a, b) { return a.reduce((s,v,i) => s + v*b[i], 0) }
function vecNorm(a) { return Math.sqrt(vecDot(a,a)) }
function vecAdd(a, b) { return a.map((v,i) => v + b[i]) }
function vecLerp(a, b, t) { return a.map((v,i) => v + (b[i] - v) * t) }
function vecZero() { return [0, 0, 0] }

function gsComputeData() {
  const b1 = [...gsA[0]]
  const proj1 = vecScale(b1, vecDot(gsA[1], b1) / vecDot(b1, b1))
  const b2 = vecSub(gsA[1], proj1)
  const proj2a = vecScale(b1, vecDot(gsA[2], b1) / vecDot(b1, b1))
  const proj2b = vecScale(b2, vecDot(gsA[2], b2) / vecDot(b2, b2))
  const b3 = vecSub(gsA[2], vecAdd(proj2a, proj2b))
  return { b1, proj1, b2, proj2a, proj2b, b3 }
}

const gsData = gsComputeData()

function gsToVector3(v) {
  return new THREE.Vector3(v[0], v[2], v[1])
}

function gsMakeLabel(text, className = '') {
  const el = document.createElement('div')
  el.className = `gs-label ${className}`
  el.textContent = text
  return new CSS2DObject(el)
}

function gsAddLabel(text, position, className = '') {
  const label = gsMakeLabel(text, className)
  label.position.copy(position)
  gsSceneLayer.add(label)
  return label
}

function gsAddVector(v, color, label, options = {}) {
  if (!v || vecNorm(v) < 0.0001) return null
  const end = gsToVector3(v)
  const length = end.length()
  const arrow = new THREE.ArrowHelper(
    end.clone().normalize(),
    new THREE.Vector3(0, 0, 0),
    length,
    color,
    options.headLength ?? 0.18,
    options.headWidth ?? 0.11
  )
  arrow.line.material.linewidth = options.lineWidth ?? 3
  arrow.line.material.transparent = true
  arrow.line.material.opacity = options.opacity ?? 1
  arrow.cone.material.transparent = true
  arrow.cone.material.opacity = options.opacity ?? 1
  gsSceneLayer.add(arrow)
  if (label) {
    const labelPos = end.clone().multiplyScalar(1.05).add(new THREE.Vector3(0.05, 0.06, 0.05))
    gsAddLabel(label, labelPos, options.labelClass ?? '')
  }
  return arrow
}

function gsAddSegment(from, to, color = 0xf97316, options = {}) {
  const start = gsToVector3(from)
  const end = gsToVector3(to)
  const diff = end.clone().sub(start)
  if (diff.length() < 0.0001) return null
  const arrow = new THREE.ArrowHelper(
    diff.clone().normalize(),
    start,
    diff.length(),
    color,
    options.headLength ?? 0.14,
    options.headWidth ?? 0.08
  )
  arrow.line.material.transparent = true
  arrow.line.material.opacity = options.opacity ?? 1
  arrow.cone.material.transparent = true
  arrow.cone.material.opacity = options.opacity ?? 1
  gsSceneLayer.add(arrow)
  if (options.label) {
    const labelPos = start.clone().lerp(end, options.labelAt ?? 0.55).add(new THREE.Vector3(0.06, 0.08, 0.04))
    gsAddLabel(options.label, labelPos, options.labelClass ?? '')
  }
  return arrow
}

function gsAddDashedLine(from, to, color = 0xf97316, opacity = 0.88, label = '') {
  const points = [gsToVector3(from), gsToVector3(to)]
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const material = new THREE.LineDashedMaterial({
    color,
    dashSize: 0.12,
    gapSize: 0.08,
    transparent: true,
    opacity
  })
  const line = new THREE.Line(geometry, material)
  line.computeLineDistances()
  gsSceneLayer.add(line)
  if (label) {
    const labelPos = points[0].clone().lerp(points[1], 0.55).add(new THREE.Vector3(0.05, 0.08, 0.05))
    gsAddLabel(label, labelPos, 'gs-label-p')
  }
  return line
}

function gsAddOrthogonalNotes() {
  if (gsStep.value < 2) return
  const notes = gsStep.value >= 3 ? ['b1 ⊥ b2', 'b1 ⊥ b3', 'b2 ⊥ b3'] : ['b1 ⊥ b2']
  notes.forEach((note, i) => {
    gsAddLabel(note, new THREE.Vector3(-1.55, 2.6 - i * 0.2, -1.2), 'gs-label-ok')
  })
}

function gsClearLayer() {
  if (!gsSceneLayer) return
  while (gsSceneLayer.children.length) {
    const child = gsSceneLayer.children[0]
    gsSceneLayer.remove(child)
    child.traverse?.((obj) => {
      obj.geometry?.dispose?.()
      if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose?.())
      else obj.material?.dispose?.()
    })
  }
}

function gsRenderSceneLayer() {
  if (!gsSceneLayer) return
  gsClearLayer()

  gsA.forEach((v, idx) => {
    if (gsStep.value >= idx) {
      gsAddVector(v, 0x3b82f6, `a${idx + 1}`, { opacity: 0.34, headLength: 0.16, headWidth: 0.09, labelClass: 'gs-label-a' })
    }
  })

  if (gsStep.value >= 1 && gsB.value[0]) {
    gsAddVector(gsB.value[0], 0x059669, 'b1 = a1', { labelClass: 'gs-label-b' })
  }

  if (gsStep.value >= 2) {
    if (gsProj1.value) {
      gsAddSegment(vecZero(), gsProj1.value, 0xf97316, { label: 'proj_b1(a2)', labelClass: 'gs-label-p' })
      gsAddDashedLine(gsProj1.value, gsA[1], 0xf97316, 0.72, 'a2 - proj')
    }
    if (gsB.value[1]) {
      gsAddVector(gsB.value[1], 0x059669, 'b2', { labelClass: 'gs-label-b' })
    } else if (gsCurrentB.value) {
      gsAddVector(gsCurrentB.value, 0x10b981, '', { opacity: 0.78 })
      gsAddDashedLine(gsCurrentB.value, gsA[1], 0x10b981, 0.32)
    }
  }

  if (gsStep.value >= 3) {
    if (gsProj2a.value && gsProj2b.value) {
      const removed = vecAdd(gsProj2a.value, gsProj2b.value)
      gsAddSegment(vecZero(), gsProj2a.value, 0xf97316, { label: 'proj_b1(a3)', labelClass: 'gs-label-p', opacity: 0.95 })
      gsAddSegment(gsProj2a.value, removed, 0xfb923c, { label: 'proj_b2(a3)', labelClass: 'gs-label-p', opacity: 0.95 })
      gsAddDashedLine(vecZero(), removed, 0xf97316, 0.5, 'projection sum')
      gsAddDashedLine(removed, gsA[2], 0xf97316, 0.72, 'a3 - projection sum')
    }
    if (gsB.value[2]) {
      gsAddVector(gsB.value[2], 0x059669, 'b3', { labelClass: 'gs-label-b' })
    } else if (gsCurrentB.value) {
      gsAddVector(gsCurrentB.value, 0x10b981, '', { opacity: 0.78 })
      gsAddDashedLine(gsCurrentB.value, gsA[2], 0x10b981, 0.32)
    }
  }

  gsAddOrthogonalNotes()
}

function gsResizeScene() {
  if (!gsViewport.value || !gsCamera || !gsRenderer || !gsLabelRenderer) return
  const rect = gsViewport.value.getBoundingClientRect()
  const width = Math.max(rect.width, 320)
  const height = Math.max(rect.height, 320)
  gsCamera.aspect = width / height
  gsCamera.updateProjectionMatrix()
  gsRenderer.setSize(width, height)
  gsLabelRenderer.setSize(width, height)
}

function gsDrawFrame() {
  if (!gsRenderer || !gsScene || !gsCamera) return
  gsControls?.update()
  gsRenderer.render(gsScene, gsCamera)
  gsLabelRenderer?.render(gsScene, gsCamera)
  gsRafId = requestAnimationFrame(gsDrawFrame)
}

function gsInitScene() {
  if (!gsViewport.value || gsScene) return
  gsScene = new THREE.Scene()
  gsScene.background = new THREE.Color(0xf8fafc)

  gsCamera = new THREE.PerspectiveCamera(46, 1, 0.1, 100)
  gsCamera.position.set(5.4, 4.2, 6.2)

  gsRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
  gsRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  gsRenderer.domElement.className = 'gs-canvas'
  gsViewport.value.appendChild(gsRenderer.domElement)

  gsLabelRenderer = new CSS2DRenderer()
  gsLabelRenderer.domElement.className = 'gs-label-layer'
  gsViewport.value.appendChild(gsLabelRenderer.domElement)

  gsControls = new OrbitControls(gsCamera, gsRenderer.domElement)
  gsControls.enableDamping = true
  gsControls.dampingFactor = 0.08
  gsControls.target.set(0.75, 0.75, 0.75)
  gsControls.minDistance = 2.2
  gsControls.maxDistance = 14
  gsControls.enablePan = true

  gsScene.add(new THREE.HemisphereLight(0xffffff, 0xdbeafe, 2.4))
  const grid = new THREE.GridHelper(5, 10, 0xcbd5e1, 0xe2e8f0)
  grid.position.y = -0.02
  gsScene.add(grid)

  const axes = [
    { v: [2.6, 0, 0], color: 0x94a3b8, label: 'x' },
    { v: [0, 2.6, 0], color: 0x94a3b8, label: 'z' },
    { v: [0, 0, 2.6], color: 0x94a3b8, label: 'y' }
  ]
  axes.forEach(axis => {
    const end = new THREE.Vector3(...axis.v)
    gsScene.add(new THREE.ArrowHelper(end.clone().normalize(), new THREE.Vector3(0, 0, 0), end.length(), axis.color, 0.12, 0.08))
    const label = gsMakeLabel(axis.label, 'gs-label-axis')
    label.position.copy(end.multiplyScalar(1.05))
    gsScene.add(label)
  })

  gsSceneLayer = new THREE.Group()
  gsScene.add(gsSceneLayer)
  gsResizeObserver = new ResizeObserver(gsResizeScene)
  gsResizeObserver.observe(gsViewport.value)
  gsResizeScene()
  gsRenderSceneLayer()
  gsDrawFrame()
}

function gsDisposeScene() {
  if (gsRafId) cancelAnimationFrame(gsRafId)
  if (gsTweenRafId) cancelAnimationFrame(gsTweenRafId)
  gsResizeObserver?.disconnect()
  gsControls?.dispose()
  gsClearLayer()
  gsScene?.traverse((obj) => {
    obj.geometry?.dispose?.()
    if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose?.())
    else obj.material?.dispose?.()
  })
  gsRenderer?.dispose()
  gsRenderer?.domElement?.remove()
  gsLabelRenderer?.domElement?.remove()
  gsScene = null
  gsCamera = null
  gsRenderer = null
  gsLabelRenderer = null
  gsControls = null
  gsSceneLayer = null
  gsResizeObserver = null
}

function gsAnimateVector(from, to, duration = 1600) {
  if (gsTweenRafId) cancelAnimationFrame(gsTweenRafId)
  return new Promise(resolve => {
    const start = performance.now()
    function tick(now) {
      if (!gsPlaying.value) { resolve(false); return }
      gsT.value = Math.min((now - start) / duration, 1)
      gsCurrentB.value = vecLerp(from, to, gsT.value)
      gsRenderSceneLayer()
      renderTrigger.value++
      if (gsT.value < 1) gsTweenRafId = requestAnimationFrame(tick)
      else {
        gsTweenRafId = null
        resolve(true)
      }
    }
    gsTweenRafId = requestAnimationFrame(tick)
  })
}

function gsApplyStep(step) {
  gsB.value = [null, null, null]
  gsProj1.value = null
  gsProj2a.value = null
  gsProj2b.value = null
  gsCurrentB.value = null
  gsT.value = 0

  if (step >= 1) gsB.value[0] = gsData.b1
  if (step >= 2) {
    gsProj1.value = gsData.proj1
    gsB.value[1] = gsData.b2
  }
  if (step >= 3) {
    gsProj2a.value = gsData.proj2a
    gsProj2b.value = gsData.proj2b
    gsB.value[2] = gsData.b3
  }
  gsStepText.value = GS_STEP_TEXT[step]
  renderTrigger.value++
  gsRenderSceneLayer()
}

function gsSetStep(step) {
  gsPause()
  gsStep.value = Math.max(0, Math.min(3, step))
  gsApplyStep(gsStep.value)
}

function gsNextStep() {
  gsSetStep(gsStep.value + 1)
}

function gsPreviousStep() {
  gsSetStep(gsStep.value - 1)
}

async function gsAdvance() {
  if (gsStep.value >= 3) {
    gsPlaying.value = false
    return false
  }
  const nextStep = gsStep.value + 1
  gsStep.value = nextStep

  if (nextStep === 1) {
    gsApplyStep(nextStep)
  } else if (nextStep === 2) {
    gsApplyStep(nextStep)
    gsB.value[1] = null
    gsCurrentB.value = [...gsA[1]]
    gsRenderSceneLayer()
    await gsAnimateVector(gsA[1], gsData.b2)
  } else if (nextStep === 3) {
    gsApplyStep(nextStep)
    gsB.value[2] = null
    gsCurrentB.value = [...gsA[2]]
    gsRenderSceneLayer()
    await gsAnimateVector(gsA[2], gsData.b3)
  }

  gsApplyStep(nextStep)
  return true
}

async function gsLoop() {
  if (!gsPlaying.value) return
  const advanced = await gsAdvance()
  if (!advanced || gsStep.value >= 3) {
    gsPlaying.value = false
    return
  }
  gsAnimId = setTimeout(gsLoop, 3000)
}
function gsPlay() {
  if (gsStep.value >= 3) gsReset()
  gsPlaying.value = true
  gsLoop()
}
function gsPause() {
  gsPlaying.value = false
  if (gsAnimId) clearTimeout(gsAnimId)
  if (gsTweenRafId) cancelAnimationFrame(gsTweenRafId)
  gsTweenRafId = null
}
function gsReset() {
  gsPlaying.value = false
  if (gsAnimId) clearTimeout(gsAnimId)
  if (gsTweenRafId) cancelAnimationFrame(gsTweenRafId)
  gsTweenRafId = null
  gsStep.value = 0
  gsApplyStep(0)
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
  // Show the vector moving toward the actual Householder result Hx.
  const angle = Math.atan2(hhX.value[1], hhX.value[0])
  const targetAngle = Math.atan2(hhHx.value[1], hhHx.value[0])
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
  const largeArc = Math.abs(a2 - a1) > Math.PI ? 1 : 0
  const sweep = a2 >= a1 ? 1 : 0
  return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} ${sweep} ${x2} ${y2}`
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
    hhStepText.value = '反射结果：Hx = -σe₁，第二分量被清零'
  }
  renderTrigger.value++
}

function animateHHReflect() {
  hhStepText.value = '反射进行中：x经镜面映射到-σe₁方向...'
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
      hhStepText.value = '反射结果：Hx = -σe₁，第二分量被清零'
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

onMounted(() => {
  nextTick(gsInitScene)
})

onUnmounted(() => {
  luPause()
  gsPause()
  hhPause()
  gsDisposeScene()
})
</script>

<style scoped>
.formula-inline { display: inline; }
.formula-block { display: block; text-align: center; margin: 12px 0; }

.gs-stage {
  width: min(100%, 920px);
  margin: 0 auto;
}
.gs-viewport {
  position: relative;
  height: clamp(360px, 52vw, 520px);
  overflow: hidden;
  border: 1px solid #dbe3ef;
  border-radius: 8px;
  background: #f8fafc;
  touch-action: none;
}
.gs-canvas,
.gs-label-layer {
  position: absolute;
  inset: 0;
  display: block;
}
.gs-label-layer {
  pointer-events: none;
}
:deep(.gs-label) {
  padding: 2px 6px;
  border-radius: 6px;
  background: rgba(248, 250, 252, 0.86);
  color: #0f172a;
  font-size: 13px;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.08);
  user-select: none;
}
:deep(.gs-label-a) { color: #2563eb; }
:deep(.gs-label-b),
:deep(.gs-label-ok) { color: #047857; }
:deep(.gs-label-p) { color: #c2410c; }
:deep(.gs-label-axis) {
  background: transparent;
  color: #64748b;
  box-shadow: none;
  font-size: 14px;
}
.gs-legend {
  display: grid;
  grid-template-columns: auto auto auto minmax(180px, 1fr) auto;
  align-items: center;
  gap: 16px;
  margin: 12px 0 0;
  padding: 14px 18px;
  position: relative;
  z-index: 2;
  border: 1px solid #dbe3ef;
  border-radius: 8px;
  background: rgba(248, 250, 252, 0.93);
  color: #475569;
  font-size: 13px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
}
.gs-legend span {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}
.gs-legend strong {
  color: #0d9488;
  font-size: 14px;
  text-align: right;
}
.gs-legend em {
  color: #94a3b8;
  font-style: normal;
  text-align: right;
  white-space: nowrap;
}
.gs-key {
  width: 30px;
  height: 4px;
  display: inline-block;
  border-radius: 999px;
}
.gs-key-a { background: #3b82f6; opacity: 0.55; }
.gs-key-b { background: #059669; }
.gs-key-p {
  height: 0;
  border-top: 3px dashed #f97316;
  background: transparent;
}
.ctrl-btn {
  padding: 6px 14px;
  border: 1px solid #e2e8f0;
  background: #fff;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: all .15s;
  color: #475569;
  font-family: inherit;
}
.ctrl-btn:hover:not(:disabled) {
  background: #4f46e5;
  color: #fff;
  border-color: #4f46e5;
}
.ctrl-btn:disabled {
  opacity: .4;
  cursor: not-allowed;
}

/* 矩阵分解关系图 */
.concept-map {
  width: min(100%, 980px);
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
}
.cm-root {
  background: #312e81;
  color: #fff;
  padding: 12px 28px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 700;
  box-shadow: 0 10px 24px rgba(49, 46, 129, .16);
}
.cm-columns {
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 22px;
}
.cm-family {
  border: 1px solid #dbe3ef;
  border-radius: 8px;
  background: #fff;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.cm-family-lu { border-color: #bfdbfe; background: #f8fbff; }
.cm-family-qr { border-color: #a7f3d0; background: #f7fffb; }
.cm-family-title {
  font-size: 15px;
  font-weight: 800;
  color: #1e293b;
  text-align: center;
}
.cm-flow {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 8px;
}
.cm-node {
  min-height: 58px;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 800;
  text-align: center;
  background: #fff;
  border: 1px solid #dbe3ef;
  color: #1e293b;
  line-height: 1.4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3px;
}
.cm-node span {
  font-size: 12px;
  font-weight: 500;
  color: #64748b;
}
.cm-family-lu .cm-node { border-color: #93c5fd; color: #1d4ed8; }
.cm-family-qr .cm-node { border-color: #6ee7b7; color: #047857; }
.cm-node-result {
  border-color: #10b981;
  background: #ecfdf5;
}
.cm-arrow,
.cm-merge {
  color: #94a3b8;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  line-height: 1;
}
.cm-method-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}
.cm-note {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #dbe3ef;
  border-radius: 8px;
  background: #f8fafc;
  color: #475569;
  font-size: 13px;
  text-align: center;
}

@media (max-width: 760px) {
  .gs-viewport {
    height: 420px;
  }
  .gs-legend {
    grid-template-columns: 1fr 1fr;
  }
  .gs-legend strong,
  .gs-legend em {
    grid-column: 1 / -1;
    text-align: left;
  }
  .cm-columns,
  .cm-method-grid {
    grid-template-columns: 1fr;
  }
  .concept-map {
    padding: 16px 8px;
  }
}
</style>
