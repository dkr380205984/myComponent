<template>
  <div>
    <button @click="dec">-</button>
    <span>{{count}}</span>
    <button @click="add">+</button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState(['count'])
  },
  methods: {
    ...mapMutations(['increment', 'decrement']),
    ...mapActions(['incrementAsync', 'decrementAsync']),
    add () {
      this.incrementAsync().then(() => {
        this.increment()
      })
    },
    dec () {
      this.decrementAsync().then(() => {
        // do something
      })
    }
  }
}
</script>

<style>

</style>
