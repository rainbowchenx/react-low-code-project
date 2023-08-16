/**
 * @file index.tsx
 * @description 问卷多行输入框组件
 */
import Component from './Component'
import { QuestionTextareaDefaultProps } from './interface'
// 导入右侧属性组件
import PropComponent from './PropComponent'
export * from './interface'
// 导出组件相关信息或者说配置信息
export default {
  title: '多行输入',
  type: 'QuestionTextarea', //问卷类型，和后端统一
  Component, //画布显示得组件
  defaultProps: QuestionTextareaDefaultProps,
  PropComponent, //属性组件
}
