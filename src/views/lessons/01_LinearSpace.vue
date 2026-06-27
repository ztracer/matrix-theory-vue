<template>
  <LessonLayout :lesson-id="1" title="线性空间与线性子空间" subtitle="Linear Space & Subspaces">
    <Section num="1" title="线性空间的定义与公理">
      <p>
        线性空间（向量空间）是矩阵论最基本的代数结构。设 <span class="formula-inline">V</span> 是非空集合，
        <span class="formula-inline">\mathbb{F}</span> 为数域，在 <span class="formula-inline">V</span> 上定义加法
        <span class="formula-inline">+</span> 和数乘 <span class="formula-inline">\cdot</span>，满足以下 8 条公理，
        则称 <span class="formula-inline">V</span> 为 <span class="formula-inline">\mathbb{F}</span> 上的线性空间。
      </p>

      <Theorem title="线性空间八条公理" type="definition" icon="📐">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px 20px; font-size:14px;">
          <div><strong>加法：</strong></div><div></div>
          <div>(A1) 交换律：<span class="formula-inline">\alpha+\beta=\beta+\alpha</span></div>
          <div>(A2) 结合律：<span class="formula-inline">(\alpha+\beta)+\gamma=\alpha+(\beta+\gamma)</span></div>
          <div>(A3) 零元存在：<span class="formula-inline">\exists\,0\in V,\ \alpha+0=\alpha</span></div>
          <div>(A4) 负元存在：<span class="formula-inline">\exists(-\alpha),\ \alpha+(-\alpha)=0</span></div>
          <div><strong>数乘：</strong></div><div></div>
          <div>(M1) 数乘结合：<span class="formula-inline">k(l\alpha)=(kl)\alpha</span></div>
          <div>(M2) 单位数乘：<span class="formula-inline">1\cdot\alpha=\alpha</span></div>
          <div>(M3) 向量分配：<span class="formula-inline">k(\alpha+\beta)=k\alpha+k\beta</span></div>
          <div>(M4) 数量分配：<span class="formula-inline">(k+l)\alpha=k\alpha+l\alpha</span></div>
        </div>
      </Theorem>

      <p>常见线性空间：<span class="formula-inline">\mathbb{R}^n</span>、<span class="formula-inline">\mathbb{C}^{m\times n}</span>、
        <span class="formula-inline">P_n[x]</span>（次数不超过 n 的多项式空间）、<span class="formula-inline">C[a,b]</span>（连续函数空间）等。</p>
    </Section>

    <Section num="2" title="线性子空间">
      <p>设 <span class="formula-inline">W\subseteq V</span>，若 <span class="formula-inline">W</span> 关于 <span class="formula-inline">V</span> 的加法和数乘也构成线性空间，则称 <span class="formula-inline">W</span> 为 <span class="formula-inline">V</span> 的子空间。</p>

      <Theorem title="子空间判定定理" type="theorem">
        <span class="formula-inline">W\subseteq V</span> 是子空间 <span class="formula-inline">\iff</span>
        <Formula display>W \neq \emptyset \quad\text{且}\quad \forall\alpha,\beta\in W,\ \forall k,l\in\mathbb{F},\ k\alpha+l\beta\in W</Formula>
        即：<span class="formula-inline">W</span> 对线性组合封闭。特别地，<span class="formula-inline">0\in W</span>。
      </Theorem>

      <Theorem title="生成子空间" type="definition" icon="🔹">
        给定向量组 <span class="formula-inline">\alpha_1,\dots,\alpha_s\in V</span>，其所有线性组合构成的集合
        <Formula display>\operatorname{span}\{\alpha_1,\dots,\alpha_s\} = \left\{\sum_{i=1}^s k_i\alpha_i \,\Big|\, k_i\in\mathbb{F}\right\}</Formula>
        是 <span class="formula-inline">V</span> 的子空间，称为由 <span class="formula-inline">\alpha_1,\dots,\alpha_s</span> 生成（张成）的子空间。
      </Theorem>

      <AnimationBox title="R³ 中过原点的平面/直线是子空间" mode="auto"
        description="用真实3D投影观察：平面过原点，α、β 以及 α+β 始终落在同一个二维子空间内。">
        <svg viewBox="0 0 600 400" ref="svg1Ref" style="width:100%;max-width:600px;">
          <defs>
            <linearGradient id="planeGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#6366f1" stop-opacity="0.25"/>
              <stop offset="100%" stop-color="#7c3aed" stop-opacity="0.15"/>
            </linearGradient>
          </defs>
          <g>
            <polygon :points="planePoints1" fill="url(#planeGrad1)" stroke="#6366f1" stroke-width="1.5" stroke-opacity="0.7"/>
            <line :x1="origin1.x" :y1="origin1.y" :x2="axis1X.x" :y2="axis1X.y" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arrowGray)"/>
            <line :x1="origin1.x" :y1="origin1.y" :x2="axis1Y.x" :y2="axis1Y.y" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arrowGray)"/>
            <line :x1="origin1.x" :y1="origin1.y" :x2="axis1Z.x" :y2="axis1Z.y" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arrowGray)"/>
            <text :x="axis1X.x + 8" :y="axis1X.y" fill="#64748b" font-size="13">x</text>
            <text :x="axis1Y.x - 18" :y="axis1Y.y + 8" fill="#64748b" font-size="13">y</text>
            <text :x="axis1Z.x + 6" :y="axis1Z.y - 6" fill="#64748b" font-size="13">z</text>
            <line :x1="origin1.x" :y1="origin1.y" :x2="vec1A.x" :y2="vec1A.y" stroke="#4338ca" stroke-width="2.5" marker-end="url(#arrowBlue)"/>
            <line :x1="origin1.x" :y1="origin1.y" :x2="vec1B.x" :y2="vec1B.y" stroke="#7c3aed" stroke-width="2.5" marker-end="url(#arrowPurple)"/>
            <line :x1="origin1.x" :y1="origin1.y" :x2="vec1Sum.x" :y2="vec1Sum.y" stroke="#ec4899" stroke-width="2.5" marker-end="url(#arrowPink)" stroke-dasharray="6,3"/>
            <line :x1="vec1A.x" :y1="vec1A.y" :x2="vec1Sum.x" :y2="vec1Sum.y" stroke="#ec4899" stroke-width="1" stroke-dasharray="4,3" opacity="0.5"/>
            <line :x1="vec1B.x" :y1="vec1B.y" :x2="vec1Sum.x" :y2="vec1Sum.y" stroke="#ec4899" stroke-width="1" stroke-dasharray="4,3" opacity="0.5"/>
            <text :x="vec1A.x + 10" :y="vec1A.y - 5" fill="#4338ca" font-size="13" font-weight="bold">α</text>
            <text :x="vec1B.x - 20" :y="vec1B.y - 5" fill="#7c3aed" font-size="13" font-weight="bold">β</text>
            <text :x="vec1Sum.x + 8" :y="vec1Sum.y + 5" fill="#ec4899" font-size="13" font-weight="bold">α+β</text>
            <circle :cx="origin1.x" :cy="origin1.y" r="4" fill="#1e293b"/>
            <text :x="origin1.x - 15" :y="origin1.y + 20" fill="#1e293b" font-size="12">0</text>
          </g>
          <defs>
            <marker id="arrowGray" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#94a3b8"/>
            </marker>
            <marker id="arrowBlue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#4338ca"/>
            </marker>
            <marker id="arrowPurple" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#7c3aed"/>
            </marker>
            <marker id="arrowPink" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#ec4899"/>
            </marker>
          </defs>
        </svg>
      </AnimationBox>
    </Section>

    <Section num="3" title="基、维数与坐标">
      <Theorem title="基与维数" type="definition" icon="📏">
        设 <span class="formula-inline">V</span> 是线性空间，若存在向量组 <span class="formula-inline">\varepsilon_1,\varepsilon_2,\dots,\varepsilon_n\in V</span>，满足：
        <ol style="margin:8px 0 0 20px;">
          <li><strong>线性无关</strong>：<span class="formula-inline">k_1\varepsilon_1+\cdots+k_n\varepsilon_n=0\Rightarrow k_1=\cdots=k_n=0</span></li>
          <li><strong>张成空间</strong>：<span class="formula-inline">\forall\alpha\in V,\ \alpha=\sum_{i=1}^n x_i\varepsilon_i</span></li>
        </ol>
        则称 <span class="formula-inline">\varepsilon_1,\dots,\varepsilon_n</span> 为 <span class="formula-inline">V</span> 的一组<strong>基</strong>，
        <span class="formula-inline">n</span> 为 <span class="formula-inline">V</span> 的<strong>维数</strong>，记 <span class="formula-inline">\dim V=n</span>。
        系数 <span class="formula-inline">(x_1,\dots,x_n)^T</span> 称为 <span class="formula-inline">\alpha</span> 在该基下的<strong>坐标</strong>。
      </Theorem>

      <p>
        <strong>关键性质：</strong><br>
        ① <span class="formula-inline">\dim V=n</span> 中任意 <span class="formula-inline">n+1</span> 个向量必线性相关；<br>
        ② 任意 <span class="formula-inline">n</span> 个线性无关向量都是一组基；<br>
        ③ 线性子空间 <span class="formula-inline">W\subseteq V\Rightarrow\dim W\leq\dim V</span>。
      </p>
    </Section>

    <Section num="4" title="基扩定理 (Basis Extension Theorem)">
      <Theorem title="基扩定理" type="theorem">
        设 <span class="formula-inline">W</span> 为有限维线性空间 <span class="formula-inline">V</span> 的子空间，则
        <span class="formula-inline">W</span> 的任意一组基都可以扩充为 <span class="formula-inline">V</span> 的基。
      </Theorem>

      <p><strong>直观理解：</strong>基扩定理是说，一个子空间里已有的线性无关向量组，可以通过"添人"的方式，把它扩充成整个大空间的一组基。这是一切维数论证的基石——当我们需要比较不同子空间的维数关系时，默认操作就是从交空间的基出发，向两边分别扩充。</p>

      <p><strong>核心推论：</strong></p>
      <ul style="margin:8px 0 0 20px;">
        <li>若 <span class="formula-inline">W\subseteq V</span>，则 <span class="formula-inline">\dim W\leq\dim V</span>，且等号成立当且仅当 <span class="formula-inline">W=V</span>；</li>
        <li>任意线性无关向量组都可扩充为一组基；</li>
        <li>替换定理（Steinitz）：设 <span class="formula-inline">\alpha_1,\dots,\alpha_r</span> 线性无关，则可从一组基中选出 <span class="formula-inline">n-r</span> 个向量与之合并，仍是基。</li>
      </ul>

      <AnimationBox title="基扩定理：从子空间基扩充到全空间" mode="interactive" :playing="playingBasisExt" @play="playBasisExt" @pause="pauseBasisExt" @reset="resetBasisExt"
        description="从 W 的基出发，逐个测试 V 中的新方向；只有保持线性无关的向量会进入最终基。">
        <svg viewBox="0 0 720 360" ref="svgBasisExtRef" class="lesson1-board">
          <defs>
            <marker id="arrowBasisLine" markerWidth="5" markerHeight="4" refX="5" refY="2" orient="auto"><polygon points="0 0,5 2,0 4" fill="#475569"/></marker>
          </defs>

          <rect x="36" y="28" width="648" height="304" rx="18" fill="#f8fafc" stroke="#e2e8f0"/>
          <text x="68" y="68" fill="#0f172a" font-size="18" font-weight="800">扩基不是“乱加向量”</text>
          <text x="68" y="92" fill="#64748b" font-size="13">保持已有基不动，只接纳能提供新方向的向量。</text>

          <g transform="translate(58 122)">
            <rect x="0" y="0" width="262" height="164" rx="14" fill="#ffffff" stroke="#dbe4f0"/>
            <text x="20" y="30" fill="#334155" font-size="13" font-weight="700">几何直觉</text>
            <polygon points="44,122 216,88 236,112 64,146" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
            <text x="68" y="132" fill="#1d4ed8" font-size="14" font-weight="800">W</text>
            <circle cx="84" cy="128" r="4" fill="#0f172a"/>
            <g v-for="vector in basisSceneVectors" :key="vector.id">
              <line x1="84" y1="128" :x2="vector.x" :y2="vector.y" :stroke="vector.color" stroke-width="2.5" stroke-linecap="round" marker-end="url(#arrowBasisLine)" :opacity="vector.opacity"/>
              <text :x="vector.x + vector.labelDx" :y="vector.y + vector.labelDy" :fill="vector.text" font-size="13" font-weight="800" :opacity="vector.opacity">{{ vector.id }}</text>
            </g>
            <path d="M48 112 C96 80, 172 74, 224 92" fill="none" stroke="#7c3aed" stroke-width="2" stroke-dasharray="6,5" :opacity="basisTestOpacity"/>
            <text x="154" y="76" fill="#6d28d9" font-size="12" font-weight="800" :opacity="basisTestOpacity">检验：是否带来新方向？</text>
          </g>

          <g transform="translate(352 118)">
            <text x="0" y="16" fill="#334155" font-size="13" font-weight="700">当前基向量</text>
            <g v-for="(slot, idx) in basisSlots" :key="slot.id" :transform="`translate(${(idx % 3) * 104}, ${34 + Math.floor(idx / 3) * 76})`">
              <rect x="0" y="0" width="86" height="54" rx="12" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
              <rect x="0" y="0" width="86" height="54" rx="12" :fill="slot.kind === 'gamma' ? '#eff6ff' : '#faf5ff'" :stroke="slot.kind === 'gamma' ? '#93c5fd' : '#c4b5fd'" stroke-width="1.5" :opacity="slot.opacity"/>
              <text x="43" y="32" text-anchor="middle" :fill="slot.kind === 'gamma' ? '#1d4ed8' : '#6d28d9'" font-size="18" font-weight="800" :opacity="slot.opacity">{{ slot.id }}</text>
              <text x="43" y="70" text-anchor="middle" fill="#94a3b8" font-size="11">{{ idx + 1 }}</text>
            </g>
            <rect x="0" y="196" width="294" height="54" rx="14" fill="#ecfdf5" stroke="#10b981" stroke-width="2" :opacity="revealAmount(basisExtProgress, 0.9, 0.1)"/>
            <text x="147" y="229" text-anchor="middle" fill="#047857" font-size="15" font-weight="800" :opacity="revealAmount(basisExtProgress, 0.9, 0.1)">这些向量组成 V 的一组基</text>
          </g>

          <g transform="translate(80 292)">
            <circle cx="0" cy="-4" r="4" fill="#2563eb"/>
            <text x="12" y="0" fill="#475569" font-size="12">γ：W 中已有基</text>
            <circle cx="0" cy="18" r="4" fill="#7c3aed"/>
            <text x="12" y="22" fill="#475569" font-size="12">α：补进 V 的新方向</text>
          </g>
          <text x="360" y="322" text-anchor="middle" fill="#334155" font-size="13" font-weight="700">{{ basisExtCaption }}</text>
        </svg>
      </AnimationBox>
    </Section>

    <Section num="5" title="子空间的和与交、维数公式">
      <Theorem title="交空间与和空间" type="definition" icon="🔗">
        设 <span class="formula-inline">W_1,W_2</span> 是 <span class="formula-inline">V</span> 的子空间，则：
        <ul style="margin:8px 0 0 20px;">
          <li><strong>交</strong>：<span class="formula-inline">W_1\cap W_2=\{\alpha\mid\alpha\in W_1\text{ 且 }\alpha\in W_2\}</span>（子空间）</li>
          <li><strong>和</strong>：<span class="formula-inline">W_1+W_2=\{\alpha_1+\alpha_2\mid\alpha_1\in W_1,\alpha_2\in W_2\}</span>（子空间）</li>
        </ul>
      </Theorem>

      <Theorem title="维数公式" type="theorem">
        <Formula display>\dim(W_1+W_2)=\dim W_1+\dim W_2-\dim(W_1\cap W_2)</Formula>
      </Theorem>

      <p style="margin-top:16px;"><strong>为什么维数公式成立？—— 一个基于"基扩定理"的严格证明：</strong></p>

      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:16px; margin:12px 0;">
        <p style="margin:0 0 12px 0; font-weight:600; color:#1e293b;">📐 证明思路：从交空间的基出发 → 向两边扩充 → 合并得到和空间的基 → 数向量个数</p>

        <div style="margin-left:8px;">
          <p style="margin:6px 0;"><strong>步骤 1：寻找交空间的基</strong></p>
          <p style="margin:2px 0 8px 16px; color:#475569;">
            设 <span class="formula-inline">\dim(W_1\cap W_2)=r</span>，取一组基：<span class="formula-inline">\gamma_1,\gamma_2,\dots,\gamma_r</span>
          </p>

          <p style="margin:6px 0;"><strong>步骤 2：扩充为 W₁ 的基（基扩定理）</strong></p>
          <p style="margin:2px 0 8px 16px; color:#475569;">
            设 <span class="formula-inline">\dim W_1=r+p</span>，扩充后 W₁ 的基为：<span class="formula-inline">\gamma_1,\dots,\gamma_r,\alpha_1,\dots,\alpha_p</span>
          </p>

          <p style="margin:6px 0;"><strong>步骤 3：扩充为 W₂ 的基（基扩定理）</strong></p>
          <p style="margin:2px 0 8px 16px; color:#475569;">
            设 <span class="formula-inline">\dim W_2=r+q</span>，扩充后 W₂ 的基为：<span class="formula-inline">\gamma_1,\dots,\gamma_r,\beta_1,\dots,\beta_q</span>
          </p>

          <p style="margin:6px 0;"><strong>步骤 4：合并，证明是 W₁+W₂ 的基</strong></p>
          <p style="margin:2px 0 4px 16px; color:#475569;">
            考虑向量组：<span class="formula-inline">\{\gamma_1,\dots,\gamma_r,\alpha_1,\dots,\alpha_p,\beta_1,\dots,\beta_q\}</span>
          </p>
          <p style="margin:2px 0 4px 16px; color:#475569;">可以证明：这组向量既能线性表出 W₁+W₂ 中的任意向量（张成性），又是线性无关的（独立性）。</p>

          <p style="margin:6px 0;"><strong>步骤 5：数个数 = 代入公式验证</strong></p>
          <p style="margin:2px 0 4px 16px; color:#475569;">
            向量总数为 <span class="formula-inline">r+p+q</span>。代入公式：
          </p>
          <Formula display>\begin{aligned} \dim(W_1+W_2) &= r+p+q \\ \dim W_1+\dim W_2-\dim(W_1\cap W_2) &= (r+p)+(r+q)-r = r+p+q \end{aligned}</Formula>
          <p style="margin:4px 0 0 16px; color:#475569;">两边相等，证毕 ✓</p>
        </div>
      </div>

      <Theorem title="容斥原理类比" type="tip" icon="💡">
        维数公式与集合论中的<strong>容斥原理</strong>形式完全一致：
        <Formula display>|A\cup B| = |A|+|B|-|A\cap B|</Formula>
        算维数（空间的"大小"）也是同样的道理：直接相加时，交空间 <span class="formula-inline">W_1\cap W_2</span> 被重复计算了两次，所以必须减去一次。这就是大自然里重叠部分永远要被扣除的数学本质。
      </Theorem>

      <AnimationBox title="子空间的和与交（平面 + 平面）" mode="auto"
        description="用真实3D投影观察两个过原点平面：它们都包含同一条橙色交线，两个平面的和张成整个 R³。">
        <svg viewBox="0 0 600 400" ref="svg2Ref" style="width:100%;max-width:600px;">
          <defs>
            <linearGradient id="planeW1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#6366f1" stop-opacity="0.3"/>
              <stop offset="100%" stop-color="#6366f1" stop-opacity="0.1"/>
            </linearGradient>
            <linearGradient id="planeW2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ec4899" stop-opacity="0.25"/>
              <stop offset="100%" stop-color="#ec4899" stop-opacity="0.1"/>
            </linearGradient>
          </defs>
          <g>
            <polygon :points="w1Points" fill="url(#planeW1)" stroke="#6366f1" stroke-width="1.5"/>
            <polygon :points="w2Points" fill="url(#planeW2)" stroke="#ec4899" stroke-width="1.5"/>
            <line :x1="line2A.x" :y1="line2A.y" :x2="line2B.x" :y2="line2B.y" stroke="#f59e0b" stroke-width="3" marker-end="url(#arrowOrange)" marker-start="url(#arrowOrange)"/>
            <line :x1="origin2.x" :y1="origin2.y" :x2="axis2X.x" :y2="axis2X.y" stroke="#94a3b8" stroke-width="1" marker-end="url(#arrowGray2)"/>
            <line :x1="origin2.x" :y1="origin2.y" :x2="axis2Y.x" :y2="axis2Y.y" stroke="#94a3b8" stroke-width="1" marker-end="url(#arrowGray2)"/>
            <line :x1="origin2.x" :y1="origin2.y" :x2="axis2Z.x" :y2="axis2Z.y" stroke="#94a3b8" stroke-width="1" marker-end="url(#arrowGray2)"/>
            <text :x="axis2X.x + 8" :y="axis2X.y" fill="#64748b" font-size="12">x</text>
            <text :x="axis2Y.x - 18" :y="axis2Y.y + 8" fill="#64748b" font-size="12">y</text>
            <text :x="axis2Z.x + 6" :y="axis2Z.y - 6" fill="#64748b" font-size="12">z</text>
            <text :x="labelW1.x" :y="labelW1.y" fill="#4338ca" font-size="14" font-weight="bold">W₁</text>
            <text :x="labelW2.x" :y="labelW2.y" fill="#be185d" font-size="14" font-weight="bold">W₂</text>
            <text :x="line2B.x + 8" :y="line2B.y" fill="#d97706" font-size="13" font-weight="bold">W₁∩W₂</text>
            <circle :cx="origin2.x" :cy="origin2.y" r="4" fill="#1e293b"/>
          </g>
          <defs>
            <marker id="arrowGray2" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
              <polygon points="0 0, 7 2.5, 0 5" fill="#94a3b8"/>
            </marker>
            <marker id="arrowOrange" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
              <polygon points="0 0, 7 2.5, 0 5" fill="#f59e0b"/>
            </marker>
          </defs>
        </svg>
      </AnimationBox>

      <AnimationBox title="维数公式证明动画：基扩定理在行动" mode="interactive" :playing="playingDimProof" @play="playDimProof" @pause="pauseDimProof" @reset="resetDimProof"
        description="先数 W₁，再数 W₂；交空间 γ 被数了两次，合并时只保留一次。">
        <svg viewBox="0 0 720 420" ref="svgDimProofRef" class="lesson1-board">
          <defs>
            <marker id="arrowDimFlow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#64748b"/></marker>
          </defs>

          <rect x="34" y="28" width="652" height="360" rx="18" fill="#f8fafc" stroke="#e2e8f0"/>
          <text x="62" y="66" fill="#0f172a" font-size="18" font-weight="800">维数公式其实是在去重</text>
          <text x="62" y="91" fill="#64748b" font-size="13">γ 属于 W₁ 也属于 W₂，相加时会被重复计算。</text>

          <g transform="translate(56 124)">
            <rect x="0" y="0" width="284" height="198" rx="16" fill="#ffffff" stroke="#dbe4f0"/>
            <text x="22" y="34" fill="#334155" font-size="13" font-weight="700">基的来源</text>
            <rect x="26" y="58" width="122" height="86" rx="14" fill="#eff6ff" stroke="#93c5fd" stroke-width="2"/>
            <rect x="136" y="58" width="122" height="86" rx="14" fill="#fdf2f8" stroke="#f9a8d4" stroke-width="2"/>
            <rect x="112" y="74" width="60" height="54" rx="14" fill="#fffbeb" stroke="#f59e0b" stroke-width="2.5"/>
            <text x="72" y="160" text-anchor="middle" fill="#1d4ed8" font-size="15" font-weight="800">α</text>
            <text x="142" y="108" text-anchor="middle" fill="#b45309" font-size="15" font-weight="800">γ</text>
            <text x="222" y="160" text-anchor="middle" fill="#be185d" font-size="15" font-weight="800">β</text>
            <text x="74" y="52" text-anchor="middle" fill="#1d4ed8" font-size="12" font-weight="700">W₁</text>
            <text x="222" y="52" text-anchor="middle" fill="#be185d" font-size="12" font-weight="700">W₂</text>
          </g>

          <g transform="translate(382 104)">
            <text x="0" y="20" fill="#334155" font-size="13" font-weight="700">计数流水线</text>
            <g v-for="(item, idx) in dimProofTiles" :key="item.id" :transform="`translate(0, ${38 + idx * 46})`">
              <rect x="0" y="0" width="244" height="36" rx="11" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
              <rect x="0" y="0" width="244" height="36" rx="11" :fill="item.fill" :stroke="item.stroke" stroke-width="1.5" :opacity="item.opacity"/>
              <text x="18" y="23" :fill="item.color" font-size="15" font-weight="800" :opacity="item.opacity">{{ item.id }}</text>
              <text x="92" y="23" fill="#475569" font-size="13" :opacity="item.opacity">{{ item.note }}</text>
              <text x="222" y="23" text-anchor="end" :fill="item.color" font-size="16" font-weight="800" :opacity="item.opacity">{{ item.count }}</text>
            </g>
            <path d="M122 222 L122 242" stroke="#64748b" stroke-width="2" marker-end="url(#arrowDimFlow)" :opacity="dimMergeOpacity"/>
            <rect x="0" y="250" width="244" height="50" rx="13" fill="#ecfdf5" stroke="#10b981" stroke-width="2.5" :opacity="dimMergeOpacity"/>
            <text x="122" y="271" text-anchor="middle" fill="#047857" font-size="13" font-weight="800" :opacity="dimMergeOpacity">合并后的基</text>
            <text x="122" y="291" text-anchor="middle" fill="#0f766e" font-size="15" font-weight="800" :opacity="dimMergeOpacity">{{ dimProofEquation }}</text>
          </g>

          <text x="238" y="384" text-anchor="middle" fill="#475569" font-size="12" font-weight="700">{{ dimProofCaption }}</text>
        </svg>
      </AnimationBox>
    </Section>

    <Section num="6" title="直和分解">
      <Theorem title="直和 (Direct Sum)" type="definition" icon="✨">
        若 <span class="formula-inline">W_1+W_2</span> 中每个向量 <span class="formula-inline">\alpha</span> 的分解式
        <span class="formula-inline">\alpha=\alpha_1+\alpha_2\ (\alpha_1\in W_1,\alpha_2\in W_2)</span> 是<strong>唯一</strong>的，
        则称 <span class="formula-inline">W_1+W_2</span> 为<strong>直和</strong>，记为 <span class="formula-inline">W_1\oplus W_2</span>。
      </Theorem>

      <Theorem title="直和等价条件" type="theorem">
        下列命题等价：
        <ol style="margin:8px 0 0 20px;">
          <li><span class="formula-inline">W_1+W_2</span> 是直和；</li>
          <li>零向量分解唯一：<span class="formula-inline">\alpha_1+\alpha_2=0\Rightarrow\alpha_1=\alpha_2=0</span>；</li>
          <li><span class="formula-inline">W_1\cap W_2=\{0\}</span>；</li>
          <li><span class="formula-inline">\dim(W_1+W_2)=\dim W_1+\dim W_2</span>。</li>
        </ol>
      </Theorem>

      <AnimationBox title="直和中的唯一分解" :playing="playing3" @play="play3" @pause="pause3" @reset="reset3"
        description="点击播放：向量 v 在直和 W₁⊕W₂ 中唯一分解为 v = v₁ + v₂，其中 v₁∈W₁（x轴），v₂∈W₂（y轴），虚线为投影辅助线。">
        <svg viewBox="0 0 600 400" ref="svg3Ref" style="width:100%;max-width:600px;">
          <line x1="60" y1="340" x2="560" y2="340" stroke="#6366f1" stroke-width="2" marker-end="url(#arrowB3)"/>
          <line x1="80" y1="380" x2="80" y2="40" stroke="#7c3aed" stroke-width="2" marker-end="url(#arrowP3)"/>
          <text x="565" y="345" fill="#4338ca" font-size="14" font-weight="bold">W₁ (x轴)</text>
          <text x="55" y="35" fill="#7c3aed" font-size="14" font-weight="bold">W₂ (y轴)</text>

          <g stroke="#e2e8f0" stroke-width="0.5">
            <line v-for="i in 10" :key="'gx'+i" :x1="80+i*45" y1="40" :x2="80+i*45" y2="380"/>
            <line v-for="i in 7" :key="'gy'+i" :x1="80" :y1="340-i*40" x2="560" :y2="340-i*40"/>
          </g>

          <line x1="80" y1="340" :x2="80+vx3" :y2="340-vy3" stroke="#ec4899" stroke-width="3" marker-end="url(#arrowPk3)"/>
          <text :x="80+vx3+10" :y="340-vy3" fill="#be185d" font-size="14" font-weight="bold">v</text>

          <line x1="80" y1="340" :x2="80+vx3" y2="340" stroke="#4338ca" stroke-width="2.5" marker-end="url(#arrowB3)" :opacity="projAlpha"/>
          <text :x="80+vx3/2" y="360" fill="#4338ca" font-size="13" font-weight="bold" :opacity="projAlpha">v₁∈W₁</text>

          <line x1="80" y1="340" x2="80" :y2="340-vy3" stroke="#7c3aed" stroke-width="2.5" marker-end="url(#arrowP3)" :opacity="projAlpha"/>
          <text x="30" :y="340-vy3/2" fill="#7c3aed" font-size="13" font-weight="bold" :opacity="projAlpha">v₂∈W₂</text>

          <line :x1="80+vx3" y1="340" :x2="80+vx3" :y2="340-vy3" stroke="#94a3b8" stroke-width="1" stroke-dasharray="5,3" :opacity="projAlpha"/>
          <line x1="80" :y1="340-vy3" :x2="80+vx3" :y2="340-vy3" stroke="#94a3b8" stroke-width="1" stroke-dasharray="5,3" :opacity="projAlpha"/>

          <path :opacity="projAlpha" d="M 220 340 L 220 290 L 270 290" fill="none" stroke="#10b981" stroke-width="1.5"
                :transform="`translate(${vx3-140}, ${-vy3+50})`"/>

          <circle cx="80" cy="340" r="4" fill="#1e293b"/>
          <text x="65" y="358" fill="#1e293b" font-size="12">0</text>

          <defs>
            <marker id="arrowB3" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#6366f1"/></marker>
            <marker id="arrowP3" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#7c3aed"/></marker>
            <marker id="arrowPk3" markerWidth="9" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#ec4899"/></marker>
          </defs>
        </svg>
      </AnimationBox>
    </Section>

    <Section num="7" title="秩-零度定理 (Rank-Nullity Theorem)">
      <p>
        设 <span class="formula-inline">A\in\mathbb{R}^{m\times n}</span>，考虑齐次线性方程组 <span class="formula-inline">Ax=0</span> 的全部解构成的集合：
      </p>
      <Theorem title="零空间（核）" type="definition" icon="🎯">
        <Formula display>N(A)=\{x\in\mathbb{R}^n\mid Ax=0\}</Formula>
        <span class="formula-inline">N(A)</span> 称为矩阵 <span class="formula-inline">A</span> 的<strong>零空间（Null Space）</strong>或<strong>核（Kernel）</strong>。
        它本质就是齐次线性方程组 <span class="formula-inline">Ax=0</span> 的<strong>全部解</strong>的集合。
      </Theorem>

      <p style="margin-top:16px;"><strong>证明 N(A) 是 Rⁿ 的子空间：</strong>只需验证加法和数乘的封闭性。</p>

      <div style="background:#f0f9ff; border:1px solid #bae6fd; border-left:4px solid #0284c7; border-radius:6px; padding:14px 16px; margin:10px 0;">
        <p style="margin:4px 0;"><strong>加法封闭：</strong>若 <span class="formula-inline">x_1,x_2\in N(A)</span>，则 <span class="formula-inline">Ax_1=0,\ Ax_2=0</span>。</p>
        <p style="margin:4px 0 4px 16px; color:#475569;">
          <span class="formula-inline">A(x_1+x_2)=Ax_1+Ax_2=0+0=0</span> → 所以 <span class="formula-inline">x_1+x_2\in N(A)</span> ✓
        </p>
        <p style="margin:4px 0;"><strong>数乘封闭：</strong><span class="formula-inline">A(kx_1)=k(Ax_1)=k\cdot0=0</span> → 所以 <span class="formula-inline">kx_1\in N(A)</span> ✓</p>
        <p style="margin:8px 0 0 0; font-weight:600; color:#0369a1;">结论：N(A) 是 Rⁿ 的子空间 ✓</p>
      </div>

      <Theorem title="秩-零度定理 (Rank-Nullity Theorem)" type="theorem">
        <Formula display>\dim N(A) = n - \operatorname{rank}(A)</Formula>
        或等价地：<Formula display>\operatorname{rank}(A) + \dim N(A) = n</Formula>
      </Theorem>

      <p><strong>直观理解（分蛋糕游戏）：</strong></p>
      <p>一个 <span class="formula-inline">m\times n</span> 的矩阵代表 <span class="formula-inline">n</span> 个未知数的方程组。矩阵的秩 <span class="formula-inline">\operatorname{rank}(A)</span> 是<strong>"真正起作用的独立约束方程个数"</strong>——这些约束把 <span class="formula-inline">\operatorname{rank}(A)</span> 个未知数"死死绑架"了（变成了主元变量）。剩下的 <span class="formula-inline">n-\operatorname{rank}(A)</span> 个未知数就是可以自由取值的<strong>自由变量</strong>。</p>
      <p>而零空间的维数 <span class="formula-inline">\dim N(A)</span> = 自由变量的个数 = 基础解系中向量的个数。</p>

      <div style="background:#fefce8; border:1px solid #fde68a; border-left:4px solid #ca8a04; border-radius:6px; padding:12px 16px; margin:12px 0;">
        <p style="margin:0;"><strong>💡 一句话记牢：</strong>秩 = "被管死的维度"，零度 = "自由好动的维度"，两者加起来刚好等于总维度 <span class="formula-inline">n</span>。</p>
      </div>

      <AnimationBox title="秩-零度定理：空间被压扁，零空间接住消失的维度" mode="interactive" :playing="playingNullspace" @play="playNullspace" @pause="pauseNullspace" @reset="resetNullspace"
        description="点击播放：矩阵 A 逐步杀掉一个方向；被送到 0 的方向进入 N(A)，存活维度与消失维度相加始终等于 3。">
        <svg viewBox="0 0 720 420" ref="svgNullspaceRef" class="lesson1-board">
          <defs>
            <marker id="arrowKernel" markerWidth="9" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0,9 3.5,0 7" fill="#ea580c"/>
            </marker>
          </defs>

          <rect x="34" y="28" width="652" height="360" rx="18" fill="#f8fafc" stroke="#e2e8f0"/>
          <text x="64" y="66" fill="#0f172a" font-size="18" font-weight="800">A 把哪些方向压到 0？</text>
          <text x="64" y="92" fill="#64748b" font-size="13">左边看变换后还剩什么，右边记录被压没的自由方向。</text>

          <g transform="translate(58 126)">
            <rect x="0" y="0" width="296" height="202" rx="16" fill="#ffffff" stroke="#dbe4f0"/>
            <text x="22" y="32" fill="#334155" font-size="13" font-weight="700">像空间：A(ℝ³)</text>
            <g transform="translate(148 104)">
              <line x1="-92" y1="52" x2="92" y2="-52" stroke="#cbd5e1" stroke-width="1.5"/>
              <line x1="-86" y1="-18" x2="86" y2="18" stroke="#cbd5e1" stroke-width="1.5"/>
              <line x1="0" y1="68" x2="0" y2="-84" stroke="#cbd5e1" stroke-width="1.5"/>
              <ellipse cx="0" cy="0" :rx="nullspaceShape.rx" :ry="nullspaceShape.ry" fill="#dbeafe" stroke="#2563eb" stroke-width="3" :opacity="nullspaceShape.bodyOpacity"/>
              <ellipse cx="0" cy="0" :rx="nullspaceShape.innerRx" :ry="nullspaceShape.innerRy" fill="none" stroke="#93c5fd" stroke-width="2" :opacity="nullspaceShape.bodyOpacity"/>
              <line :x1="-nullspaceShape.lineHalf" y1="0" :x2="nullspaceShape.lineHalf" y2="0" stroke="#2563eb" stroke-width="5" stroke-linecap="round" :opacity="nullspaceShape.lineOpacity"/>
              <circle cx="0" cy="0" :r="nullspaceShape.pointR" fill="#1d4ed8" :opacity="nullspaceShape.pointOpacity"/>
              <line v-for="axis in imageAxes" :key="axis.id" x1="0" y1="0" :x2="axis.x" :y2="axis.y" :stroke="axis.color" stroke-width="4" stroke-linecap="round" :opacity="axis.opacity"/>
            </g>
            <text x="148" y="188" text-anchor="middle" fill="#475569" font-size="11" font-weight="700">{{ nullspaceShapeLabel }}</text>
          </g>

          <g transform="translate(390 118)">
            <rect x="0" y="0" width="238" height="214" rx="16" fill="#fff7ed" stroke="#fed7aa"/>
            <text x="22" y="34" fill="#9a3412" font-size="13" font-weight="800">零空间 N(A)</text>
            <text x="22" y="58" fill="#64748b" font-size="12">被 A 送到 0 的方向</text>
            <g v-for="(dir, idx) in kernelDirections" :key="dir.id" :transform="`translate(26, ${82 + idx * 38})`">
              <rect x="0" y="0" width="184" height="26" rx="8" :fill="dir.active ? '#ffedd5' : '#ffffff'" :stroke="dir.active ? '#fb923c' : '#e2e8f0'"/>
              <text x="14" y="18" :fill="dir.active ? '#c2410c' : '#94a3b8'" font-size="13" font-weight="800">{{ dir.id }}</text>
              <text x="78" y="18" :fill="dir.active ? '#9a3412' : '#94a3b8'" font-size="12">{{ dir.label }}</text>
            </g>
            <path v-for="flow in nullspaceFlows" :key="flow.id" :d="flow.path" fill="none" stroke="#ea580c" stroke-width="2.5" stroke-dasharray="6,5" marker-end="url(#arrowKernel)" :opacity="flow.opacity"/>
          </g>

          <g transform="translate(80 342)">
            <rect x="0" y="0" width="560" height="36" rx="12" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/>
            <rect x="18" y="11" :width="rankBarWidth" height="14" rx="7" fill="#2563eb" opacity="0.9"/>
            <rect :x="18 + rankBarWidth + 4" y="11" :width="nullityBarWidth" height="14" rx="7" fill="#ea580c" opacity="0.9"/>
            <text x="524" y="24" text-anchor="end" fill="#047857" font-size="14" font-weight="800">rank + nullity = {{ currentRank }} + {{ currentNullity }} = 3</text>
          </g>

          <rect x="420" y="52" width="218" height="34" rx="11" fill="#ffffff" stroke="#e2e8f0"/>
          <text x="529" y="74" text-anchor="middle" fill="#475569" font-size="13" font-weight="700">{{ nullspacePhaseText }}</text>
        </svg>
      </AnimationBox>
    </Section>

    <Section num="8" title="秩的深意：从代数到几何">
      <p>秩（Rank）不仅是线性代数里最核心的概念之一，更是连接"代数（解方程）"和"几何（空间变形）"两重世界的桥梁。</p>

      <h3 style="font-size:16px; color:#4338ca; margin:16px 0 6px 0;">一、代数深意：有效信息的"去重计数器"</h3>
      <p>矩阵的<strong>初等行变换</strong>本质上就是一台"自动废话粉碎机"。无论你写了多少个方程，所有冗余的行（可由其他行线性表出的行）在消元过程中都会变成全零行。最后死活抹不掉的非零行数量，就是<strong>秩（Rank）</strong>——它告诉你这个系统里<strong>有效信息的绝对数量</strong>。</p>

      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:14px; margin:10px 0;">
        <p style="margin:0 0 6px 0; font-weight:600;">📋 例子：</p>
        <p style="margin:2px 0; font-family:monospace; font-size:13px;">
          x+y=5,  x−y=1,  2x=6  → 第三个方程 = 前两个相加，是<strong>废话</strong>！
        </p>
        <p style="margin:4px 0 0 0; color:#475569;">消元后只留下 2 个非零行 → rank = 2。100 个方程里可能只有 3 个真正管用的约束。</p>
      </div>

      <h3 style="font-size:16px; color:#7c3aed; margin:16px 0 6px 0;">二、几何深意：空间的"降维打击器"</h3>
      <p>在线性代数的高级视角中，矩阵 <span class="formula-inline">A</span> 是一个<strong>线性变换（空间变形器）</strong>：<span class="formula-inline">Ax=b</span> 把一个 <span class="formula-inline">n</span> 维空间里的向量 <span class="formula-inline">x</span>，映射到另一个空间。</p>

      <div style="background:#faf5ff; border:1px solid #e9d5ff; border-radius:8px; padding:16px; margin:10px 0;">
        <p style="margin:0 0 8px 0; font-weight:600; color:#6d28d9;">🎨 以 R³（三维空间）为例：一块弹性橡皮泥球被矩阵 A 变形——</p>
        <table style="width:100%; border-collapse:collapse; font-size:14px;">
          <tbody>
            <tr style="border-bottom:1px solid #e9d5ff;">
              <td style="padding:6px 10px; font-weight:600;">rank(A)=3（满秩）</td>
              <td style="padding:6px 10px; color:#475569;">球被揉捏拉伸，但<strong>仍是三维物体</strong>，维度完好无损</td>
            </tr>
            <tr style="border-bottom:1px solid #e9d5ff;">
              <td style="padding:6px 10px; font-weight:600;">rank(A)=2</td>
              <td style="padding:6px 10px; color:#475569;"><strong>降维打击！</strong>三维球被一巴掌拍扁成<strong>二维平面</strong>，高度被压缩为 0</td>
            </tr>
            <tr style="border-bottom:1px solid #e9d5ff;">
              <td style="padding:6px 10px; font-weight:600;">rank(A)=1</td>
              <td style="padding:6px 10px; color:#475569;">打击升级，被压缩成<strong>一根一维的直线</strong></td>
            </tr>
            <tr>
              <td style="padding:6px 10px; font-weight:600;">rank(A)=0</td>
              <td style="padding:6px 10px; color:#475569;">宇宙塌陷！一切被压到<strong>原点（0 维的点）</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <Theorem title="秩与零空间的几何联结" type="tip" icon="🔗">
        <p style="margin:0;">空间被压缩时，那些<strong>消失的维度去哪了？</strong></p>
        <p style="margin:6px 0 0 0;">它们全部"死掉"、缩成原点了！这些在变形中被压缩到原点的向量集合，就是<strong>零空间 N(A)</strong>。</p>
        <p style="margin:6px 0 0 0; font-weight:600; color:#4338ca;">
          秩 rank(A) = 变形后存活的空间维度<br>
          零度 dim N(A) = 在变形中消失（被压到原点）的维度<br>
          rank(A) + dim N(A) = n —— 存活 + 死亡 = 全部
        </p>
      </Theorem>

      <h3 style="font-size:16px; color:#059669; margin:16px 0 6px 0;">三、总结：秩的终极奥义</h3>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
        <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:8px; padding:14px;">
          <p style="margin:0; font-weight:600; color:#0369a1;">🔢 在代数上</p>
          <p style="margin:6px 0 0 0; color:#475569; font-size:14px;">秩是斩断废话后，真正说了算、能绑架未知数的<strong>独立判官的个数</strong>。</p>
        </div>
        <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:14px;">
          <p style="margin:0; font-weight:600; color:#047857;">📐 在几何上</p>
          <p style="margin:6px 0 0 0; color:#475569; font-size:14px;">秩是矩阵变形空间后，新空间所能保持的<strong>最高维度</strong>。</p>
        </div>
      </div>
    </Section>

    <Section num="9" title="真题例题详解">
      <ExampleBox source="2022年期末考试" badge="📝 真题">
        <template #problem>
          设 <span class="formula-inline">W_1=\{(x_1,x_2,x_3,x_4)^T\mid x_1-x_2+x_3-x_4=0\}</span>，
          <span class="formula-inline">W_2=\operatorname{span}\{(1,1,1,1)^T,(1,-1,1,-1)^T\}</span>。
          <br>(1) 求 <span class="formula-inline">\dim W_1</span> 和 <span class="formula-inline">\dim W_2</span>；
          <br>(2) 求 <span class="formula-inline">W_1\cap W_2</span> 及其维数；
          <br>(3) 问 <span class="formula-inline">W_1+W_2</span> 是否为直和？并求 <span class="formula-inline">\dim(W_1+W_2)</span>。
        </template>
        <template #solution>
          <div class="step">
            <div class="step-num">1</div>
            <div class="step-text">
              <strong>求 dim W₁：</strong>
              W₁ 是方程 <span class="formula-inline">x_1-x_2+x_3-x_4=0</span> 的解空间，系数矩阵秩为 1，所以
              <span class="formula-inline">\dim W_1=4-1=3</span>。
              基础解系：令 <span class="formula-inline">(x_2,x_3,x_4)</span> 分别取 <span class="formula-inline">(1,0,0),(0,1,0),(0,0,1)</span>，得
              <span class="formula-inline">\xi_1=(1,1,0,0)^T</span>，<span class="formula-inline">\xi_2=(-1,0,1,0)^T</span>，
              <span class="formula-inline">\xi_3=(1,0,0,1)^T</span>。
            </div>
          </div>
          <div class="step">
            <div class="step-num">2</div>
            <div class="step-text">
              <strong>求 dim W₂：</strong>
              <span class="formula-inline">\alpha_1=(1,1,1,1)^T</span>，<span class="formula-inline">\alpha_2=(1,-1,1,-1)^T</span>，
              显然 <span class="formula-inline">\alpha_1,\alpha_2</span> 线性无关（不成比例），所以 <span class="formula-inline">\dim W_2=2</span>。
            </div>
          </div>
          <div class="step">
            <div class="step-num">3</div>
            <div class="step-text">
              <strong>求 W₁∩W₂：</strong>
              设 <span class="formula-inline">\alpha\in W_1\cap W_2</span>，则 <span class="formula-inline">\alpha=k_1\alpha_1+k_2\alpha_2</span>，
              且 <span class="formula-inline">\alpha</span> 满足 W₁ 的方程：
              <span class="formula-inline">(k_1+k_2)-(k_1-k_2)+(k_1+k_2)-(k_1-k_2)=0</span>，
              即 <span class="formula-inline">4k_2=0\Rightarrow k_2=0</span>。
              所以 <span class="formula-inline">\alpha=k_1(1,1,1,1)^T</span>，即
              <span class="formula-inline">W_1\cap W_2=\operatorname{span}\{(1,1,1,1)^T\}</span>，
              <span class="formula-inline">\dim(W_1\cap W_2)=1</span>。
            </div>
          </div>
          <div class="step">
            <div class="step-num">4</div>
            <div class="step-text">
              <strong>判断直和并求维数：</strong>
              因为 <span class="formula-inline">W_1\cap W_2\neq\{0\}</span>，所以 <strong>不是直和</strong>。
              由维数公式：
              <Formula display>\dim(W_1+W_2)=3+2-1=4</Formula>
              即 <span class="formula-inline">W_1+W_2=\mathbb{R}^4</span>。
            </div>
          </div>
        </template>
      </ExampleBox>

      <ExampleBox source="2021年期末考试" badge="📝 真题">
        <template #problem>
          设 <span class="formula-inline">V=\mathbb{R}^{2\times 2}</span>（二阶实方阵空间），
          <span class="formula-inline">W_1=\left\{\begin{pmatrix}a&b\\0&0\end{pmatrix}\mid a,b\in\mathbb{R}\right\}</span>，
          <span class="formula-inline">W_2=\left\{\begin{pmatrix}a&0\\c&0\end{pmatrix}\mid a,c\in\mathbb{R}\right\}</span>。
          <br>证明 <span class="formula-inline">W_1+W_2</span> 不是直和，并求 <span class="formula-inline">\dim(W_1+W_2)</span>。
        </template>
        <template #solution>
          <div class="step">
            <div class="step-num">1</div>
            <div class="step-text">
              显然 <span class="formula-inline">W_1</span> 的一组基为
              <span class="formula-inline">E_{11}=\begin{pmatrix}1&0\\0&0\end{pmatrix},E_{12}=\begin{pmatrix}0&1\\0&0\end{pmatrix}</span>，
              所以 <span class="formula-inline">\dim W_1=2</span>。
            </div>
          </div>
          <div class="step">
            <div class="step-num">2</div>
            <div class="step-text">
              <span class="formula-inline">W_2</span> 的一组基为
              <span class="formula-inline">E_{11}=\begin{pmatrix}1&0\\0&0\end{pmatrix},E_{21}=\begin{pmatrix}0&0\\1&0\end{pmatrix}</span>，
              所以 <span class="formula-inline">\dim W_2=2</span>。
            </div>
          </div>
          <div class="step">
            <div class="step-num">3</div>
            <div class="step-text">
              <strong>求交集：</strong>
              <span class="formula-inline">\begin{pmatrix}a&b\\0&0\end{pmatrix}=\begin{pmatrix}a'&0\\c'&0\end{pmatrix}</span>
              要求 <span class="formula-inline">b=0,c'=0</span>，故
              <span class="formula-inline">W_1\cap W_2=\left\{\begin{pmatrix}a&0\\0&0\end{pmatrix}\right\}=\operatorname{span}\{E_{11}\}</span>，
              <span class="formula-inline">\dim(W_1\cap W_2)=1</span>。
            </div>
          </div>
          <div class="step">
            <div class="step-num">4</div>
            <div class="step-text">
              因为 <span class="formula-inline">W_1\cap W_2\neq\{0\}</span>（包含 <span class="formula-inline">E_{11}</span>），
              所以 <strong>不是直和</strong>。由维数公式：
              <span class="formula-inline">\dim(W_1+W_2)=2+2-1=3</span>。
              实际上 <span class="formula-inline">W_1+W_2=\left\{\begin{pmatrix}a&b\\c&0\end{pmatrix}\right\}</span>，维数确实为 3。
            </div>
          </div>
        </template>
      </ExampleBox>
    </Section>

    <Section title="🗂️ 真题与习题汇总" :num="10">
      <WeekQuizBank :quizzes="quizzes" weekLabel="第1周" />
    </Section>

     <Section title="📌 知识点小结" :num="11">
       <Steps :steps="[
         '线性空间：非空集合 + 数域 + 加法/数乘 = 满足8条公理的代数结构',
         '子空间判定：非空 + 对线性组合封闭（kα + lβ ∈ W），零向量必在其中',
         '基 = 线性无关 + 张成空间；维数 = 基中向量个数',
         '基扩定理：子空间基 → 扩充为大空间基，一切维数证明的根',
         '维数公式：dim(W₁+W₂) = dim W₁ + dim W₂ − dim(W₁∩W₂)；证明核心在于基扩定理 + 数向量个数',
         '直和 ⟺ 零向量分解唯一 ⟺ W₁∩W₂ = {0} ⟺ dim(W₁+W₂) = dim W₁ + dim W₂',
         '秩-零度定理：rank(A) + dim N(A) = n；秩=“管死的维度”，零度=“自由的维度”',
         '秩的深意：代数上是有效约束个数，几何上是变换后保持的最高维度'
       ]" />
     </Section>

    <Section title="📝 课后作业" :num="12">
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
import { useKatex } from '../../composables/useKatex'
import { quizBank } from '../../data/quizBank'
import { homeworkBank } from '../../data/homeworkBank'
import { ref, onMounted, onUnmounted, computed } from 'vue'

