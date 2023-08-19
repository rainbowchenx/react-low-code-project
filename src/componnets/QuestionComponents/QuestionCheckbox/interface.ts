// 单个选项的属性，包括属性值（只要不同即可），文本，是否选中
export type OptionType = {
  value: string
  text: string
  checked: boolean
}
// 多选框组件的属性，包括标题，是否垂直，选项列表
export type QuestionCheckboxPropsType = {
  title?: string
  isVertical?: boolean
  list?: OptionType[]
  //用于prop
  onChange?: (newProps: QuestionCheckboxPropsType) => void
  disabled?: boolean
}
export const QuestionCheckboxDefaultProps: QuestionCheckboxPropsType = {
  title: '多选选项',
  isVertical: false,
  list: [
    {
      value: '1',
      text: '选项1',
      checked: false,
    },
    {
      value: '2',
      text: '选项2',
      checked: false,
    },
    {
      value: '3',
      text: '选项3',
      checked: false,
    },
  ],
}
