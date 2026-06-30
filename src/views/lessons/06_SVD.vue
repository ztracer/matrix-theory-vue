<template>
  <LessonLayout :lesson-id="6" title="满秩分解与SVD奇异值分解" subtitle="Full Rank Decomposition & SVD">

    <!-- 1. 满秩分解 -->
    <Section title="满秩分解 A=FG" :num="1">
      <Theorem title="满秩分解定理" type="theorem" icon="📌">
        设 <span class="formula-inline">A \in \C^{m \times n}</span>，<span class="formula-inline">\rank(A) = r > 0</span>，
        则存在列满秩矩阵 <span class="formula-inline">F \in \C^{m \times r}</span> 和行满秩矩阵
        <span class="formula-inline">G \in \C^{r \times n}</span>，使得：
        <Formula>A = FG</Formula>
      </Theorem>

      <p><strong>构造方法：</strong>对 <span class="formula-inline">A</span> 做行初等变换化为行标准形 <span class="formula-inline">\tilde{A}</span>，则：</p>
      <ul>
        <li><span class="formula-inline">F</span>：取 <span class="formula-inline">A</span> 中对应 <span class="formula-inline">\tilde{A}</span> 主元列的 <span class="formula-inline">r</span> 个列；</li>
        <li><span class="formula-inline">G</span>：取 <span class="formula-inline">\tilde{A}</span> 中非零的前 <span class="formula-inline">r</span> 行。</li>
      </ul>

      <Theorem title="满秩分解的几何意义" type="tip" icon="💡">
        线性映射 <span class="formula-inline">A: \R^n \to \R^m</span> 可分解为：
        <span class="formula-inline">\R^n \xrightarrow{G} \R^r \xrightarrow{F} \R^m</span>，
        即先降维到 <span class="formula-inline">r</span> 维空间，再嵌入到目标空间。
      </Theorem>
    </Section>

    <!-- 2. 满秩分解降维动画 -->
    <Section title="动画：满秩分解的空间映射" :num="2">
      <p>观察线性映射 <span class="formula-inline">A = FG</span> 的几何过程：<span class="formula-inline">\R^m \leftarrow \R^r \leftarrow \R^n</span>，中间经过 <span class="formula-inline">r</span> 维空间。</p>

      <AnimationBox
        mode="auto"
        title="满秩分解降维可视化"
        description="n维空间经G映射到r维空间（降维），再经F映射到m维空间（嵌入），脉冲依次点亮"
      >
        <div class="fr-flow">
          <div class="fr-space fr-n">
            <div class="fr-ball" style="animation-delay:0s"></div>
            <div class="fr-label">ℝⁿ</div>
            <div class="fr-sub">(n维空间)</div>
          </div>
          <div class="fr-arrow">
            <div class="fr-arrow-line" style="animation-delay:1s"></div>
            <div class="fr-arrow-label" style="color:#0d9488">G</div>
            <div class="fr-arrow-sub">行满秩·降维</div>
          </div>
          <div class="fr-space fr-r">
            <div class="fr-ellipse" style="animation-delay:2s"></div>
            <div class="fr-label">ℝʳ</div>
            <div class="fr-sub">(r维·列空间)</div>
          </div>
          <div class="fr-arrow">
            <div class="fr-arrow-line" style="animation-delay:3s"></div>
            <div class="fr-arrow-label" style="color:#0d9488">F</div>
            <div class="fr-arrow-sub">列满秩·嵌入</div>
          </div>
          <div class="fr-space fr-m">
            <div class="fr-ellipse fr-rotated" style="animation-delay:4s"></div>
            <div class="fr-label">ℝᵐ</div>
            <div class="fr-sub">(m维空间)</div>
          </div>
          <div class="fr-eq" style="animation-delay:5s">A = FG</div>
        </div>
      </AnimationBox>
    </Section>

    <!-- 3. 奇异值与SVD -->
    <Section title="奇异值与SVD分解" :num="3">
      <Theorem title="💡 有了特征值分解（EVD），为什么还要 SVD？" type="tip" icon="💡">
        <p><strong>特征值分解的局限性：</strong>EVD 要求矩阵是 <strong>方阵</strong>（<span class="formula-inline">n \times n</span>）且<strong>可对角化</strong>。面对一个 <span class="formula-inline">1080 \times 1920</span> 的非方阵图像，EVD 直接失效。</p>
        <p><strong>SVD 的降维打击：</strong>任何形状的矩阵 <span class="formula-inline">A \in \R^{m \times n}</span>（长方的、方的、哪怕只有一行/一列），<strong>百分之百存在 SVD</strong>。它的巧妙之处在于：把非方阵映射问题，转化成我们最熟悉的对称方阵问题——去研究 <span class="formula-inline">A\T A</span>（<span class="formula-inline">n \times n</span> 对称）和 <span class="formula-inline">AA\T</span>（<span class="formula-inline">m \times m</span> 对称），这两个矩阵一定可以对角化。</p>
        <p style="margin:0.5rem 0 0;color:#065f46;"><strong>一句话：</strong>EVD 是方阵的"特权"，SVD 是全体矩阵的"通用语言"——它把 EVD 推广到了任意形状矩阵，是线性代数的终极分解定理。</p>
      </Theorem>

      <Theorem title="奇异值定义" type="definition" icon="📖">
        设 <span class="formula-inline">A \in \R^{m \times n}</span>，<span class="formula-inline">\rank(A)=r</span>，
        <span class="formula-inline">A\T A</span> 的特征值为 <span class="formula-inline">\lambda_1 \geq \lambda_2 \geq \cdots \geq \lambda_r > 0 = \lambda_{r+1} = \cdots = \lambda_n</span>，
        则称
        <Formula>\sigma_i = \sqrt{\lambda_i(A\T A)}, \quad i = 1,2,\ldots,n</Formula>
        为 <span class="formula-inline">A</span> 的奇异值。
      </Theorem>

      <Theorem title="📡 奇异值与矩阵的谱" type="note" icon="📡">
        <p style="margin-top:0;"><strong>什么是矩阵的"谱"？</strong><br/>一个方阵的特征值的集合 <span class="formula-inline">\{\lambda_1, \lambda_2, \ldots\}</span> 称为它的<strong>谱</strong>（spectrum）——就像光谱分解白光一样，特征值分解揭示了矩阵在各个"特征方向"上的作用强度。</p>
        <p><strong>SVD 如何与谱挂钩？</strong><br/>从定义 <span class="formula-inline">\sigma_i = \sqrt{\lambda_i(A\T A)}</span> 可以看出：<strong>奇异值就是 <span class="formula-inline">A\T A</span> 这个对称方阵的谱（特征值）的算术平方根</strong>。你把 <span class="formula-inline">A</span> 的谱信息"藏"进了对称矩阵 <span class="formula-inline">A\T A</span> 里——对称矩阵永远可对角化，所以谱永远存在。</p>
        <p style="margin-bottom:0;"><strong>一句话：</strong>EVD 只能给出方阵的谱；SVD 把"谱"的概念推广到了<strong>任意形状矩阵</strong>——奇异值就是非方阵的"广义谱"。当 <span class="formula-inline">A</span> 本身是对称正半定时，奇异值就等于特征值，二者合二为一。</p>
      </Theorem>

      <Theorem title="SVD（奇异值分解）定理" type="theorem" icon="📌">
        对任意 <span class="formula-inline">A \in \R^{m \times n}</span>，存在 <span class="formula-inline">m</span> 阶正交矩阵 <span class="formula-inline">U</span>
        和 <span class="formula-inline">n</span> 阶正交矩阵 <span class="formula-inline">V</span>，使得：
        <Formula>A = U \Sigma V\T</Formula>
        其中 <span class="formula-inline">\Sigma = \begin{pmatrix} \Sigma_r & 0 \\ 0 & 0 \end{pmatrix} \in \R^{m \times n}</span>，
        <span class="formula-inline">\Sigma_r = \diag(\sigma_1, \ldots, \sigma_r)</span>，<span class="formula-inline">\sigma_1 \geq \cdots \geq \sigma_r > 0</span>。
      </Theorem>

      <ul>
        <li><span class="formula-inline">U</span> 的列：<span class="formula-inline">AA\T</span> 的单位正交特征向量（左奇异向量）；</li>
        <li><span class="formula-inline">V</span> 的列：<span class="formula-inline">A\T A</span> 的单位正交特征向量（右奇异向量）；</li>
        <li><span class="formula-inline">\sigma_i</span>：<span class="formula-inline">A</span> 的奇异值。</li>
      </ul>
    </Section>

    <Section title="📺 视频讲解：SVD 的直观理解" :num="3">
      <div class="bilibili-video">
        <iframe
          src="https://player.bilibili.com/player.html?isOutside=true&aid=592708535&bvid=BV1Hq4y117VK&cid=471718567&p=1"
          scrolling="no"
          frameborder="0"
          allowfullscreen="true"
          loading="lazy"
        ></iframe>
      </div>
    </Section>

    <!-- 4. SVD几何动画 -->
    <Section title="动画：SVD几何分解" :num="4">
      <p>
        SVD将线性变换分解为三步：
        <span class="formula-inline">V\T</span>（旋转/反射）→ <span class="formula-inline">\Sigma</span>（坐标轴方向拉伸）→ <span class="formula-inline">U</span>（旋转/反射）。
        使用滑块调节奇异值 <span class="formula-inline">\sigma_1, \sigma_2</span> 观察椭球形状变化。
      </p>

      <AnimationBox
        title="SVD几何意义：单位圆→旋转→拉伸→旋转"
        :playing="svdPlaying"
        :hide-controls="false"
        description="蓝色为单位圆，经过三步变换后变为橙色椭球，半轴长=奇异值"
        @play="svdPlay"
        @pause="svdPause"
        @reset="svdReset"
      >
        <template #controls>
          <div class="svd-sliders">
            <label class="svd-slider-label svd-slider-major">
              <span class="svd-slider-name">长轴 σ₁</span>
              <input type="range" v-model.number="sigma1" min="0.3" max="2.5" step="0.1">
              <span class="svd-sigma-val">{{ sigma1.toFixed(1) }}</span>
            </label>
            <label class="svd-slider-label svd-slider-minor">
              <span class="svd-slider-name">短轴 σ₂</span>
              <input type="range" v-model.number="sigma2" min="0.3" max="2.5" step="0.1">
              <span class="svd-sigma-val">{{ sigma2.toFixed(1) }}</span>
            </label>
            <div class="svd-ratio-pill">
              拉伸比 {{ (sigma1 / sigma2).toFixed(2) }}
            </div>
          </div>
        </template>
        <svg class="svd-geometry-svg" viewBox="0 0 760 420" role="img" aria-label="SVD 几何分解动画">
          <defs>
            <filter id="svd-soft-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#0f172a" flood-opacity="0.08"/>
            </filter>
            <radialGradient id="svd-blue-fill" cx="50%" cy="42%" r="60%">
              <stop offset="0%" stop-color="#eff6ff"/><stop offset="100%" stop-color="#bfdbfe"/>
            </radialGradient>
            <radialGradient id="svd-indigo-fill" cx="50%" cy="42%" r="60%">
              <stop offset="0%" stop-color="#eef2ff"/><stop offset="100%" stop-color="#c7d2fe"/>
            </radialGradient>
            <radialGradient id="svd-amber-fill" cx="50%" cy="42%" r="65%">
              <stop offset="0%" stop-color="#fffbeb"/><stop offset="100%" stop-color="#fde68a"/>
            </radialGradient>
            <radialGradient id="svd-teal-fill" cx="50%" cy="42%" r="65%">
              <stop offset="0%" stop-color="#f0fdfa"/><stop offset="100%" stop-color="#99f6e4"/>
            </radialGradient>
            <marker id="svd-arrow-indigo" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" fill="#6366f1"/>
            </marker>
            <marker id="svd-arrow-amber" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" fill="#d97706"/>
            </marker>
            <marker id="svd-arrow-teal" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" fill="#0d9488"/>
            </marker>
          </defs>

          <!-- Step 1: 单位圆 -->
          <g transform="translate(100, 200)">
            <rect x="-88" y="-142" width="176" height="230" rx="18" fill="#ffffff" stroke="#bfdbfe" stroke-width="1.5" filter="url(#svd-soft-shadow)" :opacity="svdActiveStage === -1 || svdActiveStage === 0 ? 1 : 0.55"/>
            <circle v-if="svdActiveStage === 0" cx="0" cy="0" r="92" fill="#3b82f6" opacity="0.06"><animate attributeName="r" values="88;98;88" dur="1.8s" repeatCount="indefinite"/></circle>
            <text y="-122" text-anchor="middle" font-size="13" font-weight="700" fill="#3b82f6">① 单位圆</text>
            <circle cx="0" cy="0" r="70" fill="url(#svd-blue-fill)" fill-opacity="0.7" stroke="#3b82f6" stroke-width="2"/>
            <line x1="-80" y1="0" x2="80" y2="0" stroke="#e2e8f0" stroke-width="1"/>
            <line x1="0" y1="-80" x2="0" y2="80" stroke="#e2e8f0" stroke-width="1"/>
            <line x1="0" y1="0" x2="70" y2="0" stroke="#64748b" stroke-width="2.5"/>
            <line x1="0" y1="0" x2="0" y2="-70" stroke="#64748b" stroke-width="2.5"/>
            <polygon points="70,0 63,-4 63,4" fill="#64748b"/>
            <polygon points="0,-70 -4,-63 4,-63" fill="#64748b"/>
          </g>

          <!-- 箭头1: Vᵀ -->
          <line x1="190" y1="200" x2="232" y2="200" stroke="#6366f1" stroke-width="2.5" stroke-linecap="round" marker-end="url(#svd-arrow-indigo)"/>
          <text x="211" y="188" text-anchor="middle" font-size="13" fill="#6366f1" font-weight="700">Vᵀ</text>
          <text x="211" y="220" text-anchor="middle" font-size="10" fill="#818cf8">旋转基</text>

          <!-- Step 2: Vᵀ旋转后 -->
          <g transform="translate(280, 200)">
            <rect x="-88" y="-142" width="176" height="230" rx="18" fill="#ffffff" stroke="#c7d2fe" stroke-width="1.5" filter="url(#svd-soft-shadow)" :opacity="svdActiveStage === 0 || svdActiveStage === -1 ? 1 : 0.55"/>
            <circle v-if="svdActiveStage === 0" cx="0" cy="0" r="92" fill="#6366f1" opacity="0.06"><animate attributeName="r" values="88;98;88" dur="1.8s" repeatCount="indefinite"/></circle>
            <text y="-122" text-anchor="middle" font-size="13" font-weight="700" fill="#6366f1">② Vᵀ 旋转</text>
            <g :transform="`rotate(${svdVangle})`">
              <circle cx="0" cy="0" r="70" fill="url(#svd-indigo-fill)" fill-opacity="0.7" stroke="#6366f1" stroke-width="2"/>
              <line x1="-80" y1="0" x2="80" y2="0" stroke="#e2e8f0" stroke-width="1"/>
              <line x1="0" y1="-80" x2="0" y2="80" stroke="#e2e8f0" stroke-width="1"/>
              <line v-if="svdActiveStage >= 0" x1="0" y1="0" x2="70" y2="0" stroke="#64748b" stroke-width="2.5"/>
              <line v-if="svdActiveStage >= 0" x1="0" y1="0" x2="0" y2="-70" stroke="#64748b" stroke-width="2.5"/>
            </g>
          </g>

          <!-- 箭头2: Σ -->
          <line x1="370" y1="200" x2="412" y2="200" stroke="#d97706" stroke-width="2.5" stroke-linecap="round" marker-end="url(#svd-arrow-amber)"/>
          <text x="391" y="188" text-anchor="middle" font-size="13" fill="#d97706" font-weight="700">Σ</text>
          <text x="391" y="220" text-anchor="middle" font-size="10" fill="#f59e0b">拉伸半轴</text>

          <!-- Step 3: Σ拉伸后（轴对齐） -->
          <g transform="translate(460, 200)">
            <rect x="-88" y="-142" width="176" height="230" rx="18" fill="#ffffff" stroke="#fde68a" stroke-width="1.5" filter="url(#svd-soft-shadow)" :opacity="svdActiveStage === 1 || svdActiveStage === -1 ? 1 : 0.55"/>
            <circle v-if="svdActiveStage === 1" cx="0" cy="0" r="92" fill="#d97706" opacity="0.06"><animate attributeName="r" values="88;98;88" dur="1.8s" repeatCount="indefinite"/></circle>
            <text y="-122" text-anchor="middle" font-size="13" font-weight="700" fill="#d97706">③ Σ 拉伸</text>
            <g>
              <ellipse cx="0" cy="0" :rx="70 * (1 + (sigma1 - 1) * svdStretch)" :ry="70 * (1 + (sigma2 - 1) * svdStretch)" fill="url(#svd-amber-fill)" fill-opacity="0.7" stroke="#d97706" stroke-width="2.5"/>
              <line x1="-80" y1="0" x2="80" y2="0" stroke="#e2e8f0" stroke-width="1"/>
              <line x1="0" y1="-80" x2="0" y2="80" stroke="#e2e8f0" stroke-width="1"/>
              <line v-if="svdActiveStage >= 1" x1="0" y1="0" :x2="70 * (1 + (sigma1 - 1) * svdStretch)" y2="0" stroke="#64748b" stroke-width="2.5"/>
              <line v-if="svdActiveStage >= 1" x1="0" y1="0" x2="0" :y2="-(70 * (1 + (sigma2 - 1) * svdStretch))" stroke="#64748b" stroke-width="2.5"/>
              <text v-if="svdActiveStage >= 1" :x="70 * (1 + (sigma1 - 1) * svdStretch) + 5" y="-3" font-size="11" fill="#64748b">σ₁</text>
              <text v-if="svdActiveStage >= 1" x="5" :y="-(70 * (1 + (sigma2 - 1) * svdStretch)) - 3" font-size="11" fill="#64748b">σ₂</text>
            </g>
          </g>

          <!-- 箭头3: U -->
          <line x1="550" y1="200" x2="592" y2="200" stroke="#0d9488" stroke-width="2.5" stroke-linecap="round" marker-end="url(#svd-arrow-teal)"/>
          <text x="571" y="188" text-anchor="middle" font-size="13" fill="#0d9488" font-weight="700">U</text>
          <text x="571" y="220" text-anchor="middle" font-size="10" fill="#14b8a6">最终朝向</text>

          <!-- Step 4: U旋转后（最终椭球） -->
          <g transform="translate(640, 200)">
            <rect x="-88" y="-142" width="176" height="230" rx="18" fill="#ffffff" stroke="#99f6e4" stroke-width="1.5" filter="url(#svd-soft-shadow)" :opacity="svdActiveStage === 2 || svdActiveStage === -1 ? 1 : 0.55"/>
            <circle v-if="svdActiveStage === 2" cx="0" cy="0" r="92" fill="#0d9488" opacity="0.06"><animate attributeName="r" values="88;98;88" dur="1.8s" repeatCount="indefinite"/></circle>
            <text y="-122" text-anchor="middle" font-size="13" font-weight="700" fill="#0d9488">④ U 旋转 = 椭球</text>
            <g :transform="`rotate(${svdUangle})`">
              <ellipse cx="0" cy="0" :rx="70 * (1 + (sigma1 - 1) * svdStretch)" :ry="70 * (1 + (sigma2 - 1) * svdStretch)" fill="url(#svd-teal-fill)" fill-opacity="0.75" stroke="#0d9488" stroke-width="3"/>
              <line x1="-90" y1="0" x2="90" y2="0" stroke="#e2e8f0" stroke-width="1"/>
              <line x1="0" y1="-90" x2="0" y2="90" stroke="#e2e8f0" stroke-width="1"/>
              <line v-if="svdActiveStage >= 2" x1="0" y1="0" :x2="70 * (1 + (sigma1 - 1) * svdStretch)" y2="0" stroke="#64748b" stroke-width="3"/>
              <line v-if="svdActiveStage >= 2" x1="0" y1="0" x2="0" :y2="-(70 * (1 + (sigma2 - 1) * svdStretch))" stroke="#64748b" stroke-width="3"/>
            </g>
            <text x="0" y="104" text-anchor="middle" font-size="11" fill="#0d9488" font-weight="700">半轴 = σ₁, σ₂</text>
          </g>

          <!-- 底部状态面板 -->
          <g transform="translate(70, 326)">
            <rect width="620" height="76" rx="16" fill="#0f172a" opacity="0.94" filter="url(#svd-soft-shadow)"/>
            <text x="20" y="30" font-size="14" font-weight="700" fill="#ffffff">{{ svdStepText }}</text>
            <text x="20" y="56" font-size="12" fill="#cbd5e1">{{ svdStepSub }}</text>
            <text x="540" y="32" text-anchor="middle" font-size="12" fill="#99f6e4">σ₁={{ sigma1.toFixed(1) }} · σ₂={{ sigma2.toFixed(1) }}</text>
            <text x="540" y="56" text-anchor="middle" font-size="12" fill="#fcd34d">拉伸比 {{ (sigma1 / sigma2).toFixed(2) }}</text>
          </g>
        </svg>
      </AnimationBox>

      <div class="svd-intuition" style="margin-top: 1rem; padding: 1rem 1.2rem; background: linear-gradient(135deg, #ecfdf5, #f0fdfa); border-radius: 8px; border-left: 4px solid #0d9488; font-size: 0.94rem; line-height: 1.8;">
        <strong style="color:#0f766e;">🧐 怎么直观理解 <span class="formula-inline">A = U\Sigma V\T</span>？</strong>
        <p style="margin:0.5rem 0 0 0;">
          任何一个复杂的矩阵映射 <span class="formula-inline">A</span>，都可以拆解为三步：<br/>
          1. <strong><span class="formula-inline">V\T</span>（旋转）</strong>：在原空间里找到一组最完美的<strong>标准正交基</strong>，把它旋转到和坐标轴对齐。<br/>
          2. <strong><span class="formula-inline">\Sigma</span>（拉伸）</strong>：沿着这组轴的方向进行<strong>独立拉伸</strong>，原本的单位圆因此变成了椭圆。奇异值 <span class="formula-inline">\sigma_i</span> 就是椭圆各个半轴的长度。<br/>
          3. <strong><span class="formula-inline">U</span>（再旋转）</strong>：把这个拉伸好的椭圆，整体在目标空间里<strong>再旋转</strong>一下，得到最终的映射结果。<br/>
          这解释了为什么动画中，无论怎么调奇异值，圆一定会变成椭圆——因为矩阵映射本质上就是"旋转 + 拉伸 + 再旋转"，而拉伸轴的方向和长度正是由 SVD 给出的。
        </p>
      </div>
    </Section>

    <!-- 5. Frobenius范数与最佳秩k逼近 -->
    <Section title="Frobenius范数与最佳秩k逼近" :num="5">
      <p>奇异值包含了矩阵的重要"能量"信息：</p>

      <Theorem title="Frobenius范数与奇异值" type="theorem" icon="📌">
        <Formula>\|A\|_F^2 = \sum_{i=1}^{m}\sum_{j=1}^{n} |a_{ij}|^2 = \sum_{i=1}^{r} \sigma_i^2</Formula>
        即矩阵所有元素的平方和等于所有奇异值的平方和。
      </Theorem>

      <Theorem title="Eckart-Young定理（最佳秩k逼近）" type="theorem" icon="📌">
        设 <span class="formula-inline">A = U\Sigma V\T</span> 的SVD为 <span class="formula-inline">A = \sum_{i=1}^{r} \sigma_i u_i v_i\T</span>，
        取 <span class="formula-inline">A_k = \sum_{i=1}^{k} \sigma_i u_i v_i\T = U\Sigma_k V\T</span>，则 <span class="formula-inline">A_k</span> 是 <span class="formula-inline">A</span> 的最佳秩 <span class="formula-inline">k</span> 逼近：
        <Formula>\|A - A_k\|_F^2 = \min_{\rank(B)\leq k} \|A - B\|_F^2 = \sigma_{k+1}^2 + \cdots + \sigma_r^2</Formula>
      </Theorem>

      <div class="svd-intuition" style="margin-top: 0.8rem; padding: 1rem 1.2rem; background: linear-gradient(135deg, #fffbeb, #fefce8); border-radius: 8px; border-left: 4px solid #d97706; font-size: 0.94rem; line-height: 1.8;">
        <strong style="color:#92400e;">🖼️ 图像压缩的本质：</strong>
        <p style="margin:0.5rem 0 0 0;">
          上面公式 <span class="formula-inline">A = \sum_{i=1}^{r} \sigma_i u_i v_i\T</span> 告诉我们：矩阵 <span class="formula-inline">A</span> 可以写成 <span class="formula-inline">r</span> 个"秩为 1 的小矩阵"叠加。每一项 <span class="formula-inline">u_i v_i\T</span> 都是一张"基础纹理图"，<span class="formula-inline">\sigma_i</span> 是该纹理的"能量权重"。<br/>
          由于奇异值 <span class="formula-inline">\sigma_i</span> 衰减极快（往往前 10% 的奇异值聚集了 90% 以上的画面能量，构成图像的大轮廓），后面的奇异值全是噪点和微小细节。所谓<strong>压缩</strong>，就是只保留前 <span class="formula-inline">k</span> 项（主要的"网格"），后面的直接抹成 0：<br/>
          <span class="formula-inline" style="font-size:1.02rem;">A_k = \sigma_1 u_1 v_1\T + \sigma_2 u_2 v_2\T + \cdots + \sigma_k u_k v_k\T</span><br/>
          主成分分析（PCA）、推荐系统、图像压缩的核心，都在这个看似简单的公式里。
        </p>
      </div>
      <p>这是图像压缩、主成分分析(PCA)、推荐系统等应用的理论基础——保留最大的 <span class="formula-inline">k</span> 个奇异值即可捕获矩阵的主要信息。</p>
    </Section>

    <!-- 6. 奇异值分布+低秩逼近误差动画 -->
    <Section title="动画：奇异值分布与低秩逼近误差" :num="6">
      <p>观察不同奇异值分布下的椭球形态，以及随着 <span class="formula-inline">k</span> 增大，逼近误差快速下降的条形图。</p>

      <AnimationBox
        title="奇异值分布与低秩逼近误差"
        :playing="svdErrPlaying"
        description="左：不同σ分布的椭球形态；右：秩k逼近误差条形图（绿色为保留能量比例）"
        @play="svdErrPlay"
        @pause="svdErrPause"
        @reset="svdErrReset"
      >
        <svg :width="svdErrSvgWidth" height="340" viewBox="0 0 700 340">
          <!-- 左侧：不同椭球 -->
          <g transform="translate(0, 20)">
            <text x="175" y="0" text-anchor="middle" font-size="14" font-weight="600" fill="#0d9488">不同奇异值分布的椭球</text>

            <!-- 快速衰减 -->
            <g transform="translate(90, 90)">
              <text y="-35" text-anchor="middle" font-size="12" fill="#475569">快速衰减(σ₁≫σ₂≫σ₃)</text>
              <ellipse cx="0" cy="0" :rx="55*svdErrT" :ry="15*svdErrT" fill="#fca5a5" fill-opacity="0.5" stroke="#ef4444" stroke-width="2"/>
              <text y="70" text-anchor="middle" font-size="11" fill="#94a3b8">可低秩压缩</text>
            </g>

            <!-- 均匀 -->
            <g transform="translate(260, 90)">
              <text y="-35" text-anchor="middle" font-size="12" fill="#475569">均匀(σ₁≈σ₂≈σ₃)</text>
              <circle cx="0" cy="0" :r="40*svdErrT" fill="#93c5fd" fill-opacity="0.5" stroke="#3b82f6" stroke-width="2"/>
              <text y="70" text-anchor="middle" font-size="11" fill="#94a3b8">接近各向同性</text>
            </g>
          </g>

          <!-- 右侧：误差条形图 -->
          <g transform="translate(380, 20)">
            <text x="150" y="0" text-anchor="middle" font-size="14" font-weight="600" fill="#0d9488">秩k逼近误差（相对）</text>
            <!-- 坐标轴 -->
            <line x1="40" y1="240" x2="300" y2="240" stroke="#94a3b8" stroke-width="1.5"/>
            <line x1="40" y1="40" x2="40" y2="240" stroke="#94a3b8" stroke-width="1.5"/>
            <text x="20" y="45" font-size="11" fill="#94a3b8">100%</text>
            <text x="20" y="244" font-size="11" fill="#94a3b8">0%</text>

            <!-- 误差条 (误差 = 剩余奇异值平方和 / 总平方和) -->
            <template v-for="(bar, i) in errBars" :key="'bar'+i">
              <rect :x="55 + i*55" :y="240 - bar.height*svdErrT" :width="35" :height="bar.height*svdErrT"
                :fill="bar.color" rx="4" opacity="0.85"/>
              <text :x="72 + i*55" y="258" text-anchor="middle" font-size="12" fill="#475569">k={{ i }}</text>
              <text :x="72 + i*55" :y="235 - bar.height*svdErrT" text-anchor="middle" font-size="10" fill="#475569">
                {{ Math.round(bar.pct*svdErrT) }}%
              </text>
            </template>
            <text x="170" y="280" text-anchor="middle" font-size="12" fill="#64748b">保留k个奇异值的误差</text>

            <!-- 累计能量线 -->
            <polyline :points="cumLine" fill="none" stroke="#0d9488" stroke-width="2" stroke-dasharray="4,3" v-if="svdErrT > 0.5"/>
            <text x="270" y="80" font-size="11" fill="#0d9488">累计能量</text>
          </g>

          <rect x="30" y="300" width="640" height="30" rx="6" fill="#f0fdfa" stroke="#14b8a6"/>
          <text x="350" y="320" text-anchor="middle" font-size="13" font-weight="600" fill="#0d9488">{{ svdErrStepText }}</text>
        </svg>
      </AnimationBox>
    </Section>

    <!-- 7. 例题 -->
    <Section title="真题精讲" :num="7">
      <ExampleBox source="研究生矩阵论考试真题" badge="📝 真题例题">
        <template #problem>
          <p>求矩阵 <span class="formula-inline">A = \begin{pmatrix} 1 & 1 \\ 1 & 1 \\ 0 & 0 \end{pmatrix}</span> 的奇异值分解。</p>
        </template>
        <template #solution>
          <div class="step">
            <span class="step-num">1</span>
            <div>
              <p><strong>计算 <span class="formula-inline">A\T A</span>：</strong></p>
              <div class="formula-block">
                A\T A = \begin{pmatrix} 1 & 1 & 0 \\ 1 & 1 & 0 \end{pmatrix} \begin{pmatrix} 1 & 1 \\ 1 & 1 \\ 0 & 0 \end{pmatrix} = \begin{pmatrix} 2 & 2 \\ 2 & 2 \end{pmatrix}
              </div>
            </div>
          </div>
          <div class="step">
            <span class="step-num">2</span>
            <div>
              <p><strong>求 <span class="formula-inline">A\T A</span> 的特征值和特征向量：</strong></p>
              <p>特征方程 <span class="formula-inline">\det(\lambda I - A\T A) = \begin{vmatrix} \lambda-2 & -2 \\ -2 & \lambda-2 \end{vmatrix} = (\lambda-2)^2 - 4 = \lambda(\lambda-4) = 0</span></p>
              <p>得 <span class="formula-inline">\lambda_1 = 4,\ \lambda_2 = 0</span>，奇异值 <span class="formula-inline">\sigma_1 = 2</span>。</p>
            </div>
          </div>
          <div class="step">
            <span class="step-num">3</span>
            <div>
              <p><strong>求正交矩阵 <span class="formula-inline">V</span>：</strong></p>
              <p><span class="formula-inline">\lambda_1=4</span> 的特征向量：<span class="formula-inline">(1,1)\T</span>，单位化 <span class="formula-inline">v_1 = \frac{1}{\sqrt{2}}(1,1)\T</span></p>
              <p><span class="formula-inline">\lambda_2=0</span> 的特征向量：<span class="formula-inline">(1,-1)\T</span>，单位化 <span class="formula-inline">v_2 = \frac{1}{\sqrt{2}}(1,-1)\T</span></p>
              <p><span class="formula-inline">V = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}</span></p>
            </div>
          </div>
          <div class="step">
            <span class="step-num">4</span>
            <div>
              <p><strong>求正交矩阵 <span class="formula-inline">U</span>：</strong></p>
              <p><span class="formula-inline">u_1 = \frac{1}{\sigma_1}Av_1 = \frac{1}{2} \cdot \frac{1}{\sqrt{2}} \begin{pmatrix} 2 \\ 2 \\ 0 \end{pmatrix} = \frac{1}{\sqrt{2}}(1,1,0)\T</span></p>
              <p>将 <span class="formula-inline">u_1</span> 扩充为 <span class="formula-inline">\R^3</span> 的标准正交基，取：</p>
              <p><span class="formula-inline">u_2 = \frac{1}{\sqrt{2}}(1,-1,0)\T,\ u_3 = (0,0,1)\T</span></p>
              <p><span class="formula-inline">U = \begin{pmatrix} 1/\sqrt{2} & 1/\sqrt{2} & 0 \\ 1/\sqrt{2} & -1/\sqrt{2} & 0 \\ 0 & 0 & 1 \end{pmatrix}</span></p>
            </div>
          </div>
          <div class="step">
            <span class="step-num">5</span>
            <div>
              <p><strong>写出SVD：</strong></p>
              <div class="formula-block">
                A = U\Sigma V\T = \begin{pmatrix} 1/\sqrt{2} & 1/\sqrt{2} & 0 \\ 1/\sqrt{2} & -1/\sqrt{2} & 0 \\ 0 & 0 & 1 \end{pmatrix} \begin{pmatrix} 2 & 0 \\ 0 & 0 \\ 0 & 0 \end{pmatrix} \cdot \frac{1}{\sqrt{2}}\begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}
              </div>
              <p>验证：<span class="formula-inline">\rank(A)=1</span>，最佳秩1逼近就是 <span class="formula-inline">A</span> 本身（因为只有1个非零奇异值）。</p>
            </div>
          </div>
        </template>
      </ExampleBox>
    </Section>

    <!-- 7. SVD解题流程图（auto模式） -->
    <Section title="SVD求解步骤流程" :num="7">
      <AnimationBox
        mode="auto"
        title="SVD分解计算流程"
        description="SVD求解的五个步骤"
      >
        <div class="svd-flow">
          <div class="sf-step sf-1" style="animation-delay:0s">
            <div class="sf-num">1</div>
            <div class="sf-text">计算 <span class="formula-inline">A\T A</span></div>
          </div>
          <div class="sf-arrow">→</div>
          <div class="sf-step sf-2" style="animation-delay:1.2s">
            <div class="sf-num">2</div>
            <div class="sf-text">求特征值 <span class="formula-inline">\lambda_i</span><br/>奇异值 <span class="formula-inline">\sigma_i=\sqrt{\lambda_i}</span></div>
          </div>
          <div class="sf-arrow">→</div>
          <div class="sf-step sf-3" style="animation-delay:2.4s">
            <div class="sf-num">3</div>
            <div class="sf-text">求特征向量<br/>正交化得 <span class="formula-inline">V</span></div>
          </div>
          <div class="sf-arrow">→</div>
          <div class="sf-step sf-4" style="animation-delay:3.6s">
            <div class="sf-num">4</div>
            <div class="sf-text"><span class="formula-inline">u_i = Av_i/\sigma_i</span><br/>扩充得 <span class="formula-inline">U</span></div>
          </div>
          <div class="sf-arrow">→</div>
          <div class="sf-step sf-5" style="animation-delay:4.8s">
            <div class="sf-num">5</div>
            <div class="sf-text">写出 <span class="formula-inline">A=U\Sigma V\T</span></div>
          </div>
        </div>
      </AnimationBox>
    </Section>

    <Section title="⚠️ 计算避坑指南" :num="7">
      <Theorem title="⚠️ 考试与计算的两个大坑（必看）" type="note" icon="⚠️" style="margin:0;">
        <p style="margin-top:0;"><strong>坑一：正负号对齐问题</strong><br/>求出 <span class="formula-inline">V</span> 的列向量 <span class="formula-inline">v_i</span> 后，<strong>绝对不能</strong>盲目去求 <span class="formula-inline">AA\T</span> 的特征向量来凑 <span class="formula-inline">U</span>！因为特征向量的方向正负可任意选取，如果 <span class="formula-inline">u_i</span> 和 <span class="formula-inline">v_i</span> 独立确定正负号，会出现 <span class="formula-inline">(-u_i, v_i)</span> 这种不匹配的组合（等价于 <span class="formula-inline">\sigma_i \lt 0</span>，不合法）。<br/><strong>正确做法：</strong>先确定 <span class="formula-inline">v_i</span>（来自 <span class="formula-inline">A\T A</span>），再严格通过公式 <span class="formula-inline">u_i = \frac{1}{\sigma_i} A v_i</span> 计算 <span class="formula-inline">U</span> 的前 <span class="formula-inline">r</span> 个列向量。<span class="formula-inline">(-u_i, -v_i)</span> 同时取反是合法的，但 <span class="formula-inline">(u_i, -v_i)</span> 会出错。</p>
        <p><strong>坑二：零空间的扩充（<span class="formula-inline">U</span> 的剩余列）</strong><br/>当 <span class="formula-inline">r \lt m</span> 时，用 <span class="formula-inline">u_i = \frac{1}{\sigma_i} A v_i</span> 只能求出 <span class="formula-inline">U</span> 的前 <span class="formula-inline">r</span> 列。剩下的 <span class="formula-inline">m-r</span> 列，必须通过求解齐次方程组 <span class="formula-inline">A\T x = 0</span> 得到基础解系，并对这些向量<strong>施密特正交化</strong>来补齐——它们构成 <span class="formula-inline">N(A\T) = R(A)^{\perp}</span> 的标准正交基。<br/><strong>对称提醒：</strong>当 <span class="formula-inline">r \lt n</span> 时，<span class="formula-inline">V</span> 的剩余列同样来自 <span class="formula-inline">\lambda=0</span> 对应的特征向量（即 <span class="formula-inline">N(A)</span>），这两侧是对称的。</p>
      </Theorem>
    </Section>

    <!-- 8. 例题2：低秩逼近 -->
    <Section title="真题精讲（续）" :num="8">
      <ExampleBox source="经典习题" badge="📝 最佳秩k逼近">
        <template #problem>
          <p>设 <span class="formula-inline">A = \begin{pmatrix} 2 & 0 & 0 \\ 0 & 1 & 0 \end{pmatrix}</span>，求 <span class="formula-inline">\|A\|_F</span> 和最佳秩1逼近 <span class="formula-inline">A_1</span>，并计算逼近误差。</p>
        </template>
        <template #solution>
          <div class="step">
            <span class="step-num">1</span>
            <div>
              <p><strong>Frobenius范数：</strong></p>
              <p><span class="formula-inline">\|A\|_F^2 = 2^2 + 0^2 + 0^2 + 0^2 + 1^2 + 0^2 = 5</span>，故 <span class="formula-inline">\|A\|_F = \sqrt{5}</span>。</p>
              <p>或用奇异值：<span class="formula-inline">A</span> 的奇异值 <span class="formula-inline">\sigma_1=2,\sigma_2=1</span>，<span class="formula-inline">\|A\|_F^2 = \sigma_1^2 + \sigma_2^2 = 4+1=5</span>。</p>
            </div>
          </div>
          <div class="step">
            <span class="step-num">2</span>
            <div>
              <p><strong>最佳秩1逼近：</strong></p>
              <p><span class="formula-inline">A</span> 已是对角矩阵，其SVD为 <span class="formula-inline">A = U\Sigma V\T</span>，其中 <span class="formula-inline">U=I_2</span>，<span class="formula-inline">V=I_3</span>，<span class="formula-inline">\Sigma = \begin{pmatrix}2&0&0\\0&1&0\end{pmatrix}</span>。</p>
              <p>取最大奇异值 <span class="formula-inline">\sigma_1=2</span>：<span class="formula-inline">A_1 = \sigma_1 u_1 v_1\T = 2 \cdot (1,0)\T \cdot (1,0,0) = \begin{pmatrix}2&0&0\\0&0&0\end{pmatrix}</span></p>
            </div>
          </div>
          <div class="step">
            <span class="step-num">3</span>
            <div>
              <p><strong>逼近误差：</strong></p>
              <p><span class="formula-inline">\|A - A_1\|_F = \sigma_2 = 1</span>，相对误差 <span class="formula-inline">1/\sqrt{5} \approx 44.7\%</span>。</p>
              <p>由Eckart-Young定理，这是所有秩1矩阵中能达到的最小误差。</p>
            </div>
          </div>
        </template>
      </ExampleBox>
    </Section>

    <!-- 9. 小结 -->
    <Section title="知识点小结" :num="9">
      <Steps :steps="[
        '满秩分解 A=FG：F列满秩、G行满秩，可通过行标准形构造（取主元列为F，非零行为G）。',
        '奇异值 σᵢ=√λᵢ(AᵀA)，是非负实数，衡量矩阵在各正交方向上的“拉伸强度”。',
        'SVD分解 A=UΣVᵀ：U、V为正交矩阵，Σ为对角元为奇异值的广义对角矩阵，任何矩阵都存在SVD。',
        'SVD几何意义：Vᵀ旋转→Σ沿轴拉伸→U旋转，将单位球映射为椭球，半轴长=奇异值。',
        'Frobenius范数 ||A||_F² = Σσᵢ²，奇异值平方和等于矩阵所有元素平方和。',
        'Eckart-Young定理：最佳秩k逼近 A_k=UΣ_kVᵀ 取前k个大奇异值，误差||A-A_k||_F²=Σ_{i>k}σᵢ²，是PCA/图像压缩的核心。'
      ]"/>
    </Section>

    <!-- 10. 真题与习题汇总 -->
    <Section title="🗂️ 真题与习题汇总">
      <WeekQuizBank :quizzes="quizzes" weekLabel="第2周" />
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
import { ref, onUnmounted, computed, watch } from 'vue'

