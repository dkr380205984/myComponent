<template>
  <div id="pie"></div>
</template>

<script>
import * as d3 from 'd3'
export default {
  data: function () {
    return {
      data: [{
        name: '小米',
        value: 60.8
      }, {
        name: '华为',
        value: 20.8
      }, {
        name: '联想',
        value: 30.4
      }, {
        name: '三星',
        value: 40.8
      }, {
        name: '苹果',
        value: 90.8
      }, {
        name: '其他',
        value: 100.8
      } ],
      width: '',
      heigth: '',
      padding: {
        left: '30px',
        right: '30px',
        top: '5px',
        bottom: '20px'
      }
    }
  },
  methods: {
    getStyle: function (obj, attr) {
      if (obj.currentStyle) {
        return obj.currentStyle[attr]
      } else {
        return document.defaultView.getComputedStyle(obj, null)[attr]
      }
    },
    // 对象深度拷贝
    deepClone (obj) {
      var newObj = obj.constructor === Array ? [] : {}
      if (typeof obj !== 'object') {
        return
      } else {
        for (var i in obj) {
          if (obj.hasOwnProperty(i)) {
            newObj[i] = typeof obj[i] === 'object' ? this.deepClone(obj[i]) : obj[i]
          }
        }
      }
      return newObj
    }
  },
  mounted: function () {
    let _this = this
    let dom = document.getElementById('pie')
    // dom容器宽高,参数padding获取
    let width = parseFloat(this.width) || parseFloat(this.getStyle(dom, 'width'))
    let height = parseFloat(this.height) || parseFloat(this.getStyle(dom, 'height'))
    let padLeft = parseFloat(this.padding.left)
    let padRight = parseFloat(this.padding.right)
    let padTop = parseFloat(this.padding.top)
    let padBottom = parseFloat(this.padding.bottom)
    // let color = d3.scaleOrdinal(d3.schemeCategory10)
    let color = ['#1890FF', '#2FC25B', '#FACC14', '#223273', '#8543E0', '#13C2C2', '#3436C7', '#F04864']
    if (isNaN(width) || isNaN(height)) {
      console.error('width 或 height 参数错误')
      return
    }
    // 检查padding参数是否有问题
    if (isNaN(padLeft) || isNaN(padRight) || isNaN(padTop) || isNaN(padBottom)) {
      console.error('padding 参数错误')
      return
    }
    // 开始绘图,创建svg画布
    let svg = d3.select('#pie')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
    // 用d3提供的API将一组表格数据转换成生成饼图或者环形图需要的数据
    let pie = d3.pie()
      .value((d) => d.value)(_this.data)
    // 创建弧生成器
    // 计算一下外半径的最大值,取宽高中的最小值
    let outerRadius = d3.min([width - padLeft - padRight, height - padTop - padBottom])
    let arc = d3.arc()
      .innerRadius(100) // 设置环的内半径,为0的时候则是圆
      .outerRadius(outerRadius / 2.8) // 设置环的外半径,用计算得到的最大值除以>2的值
    // 创建一组线性渐变的颜色数组
    svg.selectAll('.defs')
      .data()
    // 用创建的弧生成器和已经通过pie方法得到数据绘制路径
    // 第一步，创建弧的container
    let path = svg.selectAll('.arcs')
      .data(pie)
      .enter()
      .append('g')
      .attr('class', 'arcs')
      .attr('transform', 'translate(' + (width - padLeft - padRight) / 2 + ',' + (height - padTop - padBottom) / 2 + ')')
    // 第二步，将每个弧分很多段，实现渐变效果
    path.selectAll('path')
      .data((d, i) => {
        let arr = []
        console.log(d.startAngle, d.endAngle)
        for (let i = 0; i < 100; i++) {
          let copy = _this.deepClone(d)
          let delt = (copy.endAngle - copy.startAngle) / 100
          copy.startAngle = copy.startAngle + delt * i
          copy.endAngle = copy.startAngle + delt
          arr.push(copy)
        }
        return arr
      })
      .enter()
      .append('path')
      .attr('fill', function (d, i) {
        console.log(d.index)
        let linear = d3.scaleLinear()
          .domain([0, 100])
          .range([0, 1])
        let compute
        if (d.index === pie.length - 1) {
          compute = d3.interpolate(color[d.index], color[0])
        } else {
          compute = d3.interpolate(color[d.index], color[d.index + 1])
        }
        return compute(linear(i))
      })
      .attr('stroke', function (d, i) {
        let linear = d3.scaleLinear()
          .domain([0, 100])
          .range([0, 1])
        let compute
        if (d.index === pie.length - 1) {
          compute = d3.interpolate(color[d.index], color[0])
        } else {
          compute = d3.interpolate(color[d.index], color[d.index + 1])
        }
        return compute(linear(i))
      })
      .attr('d', function (d, i) { return arc(d) })
  }
}
</script>

<style lang="less">
#pie{
  width: 600px;
  height: 600px;
  margin: 20px 20px;
  padding: 15px 25px;
  border:1px solid #cccccc;
  position: relative;
}
.tolTp{
  padding:8px 12px;
  background: rgba(0, 0, 0, 0.7);
  color:white;
  height: 20px;
  .border{
    width: 6px;
    height: 6px;
    border-radius: 3px;
    background: #83bff6;
    float: left;
    margin:7px 8px 7px 0;
  }
  span{
    float: left;
    line-height: 20px;
  }
}
</style>
