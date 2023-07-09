import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import styles from './MainLayout.module.scss'
// 引入logo组件
import Logo from '../componnets/Logo'
// 引入用户登录组件
import UserInfo from '../componnets/UserInfo'

const { Header, Footer, Content } = Layout
const MainLayout: FC = () => {
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          {/* 应用logo组件 */}
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Layout className={styles.main}>
        <Content>
          <Outlet />
        </Content>
      </Layout>
      <Footer className={styles.footer}>yang问卷提供技术支持</Footer>
    </Layout>
  )
}
export default MainLayout
