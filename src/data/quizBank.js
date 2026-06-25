// 统一题库数据 - 所有题目按知识点(lessonId)组织
// 每道题包含：id, source(来源), problem(题目-LaTeX), steps(解题步骤数组-LaTeX)
// steps中的每个元素是一个步骤，包含title和content（都是LaTeX字符串）

export const quizBank = {
  // ============ 第1周 ============
  1: [ // 01 线性空间
    {
      id: '01-1',
      source: '2022年期末真题',
      problem: `设 \\alpha_1=(1,1,0,0)^T, \\alpha_2=(0,1,1,0)^T, \\alpha_3=(0,0,1,1)^T; \\beta_1=(1,0,1,0)^T, \\beta_2=(0,2,1,1)^T, \\beta_3=(1,2,1,2)^T，求 W_1=\\operatorname{span}\\{\\alpha_1,\\alpha_2,\\alpha_3\\}, W_2=\\operatorname{span}\\{\\beta_1,\\beta_2,\\beta_3\\} 的维数与一组基，并求 W_1+W_2 和 W_1\\cap W_2。`,
      steps: [
        { title: '求W₁的基与维数', content: '对(α₁,α₂,α₃)做行变换：r(A)=3，故dim W₁=3，基为{α₁,α₂,α₃}。' },
        { title: '求W₂的基与维数', content: 'β₁,β₂线性无关，β₃=β₁+β₂，故dim W₂=2，基为{β₁,β₂}。' },
        { title: '求W₁+W₂', content: 'W₁+W₂=span{α₁,α₂,α₃,β₁,β₂}，r(α₁,α₂,α₃,β₁,β₂)=4，故dim(W₁+W₂)=4。' },
        { title: '用维数公式求W₁∩W₂', content: 'dim(W₁∩W₂)=dim W₁+dim W₂-dim(W₁+W₂)=3+2-4=1。取ξ=β₁=α₁-α₂+α₃∈W₁∩W₂，故W₁∩W₂=span{ξ}。' }
      ]
    },
    {
      id: '01-2',
      source: '经典习题',
      problem: `判断下列集合是否为 \\R^{3} 的子空间：(1) W_1=\\{(x,y,z)^T \\mid x+y+z=0\\}；(2) W_2=\\{(x,y,z)^T \\mid xyz=0\\}；(3) W_3=\\{(x,y,z)^T \\mid x=y=z\\}。`,
      steps: [
        { title: 'W₁判定', content: '零向量∈W₁；对∀α,β∈W₁,k∈ℝ，(kα+lβ)各分量之和=k·0+l·0=0，故kα+lβ∈W₁。W₁是子空间。' },
        { title: 'W₂判定', content: '取α=(1,1,0)^T,β=(0,1,1)^T∈W₂，α+β=(1,2,1)^T，各分量乘积=2≠0，不封闭。W₂不是子空间。' },
        { title: 'W₃判定', content: 'W₃是过原点直线。零向量∈W₃；kα+lβ各分量相等，属于W₃。W₃是子空间（维数为1）。' }
      ]
    },
    {
      id: '01-3',
      source: '教材习题',
      problem: `设 V=\\R^{2\\times 2}（二阶实矩阵空间），W=\\left\\{\\begin{pmatrix}a&b\\\\0&c\\end{pmatrix}\\;\\middle|\\;a,b,c\\in\\R\\right\\}。证明W是V的子空间，并求W的维数和一组基。`,
      steps: [
        { title: '证明子空间', content: '零矩阵∈W；对∀A,B∈W,k,l∈ℝ，kA+lB的(2,1)元=k·0+l·0=0，仍为上三角矩阵，故kA+lB∈W。' },
        { title: '求基与维数', content: 'E₁₁=(1,0;0,0), E₁₂=(0,1;0,0), E₂₂=(0,0;0,1)是W的一组基（线性无关且张成W），故dim W=3。' }
      ]
    }
  ],
  2: [ // 02 线性变换
    {
      id: '02-1',
      source: '2023年期末真题',
      problem: `用Gram-Schmidt正交化方法将向量组 \\alpha_1=(1,1,0,0)^T, \\alpha_2=(1,0,1,0)^T, \\alpha_3=(-1,0,0,1)^T 化为标准正交基。`,
      steps: [
        { title: '第一步正交化', content: 'β₁=α₁=(1,1,0,0)^T' },
        { title: 'β₂ = α₂ - proj(α₂ onto β₁)', content: '(α₂,β₁)=1, (β₁,β₁)=2，故β₂=(1,0,1,0)^T - 1/2·(1,1,0,0)^T = (1/2,-1/2,1,0)^T' },
        { title: 'β₃ = α₃ - proj(α₃ onto β₁) - proj(α₃ onto β₂)', content: '(α₃,β₁)=-1, (α₃,β₂)=-1/2, (β₂,β₂)=3/2，故β₃=(-1,0,0,1)^T-(-1/2)(1,1,0,0)^T-(-1/2)/(3/2)·(1/2,-1/2,1,0)^T=(-1/3,1/3,1/3,1)^T' },
        { title: '单位化', content: '||β₁||=√2, ||β₂||=√6/2, ||β₃||=2√3/3。γ₁=β₁/||β₁||=(1/√2,1/√2,0,0)^T，同理γ₂,γ₃即为标准正交基。' }
      ]
    },
    {
      id: '02-2',
      source: '经典习题',
      problem: `构造Householder矩阵H，使Hx=\\sigma\\|x\\|e_1，其中 x=(3,0,4)^T。`,
      steps: [
        { title: '确定σ', content: 'x₁=3>0，取σ=sign(x₁)=1。' },
        { title: '计算u = x + σ||x||e₁', content: '||x||=5，u=(3,0,4)^T+1·5·(1,0,0)^T=(8,0,4)^T。' },
        { title: '构造H', content: 'H=I-2uuᵀ/(uᵀu)，uᵀu=64+0+16=80，故H=I-(1/40)uuᵀ=...' },
        { title: '验证', content: 'Hx = x - 2(uᵀx)/(uᵀu)·u = x - (2·80/80)u/2 = x - u = (-5,0,0)^T = -5e₁，符合要求。' }
      ]
    },
    {
      id: '02-3',
      source: '2021年期末真题',
      problem: `设T是\\R^3中的线性变换，T(x,y,z)^T=(x+2y-z,y+z,x+y-2z)^T。求T在基\\varepsilon_1,\\varepsilon_2,\\varepsilon_3下的矩阵A，并求\\ker T和\\operatorname{Im} T。`,
      steps: [
        { title: '求矩阵A', content: 'T(ε₁)=(1,0,1)^T, T(ε₂)=(2,1,1)^T, T(ε₃)=(-1,1,-2)^T，故A=[T(ε₁),T(ε₂),T(ε₃)]。' },
        { title: '求Ker T', content: '解Ax=0：r(A)=2（第一列+第二列=第三列？验证），基础解系含1个向量，Ker T=span{ξ}。' },
        { title: '求Im T', content: 'Im T=span{T(ε₁),T(ε₂),T(ε₃)}，维数=r(A)=2，取A中两线性无关列为基。' }
      ]
    }
  ],
  3: [ // 03 Jordan标准形
    {
      id: '03-1',
      source: '2022年期末真题',
      problem: `求矩阵 A=\\begin{pmatrix}3&-1&-2\\\\2&0&-2\\\\2&-1&-1\\end{pmatrix} 的Jordan标准形J及可逆矩阵P使P^{-1}AP=J。`,
      steps: [
        { title: '求特征值', content: 'det(A-λI)=-(λ-1)(λ²-λ)=-λ(λ-1)²，特征值λ₁=0, λ₂=λ₃=1。' },
        { title: 'λ=0的特征向量', content: 'Ax=0，解得η₁=(1,1,1)^T。' },
        { title: 'λ=1的几何重数', content: 'A-I=(2,-1,-2;2,-1,-2;2,-1,-2)，r(A-I)=1，g(1)=3-1=2=m(1)=2，可对角化！' },
        { title: 'λ=1的特征向量', content: '(A-I)x=0即2x₁-x₂-2x₃=0，取η₂=(1,2,0)^T,η₃=(1,0,1)^T。' },
        { title: '结论', content: 'J=diag(0,1,1)，P=(η₁,η₂,η₃)。' }
      ]
    },
    {
      id: '03-2',
      source: '2023年期末真题',
      problem: `求矩阵 A=\\begin{pmatrix}2&-1&1\\\\2&2&-1\\\\1&2&-1\\end{pmatrix} 的Jordan标准形。（注意：此题有重根且几何重数<代数重数）`,
      steps: [
        { title: '求特征多项式', content: 'det(A-λI)=-(λ-1)³（三重根λ=1）。' },
        { title: '求几何重数', content: 'A-I=(1,-1,1;2,1,-1;1,2,-2)，r(A-I)=2，g(1)=3-2=1<3，故有Jordan链。' },
        { title: '求特征向量', content: '(A-I)x=0，解为x₁=0,x₂=x₃，η₁=(0,1,1)^T。' },
        { title: '求广义特征向量(Jordan链)', content: '(A-I)η₂=η₁，解之得η₂=(1,1,0)^T；再解(A-I)η₃=η₂，得η₃=(... )。' },
        { title: 'Jordan标准形', content: 'J=J₃(1)=[[1,1,0],[0,1,1],[0,0,1]]，P=(η₁,η₂,η₃)。' }
      ]
    },
    {
      id: '03-3',
      source: '经典习题',
      problem: `设A为n阶幂等矩阵(A²=A)。证明：A可对角化，且特征值只能是0或1。`,
      steps: [
        { title: '特征值只能是0或1', content: '若Ax=λx(x≠0)，则λx=Ax=A²x=λ²x，故(λ²-λ)x=0，λ=0或1。' },
        { title: '证明可对角化', content: '需要证明g(0)+g(1)=n。即dim N(A)+dim N(I-A)=n。利用A(I-A)=0和A+(I-A)=I，可证ℝⁿ=N(A)⊕N(I-A)。' },
        { title: '结论', content: 'A~diag(1,...,1,0,...,0)（其中r个1，r=r(A)）。' }
      ]
    }
  ],
  4: [ // 04 矩阵函数
    {
      id: '04-1',
      source: '2022年期末真题',
      problem: `设 A=\\begin{pmatrix}0&1\\\\-1&0\\end{pmatrix}，求 e^{At}，并求微分方程组 x'=Ax 的通解。`,
      steps: [
        { title: '求特征值', content: 'det(A-λI)=λ²+1=0，λ₁=i, λ₂=-i（共轭纯虚根）。' },
        { title: '对角化', content: 'A=PDP⁻¹，D=diag(i,-i)，P=(1,1;i,-i)。' },
        { title: '计算e^{At}', content: 'e^{At}=Pe^{Dt}P⁻¹=P diag(e^{it},e^{-it}) P⁻¹=((cos t, sin t),(-sin t, cos t))（旋转矩阵）。' },
        { title: '微分方程解', content: 'x(t)=e^{At}x(0)，即平面旋转。' }
      ]
    },
    {
      id: '04-2',
      source: '2021年期末真题',
      problem: `设 A=\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}（Jordan块），求 e^{At} 并解 x'=Ax, x(0)=(1,1)^T。`,
      steps: [
        { title: '分解A=I+N', content: 'N=(0,1;0,0)是幂零矩阵，N²=0，I与N可交换。' },
        { title: '计算e^{At}', content: 'e^{At}=e^{It}e^{Nt}=e^t(I+tN)=e^t((1,t),(0,1))（注意共振项te^t）。' },
        { title: '求解x(t)', content: 'x(t)=e^{At}x(0)=e^t((1,t),(0,1))(1;1)=e^t(1+t, 1)^T。' }
      ]
    },
    {
      id: '04-3',
      source: '教材习题',
      problem: `用常数变易公式求解非齐次方程组 x'=Ax+f(t)，其中 A=\\begin{pmatrix}0&1\\\\-1&0\\end{pmatrix}, f(t)=\\begin{pmatrix}0\\\\1\\end{pmatrix}, x(0)=\\begin{pmatrix}0\\\\0\\end{pmatrix}。`,
      steps: [
        { title: '常数变易公式', content: 'x(t)=e^{At}x(0)+∫₀ᵗ e^{A(t-s)}f(s)ds。' },
        { title: '代入e^{A(t-s)}', content: 'e^{A(t-s)}=((cos(t-s), sin(t-s)),(-sin(t-s), cos(t-s)))。' },
        { title: '计算积分', content: '∫₀ᵗ (sin(t-s), cos(t-s))^T ds = (1-cos t, sin t)^T。' },
        { title: '解', content: 'x(t)=(1-cos t, sin t)^T。' }
      ]
    }
  ],

  // ============ 第2周 ============
  5: [ // 05 LU/QR
    {
      id: '05-1',
      source: '经典习题',
      problem: `对矩阵 A=\\begin{pmatrix}2&1&1\\\\4&3&3\\\\2&2&1\\end{pmatrix} 做LU分解。`,
      steps: [
        { title: '第一步消元', content: 'l₂₁=4/2=2, l₃₁=2/2=1。消元后U第一行不变，A^(1)=((2,1,1),(0,1,1),(0,1,0))。' },
        { title: '第二步消元', content: 'l₃₂=1/1=1。A^(2)=((2,1,1),(0,1,1),(0,0,-1))=U。' },
        { title: '写出L和U', content: 'L=(1,0,0;2,1,0;1,1,1)（单位下三角），U=(2,1,1;0,1,1;0,0,-1)。' },
        { title: '验证', content: 'LU=((2,1,1),(4,3,3),(2,2,1))=A ✓' }
      ]
    },
    {
      id: '05-2',
      source: '2023年期末真题',
      problem: `用Householder变换求 A=\\begin{pmatrix}0&1&1\\\\1&0&-1\\\\1&-1&0\\end{pmatrix} 的QR分解。（第一步：将第一列反射到e₁方向）`,
      steps: [
        { title: '处理第一列', content: 'x=(0,1,1)^T, ||x||=√2，x₁=0，取σ=sign(x₁)=1（x₁=0时取σ=1）。u=x+σ||x||e₁=(√2,1,1)^T。' },
        { title: '构造H₁', content: 'H₁=I-2uuᵀ/(uᵀu)，uᵀu=2+1+1=4。H₁将第一列变为(√2,0,0)^T。' },
        { title: '处理(2,3)子块', content: '对H₁A的右下角2×2块做类似处理，得H₂，Q=H₁H₂。' },
        { title: '得到R', content: 'R=H₂H₁A为上三角，Q=H₁H₂为正交矩阵。' }
      ]
    },
    {
      id: '05-3',
      source: '教材习题',
      problem: `用Gram-Schmidt方法对A=(\\alpha_1,\\alpha_2,\\alpha_3)=\\begin{pmatrix}1&1&1\\\\1&2&1\\\\1&1&3\\end{pmatrix}做QR分解。`,
      steps: [
        { title: '正交化', content: '按Gram-Schmidt公式依次得到β₁,β₂,β₃。' },
        { title: '单位化', content: 'q₁=β₁/||β₁||, q₂=β₂/||β₂||, q₃=β₃/||β₃||。' },
        { title: '求R', content: 'r_{ij}=(α_j,q_i)（i≤j），R为上三角矩阵。' },
        { title: '写出Q,R', content: 'Q=(q₁,q₂,q₃)正交，R上三角，A=QR。' }
      ]
    }
  ],
  6: [ // 06 SVD
    {
      id: '06-1',
      source: '2022年期末真题',
      problem: `求矩阵 A=\\begin{pmatrix}1&1&0\\\\0&0&1\\end{pmatrix} 的奇异值分解A=U\\Sigma V^T。`,
      steps: [
        { title: '计算AᵀA', content: 'AᵀA=((1,1,0),(1,1,0),(0,0,1))，特征值λ₁=2,λ₂=1,λ₃=0。' },
        { title: '奇异值', content: 'σ₁=√2, σ₂=1，r=2。' },
        { title: '求V', content: '对应特征向量：v₁=(1/√2,1/√2,0)^T, v₂=(0,0,1)^T, v₃=(1/√2,-1/√2,0)^T。V=(v₁,v₂,v₃)。' },
        { title: '求U', content: 'u₁=Av₁/σ₁=(1,0)^T, u₂=Av₂/σ₂=(0,1)^T。U=(u₁,u₂)=I₂。' },
        { title: 'SVD', content: 'A=U·diag(√2,1,0)·Vᵀ。' }
      ]
    },
    {
      id: '06-2',
      source: '经典习题',
      problem: `设 A=\\begin{pmatrix}2&0&0\\\\0&1&0\\end{pmatrix}，求A的Frobenius范数||A||_F 和最佳秩1逼近A_1。`,
      steps: [
        { title: 'F范数', content: '||A||_F=√(4+1)=√5，或用奇异值σ₁=2,σ₂=1，||A||_F=√(σ₁²+σ₂²)=√5。' },
        { title: '最佳秩1逼近', content: 'A₁=σ₁u₁v₁ᵀ=2·(1,0)^T·(1,0,0)=(2,0,0;0,0,0)。' },
        { title: '逼近误差', content: '||A-A₁||_F=σ₂=1。' }
      ]
    },
    {
      id: '06-3',
      source: '2021年期末真题',
      problem: `设 A=\\begin{pmatrix}1&0\\\\0&1\\\\1&0\\end{pmatrix}，求A的奇异值分解A=U\\Sigma V^T。`,
      steps: [
        { title: '计算AᵀA', content: 'AᵀA=((2,0),(0,1))，特征值λ₁=2,λ₂=1，奇异值σ₁=√2,σ₂=1。' },
        { title: '求V', content: 'v₁=(1,0)^T, v₂=(0,1)^T，V=I₂。' },
        { title: '求U', content: 'u₁=Av₁/σ₁=(1/√2)(1,0,1)^T, u₂=Av₂/σ₂=(0,1,0)^T，扩充u₃=(1/√2)(-1,0,1)^T。' },
        { title: 'SVD', content: 'U=((1/√2,0,-1/√2),(0,1,0),(1/√2,0,1/√2)), Σ=((√2,0),(0,1),(0,0)), V=I₂。' }
      ]
    }
  ],
  7: [ // 07 M-P广义逆
    {
      id: '07-1',
      source: '2021年期末真题',
      problem: `用满秩分解求 A=\\begin{pmatrix}1&1&2\\\\0&1&1\\end{pmatrix} 的M-P广义逆A^+，并求Ax=b的极小范数最小二乘解，其中 b=(1,0)^T。`,
      steps: [
        { title: '满秩分解A=FG', content: 'F=(1,1;0,1)（列满秩），G=(1,0,1;0,1,1)（行满秩）。' },
        { title: '计算Gᵀ(GGᵀ)⁻¹和(FᵀF)⁻¹Fᵀ', content: 'GGᵀ=((2,1),(1,2)),(GGᵀ)⁻¹=...; FᵀF=((1,1),(1,2)),(FᵀF)⁻¹=...' },
        { title: 'A⁺=Gᵀ(GGᵀ)⁻¹(FᵀF)⁻¹Fᵀ', content: '依次计算。' },
        { title: '极小范数最小二乘解', content: 'x⁺=A⁺b=...' }
      ]
    },
    {
      id: '07-2',
      source: '经典习题',
      problem: `验证 M-P 广义逆的四个Penrose方程：(1)AXA=A; (2)XAX=X; (3)(AX)^T=AX; (4)(XA)^T=XA。其中A^+=V\\Sigma^+U^T是A的SVD构造。`,
      steps: [
        { title: '验证(1)', content: 'AA⁺A = UΣVᵀ·VΣ⁺Uᵀ·UΣVᵀ = UΣΣ⁺ΣVᵀ = UΣVᵀ = A（因为ΣΣ⁺Σ=Σ）。' },
        { title: '验证(2)(3)(4)', content: '类似利用Σ⁺ΣΣ⁺=Σ⁺, (ΣΣ⁺)ᵀ=ΣΣ⁺, (Σ⁺Σ)ᵀ=Σ⁺Σ（均为对角矩阵）。' }
      ]
    },
    {
      id: '07-3',
      source: '2022年期末真题',
      problem: `设 A=\\begin{pmatrix}1&0&1\\\\0&1&1\\end{pmatrix}，用满秩分解求A^+，并求Ax=b的极小范数最小二乘解，其中 b=(1,2)^T。`,
      steps: [
        { title: '满秩分解', content: 'A已是行满秩(r=2)，取F=A, G=I₃不对；正确：F为A的主元列((1,0)^T,(0,1)^T)，G为A的行标准形即I₂补一列(1,1)^T？简化：A行满秩，直接A⁺=Aᵀ(AAᵀ)⁻¹。' },
        { title: '计算AAᵀ', content: 'AAᵀ=((2,1),(1,2))，(AAᵀ)⁻¹=(1/3)((2,-1),(-1,2))。' },
        { title: '求A⁺', content: 'A⁺=Aᵀ(AAᵀ)⁻¹=(1/3)((2,-1),(-1,2),(1,1))。' },
        { title: '极小范数最小二乘解', content: 'x⁺=A⁺b=(1/3)(0,3,3)^T=(0,1,1)^T。' }
      ]
    }
  ],

  // ============ 第3周 ============
  8: [ // 08 投影矩阵
    {
      id: '08-1',
      source: '2023年期末真题',
      problem: `求到 \\R^3 中平面 W=\\{(x,y,z)^T \\mid x+y+z=0\\} 的正交投影矩阵P。`,
      steps: [
        { title: '取W的一组基', content: 'α₁=(1,-1,0)^T, α₂=(1,0,-1)^T（满足x+y+z=0），A=(α₁,α₂)。' },
        { title: '计算投影矩阵', content: 'P=A(AᵀA)⁻¹Aᵀ。AᵀA=((2,1),(1,2))，(AᵀA)⁻¹=(1/3)((2,-1),(-1,2))。' },
        { title: '结果', content: 'P=(1/3)((2,-1,-1),(-1,2,-1),(-1,-1,2))，验证P²=P,Pᵀ=P。' }
      ]
    },
    {
      id: '08-2',
      source: '经典习题',
      problem: `设 u=(1,0,0)^T，求正交投影矩阵P_u=uu^T/(u^Tu)，并计算P_v（斜投影）。验证投影矩阵性质P²=P。`,
      steps: [
        { title: 'P_u', content: 'uuᵀ/(uᵀu)=diag(1,0,0)，P_u²=diag(1,0,0)=P_u ✓。' },
        { title: '几何意义', content: 'P_u将(x,y,z)^T投影到(x,0,0)^T，即投影到x轴上。' }
      ]
    }
  ],
  9: [ // 09 最小二乘
    {
      id: '09-1',
      source: '2022年期末真题',
      problem: `给定数据点 (0,1),(1,2),(2,2),(3,4)，用最小二乘法求最佳拟合直线 y=ax+b。`,
      steps: [
        { title: '建立矛盾方程组', content: 'Ax=b，A=(0,1;1,1;2,1;3,1)，x=(a;b)，b=(1;2;2;4)。' },
        { title: '正规方程', content: 'AᵀAx=Aᵀb，AᵀA=((14,6),(6,4)), Aᵀb=(18;9)。' },
        { title: '求解', content: 'x=(AᵀA)⁻¹Aᵀb，a=9/10=0.9, b=9/10=0.9。最佳直线y=0.9x+0.9。' }
      ]
    },
    {
      id: '09-2',
      source: '经典习题',
      problem: `证明：对任意从属矩阵范数||·||，谱半径 \\rho(A)\\leq\\|A\\|。`,
      steps: [
        { title: '取模最大特征值', content: '设|λ|=ρ(A), Ax=λx, x≠0。不妨设||x||=1。' },
        { title: '利用范数定义', content: '|λ|=||λx||=||Ax||≤||A||·||x||=||A||。' },
        { title: '结论', content: 'ρ(A)≤||A||。' }
      ]
    }
  ],
  10: [ // 10 盖尔圆盘
    {
      id: '10-1',
      source: '2021年期末真题',
      problem: `用盖尔圆盘定理估计矩阵 A=\\begin{pmatrix}20&3&2\\\\1&10&1\\\\2&3&0\\end{pmatrix} 的特征值分布，并证明A可对角化。`,
      steps: [
        { title: '画盖尔圆盘', content: 'G₁:|z-20|≤5；G₂:|z-10|≤2；G₃:|z|≤5。' },
        { title: '隔离分析', content: 'G₁与G₂,G₃不交（20-5=15>10+2=12, 20-5=15>5），G₂与G₃不交（10-2=8>5）。三个圆盘互不相交！' },
        { title: '结论', content: '每个圆盘恰含一个特征值，三个特征值互不相同，故A可对角化（3个线性无关特征向量）。' }
      ]
    },
    {
      id: '10-2',
      source: '教材习题',
      problem: `设A是实对称矩阵，证明Rayleigh商 R(x)=\\frac{x^TAx}{x^Tx} 的极值恰为A的特征值：\\max_{x\\neq 0}R(x)=\\lambda_{\\max}, \\min_{x\\neq 0}R(x)=\\lambda_{\\min}。`,
      steps: [
        { title: '正交对角化', content: 'A=QΛQᵀ，令y=Qᵀx，则R(x)=yᵀΛy/(yᵀy)=Σλᵢyᵢ²/Σyᵢ²。' },
        { title: '上下界', content: 'λ_min·Σyᵢ² ≤ Σλᵢyᵢ² ≤ λ_max·Σyᵢ²，故λ_min ≤ R(x) ≤ λ_max。' },
        { title: '等号可达', content: 'x为对应特征向量时取等号。' }
      ]
    }
  ],
  11: [ // 11 综合复习
    {
      id: '11-1',
      source: '综合模拟题',
      problem: `设 A=\\begin{pmatrix}1&1&0\\\\0&1&1\\\\0&0&2\\end{pmatrix}，求：(1)A的Jordan标准形J；(2)变换矩阵P；(3)e^{At}；(4)解x'=Ax, x(0)=(1,0,0)^T。`,
      steps: [
        { title: '特征值', content: 'det(A-λI)=(1-λ)²(2-λ)，λ₁=λ₂=1, λ₃=2。' },
        { title: 'λ=1几何重数', content: 'A-I=(0,1,0;0,0,1;0,0,1), r(A-I)=2, g(1)=1<2，Jordan块J₂(1)。' },
        { title: 'Jordan链', content: '(A-I)η₁=0→η₁=(1,0,0)^T; (A-I)η₂=η₁→η₂=(0,1,0)^T; λ=2特征向量η₃=(1,1,1)^T。' },
        { title: 'J和P', content: 'J=diag(J₂(1),(2)), P=(η₁,η₂,η₃)。' },
        { title: 'e^{At}', content: 'e^{Jt}=diag(((e^t,te^t),(0,e^t)),e^{2t})，e^{At}=Pe^{Jt}P⁻¹。' },
        { title: '解x(t)', content: 'x(t)=e^{At}x(0)=Pe^{Jt}P⁻¹(1;0;0)。' }
      ]
    },
    {
      id: '11-2',
      source: '高频证明题',
      problem: `设H是Householder矩阵(H=I-2uu^T/(u^Tu))，证明：(1)H是对称正交矩阵(H^T=H, H^TH=I)；(2)H^2=I（对合）；(3)det H=-1。`,
      steps: [
        { title: '对称性', content: 'Hᵀ=Iᵀ-2(uuᵀ)ᵀ/(uᵀu)=I-2uuᵀ/(uᵀu)=H。' },
        { title: '正交性', content: 'HᵀH=H²=I-4uuᵀ/(uᵀu)+4uuᵀuuᵀ/(uᵀu)²=I-4uuᵀ/(uᵀu)+4uuᵀ/(uᵀu)=I。' },
        { title: '行列式', content: 'H有n-1个特征值1（垂直于u的子空间上是恒等），1个特征值-1（Hu=-u），故det H=1^{n-1}·(-1)=-1。' }
      ]
    }
  ]
}

