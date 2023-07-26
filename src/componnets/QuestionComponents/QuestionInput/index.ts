/**
 * @file index.tsx
 * @description 问卷输入框组件
 */
import Component from './Component'
import { QuestionInputDefaultProps } from './interface'
export * from './interface'
export default {
  title: '输入框',
  type: 'QuestionInput', //问卷类型，和后端统一
  Component,
  defaultProps: QuestionInputDefaultProps,
}
