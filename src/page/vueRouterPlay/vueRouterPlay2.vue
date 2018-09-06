<template>
  <div class="body">我是页面2
    <button @click = "$router.push('/vueRouterPlay1')">跳到页面1</button>
  </div>
</template>

<script>
console.log('我是页面2，我在script标签里面写了一句话')
export default {

}
</script>

<style lang="less" scoped>
.body{
  margin-top: 20px;
  padding: 520px;
  height: 1400px;
  background: yellow;
}
</style>
