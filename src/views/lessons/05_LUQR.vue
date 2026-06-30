<template>
  <LessonLayout :lesson-id="5" title="三角分解与QR分解" subtitle="LU & QR Decomposition">
    <!-- 1. LU分解（合并旧Section 1 + 2） -->
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
      <h3>可视化：LU消元过程</h3>
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
    <Section title="QR分解：正交三角化" :num="2">
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
      <div class="qr-method-comparison">
        <div class="qr-comparison-heading">
          <span class="qr-eyebrow">QR Decomposition Methods</span>
          <h3>三种QR分解方法怎么选？</h3>
          <p>三种方法都在构造正交矩阵 <span class="formula-inline">Q</span> 和上三角矩阵 <span class="formula-inline">R</span>，但它们的几何动作、数值稳定性和适用场景不同。</p>
        </div>

        <div class="qr-table-wrap">
          <table class="qr-comparison-table">
            <thead>
              <tr>
                <th>方法</th>
                <th>核心思想</th>
                <th>数值稳定性</th>
                <th>计算量</th>
                <th>适用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr class="qr-row-gs">
                <td data-label="方法">
                  <div class="method-name"><span class="method-dot"></span> Gram-Schmidt</div>
                </td>
                <td data-label="核心思想">逐列减投影：从当前列中依次减去在已有正交方向上的投影</td>
                <td data-label="数值稳定性">
                  <span class="stability-pill stability-low">★★☆ 较弱</span>
                  <small>舍入误差累积，经典版本稳定性差</small>
                </td>
                <td data-label="计算量"><span class="formula-inline">\sim 2mn^2</span></td>
                <td data-label="适用场景">教学演示、小规模矩阵、几何直观理解</td>
              </tr>
              <tr class="qr-row-hh">
                <td data-label="方法">
                  <div class="method-name"><span class="method-dot"></span> Householder</div>
                </td>
                <td data-label="核心思想">镜面反射：构造 <span class="formula-inline">H = I - 2uu\T/(u\T u)</span> 将整列次对角元一次清零</td>
                <td data-label="数值稳定性">
                  <span class="stability-pill stability-high">★★★ 优秀</span>
                  <small>实际计算中最常用的QR方法</small>
                </td>
                <td data-label="计算量"><span class="formula-inline">\sim 2mn^2 - \frac{2}{3}n^3</span></td>
                <td data-label="适用场景">通用数值计算、工程实现、生产环境</td>
              </tr>
              <tr class="qr-row-givens">
                <td data-label="方法">
                  <div class="method-name"><span class="method-dot"></span> Givens旋转</div>
                </td>
                <td data-label="核心思想">平面旋转：构造 <span class="formula-inline">G(i,j,\theta)</span> 只旋转两个坐标轴方向，逐个清零指定元素</td>
                <td data-label="数值稳定性">
                  <span class="stability-pill stability-high">★★★ 优秀</span>
                  <small>可局部操作，适合选择性清零</small>
                </td>
                <td data-label="计算量"><span class="formula-inline">\sim 3mn^2 - n^3</span></td>
                <td data-label="适用场景">稀疏矩阵、只需清零少量元素、增量更新</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="qr-intuitive-guide">
        <h3>直观理解：抽丝剥茧看 QR 分解与 Householder 变换</h3>
        <p>我们把所有高深的数学名词拆开，用最直观的逻辑一步步抽丝剥茧。</p>

        <h4>一、什么是 QR 分解？</h4>
        <p><strong>1. 核心直觉：把矩阵"拆"成两部分</strong></p>
        <p>在线性代数里，分解矩阵就像把一个合数因式分解（比如 <span class="formula-inline">12 = 3 \times 4</span>）。QR 分解，就是把任意一个矩阵 <span class="formula-inline">A</span>，拆成两个特殊矩阵 <span class="formula-inline">Q</span> 和 <span class="formula-inline">R</span> 的乘积：</p>
        <Formula>A = QR</Formula>
        <p>这两个矩阵各司其职，性格极其鲜明：</p>
        <ul>
          <li><strong><span class="formula-inline">Q</span>（Orthogonal 规范正交矩阵）：</strong>它的每一列都是一个长度为 1 的单位向量，且两两之间互相垂直（夹角为 90°）。在几何上，它代表了一个纯粹的旋转或镜像反射，绝不拉伸空间。</li>
          <li><strong><span class="formula-inline">R</span>（Upper Triangular 上三角矩阵）：</strong>它的形状像个漏斗，主对角线下方全是 0。在几何上，它代表了缩放和剪切。</li>
        </ul>

        <p><strong>2. 为什么要费尽心思搞 QR 分解？</strong></p>
        <p>如果我们要解线性方程组 <span class="formula-inline">Ax = b</span>，直接解很难。但如果把 <span class="formula-inline">A</span> 拆成 <span class="formula-inline">QR</span>，方程就变成了：</p>
        <p style="text-align: center; font-size: 1.05rem;"><span class="formula-inline">QRx = b</span></p>
        <p>因为 <span class="formula-inline">Q</span> 的逆矩阵就是它的转置（<span class="formula-inline">Q^{-1} = Q\T</span>，极易计算），两边同乘 <span class="formula-inline">Q\T</span>：</p>
        <p style="text-align: center; font-size: 1.05rem;"><span class="formula-inline">Rx = Q\T b</span></p>
        <p>因为 <span class="formula-inline">R</span> 是上三角矩阵，我们用从下往上回代的方法，几秒钟就能算出 <span class="formula-inline">x</span>。它在计算机工程、最小二乘法拟合中是绝对的核心算法。</p>

        <h4>二、什么是 Householder 变换？</h4>
        <p>既然要把一个杂乱无章的矩阵 <span class="formula-inline">A</span> 变成上三角矩阵 <span class="formula-inline">R</span>，我们就需要一种工具，把矩阵主对角线下面的元素全部"消成 0"。除了你可能听过的"高斯消元法"，另一种更高级、在计算机里更稳定的工具就是 <strong>Householder 变换（豪斯霍尔德变换）</strong>。</p>

        <p><strong>1. 几何本质：镜像反射</strong></p>
        <p>Householder 变换在几何上非常浪漫，它其实就是<strong>照镜子（镜像反射）</strong>。假设你在高维空间里有一个向量 <span class="formula-inline">x</span>，你想通过一面"镜子"（在数学上叫超平面），把 <span class="formula-inline">x</span> 反射到另一个位置 <span class="formula-inline">y</span>。为了让 <span class="formula-inline">A</span> 变成上三角矩阵，我们的目标非常明确：要把一整个向量 <span class="formula-inline">x</span>，通过镜子反射后，让它贴在坐标轴上（即除了第一个分量，其他分量全变成 0）。</p>

        <p><strong>2. 怎么找到这面镜子？</strong></p>
        <p>如果要把向量 <span class="formula-inline">x</span> 反射到 <span class="formula-inline">y</span>，那么这面"镜子"应该垂直平分连接 <span class="formula-inline">x</span> 和 <span class="formula-inline">y</span> 的那条线。把这条连接线对应的向量称为反射向量 <span class="formula-inline">w</span>：</p>
        <p style="text-align: center; font-size: 1.05rem;"><span class="formula-inline">w = x - y</span></p>
        <p>只要找到了这个 <span class="formula-inline">w</span>，就能构造出 Householder 矩阵 <span class="formula-inline">H</span>。任何向量乘以这个 <span class="formula-inline">H</span>，就相当于照了一次这面镜子：</p>
        <Formula>H = I - \frac{2 w w\T}{\|w\|^2}</Formula>
        <p>这个矩阵 <span class="formula-inline">H</span> 有一个完美的特性：它自己乘自己等于单位阵（<span class="formula-inline">H^2 = I</span>），也就是说照两次镜子就变回原样了。因此 <span class="formula-inline">H = H^{-1} = H\T</span>，它是一个天然的正交矩阵！</p>

        <h4>三、手把手带你重新走一遍这道题</h4>
        <p>现在，把这两个概念串起来看真题。我们要把 <span class="formula-inline">A = \begin{pmatrix} 1 & 0 & 0 \\ 2 & 2 & 0 \\ 2 & 1 & 6 \end{pmatrix}</span> 分解为 <span class="formula-inline">QR</span>。主线任务：把第一列的 <span class="formula-inline">\begin{pmatrix} 1 \\ 2 \\ 2 \end{pmatrix}</span> 通过照镜子，把下面的两个 2 变成 0。</p>

        <p><strong>第一步：锁定目标，寻找镜子</strong></p>
        <p>① 原向量（镜子前的你）：取 <span class="formula-inline">A</span> 的第一列 <span class="formula-inline">x = \begin{pmatrix} 1 \\ 2 \\ 2 \end{pmatrix}</span>，长度 <span class="formula-inline">\|x\| = \sqrt{1^2+2^2+2^2} = 3</span>。</p>
        <p>② 目标向量（镜子里的虚像）：反射后它应躺在第一维坐标轴上，长度不变。取 <span class="formula-inline">y = \begin{pmatrix} -3 \\ 0 \\ 0 \end{pmatrix}</span>（取 <span class="formula-inline">-3</span> 而非 <span class="formula-inline">+3</span> 是为了数值稳定性，避免 <span class="formula-inline">x - y</span> 时首项相消）。</p>
        <p>③ 镜子方向 <span class="formula-inline">w</span>：<span class="formula-inline">w = x - y = \begin{pmatrix} 1-(-3) \\ 2-0 \\ 2-0 \end{pmatrix} = \begin{pmatrix} 4 \\ 2 \\ 2 \end{pmatrix}</span></p>

        <p><strong>第二步：打造这面镜子（算矩阵 <span class="formula-inline">H</span>）</strong></p>
        <p>知道了镜子的方向 <span class="formula-inline">w</span>，通过公式 <span class="formula-inline">H = I - \frac{2 w w\T}{\|w\|^2}</span> 算出镜子矩阵（完整计算见下方标准例题）：</p>
        <div class="formula-block">
          H = \begin{pmatrix}
            -\frac{1}{3} & -\frac{2}{3} & -\frac{2}{3} \\
            -\frac{2}{3} &  \frac{2}{3} & -\frac{1}{3} \\
            -\frac{2}{3} & -\frac{1}{3} &  \frac{2}{3}
          \end{pmatrix}
        </div>

        <p><strong>第三步：让整个矩阵 <span class="formula-inline">A</span> 穿过这面镜子</strong></p>
        <p>令整个矩阵 <span class="formula-inline">A</span> 左乘镜子 <span class="formula-inline">H</span>，即 <span class="formula-inline">R = HA</span>。神奇的事情发生了：</p>
        <ul>
          <li>第一列如愿以偿，变成了 <span class="formula-inline">\begin{pmatrix} -3 \\ 0 \\ 0 \end{pmatrix}</span>。</li>
          <li>第二列和第三列穿过镜子后，也自动变成了新值。</li>
          <li>此时整个矩阵恰好已经是上三角矩阵——这就是 <span class="formula-inline">R</span>！</li>
        </ul>

        <p><strong>第四步：大功告成，写出 <span class="formula-inline">Q</span> 和 <span class="formula-inline">R</span></strong></p>
        <p>因为 <span class="formula-inline">R = HA</span>，两边左乘 <span class="formula-inline">H^{-1}</span>。镜子矩阵的逆就是它自己（<span class="formula-inline">H^{-1} = H</span>），得 <span class="formula-inline">A = HR</span>。对比标准形式 <span class="formula-inline">A = QR</span>，发现镜子 <span class="formula-inline">H</span> 本身就是 <span class="formula-inline">Q</span>：</p>
        <Formula>Q = H,\quad R = \begin{pmatrix} -3 & -2 & -4 \\ 0 & 1 & -2 \\ 0 & 0 & 4 \end{pmatrix}</Formula>

        <div class="summary-box" style="margin-top: 1.2rem; padding: 1rem 1.2rem; background: #f0f9ff; border-left: 4px solid #0ea5e9; border-radius: 6px; font-size: 0.92rem;">
          <strong>💡 总结一句话</strong>
          <p style="margin: 0.5rem 0 0 0;">QR 分解就是把矩阵拆成"旋转/反射"和"上三角"；而 Householder 变换就是精确设计一面高维的"镜子"，让原矩阵的第一列撞在镜子上反弹回来时，恰好只有第一个数有值、其余全变成 0，从而顺理成章地切出了上三角矩阵 <span class="formula-inline">R</span>。</p>
        </div>
      </div>

    </Section>

    <!-- 3. 方法一 Gram-Schmidt（新卡片 + 旧动画） -->
    <Section title="方法一：Gram-Schmidt 正交化" :num="3">
      <article class="qr-method-card qr-method-gs">
        <header class="qr-method-header">
          <div>
            <span class="qr-method-kicker">Method 01</span>
            <h3>Gram-Schmidt 正交化</h3>
            <p>依次从每个列向量中减去它在已有正交方向上的投影，逐步构造出一组两两正交的向量，再单位化得到标准正交基。</p>
          </div>
          <div class="qr-stability-badge">
            <span>数值稳定性</span>
            <strong>★★☆</strong>
          </div>
        </header>

        <div class="qr-method-body">
          <div class="qr-method-explain">
            <p>对 <span class="formula-inline">A = [a_1\ a_2\ \cdots\ a_n]</span> 的列向量依次正交化：</p>
            <div class="formula-block">
              \begin{aligned}
              b_1 &= a_1 \\
              b_2 &= a_2 - \frac{(a_2, b_1)}{(b_1, b_1)} b_1 \\
              b_3 &= a_3 - \frac{(a_3, b_1)}{(b_1, b_1)} b_1 - \frac{(a_3, b_2)}{(b_2, b_2)} b_2 \\
              &\ \vdots \\
              b_k &= a_k - \sum_{j=1}^{k-1} \frac{(a_k, b_j)}{(b_j, b_j)} b_j
              \end{aligned}
            </div>
            <p>单位化 <span class="formula-inline">q_i = b_i / \|b_i\|</span>，则 <span class="formula-inline">Q = [q_1\ q_2\ \cdots\ q_n]</span>，
            上三角矩阵元素 <span class="formula-inline">r_{ij} = (a_j, q_i)\ (i \leq j)</span>。</p>
          </div>

          <div class="qr-embedded-animation">
            <p class="qr-animation-intro">在 <span class="formula-inline">\R^3</span> 中观察三个向量逐步正交化的过程。拖动画面旋转视角，滚轮缩放；蓝色为原始向量 aᵢ，绿色为正交向量 bᵢ，橙色虚线为被减去的投影分量。</p>

            <AnimationBox
              title="Gram-Schmidt正交化 (R³)"
              :playing="gsPlaying"
              description="拖动画面旋转视角，滚轮缩放"
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
          </div>

          <ExampleBox source="教材习题p75 第1题" badge="🧮 Gram-Schmidt 例题">
            <template #problem>
              <p>用Schmidt正交化方法求矩阵 <span class="formula-inline">A = \begin{pmatrix} 0 & 1 & 1 \\ 1 & 1 & 0 \\ 1 & 0 & 1 \end{pmatrix}</span> 的QR分解。</p>
            </template>
            <template #solution>
              <div class="step">
                <span class="step-num">1</span>
                <div>
                  <p><strong>正交化：</strong>记列向量为 <span class="formula-inline">a_1 = (0,1,1)\T,\ a_2 = (1,1,0)\T,\ a_3 = (1,0,1)\T</span>。</p>
                  <p><span class="formula-inline">b_1 = a_1 = (0,1,1)\T</span>，<span class="formula-inline">\|b_1\| = \sqrt{2}</span>。</p>
                  <p><span class="formula-inline">b_2 = a_2 - \frac{(a_2,b_1)}{(b_1,b_1)} b_1 = (1,1,0)\T - \frac{1}{2}(0,1,1)\T = (1,\frac{1}{2},-\frac{1}{2})\T</span></p>
                  <p><span class="formula-inline">\|b_2\| = \sqrt{3/2}</span></p>
                  <p><span class="formula-inline">b_3 = a_3 - \frac{(a_3,b_1)}{(b_1,b_1)} b_1 - \frac{(a_3,b_2)}{(b_2,b_2)} b_2 = (1,0,1)\T - \frac{1}{2}(0,1,1)\T - \frac{1}{3}(1,\frac{1}{2},-\frac{1}{2})\T = \frac{2}{3}(1,-1,1)\T</span></p>
                </div>
              </div>
              <div class="step">
                <span class="step-num">2</span>
                <div>
                  <p><strong>单位化得 Q：</strong></p>
                  <p><span class="formula-inline">q_1 = \frac{1}{\sqrt{2}}(0,1,1)\T,\ q_2 = \frac{1}{\sqrt{6}}(2,1,-1)\T,\ q_3 = \frac{1}{\sqrt{3}}(1,-1,1)\T</span></p>
                </div>
              </div>
              <div class="step">
                <span class="step-num">3</span>
                <div>
                  <p><strong>求R：</strong><span class="formula-inline">r_{ij} = (a_j, q_i)\ (i \leq j)</span></p>
                  <div class="formula-block">
                    Q = \begin{pmatrix} 0 & \frac{2}{\sqrt{6}} & \frac{1}{\sqrt{3}} \\ \frac{1}{\sqrt{2}} & \frac{1}{\sqrt{6}} & -\frac{1}{\sqrt{3}} \\ \frac{1}{\sqrt{2}} & -\frac{1}{\sqrt{6}} & \frac{1}{\sqrt{3}} \end{pmatrix},\quad
                    R = \begin{pmatrix} \sqrt{2} & \frac{1}{\sqrt{2}} & \frac{1}{\sqrt{2}} \\ 0 & \frac{\sqrt{6}}{2} & \frac{1}{\sqrt{6}} \\ 0 & 0 & \frac{2}{\sqrt{3}} \end{pmatrix}
                  </div>
                </div>
              </div>
            </template>
          </ExampleBox>
        </div>
      </article>
    </Section>

    <!-- 4. 方法二 Householder（合并旧Section 5 + 6 + 7） -->
    <Section title="方法二：Householder反射" :num="4">
      <article class="qr-method-card qr-method-hh">
        <header class="qr-method-header">
          <div>
            <span class="qr-method-kicker">Method 02</span>
            <h3>Householder 镜面反射</h3>
            <p>构造对称正交矩阵 <span class="formula-inline">H</span> 作为"镜子"，将列向量除第一个分量外全部反射清零，一次处理整列。</p>
          </div>
          <div class="qr-stability-badge">
            <span>数值稳定性</span>
            <strong>★★★</strong>
          </div>
        </header>

        <div class="qr-method-body">
          <div class="qr-method-explain">
      <Theorem title="Householder矩阵（初等反射矩阵）" type="definition" icon="📖">
        设单位向量 <span class="formula-inline">u \in \R^n</span>，则Householder矩阵定义为：
        <Formula>H = I - \frac{2uu\T}{u\T u} = I - 2uu\T</Formula>
        （第二个等号在 <span class="formula-inline">\|u\|=1</span> 时成立）。<br/>
        性质：<span class="formula-inline">H</span> 是对称正交矩阵（<span class="formula-inline">H\T = H</span>，<span class="formula-inline">H\T H = I</span>），
        且 <span class="formula-inline">\det(H) = -1</span>。
      </Theorem>

      <p>
        <strong>核心思想：</strong>给定向量 <span class="formula-inline">x</span>，取
        <span class="formula-inline">u = x - \sign(x_1)\|x\| e_1</span>，
        则 <span class="formula-inline">Hx = \sign(x_1)\|x\| e_1</span>，
        即通过一次镜面反射将 <span class="formula-inline">x</span> 映射到与 <span class="formula-inline">e_1</span> 平行的方向，
        从而将 <span class="formula-inline">x</span> 除第一个分量外全部清零。
      </p>
          </div>

          <div class="qr-embedded-animation">
            <p class="qr-animation-intro">观察向量 <span class="formula-inline">x</span> 经Householder反射映射到 <span class="formula-inline">e_1</span> 方向的过程。镜面法向量 <span class="formula-inline">u</span> 以紫色显示，红色向量 x 经紫色镜面反射后映射到绿色的 -σe₁ 方向。</p>

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
          </div>
      <ExampleBox source="研究生矩阵论考试真题" badge="🧮 Householder 真题例题">
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
                H_1 A = \begin{pmatrix} \sqrt{2} & \sqrt{2} & \sqrt{2} \\ 0 & 2\sqrt{2} & \frac{1}{\sqrt{2}}+2 \\ 0 & 2\sqrt{2} & \frac{1}{\sqrt{2}}-2 \end{pmatrix}
              </div>
            </div>
          </div>
          <div class="step">
            <span class="step-num">3</span>
            <div>
              <p><strong>第二步：对右下角2×2子块构造 <span class="formula-inline">H_2</span></strong></p>
              <p>取 <span class="formula-inline">\tilde{x} = (2\sqrt{2}, 2\sqrt{2})\T</span>，
              <span class="formula-inline">\|\tilde{x}\| = 4</span>，<span class="formula-inline">\sigma_2 = 4</span></p>
              <p><span class="formula-inline">\tilde{u}_2 = \tilde{x} - 4e_1 = (2\sqrt{2}-4, 2\sqrt{2})\T</span></p>
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

      <ExampleBox source="研究生矩阵论考试·标准方法" badge="📝 Householder 标准例题">
        <template #problem>
          <p>用Householder变换求矩阵
            <span class="formula-inline">A = \begin{pmatrix} 1 & 0 & 0 \\ 2 & 2 & 0 \\ 2 & 1 & 6 \end{pmatrix}</span>
            的QR分解。
          </p>
          <p>（注：本题仅需一次反射，适合作为考场标准模板背诵）</p>
        </template>
        <template #solution>
          <div class="step">
            <span class="step-num">1</span>
            <div>
              <p><strong>第一步：确定目标向量 <span class="formula-inline">y</span> 与反射向量 <span class="formula-inline">w</span></strong></p>
              <p>取矩阵 <span class="formula-inline">A</span> 的第一列向量 <span class="formula-inline">x = (1, 2, 2)\T</span>。计算其 2-范数（长度）：</p>
              <p><span class="formula-inline">\|x\| = \sqrt{1^2 + 2^2 + 2^2} = \sqrt{9} = 3</span></p>
              <p>根据数值稳定性原则（目标首项符号与 <span class="formula-inline">x_1</span> 符号相反），取目标向量：</p>
              <p><span class="formula-inline">y = (-\|x\|, 0, 0)\T = (-3, 0, 0)\T</span></p>
              <p>从而得到反射向量 <span class="formula-inline">w</span>：</p>
              <p><span class="formula-inline">w = x - y = (1-(-3), 2-0, 2-0)\T = (4, 2, 2)\T</span></p>
            </div>
          </div>
          <div class="step">
            <span class="step-num">2</span>
            <div>
              <p><strong>第二步：构造 Householder 矩阵 <span class="formula-inline">H</span></strong></p>
              <p>计算 <span class="formula-inline">w</span> 的模长平方：</p>
              <p><span class="formula-inline">\|w\|^2 = 4^2 + 2^2 + 2^2 = 16 + 4 + 4 = 24</span></p>
              <p>计算外积矩阵 <span class="formula-inline">w w\T</span>：</p>
              <div class="formula-block">
                w w\T = \begin{pmatrix} 4 \\ 2 \\ 2 \end{pmatrix}
                \begin{pmatrix} 4 & 2 & 2 \end{pmatrix} =
                \begin{pmatrix}
                  16 & 8 & 8 \\
                  8 & 4 & 4 \\
                  8 & 4 & 4
                \end{pmatrix}
              </div>
              <p>根据公式 <span class="formula-inline">H = I - \frac{2 w w\T}{\|w\|^2}</span>，代入数据：</p>
              <div class="formula-block">
                \begin{aligned}
                H &= I - \frac{2}{24} w w\T
                 = I - \frac{1}{12}
                    \begin{pmatrix}
                      16 & 8 & 8 \\
                      8 & 4 & 4 \\
                      8 & 4 & 4
                    \end{pmatrix} \\[6pt]
                  &= \begin{pmatrix}
                       1 - \frac{4}{3} & 0 - \frac{2}{3} & 0 - \frac{2}{3} \\
                       0 - \frac{2}{3} & 1 - \frac{1}{3} & 0 - \frac{1}{3} \\
                       0 - \frac{2}{3} & 0 - \frac{1}{3} & 1 - \frac{1}{3}
                     \end{pmatrix}
                   = \begin{pmatrix}
                       -\frac{1}{3} & -\frac{2}{3} & -\frac{2}{3} \\
                       -\frac{2}{3} &  \frac{2}{3} & -\frac{1}{3} \\
                       -\frac{2}{3} & -\frac{1}{3} &  \frac{2}{3}
                     \end{pmatrix}
                \end{aligned}
              </div>
            </div>
          </div>
          <div class="step">
            <span class="step-num">3</span>
            <div>
              <p><strong>第三步：计算上三角矩阵 <span class="formula-inline">R</span></strong></p>
              <p>将 <span class="formula-inline">H</span> 左乘原矩阵 <span class="formula-inline">A</span>，即 <span class="formula-inline">R = HA</span>：</p>
              <div class="formula-block">
                R = HA =
                \begin{pmatrix}
                  -\frac{1}{3} & -\frac{2}{3} & -\frac{2}{3} \\
                  -\frac{2}{3} &  \frac{2}{3} & -\frac{1}{3} \\
                  -\frac{2}{3} & -\frac{1}{3} &  \frac{2}{3}
                \end{pmatrix}
                \begin{pmatrix}
                  1 & 0 & 0 \\
                  2 & 2 & 0 \\
                  2 & 1 & 6
                \end{pmatrix}
              </div>
              <p>逐行展开计算：</p>
              <p>▸ <strong>第 1 行乘各列：</strong>
              <span class="formula-inline">r_{11} = -\frac{1}{3}\!\cdot\!1 -\frac{2}{3}\!\cdot\!2 -\frac{2}{3}\!\cdot\!2 = -3</span>，
              <span class="formula-inline">r_{12} = -\frac{1}{3}\!\cdot\!0 -\frac{2}{3}\!\cdot\!2 -\frac{2}{3}\!\cdot\!1 = -2</span>，
              <span class="formula-inline">r_{13} = -\frac{1}{3}\!\cdot\!0 -\frac{2}{3}\!\cdot\!0 -\frac{2}{3}\!\cdot\!6 = -4</span></p>
              <p>▸ <strong>第 2 行乘各列：</strong>
              <span class="formula-inline">r_{21} = -\frac{2}{3}\!\cdot\!1 +\frac{2}{3}\!\cdot\!2 -\frac{1}{3}\!\cdot\!2 = 0</span>，
              <span class="formula-inline">r_{22} = -\frac{2}{3}\!\cdot\!0 +\frac{2}{3}\!\cdot\!2 -\frac{1}{3}\!\cdot\!1 = 1</span>，
              <span class="formula-inline">r_{23} = -\frac{2}{3}\!\cdot\!0 +\frac{2}{3}\!\cdot\!0 -\frac{1}{3}\!\cdot\!6 = -2</span></p>
              <p>▸ <strong>第 3 行乘各列：</strong>
              <span class="formula-inline">r_{31} = -\frac{2}{3}\!\cdot\!1 -\frac{1}{3}\!\cdot\!2 +\frac{2}{3}\!\cdot\!2 = 0</span>，
              <span class="formula-inline">r_{32} = -\frac{2}{3}\!\cdot\!0 -\frac{1}{3}\!\cdot\!2 +\frac{2}{3}\!\cdot\!1 = 0</span>（<strong>触发彩蛋消元！</strong>），
              <span class="formula-inline">r_{33} = -\frac{2}{3}\!\cdot\!0 -\frac{1}{3}\!\cdot\!0 +\frac{2}{3}\!\cdot\!6 = 4</span></p>
              <p>得到：</p>
              <div class="formula-block">
                R = \begin{pmatrix}
                  -3 & -2 & -4 \\
                   0 &  1 & -2 \\
                   0 &  0 &  4
                \end{pmatrix}
              </div>
              <p>可见，<span class="formula-inline">R</span> 已满足上三角矩阵要求（左下角全部为 0）。</p>
            </div>
          </div>
          <div class="step">
            <span class="step-num">4</span>
            <div>
              <p><strong>第四步：写出最终 QR 分解结果</strong></p>
              <p>由于 Householder 矩阵具有对称正交性（<span class="formula-inline">H^{-1} = H</span>），故正交矩阵 <span class="formula-inline">Q = H</span>。最终的 QR 分解为 <span class="formula-inline">A = QR</span>，其中：</p>
              <div class="formula-block">
                \begin{aligned}
                Q &= \begin{pmatrix}
                  -\frac{1}{3} & -\frac{2}{3} & -\frac{2}{3} \\
                  -\frac{2}{3} &  \frac{2}{3} & -\frac{1}{3} \\
                  -\frac{2}{3} & -\frac{1}{3} &  \frac{2}{3}
                \end{pmatrix}, \quad
                R = \begin{pmatrix}
                  -3 & -2 & -4 \\
                   0 &  1 & -2 \\
                   0 &  0 &  4
                \end{pmatrix} \\[8pt]
                A &= QR =
                \begin{pmatrix}
                  -\frac{1}{3} & -\frac{2}{3} & -\frac{2}{3} \\
                  -\frac{2}{3} &  \frac{2}{3} & -\frac{1}{3} \\
                  -\frac{2}{3} & -\frac{1}{3} &  \frac{2}{3}
                \end{pmatrix}
                \begin{pmatrix}
                  -3 & -2 & -4 \\
                   0 &  1 & -2 \\
                   0 &  0 &  4
                \end{pmatrix}
                = \begin{pmatrix} 1 & 0 & 0 \\ 2 & 2 & 0 \\ 2 & 1 & 6 \end{pmatrix}
                \end{aligned}
              </div>
              <div class="summary-box" style="margin-top: 1.2rem; padding: 1rem 1.2rem; background: #fef9c3; border-left: 4px solid #eab308; border-radius: 6px; font-size: 0.92rem;">
                <strong>💡 考场默写口诀</strong>
                <ol style="margin: 0.5rem 0 0 1.2rem; line-height: 1.8;">
                  <li>拿第一列算长度（算出是 3）。</li>
                  <li>反号做目标（变向成 −3）。</li>
                  <li>前减后算出 <span class="formula-inline">w</span>（得 4, 2, 2）。</li>
                  <li>套公式算出 <span class="formula-inline">H</span>（细心算矩阵乘法，别漏了前面的系数）。</li>
                  <li><span class="formula-inline">H \times A</span> 直接吐出 <span class="formula-inline">R</span>（做完矩阵乘法，检查左下角三个数是不是零——全为零则大功告成）。</li>
                  <li>写出 <span class="formula-inline">Q = H</span> 和 <span class="formula-inline">R</span> 的最终矩阵。</li>
                </ol>
              </div>
            </div>
          </div>
        </template>
      </ExampleBox>
        </div>
      </article>
    </Section>

    <!-- 5. 方法三 Givens旋转（全新） -->
    <Section title="方法三：Givens旋转" :num="5">
      <article class="qr-method-card qr-method-givens">
        <header class="qr-method-header">
          <div>
            <span class="qr-method-kicker">Method 03</span>
            <h3>Givens 平面旋转</h3>
            <p>一次只旋转两个坐标轴方向，用局部操作把某个指定元素清零。Householder像"一整面镜子反射"，Givens更像"只在一个二维平面里转一下"。</p>
          </div>
          <div class="qr-stability-badge">
            <span>数值稳定性</span>
            <strong>★★★</strong>
          </div>
        </header>

        <div class="qr-method-body">
          <div class="qr-method-explain">
            <Theorem title="Givens旋转矩阵" type="definition" icon="📖">
              Givens旋转矩阵 <span class="formula-inline">G(i,j,\theta)</span> 是一个只在第 <span class="formula-inline">i</span> 行、第 <span class="formula-inline">j</span> 行作用的平面旋转矩阵，其余行保持不变。其非零元素为：
              <Formula>
                \begin{pmatrix} g_{ii} & g_{ij} \\ g_{ji} & g_{jj} \end{pmatrix}
                = \begin{pmatrix} c & s \\ -s & c \end{pmatrix},\quad
                c = \cos\theta,\ s = \sin\theta,\ c^2 + s^2 = 1
              </Formula>
            </Theorem>
            <p>
              <strong>清零原理：</strong>给定向量 <span class="formula-inline">(x_i, x_j)\T</span>，取
              <span class="formula-inline">r = \sqrt{x_i^2 + x_j^2}</span>，
              令 <span class="formula-inline">c = x_i/r,\ s = x_j/r</span>，则
              <span class="formula-inline">\begin{pmatrix} c & s \\ -s & c \end{pmatrix} \begin{pmatrix} x_i \\ x_j \end{pmatrix} = \begin{pmatrix} r \\ 0 \end{pmatrix}</span>，
              即把 <span class="formula-inline">x_j</span> 分量清零。
            </p>
          </div>

          <div class="givens-diagram-panel">
            <div class="givens-diagram-copy">
              <span class="qr-eyebrow">2D rotation view</span>
              <h4>用旋转把一个分量压到0</h4>
              <p>向量 <span class="formula-inline">(x_i, x_j)</span> 旋转到水平轴上后，第二个分量就被清零。</p>
            </div>
            <svg class="givens-svg" viewBox="0 0 420 300" role="img" aria-label="Givens rotation diagram">
              <defs>
                <marker id="givensArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                  <path d="M0,0 L8,4 L0,8 Z" fill="#8b5cf6"/>
                </marker>
                <linearGradient id="givensArcGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#8b5cf6"/>
                  <stop offset="100%" stop-color="#0d9488"/>
                </linearGradient>
              </defs>
              <rect x="20" y="20" width="380" height="260" rx="22" fill="#faf5ff" stroke="#ddd6fe"/>
              <line x1="70" y1="220" x2="350" y2="220" stroke="#cbd5e1" stroke-width="2"/>
              <line x1="110" y1="250" x2="110" y2="55" stroke="#cbd5e1" stroke-width="2"/>
              <text x="355" y="225" fill="#64748b" font-size="13">i</text>
              <text x="100" y="50" fill="#64748b" font-size="13">j</text>
              <line x1="110" y1="220" x2="245" y2="105" stroke="#ef4444" stroke-width="4" marker-end="url(#givensArrow)"/>
              <circle cx="245" cy="105" r="5" fill="#ef4444"/>
              <text x="252" y="100" fill="#ef4444" font-size="14" font-weight="700">x</text>
              <line x1="110" y1="220" x2="290" y2="220" stroke="#059669" stroke-width="4" marker-end="url(#givensArrow)"/>
              <circle cx="290" cy="220" r="5" fill="#059669"/>
              <text x="276" y="205" fill="#059669" font-size="14" font-weight="700">Gx</text>
              <line x1="245" y1="105" x2="245" y2="220" stroke="#f97316" stroke-width="2" stroke-dasharray="6 5"/>
              <text x="252" y="168" fill="#f97316" font-size="13">要清零的分量</text>
              <path d="M 185 220 A 75 75 0 0 0 168 169" fill="none" stroke="url(#givensArcGrad)" stroke-width="4" marker-end="url(#givensArrow)"/>
              <text x="184" y="177" fill="#8b5cf6" font-size="14" font-weight="700">θ</text>
              <foreignObject x="178" y="235" width="175" height="34">
                <div xmlns="http://www.w3.org/1999/xhtml" class="givens-svg-badge">
                  <span>x<sub>j</sub>' = -sx<sub>i</sub> + cx<sub>j</sub> = 0</span>
                </div>
              </foreignObject>
            </svg>
          </div>

          <ExampleBox source="教材习题p76 第7题" badge="🧮 Givens 例题">
            <template #problem>
              <p>用Givens变换求矩阵 <span class="formula-inline">A = \begin{pmatrix} 2 & 2 & 1 \\ 0 & 2 & 2 \\ 2 & 1 & 2 \end{pmatrix}</span> 的QR分解。</p>
            </template>
            <template #solution>
              <div class="step">
                <span class="step-num">1</span>
                <div>
                  <p><strong>消去(3,1)元：</strong>取第1列的(1,3)平面旋转。向量 <span class="formula-inline">(2,2)\T</span>，<span class="formula-inline">r = 2\sqrt{2}</span>，<span class="formula-inline">c = 1/\sqrt{2},\ s = 1/\sqrt{2}</span>。</p>
                  <div class="formula-block">G_1 = \begin{pmatrix} c & 0 & s \\ 0 & 1 & 0 \\ -s & 0 & c \end{pmatrix}, \quad G_1 A = \begin{pmatrix} 2\sqrt{2} & 3/\sqrt{2} & 3/\sqrt{2} \\ 0 & 2 & 2 \\ 0 & -1/\sqrt{2} & 1/\sqrt{2} \end{pmatrix}</div>
                </div>
              </div>
              <div class="step">
                <span class="step-num">2</span>
                <div>
                  <p><strong>消去(3,2)元：</strong>取第2列的(2,3)平面旋转。<span class="formula-inline">(2, -1/\sqrt{2})\T</span>，<span class="formula-inline">r = 3/\sqrt{2}</span>。</p>
                  <div class="formula-block">G_2 = \begin{pmatrix} 1 & 0 & 0 \\ 0 & c' & s' \\ 0 & -s' & c' \end{pmatrix}, \quad R = G_2 G_1 A = \begin{pmatrix} 2\sqrt{2} & 3/\sqrt{2} & 3/\sqrt{2} \\ 0 & 3/\sqrt{2} & 7/(3\sqrt{2}) \\ 0 & 0 & 4/3 \end{pmatrix}</div>
                </div>
              </div>
              <div class="step">
                <span class="step-num">3</span>
                <div>
                  <p><strong>求 <span class="formula-inline">Q</span>：</strong><span class="formula-inline">Q = G_1\T G_2\T</span>（旋转矩阵的逆等于其转置）。</p>
                  <div class="formula-block">
                    Q = \begin{pmatrix} 1/\sqrt{2} & 1/(3\sqrt{2}) & -2/3 \\ 0 & 2\sqrt{2}/3 & 1/3 \\ 1/\sqrt{2} & -1/(3\sqrt{2}) & 2/3 \end{pmatrix}
                  </div>
                </div>
              </div>
            </template>
          </ExampleBox>
        </div>
      </article>
    </Section>
    <!-- 6. 知识结构图（旧Section 8） -->
    <Section title="知识结构：矩阵三角分解方法谱系" :num="6">
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

    <!-- 7. 真题精讲：LU分解（旧Section 9，改标题） -->
    <Section title="真题精讲：LU分解" :num="7">
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

    <!-- 8. 知识点小结（旧Section 10，新增Givens条目） -->
    <Section title="知识点小结" :num="8">
      <Steps :steps="[
        'LU分解 A=LU：L单位下三角记录Gauss乘数，U上三角为消元结果；顺序主子式非零则存在唯一。',
        'LDU分解 A=LDU：D为对角阵，对称正定时得Cholesky分解 A=LLᵀ。',
        'QR分解 A=QR：Q正交，R上三角；列满秩矩阵存在QR分解。',
        'Gram-Schmidt正交化：逐次减去投影分量得到正交基，再单位化；计算简单但数值稳定性差，适合教学和小规模矩阵。',
        'Householder反射 H=I-2uuᵀ/(uᵀu)：对称正交矩阵，取u=x+sign(x₁)‖x‖e₁可将x反射到e₁方向，一次清零多个元素，数值稳定性好，是实际计算的首选方法。',
        'Givens旋转 G(i,j,θ)：平面旋转矩阵，只作用在两个坐标轴上，适合稀疏矩阵或只需选择性清零少数元素的场景。',
        '方法选择原则：通用计算选Householder，教学理解用Gram-Schmidt，稀疏矩阵或局部操作选Givens旋转。'
      ]"/>
    </Section>

    <!-- 9. 真题与习题汇总 + 课后作业（旧Section 11，重编号） -->
    <Section title="🗂️ 真题与习题汇总">
      <WeekQuizBank :quizzes="quizzes" weekLabel="第2周" />
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

