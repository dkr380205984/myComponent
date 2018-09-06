<template>
  <div id='svgContainer' style="">
    <div class="every">
      <h3>柱状图探究
        <div class="button" @click="changeData('bar')">点击触发更新</div>
      </h3>
      <div class="svg" id="bar"></div>
    </div>
    <div class="every">
      <h3>折线图探究
        <div class="button" @click="changeData('line')">点击触发更新</div>
      </h3>
      <div class="svg" id="line"></div>
    </div>
    <div class="every">
      <h3>区域生成器</h3>
      <div class="svg" id="area"></div>
    </div>
    <div class="every">
      <h3>饼图探究</h3>
      <div class="svg" id="pie"></div>
    </div>
    <div class="every">
      <h3>力导向图探究</h3>
      <div class="svg" id="forceDirected"></div>
    </div>
    <div class="every">
      <h3>弦图探究</h3>
      <div class="svg" id="chordDiagram"></div>
    </div>
    <div class="every">
      <h3>树状图探究</h3>
      <div class="svg" id="treeDiagram"></div>
    </div>
    <div class="every">
      <h3>集群图探究</h3>
      <div class="svg" id="clusterDiagram"></div>
    </div>
    <div class="every">
      <h3>利用集群图的特性做个圆</h3>
      <div class="svg" id="clusterCircle"></div>
    </div>
    <div class="every">
      <h3>捆图(问题巨大)</h3>
      <div class="svg" id="bundle"></div>
    </div>
    <div class="every">
      <h3>打包图</h3>
      <div class="svg" id="pack"></div>
    </div>
    <div class="every">
      <h3>直方图</h3>
      <div class="svg" id="histogram"></div>
    </div>
    <div class="every">
      <h3>分区图</h3>
      <div class="svg" id="partition"></div>
    </div>
    <div class="every">
      <h3>分区图扩展--圆形</h3>
      <div class="svg" id="partitionR"></div>
    </div>
    <div class="every">
      <h3>堆栈</h3>
      <div class="svg" id="stack"></div>
    </div>
    <div class="every">
      <h3>矩阵树图</h3>
      <div class="svg" id="treemap"></div>
    </div>
    <div class="map">
      <h3>地图</h3>
      <div class="svg" id="geomap"></div>
    </div>
  </div>
