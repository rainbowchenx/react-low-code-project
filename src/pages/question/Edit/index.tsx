import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const Edit: FC = () => {
  // 获取单个问卷详情
  const { loading, data } = useLoadQuestionData()
  return (
    <div>
      <p>Edit</p>
      {loading ? <p>loading...</p> : <p>{JSON.stringify(data)}</p>}
    </div>
  )
}
export default Edit
