import { Router, createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/login/index.vue'),
    meta: { title: '登录', hidden: true }
  },
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        name: 'home',
        path: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue'),
        meta: { title: '首页', icon: 'el-icon-s-home' }
      }
    ]
  },
  {
    path: '/404',
    name: 'error-404',
    component: () => import(/* webpackChunkName: "error404" */ '@/views/error/404.vue'),
    meta: { title: '404 NOT FOUND', hidden: true }
  }
]

export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/loan',
    name: 'loan',
    component: Layout,
    redirect: '/loan/list',
    meta: { title: '创业贷款' },
    children: [
      {
        path: 'list',
        name: 'loanList',
        component: () => import(/* webpackChunkName: "about" */ '@/views/loan/list.vue'),
        meta: { title: '个人创业贷款' }
      },
      {
        path: 'apply/personal',
        name: 'applyPersonal',
        component: () => import(/* webpackChunkName: "apply-personal" */ '@/views/loan/applyPersonal.vue'),
        meta: { title: '个人创业贷款' }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    meta: { hidden: true }
  }
]

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
