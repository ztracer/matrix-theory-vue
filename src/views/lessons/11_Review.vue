<template>
  <LessonLayout :lesson-id="11" title="考前预测与复习" subtitle="Exam Review & Predictions">
    <!-- Welcome Banner -->
    <Section title="考前冲刺：矩阵论核心考点速览" :num="0">
      <div class="review-banner">
        <div class="banner-item">
          <span class="banner-num">6</span>
          <span class="banner-label">大高频计算题</span>
        </div>
        <div class="banner-item">
          <span class="banner-num">6</span>
          <span class="banner-label">大证明题模板</span>
        </div>
        <div class="banner-item">
          <span class="banner-num">3</span>
          <span class="banner-label">阶矩阵核心套路</span>
        </div>
        <div class="banner-item accent">
          <span class="banner-num">1</span>
          <span class="banner-label">套解题流程</span>
        </div>
      </div>
      <p style="margin-top:16px;">
        本讲对矩阵论课程全部11讲内容进行系统梳理，浓缩为<span style="color:#ea580c;font-weight:700;">计算题模板</span>、
        <span style="color:#7c3aed;font-weight:700;">证明题套路</span>、
        <span style="color:#ec4899;font-weight:700;">三阶矩阵速算</span>三大模块，帮助你在考场上快速解题。
      </p>
    </Section>

    <!-- Section 1: 6大高频计算题 -->
    <Section title="六大高频计算题模板" :num="1">
      <div class="template-grid">
        <div class="template-card" v-for="(t, i) in calcTemplates" :key="i">
          <div class="t-card-header" :style="{background: t.color}">
            <span class="t-num">{{ i+1 }}</span>
            <span class="t-name">{{ t.name }}</span>
          </div>
          <div class="t-card-body">
            <div class="t-step" v-for="(s, j) in t.steps" :key="j">
              <span class="s-bullet">{{ j+1 }}</span>
              <span class="s-text">{{ s }}</span>
            </div>
            <div class="t-formula" v-if="t.formula">
              <span class="formula-inline">{{ t.formula }}</span>
            </div>
          </div>
        </div>
      </div>
    </Section>

    <!-- Section 2: 6大证明题模板 -->
    <Section title="六大证明题模板" :num="2">
      <div class="proof-list">
        <div class="proof-item" v-for="(p, i) in proofTemplates" :key="i">
          <div class="p-head">
            <span class="p-idx">{{ String.fromCharCode(65+i) }}</span>
            <span class="p-title">{{ p.title }}</span>
          </div>
          <div class="p-body">
            <p><strong>核心方法：</strong>{{ p.method }}</p>
            <p><strong>关键步骤：</strong></p>
            <ol>
              <li v-for="(step, j) in p.steps" :key="j">{{ step }}</li>
            </ol>
          </div>
        </div>
      </div>
    </Section>

    <!-- Animation 1: 解题流程全景动画 (auto模式 - CSS动画自动循环高亮) -->
    <Section title="动画：考试解题流程" :num="3">
      <AnimationBox
        title="五步法解题流程全景"
        mode="auto"
        description="从读题到验证的标准解题流程，自动循环高亮5个步骤，养成良好解题习惯。"
      >
        <svg viewBox="0 0 700 280" class="responsive-svg">
          <defs>
            <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ea580c"/>
              <stop offset="100%" stop-color="#7c3aed"/>
            </linearGradient>
          </defs>
          <!-- Flow line (always fully visible in auto mode) -->
          <line x1="60" y1="140" x2="640" y2="140" stroke="url(#flowGrad)" stroke-width="4" stroke-linecap="round" opacity="0.6"/>

          <!-- Flow nodes with CSS pulse animation -->
          <g v-for="(node, i) in flowNodes" :key="i">
            <circle class="flow-node" :cx="node.x" :cy="140" r="30"
                    :fill="node.activeColor" :stroke="node.activeColor" stroke-width="2"
                    :style="{ color: node.activeColor, animationDelay: (i * 1) + 's' }"/>
            <text :x="node.x" :y="138" text-anchor="middle" fill="#fff" font-size="11" font-weight="700">{{ node.icon }}</text>
            <text :x="node.x" :y="153" text-anchor="middle" fill="#fff" font-size="10">{{ node.labelShort }}</text>
            <text :x="node.x" :y="190" text-anchor="middle" fill="#334155" font-size="13" font-weight="600">{{ node.label }}</text>
            <text :x="node.x" :y="210" text-anchor="middle" fill="#64748b" font-size="11">{{ node.desc }}</text>
          </g>

          <!-- Step numbers below -->
          <g v-for="(node, i) in flowNodes" :key="'num'+i">
            <circle :cx="node.x" cy="245" r="12" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
            <text :x="node.x" :y="249" text-anchor="middle" fill="#64748b" font-size="11" font-weight="700">{{ i+1 }}</text>
          </g>
        </svg>
      </AnimationBox>
    </Section>

    <!-- Section: 三阶矩阵核心套路 -->
    <Section title="三阶矩阵核心套路" :num="4">
      <Theorem title="三阶矩阵解题速查表" type="tip" icon="⚡">
        <p>考试90%以上的计算题为三阶矩阵，记住以下套路可以大幅提速：</p>
      </Theorem>

      <div class="trick-grid">
        <div class="trick-card">
          <h4>特征值速算</h4>
          <ul>
            <li><strong>迹</strong>：<span class="formula-inline">\lambda_1+\lambda_2+\lambda_3 = \operatorname{tr}(A) = a_{11}+a_{22}+a_{33}</span></li>
            <li><strong>行列式</strong>：<span class="formula-inline">\lambda_1\lambda_2\lambda_3 = \det(A)</span></li>
            <li>上/下三角矩阵：对角元即特征值</li>
            <li>秩1矩阵：<span class="formula-inline">A = uv^{\mathsf{T}}</span>，特征值为<span class="formula-inline">v^{\mathsf{T}}u, 0, 0</span></li>
          </ul>
        </div>
        <div class="trick-card">
          <h4>Jordan标准形</h4>
          <ul>
            <li>三阶矩阵Jordan形只有6种类型</li>
            <li>三个互异特征值→对角矩阵</li>
            <li>二重根<span class="formula-inline">\lambda</span>：检查<span class="formula-inline">\operatorname{rank}(A-\lambda I)</span>，秩=2→两个1阶块(对角)，秩=1→一个2阶块</li>
            <li>三重根：检查<span class="formula-inline">\operatorname{rank}(A-\lambda I)</span>和<span class="formula-inline">\operatorname{rank}(A-\lambda I)^2</span></li>
          </ul>
        </div>
        <div class="trick-card">
          <h4>e^At 计算</h4>
          <ul>
            <li>对角化：<span class="formula-inline">e^{At} = P\operatorname{diag}(e^{\lambda_i t})P^{-1}</span></li>
            <li>Jordan块<span class="formula-inline">J_k(\lambda)</span>：<span class="formula-inline">e^{Jt} = e^{\lambda t}\begin{pmatrix}1&t&t^2/2\\0&1&t\\0&0&1\end{pmatrix}</span></li>
            <li>待定系数法：<span class="formula-inline">r(\lambda_i)=e^{\lambda_i t}</span>，重根时求导</li>
          </ul>
        </div>
        <div class="trick-card">
          <h4>广义逆A⁺</h4>
          <ul>
            <li>满秩分解<span class="formula-inline">A=FG</span>→<span class="formula-inline">A^+=G^{\mathsf{T}}(GG^{\mathsf{T}})^{-1}(F^{\mathsf{T}}F)^{-1}F^{\mathsf{T}}</span></li>
            <li>列满秩<span class="formula-inline">A^+=(A^{\mathsf{T}}A)^{-1}A^{\mathsf{T}}</span></li>
            <li>行满秩<span class="formula-inline">A^+=A^{\mathsf{T}}(AA^{\mathsf{T}})^{-1}</span></li>
          </ul>
        </div>
      </div>
    </Section>

    <!-- Animation 2: 知识体系思维导图 (auto模式 - CSS脉冲效果) -->
    <Section title="知识体系关联思维导图" :num="5">
      <AnimationBox
        title="三周知识体系全景图"
        mode="auto"
        description="中心为矩阵论核心，三周内容分别在左上(蓝紫色)、上方(青绿色)、右上(橙粉色)区域。节点自动脉冲高亮，展示知识关联。"
      >
        <svg viewBox="0 0 1000 600" class="responsive-svg mindmap-svg">
          <defs>
            <linearGradient id="gRoot2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#4f46e5"/><stop offset="50%" stop-color="#7c3aed"/><stop offset="100%" stop-color="#ec4899"/>
            </linearGradient>
            <linearGradient id="gW1r" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#4338ca"/><stop offset="100%" stop-color="#6366f1"/>
            </linearGradient>
            <linearGradient id="gW2r" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#0d9488"/><stop offset="100%" stop-color="#14b8a6"/>
            </linearGradient>
            <linearGradient id="gW3r" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ea580c"/><stop offset="100%" stop-color="#ec4899"/>
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          <!-- ========== EDGES (always visible) ========== -->
          <g class="edges">
            <!-- Root to Week nodes (curved, outward from center) -->
            <path d="M500,320 C380,270 270,210 200,175" stroke="#c7d2fe" stroke-width="3" fill="none"/>
            <path d="M500,320 C500,250 500,180 500,145" stroke="#99f6e4" stroke-width="3" fill="none"/>
            <path d="M500,320 C620,270 730,210 800,175" stroke="#fed7aa" stroke-width="3" fill="none"/>

            <!-- Week 1 edges -->
            <path d="M200,175 C150,155 110,140 85,130" stroke="#a5b4fc" stroke-width="2" fill="none"/>
            <path d="M200,175 C155,210 120,250 100,275" stroke="#a5b4fc" stroke-width="2" fill="none"/>
            <path d="M200,175 C195,240 198,310 200,340" stroke="#a5b4fc" stroke-width="2" fill="none"/>
            <path d="M200,175 C240,210 280,250 305,270" stroke="#a5b4fc" stroke-width="2" fill="none" stroke-dasharray="5,3"/>

            <!-- Week 2 edges -->
            <path d="M500,145 C450,180 410,210 385,230" stroke="#5eead4" stroke-width="2" fill="none"/>
            <path d="M500,145 C550,180 590,210 615,230" stroke="#5eead4" stroke-width="2" fill="none"/>
            <path d="M500,145 C500,200 500,250 500,275" stroke="#5eead4" stroke-width="2" fill="none" stroke-dasharray="5,3"/>

            <!-- Week 3 edges -->
            <path d="M800,175 C760,210 720,240 700,255" stroke="#fdba74" stroke-width="2" fill="none" stroke-dasharray="5,3"/>
            <path d="M800,175 C840,155 870,140 888,128" stroke="#fdba74" stroke-width="2" fill="none"/>
            <path d="M800,175 C850,210 890,250 908,270" stroke="#fdba74" stroke-width="2" fill="none"/>
            <path d="M800,175 C810,250 820,330 828,375" stroke="#f9a8d4" stroke-width="2.5" fill="none"/>
          </g>

          <!-- ========== NODES (always visible, with CSS pulse) ========== -->
          <!-- Root node: 矩阵论 at (500,320) -->
          <g class="mm-node mm-root" filter="url(#glow)">
            <circle cx="500" cy="320" r="52" fill="url(#gRoot2)"/>
            <text x="500" y="315" text-anchor="middle" fill="#fff" font-weight="800" font-size="20">矩阵论</text>
            <text x="500" y="338" text-anchor="middle" fill="rgba(255,255,255,.85)" font-size="11">Matrix Theory</text>
          </g>

          <!-- Week nodes -->
          <g class="mm-node mm-week">
            <circle cx="200" cy="175" r="40" fill="url(#gW1r)"/>
            <text x="200" y="170" text-anchor="middle" fill="#fff" font-weight="700" font-size="13">第1周</text>
            <text x="200" y="187" text-anchor="middle" fill="rgba(255,255,255,.9)" font-size="10">空间变换</text>
          </g>
          <g class="mm-node mm-week" style="animation-delay:0.3s">
            <circle cx="500" cy="145" r="40" fill="url(#gW2r)"/>
            <text x="500" y="140" text-anchor="middle" fill="#fff" font-weight="700" font-size="13">第2周</text>
            <text x="500" y="157" text-anchor="middle" fill="rgba(255,255,255,.9)" font-size="10">矩阵分解</text>
          </g>
          <g class="mm-node mm-week" style="animation-delay:0.6s">
            <circle cx="800" cy="175" r="40" fill="url(#gW3r)"/>
            <text x="800" y="170" text-anchor="middle" fill="#fff" font-weight="700" font-size="13">第3周</text>
            <text x="800" y="187" text-anchor="middle" fill="rgba(255,255,255,.9)" font-size="10">应用专题</text>
          </g>

          <!-- Week 1 knowledge nodes with staggered pulse -->
          <g class="mm-topic" style="animation-delay:0.9s">
            <circle cx="80" cy="120" r="30" fill="#4f46e5"/>
            <text x="80" y="117" text-anchor="middle" fill="#fff" font-weight="600" font-size="11">线性</text>
            <text x="80" y="131" text-anchor="middle" fill="rgba(255,255,255,.9)" font-size="10">空间</text>
          </g>
          <g class="mm-topic" style="animation-delay:1.1s">
            <circle cx="90" cy="280" r="30" fill="#6366f1"/>
            <text x="90" y="277" text-anchor="middle" fill="#fff" font-weight="600" font-size="11">线性</text>
            <text x="90" y="291" text-anchor="middle" fill="rgba(255,255,255,.9)" font-size="10">变换</text>
          </g>
          <g class="mm-topic" style="animation-delay:1.3s">
            <circle cx="200" cy="360" r="30" fill="#7c3aed"/>
            <text x="200" y="357" text-anchor="middle" fill="#fff" font-weight="600" font-size="11">Jordan</text>
            <text x="200" y="371" text-anchor="middle" fill="rgba(255,255,255,.9)" font-size="10">标准形</text>
          </g>
          <g class="mm-topic" style="animation-delay:1.5s">
            <circle cx="310" cy="280" r="28" fill="#8b5cf6"/>
            <text x="310" y="277" text-anchor="middle" fill="#fff" font-weight="600" font-size="11">矩阵</text>
            <text x="310" y="291" text-anchor="middle" fill="rgba(255,255,255,.9)" font-size="10">函数</text>
          </g>

          <!-- Week 2 knowledge nodes -->
          <g class="mm-topic" style="animation-delay:1.7s">
            <circle cx="370" cy="240" r="30" fill="#0d9488"/>
            <text x="370" y="237" text-anchor="middle" fill="#fff" font-weight="600" font-size="11">LU/QR</text>
            <text x="370" y="251" text-anchor="middle" fill="rgba(255,255,255,.9)" font-size="10">分解</text>
          </g>
          <g class="mm-topic" style="animation-delay:1.9s">
            <circle cx="630" cy="240" r="30" fill="#14b8a6"/>
            <text x="630" y="237" text-anchor="middle" fill="#fff" font-weight="600" font-size="11">SVD</text>
            <text x="630" y="251" text-anchor="middle" fill="rgba(255,255,255,.9)" font-size="10">分解</text>
          </g>
          <g class="mm-topic" style="animation-delay:2.1s">
            <circle cx="500" cy="290" r="28" fill="#06b6d4"/>
            <text x="500" y="287" text-anchor="middle" fill="#fff" font-weight="600" font-size="11">M-P</text>
            <text x="500" y="301" text-anchor="middle" fill="rgba(255,255,255,.9)" font-size="10">广义逆</text>
          </g>

          <!-- Week 3 knowledge nodes -->
          <g class="mm-topic" style="animation-delay:2.3s">
            <circle cx="690" cy="260" r="28" fill="#ea580c"/>
            <text x="690" y="257" text-anchor="middle" fill="#fff" font-weight="600" font-size="11">投影</text>
            <text x="690" y="271" text-anchor="middle" fill="rgba(255,255,255,.9)" font-size="10">矩阵</text>
          </g>
          <g class="mm-topic" style="animation-delay:2.5s">
            <circle cx="900" cy="120" r="30" fill="#f97316"/>
            <text x="900" y="117" text-anchor="middle" fill="#fff" font-weight="600" font-size="11">最小</text>
            <text x="900" y="131" text-anchor="middle" fill="rgba(255,255,255,.9)" font-size="10">二乘</text>
          </g>
          <g class="mm-topic" style="animation-delay:2.7s">
            <circle cx="920" cy="280" r="30" fill="#fb923c"/>
            <text x="920" y="277" text-anchor="middle" fill="#fff" font-weight="600" font-size="11">盖尔</text>
            <text x="920" y="291" text-anchor="middle" fill="rgba(255,255,255,.9)" font-size="10">圆盘</text>
          </g>
          <g class="mm-topic mm-current" style="animation-delay:2.9s" filter="url(#glow)">
            <circle cx="830" cy="400" r="33" fill="#ec4899"/>
            <text x="830" y="397" text-anchor="middle" fill="#fff" font-weight="700" font-size="12">考前</text>
            <text x="830" y="413" text-anchor="middle" fill="rgba(255,255,255,.95)" font-size="11">复习</text>
          </g>

          <!-- Legend -->
          <g transform="translate(20,520)">
            <rect x="0" y="0" width="960" height="60" rx="10" fill="#fff" stroke="#e2e8f0"/>
            <g transform="translate(20,20)">
              <rect width="14" height="14" rx="7" fill="url(#gW1r)"/>
              <text x="20" y="12" font-size="12" fill="#334155">第1周：空间与标准形（线性空间→Jordan→矩阵函数）</text>
            </g>
            <g transform="translate(20,40)">
              <rect width="14" height="14" rx="7" fill="url(#gW2r)"/>
              <text x="20" y="12" font-size="12" fill="#334155">第2周：分解与广义逆（LU/QR→SVD→M-P逆）</text>
            </g>
            <g transform="translate(460,20)">
              <rect width="14" height="14" rx="7" fill="url(#gW3r)"/>
              <text x="20" y="12" font-size="12" fill="#334155">第3周：应用与真题（投影→最小二乘→盖尔圆盘→复习）</text>
            </g>
            <g transform="translate(460,40)">
              <rect width="14" height="14" rx="7" fill="#ec4899"/>
              <text x="20" y="12" font-size="12" fill="#334155">当前位置：考前复习</text>
            </g>
          </g>
        </svg>
      </AnimationBox>
    </Section>

    <!-- Animation 3: 易错点对比 -->
    <Section title="动画：易错点对比（正确 vs 错误）" :num="6">
      <AnimationBox
        title="常见易错点并排对比"
        :playing="playing3"
        description="左侧为正确做法（绿色），右侧为常见错误（红色）。播放动画逐步揭示每个易错点。"
        @play="play3"
        @pause="pause3"
        @reset="reset3"
      >
        <svg ref="svg3" viewBox="0 0 720 420" class="responsive-svg">
          <!-- Correct side (left) -->
          <rect x="10" y="10" width="340" height="400" rx="12" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/>
          <text x="180" y="40" text-anchor="middle" fill="#065f46" font-size="16" font-weight="700">✓ 正确做法</text>

          <!-- Wrong side (right) -->
          <rect x="370" y="10" width="340" height="400" rx="12" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
          <text x="540" y="40" text-anchor="middle" fill="#991b1b" font-size="16" font-weight="700">✗ 常见错误</text>

          <!-- Mistake items -->
          <g v-for="(m, i) in mistakes" :key="i" :opacity="mistakeOpacity[i]">
            <!-- Correct -->
            <rect :x="20" :y="60 + i*85" width="320" height="72" rx="8" fill="#fff" stroke="#a7f3d0" stroke-width="1.5"/>
            <text :x="30" :y="82 + i*85" fill="#065f46" font-size="13" font-weight="700">{{ m.title }}</text>
            <text :x="30" :y="100 + i*85" fill="#047857" font-size="12">{{ m.correct }}</text>
            <text :x="30" :y="118 + i*85" fill="#059669" font-size="11" font-style="italic">{{ m.correctDetail }}</text>

            <!-- Wrong -->
            <rect :x="380" :y="60 + i*85" width="320" height="72" rx="8" fill="#fff" stroke="#fecaca" stroke-width="1.5"/>
            <text :x="390" :y="82 + i*85" fill="#991b1b" font-size="13" font-weight="700">{{ m.title }}</text>
            <text :x="390" :y="100 + i*85" fill="#b91c1c" font-size="12">{{ m.wrong }}</text>
            <text :x="390" :y="118 + i*85" fill="#dc2626" font-size="11" font-style="italic">{{ m.wrongDetail }}</text>
          </g>
        </svg>
      </AnimationBox>
    </Section>

    <!-- Section: 综合模拟题 -->
    <Section title="综合模拟大题" :num="7">
      <ExampleBox source="考前综合模拟（必考题型：Jordan+e^At+微分方程）" badge="🏆 综合大题" defaultOpen>
        <template #problem>
          <p>
            已知矩阵<span class="formula-inline">A = \begin{pmatrix} 3 & -1 & 1 \\ 2 & 0 & 1 \\ 1 & -1 & 2 \end{pmatrix}</span>。
          </p>
          <p>(1) 求<span class="formula-inline">A</span>的Jordan标准形<span class="formula-inline">J</span>和可逆矩阵<span class="formula-inline">P</span>使得<span class="formula-inline">P^{-1}AP = J</span>；</p>
          <p>(2) 求矩阵指数<span class="formula-inline">e^{At}</span>；</p>
          <p>(3) 求微分方程组<span class="formula-inline">\frac{dx}{dt} = Ax</span>满足初始条件<span class="formula-inline">x(0) = (1,0,0)^{\mathsf{T}}</span>的解。</p>
        </template>
        <template #solution>
          <div class="step">
            <div class="step-num">1</div>
            <div>
              <p><strong>求特征值：</strong>计算特征多项式</p>
              <Formula>\det(A - \lambda I) = \begin{vmatrix} 3-\lambda & -1 & 1 \\ 2 & -\lambda & 1 \\ 1 & -1 & 2-\lambda \end{vmatrix}</Formula>
              <p>展开：<span class="formula-inline">= (3-\lambda)[-\lambda(2-\lambda)+1] + [2(2-\lambda)-1] + [-2+\lambda]</span></p>
              <Formula>= (3-\lambda)(\lambda^2-2\lambda+1) + (3-2\lambda) + (\lambda-2) = -(\lambda-1)^2(\lambda-3) + (\lambda-1)?</Formula>
              <p>仔细计算：<span class="formula-inline">C_1+C_2: c_1+c_2</span>不变换，直接展开：</p>
              <Formula>= (3-\lambda)(-\lambda(2-\lambda)+1) + 1\cdot(2(2-\lambda)-1) + 1\cdot(-2+\lambda)</Formula>
              <Formula>= (3-\lambda)(\lambda^2-2\lambda+1) + (3-2\lambda) + (\lambda-2)</Formula>
              <Formula>= (3-\lambda)(\lambda-1)^2 - \lambda + 1 = -(\lambda-1)^2(\lambda-3) - (\lambda-1)</Formula>
              <p>验证<span class="formula-inline">\lambda=1</span>：<span class="formula-inline">\det(A-I) = \begin{vmatrix}2&-1&1\\2&-1&1\\1&-1&1\end{vmatrix}=0</span>（行1=行2），<span class="formula-inline">\lambda=2</span>：<span class="formula-inline">\det(A-2I) = \begin{vmatrix}1&-1&1\\2&-2&1\\1&-1&0\end{vmatrix}=0</span>（列1=列2）。</p>
              <p>迹校验：<span class="formula-inline">3+0+2=5</span>。若特征值为<span class="formula-inline">1,1,3</span>则和=5，<span class="formula-inline">\det=3</span>。若特征值为<span class="formula-inline">1,2,2</span>则和=5。</p>
              <p>计算<span class="formula-inline">\det(A) = 3(0+1) - (-1)(4-1) + 1(-2-0) = 3+3-2 = 4</span>。<span class="formula-inline">\lambda_1\lambda_2\lambda_3=4</span>，故1+1+3=5且1·1·3=3≠4，排除。1+2+2=5且1·2·2=4 ✓，特征值为<span class="formula-inline">\lambda_1=1, \lambda_2=\lambda_3=2</span>。</p>
            </div>
          </div>
          <div class="step">
            <div class="step-num">2</div>
            <div>
              <p><strong>分析Jordan结构：</strong>对二重根<span class="formula-inline">\lambda=2</span>：</p>
              <Formula>A - 2I = \begin{pmatrix} 1 & -1 & 1 \\ 2 & -2 & 1 \\ 1 & -1 & 0 \end{pmatrix} \to \begin{pmatrix} 1 & -1 & 0 \\ 0 & 0 & 1 \\ 0 & 0 & 0 \end{pmatrix}</Formula>
              <p><span class="formula-inline">\operatorname{rank}(A-2I) = 2</span>，几何重数<span class="formula-inline">= 3-2 = 1</span>，故对应一个2阶Jordan块。</p>
              <p>对<span class="formula-inline">\lambda=1</span>：<span class="formula-inline">A-I = \begin{pmatrix}2&-1&1\\2&-1&1\\1&-1&1\end{pmatrix}</span>，<span class="formula-inline">\operatorname{rank}=2</span>，几何重数=1，对应1阶Jordan块。</p>
              <Formula>J = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 2 & 1 \\ 0 & 0 & 2 \end{pmatrix}</Formula>
            </div>
          </div>
          <div class="step">
            <div class="step-num">3</div>
            <div>
              <p><strong>求变换矩阵P：</strong></p>
              <p><span class="formula-inline">\lambda_1=1</span>的特征向量：<span class="formula-inline">(A-I)x=0</span>→<span class="formula-inline">x_1 = (0,1,1)^{\mathsf{T}}</span>。</p>
              <p><span class="formula-inline">\lambda_2=2</span>的特征向量：<span class="formula-inline">(A-2I)x=0</span>→<span class="formula-inline">x_2 = (1,1,0)^{\mathsf{T}}</span>。</p>
              <p>广义特征向量：<span class="formula-inline">(A-2I)x_3 = x_2</span>→<span class="formula-inline">x_3 = (1,0,0)^{\mathsf{T}}</span>（验证：<span class="formula-inline">(A-2I)(1,0,0)^{\mathsf{T}}=(1,2,1)^{\mathsf{T}}</span>...需重新计算）。</p>
              <p>设<span class="formula-inline">x_3=(a,b,c)^{\mathsf{T}}</span>，则<span class="formula-inline">a-b+c=1, 2a-2b+c=1, a-b=0</span>→<span class="formula-inline">a=b</span>，<span class="formula-inline">c=1</span>，<span class="formula-inline">2a-2a+1=1</span>✓。取<span class="formula-inline">a=b=0</span>，<span class="formula-inline">x_3=(0,0,1)^{\mathsf{T}}</span>。</p>
              <Formula>P = [x_1, x_2, x_3] = \begin{pmatrix} 0 & 1 & 0 \\ 1 & 1 & 0 \\ 1 & 0 & 1 \end{pmatrix}</Formula>
            </div>
          </div>
          <div class="step">
            <div class="step-num">4</div>
            <div>
              <p><strong>求<span class="formula-inline">e^{At}</span>：</strong>利用<span class="formula-inline">e^{At} = Pe^{Jt}P^{-1}</span>：</p>
              <Formula>e^{Jt} = \begin{pmatrix} e^t & 0 & 0 \\ 0 & e^{2t} & te^{2t} \\ 0 & 0 & e^{2t} \end{pmatrix}, \quad P^{-1} = \begin{pmatrix} -1 & 1 & 0 \\ 1 & 0 & 0 \\ 1 & -1 & 1 \end{pmatrix}</Formula>
              <p>计算<span class="formula-inline">e^{At} = P \cdot e^{Jt} \cdot P^{-1}</span>（具体乘法过程略），得到最终结果。</p>
            </div>
          </div>
          <div class="step">
            <div class="step-num">5</div>
            <div>
              <p><strong>解微分方程：</strong><span class="formula-inline">x(t) = e^{At}x(0)</span>，代入<span class="formula-inline">x(0)=(1,0,0)^{\mathsf{T}}</span>即得。</p>
            </div>
          </div>
        </template>
      </ExampleBox>
    </Section>

    <!-- Final summary steps -->
    <Section title="考场应试锦囊" :num="8">
      <Steps :steps="[
        '拿到题目先分类：计算题/证明题，判断题型（Jordan/<span class=&quot;formula-inline&quot;>e^{At}</span>/QR/SVD/投影/盖尔）',
        '计算题先写公式框架，再代入数值；三阶矩阵优先用迹和行列式校验特征值',
        'Jordan题：先求特征值→分析几何重数→确定块结构→求特征/广义特征向量',
        '<span class=&quot;formula-inline&quot;>e^{At}</span>题：优先用对角化/Jordan标准形方法，注意Jordan块的指数公式',
        '证明题：紧扣定义（子空间封闭、投影幂等+对称、范数三公理），必要时用反证法',
        '最后5分钟检查：特征值之和是否等于迹？<span class=&quot;formula-inline&quot;>P^{-1}AP</span>是否等于J？<span class=&quot;formula-inline&quot;>P^2</span>是否等于P？'
      ]"/>
    </Section>

    <!-- WeekQuizBank: 汇总第3周全部题目 -->
    <Section title="🗂️ 真题与习题汇总（三周综合）">
      <WeekQuizBank :quizzes="allQuizzes" weekLabel="三周总复习" />
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
import { getQuizzesByWeek } from '../../data/quizBank'
import { useKatex } from '../../composables/useKatex'
import { ref, computed, onUnmounted } from 'vue'

