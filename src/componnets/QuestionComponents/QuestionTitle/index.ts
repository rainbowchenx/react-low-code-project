/**
 * @file index.tsx
 * @description 问卷标题组件
 */
import Component from './Component'
import { QuestionTitleDefaultProps } from './interface'
export * from './interface'
export default {
  title: '标题',
  type: 'QuestionTitle', //问卷类型，和后端统一
  Component,
  defaultProps: QuestionTitleDefaultProps,
}
