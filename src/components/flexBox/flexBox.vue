<template>
  <div class="flex_container">
    <div class="main" :style="{fontSize:reOptions.fontSize}">
      <div class="line" v-for="(item,index) in reOptions.matrix" :key="index" :style="[{height:reOptions.height}]">
        <div @click="listenClick(item2)" v-for="(item2,index2) in item"
          :key="'index2'+index2"
          class="box"
          :style="[{flex:item2.flex},{backgroundColor:item2.bgColor},{color:item2.fontColor},{backgroundImage:'url(' + item2.bgImg + ')'},{margin:reOptions.margin}]">
          <span
            :class="[
              {'leftBottom':options.fontPosition==='leftBottom'},
              {'leftTop':options.fontPosition==='leftTop'},
              {'rightBottom':options.fontPosition==='rightBottom'},
              {'rightTop':options.fontPosition==='rightTop'},
              {'center':options.fontPosition==='center'}
            ]"
          >{{item2.description}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './flexBox.less'
export default {
  props: ['options'],
  data: function () {
    // 初始化参数项
    let reOptions = this.options
    let fontClassArr = ['leftBottom', 'leftTop', 'rightBottom', 'rightTop', 'center']
    let bgArr = ['#0e7fd8', '#42e580', '#54b3fd', '#f5787b', '#38d1d7', '#d27bef', '#fe8a67', '#ffd322']
    // 初始化单个盒子高度
    reOptions.height = parseInt(reOptions.height) ? parseInt(reOptions.height) + 'px' : '200px'
    // 初始化文字位置，默认为左下角，且只能从五种默认中选择，如需自定义请修改样式
    reOptions.fontPosition = fontClassArr.indexOf(reOptions.fontPosition) !== -1 ? reOptions.fontPosition : 'leftBottom'
    // 初始化文字大小
    reOptions.fontSize = parseInt(reOptions.fontSize) ? parseInt(reOptions.fontSize) + 'px' : '14px'
    // 初始化margin值
    reOptions.margin = parseInt(reOptions.margin) ? parseInt(reOptions.margin) + 'px' : '10px'
    // 初始化背景色 和 字体颜色
    if (Array.isArray(reOptions.matrix)) {
      let arr = reOptions.matrix
      let lengthCalc = 0
      for (let i = 0; i < arr.length; i++) {
        if (i !== 0) { lengthCalc += arr[i - 1].length }
        for (let j = 0; j < arr[i].length; j++) {
          if (!arr[i][j]['bgColor']) {
            arr[i][j]['bgColor'] = bgArr[((lengthCalc + j) % 8)]
          }
          if (!arr[i][j]['fontColor'] && !reOptions['fontColor']) {
            arr[i][j]['fontColor'] = '#000000'
          } else if (!arr[i][j]['fontColor'] && (!!reOptions['fontColor'])) {
            arr[i][j]['fontColor'] = reOptions['fontColor']
          }
        }
      }
    } else {
      // 如果矩阵类型有问题，自动初始化为空数组
      reOptions.matrix = []
      console.warn('检测到matrix参数类型错误，请检查matrix是否为数组')
    }
    return {
      reOptions: reOptions
    }
  },
  methods: {
    listenClick (item) {
      // 触发点击事件 并将当前节点所有信息返回给父组件
      this.$emit('getClick', item)
    }
  }
}
</script>

<style>

</style>
