<template>
  <div class="sideNavigation_container">
    <ul :style="{width:receieveOption.size + 'px',fontSize:receieveOption.font + 'px'}" class="ul clearfix">
      <li
        v-for="(item,index) in receieveOption.navs" :key = "index" class="li clearfix"
        @mouseenter="doSomething($event,'mouseenter')"
        @mouseleave="doSomething($event,'mouseleave')"
        :style="{width:receieveOption.size + 'px',height:receieveOption.size + 'px',marginTop:receieveOption.margin + 'px'}">
        <div :style="{width:receieveOption.size + 'px',height:receieveOption.size + 'px'}" class="i_container">
          <img :style="{width:receieveOption.size + 'px',height:receieveOption.size + 'px'}" class="icon" src="/static/img/icon_1.png" />
          <span :style="{right:receieveOption.size + 'px',height:receieveOption.size + 'px',width:item.description.length + 'em',lineHeight:receieveOption.size + 'px'}" class="content">{{item.description}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import './sideNavigation.less'
export default {
  props: ['options'],
  data () {
    return {
      receieveOption: this.options
    }
  },
  created () {

  },
  methods: {
    doSomething (ev, fn) {
      let dom = ev.target
      if (fn === 'mouseenter') {
        // 动态计算宽度 图片切换
        dom.style.width = dom.firstChild.lastChild.offsetWidth + dom.firstChild.firstChild.offsetWidth + 'px'
        dom.firstChild.firstChild.src = '/static/img/icon_1_y.png'
      } else {
        dom.style.width = '28px'
        dom.firstChild.firstChild.src = '/static/img/icon_1.png'
      }
    }
  }
}
</script>

<style>

</style>
