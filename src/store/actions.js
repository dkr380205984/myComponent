// Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象
let incrementAsync = (content) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      content.commit('increment')
      resolve()
    }, 1000)
  })
}
let decrementAsync = (content) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      content.commit('decrement')
      resolve()
    }, 1000)
  })
}
export {incrementAsync, decrementAsync}
