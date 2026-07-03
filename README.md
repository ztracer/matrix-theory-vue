<img align="right" width="128" height="128" src="./public/matrix-full.png" alt="矩阵论图标" />

# 矩阵论可视化交互学习系统

> 面向研究生矩阵论课程的交互式教学网站，通过 SVG / Canvas / WebGL 动画直观呈现矩阵论的几何意义。

## 项目简介

矩阵论可视化交互学习系统采用 Vue 3 + Vite 技术栈，将抽象的矩阵论概念通过可视化动画进行呈现，帮助学习者从几何直观角度深入理解线性空间、线性变换、矩阵分解、广义逆等核心知识点。每个知识模块均配备交互动画、定理公式推导、真题详解和课后作业。

| 内容 | 数量 |
|------|------|
| 知识模块 | 11 个 |
| 交互动画 | 35+ 个（含 3D 可拖拽场景） |
| 真题例题 | 34 道（含详细解答） |
| 课后作业 | 62 道（教材习题精解） |

## 设计系统

项目采用 **Swiss Modernism 2.0** 设计语言，基于 slate 专业调色板：

- 色彩：`#0F172A` / `#F8FAFC` / `#334155` / `#0369A1` 语义 Token 体系
- 布局：CSS Grid 响应式 + Bento 卡片网格
- 动效：IntersectionObserver 滚动渐入 + stagger 延迟 + strong easing
- 暗色模式：`prefers-color-scheme` + 手动切换按钮

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue 3 | ^3.5 | 前端框架，Composition API + `<script setup>` |
| Vite | ^8.1 | 构建工具 |
| Vue Router | ^4.6 | Hash 路由，适配 GitHub Pages |
| KaTeX | ^0.17 | 数学公式渲染（按需懒加载） |
| js-yaml | ^4.1 | YAML 数据解析（构建时） |
| Three.js | ^0.185 | WebGL 3D 场景（Gram-Schmidt、投影可视化） |
| Vitest | ^3.x | 单元测试 |
| ESLint + Prettier | — | 代码规范与格式化 |

## 功能特性

- **11 个知识模块**：线性空间 → 考前复习，完整覆盖矩阵论课程
- **35+ 交互动画**：每个知识点配备可交互可视化演示，含 3 个 Three.js 3D 可拖拽场景
- **课程目录**：右侧 sticky TOC 自动追踪阅读位置，可折叠收纳
- **阅读进度**：滚动进度条 + localStorage 已读标记 + 首页卡片 ✓ 标识
- **键盘导航**：`←` `→` 翻课快捷键
- **知识图谱**：首页按小知识点展示前置依赖、推导路径和考试关联
- **暗色模式**：手动切换 + 跟随系统偏好，localStorage 持久化
- **真题例题详解**：34 道历年真题，独立汇总页按知识点分类检索
- **课后作业**：62 道教材习题精解，按章节分组、知识点标签
- **YAML 数据存储**：新增内容只需添加 YAML 文件，无需改代码
- **响应式设计**：桌面端 + 移动端，`clamp()` 流式排版 + 44px 触控底线
- **可访问性**：`prefers-reduced-motion`、skip-to-main、focus-visible、aria-expanded
- **4 周学习规划**：3 周课程内容 + 第 4 周课后作业与真题冲刺
- **CI/CD 自动部署**：推送到 `main` 即构建部署至 GitHub Pages

## 内容目录

### 第 1 周：空间变换与标准形

| 编号 | 知识点 | 核心内容 |
|------|--------|----------|
| 01 | 线性空间与线性子空间 | 8 条公理、子空间判定、基与维数、直和分解、维数公式 |
| 02 | 线性变换及其矩阵 | 矩阵表示、相似变换、核与像、秩-零化度定理、Householder 反射 |
| 03 | 对角化与 Jordan 标准形 | 特征值特征向量、代数/几何重数、Jordan 块与链、C-H 定理 |
| 04 | 矩阵函数与矩阵微分方程 | 矩阵幂级数收敛性、谱半径、对角化/Jordan块/旋转矩阵三种 e^At 计算入口 |

### 第 2 周：矩阵分解与广义逆

| 编号 | 知识点 | 核心内容 |
|------|--------|----------|
| 05 | 三角分解与 QR 分解 | LU 分解、QR 分解、Gram-Schmidt 3D 正交化、Householder 反射 |
| 06 | SVD 奇异值分解 | A=UΣV^T、SVD 几何意义（旋转-拉伸-旋转）、Frobenius 范数、低秩逼近 |
| 07 | 满秩分解与 MP 逆 | 满秩分解 A=FG、MP逆、Penrose方程、对角化/Jordan/SVD构造 |

### 第 3 周：应用专题与真题

