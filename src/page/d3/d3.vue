<template>
  <div id='svgContainer' style="margin:200px auto;width:400px;height:300px">

  </div>
</template>
<script>
import * as d3 from 'd3'
export default {
  data () {
    return {
      rectArr: [210, 250, 170, 130, 90, 280, 121, 77]
    }
  },
  mounted () {
    // let _this = this
    // let width = 400
    // let height = 300
    // let linear = d3.scaleLinear().domain([0, d3.max(_this.rectArr)]).range([0, 300]) // 比例尺
    // let axisX = d3.axisTop().scale(linear).ticks(6).tickPadding(5) // 创建坐标轴
    // let svg = d3.select('#svgContainer').append('svg')
    //   .attr('width', width)
    //   .attr('height', height)
    // var rectHeight = 25 // 每个矩形所占的像素高度(包括空白)
    // svg.selectAll('rect')
    //   .data(_this.rectArr)
    //   .enter()
    //   .append('rect')
    //   .attr('x', 20)
    //   .attr('y', function (d, i) {
    //     return i * rectHeight
    //   })
    //   .transition()
    //   .duration(3000)
    //   .ease(d3.easeBounce)
    //   .attr('width', function (d) {
    //     return linear(d)
    //   })
    //   .attr('height', rectHeight - 2)
    //   .attr('fill', 'steelblue')
    // svg.selectAll('text')
    //   .data(_this.rectArr)
    //   .enter()
    //   .append('text')
    //   .attr('x', 20)
    //   .attr('y', function (d, i) {
    //     return i * rectHeight - 5
    //   })
    //   .attr('dx', function (d) {
    //     return linear(d) + 10
    //   })
    //   .text(function (d) {
    //     return d
    //   })
    //   .attr('dy', rectHeight - 2)
    // svg.append('g').call(axisX).attr('class', 'axis')
    //   .attr('transform', 'translate(20,150)') // 插入坐标轴用group管理

    // svg.selectAll('rect')
    //   .on('mouseover', function (data, index) {
    //     d3.select(this)
    //       .attr('fill', 'yellow')
    //   })
    //   .on('mouseout', function (d, i) {
    //     d3.select(this)
    //       .transition()
    //       .duration(500)
    //       .attr('fill', 'steelblue')
    //   })
    let _this = this
    let rectArr = _this.rectArr
    let width = 400
    let height = 300
    let svg = d3.select('#svgContainer').append('svg').attr('width', width + 'px').attr('height', height + 'px')
    svg.selectAll('rect')
      .data(rectArr)
      .enter()
      .append('rect')
      .attr('y', function (d, i) { return height - rectArr[i] })
      .attr('x', function (d, i) {
        return width / rectArr.length * i
      })
      .attr('height', function (d, i) {
        return rectArr[i]
      })
      .attr('width', width / rectArr.length - 5)
      .attr('fill', 'steelblue')
  },
  methods: {

  }
}
</script>
<style lang="less">
.axis path,
.axis line{
    fill: none;
    stroke: black;
    shape-rendering: crispEdges;
}

.axis text {
    font-family: sans-serif;
    font-size: 11px;
}

</style>
