import React, { FC, useState, ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { changeSelectedId, changeComponentTitle } from '../../../store/componentsReducer'
import styles from './Layers.module.scss'
import { message, Input } from 'antd'
import classNames from 'classnames'
const Layers: FC = () => {
  const dispatch = useDispatch()
  const { componentList, selectedId } = useGetComponentInfo()
  //   记录当前正在修改标题的组件 用于控制input的显示
  const [changeingTitleId, setChangingTitleId] = useState('')

  // 点击选中组件
  function handleTitleClick(fe_id: string) {
    const curComp = componentList.find(c => c.fe_id === fe_id)
    if (curComp && curComp.isHidden) {
      message.info('不能选中隐藏的组件')
      return
    }
    // 首次点击未选中的组件
    if (fe_id !== selectedId) {
      dispatch(changeSelectedId(fe_id))
      setChangingTitleId('')
      return
    }
    // 二次及以上点击选中的组件
    setChangingTitleId(fe_id)
  }
  //  修改标题
  function changeTitle(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim()
    if (!newTitle) {
      message.info('标题不能为空')
      return
    }
    if (!selectedId) return
    dispatch(changeComponentTitle({ fe_id: selectedId, title: newTitle }))
  }

  return (
    <>
      {componentList.map(c => {
        const { fe_id, title, isHidden, isLocked } = c
        // 拼接title classname
        const titleDefaultClassName = styles.title
        const selectedClassName = styles.selected
        const titleClassName = classNames({
          [titleDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedId,
        })
        return (
          <div key={fe_id} className={styles.wrapper}>
            <div className={titleClassName} onClick={() => handleTitleClick(fe_id)}>
              {fe_id === changeingTitleId && (
                <Input
                  value={title}
                  autoFocus={true}
                  onChange={changeTitle}
                  onBlur={() => setChangingTitleId('')}
                  onPressEnter={() => setChangingTitleId('')}
                />
              )}
              {fe_id !== changeingTitleId && title}
            </div>
            <div className={styles.handler}>按钮</div>
          </div>
        )
      })}
    </>
  )
}

export default Layers