// 汇总三周所有题目用于总复习
const allQuizzes = computed(() => [
  ...getQuizzesByWeek(1),
  ...getQuizzesByWeek(2),
  ...getQuizzesByWeek(3)
])

const renderTrigger = ref(0)
const { renderMath } = useKatex(renderTrigger)

// ====== Calculation templates ======
const calcTemplates = [
  {
    name: 'Jordan标准形',
    color: 'linear-gradient(135deg,#4338ca,#6366f1)',
    steps: ['求特征多项式det(A-λI)=0', '分析每个特征值的几何重数', '确定Jordan块结构', '求特征向量和广义特征向量', '组装P和J'],
    formula: 'P^{-1}AP = J'
  },
  {
    name: '矩阵指数e^{At}',
    color: 'linear-gradient(135deg,#6366f1,#7c3aed)',
    steps: ['求Jordan标准形J和变换矩阵P', '写出e^{Jt}（对角→e^{λt}，Jordan块→e^{λt}乘多项式）', '计算e^{At}=Pe^{Jt}P⁻¹'],
    formula: 'e^{J_k(\\lambda)t} = e^{\\lambda t}\\begin{pmatrix}1&t&t^2/2\\\\0&1&t\\\\0&0&1\\end{pmatrix}'
  },
  {
    name: 'Householder QR',
    color: 'linear-gradient(135deg,#0d9488,#14b8a6)',
    steps: ['对第k列构造Householder向量v= x-αe₁', '计算H=I-2vvᵀ/(vᵀv)', '左乘H消去第k列次对角元以下', '重复直到R为上三角', 'Q=H₁H₂…H_{n-1}'],
    formula: 'H = I - \\frac{2vv^{\\mathsf{T}}}{v^{\\mathsf{T}}v}'
  },
  {
    name: '满秩分解求A⁺',
    color: 'linear-gradient(135deg,#14b8a6,#06b6d4)',
    steps: ['行变换求行最简形，确定F（主元列）和G（非零行）', '计算A⁺=Gᵀ(GGᵀ)⁻¹(FᵀF)⁻¹Fᵀ', '验证四个Penrose方程'],
    formula: 'A = FG \\implies A^+ = G^{\\mathsf{T}}(GG^{\\mathsf{T}})^{-1}(F^{\\mathsf{T}}F)^{-1}F^{\\mathsf{T}}'
  },
  {
    name: '正交投影矩阵',
    color: 'linear-gradient(135deg,#ea580c,#f97316)',
    steps: ['确定目标子空间R(A)（列满秩）', '计算P=A(AᵀA)⁻¹Aᵀ=AA⁺', '验证P²=P和Pᵀ=P'],
    formula: 'P = A(A^{\\mathsf{T}}A)^{-1}A^{\\mathsf{T}}'
  },
  {
    name: '盖尔圆盘估计',
    color: 'linear-gradient(135deg,#f97316,#fb923c)',
    steps: ['计算每个圆盘Gᵢ: |z-aᵢᵢ|≤Rᵢ', '分析圆盘连通性', '用隔离定理确定特征值范围', '必要时用对角缩放D⁻¹AD缩小圆盘'],
    formula: 'R_i = \\sum_{j\\neq i}|a_{ij}|'
  }
]