/* ── QR method comparison ── */
.qr-method-comparison {
  margin: 28px 0 34px;
  padding: 24px;
  border: 1px solid #ccfbf1;
  border-radius: 20px;
  background:
    radial-gradient(circle at top left, rgba(13,148,136,0.12), transparent 34%),
    radial-gradient(circle at bottom right, rgba(139,92,246,0.10), transparent 36%),
    #fff;
  box-shadow: 0 18px 45px rgba(15,23,42,0.08);
}
.qr-comparison-heading { max-width: 760px; margin-bottom: 18px; }
.qr-eyebrow, .qr-method-kicker {
  display: inline-flex; align-items: center; gap: 6px; margin-bottom: 8px;
  color: #0d9488; font-size: 12px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;
}
.qr-comparison-heading h3 { margin: 0 0 8px; color: #0f172a; font-size: clamp(22px,3vw,30px); line-height: 1.18; }
.qr-comparison-heading p { margin: 0; color: #475569; line-height: 1.75; }
.qr-table-wrap {
  overflow-x: auto; border: 1px solid #e2e8f0; border-radius: 16px; background: rgba(255,255,255,0.86);
}
.qr-comparison-table { width: 100%; min-width: 840px; border-collapse: collapse; font-size: 14px; }
.qr-comparison-table th {
  padding: 15px 16px; color: #334155; font-size: 13px; font-weight: 800; text-align: left;
  background: #f8fafc; border-bottom: 1px solid #e2e8f0;
}
.qr-comparison-table td {
  padding: 16px; color: #334155; vertical-align: top; border-bottom: 1px solid #edf2f7; line-height: 1.65;
}
.qr-comparison-table tbody tr:last-child td { border-bottom: 0; }
.qr-comparison-table tbody tr { transition: background .18s, transform .18s; }
.qr-comparison-table tbody tr:hover { background: #f8fafc; }
.method-name {
  display: inline-flex; align-items: center; gap: 9px; color: #0f172a; font-weight: 850; white-space: nowrap;
}
.method-dot {
  width: 11px; height: 11px; border-radius: 999px; box-shadow: 0 0 0 5px rgba(13,148,136,0.10);
}
.qr-row-gs .method-dot { background: #0d9488; }
.qr-row-hh .method-dot { background: #3b82f6; }
.qr-row-givens .method-dot { background: #8b5cf6; }
.stability-pill {
  display: inline-flex; align-items: center; margin-bottom: 4px; padding: 4px 9px;
  border-radius: 999px; font-size: 12px; font-weight: 800; white-space: nowrap;
}
.stability-low { color: #92400e; background: #fef3c7; }
.stability-high { color: #047857; background: #d1fae5; }
.qr-comparison-table small { display: block; color: #64748b; font-size: 12px; }

/* ── QR method cards ── */
.qr-method-card {
  --method-color: #0d9488; --method-soft: #ccfbf1; --method-tint: #f0fdfa;
  position: relative; margin: 8px 0 10px; padding: clamp(20px,3vw,30px); overflow: hidden;
  border: 1px solid var(--method-soft); border-radius: 24px;
  background: linear-gradient(135deg, rgba(255,255,255,0.96), rgba(248,250,252,0.92)),
              radial-gradient(circle at 0% 0%, color-mix(in srgb, var(--method-color) 16%, transparent), transparent 32%);
  box-shadow: 0 22px 55px rgba(15,23,42,0.09);
}
.qr-method-card::before {
  content: ""; position: absolute; inset: 0 auto 0 0; width: 6px;
  background: linear-gradient(180deg, var(--method-color), transparent);
}
.qr-method-card::after {
  content: ""; position: absolute; right: -80px; top: -80px; width: 190px; height: 190px;
  border: 1px solid color-mix(in srgb, var(--method-color) 34%, transparent); border-radius: 999px;
  background: color-mix(in srgb, var(--method-color) 8%, transparent); pointer-events: none;
}
.qr-method-gs { --method-color: #0d9488; --method-soft: #99f6e4; --method-tint: #f0fdfa; }
.qr-method-hh { --method-color: #3b82f6; --method-soft: #bfdbfe; --method-tint: #eff6ff; }
.qr-method-givens { --method-color: #8b5cf6; --method-soft: #ddd6fe; --method-tint: #faf5ff; }
.qr-method-header {
  position: relative; z-index: 1; display: grid;
  grid-template-columns: minmax(0,1fr) auto; gap: 18px; align-items: start; margin-bottom: 22px;
}
.qr-method-header h3 { margin: 0 0 8px; color: #0f172a; font-size: clamp(24px,3.3vw,34px); line-height: 1.12; letter-spacing: -0.03em; }
.qr-method-header p { max-width: 760px; margin: 0; color: #475569; font-size: 15px; line-height: 1.75; }
.qr-method-kicker { color: var(--method-color); }
.qr-stability-badge {
  min-width: 132px; padding: 12px 14px; border: 1px solid var(--method-soft); border-radius: 16px;
  background: rgba(255,255,255,0.76); text-align: center; box-shadow: 0 10px 24px rgba(15,23,42,0.06);
}
.qr-stability-badge span { display: block; margin-bottom: 4px; color: #64748b; font-size: 12px; font-weight: 700; }
.qr-stability-badge strong { color: var(--method-color); font-size: 18px; letter-spacing: 0.04em; }
.qr-method-body { position: relative; z-index: 1; display: grid; gap: 18px; }
.qr-method-explain {
  padding: 18px 20px; border: 1px solid #e2e8f0; border-radius: 18px; background: rgba(255,255,255,0.82);
}
.qr-method-explain p { margin: 0 0 12px; color: #334155; line-height: 1.8; }
.qr-method-explain p:last-child { margin-bottom: 0; }
.qr-method-note {
  display: grid; grid-template-columns: auto minmax(0,1fr); gap: 12px; align-items: start;
  padding: 14px 16px; border: 1px solid var(--method-soft); border-radius: 16px;
  background: var(--method-tint); color: #334155;
}
.qr-method-note strong { color: var(--method-color); white-space: nowrap; }
.qr-method-note span { line-height: 1.65; }
.qr-embedded-animation {
  padding: 16px; border: 1px dashed var(--method-soft); border-radius: 20px;
  background: linear-gradient(180deg, rgba(255,255,255,0.78), rgba(248,250,252,0.78));
}
.qr-animation-intro { margin: 0 0 14px; color: #475569; line-height: 1.75; }

/* ── Givens diagram ── */
.givens-diagram-panel {
  display: grid; grid-template-columns: minmax(220px,0.8fr) minmax(320px,1.2fr);
  gap: 20px; align-items: center; padding: 18px; border: 1px solid #ddd6fe; border-radius: 20px;
  background: radial-gradient(circle at top right, rgba(139,92,246,0.12), transparent 34%), #fff;
}
.givens-diagram-copy h4 { margin: 0 0 8px; color: #312e81; font-size: 20px; }
.givens-diagram-copy p { margin: 0; color: #475569; line-height: 1.75; }
.givens-svg { width: 100%; height: auto; display: block; }
.givens-svg-badge {
  display: inline-flex; align-items: center; justify-content: center; height: 30px; padding: 0 10px;
  border: 1px solid #ddd6fe; border-radius: 999px; background: rgba(255,255,255,0.88);
  color: #6d28d9; font-size: 12px; font-weight: 800; white-space: nowrap;
}

/* ── Responsive ── */
@media (max-width: 760px) {
  .qr-method-comparison { padding: 18px; border-radius: 18px; }
  .qr-table-wrap { overflow: visible; border: 0; background: transparent; }
  .qr-comparison-table { min-width: 0; border-collapse: separate; border-spacing: 0 12px; }
  .qr-comparison-table thead { display: none; }
  .qr-comparison-table, .qr-comparison-table tbody, .qr-comparison-table tr, .qr-comparison-table td { display: block; width: 100%; }
  .qr-comparison-table tr {
    padding: 14px; border: 1px solid #e2e8f0; border-radius: 16px;
    background: #fff; box-shadow: 0 10px 24px rgba(15,23,42,0.06);
  }
  .qr-comparison-table td { display: grid; grid-template-columns: 104px minmax(0,1fr); gap: 12px; padding: 10px 0; border-bottom: 1px solid #f1f5f9; }
  .qr-comparison-table td:last-child { border-bottom: 0; }
  .qr-comparison-table td::before { content: attr(data-label); color: #64748b; font-size: 12px; font-weight: 800; }
  .qr-method-card { padding: 18px; border-radius: 20px; }
  .qr-method-header { grid-template-columns: 1fr; }
  .qr-stability-badge { width: fit-content; min-width: 124px; text-align: left; }
  .qr-method-note { grid-template-columns: 1fr; }
  .qr-embedded-animation { padding: 12px; border-radius: 16px; }
  .givens-diagram-panel { grid-template-columns: 1fr; padding: 14px; }
  .givens-svg { min-height: 240px; }
}
</style>
