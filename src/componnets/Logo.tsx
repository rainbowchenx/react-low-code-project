/*
 * @Author: rainbowchen 1664373735@qq.com
 * @Date: 2023-06-23 16:56:10
 * @LastEditors: rainbowchen 1664373735@qq.com
 * @LastEditTime: 2023-07-24 23:17:35
 * @FilePath: \react-low-code-project\src\componnets\Logo.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// logo组件yang问卷
import React, { FC, useState, useEffect } from 'react'
// 引入标题相关和空余相关组件
import { Space, Typography } from 'antd'
// 按需引入图标组件
import { FormOutlined } from '@ant-design/icons'
// 引入路由租金啊
import { Link } from 'react-router-dom'
// 引入自身的样式文件
import styles from './Logo.module.scss'
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router'
import useGetUserInfo from '../hooks/useGetUserInfo'

const { Title } = Typography
const Logo: FC = () => {
  const { username } = useGetUserInfo()
  const [pathname, setPathname] = useState(HOME_PATHNAME)
  useEffect(() => {
    if (username) {
      setPathname(MANAGE_INDEX_PATHNAME)
    }
  }, [username])
  return (
    <div className={styles.container}>
      <Link to="./">
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>yang问卷</Title>
        </Space>
      </Link>
    </div>
  )
}
export default Logo
