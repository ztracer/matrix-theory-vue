import fs from 'fs'
import path from 'path'
import { load } from 'js-yaml'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..', '..')
const hwDir = path.join(root, 'src', 'data', 'homework')
const outFile = path.join(root, 'hw.md')
const cssFile = path.join(__dirname, 'hw-style.css')

// Lesson titles (mirrors src/data/quizBank.js lessonMeta)
const lessonMeta = [
  { id: 1, title: '线性空间与线性子空间' },
  { id: 2, title: '线性变换及其矩阵' },
  { id: 3, title: '对角化与Jordan标准形' },
  { id: 4, title: '矩阵函数与矩阵微分方程' },
  { id: 5, title: '三角分解与QR分解' },
  { id: 6, title: 'SVD奇异值分解' },
  { id: 7, title: '满秩分解与MP逆' },
  { id: 8, title: '投影矩阵与应用' },
  { id: 9, title: '最小二乘与范数' },
  { id: 10, title: '特征值估计' },
  { id: 11, title: '考前复习' }
]

// Read all YAML files
const files = fs.readdirSync(hwDir).filter(f => f.endsWith('.yaml') && f !== 'schema.yaml')
const problems = []

for (const file of files) {
  const content = fs.readFileSync(path.join(hwDir, file), 'utf8')
  const data = load(content)
  problems.push({
    id: data.id,
    source: data.source,
    lesson: data.lesson,
    knowledge: data.knowledge || [],
    problem: (data.problem || '').trim()
  })
}

// Sort by lesson then by id
problems.sort((a, b) => {
  if (a.lesson !== b.lesson) return a.lesson - b.lesson
  return a.id.localeCompare(b.id)
})

// Read CSS
let css = ''
try { css = fs.readFileSync(cssFile, 'utf8') } catch { /* ignore */ }

// Group by lesson
const byLesson = {}
for (const p of problems) {
  if (!byLesson[p.lesson]) byLesson[p.lesson] = []
  byLesson[p.lesson].push(p)
}

// Build markdown
let md = `# 矩阵论课后作业\n\n`
md += `<style>\n${css}\n</style>\n\n`
md += `> 共 ${problems.length} 道题目，覆盖 ${Object.keys(byLesson).length} 个课程章节\n\n`

for (const [lesson, items] of Object.entries(byLesson)) {
  const meta = lessonMeta.find(m => m.id === parseInt(lesson))
  const title = meta ? meta.title : `第${lesson}课`
  md += `<div class="lesson-section">\n`
  md += `## ${title}\n\n`

  for (const p of items) {
    md += `<div class="problem">\n`
    md += `<div class="problem-header">\n`
    md += `<span class="problem-id">${p.id}</span>\n`
    md += `<span class="problem-source">${p.source}</span>\n`
    md += `</div>\n`
    if (p.knowledge.length > 0) {
      md += `<div class="problem-tags">\n`
      for (const tag of p.knowledge) {
        md += `<span class="tag">${tag}</span>\n`
      }
      md += `</div>\n`
    }
    md += `<div class="problem-body">\n\n${p.problem}\n\n</div>\n`
    md += `</div>\n\n`
  }
  md += `</div>\n\n`
}

fs.writeFileSync(outFile, md, 'utf8')
console.log(`Output: ${outFile}`)
console.log(`Problems: ${problems.length}`)
console.log(`Lessons: ${Object.keys(byLesson).length}`)
