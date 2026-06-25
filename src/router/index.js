import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/lesson/01',
    name: 'LinearSpace',
    component: () => import('../views/lessons/01_LinearSpace.vue')
  },
  {
    path: '/lesson/02',
    name: 'LinearTransform',
    component: () => import('../views/lessons/02_LinearTransform.vue')
  },
  {
    path: '/lesson/03',
    name: 'Jordan',
    component: () => import('../views/lessons/03_Jordan.vue')
  },
  {
    path: '/lesson/04',
    name: 'MatrixFunction',
    component: () => import('../views/lessons/04_MatrixFunction.vue')
  },
  {
    path: '/lesson/05',
    name: 'LUQR',
    component: () => import('../views/lessons/05_LUQR.vue')
  },
  {
    path: '/lesson/06',
    name: 'SVD',
    component: () => import('../views/lessons/06_SVD.vue')
  },
  {
    path: '/lesson/07',
    name: 'MoorePenrose',
    component: () => import('../views/lessons/07_MoorePenrose.vue')
  },
  {
    path: '/lesson/08',
    name: 'Projection',
    component: () => import('../views/lessons/08_Projection.vue')
  },
  {
    path: '/lesson/09',
    name: 'LeastSquares',
    component: () => import('../views/lessons/09_LeastSquares.vue')
  },
  {
    path: '/lesson/10',
    name: 'Gershgorin',
    component: () => import('../views/lessons/10_Gershgorin.vue')
  },
  {
    path: '/lesson/11',
    name: 'Review',
    component: () => import('../views/lessons/11_Review.vue')
  },
  {
    path: '/exam',
    name: 'ExamBank',
    component: () => import('../views/ExamBank.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
