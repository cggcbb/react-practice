
// 格式化当前时间 eg: 2019-04-01 23:09:29
const optimizeCurrentTime = () => {
  let current = new Date()
  let date = [current.getMonth() + 1, current.getDate()].map(item => {
    return item.toString().padStart(2, '0')
  }).join('-')
  let time = [current.getHours(), current.getMinutes(), current.getSeconds()].map(item => {
    return item.toString().padStart(2, '0')
  }).join(':')
  return `${current.getFullYear()}-${date} ${time}`
}

export {
  optimizeCurrentTime
}