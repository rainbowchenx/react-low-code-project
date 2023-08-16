/**
 * @description:定义组件的类型
 */
export type QuestionParagraphPropType = {
  text?: string
  isCenter?: boolean
  // 用于propComponent
  onChange?: (newProps: QuestionParagraphPropType) => void
  disabled?: boolean
}

export const QuestionParagraphDefaultProps: QuestionParagraphPropType = {
  text: '一行段落',
  isCenter: false,
}