const quizzes = (quizBank[6] || []).map(q => ({ ...q, lessonNum: '06', lessonTitle: '满秩分解与SVD' }))
const hwQuizzes = computed(() => (homeworkBank[6] || []).map(q => ({ ...q })))

const renderTrigger = ref(0)
const { renderMath } = useKatex(renderTrigger)

// ========== SVD几何动画 ==========
const svdPlaying = ref(false)
let svdRafId = null
const svdPhase = ref(0)
const sigma1 = ref(1.8)
const sigma2 = ref(0.8)
const svdVangle = ref(0)
const svdUangle = ref(0)
const svdStretch = ref(0)
const svdStepText = ref('点击播放：单位圆经三步变换变为椭球')
const svdStepSub = ref('')
const svdActiveStage = ref(-1)

function easeInOutCubic(x) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
}

function svdAnimate() {
  const dur = 5200
  const start = performance.now()

  function tick(now) {
    if (!svdPlaying.value) return
    const t = Math.min((now - start) / dur, 1)

    if (t < 0.22) {
      svdActiveStage.value = 0
      const p = easeInOutCubic(t / 0.22)
      svdVangle.value = 30 * p
      svdUangle.value = 0
      svdStretch.value = 0
      svdStepText.value = '第1步：Vᵀ 旋转坐标基'
      svdStepSub.value = '单位圆形状保持不变，只是换了观察方向'
    } else if (t < 0.34) {
      svdActiveStage.value = 0
      svdVangle.value = 30
      svdUangle.value = 0
      svdStretch.value = 0
      svdStepText.value = 'Vᵀ 旋转完成'
      svdStepSub.value = '圆还是圆，但基已经对齐到奇异向量方向'
    } else if (t < 0.62) {
      svdActiveStage.value = 1
      const p = easeInOutCubic((t - 0.34) / 0.28)
      svdVangle.value = 30
      svdUangle.value = 0
      svdStretch.value = p
      svdStepText.value = '第2步：Σ 沿坐标轴拉伸'
      svdStepSub.value = 'σ₁、σ₂ 决定了椭圆的长短半轴'
    } else if (t < 0.74) {
      svdActiveStage.value = 1
      svdVangle.value = 30
      svdUangle.value = 0
      svdStretch.value = 1
      svdStepText.value = 'Σ 拉伸完成'
      svdStepSub.value = '椭圆半轴 = σᵢ·(单位圆半径)'
    } else if (t < 0.94) {
      svdActiveStage.value = 2
      const p = easeInOutCubic((t - 0.74) / 0.2)
      svdVangle.value = 30
      svdStretch.value = 1
      svdUangle.value = -45 * p
      svdStepText.value = '第3步：U 将椭圆旋转到最终方向'
      svdStepSub.value = 'U 是目标空间中的旋转'
    } else {
      svdActiveStage.value = 2
      svdVangle.value = 30
      svdStretch.value = 1
      svdUangle.value = -45
      svdStepText.value = '完成！单位圆 → 椭圆，半轴长 = σ₁, σ₂'
      svdStepSub.value = '拖动滑块改变 σ 值，观察椭圆形状变化'
    }

    renderTrigger.value++

    if (t < 1) {
      svdRafId = requestAnimationFrame(tick)
    } else {
      svdPlaying.value = false
    }
  }

  svdRafId = requestAnimationFrame(tick)
}

