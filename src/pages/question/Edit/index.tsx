import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import styles from './index.module.scss'

const Edit: FC = () => {
  // 获取单个问卷详情
  const { loading, data } = useLoadQuestionData()
  return (
    // 外层，包含上下两部分
    <div className={styles.container}>
      {/* 头部部分 */}
      <div style={{ backgroundColor: '#fff', height: '40px' }}>Header</div>
      {/* 主要部分 */}
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          {/* 左侧部分 */}
          <div className={styles.left}>left</div>
          {/* 中间部分 */}
          <div className={styles.main}>
            <div className={styles['canvas-wrapper']}>
              <div style={{ height: '900px' }}>画布 测试滚动</div>
            </div>
          </div>
          {/* 右侧部分 */}
          <div className={styles.right}>right</div>
        </div>
      </div>
    </div>
  )
}
export default Edit
