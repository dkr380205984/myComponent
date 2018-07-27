<template>
  <div class="enjoy_carousel_container" @click="changemark">
    <div class="enjoy_carousel_once_6" :class="{once_6_first:mark===1,once_6_second:mark===2,once_6_third:mark===3,once_6_fourth:mark===4,once_6_fifth:mark===5,once_6_sixth:mark===6}">1</div>
    <div class="enjoy_carousel_once_6" :class="{once_6_first:mark===6,once_6_second:mark===1,once_6_third:mark===2,once_6_fourth:mark===3,once_6_fifth:mark===4,once_6_sixth:mark===5}">2</div>
    <div class="enjoy_carousel_once_6" :class="{once_6_first:mark===5,once_6_second:mark===6,once_6_third:mark===1,once_6_fourth:mark===2,once_6_fifth:mark===3,once_6_sixth:mark===4}">3</div>
    <div class="enjoy_carousel_once_6" :class="{once_6_first:mark===4,once_6_second:mark===5,once_6_third:mark===6,once_6_fourth:mark===1,once_6_fifth:mark===2,once_6_sixth:mark===3}">4</div>
    <div class="enjoy_carousel_once_6" :class="{once_6_first:mark===3,once_6_second:mark===4,once_6_third:mark===5,once_6_fourth:mark===6,once_6_fifth:mark===1,once_6_sixth:mark===2}">5</div>
    <div class="enjoy_carousel_once_6" :class="{once_6_first:mark===2,once_6_second:mark===3,once_6_third:mark===4,once_6_fourth:mark===5,once_6_fifth:mark===6,once_6_sixth:mark===1}">6</div>
  </div>
</template>

<script>
import './carousel.less'
export default {
  data: function () {
    return {
      mark: 1
    }
  },
  methods: {
    changemark: function () {
      if (this.mark < 6) {
        this.mark++
      } else {
        this.mark = 1
      }
    }
  }
}
</script>

<style>

</style>