function svdPlay() { svdPlaying.value = true; svdAnimate() }
function svdPause() { svdPlaying.value = false; if (svdRafId) cancelAnimationFrame(svdRafId) }
function svdReset() {
  svdPlaying.value = false
  if (svdRafId) cancelAnimationFrame(svdRafId)
  svdPhase.value = 0
  svdVangle.value = 0
  svdUangle.value = 0
  svdStretch.value = 0
  sigma1.value = 1.8
  sigma2.value = 0.8
  svdStepText.value = '点击播放：单位圆经三步变换变为椭球'
  svdStepSub.value = ''
  svdActiveStage.value = -1
  renderTrigger.value++
}

// 保证 σ₁ ≥ σ₂（规范记号）
watch(sigma1, (v) => { if (v < sigma2.value) sigma2.value = v })
watch(sigma2, (v) => { if (v > sigma1.value) sigma1.value = v })

// ========== 误差条形图动画 ==========
const svdErrPlaying = ref(false)
let svdErrRafId = null
const svdErrSvgWidth = ref(700)
const svdErrT = ref(0)
const svdErrStepText = ref('点击播放：观察奇异值衰减与低秩逼近误差')

// 典型快速衰减奇异值
const svals = [5, 3, 1.5, 0.8, 0.4, 0.2, 0.1]
const totalS = svals.reduce((s,v) => s + v*v, 0)

