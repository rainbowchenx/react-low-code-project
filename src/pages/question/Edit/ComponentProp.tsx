/**
 * @description 右侧的组件对应属性展示组件
 */
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType, ComponentPropsType } from '../../../componnets/QuestionComponents'
import { changeComponentProps } from '../../../store/componentsReducer'
// 未选中组件时右侧展示
const NoProp: FC = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>
}

const ComponentProp: FC = () => {
  const dispatch = useDispatch()
  const { selectedComponent } = useGetComponentInfo()
  if (selectedComponent == null) return <NoProp />
  const { type, props, isLocked, isHidden } = selectedComponent
  const ComponentConf = getComponentConfByType(type)
  if (ComponentConf == null) return <NoProp />
  function changeProps(newProps: ComponentPropsType) {
    if (selectedComponent == null) return
    const { fe_id } = selectedComponent
    dispatch(changeComponentProps({ fe_id, newProps }))
  }
  const { PropComponent } = ComponentConf

  return <PropComponent {...props} onChange={changeProps} disabled={isLocked || isHidden} />
}
export default ComponentProp
