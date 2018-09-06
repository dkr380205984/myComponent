// 第一个参数是state
let address = (state) => {
  return '国籍:' + state.from
}
// 第二个参数可以访问getters
let addressMore = (state, getters) => {
  return '其他描述' + getters.address
}
// return 一个function
let findArr = (state) => (number) => {
  let ifExit = state.arr.find((n) => n === number) // arr.find是ES6语法中数组的扩展
  if (typeof (ifExit) === 'undefined') {
    return false
  } else {
    return true
  }
}
export {address, addressMore, findArr}
