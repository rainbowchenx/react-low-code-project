import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import styles from './index.module.scss'
import EditCanvas from './EditCanvas'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../../store/componentsReducer'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import EditHeader from './EditHeader'

const Edit: FC = () => {
  // 获取单个问卷详情
  const { loading } = useLoadQuestionData()
  const dispatch = useDispatch()
  function clearSelectedId() {
    dispatch(changeSelectedId(''))
  }
  return (
    // 外层，包含上下两部分
    <div className={styles.container}>
      {/* 头部部分 */}
      <div style={{ backgroundColor: '#fff', height: '40px' }}>
        <EditHeader />
      </div>
      {/* 主要部分 */}
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          {/* 左侧部分 */}
          <div className={styles.left}>
            <LeftPanel />
          </div>
          {/* 中间部分 */}
          <div className={styles.main} onClick={() => clearSelectedId()}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          {/* 右侧部分 */}
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Edit
