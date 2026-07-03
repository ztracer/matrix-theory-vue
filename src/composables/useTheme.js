import { ref, watch } from 'vue'

const theme = ref(document.documentElement.getAttribute('data-theme') || 'light')

export function useTheme() {
  function toggle() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  watch(theme, (val) => {
    document.documentElement.setAttribute('data-theme', val)
    try { localStorage.setItem('matrix-theme', val) } catch { /* ignore */ }
  })

  return { theme, toggle }
}
