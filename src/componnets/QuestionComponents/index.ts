/**
 * @description 组件类型的入口文件,包括组件的配置,组件的类型,组件的默认值
 */
import type { FC } from 'react'
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle'
// 各个组件的type
export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType
// 统一定义组件的配置
export type ComponentConfType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}
// 全部组件配置的列表
const componentConfList: ComponentConfType[] = [QuestionInputConf, QuestionTitleConf]
// 根据组件的type获取组件的配置
export function getComponentConfByType(type: string) {
  return componentConfList.find(item => item.type === type)
}
