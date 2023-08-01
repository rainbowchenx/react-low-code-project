// 存储组件列表数据
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { produce } from 'immer'
// 引入组件的属性类型
import { ComponentPropsType } from '../../componnets/QuestionComponents'
// 定义组件信息的类型,类型参照后端返回的数据类型,单个组件的信息
export type ComponentInfoType = {
  fe_id: string //TODO
  type: string //问卷的类型
  title: string //问卷的标题
  props: ComponentPropsType //问卷的属性，单独定义
}
// 各个组件组成的组件列表的类型
export type ComponentsStateType = {
  selectedId: string //当前选中的组件的id
  componentList: Array<ComponentInfoType>
}
// 初始化组件列表的数据
const INIT_STATE: ComponentsStateType = {
  selectedId: '',
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
    // 使用immer改变react state不可变数据的写法
    // 修改selectedId,通常是禁止直接进行修改的，所以使用immer中的produce进行修改
    // changeSelectedId: produce((draft: ComponentsStateType, actions: PayloadAction<string>) => {
    //   console.log('actions.payload2', actions.payload)
    //   console.log('draft', draft)
    //   draft.selectedId = actions.payload
    // }),
    changeSelectedId: (state: ComponentsStateType, actions: PayloadAction<string>) => {
      state = {
        ...state,
        selectedId: actions.payload,
      }
      return state
    },
    /**
     * @description: 添加组件,有选中，即selectedid存在，则新组件插入到选中组件的后面，否则插入到最后
     */
    // TODO:存在bug
    addComponent: produce(
      (draft: ComponentsStateType, actions: PayloadAction<ComponentInfoType>) => {
        const newComponent = actions.payload
        const { selectedId, componentList } = draft
        const index = componentList.findIndex(item => item.fe_id === selectedId)
        if (index < 0) {
          // 未选中任何组件
          draft.componentList.push(newComponent)
        } else {
          // 选中了某个组件
          draft.componentList.splice(index + 1, 0, newComponent)
        }
        // 新添加的组件为选中状态
        draft.selectedId = newComponent.fe_id
      }
    ),
  },
})
export const { resetComponents, changeSelectedId, addComponent } = componentsSlice.actions
export default componentsSlice.reducer
