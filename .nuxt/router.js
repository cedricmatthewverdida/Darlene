import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _b73ba960 = () => interopDefault(import('..\\pages\\analytics.vue' /* webpackChunkName: "pages/analytics" */))
const _6a477944 = () => interopDefault(import('..\\pages\\dashboard.vue' /* webpackChunkName: "pages/dashboard" */))
const _0a5728a1 = () => interopDefault(import('..\\pages\\forecast.vue' /* webpackChunkName: "pages/forecast" */))
const _8a620d6e = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _134b1b9c = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/analytics",
    component: _b73ba960,
    name: "analytics"
  }, {
    path: "/dashboard",
    component: _6a477944,
    name: "dashboard"
  }, {
    path: "/forecast",
    component: _0a5728a1,
    name: "forecast"
  }, {
    path: "/register",
    component: _8a620d6e,
    name: "register"
  }, {
    path: "/",
    component: _134b1b9c,
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
