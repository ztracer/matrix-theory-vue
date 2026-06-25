// 题目数据聚合器 — 从 quizzes/ 目录加载所有 YAML 文件
// 新增题目只需在 quizzes/ 下创建 .yaml 文件即可，无需改动此文件

import { load } from 'js-yaml'

// Vite import.meta.glob: 构建时扫描目录，返回 { path: content } 映射
// eager:true = 同步加载所有文件（构建时完成，运行时零延迟）
// query:'?raw' + import:'default' = 以原始字符串形式导入
const yamlSources = import.meta.glob('./quizzes/*.yaml', {
  eager: true,
  query: '?raw',
  import: 'default'
})

// 跳过 schema.yaml（仅用于文档/校验，不含题目数据）
const allQuizzes = Object.entries(yamlSources)
  .filter(([path]) => !path.includes('schema.yaml'))
  .map(([, content]) => {
    const quiz = load(content)
    return quiz
  })

// 导出 quizBank（按 lesson ID 分组，保持与旧 API 兼容）
export const quizBank = {}
for (const quiz of allQuizzes) {
  const key = quiz.lesson || parseInt(quiz.id.split('-')[0])
  if (!quizBank[key]) quizBank[key] = []
  quizBank[key].push(quiz)
}

// 每组内部按 id 排序
for (const key of Object.keys(quizBank)) {
  quizBank[key].sort((a, b) => a.id.localeCompare(b.id))
}

// 课程元数据
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

// 按周获取题目
export function getQuizzesByWeek(week) {
  const lessons = lessonMeta.filter(l => l.week === week)
  const result = []
  for (const l of lessons) {
    const quizzes = quizBank[l.id] || []
    result.push(...quizzes.map(q => ({ ...q, lessonId: l.id, lessonTitle: l.title, lessonNum: l.num })))
  }
  return result
}

// 按知识点标签查询题目（新增功能，支持跨课查询）
export function getQuizzesByKnowledge(tag) {
  const result = []
  for (const [, quizzes] of Object.entries(quizBank)) {
    for (const q of quizzes) {
      if (q.knowledge && q.knowledge.includes(tag)) {
        result.push(q)
      }
    }
  }
  return result
}