const renderTrigger = ref(0)
const { renderMath } = useKatex(renderTrigger)

// ===== New animation refs (placeholder — designer will add animation logic) =====
const svgBasisExtRef = ref(null)
const svgDimProofRef = ref(null)
const svgNullspaceRef = ref(null)

// ===== Animation A: Basis Extension Theorem (interactive) =====
const playingBasisExt = ref(false)
const phaseBasisExt = ref(0)
const basisExtProgress = ref(0)
let rafIdBasisExt = null
let timerBasisExt = null
const basisOrigin = { x: 210, y: 142 }
const basisVectorSeed = [
  { id: 'γ₁', x0: 210, y0: 142, x: 158, y: 116, kind: 'gamma', start: 0.02, labelDx: -24, labelDy: -8 },
  { id: 'γ₂', x0: 210, y0: 142, x: 248, y: 178, kind: 'gamma', start: 0.18, labelDx: 8, labelDy: 18 },
  { id: 'α₁', x0: 210, y0: 142, x: 344, y: 88, kind: 'alpha', start: 0.42, labelDx: 8, labelDy: -10 },
  { id: 'α₂', x0: 210, y0: 142, x: 410, y: 160, kind: 'alpha', start: 0.62, labelDx: 8, labelDy: 4 },
  { id: 'α₃', x0: 210, y0: 142, x: 486, y: 116, kind: 'alpha', start: 0.78, labelDx: 8, labelDy: -8 }
]

