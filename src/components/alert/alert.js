import Vue from 'vue'
import main from './alert.vue'

let instance
let Alertbox = Vue.extend(main)
var alert = function (option) {
  let options
  // 初始化参数
  if (typeof (option) === 'string') {
    options = {
      message: option
    }
  } else {
    options = option
  }
  options.ifShow = true
  // 生成组件
  instance = new Alertbox({
    data: options
  })
  // 初始化组件
  instance = instance.$mount()
  // 如果$mount中未填挂载的节点，则需要手动添加到dom中
  document.body.appendChild(instance.$el)
  return instance
}

export default alert
