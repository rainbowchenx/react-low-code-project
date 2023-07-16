/*
 * @Author: rainbowchen 1664373735@qq.com
 * @Date: 2023-07-13 08:40:17
 * @LastEditors: rainbowchen 1664373735@qq.com
 * @LastEditTime: 2023-07-16 00:09:22
 * @FilePath: \react-low-code-project\src\services\ajax.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import axios from 'axios'
import { message } from 'antd'
const instance = axios.create({})

// 响应拦截器
/**
 * @description:
 * @param {*} res
 * @return {*}
 */
instance.interceptors.response.use(res => {
  const resData = (res.data || {}) as ResType
  const { errno, data, msg } = resData
  if (errno !== 0) {
    // 错误处理
    if (msg) {
      message.error(msg)
    }
    throw new Error(msg || '请求失败')
  }
  return data as any
})

export default instance
// 定义请求返回的数据类型
export type ResType = {
  errno: number
  data?: any
  msg?: string
}
// 定义请求返回的data数据类型
export type ResDataType = {
  [key: string]: any
}
