<template>
  <div class="digitalRolling_container" :style = "{height:height+'px'}">
    <i v-if="types === 'image'" v-for="(item,index) in numberArr" id="digitalRolling_num" class="digitalRolling_num" :key=index
    :style="{width:width+'px',height:height+'px'}"
    :class="[{'digitalRolling_num0': item==='0'},
    {'digitalRolling_num1': item==='1'},
    {'digitalRolling_num2': item==='2'},
    {'digitalRolling_num3': item==='3'},
    {'digitalRolling_num4': item==='4'},
    {'digitalRolling_num5': item==='5'},
    {'digitalRolling_num6': item==='6'},
    {'digitalRolling_num7': item==='7'},
    {'digitalRolling_num8': item==='8'},
    {'digitalRolling_num9': item==='9'}]"></i>
    <div v-for="(item,index) in numberArr" :key=index :style="{width:width+'px',height:height+'px'}" class="digitalRolling_eyes">
      <ul :style="{width:width+'px',height:height+'px',top:item==='#'?height+'px' :-(item*height) + 'px'}" class="digitalRolling_ul" v-if="types === 'font'" >
        <li :style="{lineHeight:height+'px',fontSize:fontSize+'px',color:fontColor}" class="digitalRolling_li" v-for = "item in 10" :key = item>{{item-1}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    width: {
      default: 33,
      type: Number
    }, // 每个数字占用宽度
    height: {
      default: 47,
      type: Number,
      required: true
    }, // 每个数字占用高度
    number: {
      default: '0000'
    }, // 传入的数字
    types: {
      default: 'font'
    }, // 可选值：font 或 image 建议用前者
    fontSize: {
      default: 14,
      type: Number
    }, // 字体大小
    fontColor: {
      default: 'black'
    }, // 字体颜色
    numberDigits: {
      type: Number
    } // 数值默认位数，可补0
  },
  watch: {
  },
  computed: {
    numberArr: function () {
      if (this.numberDigits) {
        return this.number.toString().padStart(this.numberDigits, '#').split('')
      } else {
        return this.number.toString().split('')
      }
    }
  },
  data: function () {
    return {

    }
  },
  mounted: function () {
  },
  methods: {

  }

}
</script>

<style>
  .digitalRolling_container{
    position: relative;
    display: inline-block;
  }
  .digitalRolling_num{
    position: relative;
    background-image:url('/static/img/number.png');
    background-position: 0 0;
    background-size: 100% 1214%;
    display: inline-block;
    transition: 2s linear;
  }
  .digitalRolling_num0{
    background-position: 0 0px;
  }
  .digitalRolling_num1{
    background-position: 0 -97.7%;
  }
  .digitalRolling_num2{
    background-position: 0 -195.6%;
  }
  .digitalRolling_num3{
    background-position: 0 -293.6%;
  }
  .digitalRolling_num4{
    background-position: 0 -391.6%;
  }
  .digitalRolling_num5{
    background-position: 0 -489.5%;
  }
  .digitalRolling_num6{
    background-position: 0 -587.4%;
  }
  .digitalRolling_num7{
    background-position: 0 -685.2%;
  }
  .digitalRolling_num8{
    background-position: 0 -783.1%;
  }
  .digitalRolling_num9{
    background-position: 0 -881.05%;
  }
  .digitalRolling_eyes{
    display: inline-block;
    position: relative;
    overflow: hidden;
  }
  .digitalRolling_ul{
    display: inline-block;
    position: absolute;
    list-style: none;
    padding:0;
    margin:0;
    transition: all 2s ease-in-out;
    top:0px;
  }
  .digitalRolling_li{
    display: block;
    width: 100%;
    height: 100%;
    text-align: center;
  }

</style>
