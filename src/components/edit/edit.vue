<template>
  <div class="enjoy_edit_container">
    <span class="enjoy_edit_span" :class="{hide:ifEdit}" @dblclick="edit">{{val}}</span>
    <input class="enjoy_edit_input"
    :class="{hide:!ifEdit}"
    v-model="val"
    autofocus="autofocus"
    @input = checkInput
    @blur="save"
    @keyup.enter="save"/>
  </div>
</template>

<script>
import './edit.less'
import alert from '../alert/alert.js'
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    max: {
      type: Number,
      default: 5
    },
    min: {
      type: Number,
      default: 1
    }
  },
  data: function () {
    return {
      val: this.value,
      maxs: this.max,
      mins: this.min,
      ifEdit: false
    }
  },
  created: function () {
    if (this.value.length > this.maxs) {
      this.maxs = this.value.length
      console.warn('warning:最大长度小于传入value值，已自动更正')
    }
    if (this.value.length < this.mins) {
      this.mins = this.value.length
      console.warn('warning:最小长度大于传入value值，已自动更正')
    }
  },
  methods: {
    save: function () {
      this.ifEdit = false
      this.$emit('edited', this.val) // 保存
    },
    edit: function () {
      this.$emit('beforeEdit') // 双击编辑
      this.ifEdit = true
    },
    checkInput: function () {
      if (this.val.length > this.maxs) {
        alert({
          message: '输入字符数大于规定长度，请重新编辑',
          type: 'error'
        })
        this.val = this.value
      }
      if (this.val.length < this.mins) {
        alert({
          message: '输入字符数小于规定长度，请重新编辑',
          type: 'error'
        })
        this.val = this.value
      }
      this.$emit('editing') // 正在编辑
    }
  }
}
</script>
