/**
 * @description 问题复选框组件
 */
import Component from './Component'
import { QuestionCheckboxDefaultProps } from './interface'
import PropComponent from './PropComponent'
export * from './interface'
export default {
  title: '多选',
  type: 'QuestionCheckbox',
  Component,
  PropComponent,
  defaultProps: QuestionCheckboxDefaultProps,
}
