// 存储组件列表数据
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '../../componnets/QuestionComponents'
export type ComponentInfoType = {
  fe_id: string //TODO
  type: string //问卷的类型
  title: string //问卷的标题
  props: ComponentPropsType
}
export type ComponentsStateType = {
  componentList: Array<ComponentInfoType>
}
const INIT_STATE: ComponentsStateType = {
  componentList: [],
  // 其他的扩展
}
export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (state: ComponentsStateType, actions: PayloadAction<ComponentsStateType>) => {
      return actions.payload
    },
  },
})
export const { resetComponents } = componentsSlice.actions
export default componentsSlice.reducer
