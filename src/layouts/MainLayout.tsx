/*
 * @Author: rainbowchen 1664373735@qq.com
 * @Date: 2023-06-19 22:11:44
 * @LastEditors: rainbowchen 1664373735@qq.com
 * @LastEditTime: 2023-07-25 08:51:19
 * @FilePath: \react-low-code-project\src\layouts\MainLayout.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import styles from './MainLayout.module.scss'
// 引入logo组件
import Logo from '../componnets/Logo'
// 引入用户登录组件
import UserInfo from '../componnets/UserInfo'
import userLoadUserData from '../hooks/useLoadUserData'

const { Header, Footer, Content } = Layout
const MainLayout: FC = () => {
  const { waitingUserData } = userLoadUserData()
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          {/* 应用logo组件 */}
          <Logo />
        </div>
        <div className={styles.right}>
          {/* 展示用户信息是否登录 */}
          <UserInfo />
        </div>
      </Header>
      <Layout className={styles.main}>
        <Content>{!waitingUserData && <Outlet />}</Content>
      </Layout>
      <Footer className={styles.footer}>yang问卷提供技术支持</Footer>
    </Layout>
  )
}
export default MainLayout
