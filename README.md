# 矩阵论可视化交互学习系统

> 通过 Vue 驱动的 SVG/Canvas 动画，直观理解矩阵论的几何意义与代数本质。

## 项目简介

矩阵论可视化交互学习系统是一个面向研究生矩阵论课程的交互式教学网站。项目采用 Vue 3 + Vite 技术栈重构，将抽象的矩阵论概念通过 SVG/Canvas 动画进行可视化呈现，帮助学习者从几何直观角度深入理解线性空间、线性变换、矩阵分解、广义逆等核心知识点。每个知识模块均配备交互动画演示、定理公式推导和真题例题详解，实现"概念-动画-定理-真题"的闭环学习体验。

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue 3 | ^3.5 | 前端框架，采用 Composition API + `<script setup>` |
| Vite | ^8.1 | 下一代前端构建工具，提供极速开发体验 |
| Vue Router | ^4.6 | 前端路由，采用 Hash 模式适配 GitHub Pages |
| KaTeX | ^0.17 | 高速数学公式渲染引擎 |
| SVG/Canvas | - | 原生矢量图形与画布动画，无第三方动画库依赖 |

## 功能特性

- **11个核心知识模块**：覆盖线性空间到考前复习的完整知识体系
- **33+交互动画**：每个知识点配备3个以上可交互的可视化动画
- **真题例题详解**：精选考试真题，配合动画步骤逐步拆解；独立真题汇总页按知识点分类
- **响应式设计**：适配桌面端与移动端，随时随地学习
- **知识体系架构图**：SVG 交互式知识地图，清晰展示章节依赖关系
- **推荐学习路径**：从基础到应用的11步渐进式学习路线
- **3周复习规划**：按周划分学习阶段，科学安排复习节奏
- **KaTeX 公式渲染**：高速、无闪的数学公式排版
- **Hash 路由**：无需服务端配置，完美适配 GitHub Pages 静态托管
- **CI/CD 自动部署**：推送到 main 分支自动构建并部署到 GitHub Pages

## 知识点目录

本项目涵盖矩阵论 11 个核心知识点，分为三大学习阶段：

### 第1周：空间变换与标准形（基础理论）

| 编号 | 知识点 | 英文 | 核心内容 |
|------|--------|------|----------|
| 01 | 线性空间与线性子空间 | Linear Space & Subspaces | 8条公理、子空间判定、基与维数、直和分解、维数公式 |
| 02 | 线性变换及其矩阵 | Linear Transformations | 矩阵表示、相似变换、核与像、秩-零化度定理、Householder反射 |
| 03 | 对角化与Jordan标准形 | Diagonalization & Jordan Form | 特征值特征向量、代数/几何重数、Jordan块与Jordan链、C-H定理 |
| 04 | 矩阵函数与矩阵微分方程 | Matrix Functions & ODEs | 矩阵幂级数、矩阵指数 e^At、相图分析、线性微分方程组求解 |

### 第2周：矩阵分解与广义逆（核心工具）

| 编号 | 知识点 | 英文 | 核心内容 |
|------|--------|------|----------|
| 05 | 三角分解与QR分解 | LU & QR Decomposition | LU分解（Gauss消元）、QR分解、Gram-Schmidt正交化、Householder反射 |
| 06 | 满秩分解与SVD | Full Rank & SVD | 满秩分解 A=FG、奇异值分解 A=UΣV^T、几何意义、最佳低秩逼近 |
| 07 | Moore-Penrose广义逆 | Moore-Penrose Inverse | {1}-逆、四个Penrose方程、A+的SVD构造、极小范数最小二乘解 |

### 第3周：应用专题与真题（综合应用）

| 编号 | 知识点 | 英文 | 核心内容 |
|------|--------|------|----------|
| 08 | 投影矩阵与广义逆应用 | Projection Matrices | 投影矩阵 P²=P、正交投影vs斜投影、列空间投影 |
| 09 | 最小二乘与范数 | Least Squares & Norms | 最小二乘问题 min‖Ax-b‖²、正规方程、向量/矩阵范数、谱半径 |
| 10 | 特征值估计与极大极小原理 | Gershgorin Circles | 盖尔圆盘定理、隔离定理、Rayleigh商、Courant-Fischer定理 |
| 11 | 考前预测与复习 | Exam Review | 高频计算/证明模板、三阶矩阵解题套路、易错点对比总结 |

