/*
 * @Author: rainbowchen 1664373735@qq.com
 * @Date: 2023-06-19 22:46:52
 * @LastEditors: rainbowchen 1664373735@qq.com
 * @LastEditTime: 2023-07-25 08:55:14
 * @FilePath: \react-low-code-project\src\layouts\QuestionLayout.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Spin } from 'antd'
import userLoadUserData from '../hooks/useLoadUserData'

const QuestionLayout: FC = () => {
  const { waitingUserData } = userLoadUserData()
  return (
    <>
      <p>questionlayout </p>
      <div>{waitingUserData ? <Spin /> : <Outlet />}</div>
    </>
  )
}
export default QuestionLayout
