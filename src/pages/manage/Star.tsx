import React, { FC, useState } from 'react'
// import './List1.css'
import QuestionCard from '../../componnets/QuestionCard'
// 导入样式文件
import styles from './Common.module.scss'
// 引入标题hook
import { useTitle } from 'ahooks'
// 引入antd的自定义组件
import { Typography, Empty } from 'antd'
const { Title } = Typography
// 引入自定义搜索框组件
import ListSearch from '../../componnets/ListSearch'

const rawQuestionList = [
  { _id: 'q1', title: '问卷1', isStar: false, isPublished: false, answerCount: 2, createAt: '1' },
  { _id: 'q2', title: '问卷2', isStar: true, isPublished: true, answerCount: 2, createAt: '1' },
  { _id: 'q3', title: '问卷3', isStar: false, isPublished: false, answerCount: 2, createAt: '1' },
  { _id: 'q4', title: '问卷4', isStar: true, isPublished: true, answerCount: 2, createAt: '1' },
]

const Star: FC = () => {
  useTitle('小慕问卷 - 我的问卷')
  const [questionList, setQuestionList] = useState(rawQuestionList)
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据"></Empty>}
        {questionList.length > 0 &&
          questionList.map(q => {
            const { _id } = q
            console.log(q)
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  )
}
export default Star
