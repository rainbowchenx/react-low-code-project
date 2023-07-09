import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

const QuestionLayout: FC = () => {
  return (
    <>
      <p>questionlayout </p>
      <div>
        <Outlet />
      </div>
    </>
  )
}
export default QuestionLayout
