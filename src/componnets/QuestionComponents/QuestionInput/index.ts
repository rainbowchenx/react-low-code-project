/**
 * @file index.tsx
 * @description 问卷输入框组件
 */
import Component from './Component'
import { QuestionInputDefaultProps } from './interface'
export * from './interface'
// 导出组件相关信息或者说配置信息
export default {
  title: '输入框',
  type: 'QuestionInput', //问卷类型，和后端统一
  Component, //画布显示得组件
  defaultProps: QuestionInputDefaultProps,
}
