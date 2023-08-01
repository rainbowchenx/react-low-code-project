/**
 * @file index.tsx
 * @description 问卷标题组件
 */
import Component from './Component'
import { QuestionTitleDefaultProps } from './interface'
import PropComponent from './PropComponent'
export * from './interface'
// 导出组件相关信息或者说配置信息
export default {
  title: '标题',
  type: 'QuestionTitle', //问卷类型，和后端统一
  Component,
  PropComponent, //属性组件
  defaultProps: QuestionTitleDefaultProps,
}
