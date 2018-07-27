<template>
  <div class="enjoy_alert"
  :class="{
    enjoy_alert_create:ifShow===true,
    enjoy_alert_destroy:ifShow===false,
    enjoy_alert_success:type==='success',
    enjoy_alert_error:type==='error',
    enjoy_alert_warning:type==='warning',
    enjoy_alert_center:ifCenter === true,
  }">
    <div>
      <img v-if = "imgSrc!==''" class="icon"  :src='imgSrc'/>
      <img v-if = "imgSrc ===''&& type ==='success'" class="icon"  src='/static/img/success.png'/>
      <img v-if = "imgSrc ===''&& type ==='error'" class="icon"  src='/static/img/error.png'/>
      <img v-if = "imgSrc ===''&& type ==='warning'" class="icon"  src='/static/img/warning.png'/>
      <span>{{message}}</span>
    </div>
  </div>
</template>

<script>
import './alert.less'
export default {
  data: function () {
    return {
      message: '',
      type: '', // 是否符合基本类型
      time: 1000, // 显示时间
      ifShow: '', // 控制移入移出,非暴露参数
      ifCenter: false, // 控制文字是否居中,默认居左
      imgSrc: '' // 自定义icon的Src
    }
  },
  mounted: function () {
    var _this = this
    // 显示时间=淡入动画600 + 定格时间 + 淡出动画600
    setTimeout(function () {
      _this.ifShow = false
      // 调用完之后销毁组件，销毁之前要先执行动画
      setTimeout(function () {
        _this.$el.parentNode.removeChild(_this.$el)
      }, 600)
    }, _this.time + 600)
  }
}
</script>
