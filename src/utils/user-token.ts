/*
 * @Author: rainbowchen 1664373735@qq.com
 * @Date: 2023-07-21 08:03:04
 * @LastEditors: rainbowchen 1664373735@qq.com
 * @LastEditTime: 2023-07-21 08:03:21
 * @FilePath: \react-low-code-project\src\utils\user-token.ts
 * @Description: export
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
const KEY = 'USER_TOKEN'
export function setToken(token: string) {
  localStorage.setItem(KEY, token)
}
export function getToken() {
  return localStorage.getItem(KEY) || ''
}
export function removeToken() {
  localStorage.removeItem(KEY)
}
