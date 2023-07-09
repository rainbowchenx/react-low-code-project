// logo组件yang问卷
import React, { FC } from 'react'
// 导入链接
import { Link } from 'react-router-dom'
// 导入路由常量
import { LOGIN_PATHNAME } from '../router/index'
const UserInfo: FC = () => {
  // 对于已经登录的用户的相关逻辑

  return (
    <>
      <Link to={LOGIN_PATHNAME}></Link>
    </>
  )
}
export default UserInfo
