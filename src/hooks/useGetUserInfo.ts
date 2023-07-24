/*
 * @Author: rainbowchen 1664373735@qq.com
 * @Date: 2023-07-24 22:54:56
 * @LastEditors: rainbowchen 1664373735@qq.com
 * @LastEditTime: 2023-07-24 23:05:05
 * @FilePath: \react-low-code-project\src\hooks\useGetUserInfo.ts
 * @Description: 获取用户信息的hook
 */
// 用于获取用户信息的hook
import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { UserStateType } from '../store/userReducer'
function useGetUserInfo() {
  const { username, nickname } = useSelector<StateType>(state => state.user) as UserStateType
  return { username, nickname }
}
export default useGetUserInfo
