import React, { FC, useState } from 'react'
// import type { FC } from 'react'
// import './List1.css'
import QuestionCard from '../src/componnets/QuestionCard'

// TS 类型
const List1: FC = () => {
  // 问卷列表数据
  const [questionList, setQuestionList] = useState([
    { id: 'q1', title: '问卷1', isPublished: false },
    { id: 'q2', title: '问卷2', isPublished: true },
    { id: 'q3', title: '问卷3', isPublished: false },
    { id: 'q4', title: '问卷4', isPublished: true },
  ])
  // 新增试卷
  function add() {
    const r = Math.random().toString().slice(-3)
    setQuestionList(
      questionList.concat({
        id: 'q' + r,
        title: '问卷' + r,
        isPublished: false,
      })
    )
  }
  // 删除试卷
  function deleteQuestion(id: string) {
    // 不可变数据直接传入新的值
    setQuestionList(
      questionList.filter(q => {
        if (q.id !== id) {
          return true
        } else {
          return false
        }
      })
    )
  }
  // 发布问卷
  function publishQuestion(id: string) {
    setQuestionList(
      questionList.map(q => {
        if (q.id !== id) return q
        return {
          ...q,
          isPublished: true,
        }
      })
    )
  }
  return (
    <div>
      <h1>问卷列表页1</h1>
      <div>
        {questionList.map(question => {
          const { id, title, isPublished } = question
          return (
            <QuestionCard
              key={id}
              id={id}
              title={title}
              isPublished={isPublished}
              deleteQuestion={deleteQuestion}
              publishQuestion={publishQuestion}
            />
          )
        })}
      </div>
      <div>
        <button onClick={add}>新增问卷</button>
      </div>
    </div>
  )
}

export default List1
