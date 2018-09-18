<template>
  <div id="area"></div>
</template>

<script>
import * as d3 from 'd3'
export default {
  data: function () {
    return {
      data: [{
        name: '小米',
        value: 40.7
      }, {
        name: '华为',
        value: 20.8
      }, {
        name: '联想',
        value: 26.4
      }, {
        name: '三星',
        value: 40.8
      }, {
        name: '苹果',
        value: 30.8
      }, {
        name: '其他',
        value: 48.8
      } ],
      width: '',
      heigth: '',
      padding: {
        left: '30px',
        right: '30px',
        top: '20px',
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
    }
  },
  mounted () {
    let _this = this
    let dom = document.getElementById('area')
    // dom容器宽高,参数padding获取
    let width = parseFloat(this.width) || parseFloat(this.getStyle(dom, 'width'))
    let height = parseFloat(this.height) || parseFloat(this.getStyle(dom, 'height'))
    let padLeft = parseFloat(this.padding.left)
    let padRight = parseFloat(this.padding.right)
    let padTop = parseFloat(this.padding.top)
    let padBottom = parseFloat(this.padding.bottom)
    let minHeight = parseFloat(this.minHeight) || 0
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
    let svg = d3.select('#area')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
    // x轴比例尺
    // d3.scalePoint - 创建一个序数定点比例尺. x轴两边不留白
    // d3.scaleBand - 创建一个序数分段比例尺. x轴两边留白
    // 这里不留白图形看起来更美观
    let xData = _this.data.map((item) => item.name)
    let xScale = d3.scalePoint().domain(xData).range([0, width - padLeft - padRight])
    let xAxis = d3.axisBottom().scale(xScale)
    // y轴比例尺
    let yData = _this.data.map((item) => item.value)
    let max = d3.max(yData)
    let yScale = d3.scaleLinear().domain([0, max]).range([height - padTop - padBottom, minHeight]).nice()
    max = yScale.domain()[1]
    let yAxis = d3.axisLeft().scale(yScale)
    // 在创建区域生成器之前先创建一个颜色过渡
    let defs = svg.append('defs')
    let linearGradient = defs.append('linearGradient')
      .attr('id', 'linearColor')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%')
    let a = '#19CAAD'
    let b = '#BEEDC7'
    linearGradient.append('stop')
      .attr('offset', '0%')
      .style('stop-color', 'white')
      .style('stop-color', a.toString())
    linearGradient.append('stop')
      .style('stop-color', 'white')
      .attr('offset', '100%')
      .style('stop-color', b.toString())
    // 创建一个区域生成器
    let area = d3.area()
      .x(function (d, i) {
        return xScale(d.name) + padLeft
        // return padLeft + (width - padLeft - padRight) / _this.data.length * (i + 0.5) // 设置x0和x1访问器,当然你可以单独设置,没必要
      })
      .y0(function (d, i) {
        return height - padBottom // 设置y0均为x轴即可
      })
      .y1(function (d, i) {
        return yScale(d.value)
      })
      .curve(d3.curveCatmullRom)
    svg.append('path')
      .attr('d', area(_this.data))
      .style('fill', 'url(#' + linearGradient.attr('id') + ')')
    // 添加一条线条
    let line = d3.line()
      .x(function (d, i) {
        // 这里用xScale会有问题
        return padLeft + xScale(d.name)
      })
      .y(function (d, i) {
        return yScale(d.value)
      })
      .curve(d3.curveCatmullRom)
    svg.append('path')
      .attr('stroke', '#19CAAD')
      .attr('stroke-width', '3px')
      .attr('fill', 'none')
      .attr('class', 'line')
      .attr('d', line(_this.data))
    // 添加circle描述
    let circle = svg.selectAll('.circle')
      .data(_this.data)
      .enter()
      .append('circle')
      .attr('class', 'circle')
      .style('fill', 'white')
      .style('stroke', '#19CAAD')
      .style('stroke-width', '2')
      .attr('r', 3)
      .attr('cx', function (d, i) {
        return padLeft + xScale(d.name)
      })
      .attr('cy', function (d) {
        return yScale(d.value)
      })
    // 通过遮罩的方式完成动画
    // 设计思路:添加一个遮罩,覆盖区域图,然后从左往右平移,看起来像是区域图自己的动画效果
    let shadow = svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .style('fill', 'white')
      .attr('x', 0)
    // 移动遮罩,完成动画
    shadow.transition()
      .delay(500)
      .duration(2500)
      .ease(d3.easeLinear)
      .attr('x', width)
      .attr('width', 0)
    // 添加tooltips
    let toolTips = d3.select('body').append('div')
      .attr('class', 'toolTips')
      .style('opacity', 0)
      .style('position', 'absolute')
    // 添加辅助线
    let subline = svg.append('line')
      .attr('class', 'subline')
      .attr('stroke', 'rgba(0,0,0,0.2)')
      .attr('stroke-width', '1')
      // 设置虚线
      .attr('stroke-dasharray', '4,4')
      .attr('y1', height - padBottom)
      .attr('y2', padTop)
      .style('opacity', 0)
    svg.on('mouseover', function () {
      toolTips.style('opacity', 1)
      subline.style('opacity', 1)
    })
    svg.on('mousemove', function () {
      // 通过计算得到,当前鼠标离哪个节点更近
      let count = (d3.event.offsetX - padLeft) / (width - padLeft - padRight) * (_this.data.length - 1)
      count = Math.round(count) >= _this.data.length ? _this.data.length - 1 : count // 判断一下count是否为>=data.length的值,确立一下边界值
      let node = _this.data[Math.round(count)]
      let html = `<div class="clearfix"><div class="border" style="background:'#F4606C'"></div><span>${node.name}：${node.value}</span></div>`
      let mouseX = d3.event.clientX + 25
      let mouseY = d3.event.clientY + 25
      // 如果你的style用了scoped，那你的样式应该写到App.vue中去，否则插入元素的样式不会生效
      toolTips.html(`<div class="tolTp">${html}</div>`)
        .style('left', mouseX + 'px')
        .style('top', mouseY + 'px')
      // 给circle做个动画操作
      circle
        .transition()
        .ease(d3.easeBounceOut)
        .duration(100)
        .attr('r', function (d, i) {
          if (i === Math.round(count)) {
            return 6
          } else {
            return 3
          }
        })
      subline
        .transition()
        .duration(50)
        .attr('x1', padLeft + xScale(node.name))
        .attr('x2', padLeft + xScale(node.name))
    })
    svg.on('mouseout', function (d) {
      subline.style('opacity', 0)
      toolTips.style('opacity', 0)
      toolTips.html('')
      circle.transition()
        .ease(d3.easeBounceOut)
        .duration(100).attr('r', function (d, i) { return 3 })
    })
    // 由于坐标轴的层级最高所以最后添加
    // 添加x轴
    svg.append('g')
      .attr('transform', 'translate(' + padLeft + ',' + (height - padBottom) + ')')
      .call(xAxis)
      .style('font-size', '12px')
    // 绘制y轴
    svg.append('g')
      .attr('transform', 'translate(' + padLeft + ',' + padTop + ')')
      .call(yAxis)
      .style('font-size', '12px')
  }
}
</script>

<style lang="less">
#area{
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
