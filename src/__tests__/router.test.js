import { describe, it, expect } from 'vitest'
import router from '@/router'

describe('Router', () => {
  const routes = router.getRoutes()

  it('has at least 14 routes', () => {
    expect(routes.length).toBeGreaterThanOrEqual(14)
  })

  it('has home route', () => {
    const home = routes.find((r) => r.name === 'Home')
    expect(home).toBeDefined()
    expect(home.path).toBe('/')
  })

  it('has catch-all 404 route', () => {
    const notFound = routes.find((r) => r.name === 'NotFound')
    expect(notFound).toBeDefined()
  })

  it('all lesson routes resolve', () => {
    const lessonRoutes = routes.filter((r) => r.path.startsWith('/lesson/'))
    lessonRoutes.forEach((r) => {
      expect(r.components).toBeDefined()
    })
  })
})
