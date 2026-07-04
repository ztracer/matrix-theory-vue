import fs from 'fs'
import path from 'path'
import { load } from 'js-yaml'
import { fileURLToPath } from 'url'
import puppeteer from 'puppeteer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..', '..')
const hwDir = path.join(root, 'src', 'data', 'homework')
const outMd = path.join(root, 'extract', 'hw.md')
const outHtml = path.join(root, 'extract', 'hw.html')
const outPdf = path.join(root, 'extract', 'hw.pdf')
const cssFile = path.join(__dirname, 'hw-style.css')

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

problems.sort((a, b) => {
  if (a.lesson !== b.lesson) return a.lesson - b.lesson
  return a.id.localeCompare(b.id)
})

let css = ''
try { css = fs.readFileSync(cssFile, 'utf8') } catch { /* ignore */ }

const byLesson = {}
for (const p of problems) {
  if (!byLesson[p.lesson]) byLesson[p.lesson] = []
  byLesson[p.lesson].push(p)
}

// Build MD
let md = `# 矩阵论课后作业\n\n`
md += `> 共 ${problems.length} 道题目，覆盖 ${Object.keys(byLesson).length} 个课程章节\n\n`

for (const [lesson, items] of Object.entries(byLesson)) {
  const meta = lessonMeta.find(m => m.id === parseInt(lesson))
  const title = meta ? meta.title : `第${lesson}课`
  md += `## ${title}\n\n`

  for (const p of items) {
    md += `### ${p.id} · ${p.source}\n\n`
    if (p.knowledge.length > 0) {
      md += `**标签：** ${p.knowledge.map(t => `\`${t}\``).join(' ')}\n\n`
    }
    md += `${p.problem}\n\n`
    md += `---\n\n`
  }
}

fs.writeFileSync(outMd, md, 'utf8')
console.log(`MD:   ${outMd} (${problems.length} problems)`)

// Build HTML body
let body = ''
for (const [lesson, items] of Object.entries(byLesson)) {
  const meta = lessonMeta.find(m => m.id === parseInt(lesson))
  const title = meta ? meta.title : `第${lesson}课`
  body += `<div class="lesson-section">\n<h2>${title}</h2>\n`

  for (const p of items) {
    const escaped = p.problem
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    body += `<div class="problem">\n`
    body += `<div class="problem-header">\n`
    body += `<span class="problem-id">${p.id}</span>\n`
    body += `<span class="problem-source">${p.source}</span>\n`
    body += `</div>\n`
    if (p.knowledge.length > 0) {
      body += `<div class="problem-tags">\n`
      for (const tag of p.knowledge) body += `<span class="tag">${tag}</span>\n`
      body += `</div>\n`
    }
    body += `<div class="problem-body">\n\n${escaped}\n\n</div>\n`
    body += `</div>\n\n`
  }
  body += `</div>\n\n`
}

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>矩阵论课后作业</title>
<style>${css}</style>
</head>
<body>
<h1>矩阵论课后作业</h1>
<p class="summary">共 ${problems.length} 道题目，覆盖 ${Object.keys(byLesson).length} 个课程章节</p>
${body}
</body>
</html>`

fs.writeFileSync(outHtml, html, 'utf8')
console.log(`HTML: ${outHtml}`)

// Generate PDF
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
const page = await browser.newPage()
await page.setContent(html, { waitUntil: 'networkidle0' })
await page.pdf({
  path: outPdf,
  format: 'A4',
  margin: { top: '15mm', bottom: '15mm', left: '18mm', right: '18mm' },
  printBackground: true
})
await browser.close()

const pdfStat = fs.statSync(outPdf)
console.log(`PDF:  ${outPdf} (${(pdfStat.size / 1024).toFixed(1)} KB)`)