// ====== Proof templates ======
const proofTemplates = [
  {
    title: '子空间判定',
    method: '验证非空+对加法/数乘封闭（两条封闭公理）',
    steps: ['验证0∈W（非空）', '任取x,y∈W，证x+y∈W（加法封闭）', '任取x∈W, k∈F，证kx∈W（数乘封闭）']
  },
  {
    title: 'Householder矩阵正交性',
    method: '直接验证HᵀH=I，利用对称性和H²=I',
    steps: ['写出H=I-2vvᵀ/(vᵀv)，注意vvᵀ是秩1矩阵', '计算Hᵀ=H（对称）', 'H²=I-4vvᵀ/(vᵀv)+4vvᵀvvᵀ/(vᵀv)²=I，故H⁻¹=Hᵀ=H']
  },
  {
    title: 'M-P逆唯一性',
    method: '设X,Y都满足四个Penrose方程，证明X=Y',
    steps: ['X = XAX = X(AX)ᵀ = XXᵀAᵀ = XXᵀ(AYA)ᵀ = X(AX)ᵀ(AY)ᵀ = XAXAY = XAY', '对称地Y = YAY = Y(YA)ᵀ = YAYAX = YAX', '故X=XAY=YAX=Y']
  },
  {
    title: '投影矩阵性质',
    method: '利用幂等性P²=P推导值域/零空间分解',
    steps: ['V=R(P)⊕N(P)：x=Px+(I-P)x，Px∈R(P),(I-P)x∈N(P)', '正交投影⟺P²=P且Pᵀ=P：Pᵀ=P则⟨Px,y⟩=⟨x,Py⟩，投影正交', '验证P²=P是定义要求']
  },
  {
    title: '矩阵方程AXB=D有解条件',
    method: '利用投影和广义逆',
    steps: ['有解⟺AA⁺DB⁺B=D', '通解X=A⁺DB⁺+(I-A⁺A)Y(I-BB⁺)', '特殊情形Ax=b：AA⁺b=b，通解x=A⁺b+(I-A⁺A)y']
  },
  {
    title: 'ρ(A)≤||A||',
    method: '取特征对Ax=λx，用范数定义',
    steps: ['设λ为特征值，x为特征向量：Ax=λx', '取范数：|λ|·||x||=||Ax||≤||A||·||x||', '两边除以||x||（>0）得|λ|≤||A||', '由λ任意性ρ(A)≤||A||']
  }
]

