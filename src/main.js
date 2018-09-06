// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import mycomponent from './components'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'vue-echarts'
import store from './store/index'

Vue.component('echarts', echarts)
Vue.use(ElementUI)
Vue.use(mycomponent)

Vue.config.productionTip = false
// router.beforeEach((to, from, next) => {
//   console.log('%c 前置钩子', 'color:blue')
//   console.log(to, from)
//   setTimeout(() => {
//     next()
//   }, 5000)
// })
// router.beforeEach((to, from, next) => {
//   console.log('%c 前置钩子2', 'color:blue')
//   console.log(to, from)
//   setTimeout(() => {
//     next()
//   }, 3000)
// })
// router.afterEach((to, from) => {
//   console.log('%c 后置钩子', 'color:blue')
//   console.log(to, from)
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // 挂在stroe到所有子组件中
  components: { App },
  template: '<App/>'
})
