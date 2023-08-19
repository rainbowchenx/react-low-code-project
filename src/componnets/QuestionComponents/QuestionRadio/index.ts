/**
 * @description: 问卷单选组件
 */
import Component from './Component'
import { QuestionRadioDefaultProps } from './interface'
import PropComponent from './PropComponent'
export * from './interface'
export default {
  title: '单选',
  type: 'QuestionRadio',
  Component,
  PropComponent: PropComponent,
  defaultProps: QuestionRadioDefaultProps,
}
