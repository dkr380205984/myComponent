<template>
  <div id="pie">
    <button class="button" @click="changeData">点击触发数据更新</button>
  </div>
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
        value: 70.8
      }, {
        name: '其他',
        value: 10.8
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
    },
    changeData () {
      let _this = this
      let randomData = [{
        name: '小米',
        value: parseInt(Math.random() * 100)
      }, {
        name: '华为',
        value: parseInt(Math.random() * 100)
      }, {
        name: '联想',
        value: parseInt(Math.random() * 100)
      }, {
        name: '三星',
        value: parseInt(Math.random() * 100)
      }, {
        name: '苹果',
        value: parseInt(Math.random() * 100)
      }, {
        name: '其他',
        value: parseInt(Math.random() * 100)
      } ]
      let pie = d3.pie()
      // 这里我特地设置了数据不需要排序，因为在数据更新的时候，由于不能确定每个数值的排序位置，他取到的颜色数组会发生改变，这样就实现不了平滑过渡
        .sort(null)
        .value((d) => d.value)(randomData)
      let arcs = d3.selectAll('.arcs').data(pie)
      let path = arcs.selectAll('path').data((d) => {
        let arr = []
        for (let i = 0; i < 100; i++) {
          let copy = _this.deepClone(d)
          copy.endAngle = copy.endAngle - 1 / 360 * Math.PI // 如果你不希望你的圆环看起来像一个光盘，你可以这么处理，给每段弧留个起始空隙
          copy.startAngle = copy.startAngle + 1 / 360 * Math.PI
          let delt = (copy.endAngle - copy.startAngle) / 100
          copy.startAngle = copy.startAngle + delt * i
          copy.endAngle = copy.startAngle + delt
          arr.push(copy)
        }
        return arr
      })
      path.transition()
        .duration(1000)
        // 如果直接使用attr('d')的过渡方式会出现不能平滑过渡的情况
        // .attr('d', function (d) {
        //   return arc(d)
        // })
        .attrTween('d', function (d, i) {
          // 这个函数要拿到原来的角度和新的角度，传给过渡函数
          // 原来的数据要拿到，只能再求一次，当然你也可以保留元数据，求得新的数据，这都无关紧要
          let pie = d3.pie()
            .sort(null)
            .value((d) => d.value)(_this.data)
          let copy = _this.deepClone(pie[d.index])
          copy.endAngle = copy.endAngle - 1 / 360 * Math.PI
          copy.startAngle = copy.startAngle + 1 / 360 * Math.PI
          let delt = (copy.endAngle - copy.startAngle) / 100
          copy.startAngle = copy.startAngle + delt * i
          copy.endAngle = copy.startAngle + delt
          let arc = d3.arc()
            .innerRadius(120) // 设置环的内半径,为0的时候则是圆
            .outerRadius(535 / 2.8) // 设置环的外半径,用计算得到的最大值除以>2的值
          // 设置过渡函数的起始角度分别为旧的和新的
          let interpolate = d3.interpolate({startAngle: copy.startAngle, endAngle: copy.endAngle}, {startAngle: d.startAngle, endAngle: d.endAngle})
          return function (t) {
            return arc(interpolate(t))
          }
        })
      // 完成动画之后把数据更新成change后的，用setTimeout管理异步操作很蠢，后面封装的时候用pormise
      setTimeout(function () {
        _this.data = randomData
      }, 1000)
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
    // 设置颜色数组，这个自定义的好看一些
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
      .sort(null)
      .value((d) => d.value)(_this.data)
    // 先绘制一下图例
    padTop += 40 // 先预留40像素的高度放图例
    let legend = d3.select('#pie')
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
      .data(pie)
      .enter()
      .append('div')
      .attr('class', 'legend')
    legend.html(function (d, i) {
      let colors = 'to right' + ',' + color[d.index] + ',' + color[d.index + 1]
      return `<div class="chart" style="background: linear-gradient(${colors})"></div><span>${d.data.name}</span>`
    })
    // 给图例添加点击事件
      .on('click', function (d) {
      // 在这里可以触发一个回调函数,让用户自己去操作数据,
      // 这里的操作有点复杂,在封装的时候会把这个点击操作完善一下,实现echarts的效果
        console.log(d)
      })
    // 创建弧生成器
    // 计算一下外半径的最大值,取宽高中的最小值
    let outerRadius = d3.min([width - padLeft - padRight, height - padTop - padBottom])
    let arc = d3.arc()
      .innerRadius(120) // 设置环的内半径,为0的时候则是圆
      .outerRadius(outerRadius / 2.8) // 设置环的外半径,用计算得到的最大值除以>2的值
    // 用创建的弧生成器和已经通过pie方法得到数据绘制路径
    // 第一步，创建弧的container
    let path = svg.selectAll('.arcs')
      .data(pie)
      .enter()
      .append('g')
      .attr('class', 'arcs')
      .attr('transform', 'translate(' + (padLeft + (width - padLeft - padRight) / 2) + ',' + (padTop + (height - padTop - padBottom) / 2) + ')')
    // 第二步，将每个弧分很多段，实现渐变效果
    path.selectAll('path')
    // 这里我将原来的数据的起始角度拆分成10份，返回一个新的数组
      .data((d, i) => {
        let arr = []
        for (let i = 0; i < 100; i++) {
          let copy = _this.deepClone(d)
          copy.endAngle = copy.endAngle - 1 / 360 * Math.PI // 如果你不希望你的圆环看起来像一个光盘，你可以这么处理，给每段弧留个起始空隙
          copy.startAngle = copy.startAngle + 1 / 360 * Math.PI
          let delt = (copy.endAngle - copy.startAngle) / 100
          copy.startAngle = copy.startAngle + delt * i
          copy.endAngle = copy.startAngle + delt
          arr.push(copy)
        }
        return arr
      })
      .enter()
      .append('path')
      .transition()
      .delay(function (d, i) {
        // return i * 15 // 这种动画比较容易想到，但看起来似乎没有后面一种好看，可以试试，比较传统
        return (i + (d.index * 100)) * 2 // 这里的动画处理是重点，每一段弧的起始时间需要加上d.index*10，才能实现环环相扣的动画效果
      })
      .attr('fill', function (d, i) {
        // 创建一个线性比例尺
        let linear = d3.scaleLinear()
          .domain([0, 100])
          .range([0, 1])
        // compute用d3.interpolate方法将某个颜色区间内的颜色均分划分
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
    // 给每段添加鼠标交互，注意我用了mouseenter和mouseleave，而不是mouseover和mouseout，这样可以防止事件多次触发
    let arcHover = d3.arc()
      .innerRadius(outerRadius / 2.8) // 设置环的内半径,为初始环的外半径
      .outerRadius(outerRadius / 2.5) // 设置环的外半径,稍微大于初始环的外半径
    // 这里的设计思路就是在外面加一层环，看起来像弹出来，其实是两层
    path.on('mouseenter', function (d) {
      // 给中间加文字
      svg.data([d])
        .append('text')
        .attr('class', 'text')
        .text(function (d) { return d.data.name })
        .attr('x', padLeft + (width - padLeft - padRight) / 2)
        .attr('y', padTop + (height - padTop - padBottom) / 2)
        .attr('dx', function (d) {
          return -d.data.name.length / 2 + 'em'
        })
        .attr('dy', '0.5em')
        .attr('style', 'font-size:28px;font-weight:bold;letter-spacing:3px')
        .attr('fill', function (d) { return color[d.index] })
      // 添加过渡动画
      d3.select(this)
        .selectAll('.hover')
        .data((d, i) => {
          let arr = []
          for (let i = 0; i < 100; i++) {
            let copy = _this.deepClone(d)
            copy.endAngle = copy.endAngle - 1 / 360 * Math.PI // 如果你不希望你的圆环看起来像一个光盘，你可以这么处理，给每段弧留个起始空隙
            copy.startAngle = copy.startAngle + 1 / 360 * Math.PI
            let delt = (copy.endAngle - copy.startAngle) / 100
            copy.startAngle = copy.startAngle + delt * i
            copy.endAngle = copy.startAngle + delt
            arr.push(copy)
          }
          return arr
        })
        .enter()
        .append('path')
        .attr('class', 'hover')
        .attr('fill', function (d, i) {
          // 创建一个线性比例尺
          let linear = d3.scaleLinear()
            .domain([0, 100])
            .range([0, 1])
          // compute用d3.interpolate方法将某个颜色区间内的颜色均分划分
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
        .transition()
        .duration(200)
        .ease(d3.easeBounceOut)
        .attr('d', function (d, i) { return arcHover(d) })
    })
    // 添加tooltips
    let toolTips = d3.select('body').append('div')
      .attr('class', 'toolTips')
      .style('opacity', 0)
      .style('position', 'absolute')
    path.on('mousemove', function (d) {
      let html = `<div class="clearfix"><div class="border" style="background:${color[d.index]}"></div><span>${d.data.name}：${d.data.value}</span></div>`
      let mouseX = d3.event.clientX + 30
      let mouseY = d3.event.clientY - 30
      // 如果你的style用了scoped，那你的样式应该写到App.vue中去，否则插入元素的样式不会生效
      toolTips.html(`<div class="tolTp">${html}</div>`)
        .style('opacity', 1)
        .style('left', mouseX + 'px')
        .style('top', mouseY + 'px')
    })
    // 这里没有做动画把他弹回去，没什么必要，眼睛会帮我们缓存一部分图像，看起来也ok
    path.on('mouseleave', function (d) {
      d3.select(this)
        .selectAll('.hover')
        .remove()
      svg.select('.text').remove()
      toolTips.style('opacity', 0)
      toolTips.html('')
    })
  }
}
</script>

<style lang="less">
.button{
  position: absolute;
  bottom: -40px;
  left:-1px;
  border:1px solid #cccccc;
  padding: 8px 12px;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  &:hover{
    color: yellowgreen;
  }
}
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
