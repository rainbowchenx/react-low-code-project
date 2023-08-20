/**
 * @description 编辑展示问卷的画布
 */
import React, { FC, MouseEvent } from 'react'
import { useDispatch } from 'react-redux'
import styles from './EditCanvas.module.scss'
import { Spin } from 'antd'
import classNames from 'classnames'
// 导入获取组件列表的自定义hook
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
// 导入组件信息类型
import {
  ComponentInfoType,
  changeSelectedId,
  moveComponent,
} from '../../../store/componentsReducer'
import { getComponentConfByType } from '../../../componnets/QuestionComponents/index'
// 导入组件配置类型
import { ComponentConfType } from '../../../componnets/QuestionComponents'
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress'

import SortableContainer from '../../../componnets/DragSortable/SortableContainer'
import SortableItem from '../../../componnets/DragSortable/SortableItem'

// 临时静态展示一下title input的效果
// import QuestionInput from '../../../componnets/QuestionComponents/QuestionInput/Component'
// import QuestionTitle from '../../../componnets/QuestionComponents/QuestionTitle/Component'
// 定义传递过来的数据类型
type PropsType = {
  loading: boolean
}
// 根据组件信息获取组件的函数
function genComponent(componentInfo: ComponentInfoType) {
  // 获取组件类型和组件属性从redux store中方
  const { type, props } = componentInfo
  const componentConf = getComponentConfByType(type)
  if (!componentConf == null) return null
  const { Component } = componentConf as ComponentConfType
  return <Component {...props} />
}
const EditCanvas: FC<PropsType> = ({ loading }) => {
  // 获取组件列表
  const { componentList, selectedId } = useGetComponentInfo()
  const dispatch = useDispatch()
  function handleClick(event: MouseEvent, id: string) {
    event.stopPropagation()
    dispatch(changeSelectedId(id))
  }
  // 绑定快捷键
  useBindCanvasKeyPress()
  // loading加载中
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin />
      </div>
    )
  }
  const componentListWithId = componentList.map(c => ({ id: c.fe_id, ...c }))
  // 拖拽排序结束
  function handleDragEnd(oldIndex: number, newIndex: number) {
    if (oldIndex === newIndex) return
    dispatch(moveComponent({ oldIndex, newIndex }))
  }
  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <div className={styles.canvas}>
        {/* 使用发请求获取的数据替换掉静态数据 */}
        {/* <div className={styles['component-wrapper']}>
          <div className={styles.component}> */}
        {/* 问卷标题 */}
        {/* <QuestionTitle />
          </div>
        </div>
        <div className={styles['component-wrapper']}>
          <div className={styles.component}> */}
        {/* 问卷输入框 */}
        {/* <QuestionInput />
          </div>
        </div> */}
        {/* 遍历组件列表,动态渲染页面 */}
        {componentList
          .filter(item => !item.isHidden)
          .map(c => {
            const { fe_id, isLocked } = c
            // 拼接className
            const wrapperDefaultClassName = styles['component-wrapper']
            const selectedClassName = styles.selected
            const lockedClassName = styles.locked
            const wrapperClassName = classNames({
              [wrapperDefaultClassName]: true,
              [selectedClassName]: fe_id === selectedId,
              [lockedClassName]: isLocked,
            })
            return (
              <SortableItem key={fe_id} id={fe_id}>
                <div key={fe_id} className={wrapperClassName} onClick={e => handleClick(e, fe_id)}>
                  <div className={styles.component}>{genComponent(c)}</div>
                </div>
              </SortableItem>
            )
          })}
      </div>
    </SortableContainer>
  )
}
export default EditCanvas
