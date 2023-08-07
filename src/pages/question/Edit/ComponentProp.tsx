/**
 * @description 根据选中是SELECTEDiD获取对应组件的属性并展示
 */
import React, { FC } from 'react'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType } from '../../../componnets/QuestionComponents'
const NoProp: FC = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>
}

const ComponentProp: FC = () => {
  const { selectedComponent } = useGetComponentInfo()
  if (selectedComponent == null) return <NoProp />
  const { type, props } = selectedComponent
  const ComponentConf = getComponentConfByType(type)
  if (ComponentConf == null) return <NoProp />
  const { PropComponent } = ComponentConf

  return <PropComponent {...props} />
}
export default ComponentProp
