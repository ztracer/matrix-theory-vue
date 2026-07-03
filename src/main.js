import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

// Theme initialization
(function() {
  const stored = localStorage.getItem('matrix-theme')
  const theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  document.documentElement.setAttribute('data-theme', theme)
})()

const app = createApp(App)
app.use(router)
app.mount('#app')
