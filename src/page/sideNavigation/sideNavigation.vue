<template>
  <div class="container clearfix">
    <div class="logo"><img src="/static/img/logo2.png" /></div>
    <leftMenu></leftMenu>
    <div class="rightContent">
      <div class="title">侧边导航栏</div>
      <div class="use">侧边导航栏组件</div>
      <div class="cmp">
        <span class="cmp_title">基本用法</span>
        <div class="cmp_main">
          <div style="width:100px;height:400px;position:relative">
             <sideNavigation :options = foptions></sideNavigation>
          </div>
        </div>
        <span class="cmp_title">示例代码</span>
        <div class="cmp_code">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import './sideNavigation.less'
import '../common.less'
import '../markdown.css'
// 引用公共组件左边菜单栏
import leftMenu from '../../components/leftMenu/leftMenu.vue'
export default {
  components: {
    leftMenu
  },
  data () {
    return {
      foptions: {
        size: 28,
        font: 12,
        margin: 14,
        navs: [{
          img: '/static/img/icon_1.png',
          hImg: '/static/img/icon_1_y.png',
          description: '描述信息长一些'
        }, {
          img: '/static/img/icon_1.png',
          hImg: '/static/img/icon_1_y.png',
          description: '描述信息'
        }, {
          img: '/static/img/icon_1.png',
          hImg: '/static/img/icon_1_y.png',
          description: '描述信息'
        }, {
          img: '/static/img/icon_1.png',
          hImg: '/static/img/icon_1_y.png',
          description: '描述信息'
        }]
      }
    }
  }
}

</script>
