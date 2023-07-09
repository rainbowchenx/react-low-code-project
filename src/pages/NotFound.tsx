import React, { FC } from 'react'
// 导入ant中404的自定义组件
import { Result, Button } from 'antd'
// 导入常量
import { MANAGE_INDEX_PATHNAME } from '../router'
// 导入路由，用于404时返回
import { useNavigate } from 'react-router-dom'
const NotFound: FC = () => {
  const nav = useNavigate()
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，您访问的页面不存在"
      extra={
        <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
          返回首页
        </Button>
      }
    ></Result>
  )
}
export default NotFound
