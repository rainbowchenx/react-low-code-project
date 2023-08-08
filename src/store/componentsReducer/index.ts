// 存储组件列表数据
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { produce } from 'immer'
// 引入组件的属性类型
import { ComponentPropsType } from '../../componnets/QuestionComponents'
import { stat } from 'fs'
// 定义组件信息的类型,类型参照后端返回的数据类型,单个组件的信息
export type ComponentInfoType = {
  fe_id: string //id标识
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
    addComponent: (state: ComponentsStateType, actions: PayloadAction<ComponentInfoType>) => {
      const newComponent = actions.payload
      const { selectedId, componentList } = state
      const index = componentList.findIndex(item => item.fe_id === selectedId)
      if (index < 0) {
        // 未选中任何组件
        state = {
          ...state,
          componentList: [...componentList, newComponent],
        }
      } else {
        // 选中某个组件
        state = {
          ...state,
          componentList: [
            ...componentList.slice(0, index + 1),
            newComponent,
            ...componentList.slice(index + 1),
          ],
        }
      }
      // 新添加的组件为选中状态
      state = {
        ...state,
        selectedId: newComponent.fe_id,
      }
      return state
    },
    // 修改组件属性
    changeComponentProps: (
      state: ComponentsStateType,
      actions: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
    ) => {
      console.log('changeComponentProps', actions.payload)
      const { fe_id, newProps } = actions.payload
      const { componentList } = state
      const index = componentList.findIndex(item => item.fe_id === fe_id)
      if (index < 0) {
        return state
      }
      state = {
        ...state,
        componentList: [
          ...componentList.slice(0, index),
          {
            ...componentList[index],
            props: newProps,
          },
          ...componentList.slice(index + 1),
        ],
      }
    },
    // 删除选中(selectedId)的组件
    removeSelectedComponent: (state: ComponentsStateType) => {
      const { componentList = [], selectedId: removeId } = state
      const index = componentList.findIndex(item => item.fe_id === removeId)
      // 重新计算selectedid

      if (index < 0) {
        return state
      }
      state = {
        ...state,
        componentList: [...componentList.slice(0, index), ...componentList.slice(index + 1)],
      }
      return state
    },
  },
})
export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
} = componentsSlice.actions
export default componentsSlice.reducer
