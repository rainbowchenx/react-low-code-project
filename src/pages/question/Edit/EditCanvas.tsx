/**
 * @description 编辑展示问卷的画布
 */
import React, { FC } from 'react'
import styles from './EditCanvas.module.scss'
import { Spin } from 'antd'

// 临时静态展示一下title input的效果
import QuestionInput from '../../../componnets/QuestionComponents/QuestionInput/Component'
import QuestionTitle from '../../../componnets/QuestionComponents/QuestionTitle/Component'
// 定义传递过来的数据类型
type PropsType = {
  loading: boolean
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
  // loading加载中
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin />
      </div>
    )
  }
  return (
    <div className={styles.canvas}>
      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          {/* 问卷标题 */}
          <QuestionTitle />
        </div>
      </div>
      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          {/* 问卷输入框 */}
          <QuestionInput />
        </div>
      </div>
    </div>
  )
}
export default EditCanvas
