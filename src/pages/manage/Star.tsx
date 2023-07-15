import React, { FC } from 'react'
// import './List1.css'
import QuestionCard from '../../componnets/QuestionCard'
// 导入样式文件
import styles from './Common.module.scss'
// 引入标题hook
import { useTitle } from 'ahooks'
// 引入antd的自定义组件
import { Typography, Empty, Spin } from 'antd'
const { Title } = Typography
// 引入自定义搜索框组件
import ListSearch from '../../componnets/ListSearch'
// 引入问卷搜索的hook
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'

const Star: FC = () => {
  useTitle('小慕问卷 - 我的问卷')
  const { data = {}, loading } = useLoadQuestionListData({ isStar: true })
  const { list = [], total = 0 } = data

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
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据"></Empty>}
        {list.length > 0 &&
          list.map((q: any) => {
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
