/**
 * @description: 问卷的段落组件
 */
import Component from './Component'
import { QuestionParagraphDefaultProps } from './interface'
import PropComponent from './PropComponent'
export * from './interface'
// paragraph组件的配置
export default {
  title: '段落',
  type: 'QuestionParagraph',
  Component,
  PropComponent: PropComponent,
  defaultProps: QuestionParagraphDefaultProps,
}
