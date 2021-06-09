import Vue from 'vue'
import { wrapFunctional } from './utils'

const components = {
  Adminrole: () => import('../..\\components\\adminrole.vue' /* webpackChunkName: "components/adminrole" */).then(c => wrapFunctional(c.default || c)),
  Approvetweet: () => import('../..\\components\\approvetweet.vue' /* webpackChunkName: "components/approvetweet" */).then(c => wrapFunctional(c.default || c)),
  BarChart: () => import('../..\\components\\BarChart.js' /* webpackChunkName: "components/bar-chart" */).then(c => wrapFunctional(c.default || c)),
  Logo: () => import('../..\\components\\Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c)),
  PieChart: () => import('../..\\components\\PieChart.js' /* webpackChunkName: "components/pie-chart" */).then(c => wrapFunctional(c.default || c)),
  RegisterAuthForm: () => import('../..\\components\\RegisterAuthForm.vue' /* webpackChunkName: "components/register-auth-form" */).then(c => wrapFunctional(c.default || c)),
  TheSnackbar: () => import('../..\\components\\TheSnackbar.vue' /* webpackChunkName: "components/the-snackbar" */).then(c => wrapFunctional(c.default || c)),
  Tweets: () => import('../..\\components\\tweets.vue' /* webpackChunkName: "components/tweets" */).then(c => wrapFunctional(c.default || c)),
  UserAuthForm: () => import('../..\\components\\UserAuthForm.vue' /* webpackChunkName: "components/user-auth-form" */).then(c => wrapFunctional(c.default || c)),
  UserInfo: () => import('../..\\components\\userInfo.vue' /* webpackChunkName: "components/user-info" */).then(c => wrapFunctional(c.default || c)),
  Userrole: () => import('../..\\components\\userrole.vue' /* webpackChunkName: "components/userrole" */).then(c => wrapFunctional(c.default || c)),
  VuetifyLogo: () => import('../..\\components\\VuetifyLogo.vue' /* webpackChunkName: "components/vuetify-logo" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
