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

    <Section num="4" title="子空间的和与交、维数公式">
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
    </Section>

    <Section num="5" title="直和分解">
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

    <Section num="6" title="真题例题详解">
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

    <Section title="🗂️ 真题与习题汇总">
      <WeekQuizBank :quizzes="quizzes" weekLabel="第1周" />
    </Section>

    <Section title="📌 知识点小结">
      <Steps :steps="[
        '线性空间：非空集合 + 数域 + 加法/数乘 = 满足8条公理的代数结构',
        '子空间判定：非空 + 对线性组合封闭（kα + lβ ∈ W），零向量必在其中',
        '基 = 线性无关 + 张成空间；维数 = 基中向量个数',
        '维数公式：dim(W₁+W₂) = dim W₁ + dim W₂ − dim(W₁∩W₂)',
        '直和 ⟺ 零向量分解唯一 ⟺ W₁∩W₂ = {0} ⟺ dim(W₁+W₂) = dim W₁ + dim W₂'
      ]" />
    </Section>

    <Section title="📝 课后作业" :num="7">
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
})
</script>
