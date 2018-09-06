
// 注意我这里定义变量都用了let，建议用const定义，只要知道const的性能更优就可以了
// export let json = {'name': 'dkr'}
// export let str = '字符串'
// export function multiply (x, y) {
//   return x * y
// }

// 上面的写法等同于
let json = {'name': 'dkr'}
let str = '字符串'
function multiply (x, y) {
  return x * y
}
export {json, str, multiply}
// 这两种方法可以混合使用,当然不推荐混合使用
// 推荐使用第二种写法,便于管理,你可以在最后导出所有你想导出的公共模块

// 你可以用as关键字重命名想要输出的变量，函数或者类名
// 当你这么做的时候，注意要用as重命名的值去接收
// export {json as newJson, str as newStr, multiply as newMultiply}
// 通常情况下这个功能并没有什么软用，当然你可以拿他来输出同一个值的多种命名规则，如下
// export {json as myJson, json as youJson, json as newJson}
// 这样你就可以用多种名字去接收json了，尽管他们是同一个值

// 来做一件比较有意思的事情，动态修改模块内的值，会对取值有什么影响呢
export let number = 1
// 开启定时器
setInterval(() => {
  number++
}, 1000)
