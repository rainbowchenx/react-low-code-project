import React, { FC, useEffect } from 'react'
import './QuestionCard.css'

// ts 自定义类型
type PropsType = {
  id: string
  title: string
  isPublished: boolean
  deleteQuestion?: (id: string) => void
  publishQuestion?: (id: string) => void
}

// FC - functional component
const QuestionCard: FC<PropsType> = props => {
  const { id, title, isPublished, deleteQuestion, publishQuestion } = props
  // 发布问卷
  function publish(id: string) {
    publishQuestion && publishQuestion(id)
  }
  // 删除问卷
  function del(id: string) {
    deleteQuestion && deleteQuestion(id)
  }
  return (
    <div key={id} className="list-item">
      <strong>{title}</strong>
      &nbsp;
      {/* 条件判断 */}
      {isPublished ? <span className="isPublished">已发布</span> : <span>未发布</span>}
      &nbsp;
      <div>
        <button
          onClick={() => {
            del(id)
          }}
        >
          删除问卷
        </button>
        <button
          onClick={() => {
            publish(id)
          }}
        >
          发布问卷
        </button>
      </div>
    </div>
  )
}

export default QuestionCard
