import React, { FC } from 'react'
// import './List1.css'
import QuestionCard from '../../componnets/QuestionCard'
// 导入样式文件
import styles from './Common.module.scss'
// 引入标题hook
import { useTitle } from 'ahooks'
// 引入antd的自定义组件
import { Typography, Spin } from 'antd'
const { Title } = Typography
// 导入自定义的搜索组件
import ListSearch from '../../componnets/ListSearch'
// 引入搜索的hook
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'

// TS 类型
const List: FC = () => {
  useTitle('小慕问卷 - 我的问卷')
  // 问卷列表数据
  // const [questionList, setQuestionList] = useState(rawQuestionList)
  // 新增试卷
  // function add() {
  //   const r = Math.random().toString().slice(-3)
  //   setQuestionList(
  //     questionList.concat({
  //       _id: 'q' + r,
  //       title: '问卷' + r,
  //       isStar: false,
  //       isPublished: false,
  //       answerCount: 1,
  //       createAt: '12',
  //     })
  //   )
  // }
  // 删除试卷
  // function deleteQuestion(id: string) {
  //   // 不可变数据直接传入新的值
  //   setQuestionList(
  //     questionList.filter(q => {
  //       if (q._id !== id) {
  //         return true
  //       } else {
  //         return false
  //       }
  //     })
  //   )
  // }
  // 发布问卷
  // function publishQuestion(id: string) {
  //   setQuestionList(
  //     questionList.map(q => {
  //       if (q._id !== id) return q
  //       return {
  //         ...q,
  //         isPublished: true,
  //       }
  //     })
  //   )
  // }
  const { data = {}, loading } = useLoadQuestionListData()
  const { list = [], total = 0 } = data

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {/* 问卷列表 */}
        {!loading &&
          list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>上划加载更多</div>
    </>
  )
}

export default List