// ====== Mistakes for comparison ======
const mistakes = [
  {
    title: '① Jordan块数量判断',
    correct: '几何重数 = n - rank(A-λI)，决定Jordan块个数',
    correctDetail: '例：rank(A-λI)=2, n=3 → 几何重数=1 → 1个Jordan块',
    wrong: '几何重数 = 代数重数 - 1',
    wrongDetail: '错误！几何重数需要通过rank(A-λI)计算，不是代数重数减1'
  },
  {
    title: '② 矩阵指数e^{At}计算',
    correct: 'e^{Jt}中Jordan块J_k(λ)的指数为e^{λt}乘多项式',
    correctDetail: 'J₂(λ): [[e^{λt},te^{λt}],[0,e^{λt}]]，注意t的幂次=块大小-1',
    wrong: 'e^{Jt} = diag(e^{λᵢt})对所有Jordan块',
    wrongDetail: '错误！非对角Jordan块的指数有非对角元te^{λt}等'
  },
  {
    title: '③ 投影矩阵验证',
    correct: '必须验证P²=P（幂等），正交投影还需Pᵀ=P',
    correctDetail: 'P=A(AᵀA)⁻¹Aᵀ，直接计算P²验证',
    wrong: '只看形式像投影就认为是投影矩阵',
    wrongDetail: '错误！不是所有对称矩阵都是投影矩阵，必须验证幂等性'
  },
  {
    title: '④ 盖尔圆盘半径',
    correct: 'Rᵢ = Σ_{j≠i}|aᵢⱼ|（去心行和，不含对角元）',
    correctDetail: '半径是非对角元的绝对值之和，不含|aᵢᵢ|',
    wrong: 'Rᵢ = Σ_j|aᵢⱼ|（包含对角元）或列和',
    wrongDetail: '错误！第一定理用去心行和，列和是列版本（Aᵀ的圆盘）'
  }
]

