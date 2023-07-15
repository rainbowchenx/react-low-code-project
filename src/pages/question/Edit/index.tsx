import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const Edit: FC = () => {
  // 获取单个问卷详情
  const { loading, questionData } = useLoadQuestionData()
  return (
    <div>
      <p>Edit</p>
      {loading ? <p>loading...</p> : <p>{JSON.stringify(questionData)}</p>}
    </div>
  )
}
export default Edit