const errBars = computed(() => {
  // k=0到k=6，误差=Σ_{i>k}σᵢ²/total
  const bars = []
  let cum = 0
  for (let k = 0; k <= 5; k++) {
    const err = svals.slice(k).reduce((s,v) => s+v*v, 0) / totalS
    const pct = Math.round(err * 100)
    const height = err * 190
    cum += (k < svals.length ? svals[k]*svals[k] : 0)
    bars.push({ height, pct, color: pct > 60 ? '#fca5a5' : pct > 30 ? '#fde68a' : '#86efac' })
  }
  return bars
})

const cumLine = computed(() => {
  let pts = []
  let cum = 0
  for (let k = 0; k <= 5; k++) {
    const x = 72 + k*55
    const energy = 1 - svals.slice(k).reduce((s,v) => s+v*v, 0) / totalS
    const y = 240 - energy * 190
    pts.push(`${x},${y}`)
  }
  return pts.join(' ')
})

function svdErrAnimate() {
  const dur = 2000
  const start = performance.now()
  function tick(now) {
    if (!svdErrPlaying.value) return
    const t = Math.min((now - start) / dur, 1)
    svdErrT.value = t
    if (t < 1) {
      if (t < 0.5) svdErrStepText.value = '条形图逐渐升高：k=0误差100%，k越大误差越小'
      else svdErrStepText.value = '奇异值快速衰减时，仅需少量k即可获得高精度逼近'
      renderTrigger.value++
      svdErrRafId = requestAnimationFrame(tick)
    } else {
      svdErrPlaying.value = false
      svdErrStepText.value = '绿色虚线为累计能量比例，k=3时已捕获绝大部分信息'
      renderTrigger.value++
    }
  }
  svdErrRafId = requestAnimationFrame(tick)
}