| 编号 | 知识点 | 核心内容 |
|------|--------|----------|
| 08 | 投影矩阵与应用 | 投影矩阵 P²=P、正交投影 vs 斜投影、R³ 3D投影可视化 |
| 09 | 最小二乘与范数 | 正规方程、向量/矩阵范数、谱半径 |
| 10 | 特征值估计 | 盖尔圆盘定理、隔离定理、Rayleigh 商 |
| 11 | 考前复习 | 高频计算模板、证明模板、易错点对比 |

### 第 4 周：课后作业与真题冲刺

| 内容 | 路径 | 说明 |
|------|------|------|
| 课后作业 | `/homework` | 62 道教材习题精解，按章节分组 |
| 真题汇总 | `/exam` | 34 道历年真题，按知识点分类检索 |

## 项目结构

```
matrix-theory-vue/
├── .github/workflows/
│   └── deploy.yml                 # CI/CD 自动构建部署
├── public/
│   └── matrix-icon.png            # 项目图标 / favicon
├── src/
│   ├── __tests__/                 # 冒烟测试
│   │   ├── components.test.js
│   │   └── router.test.js
│   ├── assets/                    # 静态资源
│   ├── components/
│   │   ├── LessonLayout.vue       # 课程页面布局（含目录/进度/快捷键）
│   │   ├── quiz/                  # 题目相关组件
│   │   │   ├── QuizProblem.vue    # 题目卡片（展开/收起 + KaTeX）
│   │   │   └── WeekQuizBank.vue   # 周汇总题目列表
│   │   └── ui/                    # 通用 UI 组件
│   │       ├── AnimationBox.vue   # 动画容器（交互 / 自动）
│   │       ├── ExampleBox.vue     # 例题展示
│   │       ├── Formula.vue        # KaTeX 公式封装
│   │       ├── Section.vue        # 章节容器
│   │       ├── Steps.vue          # 步骤演示
│   │       └── Theorem.vue        # 定理展示
│   ├── composables/
│   │   ├── useKatex.js            # KaTeX 懒加载 + 渲染（去重后单一入口）
│   │   ├── useScrollReveal.js     # IntersectionObserver 滚动渐入
│   │   └── useTheme.js            # 暗色模式切换 + 持久化
│   ├── data/                      # 数据层（YAML）
│   │   ├── quizzes/               # 34 个 YAML (真题)
│   │   ├── homework/              # 62 个 YAML (课后作业)
│   │   ├── knowledgeGraph.js      # 首页知识图谱节点与依赖边
│   │   ├── quizBank.js            # 真题聚合器
│   │   └── homeworkBank.js        # 课后作业聚合器
│   ├── router/
│   │   └── index.js
│   ├── views/
│   │   ├── Home.vue               # 首页
│   │   ├── ExamBank.vue           # 真题汇总页
│   │   ├── Week4Homework.vue      # 课后作业页
│   │   ├── NotFound.vue           # 404 兜底页
│   │   └── lessons/               # 11 个课程页面
│   │       ├── 01_LinearSpace.vue
│   │       ├── ...
│   │       └── 11_Review.vue
│   ├── App.vue
│   ├── main.js
│   └── style.css                  # 全局样式 + CSS 变量 + 暗色模式
├── .eslintrc.cjs                  # ESLint 配置
├── .prettierrc                    # Prettier 配置
├── vitest.config.js               # Vitest 配置
├── package.json
├── vite.config.js
└── README.md
```

## 快速开始

### 环境要求

- Node.js >= 18
- npm >= 9

### 本地开发

```bash
npm install
npm run dev
```

访问 http://localhost:5173

### 脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 生产构建 |
| `npm run preview` | 预览生产构建 |
| `npm run test` | 运行冒烟测试（7 用例） |
| `npm run lint` | ESLint 代码检查 |
| `npm run lint:fix` | ESLint 自动修复 |
| `npm run format` | Prettier 格式化 |

## 如何新增内容

### 新增真题

在 `src/data/quizzes/` 下创建 `{id}.yaml`：

```yaml
id: "12-1"
source: "2026年期末真题"
lesson: 12
knowledge:
  - 线性空间
  - 子空间
problem: |
  题目内容（LaTeX 格式，直接书写数学公式，无需 $...$ 分隔符）
steps:
  - title: "步骤标题"
    content: |
      解答内容（LaTeX 格式）
```

文件放入后自动生效，无需修改任何代码。

### 新增课后作业

在 `src/data/homework/` 下创建 `hw-{id}.yaml`，格式同上，额外添加 `type: "homework"` 字段。

## 部署

推送到 `main` 分支即自动部署到 [https://ztracer.github.io/matrix-theory-vue/](https://ztracer.github.io/matrix-theory-vue/)。

## License

MIT
