<template>
  <div>
    <div>{{from}}</div>
    <div>{{from2}}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    // from: function () {
    //   return this.$store.getters.address
    // },
    // from2: function () {
    //   return this.$store.getters.addressMore
    // }
    ...mapGetters({
      'from': 'address',
      'from2': 'addressMore',
      'find': 'findArr'
    })
  },
  created () {
    console.log(this.find(1)) // 由于getters已经通过computed挂载到当前实例,所以你不需要再通过this.$store.getters的方法去访问
    console.log(this.$store.getters.findArr(2))
    console.log(this.$store.getters.findArr(7))
  }
}
</script>
