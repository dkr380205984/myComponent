<template>
  <div id = "line"></div>
</template>

<script>
import * as d3 from 'd3'
export default {
  data: function () {
    return {
      data: [{
        name: '小米',
        value: 10.7
      }, {
        name: '华为',
        value: 20.8
      }, {
        name: '联想',
        value: 36.4
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
    }
  },
  mounted () {
    let _this = this
    let dom = document.getElementById('line')
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
    let svg = d3.select('#line')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
    // 创建x比例尺
    let xData = _this.data.map((d) => d.name)
    let xScale = d3.scaleBand().domain(xData).range([0, width - padLeft - padRight])
    let xAxis = d3.axisBottom().scale(xScale)
    // 绘制x轴
    svg.append('g')
      .attr('transform', 'translate(' + padLeft + ',' + (height - padBottom) + ')')
      .call(xAxis)
      .style('font-size', '12px')
    // 创建y比例尺
    let yData = _this.data.map((d) => d.value)
    let max = d3.max(yData)
    let yScale = d3.scaleLinear().domain([0, max]).range([height - padTop - padBottom, minHeight]).nice()
    max = yScale.domain()[1]
    let yAxis = d3.axisLeft().scale(yScale)
    // 绘制y轴
    svg.append('g')
      .attr('transform', 'translate(' + padLeft + ',' + padTop + ')')
      .call(yAxis)
      .style('font-size', '12px')
    // 让我们来做一个动画吧~~~~~~
    // 设置折线路径
    let line = d3.line()
      .x(function (d, i) {
        // 这里用xScale会有问题
        return padLeft + (width - padLeft - padRight) / _this.data.length * (i + 0.5)
      })
      .y(function (d, i) {
        return yScale(d.value)
      })
      // 这里有很多平滑曲线的种类可以选择,如最常用的d3.curveBasis,我找到一种可以把点绘制在线上的,当然还有很多其他方法
      .curve(d3.curveCatmullRom)
    // 绘制一条透明的折现,这条折线用于后续折现的长度获取,获取长度后就可以做动画了
    svg.append('path')
      .attr('stroke', 'rgba(0,0,0,0)')
      .attr('stroke-width', '4px')
      .attr('fill', 'none')
      .attr('class', 'line')
      .attr('d', line(_this.data))
      .attr('class', function (d) {
        return 'line'
      })
    // 透明折线绘制完成后,我们可以获取到长度了
    let path = document.getElementsByClassName('line')
    let length = path[0].getTotalLength()
    // 获取到长度后,我们再绘制一条肉眼看得到的线
    svg.append('path')
      .attr('stroke', '#19CAAD') // 我们只需要设置线条颜色就够了
      .attr('stroke-width', '4px')
      .attr('fill', 'none') // 要把填充设置为none
      .attr('class', 'line')
      .style('stroke-dasharray', length)
      .style('stroke-dashoffset', length)
      .style('animation', 'dash 2s forwards')
      .attr('d', line(_this.data))
      .attr('class', function (d) {
        return 'line'
      })
    // 我们还需要把dash添加到style中去
    let rule = '@keyframes dash {0%{stroke-dashoffset:' + length + ';}100%{ stroke-dashoffset: 0;} }'
    let style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = rule
    document.getElementsByTagName('head')[0].appendChild(style)
    // 动画部分到此为止~~~~~~~~~~ 蠢的法力无边
    // 这里有另外一个比较简单的解决思路,加遮罩,遮罩的动画会比弧好做的多,这里不做演示,仅供参考
    // 绘制点的位置
    let circle = svg.selectAll('.circle')
      .data(_this.data)
      .enter()
      .append('circle')
      .attr('class', 'circle')
      .style('fill', '#F4606C')
      .attr('r', 0)
      .attr('cx', function (d, i) {
        return padLeft + (width - padLeft - padRight) / _this.data.length * (i + 0.5)
      })
      .attr('cy', function (d) {
        return yScale(d.value)
      })
    // 给circle加动画
    circle.transition()
      .delay(function (d, i) { return i * 200 })
      .duration(1000)
      .attr('r', 6)
    // 给circle加鼠标事件,添加tooltips
    let toolTips = d3.select('body').append('div')
      .attr('class', 'toolTips')
      .style('opacity', 0)
      .style('position', 'absolute')
    circle.on('mouseover', function (d) {
      d3.select(this)
        .transition()
        .duration(400)
        .attr('r', 10)
    })
    circle.on('mousemove', function (d) {
      let html = `<div class="clearfix"><div class="border" style="background:'#F4606C'"></div><span>${d.name}：${d.value}</span></div>`
      let mouseX = d3.event.clientX + 30
      let mouseY = d3.event.clientY - 30
      // 如果你的style用了scoped，那你的样式应该写到App.vue中去，否则插入元素的样式不会生效
      toolTips.html(`<div class="tolTp">${html}</div>`)
        .style('opacity', 1)
        .style('left', mouseX + 'px')
        .style('top', mouseY + 'px')
    })
    circle.on('mouseout', function (d) {
      d3.select(this)
        .transition()
        .duration(400)
        .attr('r', 6)
      toolTips.style('opacity', 0)
      toolTips.html('')
    })
  }
}
</script>

<style lang="less">
#line{
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
