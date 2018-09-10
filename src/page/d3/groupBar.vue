<template>
  <div id = "groupBar"></div>
</template>

<script>
import * as d3 from 'd3'
export default {
  data: function () {
    return {
      data: [
        {
          name: 'Forest',
          data: [301, 334, 290, 188, 212]
        },
        {
          name: 'Steppe',
          data: [220, 182, 391, 234, 290]
        },
        {
          name: 'Desert',
          data: [350, 332, 201, 231, 366]
        },
        {
          name: 'Wetland',
          data: [198, 77, 101, 199, 140]
        }
      ],
      xAxis: {
        data: ['亚洲', '非洲', '美洲', '欧洲', '大洋洲']
      },
      width: '',
      height: '',
      padding: {
        left: '30px',
        right: '15px',
        top: '5px',
        bottom: '30px'
      },
      transition: { // 过渡动画
        show: true,
        type: 'easeBounceOut', // d3.easeLinear 等等
        duration: 3000
      },
      minHeight: 0,
      paddingInner: 15, // 设置分段之间的间隔.
      paddingOuter: 5 // 设置第一个和最后一个 band 的外边距.
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
    let dom = document.getElementById('groupBar')
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
    // 设置一个颜色数组
    let colors = d3.interpolateCool
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
    let svg = d3.select('#groupBar')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
    // 创建图例
    padTop += 40 // 先预留40像素的高度放图例
    let legend = d3.select('#groupBar')
      .append('div')
      // 创建dom容器
      .attr('class', 'legendContainer clearfix')
      .style('height', '40px')
      .style('position', 'absolute')
      .style('left', 'calc(50% + ' + _this.getStyle(dom, 'paddingLeft') + ')')
      .style('top', _this.getStyle(dom, 'paddingTop'))
      .style('transform', 'translate(-50%,0)')
      .style('display', 'inline-table')
      // 每个图例容器
      .selectAll('.legend')
      .data(_this.xAxis.data)
      .enter()
      .append('div')
      .attr('class', 'legend')
    legend.html(function (d, i) {
      return `<div class="chart" style="background:${colors(i)}"></div><span>${d}</span>`
    })

    // 给图例添加点击事件
      .on('click', function (d) {
      // 在这里可以触发一个回调函数,让用户自己去操作数据,
      // 这里的操作有点复杂,在封装的时候会把这个点击操作完善一下,实现echarts的效果
        console.log(d)
      })
    // 创建x轴
    let xScale = d3.scaleBand().domain(this.xAxis.data).range([0, width - padLeft - padRight])
    let xAxis = d3.axisBottom().scale(xScale).tickPadding([5]).tickSizeInner([5]).tickSizeOuter([-5])
    svg.append('g')
      .attr('transform', 'translate(' + padLeft + ',' + (height - padBottom) + ')')
      .call(xAxis)
      .style('font-size', '12px')
    // 创建y轴
    // 先找到每个数组的最大值，返回一个数组，再从返回的数组中找最大值
    let max = d3.max(this.data.map((item, index) => d3.max(item.data)))
    // linearScale.nice - 将输入范围扩展到漂亮的整数.
    let yScale = d3.scaleLinear().domain([0, max]).range([height - padTop - padBottom, minHeight]).nice()
    // 获取扩展后的max最大值
    max = yScale.domain()[1]
    let yAxix = d3.axisLeft().scale(yScale)
    svg.append('g')
      .attr('transform', 'translate(' + padLeft + ',' + padTop + ')')
      .call(yAxix)
      .style('font-size', '12px')
    // 绘制柱状图
    // 保存数组长度，后面会用来做除法
    let dataLength = this.data.length
    // 添加柱状图
    this.data.forEach((item, index) => {
      svg.selectAll('.groupBar' + item.name)
        .data(item.data)
        .enter()
        .append('rect')
        .attr('class', 'groupBar' + item.name)
        .attr('width', (xScale.bandwidth() - paddingInner * 2) / dataLength)
        .attr('height', function (d) {
          return 0
        })
        .attr('x', function (d, i) {
          return padLeft + xScale(_this.xAxis.data[i]) + paddingInner + (xScale.bandwidth() - paddingInner * 2) / dataLength * index
        })
        .attr('y', function (d, i) {
          return height - padBottom
        })
        .transition()
        .delay(function (d, i) {
          return i * 200
        })
        .duration(this.transition.duration)
        .ease(d3[this.transition.type])
        .attr('height', function (d) {
          return yScale(max - d) // max - d是为了取反
        })
        .attr('y', function (d, i) {
          return height - padBottom - yScale(max - d)
        })
        .attr('fill', function (d, i) { return colors(index) })
    })
    // 添加阴影层
    // 创建toolTips提示
    let toolTips = d3.select('body').append('div')
      .attr('class', 'toolTips')
      .style('opacity', 0)
      .style('position', 'absolute')
    // 根据x轴数据的长度绘制阴影
    this.xAxis.data.forEach((item, index) => {
      // 设置阴影外层padding，暂时写死
      let shadowPad = 30
      // 添加柱状图覆盖层，用于做鼠标移入事件，注意这一层应该覆盖柱状图图层
      let shadow = svg.append('rect')
        .data([index]) // 这里传入index，后续操作会用到
        .attr('class', 'shadow' + index)
        .attr('width', xScale.bandwidth() - paddingInner * 2 + shadowPad)
        .attr('height', height - padTop - padBottom)
        .attr('x', padLeft + xScale(_this.xAxis.data[index]) + paddingInner - shadowPad / 2)
        .attr('y', padTop)
        .attr('fill', 'rgba(0,0,0,0.0)')
      // 阴影层交互
      shadow.on('mouseover', function () {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('fill', 'rgba(0,0,0,0.2)')
      })
        .on('mousemove', function (d) {
        // 注意这里的d参数，我们传入的是当前柱状图集合的下标index
        // 例如我们需要亚洲的数据，我们就需要将data中的数据抽离出来变成
        // [{name: "Forest", value: 212},{name: "Steppe", value: 290},{name: "Desert", value: 366}{name: "Wetland", value: 140}]
          let shadowData = _this.data.map((item) => {
            return {
              'name': item.name,
              'value': item.data[d]
            }
          })
          // 用获取到的数据来拼接dom
          let html = `<div class="clearfix"><span>${_this.xAxis.data[d]}</span></div>`
          shadowData.forEach((item, index) => {
            let color = colors(index)
            html += `<div class="clearfix"><div class="border" style="background:${color}"></div><span>${item.name}：${item.value}</span></div>`
          })
          // 这里取得是相对屏幕的坐标，因为tooltip元素放在body中
          let mouseX = d3.event.clientX + 30
          let mouseY = d3.event.clientY - 30
          // 如果你的style用了scoped，那你的样式应该写到App.vue中去，否则插入元素的样式不会生效
          toolTips.html(`<div class="tolTp">${html}</div>`)
            .style('opacity', 1)
            .style('left', mouseX + 'px')
            .style('top', mouseY + 'px')
        })
        .on('mouseout', function (d, i) {
          d3.select(this)
            .transition()
            .duration(300)
            .attr('fill', 'rgba(0,0,0,0)')
          toolTips.style('opacity', 0)
          toolTips.html('')
        })
    })
  }
}
</script>

<style lang="less">
#groupBar{
  width: 800px;
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
.legend{
  float: left;
  .chart{
    width: 30px;
    height: 18px;
    margin: 11px 6px;
    background: rebeccapurple;
    float: left;
    border-radius: 4px;
    cursor: pointer;
    &:hover{
      opacity: 0.4;
    }
  }
  span{
    float: left;
    line-height: 40px;
    font-size: 12px;
    margin-right: 10px;
  }
}
</style>
