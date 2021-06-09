import { wrapFunctional } from './utils'

export { default as Adminrole } from '../..\\components\\adminrole.vue'
export { default as Approvetweet } from '../..\\components\\approvetweet.vue'
export { default as BarChart } from '../..\\components\\BarChart.js'
export { default as Logo } from '../..\\components\\Logo.vue'
export { default as PieChart } from '../..\\components\\PieChart.js'
export { default as RegisterAuthForm } from '../..\\components\\RegisterAuthForm.vue'
export { default as TheSnackbar } from '../..\\components\\TheSnackbar.vue'
export { default as Tweets } from '../..\\components\\tweets.vue'
export { default as UserAuthForm } from '../..\\components\\UserAuthForm.vue'
export { default as UserInfo } from '../..\\components\\userInfo.vue'
export { default as Userrole } from '../..\\components\\userrole.vue'
export { default as VuetifyLogo } from '../..\\components\\VuetifyLogo.vue'

export const LazyAdminrole = import('../..\\components\\adminrole.vue' /* webpackChunkName: "components/adminrole" */).then(c => wrapFunctional(c.default || c))
export const LazyApprovetweet = import('../..\\components\\approvetweet.vue' /* webpackChunkName: "components/approvetweet" */).then(c => wrapFunctional(c.default || c))
export const LazyBarChart = import('../..\\components\\BarChart.js' /* webpackChunkName: "components/bar-chart" */).then(c => wrapFunctional(c.default || c))
export const LazyLogo = import('../..\\components\\Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c))
export const LazyPieChart = import('../..\\components\\PieChart.js' /* webpackChunkName: "components/pie-chart" */).then(c => wrapFunctional(c.default || c))
export const LazyRegisterAuthForm = import('../..\\components\\RegisterAuthForm.vue' /* webpackChunkName: "components/register-auth-form" */).then(c => wrapFunctional(c.default || c))
export const LazyTheSnackbar = import('../..\\components\\TheSnackbar.vue' /* webpackChunkName: "components/the-snackbar" */).then(c => wrapFunctional(c.default || c))
export const LazyTweets = import('../..\\components\\tweets.vue' /* webpackChunkName: "components/tweets" */).then(c => wrapFunctional(c.default || c))
export const LazyUserAuthForm = import('../..\\components\\UserAuthForm.vue' /* webpackChunkName: "components/user-auth-form" */).then(c => wrapFunctional(c.default || c))
export const LazyUserInfo = import('../..\\components\\userInfo.vue' /* webpackChunkName: "components/user-info" */).then(c => wrapFunctional(c.default || c))
export const LazyUserrole = import('../..\\components\\userrole.vue' /* webpackChunkName: "components/userrole" */).then(c => wrapFunctional(c.default || c))
export const LazyVuetifyLogo = import('../..\\components\\VuetifyLogo.vue' /* webpackChunkName: "components/vuetify-logo" */).then(c => wrapFunctional(c.default || c))
