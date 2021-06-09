import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _e6e2c9e0 = () => interopDefault(import('..\\pages\\admin.vue' /* webpackChunkName: "pages/admin" */))
const _46b5c347 = () => interopDefault(import('..\\pages\\analytics.vue' /* webpackChunkName: "pages/analytics" */))
const _6d2fdb55 = () => interopDefault(import('..\\pages\\dashboard.vue' /* webpackChunkName: "pages/dashboard" */))
const _5475946c = () => interopDefault(import('..\\pages\\forecast.vue' /* webpackChunkName: "pages/forecast" */))
const _f385f31c = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _5b1f4713 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _e6e2c9e0,
    name: "admin"
  }, {
    path: "/analytics",
    component: _46b5c347,
    name: "analytics"
  }, {
    path: "/dashboard",
    component: _6d2fdb55,
    name: "dashboard"
  }, {
    path: "/forecast",
    component: _5475946c,
    name: "forecast"
  }, {
    path: "/register",
    component: _f385f31c,
    name: "register"
  }, {
    path: "/",
    component: _5b1f4713,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
