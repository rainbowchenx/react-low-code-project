// 判断用户是否登录的响应跳转逻辑的hook
import { useEffect } from 'react'
// 导入用于获取当前路径和跳转的hook
import { useLocation, useNavigate } from 'react-router-dom'
// 导入用于获取当前用户信息的hook
import useGetUserInfo from './useGetUserInfo'
// 导入router中的一些常量和方法
import {
  isLoginOrRegister,
  MANAGE_INDEX_PATHNAME,
  isNoNeedUserInfo,
  LOGIN_PATHNAME,
} from '../router/index'
function useNavPage(waitingUserData: boolean) {
  const nav = useNavigate()
  const { username } = useGetUserInfo()
  const { pathname } = useLocation()

  useEffect(() => {
    //   如果waitingUserData为true，说明还在等待获取用户信息，不进行跳转
    if (waitingUserData) {
      return
    }
    // 如果已经登录了
    if (username) {
      if (isLoginOrRegister(pathname)) {
        nav(MANAGE_INDEX_PATHNAME)
      }
      return
    }
    // 如果没有登录
    if (isNoNeedUserInfo(pathname)) {
      return
    } else {
      nav(LOGIN_PATHNAME)
    }
  }, [waitingUserData, username, pathname])
}
export default useNavPage
