/**
 * @description 左侧面板中的组件库部分
 */
import React, { FC } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { componentConfGroup, ComponentConfType } from '../../../componnets/QuestionComponents'
import { addComponent } from '../../../store/componentsReducer'
import styles from './ComponentLib.module.scss'
const Libs: FC = () => {
  const { Title } = Typography
  const dispatch = useDispatch()

  // 生成用于显示组件的tsx片段
  function genComponent(c: ComponentConfType) {
    const { title, Component, type, defaultProps } = c
    // 点击左侧组件，添加组件到中间画布
    function handleClick() {
      dispatch(
        addComponent({
          fe_id: nanoid(),
          type,
          title,
          props: defaultProps,
        })
      )
    }
    return (
      <div key={type} className={styles.wrapper} onClick={handleClick}>
        <div className={styles.components}>
          <Component />
        </div>
      </div>
    )
  }
  return (
    <>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName, components } = group
        return (
          // 显示各个组件的标题和内容
          <div key={groupId}>
            <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '0' }}>
              {groupName}
            </Title>
            <div>{components.map(c => genComponent(c))}</div>
          </div>
        )
      })}
    </>
  )
}
export default Libs
