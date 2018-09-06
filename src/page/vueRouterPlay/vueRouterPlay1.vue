<template>
  <div class="body">我是页面1
    <button @click = "$router.push('/vueRouterPlay2')">点击跳转</button>
  </div>
</template>

<script>
console.log('我是页面1，我在script标签里面写了一句话')
export default {
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    // console.log('%c beforeRouteEnter', 'color:blue')
    // console.log(to, from)
    next()
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    // console.log('%c beforeRouteUpdate', 'color:blue')
    // console.log(to, from)
    next()
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用，注意这里
    // 可以访问组件实例 `this`
    // console.log('%c beforeRouteLeave', 'color:blue')
    // console.log(to, from)
    next()
  },
  beforeCreate () {
    // console.log('%c 组件加载beforeCreate', 'color:blue')
  }
}
</script>

<style lang="less" scoped>
.body{
  margin-top: 20px;
  padding-top: 1000px;
  height: 2000px;
  background: greenyellow;
}
</style>
