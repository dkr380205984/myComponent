<template>
  <div id="bar"></div>
</template>

<script>
import * as d3 from 'd3'
export default {
  data () {
    return {
      data: [120, 205, 150, 80, 70, 110, 130],
      width: '',
      height: '',
      padding: {
        left: '30px',
        right: '15px',
        top: '5px',
        bottom: '20px'
      },
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      minHeight: 0,
      paddingInner: 5, // 设置分段之间的间隔.
      paddingOuter: 5, // 设置第一个和最后一个 band 的外边距.
      transition: { // 过渡动画
        show: true,
        type: 'easeBounceOut', // d3.easeLinear 等等
        duration: 2000
      },
      color: '',
      title: {
        show: true,
        content: '普通柱状图实例'
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
    let dom = document.getElementById('bar')
    // dom容器宽高,参数padding获取
    let width = parseFloat(this.width) || parseFloat(this.getStyle(dom, 'width'))
    let height = parseFloat(this.height) || parseFloat(this.getStyle(dom, 'height'))
    let padLeft = parseFloat(this.padding.left)
    let padRight = parseFloat(this.padding.right)
    let padTop = parseFloat(this.padding.top)
    let padBottom = parseFloat(this.padding.bottom)
    // 设置柱状图最小高度,默认为0
    let minHeight = parseFloat(this.minHeight) || 0
    // 设置分段之间的间隔,默认为5
    let paddingInner = parseFloat(this.paddingInner)
    // 设置第一个和最后一个 band 的外边距.
    // let paddingOuter = parseFloat(this.paddingOuter)
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
    // 先绘制标题，由于标题要占位置，所以增加padTop值
    padTop += 50
    svg.append('text')
      .attr('class', 'titles')
      .text(this.title.content)
      .attr('y', padTop - 50)
      .attr('dy', '1em')
      // 标题居中
      // .attr('x', (width - padLeft - padRight) / 2)
      // .attr('dx', -this.title.content.toString().length / 2 + 'em')
      // 标题居左
      .attr('x', 0)
      .style('font-family', 'SimHei')
      .style('font-size', '22px')

    // 计算值的最大值
    let max = d3.max(this.data)
    // 创建一个线性比例尺
    // linearScale.ticks - 从输入范围中提取具有代表意义的值.
    // linearScale.tickFormat - 将刻度格式化为人类友好的格式.
    // linearScale.nice - 将输入范围扩展到漂亮的整数.
    let yScale = d3.scaleLinear().domain([0, max]).range([height - padTop - padBottom, minHeight]).nice()
    // 注意这里有个小细节,我重新设置了max的值
    // [120, 205, 150, 80, 70, 110, 130] yScale.domain(0,205).nice()
    // console.log(yScale.domain()) [0,220] 所以这里要更新下max的值
    max = yScale.domain()[1]
    // 创建y轴
    let yAxis = d3.axisLeft().scale(yScale)
    svg.append('g')
      .attr('transform', 'translate(' + padLeft + ',' + padTop + ')')
      .call(yAxis)
    // 创建一个序数分段比例尺.
    let xScale = d3.scaleBand()
      .domain(this.xAxis.data)
      .range([0, width - padLeft - padRight])
    // 创建x轴
    // .tickPadding([]) 设置刻度和文字的距离
    // .tickSizeInner([]) 设置内部刻度长度
    // .tickSizeOuter([]) 设置外部刻度长度
    // .tickSize([]) 设置内部和外部刻度长度
    let xAxis = d3.axisBottom().scale(xScale).tickPadding([5]).tickSizeInner([5]).tickSizeOuter([-5])
    svg.append('g')
      .attr('transform', 'translate(' + padLeft + ',' + (height - padBottom) + ')')
      .call(xAxis)
    // 由于层级问题,只能先渲染阴影,因为阴影层级较低
    svg.selectAll('.shadow')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('class', 'shadow')
      .attr('zIndex', '-1')
      .attr('width', xScale.bandwidth() - paddingInner * 2)
      // height取0,是为了后面过渡动画
      .attr('height', function (d) {
        return yScale(0) // max - d是为了取反
      })
      .attr('x', function (d, i) {
        return padLeft + xScale(_this.xAxis.data[i]) + paddingInner
      })
      // y取x轴位置是为了后面过渡动画
      .attr('y', function (d, i) {
        return padTop
      })
      .attr('fill', '#f0f0f0')
    // 添加渐变 定义一个线性渐变
    let defs = svg.append('defs')
    let linearGradient = defs.append('linearGradient')
      .attr('id', 'linearColor')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '100%')
    linearGradient.append('stop')
      .attr('offset', '0%')
      .style('stop-color', '#83bff6')
    linearGradient.append('stop')
      .attr('offset', '100%')
      .style('stop-color', '#188df0')
    // 添加柱状图
    let bar = svg.selectAll('.main')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('class', 'main')
      .attr('width', xScale.bandwidth() - paddingInner * 2)
      // height取0,是为了后面过渡动画
      .attr('height', function (d) {
        return 0
      })
      .attr('x', function (d, i) {
        return padLeft + xScale(_this.xAxis.data[i]) + paddingInner
      })
      // y取x轴位置是为了后面过渡动画
      .attr('y', function (d, i) {
        return height - padBottom
      })
      .style('fill', 'url(#' + linearGradient.attr('id') + ')')

    // 柱状图过渡动画
    bar.transition()
      .duration(this.transition.duration)
      .ease(d3[this.transition.type])
      .attr('y', function (d, i) {
        return height - padBottom - yScale(max - d)
      })
      .attr('height', function (d) {
        return yScale(max - d) // max - d是为了取反
      })
    // toolTips提示
    let toolTips = d3.select('body').append('div')
      .attr('class', 'toolTips')
      .style('opacity', 0)
      .style('position', 'absolute')
    // 柱状图交互
    bar.on('mouseover', function (d, i) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr('opacity', '0.8')
    })
      .on('mousemove', function (d) {
        // 这里取得是相对屏幕的坐标，因为tooltip元素放在body中
        let mouseX = d3.event.clientX + 15
        let mouseY = d3.event.clientY - 15
        // 如果你的style用了scoped，那你的样式应该写到App.vue中去，否则插入元素的样式不会生效
        toolTips.html(`<div class="tolTp">${d}</div>`)
          .style('opacity', 1)
          .style('left', mouseX + 'px')
          .style('top', mouseY + 'px')
      })
      .on('mouseout', function (d, i) {
        toolTips.style('opacity', 0)
        toolTips.html('')
        d3.select(this)
          .transition()
          .duration(500)
          .attr('opacity', '1')
      })

    // 添加文本
    // 这里必须添加class，因为添加坐标轴的时候里面含有text标签，当然你也可以在把坐标轴放到最后添加，就没问题
    svg.selectAll('.text')
      .data(this.data)
      .enter()
      .append('text')
      .attr('class', 'text')
      .text(function (d) { return d })
      .attr('y', function (d, i) {
        return height - padBottom
      })
      // 先把文字从柱状图中间位置开始定位,有点类似left:50%
      .attr('x', function (d, i) {
        return padLeft + xScale(_this.xAxis.data[i]) + xScale.bandwidth() / 2
      })
      // 设置y偏移
      .attr('dy', function (d, i) {
        return '1.5em'
      })
      // 设置x偏移
      .attr('dx', function (d, i) {
        // 这里由于文字本身有长度,向左移动一半文字长度即可,事实上数字站得位置只有文字一半，因此我除以4，而不是除以2
        // 先转成字符串再计算
        return -d.toString().length / 4 + 'em'
      })
      .attr('fill', 'yellow')
      .transition()
      .duration(this.transition.duration)
      .ease(d3[this.transition.type])
      .attr('y', function (d, i) {
        return height - padBottom - yScale(max - d)
      })
  }
}
</script>

<style lang="less">
#bar{
  width: 600px;
  height: 600px;
  margin: 90px 80px;
  padding: 15px 25px;
  border:1px solid #cccccc;
  position: relative;
}
.tolTp{
  padding:8px 12px;
  background: rgba(0, 0, 0, 0.7);
  color:white;
}
</style>
