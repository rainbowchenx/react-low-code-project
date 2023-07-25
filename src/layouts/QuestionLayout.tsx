/*
 * @Author: rainbowchen 1664373735@qq.com
 * @Date: 2023-06-19 22:46:52
 * @LastEditors: rainbowchen 1664373735@qq.com
 * @LastEditTime: 2023-07-25 08:55:14
 * @FilePath: \react-low-code-project\src\layouts\QuestionLayout.tsx
 * @Description: 问卷布局组件
 */
import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Spin } from 'antd'
import userLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'

const QuestionLayout: FC = () => {
  const { waitingUserData } = userLoadUserData()
  useNavPage(waitingUserData)
  return (
    <>
      <p>questionlayout </p>
      <div>{waitingUserData ? <Spin /> : <Outlet />}</div>
    </>
  )
}
export default QuestionLayout