## 项目结构

```
matrix-theory-vue/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD 部署配置
├── .vscode/
│   └── extensions.json         # VS Code 推荐扩展
├── public/
│   ├── favicon.svg             # 网站图标
│   └── icons.svg               # 图标资源
├── src/
│   ├── assets/                 # 静态资源（图片等）
│   │   ├── hero.png
│   │   ├── vite.svg
│   │   └── vue.svg
│   ├── components/
│   │   ├── ui/                 # 通用UI组件
│   │   │   ├── AnimationBox.vue    # 动画容器组件
│   │   │   ├── ExampleBox.vue      # 例题展示组件
│   │   │   ├── Formula.vue         # 公式渲染组件（KaTeX封装）
│   │   │   ├── Section.vue         # 章节容器组件
│   │   │   ├── Steps.vue           # 步骤演示组件
│   │   │   └── Theorem.vue         # 定理展示组件
│   │   ├── HelloWorld.vue
│   │   └── LessonLayout.vue        # 课程页面统一布局组件
│   ├── composables/
│   │   └── useKatex.js             # KaTeX 公式渲染组合式函数
│   ├── router/
│   │   └── index.js                # Vue Router 路由配置
│   ├── views/
│   │   ├── Home.vue                # 首页（知识地图+课程目录）
│   │   ├── ExamBank.vue            # 真题汇总页（按知识点分类）
│   │   └── lessons/                # 11个课程页面
│   │       ├── 01_LinearSpace.vue
│   │       ├── 02_LinearTransform.vue
│   │       ├── 03_Jordan.vue
│   │       ├── 04_MatrixFunction.vue
│   │       ├── 05_LUQR.vue
│   │       ├── 06_SVD.vue
│   │       ├── 07_MoorePenrose.vue
│   │       ├── 08_Projection.vue
│   │       ├── 09_LeastSquares.vue
│   │       ├── 10_Gershgorin.vue
│   │       └── 11_Review.vue
│   ├── App.vue                     # 根组件
│   ├── main.js                     # 应用入口
│   └── style.css                   # 全局样式
├── .gitignore                      # Git 忽略配置
├── index.html                      # HTML 入口模板
├── package.json                    # 项目依赖与脚本
├── package-lock.json               # 依赖版本锁定
├── vite.config.js                  # Vite 构建配置（含 GitHub Pages base 适配）
└── README.md                       # 项目说明文档
```

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0（或 pnpm / yarn）

### 安装依赖

```bash
npm install
```

### 本地开发

启动本地开发服务器，支持热模块替换（HMR）：

```bash
npm run dev
```

