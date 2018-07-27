<template>
  <div :style="{height:height*lineNum + 'px'}" class="rollScreen_container" id ="rollScreen_container">
    <ul class="rollScreen_list" :style = {transform:transform} :class="{rollScreen_list_unanim:num===0}">
      <li class="rollScreen_once" v-for="(item,index) in contentArr" :key=index :style="{height:height+'px',lineHeight:height+'px'}">
        <span>{{item}}</span>
      </li>
      <li class="rollScreen_once" v-for="(item,index) in contentArr" :key=index+contentArr.length :style="{height:height+'px',lineHeight:height+'px'}">
        <span>{{item}}</span>
      </li>
      <slot name="slide"></slot>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      default: 40,
      type: Number,
      required: true
    }, // 每行元素的高度
    lineNum: {
      default: 5,
      type: Number
    }, // 显示行数
    contentArr: {
      default: null,
      type: Array
    }, // 简单文本轮播
    dLength: {
      default: null,
      type: Number
    }, // 自定义插槽内容的时候必须传自定义内容的长度
    time: {
      default: 3000,
      type: Number // 定义轮播切换速度
    }
  },
  data: function () {
    return {
      num: 0,
      loopTime: this.time
    }
  },
  computed: {
    transform: function () {
      return 'translateY(-' + this.num * this.height + 'px)'
    }
  },
  beforeCreate: function () {
  },
  created: function () {
    let _this = this
    if ((this.contentArr != null && this.contentArr.length < this.lineNum) || (this.dLength != null && this.dLength < this.lineNum)) {
      console.error('轮播显示行数不能超过数据总行数')
    } else {
      // 先判断轮播切换速度，如果小于动画播放时间则提示切换速度过快
      if (_this.loopTime <= 1000) {
        console.warn('轮播切换速度过快，至少大于1s')
        _this.loopTime = 1000
      }
      // 两种轮播 第一种contentArr！= null 第二种自定义插槽
      if (_this.contentArr !== null) {
        setInterval(function () {
          if (_this.num !== _this.contentArr.length) {
            _this.num++
          } else {
            _this.num = 0
            setTimeout(function () {
              _this.num++
            }, 50)
          }
        }, _this.loopTime)
      } else if (_this.dLength !== null) {
        setInterval(function () {
          if (_this.num !== _this.dLength) {
            _this.num++
          } else {
            _this.num = 0
            setTimeout(function () {
              _this.num++
            }, 50)
          }
        }, _this.loopTime)
      } else if (_this.dLength === null && _this.dLength === null) {
        console.error('contentArr 和 dLength 均为空，rollScreen组件运行出错')
      }
    }
  },
  mounted: function () {
    // 复制一份slot的节点，如果直接用同名slot会报错
    if (this.dLength !== null) {
      for (let i = 0; i < this.dLength; i++) {
        this.$el.childNodes[0].appendChild(this.$slots.slide[i].elm.cloneNode(true))
      }
    }
  }
}
</script>

<style>
  .rollScreen_container{
    display: inline-block;
    position:relative;
    overflow: hidden;
  }
  .rollScreen_list{
    transition: 1s linear;
    padding:0;
    margin:0;
    list-style: none;
  }
  .rollScreen_list_unanim{
    transition: none
  }
  .rollScreen_once{
    list-style: none;
  }
</style>
