import Vue from 'vue'
import Router from 'vue-router'
import alert from '@/page/alert/alert.vue'
import edit from '@/page/edit/edit.vue'
import carousel from '@/page/carousel/carousel.vue'
import digitalRolling from '@/page/digitalRolling/digitalRolling.vue'
import rollScreen from '@/page/rollScreen/rollScreen.vue'
import flexBox from '@/page/flexBox/flexBox.vue'
import sideNavigation from '@/page/sideNavigation/sideNavigation.vue'
// echartsPlay 玩一下echarts
import echartsPlay from '@/page/echartsPlay/echartsPlay.vue'
// 玩一下computed
import vuePlay from '@/page/vuePlay/vuePlay.vue'
// 玩一下生命周期
import vuePlay2 from '@/page/vuePlay/vuePlay2.vue'
// 玩一下d3
import d3 from '@/page/d3/d3.vue'
// 玩一下vuex
import vuexPlay from '@/page/vuexPlay/vuexPlay4.vue'
// import importPlay from '@/page/export&import/import.vue'
// 探究一下vue-router
// import vueRouterPlay1 from '@/page/vueRouterPlay/vueRouterPlay1.vue'
// import vueRouterPlay2 from '@/page/vueRouterPlay/vueRouterPlay2.vue'
const vueRouterPlay1 = () => import('@/page/vueRouterPlay/vueRouterPlay1.vue')
const vueRouterPlay2 = () => import('@/page/vueRouterPlay/vueRouterPlay2.vue')
// 探究import和export
const importPlay = () => import('@/page/export&import/import.vue')
// d3第二阶段
const bar = () => import('@/page/d3/bar.vue')

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '',
      name: 'index',
      component: alert
    },
    {
      path: '/alert',
      name: 'alert',
      component: alert
    },
    {
      path: '/edit',
      name: 'edit',
      component: edit
    },
    {
      path: '/carousel',
      name: 'carousel',
      component: carousel
    },
    {
      path: '/digitalRolling',
      name: 'digitalRolling',
      component: digitalRolling
    },
    {
      path: '/rollScreen',
      name: 'rollScreen',
      component: rollScreen
    },
    {
      path: '/echartsPlay',
      name: 'echartsPlay',
      component: echartsPlay
    },
    {
      path: '/flexBox',
      name: 'flexBox',
      component: flexBox
    },
    {
      path: '/vuePlay',
      name: 'vuePlay',
      component: vuePlay
    },
    {
      path: '/vuePlay2',
      name: 'vuePlay2',
      component: vuePlay2
    },
    {
      path: '/sideNavigation',
      name: 'sideNavigation',
      component: sideNavigation
    },
    {
      path: '/d3',
      name: 'd3',
      component: d3
    },
    {
      path: '/vuexPlay',
      name: 'vuexPlay',
      component: vuexPlay
    },
    {
      path: '/importPlay',
      name: 'importPlay',
      component: importPlay
    },
    {
      path: '/vueRouterPlay1',
      name: 'vueRouterPlay1',
      component: vueRouterPlay1
      // beforeEnter: (to, from, next) => {
      //   console.log('%c 路由独享守卫', 'color:blue')
      //   console.log(to, from)
      //   next()
      // }
    },
    {
      path: '/vueRouterPlay2',
      name: 'vueRouterPlay2',
      component: vueRouterPlay2
    },
    {
      path: '/bar',
      name: 'bar',
      component: bar
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    console.log(to, from)
    console.log(savedPosition)
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
