// 防抖动操作
export function debounce(func, delay) {
  let timer = null

  return function (...args) {
    if (timer) clearTimeout(timer)
    // 设置一个定时器
    timer = setTimeout(() => {
      // apply:绑定this指向
      func.apply(this, args)
    }, delay)
  }
}

 // 将时间戳格式化成标准格式(重要！！)
export function formatDate(date, fmt) {
  // 1.获取年份
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}
// 传过来可能是4 -> 004 ->截取前面一位 -> 04
// 传过来的可能是004  -> 00004 -> 截取前面三位 -> 04
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
}