function svdErrPlay() { svdErrPlaying.value = true; svdErrAnimate() }
function svdErrPause() { svdErrPlaying.value = false; if (svdErrRafId) cancelAnimationFrame(svdErrRafId) }
function svdErrReset() {
  svdErrPlaying.value = false
  if (svdErrRafId) cancelAnimationFrame(svdErrRafId)
  svdErrT.value = 0
  svdErrStepText.value = '点击播放：观察奇异值衰减与低秩逼近误差'
  renderTrigger.value++
}

onUnmounted(() => {
  svdPause()
  svdErrPause()
})
</script>

<style scoped>
.formula-inline { display: inline; }
.formula-block { display: block; text-align: center; margin: 12px 0; }

/* Bilibili 视频嵌入 */
.bilibili-video {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 */
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}
.bilibili-video iframe {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

/* SVD 几何动画 SVG */
.svd-geometry-svg {
  width: 100%;
  max-width: 860px;
  height: auto;
  display: block;
  margin: 0 auto;
  overflow: visible;
}

/* SVD 滑块控制台 */
.svd-sliders {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  padding: 8px 12px;
  border-radius: 999px;
  background: linear-gradient(135deg, #f8fafc, #ecfeff);
  border: 1px solid #dbeafe;
  font-size: 13px;
}
.svd-slider-label {
  display: flex; align-items: center; gap: 8px;
  padding: 6px 12px;
  border-radius: 999px;
  background: #ffffff;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.06);
  font-size: 13px; font-weight: 650; color: #334155;
}
.svd-slider-name { white-space: nowrap; }
.svd-sigma-val {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 2.4em; height: 24px;
  padding: 0 8px; border-radius: 999px;
  color: #fff; font-weight: 800; font-size: 0.86em;
}
.svd-slider-major .svd-sigma-val {
  background: linear-gradient(135deg, #d97706, #f59e0b);
}
.svd-slider-minor .svd-sigma-val {
  background: linear-gradient(135deg, #0d9488, #14b8a6);
}
.svd-sliders input[type="range"] {
  width: 160px; cursor: pointer;
}
.svd-slider-major input[type="range"] {
  accent-color: #d97706;
}
.svd-slider-minor input[type="range"] {
  accent-color: #0d9488;
}
.svd-ratio-pill {
  padding: 7px 14px; border-radius: 999px;
  background: #0f172a; color: #e0f2fe;
  font-size: 12px; font-weight: 700; white-space: nowrap;
}

/* 满秩分解流程（auto模式CSS动画） */
.fr-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 30px 16px;
  flex-wrap: wrap;
  min-height: 200px;
}
.fr-space {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border-radius: 16px;
  border: 2px dashed #94a3b8;
  min-width: 90px;
  background: #fff;
}
.fr-n { border-color: #f59e0b; background: #fffbeb; }
.fr-r { border-color: #059669; background: #ecfdf5; }
.fr-m { border-color: #3b82f6; background: #eff6ff; }
.fr-ball {
  width: 50px; height: 50px;
  border-radius: 50%;
  background: radial-gradient(circle, #fde68a, #f59e0b);
  opacity: 0;
  animation: fr-pulse 6s ease-in-out infinite;
}
.fr-ellipse {
  width: 60px; height: 40px;
  border-radius: 50%;
  background: radial-gradient(circle, #6ee7b7, #059669);
  opacity: 0;
  animation: fr-pulse 6s ease-in-out infinite;
}
.fr-rotated {
  background: radial-gradient(circle, #93c5fd, #3b82f6);
  transform: rotate(20deg);
}
.fr-label { font-size: 18px; font-weight: 700; color: #1e293b; }
.fr-sub { font-size: 11px; color: #64748b; }
.fr-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-width: 50px;
}
.fr-arrow-line {
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, #0d9488, #14b8a6);
  border-radius: 2px;
  position: relative;
  opacity: 0;
  animation: fr-arrow 6s ease-in-out infinite;
}
.fr-arrow-line::after {
  content: '';
  position: absolute;
  right: -6px;
  top: -4px;
  border: 6px solid transparent;
  border-left-color: #0d9488;
}
.fr-arrow-label { font-size: 16px; font-weight: 700; opacity: 0; animation: fr-fade 6s ease-in-out infinite; }
.fr-arrow-sub { font-size: 10px; color: #64748b; opacity: 0; animation: fr-fade 6s ease-in-out infinite; }
.fr-eq {
  margin-left: 12px;
  padding: 8px 20px;
  background: linear-gradient(135deg,#0d9488,#14b8a6);
  color: #fff;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 700;
  opacity: 0;
  animation: fr-pulse 6s ease-in-out infinite;
}
@keyframes fr-pulse {
  0% { opacity: 0; transform: scale(0.6); }
  10% { opacity: 1; transform: scale(1.1); }
  15% { transform: scale(1); }
  80% { opacity: 1; transform: scale(1); }
  90%,100% { opacity: 0.3; transform: scale(0.95); }
}
@keyframes fr-arrow {
  0% { opacity: 0; width: 0; }
  10% { opacity: 1; width: 40px; }
  80% { opacity: 1; width: 40px; }
  90%,100% { opacity: 0.3; width: 40px; }
}
@keyframes fr-fade {
  0% { opacity: 0; }
  15% { opacity: 1; }
  80% { opacity: 1; }
  90%,100% { opacity: 0.3; }
}

/* SVD解题流程图（auto模式） */
.svd-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 24px 12px;
  flex-wrap: wrap;
  min-height: 150px;
}
.sf-step {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 12px;
  background: #fff;
  border: 2px solid #6366f1;
  opacity: 1;
}
.sf-num {
  width: 28px; height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg,#4f46e5,#7c3aed);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  flex-shrink: 0;
}
.sf-text { font-size: 13px; color: #334155; line-height: 1.4; }
.sf-arrow { font-size: 20px; color: #94a3b8; opacity: 1; }
</style>