</template>
<script>
import * as d3 from 'd3'
export default {
  data () {
    return {
      barData: [9, 18, 12, 26, 32, 44, 25, 18, 36],
      lineData: [10, 30, 25, 12, 43, 25, 18, 36],
      areaData: [10, 30, 25, 12, 43, 25, 18, 12],
      pieData: [{
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
      treeData: {
        'name': '中国',
        'children': [
          {
            'name': '浙江',
            'children':
            [
              {'name': '杭州'},
              {'name': '宁波'},
              {'name': '温州'},
              {'name': '绍兴'}
            ]
          },
          {
            'name': '广西',
            'children': [
              {
                'name': '桂林',
                'children':
                [
                  {'name': '秀峰区'},
                  {'name': '叠彩区'},
                  {'name': '象山区'},
                  {'name': '七星区'}
                ]
              },
              {'name': '南宁'},
              {'name': '柳州'},
              {'name': '防城港'}
            ]
          },
          {
            'name': '黑龙江',
            'children': [
              {'name': '哈尔滨'},
              {'name': '齐齐哈尔'},
              {'name': '牡丹江'},
              {'name': '大庆'}
            ]
          },
          {
            'name': '新疆',
            'children':
              [
                {'name': '乌鲁木齐'},
                {'name': '克拉玛依'},
                {'name': '吐鲁番'},
                {'name': '哈密'}
              ]
          }
        ]
      }
    }
  },
  methods: {
    changeData (which) {
      if (which === 'bar') {
        this.barData.sort(d3.ascending)
      }
      if (which === 'line') {
        this.lineData.sort(d3.ascending)
      }
    },
    firstDemo () {
      let rectArr = [210, 250, 170, 130, 90, 280, 121, 77]
      let width = 400
      let height = 400
      let svg = d3.select('#fisrtDemo').append('svg').attr('width', width + 'px').attr('height', height + 'px')
      // 插入柱状图
      svg.selectAll('rect')
        .data(rectArr)
        .enter()
        .append('rect')
        .attr('transform', 'translate(' + width + ',' + height + ') rotate(180)')
        .attr('y', function (d, i) { return 0 })
        .attr('x', function (d, i) {
          return width - width / rectArr.length * (i + 1)
        })
        .attr('height', function (d) {
          return 0
        })
        .attr('width', width / rectArr.length - 5)
        .transition()
        .delay(function (d, i) {
          return i * 200
        })
        .duration(2000)
        .ease(d3.easeBounce)
        .attr('height', function (d, i) {
          return d
        })
        .attr('fill', 'steelblue')

      // 插入说明
      svg.selectAll('text')
        .data(rectArr)
        .enter()
        .append('text')
        .attr('y', function (d, i) { return 0 })
        .attr('x', function (d, i) {
          return width / rectArr.length * i + 5
        })
        .attr('dx', 0)
        .text(function (d) {
          return d
        })
        .transition()
        .delay(function (d, i) {
          return i * 200
        })
        .attr('dy', function (d) {
          return height - d - 5
        })
        .duration(2000)
        .ease(d3.easeBounce)
    },
    bar () {
      let _this = this
      let width = 400
      let height = 400
      let rectPad = 5
      let padding = {
        left: 30,
        right: 30,
        top: 20,
        bottom: 20
      }
      // 初始化svg画布
      document.getElementById('bar').innerHTML = ''
      let svg = d3.select('#bar')
        .append('svg')
        .attr('width', width + 'px')
        .attr('height', height + 'px')
      // 创建比例尺
      let min = d3.min(_this.barData) - 5
      let max = d3.max(_this.barData) + 5
      let xScale = d3.scaleBand().domain(d3.range(_this.barData.length)).range([0, width - padding.left - padding.right])
      let yScale = d3.scaleLinear().domain([min, max]).range([0, height - padding.top - padding.bottom])
      let yScaleAxis = d3.scaleLinear().domain([min, max]).range([height - padding.top - padding.bottom, 0]) // 坐标轴值域取反，因为坐标原点在左上角
      // 设置x轴 y轴
      let xAxis = d3.axisBottom().scale(xScale)
      let yAxis = d3.axisLeft(yScaleAxis)
      // 添加x轴
      svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + padding.left + ',' + (height - padding.bottom) + ')')
        .call(xAxis)
      // 添加y轴
      svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
        .call(yAxis)

      // 添加柱状图
      svg.selectAll('rect')
        .data(_this.barData)
        .enter()
        .append('rect')
        // 设置矩形从x,y轴哪一点开始绘制
        .attr('y', function (d, i) { return height - padding.bottom - yScale(d) })
        .attr('x', function (d, i) {
          return padding.left + xScale(i) + rectPad / 2
        })
        // 设置矩形宽高
        .attr('width', xScale.bandwidth() - rectPad)
        .attr('height', 0)
        // 添加鼠标移入移出事件，有个填充简便的效果
        .on('mouseover', function (d, i) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr('fill', 'yellow')
        })
        .on('mouseout', function (d, i) {
          d3.select(this)
            .transition()
            .duration(500)
            .attr('fill', 'steelblue')
        })
        .transition()
        .delay(function (d, i) {
          return i * 200
        })
        .attr('height', function (d, i) {
          return yScale(d)
        })
        .attr('fill', 'steelblue')
        // 添加文字，同理
      svg.selectAll('.MyText')
        .data(_this.barData)
        .enter()
        .append('text')
        .attr('class', 'MyText')
        .attr('fill', 'white')
        .attr('text-anchor', 'middle')
        .attr('y', function (d, i) { return height - padding.bottom - yScale(d) })
        .attr('x', function (d, i) {
          return padding.left + (width - padding.left - padding.right) / _this.barData.length * i
        })
        .attr('dx', (width - padding.left - padding.right) / _this.barData.length / 2)
        .attr('dy', function (d, i) {
          return '1.2em'
        })
        .text(function (d) {
          return d
        })
    },
    line () {
      let _this = this
      let width = 400
      let height = 400
      let padding = {
        left: 30,
        right: 30,
        top: 20,
        bottom: 20
      }
      // 初始化svg画布
      // // 处理数据更新做的判断
      document.getElementById('line').innerHTML = ''
      let svg = d3.select('#line')
        .append('svg')
        .attr('width', width + 'px')
        .attr('height', height + 'px')

      let min = d3.min(_this.lineData) - 5
      let max = d3.max(_this.lineData) + 5
      // 比例尺
      let xScale = d3.scaleBand().domain(['1月', '2月', '3月', '4月', '5月', '6月']).range([0, width - padding.left - padding.right])
      let yScale = d3.scaleLinear().domain([min, max]).range([height - padding.top - padding.bottom, 0]) // 值域取反
      let xAxis = d3.axisBottom().scale(xScale)
      let yAxis = d3.axisLeft(yScale)
      // 添加x轴
      svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + padding.left + ',' + (height - padding.bottom) + ')')
        .call(xAxis)
      // 添加y轴
      svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
        .call(yAxis)
      // 设置折线
      let line = d3.line()
        .x(function (d, i) {
          return padding.left + (width - padding.left - padding.right) / _this.lineData.length * (i + 0.5)
        })
        .y(function (d, i) {
          return yScale(d)
        })
        .curve(d3.curveBasis)
      // 绘制折现路径
      svg.append('path')
        .attr('d', line(_this.lineData))
        .attr('stroke', 'red')
        .attr('stroke-width', '4px')
        .attr('fill', 'none')
        .attr('class', 'line') // 添加动画
    },
    area () {
      let _this = this
      let width = 400
      let height = 400
      let padding = {
        left: 30,
        right: 30,
        top: 20,
        bottom: 20
      }
      document.getElementById('area').innerHTML = ''
      let svg = d3.select('#area')
        .append('svg')
        .attr('width', width + 'px')
        .attr('height', height + 'px')
      let xScale = d3.scaleBand().domain(['1月', '2月', '3月', '4月', '5月', '6月']).range([0, width - padding.left - padding.right])
      let yScale = d3.scaleLinear().domain([d3.min(_this.areaData), d3.max(_this.areaData)]).range([height - padding.bottom - padding.top, 0])
      let xAxis = d3.axisBottom().scale(xScale)
      let yAxis = d3.axisLeft().scale(yScale)
      svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + padding.left + ',' + (height - padding.bottom) + ')')
        .call(xAxis)
      svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
        .call(yAxis)

      // 颜色渐变
      let defs = svg.append('defs')
      let linearGradient = defs.append('linearGradient')
        .attr('id', 'linearColor')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '0%')
        .attr('y2', '100%')
      let a = d3.rgb(235, 0, 233)
      let b = d3.rgb(133, 0, 187)
      linearGradient.append('stop')
        .attr('offset', '0%')
        .style('stop-color', 'white')
        .transition().duration(2000)
        .style('stop-color', a.toString())
      linearGradient.append('stop')
        .style('stop-color', 'white')
        .transition().duration(2000)
        .attr('offset', '100%')
        .style('stop-color', b.toString())
      let area = d3.area()
        .x(function (d, i) { return padding.left + (width - padding.left - padding.right) / _this.lineData.length * (i + 0.5) })
        .y(function (d, i) { return height - padding.bottom })
        .y1(function (d, i) { return yScale(d) })
        .curve(d3.curveBasis)
      svg.append('path')
        .attr('d', area(_this.areaData))
        .style('fill', 'url(#' + linearGradient.attr('id') + ')')
    },
    pie () {
      let _this = this
      let width = 400
      let height = 400
      document.getElementById('pie').innerHTML = ''
      let svg = d3.select('#pie')
        .append('svg')
        .attr('width', width + 'px')
        .attr('height', height + 'px')
      let pie = d3.pie()
        .value((d) => d.value)
      // 数据转化
      let pieData = pie(_this.pieData)
      let outerRadius = width / 2.8
      let innerRadius = 0
      // 创建弧生成器
      let arc = d3.arc()
        .innerRadius(outerRadius)
        .outerRadius(innerRadius)
      let color = d3.interpolateCool
      let arcs = svg.selectAll('g')
        .data(pieData)
        .enter()
        .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
      arcs.append('path')
        .attr('fill', function (d, i) { return color(i) })
        .attr('d', function (d, i) { return arc(d) })
        // 设置动画,还未看懂这部分内容的参数部分
        .transition()
        .duration(4000)
        .attrTween('d', function (d, i) {
          let fn = d3.interpolateObject({
            endAngle: d.startAngle
          }, d)
          return function (i) {
            return arc(fn(i))
          }
        })
      // 添加文字value
      arcs.append('text')
        .attr('transform', function (d) {
          let x = arc.centroid(d)[0] * 1.4
          let y = arc.centroid(d)[1] * 1.4
          return 'translate(' + x + ',' + y + ')'
        })
        .attr('text-anchor', 'middle')
        .attr('font-size', '14')
        .text(function (d) {
          return d.value
        })
      // 添加文字name
      arcs.append('text')
        .attr('transform', function (d) {
          let x = arc.centroid(d)[0] * 2.5
          let y = arc.centroid(d)[1] * 2.5
          return 'translate(' + x + ',' + y + ')'
        })
        .attr('text-anchor', 'middle')
        .attr('font-size', '14')
        .text(function (d) {
          return d.data.name
        })
      // 添加直线
      arcs.append('line')
        .attr('stroke', 'black')
        .attr('stroke-width', '2px')
        .attr('x1', function (d) { return arc.centroid(d)[0] * 2 })
        .attr('y1', function (d) { return arc.centroid(d)[1] * 2 })
        .attr('x2', function (d) { return arc.centroid(d)[0] * 2.3 })
        .attr('y2', function (d) { return arc.centroid(d)[1] * 2.3 })
    },
    forceDirected () {
      let width = 400
      let height = 400
      let padding = {
        left: 30,
        right: 30,
        top: 20,
        bottom: 20
      }
      // 人物节点 name表示名称
      let nodes = [
        {name: '谢大脚'},
        {name: '王长贵'},
        {name: '王大拿'},
        {name: '谢小梅'},
        {name: '谢广坤'},
        {name: '刘能'},
        {name: '赵四'},
        {name: '刘大脑袋'},
        {name: '赵玉田'},
        {name: '刘英'},
        {name: '王老七'},
        {name: '王小蒙'},
        {name: '谢永强'}
      ]
      // 人物关系，source和target表示连线两端的节点，节点的序号从0开始，relation是自己随便加的
      let links = [
        {source: 0, target: 1, relation: '两口子'},
        {source: 0, target: 2, relation: '曾爱慕'},
        {source: 0, target: 3, relation: '亲戚'},
        {source: 0, target: 4, relation: '曾爱慕'},
        {source: 2, target: 7, relation: '上下属'},
        {source: 4, target: 5, relation: '死对头'},
        {source: 4, target: 10, relation: '亲家'},
        {source: 5, target: 9, relation: '父女'},
        {source: 5, target: 6, relation: '亲家'},
        {source: 10, target: 11, relation: '妇女'},
        {source: 11, target: 12, relation: '两口子'},
        {source: 4, target: 12, relation: '父子'},
        {source: 8, target: 9, relation: '两口子'}
      ]
      let svg = d3.select('#forceDirected')
        .append('svg')
        .attr('width', width)
        .attr('height', height)

      // 通过布局来转换数据，然后进行绘制
      let simulation = d3.forceSimulation()
        .nodes(nodes)
        .force('link', d3.forceLink(links).distance(200))
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter((width - padding.left - padding.right) / 2, (height - padding.top - padding.bottom) / 2))
      let color = d3.scaleOrdinal(d3.schemeCategory20)

      // 添加节点
      svg.selectAll('circle')
        .data(nodes)
        .enter()
        .append('circle')
        .attr('r', 10)
        .style('fill', function (d, i) {
          return color(i)
        })
        // 添加圆圈的拖拽事件，同时他会触发simulation的tick事件，重新布局该区域
        .call(d3.drag()
          .on('start', function (d) {
            if (!d3.event.active) {
              simulation.alphaTarget(0.8).restart() // 设置衰减系数，对节点位置移动过程的模拟，数值越高移动越快，数值范围[0，1]
            }
            d.fx = d.x
            d.fy = d.y
          })
          .on('drag', function (d) {
            d.fx = d3.event.x
            d.fy = d3.event.y
          })
          .on('end', function (d) {
            if (!d3.event.active) {
              simulation.alphaTarget(0)
            }
            d.fx = null
            d.fy = null
          })
        )
      // 添加描述
      svg.selectAll('text')
        .data(nodes)
        .enter()
        .append('text')
        .style('font-size', '12px')
        .style('fill', '#000')
        .attr('dx', 0)
        .attr('dy', 0)
        .text(function (d) { return d.name })
      // 添加relation
      svg.selectAll('.relation')
        .data(links)
        .enter()
        .append('text')
        .style('fill', 'red')
        .style('font-size', '11px')
        .attr('class', 'relation')
        .attr('dx', 0)
        .attr('dy', 0)
        .text(function (d) { return d.relation })
      // 添加连线
      svg.selectAll('line')
        .data(links)
        .enter()
        .append('line')
        .style('stroke', '#ccc')
        .style('stroke-width', 2)

      simulation.on('tick', function () {
        svg.selectAll('circle')
          .attr('cx', function (d) { return d.x })
          .attr('cy', function (d) { return d.y })
        svg.selectAll('text')
          .attr('x', function (d) { return d.x })
          .attr('y', function (d) { return d.y })
        svg.selectAll('line')
          .attr('x1', function (d) { return d.source.x })
          .attr('y1', function (d) { return d.source.y })
          .attr('x2', function (d) { return d.target.x })
          .attr('y2', function (d) { return d.target.y })
        svg.selectAll('.relation')
          .attr('x', function (d) { return (d.source.x + d.target.x) / 2 })
          .attr('y', function (d) { return (d.source.y + d.target.y) / 2 })
      })
    },
    chordDiagram () {
      let width = 400
      let height = 400

      let svg = d3.select('#chordDiagram')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
      // 五大洲人口组成数据
      let continent = ['亚洲', '欧洲', '非洲', '美洲', '大洋洲']
      // 模拟矩阵
      let matrix = [
        [11975, 5871, 8916, 2868, 3241],
        [1951, 10048, 2060, 6171, 1323],
        [8010, 16145, 8090, 8045, 4456],
        [1013, 990, 940, 6907, 3245],
        [2344, 2333, 940, 3654, 7526]
      ]
      let chord = d3.chord()
        .padAngle(0.03)
        .sortSubgroups(d3.ascending)
      // 首先不能这样写 let chord = d3.chord(matrix)..... 这样写根本没返回值
      // 然后chord(matrix)的返回值就是一坨shit
      // (15)[{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, groups: Array(5)]
      // 最后那个group你是怎么想的?直接push进返回值??wtf

      // 获取节点,也就是最后那个group
      let nodes = chord(matrix)['groups']
      // 获取弦,需要剔除最后的那个group
      let arcs = chord(matrix).map((item) => {
        return item
      })
      let color = d3.scaleOrdinal(d3.schemeCategory20)
      // 添加g元素确定弦图的中心
      let gChord = svg.append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
      // 添加一个装节点的g
      let gOuter = gChord.append('g')
        .attr('class', 'groups')
        .selectAll('g')
        .data(nodes)
        .enter().append('g')
      // 绘制弧
      let innerRadius = width / 2 * 0.7
      let outerRadius = innerRadius * 1.1
      let arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
      gOuter.append('path')
        .attr('class', 'outerPath')
        .style('fill', function (d) { return color(d.index) })
        // .style('stroke', function (d) { return d3.rgb(color(d.index)).darker() })
        .attr('d', arc)
      // 节点文字绘制
      gOuter.selectAll('.outerText')
        .data(nodes)
        .enter()
        .append('text')
        .each(function (d, i) { // 为绑定的数据添加变量
          d.angle = (d.startAngle + d.endAngle) / 2 // 弧的中心角度
          d.name = continent[i]
        })
        .attr('class', 'outerText')
        .attr('dy', '.35em')
        .attr('transform', function (d) {
          let result = 'rotate(' + (d.angle * 180) / Math.PI + ')' // 旋转
          result += 'translate(-15,' + -1.0 * (outerRadius + 10) + ')' // 平移
          // 对下方文字做旋转180度处理
          if (d.angle > Math.PI * 3 / 4 && d.angle < Math.PI * 5 / 4) {
            result += 'rotate(180)'
          }
          return result
        })
        .text(function (d) {
          return d.name
        })
      // 添加内部的弦
      let ribbon = d3.ribbon()
        .radius(innerRadius)
      gChord.append('g')
        .selectAll('path')
        .data(arcs)
        .enter().append('path')
        .attr('class', 'innerPath')
        .attr('d', ribbon)
        .style('fill', function (d) { return color(d.target.index) })
        .style('stroke', function (d) { return d3.rgb(color(d.target.index)).darker() })
      // 添加鼠标移入动画
      gOuter.selectAll('.outerPath')
        .on('mouseover', function (data) {
          let i = data.index
          svg.selectAll('.innerPath')
            .filter(function (d) {
              return d.source.index !== i && d.target.index !== i
            })
            .transition()
            .duration(500)
            .style('opacity', 0)
        })
        .on('mouseout', function (data) {
          let i = data.index
          svg.selectAll('.innerPath')
            .filter(function (d) {
              return d.source.index !== i && d.target.index !== i
            })
            .transition()
            .duration(500)
            .style('opacity', 1)
        })
    },
    treeDiagram () {
      // 树状图因为默认是上往下渲染的，改成从左往右渲染后会发现width和height都倒过来了，可以看具体参数的细节
      let width = 400
      let height = 400
      let _this = this
      let svg = d3.select('#treeDiagram')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
      // 初始化树状图数据获取器
      let tree = d3.tree()
        .size([width, height - 80])
        .separation(function (a, b) {
          return (a.parent === b.parent ? 1 : 2) / a.depth
        })
      // 初始化json数据转成一棵树，这个步骤是非常必要的！！
      let hierarchyData = d3.hierarchy(_this.treeData)
        .sum(function (d) {
          return d.value
        })
      // 初始化树状图
      let treeData = tree(hierarchyData)
      // 获取节点
      let nodes = treeData.descendants()
      // 获取边,也就是连线
      let links = treeData.links()
      // 绘制线
      let g = svg.append('g').attr('transform', 'translate(40,0)')
      g.selectAll('.link')
        .data(links)
        .enter().append('path')
        .attr('class', 'link')
        .style('fill', '#cccccc')
        .attr('d', d3.linkHorizontal()
          .x(function (d) { return d.y })
          .y(function (d) { return d.x }))
      // 绘制文本和节点
      g.selectAll('.node')
        .data(nodes)
        .enter().append('g')
        .attr('class', function (d) { return 'node' + (d.children ? ' node--internal' : ' node--leaf') })
        .attr('transform', function (d) { return 'translate(' + d.y + ',' + d.x + ')' })
      g.selectAll('.node').append('circle')
        .attr('r', 5)
        .style('fill', 'green')
      g.selectAll('.node').append('text')
        .attr('dy', 3)
        .attr('x', function (d) { return d.children ? -8 : 8 })
        .style('text-anchor', function (d) { return d.children ? 'end' : 'start' })
        .text(function (d) {
          return d.data.name
        })
        .style('font-size', '11px')
    },
    clusterDiagram () {
      // 树状图因为默认是上往下渲染的，改成从左往右渲染后会发现width和height都倒过来了，可以看具体参数的细节
      let width = 400
      let height = 400
      let _this = this
      let svg = d3.select('#clusterDiagram')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
      // 初始化树状图数据获取器
      let cluster = d3.cluster()
        .size([width, height - 80])
        .separation(function (a, b) {
          return (a.parent === b.parent ? 1 : 2) / a.depth
        })
      // 初始化json数据转成一棵树，这个步骤是非常必要的！！
      let hierarchyData = d3.hierarchy(_this.treeData)
        .sum(function (d) {
          return d.value
        })
      // 初始化树状图
      let treeData = cluster(hierarchyData)
      // 获取节点
      let nodes = treeData.descendants()
      // 获取边,也就是连线
      let links = treeData.links()
      // 绘制线
      let g = svg.append('g').attr('transform', 'translate(40,0)')
      g.selectAll('.link')
        .data(links)
        .enter().append('path')
        .attr('class', 'link')
        .style('fill', '#cccccc')
        .attr('d', d3.linkHorizontal()
          .x(function (d) { return d.y })
          .y(function (d) { return d.x }))
      // 绘制文本和节点
      g.selectAll('.node')
        .data(nodes)
        .enter().append('g')
        .attr('class', function (d) { return 'node' + (d.children ? ' node--internal' : ' node--leaf') })
        .attr('transform', function (d) { return 'translate(' + d.y + ',' + d.x + ')' })
      g.selectAll('.node').append('circle')
        .attr('r', 5)
        .style('fill', 'green')
      g.selectAll('.node').append('text')
        .attr('dy', 3)
        .attr('x', function (d) { return d.children ? -8 : 8 })
        .style('text-anchor', function (d) { return d.children ? 'end' : 'start' })
        .text(function (d) {
          return d.data.name
        })
        .style('font-size', '11px')
    },
    clusterCircle () {
      let width = 400
      let height = 400
      let _this = this
      let svg = d3.select('#clusterCircle')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
      // 初始化树状图数据获取器
      let cluster = d3.cluster()
        .size([width, height - 80])
        .separation(function (a, b) {
          return (a.parent === b.parent ? 1 : 2) / a.depth
        })
      // 初始化json数据转成一棵树，这个步骤是非常必要的！！
      let hierarchyData = d3.hierarchy(_this.treeData)
        .sum(function (d) {
          return d.value
        })
      // 初始化树状图
      let treeData = cluster(hierarchyData)
      // 获取节点
      let nodes = treeData.descendants()
      // 获取边,也就是连线
      let links = treeData.links()
      // 绘制线
      let g = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
      g.selectAll('.link')
        .data(links)
        .enter().append('path')
        .attr('class', 'link')
        .style('fill', '#cccccc')
        // 根据官网API 返回 d.x 和 d.y绘制出来的线就是一坨shit,猜了一个小时终于猜出来了
        .attr('d', d3.linkRadial()
          .angle(function (d) { return d.x / 180 * Math.PI })
          .radius(function (d) { return d.y / 2 }))
      // 绘制文本和节点
      g.selectAll('.node')
        .data(nodes)
        .enter().append('g')
        .attr('class', function (d) { return 'node' + (d.children ? ' node--internal' : ' node--leaf') })
        .attr('transform', function (d) { return 'rotate(' + (d.x - 90) + ')translate(' + d.y / 2 + ')' })
      g.selectAll('.node').append('circle')
        .attr('r', 5)
        .style('fill', 'green')
      g.selectAll('.node').append('text')
        .attr('dx', function (d) { return d.x < 180 ? 8 : -8 })
        .attr('dy', '.31em')
        .attr('text-anchor', function (d) { return d.x < 180 ? 'start' : 'end' })
        .attr('transform', function (d) { return d.x < 180 ? null : 'rotate(180)' })
        .text(function (d) { return d.data.name })
        .style('font-size', '11px')
    },
    bundle () {
      let width = 400
      let height = 400
      let cities = {
        name: '',
        children: [
          {name: '北京'}, {name: '上海'}, {name: '杭州'},
          {name: '广州'}, {name: '桂林'}, {name: '昆明'},
          {name: '成都'}, {name: '西安'}, {name: '太原'}
        ]
      }
      let railway = [
        {source: '北京', target: '上海'},
        {source: '北京', target: '广州'},
        {source: '北京', target: '杭州'},
        {source: '太原', target: '西安'},
        {source: '北京', target: '成都'},
        {source: '杭州', target: '桂林'},
        {source: '昆明', target: '桂林'},
        {source: '北京', target: '昆明'},
        {source: '北京', target: '成都'},
        {source: '上海', target: '杭州'},
        {source: '昆明', target: '成都'},
        {source: '西安', target: '太原'},
        {source: '上海', target: '成都'},
        {source: '西安', target: '太原'},
        {source: '上海', target: '成都'},
        {source: '成都', target: '太原'},
        {source: '昆明', target: '杭州'}
      ]
      let hierarchyData = d3.hierarchy(cities)
        .sum(function (d) {
          return d.value
        })
      let cluster = d3.cluster()
        .size([width, height - 80])
        .separation(function (a, b) {
          return (a.parent === b.parent ? 1 : 2) / a.depth
        })
      let treeData = cluster(hierarchyData)
      let nodes = treeData.leaves()
      // console.log(nodes)
      let links = this.bundleMap(treeData.leaves(), railway)
      // console.log(links)
      // let line = d3.radialLine()
      //   .curve(d3.curveBundle.beta(0.85))
      //   .radius(function (d) { return d.y })
      //   .angle(function (d) { return d.x / 180 * Math.PI })
      let line = d3.linkRadial()
        .radius(function (d) { return d.y / 2 })
        .angle(function (d) { return d.x / 180 * Math.PI })
      let svg = d3.select('#bundle')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
      let g = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
      g.selectAll('.link')
        .data(links)
        .enter().append('path')
        .attr('class', 'link')
        .style('fill', '#cccccc')
        .style('stroke', 'black')
        .style('stroke-width', '8px')
        .style('opacity', '.5')
        .attr('d', line)
      // 绘制文本和节点
      g.selectAll('.node')
        .data(nodes)
        .enter().append('g')
        .attr('class', function (d) { return 'node' + (d.children ? ' node--internal' : ' node--leaf') })
        .attr('transform', function (d) { return 'rotate(' + (d.x - 90) + ')translate(' + d.y / 2 + ')' })
      g.selectAll('.node').append('circle')
        .attr('r', 5)
        .style('fill', 'green')
      g.selectAll('.node').append('text')
        .attr('dx', function (d) { return d.x < 180 ? 8 : -8 })
        .attr('dy', '.31em')
        .attr('text-anchor', function (d) { return d.x < 180 ? 'start' : 'end' })
        .attr('transform', function (d) { return d.x < 180 ? null : 'rotate(180)' })
        .text(function (d) { return d.data.name })
        .style('font-size', '11px')

      // var radialLine = d3.radialLine()
      //   .curve(d3.curveBundle.beta(0.85))
      //   .radius(function (d) { return d.y })
      //   .angle(function (d) { return d.x / 180 * Math.PI })

      // svg.append('g')
      //   .attr('class', 'line')
      //   .style('stroke', 'black')
      //   .style('stroke-width', '8px')
      //   .style('opacity', '.5')
      //   .data(treeData.leaves())
      //   .enter().append('path')
      //   .each(function (d) {
      //     d.source = d[0]
      //     d.target = d[d.length - 1]
      //   })
      //   .attr('class', 'link')
      //   .attr('d', radialLine(newlinks))
    },
    bundleMap (nodes, links) {
      let hash = []
      for (let i = 0; i < nodes.length; i++) {
        hash[nodes[i].data.name] = nodes[i]
      }
      let resultLinks = []
      for (let i = 0; i < links.length; i++) {
        resultLinks.push({
          source: hash[links[i].source],
          target: hash[links[i].target]
        })
      }
      return resultLinks
    },
    pack () {
      let width = 400
      let height = 400
      let data = {
        'name': '中国',
        'value': '800',
        'children': [
          {
            'name': '浙江',
            'value': '450',
            'children':
            [
              {'name': '杭州', 'value': '40'},
              {'name': '宁波', 'value': '30'},
              {'name': '温州', 'value': '20'},
              {'name': '绍兴', 'value': '20'}
            ]
          },
          {
            'name': '广西',
            'value': '200',
            'children': [
              {
                'name': '桂林',
                'value': '100',
                'children':
                [
                  {'name': '秀峰区', 'value': '10'},
                  {'name': '叠彩区', 'value': '30'},
                  {'name': '象山区', 'value': '20'},
                  {'name': '七星区', 'value': '10'}
                ]
              },
              {'name': '南宁', 'value': '30'},
              {'name': '柳州', 'value': '10'},
              {'name': '防城港', 'value': '10'}
            ]
          },
          {
            'name': '黑龙江',
            'value': '200',
            'children': [
              {'name': '哈尔滨', 'value': '50'},
              {'name': '齐齐哈尔', 'value': '40'},
              {'name': '牡丹江', 'value': '10'},
              {'name': '大庆', 'value': '30'}
            ]
          },
          {
            'name': '新疆',
            'value': '100',
            'children':
              [
                {'name': '乌鲁木齐', 'value': '40'},
                {'name': '克拉玛依', 'value': '20'},
                {'name': '吐鲁番', 'value': '10'},
                {'name': '哈密', 'value': '10'}
              ]
          }
        ]
      }
      var color = d3.scaleSequential(d3.interpolateMagma)
        .domain([-4, 4])
      let svg = d3.select('#pack')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
      var pack = d3.pack()
        .size([width - 4, height - 4])
        .padding(4)
      var root = d3.hierarchy(data)
        .sum(function (d) { return d.value })
        .sort(function (a, b) { return b.value - a.value })
      let nodes = pack(root).descendants()
      // 画圆
      svg.selectAll('circle')
        .data(nodes)
        .enter()
        .append('circle')
        .style('fill', function (d) { return color(d.depth) })
        .attr('cx', function (d) { return d.x })
        .attr('cy', function (d) { return d.y })
        .attr('r', function (d) { return d.r })
        .on('mouseover', function (d) {
          d3.event.target.style.stroke = 'yellow'
          d3.event.target.style.strokeWidth = '2px'
          svg.append('text')
            .style('fill', 'black')
            .style('opacity', '0.5')
            .attr('class', 'hello')
            .attr('x', d3.event.offsetX + 20)
            .attr('y', d3.event.offsetY - 10)
            .text(d.data.name)
        })
        .on('mouseout', function (d) {
          svg.selectAll('.hello').remove()
          d3.event.target.style.strokeWidth = '0px'
        })
      // 文字
      svg.selectAll('text')
        .data(nodes)
        .enter()
        .append('text')
        .style('fill', 'black')
        .style('fill-opacity', function (d) { return d.children ? 0 : 1 }) // 设置包含子节点的文字不显示
        .attr('x', function (d) { return d.x })
        .attr('y', function (d) { return d.y })
        .attr('dy', '.3em')
        .attr('dx', function (d) { return '-' + d.data.name.length / 2 + 'em' }) // 设置文字居中，通过dx 负文字个数的二分之一
        .text(function (d) { return d.data.name })
        .style('font-size', function (d) { return 12 - d.depth + 'px' })
    },
    histogram () {
      let width = 400
      let height = 400
      let margin = {top: 10, right: 30, bottom: 30, left: 30}
      let data = d3.range(1000).map(d3.randomBates(10)) // 基于贝茨分布生成随机数，也不知道是个啥
      let xScale = d3.scaleLinear()
        .rangeRound([0, width]) // 设置输出范围并且启动四舍五入
      // 转换数据
      let histogram = d3.histogram()
        .domain(xScale.domain())
        .thresholds(xScale.ticks(20))
      let bins = histogram(data)
      // y比例尺
      let yScale = d3.scaleLinear()
        .domain([0, d3.max(bins, function (d) { return d.length })]) // 比较的是数据的length值
        .range([height - margin.bottom - margin.top, 0]) // 这里要倒着写，因为坐标轴原点在左上角
      // 绘图
      let svg = d3.select('#histogram')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      let bar = svg.selectAll('.bar')
        .data(bins)
        .enter().append('g')
        .attr('class', 'bar')
        .attr('transform', function (d) { return 'translate(' + xScale(d.x0) + ',' + yScale(d.length) + ')' })
      bar.append('rect')
        .attr('x', 1)
        .attr('width', xScale(bins[0].x1) - xScale(bins[0].x0) - 1)
        .attr('height', function (d) { return height - yScale(d.length) - 22 }) // d.length记录了该区间的个数
        .attr('fill', 'steelblue')

      let formatCount = d3.format(',.0f')
      bar.append('text')
        .attr('dy', '.75em')
        .attr('y', 6)
        .attr('x', (xScale(bins[0].x1) - xScale(bins[0].x0)) / 2)
        .attr('text-anchor', 'middle')
        .attr('font-size', '10px')
        .text(function (d) { return formatCount(d.length) })

      svg.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + (height - 20) + ')')
        .call(d3.axisBottom(xScale))
    },
    partition () {
      let width = 400
      let height = 400
      let data = {
        'name': '中国',
        'value': '950',
        'children': [
          {
            'name': '浙江',
            'value': '450',
            'children':
            [
              {'name': '杭州', 'value': '150'},
              {'name': '宁波', 'value': '120'},
              {'name': '温州', 'value': '130'},
              {'name': '绍兴', 'value': '150'}
            ]
          },
          {
            'name': '广西',
            'value': '200',
            'children': [
              {'name': '桂林', 'value': '80'},
              {'name': '南宁', 'value': '50'},
              {'name': '柳州', 'value': '30'},
              {'name': '防城港', 'value': '40'}
            ]
          },
          {
            'name': '黑龙江',
            'value': '200',
            'children': [
              {'name': '哈尔滨', 'value': '50'},
              {'name': '齐齐哈尔', 'value': '40'},
              {'name': '牡丹江', 'value': '60'},
              {'name': '大庆', 'value': '50'}
            ]
          },
          {
            'name': '新疆',
            'value': '100',
            'children':
              [
                {'name': '乌鲁木齐', 'value': '30'},
                {'name': '克拉玛依', 'value': '20'},
                {'name': '吐鲁番', 'value': '25'},
                {'name': '哈密', 'value': '25'}
              ]
          }
        ]
      }
      // 公式
      let partition = d3.partition()
        .size([width, height])
      let color = d3.scaleOrdinal(d3.schemeCategory10)
      let hierarchyData = d3.hierarchy(data)
      // 数据转化,取所有节点的数组
      let partitionData = partition(hierarchyData).descendants()
      // 绘图
      let svg = d3.select('#partition')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
      let g = svg.selectAll('g')
        .data(partitionData)
        .enter()
        .append('g')
      g.append('rect')
        .attr('x', function (d) { return d.x0 })
        .attr('y', function (d) { return d.y0 })
        .attr('width', function (d) { return d.x1 - d.x0 })
        .attr('height', function (d) { return d.y1 - d.y0 })
        .style('stroke', '#ccc')
        .style('fill', function (d) { return color(d.data.name) })
      g.append('text')
        .attr('x', function (d) { return d.x0 })
        .attr('y', function (d) { return d.y0 })
        .attr('dx', function (d) { return (d.x1 - d.x0) / 2 }) // 文字水平居中
        .attr('dy', function (d) { return (d.y1 - d.y0) / 2 - d.data.name.length / 2 * 12 }) // 文字垂直居中,有点瑕疵
        .attr('font-size', function (d) { return 12 - d.depth + 'px' }) // 文字按深度缩小
        .attr('writing-mode', 'tb') // 文字从上往下书写
        .text(function (d) { return d.data.name })
    },
    partitionR () {
      let width = 400
      let height = 400
      let data = {
        'name': '中国',
        'value': '950',
        'children': [
          {
            'name': '浙江',
            'value': '450',
            'children':
            [
              {'name': '杭州', 'value': '150'},
              {'name': '宁波', 'value': '120'},
              {'name': '温州', 'value': '130'},
              {'name': '绍兴', 'value': '150'}
            ]
          },
          {
            'name': '广西',
            'value': '200',
            'children': [
              {'name': '桂林', 'value': '80'},
              {'name': '南宁', 'value': '50'},
              {'name': '柳州', 'value': '30'},
              {'name': '防城港', 'value': '40'}
            ]
          },
          {
            'name': '黑龙江',
            'value': '200',
            'children': [
              {'name': '哈尔滨', 'value': '50'},
              {'name': '齐齐哈尔', 'value': '40'},
              {'name': '牡丹江', 'value': '60'},
              {'name': '大庆', 'value': '50'}
            ]
          },
          {
            'name': '新疆',
            'value': '100',
            'children':
              [
                {'name': '乌鲁木齐', 'value': '30'},
                {'name': '克拉玛依', 'value': '20'},
                {'name': '吐鲁番', 'value': '25'},
                {'name': '哈密', 'value': '25'}
              ]
          }
        ]
      }
      // 公式,注意size的参数
      let radius = 200
      let partition = d3.partition()
        .size([2 * Math.PI, radius * radius])
      let color = d3.scaleOrdinal(d3.schemeCategory10)
      let hierarchyData = d3.hierarchy(data)
      // 数据转化,取所有节点的数组
      let partitionData = partition(hierarchyData).descendants()
      // 创建弧生成器
      let arc = d3.arc()
        .innerRadius(function (d) { return Math.sqrt(d.y0) })
        .outerRadius(function (d) { return Math.sqrt(d.y1) })
        .startAngle(function (d) { return d.x0 })
        .endAngle(function (d) { return d.x1 })
      // 绘图
      let svg = d3.select('#partitionR')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
      let g = svg.selectAll('g')
        .data(partitionData)
        .enter()
        .append('g')
        .attr('transform', 'translate(200,200)')
      g.append('path')
        .attr('display', function (d) {
          return d.depth ? null : 'none'
        })// 是否绘制中心,留白好看一些
        .attr('d', arc)
        .style('stroke', '#ccc')
        .style('fill', function (d) { return color(d.data.name) })
      g.append('text')
        .attr('transform', function (d, i) {
          if (i !== 0) {
            let r = (d.x0 + d.x1) / 2
            let angle = Math.PI / 2
            r += r < Math.PI ? (angle - Math.PI) : angle
            r *= 180 / Math.PI
            return 'translate(' + arc.centroid(d) + ')' + 'rotate(' + r + ')'
          }
        })
        .text(function (d) { return d.data.name })
        .attr('font-size', function (d) { return 12 - d.depth + 'px' }) // 文字按深度缩小
        .attr('dy', '.5em')
        .attr('dx', function (d) { return -d.data.name.length / 2 + 'em' }) // 文字居中
    },
    stack () {
      let width = 400
      let height = 400
      let padding = {
        left: 40,
        right: 10,
        top: 20,
        bottom: 20
      }
      let margin = 10 // 控制堆栈图的间隙
      let data = [
        {month: '2015-1-1', apples: 3840, bananas: 1920, cherries: 960, oranges: 300},
        {month: '2015-1-2', apples: 1600, bananas: 1440, cherries: 960, oranges: 400},
        {month: '2015-1-3', apples: 640, bananas: 960, cherries: 640, oranges: 200},
        {month: '2015-1-4', apples: 320, bananas: 480, cherries: 640, oranges: 500}
      ]
      // 数据转换器
      let stack = d3.stack()
        .keys(['apples', 'bananas', 'cherries', 'oranges'])
        .order(d3.stackOrderNone)// 使用原始数据的顺序不进行顺序调整
        .offset(d3.stackOffsetNone)
      let stackData = stack(data)
      let colorZ = d3.scaleOrdinal(d3.schemeCategory10) // 这里color其实是第三维度，他代表水果种类
      // x比例尺
      let xScale = d3.scaleBand()
        .range([0, width - padding.left - padding.right])
      // x值域，其实就是月份
      xScale.domain(data.map((d) => d.month))
      let yScale = d3.scaleLinear()
        .range([height - padding.top - padding.bottom, 0])
      // y值域，求的是转化后的数组的最后一个数组中的第二个元素的最大值，绕的我都有点晕，最大值怎么求可以自己写function
      yScale.domain([0, d3.max(stackData[stackData.length - 1], (item) => item[1])])

      // x轴和y轴
      let xAxis = d3.axisBottom().scale(xScale)
      let yAxis = d3.axisLeft(yScale)
      // 绘图
      let svg = d3.select('#stack')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
      // 添加x轴
      svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + padding.left + ',' + (height - padding.bottom) + ')')
        .call(xAxis)
      // 添加y轴
      svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
        .call(yAxis)
      // 将二维数组的第一维剥离，打散成n列
      let rectContainer = svg.selectAll('rectContainer')
        .data(stackData)
        .enter()
        .append('g')
        .attr('class', 'rectContainer')
        .attr('fill', (d, i) => { return colorZ(d.key) })
      // 渲染每一列
      rectContainer.selectAll('rect')
        .data((d) => d)
        .enter()
        .append('rect')
        .attr('x', (d) => { return xScale(d.data.month) + padding.left + margin / 2 })
        .attr('y', (d) => { return yScale(d[1]) + padding.top })
        .attr('width', (d) => { return xScale.bandwidth() - margin })
        .attr('height', (d) => { return height - padding.top - padding.bottom - yScale(d[1] - d[0]) })
        .attr('stroke', '#ccc')

      // 添加描述
      svg.selectAll('circle')
        .data(['apples', 'bananas', 'cherries', 'oranges'])
        .enter()
        .append('circle')
        .attr('cx', (d) => { return width - padding.right - 80 })
        .attr('cy', (d, i) => { return padding.top + 25 * i })
        .attr('r', '6')
        .attr('fill', (d) => { return colorZ(d) })
      let texts = svg.selectAll('textContainer')
        .data(['apples', 'bananas', 'cherries', 'oranges'])
        .enter()
        .append('g')
        .attr('class', 'textContainer')
      texts.append('text')
        .attr('x', (d) => { return width - padding.right - 60 })
        .attr('y', (d, i) => { return padding.top + 25 * i })
        .attr('dy', '0.32em')
        .text((d) => d)
        .attr('fill', (d) => colorZ(d))
    },
    treemap () {
      const width = 400
      const height = 400
      const treeData = {
        'name': '中国',
        'children': [
          {
            'name': '浙江',
            'children':
            [
              {'name': '杭州', 'gdp': 1234},
              {'name': '宁波', 'gdp': 3334},
              {'name': '温州', 'gdp': 2000},
              {'name': '绍兴', 'gdp': 1002}
            ]
          },
          {
            'name': '广西',
            'children': [
              {
                'name': '桂林',
                'children':
                [
                  {'name': '秀峰区', 'gdp': 2131},
                  {'name': '叠彩区', 'gdp': 2015},
                  {'name': '象山区', 'gdp': 988},
                  {'name': '七星区', 'gdp': 756}
                ]
              },
              {'name': '南宁', 'gdp': 3699},
              {'name': '柳州', 'gdp': 4511},
              {'name': '防城港', 'gdp': 2325}
            ]
          },
          {
            'name': '黑龙江',
            'children': [
              {'name': '哈尔滨', 'gdp': 784},
              {'name': '齐齐哈尔', 'gdp': 885},
              {'name': '牡丹江', 'gdp': 1254},
              {'name': '大庆', 'gdp': 3240}
            ]
          },
          {
            'name': '新疆',
            'children':
              [
                {'name': '乌鲁木齐', 'gdp': 2456},
                {'name': '克拉玛依', 'gdp': 1015},
                {'name': '吐鲁番', 'gdp': 998},
                {'name': '哈密', 'gdp': 654}
              ]
          }
        ]
      }
      const color = d3.scaleOrdinal(d3.schemeCategory10)
      // 数据转化
      const treemap = d3.treemap().size([width, height])
      const root = d3.hierarchy(treeData).sum((d) => d.gdp)
      const tree = treemap(root) // 获取treemap结构树
      const leaves = tree.leaves() // 将生成的树形结构转化成叶子节点数组
      // 用叶子节点数组绘图
      const svg = d3.select('#treemap')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
      const g = svg.selectAll('.rects')
        .data(leaves)
        .enter()
        .append('g')
        .attr('class', 'rects')
      // 添加矩阵
      g.append('rect')
        .attr('x', (d) => d.x0)
        .attr('y', (d) => d.y0)
        .attr('width', (d) => (d.x1 - d.x0))
        .attr('height', (d) => (d.y1 - d.y0))
        .style('fill', (d) => color(d.parent.data.name))
        .style('stroke', '#cccccc')
      // 添加描述
      g.append('text')
        .attr('x', (d) => (d.x1 - d.x0) / 2 + d.x0)
        .attr('y', (d) => (d.y1 - d.y0) / 2 + d.y0)
        .attr('dx', (d) => { return -d.data.name.length / 2 + 'em' })
        .attr('dy', (d) => { return '-0.5em' })
        .text((d) => { return d.data.name })
        .attr('font-size', (d) => { return 14 - d.depth + 'px' })
        .attr('fill', '#f0f0f0')
      g.append('text')
        .attr('x', (d) => (d.x1 - d.x0) / 2 + d.x0)
        .attr('y', (d) => (d.y1 - d.y0) / 2 + d.y0)
        .attr('dx', (d) => { return -(d.value.toString().length + 2) / 4 + 'em' })
        .attr('dy', (d) => { return '1em' })
        .text((d) => { return '(' + d.value + ')' })
        .attr('font-size', (d) => { return 14 - d.depth + 'px' })
        .attr('fill', '#ffffff')
    },
    geomap () {
      const width = 1000
      const height = 1000
      const svg = d3.select('#geomap')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
      // 定义地图投影
      const projection = d3.geoMercator()
        .center([106, 35])
        .scale(880)
        .translate([width / 2, height / 2])
      // 定义地理路径生成器
      const path = d3.geoPath()
        .projection(projection)
      // 颜色比例尺
      const color = d3.scaleOrdinal(d3.schemeCategory20)
      // 读取地图文件 需要搭建本地服务器
      d3.json('/static/mapJson/china.json', function (error, root) {
        if (error) { return console.error(error) }
        // 绘制路径
        console.log(root.features)
        svg.selectAll('path')
          .data(root.features)
          .enter()
          .append('path')
          .attr('stroke', '#ccc')
          .attr('stroke-width', 1)
          .attr('fill', function (d, i) {
            return color(i)
          })
          .attr('d', path)
          .on('mouseover', function (d, i) {
            d3.select(this)
              .attr('fill', 'yellow')
            // 是否选择鼠标移入显示省份，已注释
            // svg
            //   .append('text')
            //   .attr('x', () => projection(d.properties.cp)[0])
            //   .attr('y', () => projection(d.properties.cp)[1])
            //   .attr('dx', () => -d.properties.name.length / 2 + 'em')
            //   .attr('dy', '-0.5em')
            //   .style('font-size', '12px')
            //   .attr('class', 'label')
            //   .text(() => d.properties.name)
          })
          .on('mouseout', function (d, i) {
            d3.select(this)
              .attr('fill', color(i))
            // d3.selectAll('.label').remove()
          })
        // 显示所有省份
        let textContainer = svg.selectAll('.texts')
          .data(root.features)
          .enter()
          .append('g')
          .attr('class', 'texts')
        textContainer.append('text')
          .attr('x', (d) => projection(d.properties.cp)[0])
          .attr('y', (d) => projection(d.properties.cp)[1])
          .attr('dx', (d) => -d.properties.name.length / 2 + 'em')
          .attr('dy', '0.5em')
          .style('font-size', '11px')
          .text((d) => d.properties.name)
      })
    }
  },
  watch: {
    barData () {
      this.bar()
    },
    lineData () {
      this.line()
    }
  },
  mounted () {
    this.bar()
    this.line()
    this.area()
    this.pie()
    this.forceDirected()
    this.chordDiagram()
    this.treeDiagram()
    this.clusterDiagram()
    this.clusterCircle()
    this.bundle()
    this.pack()
    this.histogram()
    this.partition()
    this.partitionR()
    this.stack()
    this.treemap()
    this.geomap()
  }
}
</script>
<style lang="less">
#svgContainer{
  width: 100%;
  height: 100%;
  .every{
    width: 400px;
    height: 425px;
    margin:15px;
    float: left;
    h3{
      margin:0;
      .button{
        float: right;
        margin-right: 20px;
        font-size: 14px;
        cursor: pointer;
        padding: 2px 8px;
        border:1px solid #ccc;
        background: yellowgreen;
        border-radius: 4px;
        &:hover{
          background: violet;
        }
      }
    }
    .svg{
      width: 400px;
      height: 400px;
    }
  }
  .map{
    width: 1000px;
    height: 1025px;
    margin:15px;
    float: left;
    h3{
      margin: 0;
    }
    .svg{
      width: 1000px;
      height:1000px;
    }
  }
}
// 折线动画
.line{
    stroke-dasharray: 700;             /* //设置虚线的间隔长度 */
    stroke-dashoffset: 700;             /* 设置线段偏移长度 */
    animation: dash 2s forwards;
}
@keyframes dash {
  0%{
    stroke-dashoffset:700;
  }
  100%{
    stroke-dashoffset: 0;
  }
}

</style>
