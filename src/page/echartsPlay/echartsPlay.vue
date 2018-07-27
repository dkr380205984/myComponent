<template>
  <div class="echarts_container">
    <echarts :style="{'width':'800px','height':'600px'}" :options="polar" @datazoom = changed></echarts>
  </div>
</template>

<script>
import echarts from 'vue-echarts'
import genJson4shanghai from './genJson4shanghai'
import ditu from './jicengsfdsjzpt_ditu'
echarts.registerMap('shanghai', genJson4shanghai)
export default {
  components: {
  },
  data: function () {
    let ditusj = ditu
    let dataFilter = []
    for (let i = 0; i < ditusj.length; i++) {
      dataFilter.push({
        name: ditusj[i].diqu,
        value: [ditusj[i].lat, ditusj[i].lon, ditusj[i].shuliang]
      })
    }
    return {
      polar: {
        title: {
          text: '这是一个echarts play',
          show: true,
          link: 'https://www.baidu.com',
          target: 'blank', // 配合链接使用，指定窗口打开方式，当前self，blank新窗口
          padding: [15, 0, 0, 0], // 主标题padding
          left: 'center',
          itemGap: 15, // 主副标题距离
          textStyle: {
            color: 'rgb(232, 134, 123)',
            fontSize: '16',
            align: 'left',
            verticalAlign: 'middle',
            width: 800
          },
          subtext: '我是副标题',
          subtextStyle: {
            color: '#ccc',
            align: 'right'
          }
        },
        geo: {
          map: 'shanghai',
          label: {
            emphasis: {
              show: false
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: 'rgba(1,24,84,1)',
              borderColor: '#ccc'
            },
            emphasis: {
              areaColor: '#2a333d'
            }
          }
        },
        series: [
          {
            name: 'pm2.5',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: dataFilter,
            symbolSize: function (val) {
              return val[2] / 120
            },
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#ddb926'
              }
            }
          },
          {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: dataFilter.sort(function (a, b) {
              return b.value - a.value
            }).slice(0, 6),
            symbolSize: function (val) {
              return val[2] / 100
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#f4e925',
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            zlevel: 1
          },
          {
            name: '点',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'pin',
            symbolSize: function (val) {
              return val[2] / 100
            },
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#fff',
                  fontSize: 9
                }
              }
            },
            itemStyle: {
              normal: {
                color: '#F62157' // 标志颜色
              }
            },
            zlevel: 6,
            data: dataFilter
          }]

      }

    }
  },
  methods: {
    changed (val) {
      console.log(val)
    }
  }
}
</script>

<style>
.echarts_container{
  width:800px;
  height: 600px;
  margin:40px auto;
}
</style>
