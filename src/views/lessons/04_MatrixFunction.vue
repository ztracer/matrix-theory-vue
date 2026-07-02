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

      <h3>矩阵序列的收敛性</h3>

      <Theorem title="收敛矩阵的定义" type="definition" icon="📐">
        <p>设 <span class="formula-inline">A \in \C^{n \times n}</span>。若 <span class="formula-inline">\lim_{k\to\infty} A^k = 0</span>（零矩阵），则称 <span class="formula-inline">A</span> 为<strong>收敛矩阵</strong>。</p>
        <p><strong>充要条件：</strong><span class="formula-inline">A</span> 收敛 <span class="formula-inline">\iff</span> 谱半径 <span class="formula-inline">\rho(A) < 1</span>。</p>
        <p><strong>Jordan 块视角：</strong>若 <span class="formula-inline">|\lambda| < 1</span>，则 Jordan 块 <span class="formula-inline">J_r(\lambda)^k \to 0</span>；若 <span class="formula-inline">|\lambda| \ge 1</span>，<span class="formula-inline">J_r(\lambda)^k</span> 发散。</p>
      </Theorem>

      <Theorem title="谱半径 ρ(A)" type="tip" icon="💡">
        <p><strong>定义：</strong><span class="formula-inline">\rho(A) = \max\{|\lambda| : \lambda \in \sigma(A)\}</span>，即 <span class="formula-inline">A</span> 的<strong>最大特征值模长</strong>。</p>
        <p><strong>Gelfand 公式：</strong><span class="formula-inline">\rho(A) = \lim_{k\to\infty} \|A^k\|^{1/k}</span>（对任意矩阵范数成立）。</p>
        <p><strong>核心作用：</strong><span class="formula-inline">\rho(A)</span> 是判断矩阵幂级数是否收敛的唯一指标——与范数无关。</p>
      </Theorem>

      <Theorem title="矩阵幂级数的收敛性" type="theorem">
        <p>幂级数 <span class="formula-inline">\sum_{k=0}^{\infty} c_k A^k</span> 收敛 <span class="formula-inline">\iff</span> 对 <span class="formula-inline">A</span> 的每个特征值 <span class="formula-inline">\lambda</span>，标量级数 <span class="formula-inline">\sum_{k=0}^{\infty} c_k \lambda^k</span> 收敛。</p>
        <p><strong>两个特例：</strong></p>
        <ul>
          <li><span class="formula-inline">e^A</span>：收敛半径 <span class="formula-inline">R = \infty</span>，对任意 <span class="formula-inline">A</span> 都收敛；</li>
          <li>Neumann 级数 <span class="formula-inline">(I-A)^{-1} = \sum_{k=0}^{\infty} A^k</span>：收敛 <span class="formula-inline">\iff \rho(A) < 1</span>。</li>
        </ul>
      </Theorem>

      <ExampleBox title="例题：判断收敛性并计算级数" badge="📝 收敛判断">
        <template #problem>
          <p>设 <span class="formula-inline">A = \begin{pmatrix} 0.5 &amp; 0.1 \\ 0 &amp; 0.8 \end{pmatrix}</span>。判断 <span class="formula-inline">A</span> 是否为收敛矩阵；若 <span class="formula-inline">\rho(A) < 1</span>，用 Neumann 级数求 <span class="formula-inline">(I-A)^{-1}</span>。</p>
        </template>
        <template #solution>
          <p><strong>步骤1：求特征值。</strong><span class="formula-inline">A</span> 是上三角矩阵，特征值即对角线元素：<span class="formula-inline">\lambda_1 = 0.5</span>，<span class="formula-inline">\lambda_2 = 0.8</span>。</p>
          <p><strong>步骤2：算谱半径。</strong><span class="formula-inline">\rho(A) = \max(0.5, 0.8) = 0.8 < 1</span> <span class="formula-inline">\implies</span> <span class="formula-inline">A</span> 为收敛矩阵，<span class="formula-inline">A^k \to 0</span>。</p>
          <p><strong>步骤3：Neumann 级数。</strong><span class="formula-inline">\rho(A) < 1</span> 保证级数收敛：</p>
          <div class="formula-block">(I-A)^{-1} = I + A + A^2 + A^3 + \cdots</div>
          <p><strong>步骤4：直接验证。</strong>级数收敛保证 <span class="formula-inline">(I-A)^{-1}</span> 存在，直接求逆验证其值：<span class="formula-inline">I-A = \begin{pmatrix} 0.5 &amp; -0.1 \\ 0 &amp; 0.2 \end{pmatrix}</span>，<span class="formula-inline">(I-A)^{-1} = \begin{pmatrix} 2 &amp; 1 \\ 0 &amp; 5 \end{pmatrix}</span>。</p>
          <p>对比：若 <span class="formula-inline">A = \begin{pmatrix} 1.2 &amp; 0 \\ 0 &amp; 0.5 \end{pmatrix}</span>，<span class="formula-inline">\rho(A)=1.2 > 1</span>，则 <span class="formula-inline">A^k</span> 发散，<span class="formula-inline">(I-A)^{-1}</span> 的 Neumann 级数<strong>不成立</strong>。</p>
        </template>
      </ExampleBox>
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
        <svg viewBox="0 0 620 360" style="width:100%;max-width:620px;">
          <defs>
            <linearGradient id="bg4" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#f8fafc"/>
              <stop offset="100%" stop-color="#eef2ff"/>
            </linearGradient>
            <marker id="arr4" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#94a3b8"/>
            </marker>
          </defs>

          <!-- Background -->
          <rect x="4" y="4" width="612" height="352" rx="14" fill="url(#bg4)" stroke="#cbd5e1" stroke-width="1"/>

          <!-- Title -->
          <text x="310" y="28" text-anchor="middle" font-size="14" font-weight="700" fill="#334155">插值条件：让 p(λ) 在特征值处匹配 f(λ)</text>

          <!-- Axes -->
          <line x1="50" y1="270" x2="580" y2="270" stroke="#94a3b8" stroke-width="1.2" marker-end="url(#arr4)"/>
          <line x1="50" y1="270" x2="50" y2="45" stroke="#94a3b8" stroke-width="1.2" marker-end="url(#arr4)"/>
          <text x="588" y="274" font-size="12" fill="#94a3b8">λ</text>

          <!-- f(λ) curve — blue solid, always visible -->
          <path d="M 65 245 C 140 140, 220 140, 310 120 C 390 102, 445 75, 510 56" fill="none" stroke="#2563eb" stroke-width="2.5"/>
          <text x="530" y="48" font-size="13" fill="#2563eb" font-weight="600">f(λ)</text>

          <!-- p(λ) curve — purple dashed, appears via animation -->
          <path class="curve-p" d="M 65 250 C 145 135, 215 145, 310 120 C 395 98, 450 70, 510 56" fill="none" stroke="#8b5cf6" stroke-width="2" stroke-dasharray="8 5" stroke-dashoffset="600" stroke-linecap="round"/>
          <text class="label-p" x="550" y="64" font-size="13" fill="#8b5cf6" font-weight="600" opacity="0">p(λ)</text>

          <!-- Vertical dashed lines from eigenvalues to curve -->
          <line class="vl vl1" x1="140" y1="270" x2="140" y2="175" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="4 3"/>
          <line class="vl vl2" x1="310" y1="270" x2="310" y2="120" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="4 3"/>
          <line class="vl vl3" x1="460" y1="270" x2="460" y2="70" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="4 3"/>

          <!-- Eigenvalue labels on x-axis -->
          <text class="ev-label ev-l1" x="140" y="292" text-anchor="middle" font-size="14" font-weight="700" fill="#475569">λ₁</text>
          <text class="ev-label ev-l2" x="310" y="292" text-anchor="middle" font-size="14" font-weight="700" fill="#475569">λ₂</text>
          <text class="ev-label ev-l3" x="460" y="292" text-anchor="middle" font-size="14" font-weight="700" fill="#475569">λ₃</text>

          <!-- Multiplicity badges -->
          <text class="ev-badge ev-b1" x="140" y="308" text-anchor="middle" font-size="11" fill="#8b5cf6">二重根</text>
          <text class="ev-badge ev-b2" x="310" y="308" text-anchor="middle" font-size="11" fill="#64748b">单根</text>
          <text class="ev-badge ev-b3" x="460" y="308" text-anchor="middle" font-size="11" fill="#64748b">单根</text>

          <!-- Intersection points on curve -->
          <circle class="pt pt1" cx="140" cy="175" r="6" fill="#f59e0b" stroke="#fff" stroke-width="2.5"/>
          <circle class="pt pt2" cx="310" cy="120" r="6" fill="#94a3b8" stroke="#fff" stroke-width="2.5"/>
          <circle class="pt pt3" cx="460" cy="70" r="6" fill="#94a3b8" stroke="#fff" stroke-width="2.5"/>

          <!-- Tangent line at λ₁ (double root) — f'(λ₁)=p'(λ₁) -->
          <g class="tangent-group">
            <line x1="80" y1="220" x2="200" y2="130" stroke="#f59e0b" stroke-width="1.8" stroke-dasharray="4 3"/>
            <text x="210" y="125" font-size="11" fill="#f59e0b" font-weight="600">切线重合</text>
          </g>

          <!-- Bottom info panel -->
          <rect class="info-panel" x="30" y="320" width="560" height="35" rx="8" fill="#f0f9ff" stroke="#bae6fd" stroke-width="1"/>
          <text class="info-text info-t0" x="310" y="343" text-anchor="middle" font-size="13" fill="#0c4a6e">
            目标：只需求出 p(λ)，即可用 p(A) 代替 f(A)
          </text>
          <text class="info-text info-t1" x="310" y="343" text-anchor="middle" font-size="13" fill="#0c4a6e" opacity="0">
            λ₁ 是二重根 → 匹配函数值 f(λ₁)=p(λ₁) + 导数 f'(λ₁)=p'(λ₁)
          </text>
          <text class="info-text info-t2" x="310" y="343" text-anchor="middle" font-size="13" fill="#0c4a6e" opacity="0">
            λ₂ 是单根 → 只需匹配函数值 f(λ₂)=p(λ₂)
          </text>
          <text class="info-text info-t3" x="310" y="343" text-anchor="middle" font-size="13" fill="#0c4a6e" opacity="0">
            λ₃ 是单根 → 只需匹配函数值 f(λ₃)=p(λ₃)
          </text>
          <text class="info-text info-t4" x="310" y="343" text-anchor="middle" font-size="13" fill="#059669" font-weight="600" opacity="0">
            全部条件满足 → 令 f(A) = p(A)，用低次多项式替代矩阵函数
          </text>
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
/* 插值条件动画 */
.curve-p {
  animation: drawCurve 10s ease-in-out infinite;
}
.label-p {
  animation: fadeInLabel 10s ease-in-out infinite;
}
@keyframes drawCurve {
  0%, 5% { stroke-dashoffset: 600; }
  20%, 100% { stroke-dashoffset: 0; }
}
@keyframes fadeInLabel {
  0%, 15% { opacity: 0; }
  25%, 100% { opacity: 1; }
}

