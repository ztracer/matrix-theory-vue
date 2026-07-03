import { nextTick, onMounted, onUnmounted, unref } from 'vue'

export function useScrollReveal(target) {
  let observer = null
  const observed = new Set()

  const resolveElements = () => {
    const value = unref(target)

    if (typeof value === 'string') {
      return Array.from(document.querySelectorAll(value))
    }

    if (!value) return []

    if (value instanceof Element) return [value]

    if (Array.isArray(value)) return value.filter(Boolean)

    if (typeof value.length === 'number') return Array.from(value).filter(Boolean)

    return []
  }

  onMounted(async () => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return

    await nextTick()

    document.documentElement.classList.add('scroll-reveal-enabled')

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return

        entry.target.classList.add('revealed')
        observer?.unobserve(entry.target)
        observed.delete(entry.target)
      })
    }, {
      root: null,
      rootMargin: '0px 0px 120px 0px',
      threshold: 0.01
    })

    resolveElements().forEach((el) => {
      observer.observe(el)
      observed.add(el)
    })
  })

  onUnmounted(() => {
    observed.forEach((el) => observer?.unobserve(el))
    observed.clear()
    observer?.disconnect()
    observer = null
    document.documentElement.classList.remove('scroll-reveal-enabled')
  })
}

export default useScrollReveal