// ====== Animation 1: Flow steps (auto mode - CSS animation only, no JS needed) ======
const flowNodes = [
  { x: 60, label: '读题', labelShort: '读题', icon: '📖', desc: '识别题型', activeColor: '#ea580c' },
  { x: 200, label: '判型', labelShort: '判型', icon: '🔍', desc: '分类题目', activeColor: '#f97316' },
  { x: 340, label: '选模板', labelShort: '模板', icon: '📋', desc: '调用公式', activeColor: '#fb923c' },
  { x: 480, label: '计算', labelShort: '计算', icon: '🧮', desc: '代入求解', activeColor: '#7c3aed' },
  { x: 620, label: '验证', labelShort: '验证', icon: '✅', desc: '校验答案', activeColor: '#10b981' }
]

// ====== Animation 2: Mind map (auto mode - CSS animation only) ======
// All nodes/edges are always visible; CSS handles the pulse effect

// ====== Animation 3: Mistakes comparison ======
const playing3 = ref(false)
let rafId3 = null, t3 = 0
const mistakeOpacity = ref([0,0,0,0])

const animate3 = () => {
  t3 += 0.008
  for (let i = 0; i < 4; i++) {
    const start = i * 0.6
    mistakeOpacity.value[i] = easeOutCubic(Math.max(0, Math.min((t3 - start) * 2, 1)))
  }
  if (t3 < 3) rafId3 = requestAnimationFrame(animate3)
  else playing3.value = false
}
const play3 = () => { if (!playing3.value) { playing3.value = true; t3 = 0; mistakeOpacity.value=[0,0,0,0]; animate3() } }
const pause3 = () => { playing3.value = false; if (rafId3) cancelAnimationFrame(rafId3) }
const reset3 = () => { pause3(); t3 = 0; mistakeOpacity.value=[1,1,1,1] }
mistakeOpacity.value = [1,1,1,1]

