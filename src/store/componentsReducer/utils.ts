import { ComponentInfoType, ComponentsStateType } from './index'

export function getNextSelectedId(componentList: ComponentInfoType[], selectedId: string) {
  // 选中的id前提是没有隐藏的
  const visibleComponentList = componentList.filter(item => !item.isHidden)
  const index = visibleComponentList.findIndex(item => item.fe_id === selectedId)
  //   页面中没有组件了
  if (index < 0) {
    return ''
  }
  //   let newSelectedId = ''
  //   const length = componentList.length
  //   if (length <= 1) {
  //     newSelectedId
  //   } else {
  //     if (index + 1 === length) {
  //       newSelectedId = componentList[index - 1].fe_id
  //     } else {
  //       newSelectedId = componentList[index + 1].fe_id
  //     }
  //   }

  return visibleComponentList[index + 1]?.fe_id || visibleComponentList[index - 1]?.fe_id
}
/**
 * @description 插入新组件
 * @param draft
 * @param newComponent
 */
export function insertNewComponent(state: ComponentsStateType, newComponent: ComponentInfoType) {
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
  // 新添加的组件为选中状态 k
  return {
    ...state,
    selectedId: newComponent.fe_id,
  }
}
