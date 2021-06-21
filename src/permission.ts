import router, { asyncRoutes } from '@/router/index'
import store from '@/store/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import defaultSettings from './settings'

// 移除nprogress右侧进度环
NProgress.configure({ showSpinner: false })

// 白名单
const whiteList: Array<string> = ['/login', '/home', '/loan']

router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = store.getters['user/token']
  const roles = store.getters['user/roles']
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (roles && roles.length) {
        next()
      } else {
        try {
          store.dispatch('user/getUser').then(() => {
            asyncRoutes.map(route => {
              router.addRoute(route)
              return route
            })
            next({ ...to, replace: true })
          })
        } catch (error) {
          // console.log('【路由异常】', error)
        }
      }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
    }
  }
})

router.afterEach((to) => {
  // 设置页面title
  document.title = to.meta.title + ' - ' + defaultSettings.title
  NProgress.done()
})