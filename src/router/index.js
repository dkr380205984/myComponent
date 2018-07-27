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
    }
  ]
})