启动后在浏览器中访问 [http://localhost:5173](http://localhost:5173) 即可预览。

### 构建生产版本

构建产物将输出到 `dist/` 目录：

```bash
npm run build
```

### 预览构建结果

在本地预览生产构建产物（用于验证部署效果）：

```bash
npm run preview
```

预览服务器默认运行在 [http://localhost:4173](http://localhost:4173)。

## 部署到 GitHub Pages

本项目已配置 GitHub Actions 自动部署工作流，推送到 `main` 分支即可自动构建并部署。

### 自动部署步骤（推荐）

1. **在 GitHub 上创建仓库**：仓库名建议为 `matrix-theory-vue`（如果使用其他仓库名，`vite.config.js` 会自动通过 `GITHUB_REPOSITORY` 环境变量适配 base 路径）。

2. **推送代码到 GitHub**：
   ```bash
   git remote add origin https://github.com/ztracer/matrix-theory-vue.git
   git push -u origin main
   ```

3. **启用 GitHub Pages**：
   - 进入仓库页面 → Settings → Pages
   - 在 "Build and deployment" → "Source" 中选择 **GitHub Actions**
   - 保存设置（或在 workflow 中使用 `enablement: true` 参数自动启用）

4. **触发部署**：推送代码到 `main` 分支后，GitHub Actions 将自动执行以下流程：
   - 检出代码 → 安装 Node.js → 安装依赖 → 构建项目 → 部署到 GitHub Pages
   - 部署完成后，可访问 [https://ztracer.github.io/matrix-theory-vue/](https://ztracer.github.io/matrix-theory-vue/)

5. **查看部署状态**：在仓库的 [Actions](https://github.com/ztracer/matrix-theory-vue/actions) 标签页可查看工作流运行状态和日志。

### 手动部署（备选）

如果需要手动构建并部署到 `gh-pages` 分支：

```bash
# 构建（指定仓库名作为 base 路径）
GITHUB_REPOSITORY="ztracer/matrix-theory-vue" npm run build

# 使用 peaceiris/actions-gh-pages 或手动 push dist 目录到 gh-pages 分支
# 例如使用 gh-pages 工具：
# npx gh-pages -d dist
```

### 本地开发与部署的 base 路径说明

`vite.config.js` 中配置了条件 base 路径：
- **本地开发**（`npm run dev`）：base 为 `/`，资源路径正常工作
- **本地构建**（`npm run build` 无 GITHUB_REPOSITORY）：base 为 `/`，适合部署到根域名
- **CI 构建**（GitHub Actions 中）：自动读取 `GITHUB_REPOSITORY` 环境变量，base 设为 `/<repo-name>/`，适配 GitHub Pages 子路径

同时，路由使用 `createWebHashHistory`（Hash 模式），URL 中包含 `#`，无需服务端配置路由回退，完美适配静态托管环境。

## 技术特点说明

### Vue 3 Composition API

项目全面采用 Vue 3 的 Composition API（`<script setup>` 语法），相比 Options API 具有以下优势：
- 更好的逻辑复用与代码组织（通过 composables 抽取公共逻辑）
- 更优的 TypeScript 类型推导支持
- 更轻量的编译输出（模板直接引用 setup 作用域变量）
- `useKatex.js` 是一个典型的组合式函数封装示例

### KaTeX 公式渲染

使用 KaTeX 作为数学公式渲染引擎：
- **高速渲染**：KaTeX 是目前最快的 Web 数学公式渲染库，同步渲染无闪烁
- **无外部依赖**：自包含 CSS 和字体，不需要额外字体服务
- **封装为组件**：通过 `<Formula>` 组件和 `useKatex` composable 统一调用
- 支持行内公式和块级公式，覆盖矩阵论中所有公式类型

### SVG/Canvas 动画

可视化动画优先使用 SVG 实现，必要时辅以 Canvas：
- **SVG 优势**：矢量图形无损缩放、天然支持 DOM 事件绑定、可通过 CSS/Vue 响应式驱动、SEO 友好
- **Canvas 适用场景**：粒子效果、大量数据点绘制等高性能需求场景
- **无第三方动画库**：使用原生 SVG + CSS transition/animation + Vue 响应式系统实现，减少包体积
- 典型动画包括：线性变换的几何效果、SVD 旋转-拉伸-旋转过程、Gershgorin 圆盘、投影过程等

### 响应式设计

- 使用 CSS Grid + Flexbox 布局，通过 `clamp()` 实现流式排版
- 移动端单列布局，桌面端多列卡片网格
- 知识地图 SVG 使用 viewBox 自适应缩放
- 关键断点：768px（平板/手机分界）

### 路由设计

- 使用 `createWebHashHistory`（Hash 模式）：URL 形如 `/#/lesson/01`
- 优势：刷新页面不返回 404，无需服务器配置 rewrite 规则
- 课程页面使用懒加载（`() => import(...)`），按需加载减小首屏体积
- 自动滚动到顶部（`scrollBehavior`），提供良好的页面切换体验

## 开发指南

### 新增课程页面

在 `src/views/lessons/` 目录下创建新的 `XX_TopicName.vue` 文件，并在 `src/router/index.js` 中添加对应路由配置。课程页面可复用 `LessonLayout.vue` 和 `components/ui/` 下的通用组件来保持风格统一。

### 新增动画组件

动画组件建议放置在对应课程页面中或抽取为独立组件，放入 `src/components/` 目录。使用 SVG 时注意设置合适的 viewBox，并确保动画可以通过 props 控制播放状态。

### 公式使用

在模板中使用 `<Formula>` 组件渲染数学公式，或在脚本中通过 `useKatex()` 组合式函数直接渲染到 DOM 元素。

## 浏览器支持

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## License

MIT
