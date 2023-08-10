/**
 * @description 根据选中是SELECTEDiD获取对应组件的属性并展示
 */
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType, ComponentPropsType } from '../../../componnets/QuestionComponents'
import { changeComponentProps } from '../../../store/componentsReducer'
const NoProp: FC = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>
}

const ComponentProp: FC = () => {
  const dispatch = useDispatch()
  const { selectedComponent } = useGetComponentInfo()
  if (selectedComponent == null) return <NoProp />
  const { type, props, isLocked } = selectedComponent
  const ComponentConf = getComponentConfByType(type)
  if (ComponentConf == null) return <NoProp />
  function changeProps(newProps: ComponentPropsType) {
    if (selectedComponent == null) return
    const { fe_id } = selectedComponent
    dispatch(changeComponentProps({ fe_id, newProps }))
  }
  const { PropComponent } = ComponentConf

  return <PropComponent {...props} onChange={changeProps} disabled={isLocked} />
}
export default ComponentProp
