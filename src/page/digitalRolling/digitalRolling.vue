<template>
<div class="digitalRollingContainer">
  <digitalRolling :width=width :height=height :number="num" :numberDigits = 6></digitalRolling>
</div>
</template>

<script>
export default {
  data: function () {
    return {
      num: 1234,
      width: 15,
      height: 33
    }
  },
  methods: {
  },
  created: function () {
    let _this = this
    setInterval(function () {
      _this.num = parseInt(Math.random() * 9000) + 5000
    }, 3000)
  }

}
</script>

<style>
.digitalRollingContainer{
  width: 1000px;
  height: 600px;
  position: relative;
  margin:auto;
  margin-top:200px;
  background: rgba(0,0,0,0.4)
}
</style>
