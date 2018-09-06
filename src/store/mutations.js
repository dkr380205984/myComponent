// 第一个参数默认接收state对象
const increment = (state) => {
  // setTimeout(() => {
  //   state.count++
  // }, 1000)
  console.log('count++')
  state.count++
}
const decrement = (state) => {
  // setTimeout(() => {
  //   state.count--
  // }, 2000)
  state.count--
}
const add = (state, n) => {
  state.count += n
}
const fn = (state, json) => {
  console.log(json)
  state.name = json.first + json.second + state.name
}
export {increment, decrement, add, fn}