/* Vertical lines */
.vl { opacity: 0.25; transition: opacity 0.6s; }
@keyframes vlPulse1 {
  0%, 30% { opacity: 0.25; stroke: #cbd5e1; }
  38%, 48% { opacity: 0.9; stroke: #f59e0b; stroke-width: 2; }
  58%, 100% { opacity: 0.25; stroke: #cbd5e1; stroke-width: 1; }
}
@keyframes vlPulse2 {
  0%, 48% { opacity: 0.25; stroke: #cbd5e1; }
  56%, 66% { opacity: 0.8; stroke: #3b82f6; stroke-width: 2; }
  76%, 100% { opacity: 0.25; stroke: #cbd5e1; stroke-width: 1; }
}
@keyframes vlPulse3 {
  0%, 66% { opacity: 0.25; stroke: #cbd5e1; }
  74%, 84% { opacity: 0.8; stroke: #3b82f6; stroke-width: 2; }
  94%, 100% { opacity: 0.25; stroke: #cbd5e1; stroke-width: 1; }
}
.vl1 { animation: vlPulse1 10s ease-in-out infinite; }
.vl2 { animation: vlPulse2 10s ease-in-out infinite; }
.vl3 { animation: vlPulse3 10s ease-in-out infinite; }

/* Eigenvalue labels — highlight on active */
.ev-label { transition: fill 0.6s, font-size 0.6s; }
@keyframes evGlow1 {
  0%, 30% { fill: #475569; font-size: 14px; }
  38%, 48% { fill: #f59e0b; font-size: 16px; }
  58%, 100% { fill: #475569; font-size: 14px; }
}
@keyframes evGlow2 {
  0%, 48% { fill: #475569; font-size: 14px; }
  56%, 66% { fill: #3b82f6; font-size: 16px; }
  76%, 100% { fill: #475569; font-size: 14px; }
}
@keyframes evGlow3 {
  0%, 66% { fill: #475569; font-size: 14px; }
  74%, 84% { fill: #3b82f6; font-size: 16px; }
  94%, 100% { fill: #475569; font-size: 14px; }
}
.ev-l1 { animation: evGlow1 10s ease-in-out infinite; }
.ev-l2 { animation: evGlow2 10s ease-in-out infinite; }
.ev-l3 { animation: evGlow3 10s ease-in-out infinite; }

/* Badges */
.ev-badge { opacity: 0.6; transition: opacity 0.6s; }
@keyframes badge1 { 0%,30%{opacity:0.6} 38%,48%{opacity:1} 58%,100%{opacity:0.6} }
@keyframes badge2 { 0%,48%{opacity:0.6} 56%,66%{opacity:1} 76%,100%{opacity:0.6} }
@keyframes badge3 { 0%,66%{opacity:0.6} 74%,84%{opacity:1} 94%,100%{opacity:0.6} }
.ev-b1 { animation: badge1 10s ease-in-out infinite; }
.ev-b2 { animation: badge2 10s ease-in-out infinite; }
.ev-b3 { animation: badge3 10s ease-in-out infinite; }

/* Intersection points */
.pt { transition: r 0.5s, fill 0.5s; }
@keyframes ptGlow1 { 0%,30%{fill:#94a3b8;r:5} 38%,48%{fill:#f59e0b;r:8} 58%,100%{fill:#94a3b8;r:5} }
@keyframes ptGlow2 { 0%,48%{fill:#94a3b8;r:5} 56%,66%{fill:#f59e0b;r:8} 76%,100%{fill:#94a3b8;r:5} }
@keyframes ptGlow3 { 0%,66%{fill:#94a3b8;r:5} 74%,84%{fill:#f59e0b;r:8} 94%,100%{fill:#94a3b8;r:5} }
.pt1 { animation: ptGlow1 10s ease-in-out infinite; }
.pt2 { animation: ptGlow2 10s ease-in-out infinite; }
.pt3 { animation: ptGlow3 10s ease-in-out infinite; }

/* Tangent group — only visible during λ₁ phase */
.tangent-group {
  animation: tangentShow 10s ease-in-out infinite;
}
@keyframes tangentShow {
  0%, 30% { opacity: 0.15; }
  38%, 48% { opacity: 1; }
  58%, 100% { opacity: 0.15; }
}

/* Info panel text rotation */
.info-text { transition: opacity 0.5s; }
@keyframes infoCycle0 {
  0%, 10% { opacity: 1; } 12%, 100% { opacity: 0; }
}
@keyframes infoCycle1 {
  0%, 30% { opacity: 0; } 38%, 46% { opacity: 1; } 50%, 100% { opacity: 0; }
}
@keyframes infoCycle2 {
  0%, 48% { opacity: 0; } 56%, 64% { opacity: 1; } 68%, 100% { opacity: 0; }
}
@keyframes infoCycle3 {
  0%, 66% { opacity: 0; } 74%, 82% { opacity: 1; } 86%, 100% { opacity: 0; }
}
@keyframes infoCycle4 {
  0%, 85% { opacity: 0; } 92%, 100% { opacity: 1; }
}
.info-t0 { animation: infoCycle0 10s ease-in-out infinite; }
.info-t1 { animation: infoCycle1 10s ease-in-out infinite; }
.info-t2 { animation: infoCycle2 10s ease-in-out infinite; }
.info-t3 { animation: infoCycle3 10s ease-in-out infinite; }
.info-t4 { animation: infoCycle4 10s ease-in-out infinite; }
</style>
