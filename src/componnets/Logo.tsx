// logo组件yang问卷
import React, { FC } from 'react'
// 引入标题相关和空余相关组件
import { Space, Typography } from 'antd'
// 按需引入图标组件
import { FormOutlined } from '@ant-design/icons'
// 引入路由租金啊
import { Link } from 'react-router-dom'
// 引入自身的样式文件
import styles from './Logo.module.scss'

const { Title } = Typography
const Logo: FC = () => {
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