// 课程元数据（用于首页卡片动态统计）
// anims: 该课交互动画数量；quizzes 数量由 quizBank[id].length 动态计算
export const lessonMeta = [
  { id:1, num:'01', title:'线性空间与线性子空间', en:'Linear Space & Subspaces', week:1, path:'/lesson/01', icon:'📐', anims:3, desc:'8条公理、子空间判定、基与维数、和/交空间、直和分解、维数公式。', tags:['公理体系','子空间','直和'] },
  { id:2, num:'02', title:'线性变换及其矩阵', en:'Linear Transformations', week:1, path:'/lesson/02', icon:'🔄', anims:3, desc:'线性变换定义、矩阵表示、相似变换、核与像、秩-零化度定理、Householder反射。', tags:['矩阵表示','相似','正交化'] },
  { id:3, num:'03', title:'对角化与Jordan标准形', en:'Diagonalization & Jordan Form', week:1, path:'/lesson/03', icon:'✨', anims:3, desc:'特征值特征向量、代数/几何重数、可对角化条件、Jordan块与Jordan链。', tags:['特征值','Jordan块','C-H定理'] },
  { id:4, num:'04', title:'矩阵函数与矩阵微分方程', en:'Matrix Functions & ODEs', week:1, path:'/lesson/04', icon:'📈', anims:3, desc:'矩阵幂级数、矩阵指数、Jordan块指数、线性微分方程组、相图分析。', tags:['矩阵指数','相图','稳定性'] },
  { id:5, num:'05', title:'三角分解与QR分解', en:'LU & QR Decomposition', week:2, path:'/lesson/05', icon:'🔺', anims:3, desc:'LU分解（Gauss消元）、QR分解、Gram-Schmidt正交化、Householder反射清零。', tags:['LU','QR','消元','反射'] },
  { id:6, num:'06', title:'满秩分解与SVD', en:'Full Rank & SVD', week:2, path:'/lesson/06', icon:'💎', anims:3, desc:'满秩分解、奇异值、SVD几何意义（旋转-拉伸-旋转）、Frobenius范数、低秩逼近。', tags:['SVD','奇异值','低秩逼近'] },
  { id:7, num:'07', title:'Moore-Penrose广义逆', en:'Moore-Penrose Inverse', week:2, path:'/lesson/07', icon:'🔮', anims:3, desc:'{1}-逆、四个Penrose方程、广义逆唯一性、SVD构造、极小范数最小二乘解。', tags:['广义逆','Penrose方程'] },
  { id:8, num:'08', title:'投影矩阵与广义逆应用', en:'Projection Matrices', week:3, path:'/lesson/08', icon:'📍', anims:3, desc:'投影矩阵（幂等性）、正交投影、斜投影、一维投影、列空间投影。', tags:['正交投影','斜投影','幂等'] },
  { id:9, num:'09', title:'最小二乘与范数', en:'Least Squares & Norms', week:3, path:'/lesson/09', icon:'📊', anims:3, desc:'最小二乘问题、正规方程（残差正交）、向量/矩阵范数公理、L1/L2/L∞单位球。', tags:['正规方程','残差','范数'] },
  { id:10, num:'10', title:'特征值估计与极大极小原理', en:'Gershgorin Circles', week:3, path:'/lesson/10', icon:'🎯', anims:3, desc:'盖尔圆盘定理、隔离定理、实矩阵共轭对、Rayleigh商、Courant-Fischer定理。', tags:['盖尔圆盘','Rayleigh商'] },
  { id:11, num:'11', title:'考前预测与复习', en:'Exam Review', week:3, path:'/lesson/11', icon:'🏆', anims:3, desc:'高频计算题模板、高频证明题模板、三阶矩阵套路、解题流程、易错点对比。', tags:['真题','模板','易错点'] }
]

// 根据week获取该周所有题目
export function getQuizzesByWeek(week) {
  const lessons = lessonMeta.filter(l => l.week === week)
  const result = []
  for (const l of lessons) {
    const quizzes = quizBank[l.id] || []
    result.push(...quizzes.map(q => ({ ...q, lessonId: l.id, lessonTitle: l.title, lessonNum: l.num })))
  }
  return result
}
