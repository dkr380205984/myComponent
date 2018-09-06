<template>
  <div>
    <div>
      <button @click="decrement">-</button>
      <span>{{count}}</span>
      <button @click="increment">+</button>
    </div>
    <div style="margin-top:20px;">
      <button @click="add(1)">+1</button>
      <button @click="add(2)">+2</button>
    </div>
    <button style="margin-top:20px" @click = "changeName({'first':'my ',second:'name is '})">{{name}}</button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  computed: {
    count () {
      return this.$store.state.count
    },
    name () {
      return this.$store.state.name
    }
  },
  // 辅助函数写法
  methods: {
    ...mapMutations({
      decrement: 'decrement',
      increment: 'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
      add: 'add',
      changeName: 'fn' // 将 `this.changeName(json)` 映射为 `this.$store.commit('fn', json)`
    })
  }
  // methods: {
  //   decrement () {
  //     this.$store.commit('decrement')
  //   },
  //   increment () {
  //     this.$store.commit('increment')
  //   },
  //   add (n) {
  //     // 你可以向 store.commit 传入额外的参数，即 mutation 的 载荷（payload）
  //     this.$store.commit('add', n)
  //   },
  //   changeName (first, second) {
  //     // this.$store.commit('fn', {
  //     //   'first': first,
  //     //   'second': second
  //     // })
  //     // 上面的写法等同于下面，对象风格的提交方式，个人觉得上面的写法更清晰
  //     this.$store.commit({
  //       'type': 'fn',
  //       'first': first,
  //       'second': second
  //     })
  //   }
  // }
}
</script>

<style>

</style>
