<template>
  <div class="container clearfix">
    <div class="logo"><img src="/static/img/logo2.png" /></div>
    <leftMenu></leftMenu>
    <div class="rightContent">
      <div class="title">弹性布局组件</div>
      <div class="use">用于构建弹性布局。</div>
      <div class="cmp">
        <span class="cmp_title">基本用法</span>
        <div class="cmp_main">
          <flexBox :options = 'foptions'></flexBox>
        </div>
        <span class="cmp_title">示例代码</span>
        <div class="cmp_code">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import './flexBox.less'
import '../common.less'
import '../markdown.css'
// 引用公共组件左边菜单栏
import leftMenu from '../../components/leftMenu/leftMenu.vue'
export default {
  components: {
    leftMenu
  },
  data: () => ({
    foptions: {
      height: '',
      fontPosition: '',
      fontColor: '',
      fontSize: '',
      matrix: [
        [{
          flex: 1,
          bgColor: '',
          description: '同案同调',
          fontColor: 'white',
          bgImg: '../static/img/icon_quality.png'
        }, {
          flex: 1,
          bgColor: '',
          description: 'insight++',
          fontColor: ''
        }],
        [{
          flex: 1,
          bgColor: '',
          description: '文书质量',
          fontColor: 'green'
        }, {
          flex: 1,
          bgColor: '',
          description: '工作质量',
          fontColor: ''
        }, {
          flex: 1,
          bgColor: '',
          description: '哈哈哈哈',
          fontColor: 'blue'
        }],
        [{
          flex: 1,
          bgColor: '',
          description: '文书质量',
          fontColor: 'green'
        }, {
          flex: 2,
          bgColor: '',
          description: '工作质量',
          fontColor: 'yellow'
        }, {
          flex: 3,
          bgColor: '',
          description: '哈哈哈哈',
          fontColor: 'blue'
        }],
        [{
          flex: 1.5,
          bgColor: '',
          description: '文书质量',
          fontColor: 'green'
        }, {
          flex: 2,
          bgColor: '',
          description: '工作质量',
          fontColor: 'yellow'
        }, {
          flex: 2,
          bgColor: '',
          description: '哈哈哈哈',
          fontColor: 'blue'
        }, {
          flex: 1.5,
          bgColor: '',
          description: '哈哈哈哈',
          fontColor: 'blue'
        }]
      ]
    }
  })
}

</script>
