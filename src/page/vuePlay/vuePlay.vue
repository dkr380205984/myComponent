<template>
  <div id="example">
    <!-- 测试computed计算属性 -->
    <input  v-model="helloworld"/>
    <p>{{ hello }}</p>
    <p>{{ world }}</p>
    <p>{{ helloworld }}</p>
    <button @click="changedata">事件触发</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      hello: 'hello',
      world: 'world'
    }
  },
  computed: { // getter，setter计算属性都有
    helloworld: {
      // getter
      get: function () {
        console.log('getter called')
        return this.hello + this.world
      },
      // setter
      set: function (newValue) {
        console.log('setter called , newValue: ' + newValue)
        this.hello = newValue
      }
    }
  },
  methods: {
    changedata () {
      // this.hello = 'hello~' //并不能触发set
      this.helloworld = 'hello~world!'
    }
  },
  mounted () {
    console.log(this.$el)
  }
}
</script>
<style lang="less" scoped>

</style>