function clamp01(value) {
  return Math.max(0, Math.min(value, 1))
}

function revealAmount(progress, start, span = 0.16) {
  return clamp01((progress - start) / span)
}

function easeInOut(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function timelineProgress(elapsed, frames) {
  if (elapsed <= frames[0].ms) return frames[0].value
  for (let i = 1; i < frames.length; i++) {
    const prev = frames[i - 1]
    const next = frames[i]
    if (elapsed <= next.ms) {
      const local = (elapsed - prev.ms) / (next.ms - prev.ms)
      return prev.value + (next.value - prev.value) * easeInOut(local)
    }
  }
  return frames[frames.length - 1].value
}

const basisVectors = computed(() => basisVectorSeed.map(v => {
  const opacity = revealAmount(basisExtProgress.value, v.start)
  return {
    ...v,
    x: v.x0 + (v.x - v.x0) * opacity,
    y: v.y0 + (v.y - v.y0) * opacity,
    opacity
  }
}))
const basisSceneVectors = computed(() => [
  { id: 'γ₁', x: 152, y: 114, color: '#2563eb', text: '#1d4ed8', opacity: revealAmount(basisExtProgress.value, 0.02, 0.1), labelDx: 8, labelDy: -8 },
  { id: 'γ₂', x: 126, y: 94, color: '#2563eb', text: '#1d4ed8', opacity: revealAmount(basisExtProgress.value, 0.18, 0.1), labelDx: -28, labelDy: -6 },
  { id: basisExtProgress.value < 0.6 ? 'α₁' : basisExtProgress.value < 0.76 ? 'α₂' : 'α₃', x: 210, y: 52, color: '#7c3aed', text: '#6d28d9', opacity: revealAmount(basisExtProgress.value, 0.42, 0.18) * (1 - revealAmount(basisExtProgress.value, 0.9, 0.08)), labelDx: 8, labelDy: -8 }
])
const basisTestOpacity = computed(() => {
  const entering = revealAmount(basisExtProgress.value, 0.36, 0.12)
  const leaving = 1 - revealAmount(basisExtProgress.value, 0.88, 0.08)
  return entering * leaving
})
const basisExtCaption = computed(() => {
  if (phaseBasisExt.value === 0) return '先固定 W 的基：γ₁、γ₂ 已经线性无关'
  if (phaseBasisExt.value === 1) return '逐个测试候选向量：不能由已有基表示，才接纳为新方向'
  return '保留原基，再补足新方向：合起来张成 V'
})
const basisExtFormula = computed(() => {
  if (basisExtProgress.value < 0.42) return 'γ₁、γ₂ 是 W 的基'
  if (basisExtProgress.value < 0.9) return '不断加入 α，使线性无关组继续扩大'
  return '得到 V 的一组基'
})
const basisSlots = computed(() => basisVectorSeed.map(v => ({
  id: v.id,
  kind: v.kind,
  opacity: revealAmount(basisExtProgress.value, v.start)
})))

const basisTimeline = [
  { ms: 0, value: 0 },
  { ms: 1400, value: 0.2 },
  { ms: 2600, value: 0.2 },
  { ms: 4400, value: 0.48 },
  { ms: 5600, value: 0.48 },
  { ms: 7200, value: 0.66 },
  { ms: 8200, value: 0.66 },
  { ms: 9800, value: 0.82 },
  { ms: 10800, value: 0.82 },
  { ms: 12400, value: 1 },
  { ms: 14600, value: 1 }
]
let basisExtStart = 0
let basisExtElapsed = 0

function animateBasisExt(timestamp = performance.now()) {
  if (!playingBasisExt.value) return
  basisExtElapsed = timestamp - basisExtStart
  basisExtProgress.value = timelineProgress(basisExtElapsed, basisTimeline)
  if (basisExtProgress.value < 0.36) phaseBasisExt.value = 0
  else if (basisExtProgress.value < 0.9) phaseBasisExt.value = 1
  else phaseBasisExt.value = 2
  if (basisExtElapsed >= basisTimeline[basisTimeline.length - 1].ms) {
    playingBasisExt.value = false
    timerBasisExt = setTimeout(() => {
      phaseBasisExt.value = 0
      basisExtProgress.value = 0
      basisExtElapsed = 0
    }, 1600)
    return
  }
  rafIdBasisExt = requestAnimationFrame(animateBasisExt)
}
function playBasisExt() { if (!playingBasisExt.value) { playingBasisExt.value = true; if (timerBasisExt) clearTimeout(timerBasisExt); basisExtStart = performance.now() - basisExtElapsed; animateBasisExt() } }
function pauseBasisExt() { playingBasisExt.value = false; if (rafIdBasisExt) cancelAnimationFrame(rafIdBasisExt); if (timerBasisExt) clearTimeout(timerBasisExt) }
function resetBasisExt() { pauseBasisExt(); phaseBasisExt.value = 0; basisExtProgress.value = 0; basisExtElapsed = 0 }

// ===== Animation B: Dimension Formula Proof (interactive) =====
const playingDimProof = ref(false)
const phaseDimProof = ref(0)
const dimProofProgress = ref(0)
let rafIdDimProof = null
let timerDimProof = null
const dimOrigin = { x: 300, y: 172 }
const dimProofSeed = [
  { id: 'γ₁', x0: 300, y0: 172, x: 284, y: 132, color: '#f59e0b', text: '#b45309', marker: 'url(#arrowDimGamma)', start: 0.02, labelDx: -34, labelDy: -8 },
  { id: 'γ₂', x0: 300, y0: 172, x: 326, y: 154, color: '#f59e0b', text: '#b45309', marker: 'url(#arrowDimGamma)', start: 0.14, labelDx: 10, labelDy: -6 },
  { id: 'α₁', x0: 300, y0: 172, x: 178, y: 116, color: '#6366f1', text: '#4338ca', marker: 'url(#arrowDimAlpha)', start: 0.36, labelDx: -30, labelDy: -10 },
  { id: 'α₂', x0: 300, y0: 172, x: 210, y: 206, color: '#6366f1', text: '#4338ca', marker: 'url(#arrowDimAlpha)', start: 0.48, labelDx: -30, labelDy: 18 },
  { id: 'β₁', x0: 300, y0: 172, x: 426, y: 112, color: '#ec4899', text: '#be185d', marker: 'url(#arrowDimBeta)', start: 0.6, labelDx: 10, labelDy: -10 },
  { id: 'β₂', x0: 300, y0: 172, x: 392, y: 212, color: '#ec4899', text: '#be185d', marker: 'url(#arrowDimBeta)', start: 0.72, labelDx: 10, labelDy: 18 }
]
const dimProofVectors = computed(() => dimProofSeed.map(v => {
  const opacity = revealAmount(dimProofProgress.value, v.start, 0.14)
  return {
    ...v,
    x: v.x0 + (v.x - v.x0) * opacity,
    y: v.y0 + (v.y - v.y0) * opacity,
    opacity
  }
}))
const dimMergeOpacity = computed(() => revealAmount(dimProofProgress.value, 0.86, 0.12))
const dimCounterGamma = computed(() => dimProofProgress.value >= 0.16 ? 2 : dimProofProgress.value >= 0.04 ? 1 : 0)
const dimCounterAlpha = computed(() => dimProofProgress.value >= 0.5 ? 2 : dimProofProgress.value >= 0.38 ? 1 : 0)
const dimCounterBeta = computed(() => dimProofProgress.value >= 0.74 ? 2 : dimProofProgress.value >= 0.62 ? 1 : 0)
const dimProofEquation = computed(() => {
  const totalBeforeMerge = dimCounterGamma.value + dimCounterAlpha.value + dimCounterBeta.value
  if (dimMergeOpacity.value > 0) return `${totalBeforeMerge} - ${dimCounterGamma.value} = ${totalBeforeMerge - dimCounterGamma.value}`
  return `${dimCounterGamma.value} + ${dimCounterAlpha.value} + ${dimCounterBeta.value} = ${totalBeforeMerge}`
})
const dimProofCaption = computed(() => {
  if (phaseDimProof.value === 0) return '先取交空间基 γ：它属于 W₁，也属于 W₂'
  if (phaseDimProof.value === 1) return '分别扩充：W₁ 需要 α，W₂ 需要 β'
  return '合并时 γ 只保留一份'
})
const dimProofTiles = computed(() => [
  {
    id: 'γ',
    note: '交空间基，只算一次',
    count: dimCounterGamma.value,
    opacity: revealAmount(dimProofProgress.value, 0.02, 0.18),
    fill: '#fffbeb',
    stroke: '#fcd34d',
    color: '#b45309'
  },
  {
    id: 'α',
    note: '补足 W₁ 的方向',
    count: dimCounterAlpha.value,
    opacity: revealAmount(dimProofProgress.value, 0.36, 0.18),
    fill: '#eff6ff',
    stroke: '#93c5fd',
    color: '#1d4ed8'
  },
  {
    id: 'β',
    note: '补足 W₂ 的方向',
    count: dimCounterBeta.value,
    opacity: revealAmount(dimProofProgress.value, 0.6, 0.18),
    fill: '#fdf2f8',
    stroke: '#f9a8d4',
    color: '#be185d'
  },
  {
    id: '-γ',
    note: '扣掉重复计算',
    count: dimMergeOpacity.value > 0 ? dimCounterGamma.value : 0,
    opacity: dimMergeOpacity.value,
    fill: '#f8fafc',
    stroke: '#cbd5e1',
    color: '#64748b'
  }
])

const dimProofTimeline = [
  { ms: 0, value: 0 },
  { ms: 1600, value: 0.18 },
  { ms: 3000, value: 0.18 },
  { ms: 4700, value: 0.52 },
  { ms: 6000, value: 0.52 },
  { ms: 7800, value: 0.76 },
  { ms: 9000, value: 0.76 },
  { ms: 10800, value: 0.9 },
  { ms: 13200, value: 1 }
]
let dimProofStart = 0
let dimProofElapsed = 0

function animateDimProof(timestamp = performance.now()) {
  if (!playingDimProof.value) return
  dimProofElapsed = timestamp - dimProofStart
  dimProofProgress.value = timelineProgress(dimProofElapsed, dimProofTimeline)
  if (dimProofProgress.value < 0.34) phaseDimProof.value = 0
  else if (dimProofProgress.value < 0.86) phaseDimProof.value = 1
  else phaseDimProof.value = 2
  if (dimProofElapsed >= dimProofTimeline[dimProofTimeline.length - 1].ms) {
    playingDimProof.value = false
    timerDimProof = setTimeout(() => {
      phaseDimProof.value = 0
      dimProofProgress.value = 0
      dimProofElapsed = 0
    }, 1800)
    return
  }
  rafIdDimProof = requestAnimationFrame(animateDimProof)
}
function playDimProof() { if (!playingDimProof.value) { playingDimProof.value = true; if (timerDimProof) clearTimeout(timerDimProof); dimProofStart = performance.now() - dimProofElapsed; animateDimProof() } }
function pauseDimProof() { playingDimProof.value = false; if (rafIdDimProof) cancelAnimationFrame(rafIdDimProof); if (timerDimProof) clearTimeout(timerDimProof) }
function resetDimProof() { pauseDimProof(); phaseDimProof.value = 0; dimProofProgress.value = 0; dimProofElapsed = 0 }

// ===== Animation C: Rank-Nullity flattening (interactive) =====
const playingNullspace = ref(false)
const phaseNullspace = ref(0)
const nullspaceProgress = ref(0)
let rafIdNullspace = null
let timerNullspace = null

function lerp(a, b, t) {
  return a + (b - a) * Math.max(0, Math.min(t, 1))
}

const currentRank = computed(() => {
  if (nullspaceProgress.value < 0.25) return 3
  if (nullspaceProgress.value < 0.55) return 2
  if (nullspaceProgress.value < 0.82) return 1
  return 0
})
const currentNullity = computed(() => 3 - currentRank.value)
const nullspaceShape = computed(() => {
  const p = nullspaceProgress.value
  const stage1 = revealAmount(p, 0.06, 0.22)
  const stage2 = revealAmount(p, 0.36, 0.22)
  const stage3 = revealAmount(p, 0.68, 0.22)
  const rxAfterDisc = lerp(106, 116, stage1)
  const ryAfterDisc = lerp(86, 24, stage1)
  const rxAfterLine = lerp(rxAfterDisc, 92, stage2)
  const ryAfterLine = lerp(ryAfterDisc, 5, stage2)
  const rx = lerp(rxAfterLine, 8, stage3)
  const ry = lerp(ryAfterLine, 8, stage3)
  return {
    rx,
    ry,
    innerRx: Math.max(rx * 0.62, 4),
    innerRy: Math.max(ry * 0.42, 2),
    bodyOpacity: 0.92 * (1 - revealAmount(p, 0.82, 0.12)),
    lineHalf: lerp(0, 88, revealAmount(p, 0.48, 0.16)) * (1 - revealAmount(p, 0.78, 0.16)),
    lineOpacity: revealAmount(p, 0.42, 0.12) * (1 - revealAmount(p, 0.82, 0.12)),
    pointR: lerp(4, 11, revealAmount(p, 0.82, 0.12)),
    pointOpacity: revealAmount(p, 0.76, 0.12)
  }
})
const nullspaceFlows = computed(() => {
  const p = nullspaceProgress.value
  const flows = [
    { id: 'lost-z', path: 'M-86 84 C-24 58, -4 52, 26 94', start: 0.18 },
    { id: 'lost-y', path: 'M-86 122 C-20 114, 0 104, 26 132', start: 0.52 },
    { id: 'lost-x', path: 'M-86 160 C-24 168, -2 152, 26 170', start: 0.78 }
  ]
  return flows.map(flow => {
    const opacity = revealAmount(p, flow.start, 0.16)
    return {
      ...flow,
      opacity
    }
  })
})
const nullspaceShapeLabel = computed(() => {
  if (currentRank.value === 3) return 'rank = 3：完整三维空间，几乎没有方向被压没'
  if (currentRank.value === 2) return 'rank = 2：球被压成二维圆盘，1 个方向进入零空间'
  if (currentRank.value === 1) return 'rank = 1：圆盘继续压成直线，2 个方向进入零空间'
  return 'rank = 0：所有方向坍缩到原点，整个空间都进入零空间'
})
const nullspacePhaseText = computed(() => {
  if (phaseNullspace.value === 0) return '满秩：rank=3，N(A)={0}'
  if (phaseNullspace.value === 1) return '压掉高度：rank=2，nullity=1'
  if (phaseNullspace.value === 2) return '再压掉侧向：rank=1，nullity=2'
  return '全部压到原点：rank=0，nullity=3'
})
const imageAxes = computed(() => [
  { id: 'x', x: 80, y: 0, color: '#2563eb', opacity: currentRank.value >= 1 ? 1 : 0.15 },
  { id: 'y', x: -42, y: 34, color: '#7c3aed', opacity: currentRank.value >= 2 ? 1 : 0.15 },
  { id: 'z', x: 0, y: -68, color: '#0f766e', opacity: currentRank.value >= 3 ? 1 : 0.15 }
])
const imagePlaneOpacity = computed(() => currentRank.value >= 2 ? 0.9 : 0.12)
const imageLineOpacity = computed(() => currentRank.value === 1 ? 1 : 0.15)
const imagePointOpacity = computed(() => currentRank.value === 0 ? 1 : 0)
const imageLineHalf = computed(() => currentRank.value === 1 ? 78 : 0)
const imagePointRadius = computed(() => currentRank.value === 0 ? 10 : 4)
const imagePlanePoints = computed(() => {
  if (currentRank.value >= 2) return '-88,48 72,16 102,44 -58,76'
  return '-18,4 18,-4 22,4 -14,12'
})
const kernelDirections = computed(() => [
  { id: 'z', label: '高度方向', active: currentNullity.value >= 1 },
  { id: 'y', label: '侧向方向', active: currentNullity.value >= 2 },
  { id: 'x', label: '最后方向', active: currentNullity.value >= 3 }
])
const rankBarWidth = computed(() => currentRank.value * 72)
const nullityBarWidth = computed(() => currentNullity.value * 72)

const nullspaceTimeline = [
  { ms: 0, value: 0 },
  { ms: 1800, value: 0.28 },
  { ms: 3400, value: 0.28 },
  { ms: 5400, value: 0.58 },
  { ms: 7000, value: 0.58 },
  { ms: 9000, value: 0.88 },
  { ms: 10600, value: 0.88 },
  { ms: 12400, value: 1 },
  { ms: 14600, value: 1 }
]
let nullspaceStart = 0
let nullspaceElapsed = 0

function animateNullspace(timestamp = performance.now()) {
  if (!playingNullspace.value) return
  nullspaceElapsed = timestamp - nullspaceStart
  nullspaceProgress.value = timelineProgress(nullspaceElapsed, nullspaceTimeline)
  if (nullspaceProgress.value < 0.3) phaseNullspace.value = 0
  else if (nullspaceProgress.value < 0.6) phaseNullspace.value = 1
  else if (nullspaceProgress.value < 0.88) phaseNullspace.value = 2
  else phaseNullspace.value = 3
  if (nullspaceElapsed >= nullspaceTimeline[nullspaceTimeline.length - 1].ms) {
    playingNullspace.value = false
    timerNullspace = setTimeout(() => {
      phaseNullspace.value = 0
      nullspaceProgress.value = 0
      nullspaceElapsed = 0
    }, 1800)
    return
  }
  rafIdNullspace = requestAnimationFrame(animateNullspace)
}
function playNullspace() { if (!playingNullspace.value) { playingNullspace.value = true; if (timerNullspace) clearTimeout(timerNullspace); nullspaceStart = performance.now() - nullspaceElapsed; animateNullspace() } }
function pauseNullspace() { playingNullspace.value = false; if (rafIdNullspace) cancelAnimationFrame(rafIdNullspace); if (timerNullspace) clearTimeout(timerNullspace) }
function resetNullspace() { pauseNullspace(); phaseNullspace.value = 0; nullspaceProgress.value = 0; nullspaceElapsed = 0 }

const quizzes = (quizBank[1] || []).map(q => ({ ...q, lessonNum: '01', lessonTitle: '线性空间与线性子空间' }))
const hwQuizzes = computed(() => (homeworkBank[1] || []).map(q => ({ ...q })))

// ===== Animation 1: Plane subspace in R3 (auto-rotate) =====
const rot1 = ref(0)
let rafId1 = null

function project3(v, angle, cx = 300, cy = 230, scale = 62) {
  const c = Math.cos(angle), sn = Math.sin(angle)
  const x = v[0] * c - v[1] * sn
  const y = v[0] * sn + v[1] * c
  return { x: cx + (x - y) * 0.72 * scale, y: cy - (v[2] - (x + y) * 0.36) * scale }
}
function pointsToString(points) { return points.map(p => `${p.x},${p.y}`).join(' ') }
function add3(a, b) { return a.map((v, i) => v + b[i]) }
function scale3(a, k) { return a.map(v => v * k) }

const angle1 = computed(() => rot1.value * Math.PI / 180)
const origin1 = computed(() => project3([0, 0, 0], angle1.value, 300, 240))
const axis1X = computed(() => project3([3, 0, 0], angle1.value, 300, 240))
const axis1Y = computed(() => project3([0, 3, 0], angle1.value, 300, 240))
const axis1Z = computed(() => project3([0, 0, 3], angle1.value, 300, 240))
const planeBasisA = [2.2, 0.2, 0.6]
const planeBasisB = [0.2, 2.0, 0.9]
const vecAlpha = [1.25, 0.15, 0.34]
const vecBeta = [0.15, 1.15, 0.52]
const vec1A = computed(() => project3(vecAlpha, angle1.value, 300, 240))
const vec1B = computed(() => project3(vecBeta, angle1.value, 300, 240))
const vec1Sum = computed(() => project3(add3(vecAlpha, vecBeta), angle1.value, 300, 240))
const planePoints1 = computed(() => {
  const corners = [
    add3(scale3(planeBasisA, -1.15), scale3(planeBasisB, -1.0)),
    add3(scale3(planeBasisA, 1.15), scale3(planeBasisB, -1.0)),
    add3(scale3(planeBasisA, 1.15), scale3(planeBasisB, 1.0)),
    add3(scale3(planeBasisA, -1.15), scale3(planeBasisB, 1.0))
  ]
  return pointsToString(corners.map(v => project3(v, angle1.value, 300, 240)))
})

function animate1() {
  rot1.value = (rot1.value + 0.35) % 360
  rafId1 = requestAnimationFrame(animate1)
}

// ===== Animation 2: Sum and intersection of two planes (auto-rotate) =====
const rot2 = ref(0)
let rafId2 = null
const angle2 = computed(() => rot2.value * Math.PI / 180)
const origin2 = computed(() => project3([0, 0, 0], angle2.value, 300, 230))
const axis2X = computed(() => project3([3, 0, 0], angle2.value, 300, 230))
const axis2Y = computed(() => project3([0, 3, 0], angle2.value, 300, 230))
const axis2Z = computed(() => project3([0, 0, 3], angle2.value, 300, 230))
const wCommon = [1, 1, 0]
const w1Extra = [0, 0, 1.15]
const w2Extra = [1, -1, 0.9]
function planeFromBasis(a, b, angle) {
  const corners = [
    add3(scale3(a, -2.0), scale3(b, -1.25)),
    add3(scale3(a, 2.0), scale3(b, -1.25)),
    add3(scale3(a, 2.0), scale3(b, 1.25)),
    add3(scale3(a, -2.0), scale3(b, 1.25))
  ]
  return pointsToString(corners.map(v => project3(v, angle, 300, 230)))
}
const w1Points = computed(() => planeFromBasis(wCommon, w1Extra, angle2.value))
const w2Points = computed(() => planeFromBasis(wCommon, w2Extra, angle2.value))
const line2A = computed(() => project3(scale3(wCommon, -2.4), angle2.value, 300, 230))
const line2B = computed(() => project3(scale3(wCommon, 2.4), angle2.value, 300, 230))
const labelW1 = computed(() => project3(add3(wCommon, w1Extra), angle2.value, 300, 230))
const labelW2 = computed(() => project3(add3(wCommon, w2Extra), angle2.value, 300, 230))

function animate2() {
  rot2.value = (rot2.value + 0.35) % 360
  rafId2 = requestAnimationFrame(animate2)
}

// ===== Animation 3: Direct sum unique decomposition (interactive) =====
const playing3 = ref(false)
const vx3 = ref(0), vy3 = ref(0)
const projAlpha = ref(0)
let rafId3 = null
let timer3 = null
const targetX = 280, targetY = 200
let phase3 = 0

function animate3() {
  if (phase3 === 0) {
    vx3.value = Math.min(vx3.value + 4, targetX)
    vy3.value = Math.min(vy3.value + 3, targetY)
    if (vx3.value >= targetX && vy3.value >= targetY) phase3 = 1
  } else if (phase3 === 1) {
    projAlpha.value = Math.min(projAlpha.value + 0.02, 1)
    if (projAlpha.value >= 1) phase3 = 2
  } else {
    playing3.value = false
    timer3 = setTimeout(() => {
      phase3 = 0
      vx3.value = 0; vy3.value = 0; projAlpha.value = 0
    }, 1500)
    return
  }
  rafId3 = requestAnimationFrame(animate3)
}
function play3() { if (!playing3.value) { playing3.value = true; animate3() } }
function pause3() { playing3.value = false; if (rafId3) cancelAnimationFrame(rafId3); if (timer3) clearTimeout(timer3) }
function reset3() { pause3(); phase3 = 0; vx3.value = 0; vy3.value = 0; projAlpha.value = 0 }

onMounted(() => {
  renderTrigger.value++
  // Auto-start auto-mode animations
  animate1()
  animate2()
})
onUnmounted(() => {
  if (rafId1) cancelAnimationFrame(rafId1)
  if (rafId2) cancelAnimationFrame(rafId2)
  if (rafId3) cancelAnimationFrame(rafId3)
  if (timer3) clearTimeout(timer3)
  if (rafIdBasisExt) cancelAnimationFrame(rafIdBasisExt)
  if (timerBasisExt) clearTimeout(timerBasisExt)
  if (rafIdDimProof) cancelAnimationFrame(rafIdDimProof)
  if (timerDimProof) clearTimeout(timerDimProof)
  if (rafIdNullspace) cancelAnimationFrame(rafIdNullspace)
  if (timerNullspace) clearTimeout(timerNullspace)
})
</script>

<style scoped>
.lesson1-board {
  width: 100%;
  max-width: 760px;
  background: #fbfdff;
}

.lesson1-board text {
  letter-spacing: 0;
}
</style>
