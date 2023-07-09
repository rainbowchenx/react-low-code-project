import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
// 获取所需组件
import { Button, Typography } from 'antd'
// 结构出标题和段落相关
const { Title, Paragraph } = Typography
// 获取路由常量
import { MANAGE_INDEX_PATHNAME } from '../router'
// 引入样式文件
import styles from './Home.module.scss'
const Home: FC = () => {
  // 第三方hook
  const nav = useNavigate()
  function clickHandler() {
    nav('/login')
  }
  return (
    // 此为cover
    <div className={styles.container}>
      {/* 此为北京容器 */}
      <div className={styles.info}>
        <Title>问卷调查|在线投票</Title>
        <Paragraph>已经累计创建问卷？？份，发布问卷？？个，收到答卷？？份</Paragraph>
        <div>
          <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
            开始使用
          </Button>
        </div>
      </div>
    </div>
  )
}
export default Home
