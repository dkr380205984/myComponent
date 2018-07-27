<template>
  <div class="container">
    <div id="haha">
      <span>{{message}}</span>
      <span>{{add}}</span>
      <span>{{person.name.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      message: 'hello world',
      add: 1,
      person: {
      }
    }
  },
  beforeCreate: function () {
    console.group('beforeCreate 创建前状态===============》')
    console.log('%c%s', 'color:red', 'el     : ' + this.$el) // undefined
    console.log('%c%s', 'color:red', 'data   : ' + this.$data) // undefined
    console.log('%c%s', 'color:red', 'message: ' + this.message)
  },
  created: function () {
    console.group('created 创建完毕状态===============》')
    console.log('%c%s', 'color:red', 'el     : ' + this.$el) // undefined
    console.log('%c%s', 'color:red', 'data   : ' + this.$data) // 已被初始化
    console.log('%c%s', 'color:red', 'message: ' + this.message) // 已被初始化
    setTimeout(() => {
      // this.person = {
      //   name: {
      //     lastName: 'carry',
      //     firstName: 'dong'
      //   },
      //   sex: '男'
      // }
    }, 2000)
    setTimeout(() => {
      // this.message = 'world hello'
      // this.$nextTick(() => {
      //   console.log(this.$el.textContent)
      // })
    }, 2000)
    setTimeout(() => {
      this.add += 2
      this.add++
    }, 0)
    setTimeout(() => {
      this.add -= 5
    }, 0)
  },
  beforeMount: function () {
    console.group('beforeMount 挂载前状态===============》')
    console.log('%c%s', 'color:red', 'el     : ' + (this.$el)) // 已被初始化
    console.log(this.$el)
    console.log('%c%s', 'color:red', 'data   : ' + this.$data) // 已被初始化
    console.log('%c%s', 'color:red', 'message: ' + this.message) // 已被初始化
  },
  mounted: function () {
    console.group('mounted 挂载结束状态===============》')
    console.log('%c%s', 'color:red', 'el     : ' + this.$el) // 已被初始化
    console.log(this.$el)
    console.log('%c%s', 'color:red', 'data   : ' + this.$data) // 已被初始化
    console.log('%c%s', 'color:red', 'message: ' + this.message) // 已被初始化
  },
  beforeUpdate: function () {
    console.group('beforeUpdate 更新前状态===============》')
    // console.log('%c%s', 'color:red', 'el     : ' + this.$el)
    // console.log(this.$el.innerHTML)
    // console.log('%c%s', 'color:red', 'data   : ' + this.$data)
    // console.log('%c%s', 'color:red', 'message: ' + this.message)
    console.log('打印一下数字:' + this.add)
  },
  updated: function () {
    console.group('updated 更新完成状态===============》')
    // console.log('%c%s', 'color:red', 'el     : ' + this.$el)
    // console.log(this.$el)
    // console.log('%c%s', 'color:red', 'data   : ' + this.$data)
    // console.log('%c%s', 'color:red', 'message: ' + this.message)
    console.log('打印一下数字:' + this.add)
  },
  beforeDestroy: function () {
    console.group('beforeDestroy 销毁前状态===============》')
    console.log('%c%s', 'color:red', 'el     : ' + this.$el)
    console.log(this.$el)
    console.log('%c%s', 'color:red', 'data   : ' + this.$data)
    console.log('%c%s', 'color:red', 'message: ' + this.message)
  },
  destroyed: function () {
    console.group('destroyed 销毁完成状态===============》')
    console.log('%c%s', 'color:red', 'el     : ' + this.$el)
    console.log(this.$el)
    console.log('%c%s', 'color:red', 'data   : ' + this.$data)
    console.log('%c%s', 'color:red', 'message: ' + this.message)
  }
}
</script>

<style>

</style>
