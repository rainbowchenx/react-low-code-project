/*
 * @Author: rainbowchen 1664373735@qq.com
 * @Date: 2023-06-23 18:10:20
 * @LastEditors: rainbowchen 1664373735@qq.com
 * @LastEditTime: 2023-07-21 08:04:24
 * @FilePath: \react-low-code-project\src\componnets\UserInfo.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
// logo组件yang问卷
import React, { FC } from 'react'
import { Button } from 'antd'
// 导入链接
import { Link, useNavigate } from 'react-router-dom'
// 导入路由常量
import { LOGIN_PATHNAME } from '../router/index'
// 导入用户信息的service
import { getUserInfoService } from '../services/user'
// 导入useRequest
import { useRequest } from 'ahooks'
// 引入图标文件
import { UserOutlined } from '@ant-design/icons'
// 引入removetoken
import { removeToken } from '../utils/user-token'
const UserInfo: FC = () => {
  const nav = useNavigate()
  // 登录前后显示不同的用户信息
  const { data } = useRequest(getUserInfoService)
  const { username, nickname } = data || {}
  function logout() {
    removeToken() //清除token存储
    nav(LOGIN_PATHNAME)
  }
  // 登录后显示的用户信息的jsx片段
  const UserInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  )
  // 登录前显示的jsx片段
  const Login = <Link to={LOGIN_PATHNAME}>登录</Link>
  return <div>{username ? UserInfo : Login}</div>
}
export default UserInfo
