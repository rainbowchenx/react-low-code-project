import React from 'react'
import type { FC } from 'react'
import './List1.css'
const List1: FC = () => {
  const questionList = [
    { id: 'q1', title: '问卷一', isPublished: false },
    { id: 'q2', title: '问卷二', isPublished: false },
    { id: 'q3', title: '问卷三', isPublished: false },
    { id: 'q4', title: '问卷四', isPublished: true },
  ]
  function edit(id: string) {
    console.log('edit', id)
  }
  return (
    <div>
      <h1>问卷列表页</h1>
      <div>
        {questionList.map(item => {
          const { id, title, isPublished } = item
          return (
            <div key={id} className="list-item">
              <strong>{title}</strong>
              {/*条件判断 */}
              {isPublished ? (
                <span style={{ color: 'red' }}>已发布</span>
              ) : (
                <span style={{ color: 'black' }}>未发布</span>
              )}
              <button
                onClick={() => {
                  edit(id)
                }}
              >
                编辑问卷
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default List1
