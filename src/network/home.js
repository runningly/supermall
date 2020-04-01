import {request} from "./request";

// 对首页所有url进行统一的管理
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function  getHomeGoodes(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
// 函数调用 -> 压入函数栈（保存函数调用过程中所有变量）
// 函数调用结束 -> 弹出函数栈(释放函数所有的变量) ->被内存回收
// function test() {
// //   const name = ['why', 'aaa']
// // }
// // test()