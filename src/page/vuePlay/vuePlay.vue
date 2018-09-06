<template>
  <div id="example">
    <p v-for ="(item,index) in arr" :key="index">{{ item.name }}</p>
    <button @click="changedata">事件触发</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      arr: [{
        name: '小明',
        year: 15
      }, {
        name: '小张',
        year: 16
      }]
    }
  },
  computed: { // getter，setter计算属性都有

  },
  watch: {
    arr: {
      handler: function (val, oldVal) {
        console.log('监听到了arr数据变化')
        console.log(JSON.stringify(val) === JSON.stringify(oldVal)) // true
      },
      deep: true
    }
  },
  methods: {
    changedata () {
      this.arr[0].name = '小刘'
    }
  },
  mounted () {
  }
}
</script>
<style lang="less" scoped>

</style>
