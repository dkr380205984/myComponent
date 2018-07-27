<template>
  <div class="container clearfix">
    <div class="logo"><img src="/static/img/logo2.png" /></div>
    <leftMenu></leftMenu>
    <div class="rightContent">
      <div class="title">edit组件</div>
      <div class="use">提供一个可供编辑的文字</div>
      <div class="cmp">
        <span class="cmp_title">基本用法</span>
        <div class="cmp_main">
         <edit :value="val"
          @edited=save
          :max = 20
          :min = 2
         ></edit>
        </div>
        <span class="cmp_title">示例代码</span>
        <div class="cmp_code">
          <pre>
&lt;edit :value=&quot;val&quot;
@edited=save
:max = 20
:min = 2
&gt;&lt;/edit&gt;</pre>
        </div>
        <span class="cmp_title">参数文档</span>
        <div class="cmp_main">
          文档的结构正在想ｉｎｇ．．．
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import './edit.less'
import '../common.less'
import alert from '../../components/alert/alert.js'
// 引用公共组件左边菜单栏
import leftMenu from '../../components/leftMenu/leftMenu.vue'
export default {
  components: {
    leftMenu
  },
  created: function () {
  },
  data: function () {
    return {
      val: '这是一段话，会在控制台打印警告，因为参数不对'
    }
  },
  methods: {
    save: function (val) {
      alert('编辑成功，新的值为：' + val)
      this.val = val
    }
  }
}

</script>
