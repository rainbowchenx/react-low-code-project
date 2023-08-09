import { ComponentInfoType } from './index'

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
