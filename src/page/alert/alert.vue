<template>
  <div class="container clearfix">
    <div class="logo"><img src="/static/img/logo2.png" /></div>
    <leftMenu></leftMenu>
    <div class="rightContent">
      <div class="title">alert组件</div>
      <div class="use">用于页面中展示重要的提示信息。</div>
      <div class="cmp">
        <span class="cmp_title">基本用法</span>
        <div class="cmp_main">
          <button @click="alert('normal')">普通</button>
          <button @click="alert('success')">成功</button>
          <button @click="alert('warning')">警告</button>
          <button @click="alert('error')">错误</button>
          <button @click="alert('other')">自定义</button>
        </div>
        <span class="cmp_title">示例代码</span>
        <div class="cmp_code">
<pre class="prettyprint"><code class=" hljs xml"><span class="hljs-tag">&lt;<span class="hljs-title">button</span> @<span class="hljs-attribute">click</span>=<span class="hljs-value">"alert('normal')"</span>&gt;</span>普通<span class="hljs-tag">&lt;/<span class="hljs-title">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-title">button</span> @<span class="hljs-attribute">click</span>=<span class="hljs-value">"alert('success')"</span>&gt;</span>成功<span class="hljs-tag">&lt;/<span class="hljs-title">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-title">button</span> @<span class="hljs-attribute">click</span>=<span class="hljs-value">"alert('warning')"</span>&gt;</span>警告<span class="hljs-tag">&lt;/<span class="hljs-title">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-title">button</span> @<span class="hljs-attribute">click</span>=<span class="hljs-value">"alert('error')"</span>&gt;</span>错误<span class="hljs-tag">&lt;/<span class="hljs-title">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-title">button</span> @<span class="hljs-attribute">click</span>=<span class="hljs-value">"alert('other')"</span>&gt;</span>自定义<span class="hljs-tag">&lt;/<span class="hljs-title">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-title">script</span>&gt;</span><span class="javascript">
export <span class="hljs-keyword">default</span> {
  data: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> {</span>
    <span class="hljs-keyword">return</span> {
    }
  },
  methods: {
    alert: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(val)</span> {</span>
      <span class="hljs-keyword">if</span> (val === <span class="hljs-string">'normal'</span>) {
        <span class="hljs-keyword">this</span>.$alert(<span class="hljs-string">'这是一条普通的alert的默认样式'</span>)
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (val === <span class="hljs-string">'success'</span>) {
        <span class="hljs-keyword">this</span>.$alert({
          message: <span class="hljs-string">'这是一条成功样式'</span>,
          type: <span class="hljs-string">'success'</span>
        })
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (val === <span class="hljs-string">'error'</span>) {
        <span class="hljs-keyword">this</span>.$alert({
          message: <span class="hljs-string">'这是一条错误样式'</span>,
          type: <span class="hljs-string">'error'</span>
        })
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (val === <span class="hljs-string">'warning'</span>) {
        <span class="hljs-keyword">this</span>.$alert({
          message: <span class="hljs-string">'这是一条警告样式'</span>,
          type: <span class="hljs-string">'warning'</span>
        })
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">this</span>.$alert({
          message: <span class="hljs-string">'这是一条自定义样式'</span>,
          ifCenter: <span class="hljs-literal">true</span>,
          imgSrc: <span class="hljs-string">'/static/img/money.png'</span>,
          time: <span class="hljs-number">3000</span>
        })
      }
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-title">script</span>&gt;</span></code></pre>
        </div>
        <span class="cmp_title">参数文档</span>
        <div class="cmp_main">
          <table class="cmp_par_table">
            <thead>
              <tr>
                <th class="">参数</th>
                <th class="">说明</th>
                <th class="">类型</th>
                <th class="">可选值&nbsp;（是否必须）</th>
                <th class="">默认值</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>msg</td>
                <td>可以只传一个字符串，方便使用</td>
                <td>String</td>
                <td>—&nbsp;(不一定)</td>
                <td>—</td>
              </tr>
              <tr>
                <td>message</td>
                <td>放入对象中，不同于字符串的写法</td>
                <td>String</td>
                <td>—&nbsp;(不一定)</td>
                <td>—</td>
              </tr>
              <tr>
                <td>ifCenter</td>
                <td>文字是否居中</td>
                <td>Boolean</td>
                <td>true/false(否)</td>
                <td>false</td>
              </tr>
              <tr>
                <td>time</td>
                <td>显示延时，不包括动画时间(600毫秒)</td>
                <td>Number</td>
                <td>—&nbsp;(否)</td>
                <td>1000</td>
              </tr>
              <tr>
                <td>type</td>
                <td>基本类型，可以自定义类型</td>
                <td>String</td>
                <td>normal/success/error/warning&nbsp;(否)</td>
                <td>normal</td>
              </tr>
              <tr>
                <td>imgSrc</td>
                <td>如果要自定义icon，可选icon图片</td>
                <td>String</td>
                <td>—&nbsp;(否)</td>
                <td>—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import './alert.less'
import '../common.less'
import '../markdown.css'
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
    }
  },
  methods: {
    alert: function (val) {
      if (val === 'normal') {
        this.$alert('这是一条普通的alert的默认样式')
      } else if (val === 'success') {
        this.$alert({
          message: '这是一条成功样式',
          type: 'success'
        })
      } else if (val === 'error') {
        this.$alert({
          message: '这是一条错误样式',
          type: 'error'
        })
      } else if (val === 'warning') {
        this.$alert({
          message: '这是一条警告样式',
          type: 'warning'
        })
      } else {
        this.$alert({
          message: '这是一条自定义样式',
          ifCenter: true,
          imgSrc: '/static/img/money.png',
          time: 3000
        })
      }
    }
  }
}

</script>
