import { wrapFunctional } from './utils'

export { default as Logo } from '../..\\components\\Logo.vue'
export { default as RegisterAuthForm } from '../..\\components\\RegisterAuthForm.vue'
export { default as TheSnackbar } from '../..\\components\\TheSnackbar.vue'
export { default as Tweets } from '../..\\components\\tweets.vue'
export { default as UserAuthForm } from '../..\\components\\UserAuthForm.vue'
export { default as UserInfo } from '../..\\components\\userInfo.vue'
export { default as VuetifyLogo } from '../..\\components\\VuetifyLogo.vue'

export const LazyLogo = import('../..\\components\\Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c))
export const LazyRegisterAuthForm = import('../..\\components\\RegisterAuthForm.vue' /* webpackChunkName: "components/register-auth-form" */).then(c => wrapFunctional(c.default || c))
export const LazyTheSnackbar = import('../..\\components\\TheSnackbar.vue' /* webpackChunkName: "components/the-snackbar" */).then(c => wrapFunctional(c.default || c))
export const LazyTweets = import('../..\\components\\tweets.vue' /* webpackChunkName: "components/tweets" */).then(c => wrapFunctional(c.default || c))
export const LazyUserAuthForm = import('../..\\components\\UserAuthForm.vue' /* webpackChunkName: "components/user-auth-form" */).then(c => wrapFunctional(c.default || c))
export const LazyUserInfo = import('../..\\components\\userInfo.vue' /* webpackChunkName: "components/user-info" */).then(c => wrapFunctional(c.default || c))
export const LazyVuetifyLogo = import('../..\\components\\VuetifyLogo.vue' /* webpackChunkName: "components/vuetify-logo" */).then(c => wrapFunctional(c.default || c))