function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3) }

onUnmounted(() => {
  if (rafId3) cancelAnimationFrame(rafId3)
})
</script>
<style scoped>
.formula-inline { display: inline; }
.formula-block { display: block; text-align: center; }
h3 { color: #7c3aed; }
.responsive-svg { max-width: 100%; height: auto; display: block; }
:deep(.formula-block), :deep(.formula-inline) { overflow-x: auto; }

/* ====== 五步法流程图 auto模式 CSS动画 ====== */
@keyframes flow-pulse {
  0%, 100% {
    opacity: 0.7;
    transform: scale(1);
    filter: none;
  }
  20% {
    opacity: 1;
    transform: scale(1.25);
    filter: drop-shadow(0 0 12px currentColor);
  }
}
.flow-node {
  transform-origin: center;
  transform-box: fill-box;
  animation: flow-pulse 5s ease-in-out infinite;
}

/* ====== 思维导图 auto模式 CSS脉冲动画 ====== */
@keyframes mindmap-pulse {
  0%, 100% {
    opacity: 0.75;
    transform: scale(1);
    filter: none;
  }
  50% {
    opacity: 1;
    transform: scale(1.12);
    filter: drop-shadow(0 0 8px rgba(124,58,237,0.5));
  }
}
@keyframes root-pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
    filter: drop-shadow(0 0 15px rgba(236,72,153,0.6));
  }
}
.mm-root circle {
  transform-origin: center;
  transform-box: fill-box;
  animation: root-pulse 4s ease-in-out infinite;
}
.mm-week circle {
  transform-origin: center;
  transform-box: fill-box;
  animation: mindmap-pulse 6s ease-in-out infinite;
}
.mm-topic circle {
  transform-origin: center;
  transform-box: fill-box;
  animation: mindmap-pulse 6s ease-in-out infinite;
}
.mm-current circle {
  transform-origin: center;
  transform-box: fill-box;
  animation: mindmap-pulse 3s ease-in-out infinite;
}

