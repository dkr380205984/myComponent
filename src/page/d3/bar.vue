<template>
  <div id="bar"></div>
</template>

<script>
import * as d3 from 'd3'
export default {
  data () {
    return {
      data: [120, 200, 150, 80, 70, 110, 130],
      width: '',
      height: '',
      padding: {
        left: '5px',
        right: '15px',
        top: '5px',
        bottom: '20px'
      },
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      minHeight: 0
    }
  },
  methods: {
    getStyle: function (obj, attr) {
      if (obj.currentStyle) {
        return obj.currentStyle[attr]
      } else {
        return document.defaultView.getComputedStyle(obj, null)[attr]
      }
    }
  },
  mounted () {
    let dom = document.getElementById('bar')
    // dom容器宽高,参数padding获取
    let width = parseFloat(this.width) || parseFloat(this.getStyle(dom, 'width'))
    let height = parseFloat(this.height) || parseFloat(this.getStyle(dom, 'height'))
    let padLeft = parseFloat(this.padding.left)
    let padRight = parseFloat(this.padding.right)
    let padTop = parseFloat(this.padding.top)
    let padBottom = parseFloat(this.padding.bottom)
    // let minHeight = parseFloat(this.minHeight) || 0
    // 检查宽高参数是否有问题
    if (isNaN(width) || isNaN(height)) {
      console.error('width 或 height 参数错误')
      return
    }
    // 检查padding参数是否有问题
    if (isNaN(padLeft) || isNaN(padRight) || isNaN(padTop) || isNaN(padBottom)) {
      console.error('padding 参数错误')
      return
    }
    // 创建画布
    let svg = d3.select('#bar')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
    // 创建比例尺
    // let min = d3.min(this.data)
    // let max = d3.max(this.data)
    // 创建一个序数分段比例尺.
    let xScale = d3.scaleBand().domain(this.xAxis.data).range([0, width - padLeft - padRight])
    // 创建x轴
    let xAxis = d3.axisBottom().scale(xScale)
    svg.append('g')
      .attr('transform', 'translate(' + padLeft + ',' + (height - padBottom) + ')')
      .call(xAxis)
  }
}
</script>

<style lang="less" scoped>
#bar{
  width: 600px;
  height: 600px;
  margin: 20px 10px;
  padding: 15px 25px;
  border:1px solid #cccccc
}
</style>
