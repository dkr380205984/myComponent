<template>
  <div class="leftMenu">
    <span class="cmpName" :class="{choosed:$route.name==='alert'}" @click="$router.push ('/alert')">alert提示</span>
    <span class="cmpName" :class="{choosed:$route.name==='edit'}" @click="$router.push ('/edit')">edit可编辑文字</span>
    <span class="cmpName" :class="{choosed:$route.name==='rollScreen'}" @click="$router.push ('/rollScreen')">rollScreen滚屏</span>
    <span class="cmpName" :class="{choosed:$route.name==='digitalRolling'}" @click="$router.push ('/digitalRolling')">数字滚动器</span>
    <span class="cmpName" :class="{choosed:$route.name==='flexBox'}" @click="$router.push ('/flexBox')">弹性布局</span>
    <span class="cmpName" :class="{choosed:$route.name==='sideNavigation'}" @click="$router.push ('/sideNavigation')">侧边导航栏</span>
  </div>
</template>

<script>
import './leftMenu.less'
export default {
  data: function () {
    return {
      choose: 'edit'
    }
  },
  created () {
  }
}
</script>

<style>

</style>
