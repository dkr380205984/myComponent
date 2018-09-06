<template>
  <div class="">
    <span>{{number}}</span>
    <span>{{numberC}}</span>
  </div>
</template>

<script>

// json.name = 'hello' // 对象的值可改,但不推荐修改import导入的数据
// import {json as myJson, str, multiply, number} from './export.js'
// console.log(myJson)
import * as Math from './export.js'
import print from './exportDefault.js'
print('hello', 'world')
console.log(Math.str)
// str = '改写字符串' //报错,非对象引入不能改写,属于只读
console.log(Math.multiply(2, 3))
export default {
  data: function () {
    return {
      number: Math.number
    }
  },
  computed: {
    numberC: function () {
      return Math.number
      // 这里return的number是外层的number,他没有挂载到data,也就是没有经历vue的数据双向绑定,所以是不可能监听到变化的
      // 如果你用return this.number也是监听不到变化的，因为this.number在初始化的时候只能赋值一次，不会去监听赋给他的那个外层变量的值有没有改变
    }
  },
  created () {
    // vue里面少用ES6的箭头函数,会造成this指针指向不正确的问题,这里我只是偷懒,不推荐
    setInterval(() => {
      this.number = Math.number
    }, 1000)
  }
}
</script>

<style>

</style>
