import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // GitHub Pages 部署时，GITHUB_REPOSITORY 格式为 "username/repo-name"
  // 从环境变量中获取仓库名，自动设置 base 路径
  const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || ''
  // 生产构建且存在仓库名时使用子路径，否则使用根路径（本地开发）
  const base = mode === 'production' && repoName ? `/${repoName}/` : '/'

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    base,
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
    },
    server: {
      port: 5173,
      open: false,
      host: true,
    },
    preview: {
      port: 4173,
    },
  }
})
