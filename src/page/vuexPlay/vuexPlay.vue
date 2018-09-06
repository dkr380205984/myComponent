<template>
  <div id="example">
    <button @click="decrement">-</button>
    {{count}}
    {{dataCount}}
    <button @click="increment">+</button>
    <div>{{sex}}</div>
    <div>{{from}}</div>
    <div>{{myCmpted}}</div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      str: '国籍',
      dataCount: this.$store.state.count
    }
  },
  computed: mapState({
    count: 'count', // 第一种写法
    sex: (state) => state.sex, // 第二种写法
    from: function (state) { // 用普通函数this指向vue实例,要注意
      return this.str + ':' + state.from
    },
    // 注意下面的写法看起来和上面相同,事实上箭头函数的this指针并没有指向vue实例,因此不要滥用箭头函数
    // from: (state) => this.str + ':' + state.from
    myCmpted: function () {
      // 这里不需要state,测试一下computed的原有用法
      return '测试' + this.str
    }
  }),
  methods: {
    increment () {
      this.$store.commit('increment')
    },
    decrement () {
      this.$store.commit('decrement')
    }
  },
  created () {
    // 写个定时器，发现computed依旧保持了只要内部有相关属性发生改变不管是当前实例data中的改变，还是vuex中的值改变都会触发dom和值更新
    setTimeout(() => {
      this.str = '国家'
    }, 1000)

    let MapState = mapState({
      count: 'count',
      sex: (state) => state.sex
    })
    let json = {
      'a': '我是json自带的',
      ...MapState
    }
    console.log(json)
    console.log(...[1, 2])
  }
}
</script>
<style lang="less" scoped>
</style>
