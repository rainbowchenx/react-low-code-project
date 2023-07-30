// 存储组件列表数据
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// 引入组件的属性类型
import { ComponentPropsType } from '../../componnets/QuestionComponents'
// 定义组件信息的类型,类型参照后端返回的数据类型,单个组件的信息
export type ComponentInfoType = {
  fe_id: string //TODO
  type: string //问卷的类型
  title: string //问卷的标题
  props: ComponentPropsType //问卷的属性，单独定义
}
// 组件列表的类型
export type ComponentsStateType = {
  componentList: Array<ComponentInfoType>
}
// 初始化组件列表的数据
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
