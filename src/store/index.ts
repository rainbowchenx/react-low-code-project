/*
 * @Author: rainbowchen 1664373735@qq.com
 * @Date: 2023-07-24 22:15:41
 * @LastEditors: rainbowchen 1664373735@qq.com
 * @LastEditTime: 2023-07-24 23:02:43
 * @FilePath: \react-low-code-project\src\store\index.ts
 * @Description: 设置store
 */
import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserStateType } from './userReducer'
// 设置store的类型
export type StateType = {
  user: UserStateType
}
export default configureStore({
  reducer: {
    user: userReducer,
    // 分模块，扩展问卷的信息
  },
})