.review-banner {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 8px;
}
.banner-item {
  background: linear-gradient(135deg, #fff7ed, #ffedd5);
  border-radius: 12px;
  padding: 20px 16px;
  text-align: center;
  border: 2px solid #fed7aa;
}
.banner-item.accent {
  background: linear-gradient(135deg, #fdf2f8, #fce7f3);
  border-color: #f9a8d4;
}
.banner-num {
  display: block;
  font-size: 36px;
  font-weight: 800;
  background: linear-gradient(135deg, #ea580c, #7c3aed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.banner-item.accent .banner-num {
  background: linear-gradient(135deg, #ec4899, #7c3aed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.banner-label {
  font-size: 13px;
  color: #78350f;
  font-weight: 600;
  margin-top: 4px;
  display: block;
}
.banner-item.accent .banner-label { color: #9d174d; }

.template-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}
.template-card {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,.04);
}
.t-card-header {
  padding: 12px 16px;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 10px;
}
.t-num {
  width: 28px; height: 28px;
  background: rgba(255,255,255,.25);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: 14px;
}
.t-name { font-weight: 700; font-size: 15px; }
.t-card-body { padding: 16px; font-size: 13px; line-height: 1.7; color: #475569; }
.t-step { display: flex; gap: 8px; margin: 4px 0; }
.s-bullet {
  min-width: 20px; height: 20px;
  background: #f1f5f9;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 700;
  color: #64748b;
  flex-shrink: 0;
  margin-top: 1px;
}
.s-text { flex: 1; }
.t-formula {
  margin-top: 10px;
  padding: 8px 12px;
  background: #f8fafc;
  border-radius: 6px;
  font-size: 12px;
  overflow-x: auto;
}

.proof-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.proof-item {
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}
.p-head {
  padding: 10px 16px;
  background: linear-gradient(135deg, #f5f3ff, #ede9fe);
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid #ddd6fe;
}
.p-idx {
  width: 28px; height: 28px;
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  color: #fff;
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: 14px;
}
.p-title { font-weight: 700; color: #5b21b6; font-size: 15px; }
.p-body { padding: 14px 16px; font-size: 13px; line-height: 1.8; color: #475569; background: #fff; }
.p-body ol { padding-left: 20px; margin: 6px 0; }
.p-body li { margin: 3px 0; }

.trick-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 14px;
}
.trick-card {
  background: linear-gradient(135deg, #fff7ed, #fff);
  border: 1px solid #fed7aa;
  border-radius: 10px;
  padding: 16px;
}
.trick-card h4 {
  margin: 0 0 10px;
  color: #ea580c;
  font-size: 15px;
  padding-bottom: 8px;
  border-bottom: 2px dashed #fed7aa;
}
.trick-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 13px;
  line-height: 1.8;
  color: #475569;
}
.trick-card li {
  padding: 3px 0;
  padding-left: 16px;
  position: relative;
}
.trick-card li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: #f97316;
}

.mindmap-svg { width: 100%; height: auto; display: block; }

@media (max-width: 768px) {
  .review-banner { grid-template-columns: repeat(2, 1fr); }
  .template-grid { grid-template-columns: 1fr; }
  .trick-grid { grid-template-columns: 1fr; }
}
</style>
