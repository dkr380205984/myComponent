<template>
  <div>
    <rollScreen :height=40 :contentArr = content></rollScreen>
    <rollScreen :dLength = content.length :height=50 :lineNum=3>
        <li slot="slide" style="height:50px" v-for="(item,index) in content" :key=index>{{item}}</li>
    </rollScreen>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      content: ['内容1', '内容2', '内容3', '内容4', '内容5', '内容6', '内容7']
    }
  }
}
</script>

<style>

</style>
