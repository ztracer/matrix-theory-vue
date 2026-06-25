// 课后习题数据聚合器 — 从 homework/ 目录加载所有 YAML 文件
// 新增习题只需在 homework/ 下创建 .yaml 文件即可，无需改动此文件

import { load } from 'js-yaml'

// Vite import.meta.glob: 构建时扫描目录，返回 { path: content } 映射
const yamlSources = import.meta.glob('./homework/*.yaml', {
  eager: true,
  query: '?raw',
  import: 'default'
})

const allHomeworks = Object.entries(yamlSources)
  .map(([, content]) => load(content))

// 导出 homeworkBank（按 lesson ID 分组）
export const homeworkBank = {}
for (const hw of allHomeworks) {
  const key = hw.lesson
  if (!homeworkBank[key]) homeworkBank[key] = []
  homeworkBank[key].push(hw)
}

// 每组内部按 id 排序
for (const key of Object.keys(homeworkBank)) {
  homeworkBank[key].sort((a, b) => a.id.localeCompare(b.id))
}
