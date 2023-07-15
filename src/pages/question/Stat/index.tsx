import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
const Stat: FC = () => {
  // 获取单个问卷详情
  const { loading, data } = useLoadQuestionData()
  return (
    <div>
      <p>Stat</p>
      {loading ? <p>loading...</p> : <p>{JSON.stringify(data)}</p>}
    </div>
  )
}
export default Stat
