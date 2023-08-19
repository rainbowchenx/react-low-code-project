// 存储组件列表数据
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import cloneDeep from 'lodash.clonedeep'
import { nanoid } from '@reduxjs/toolkit'
// import produce from 'immer'
// 引入组件的属性类型
import { ComponentPropsType } from '../../componnets/QuestionComponents'
import { getNextSelectedId, insertNewComponent } from './utils'
// 定义组件信息的类型,类型参照后端返回的数据类型,单个组件的信息
export type ComponentInfoType = {
  fe_id: string //id标识
  type: string //问卷的类型
  title: string //问卷的标题
  isHidden?: boolean //是否隐藏
  isLocked?: boolean //是否锁定
  props: ComponentPropsType //问卷的属性，单独定义
}
// 各个组件组成的组件列表的类型
export type ComponentsStateType = {
  selectedId: string //当前选中的组件的id
  componentList: Array<ComponentInfoType>
  copiedComponent: ComponentInfoType | null // 复制的组件
}
// 初始化组件列表的数据
const INIT_STATE: ComponentsStateType = {
  selectedId: '',
  componentList: [],
  copiedComponent: null,

  // 其他的扩展
}
export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload
    },
    changeSelectedId: (state: ComponentsStateType, action: PayloadAction<string>) => {
      state = {
        ...state,
        selectedId: action.payload,
      }
      return state
    },
    /**
     * @description: 添加组件,有选中，即selectedid存在，则新组件插入到选中组件的后面，否则插入到最后
     */
    addComponent: (state: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
      const newComponent = action.payload
      insertNewComponent(state, newComponent)
    },
    // 修改组件属性
    changeComponentProps: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
    ) => {
      const { fe_id, newProps } = action.payload
      const { componentList } = state
      console.log('changeComponentProps', componentList)
      const index = componentList.findIndex(item => item.fe_id === fe_id)
      if (index < 0) {
        return state
      }
      return {
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
      console.log('removeSelectedComponent 执行了', state)
      const index = componentList.findIndex(item => item.fe_id === removeId)
      // 重新计算selectedid
      const newSelectedId = getNextSelectedId(componentList, removeId)
      if (index < 0) {
        return state
      }
      return {
        ...state,
        selectedId: newSelectedId,
        componentList: [...componentList.slice(0, index), ...componentList.slice(index + 1)],
      }
    },
    // 隐藏和显示组件，组件中isHidden属性
    changeComponentHidden: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; isHidden: boolean }>
    ) => {
      const { fe_id, isHidden } = action.payload
      const { componentList } = state
      const index = componentList.findIndex(item => item.fe_id === fe_id)
      // 重新计算selectedid
      let newSelectedId = ''
      if (isHidden) {
        // 隐藏组件
        newSelectedId = getNextSelectedId(componentList, fe_id)
      } else {
        // 显示组件
        newSelectedId = fe_id
      }
      if (index < 0) {
        return state
      }
      console.log('新的index', state)
      return {
        ...state,
        selectedId: newSelectedId,
        componentList: [
          ...componentList.slice(0, index),
          {
            ...componentList[index],
            isHidden,
          },
          ...componentList.slice(index + 1),
        ],
      }
    },
    // 锁定和解除锁定组件
    toggleComponentLocked: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string }>
    ) => {
      const { fe_id } = action.payload
      const { componentList } = state
      const index = componentList.findIndex(item => item.fe_id === fe_id)
      if (index < 0) {
        return state
      }
      return {
        ...state,
        componentList: [
          ...componentList.slice(0, index),
          {
            ...componentList[index],
            isLocked: !componentList[index].isLocked,
          },
          ...componentList.slice(index + 1),
        ],
      }
    },
    // 复制当前选中的组件
    copySelectedComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList } = state
      const index = componentList.findIndex(item => item.fe_id === selectedId)
      if (index < 0) {
        return state
      }
      return {
        ...state,
        copiedComponent: cloneDeep(componentList[index]),
      }
    },
    // 粘贴复制的组件》
    pasteCopiedComponent: (state: ComponentsStateType) => {
      const { copiedComponent } = state
      if (copiedComponent === null) return state
      copiedComponent.fe_id = nanoid()
      insertNewComponent(state, copiedComponent)
    },
    // 选中上一个组件
    selectPrevComponent: (state: ComponentsStateType) => {
      const { componentList, selectedId } = state
      const index = componentList.findIndex(item => item.fe_id === selectedId)
      if (index < 0) {
        return state
      }
      if (index <= 0) return state
      const newSelectedId = componentList[index - 1].fe_id
      return {
        ...state,
        selectedId: newSelectedId,
      }
    },
    // 选中下一个组件
    selectNextComponent: (state: ComponentsStateType) => {
      const { componentList, selectedId } = state
      const index = componentList.findIndex(item => item.fe_id === selectedId)
      if (index < 0) {
        return state
      }
      if (index + 1 === componentList.length) return state
      const newSelectedId = componentList[index + 1].fe_id
      return {
        ...state,
        selectedId: newSelectedId,
      }
    },
    // 修改标题的
    changeComponentTitle: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; title: string }>
    ) => {
      const { fe_id, title } = action.payload
      const { componentList } = state
      const index = componentList.findIndex(item => item.fe_id === fe_id)
      if (index < 0) {
        return state
      }
      return {
        ...state,
        componentList: [
          ...componentList.slice(0, index),
          {
            ...componentList[index],
            title,
          },
          ...componentList.slice(index + 1),
        ],
      }
    },
  },
})
export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
  changeComponentTitle,
} = componentsSlice.actions
export default componentsSlice.reducer
