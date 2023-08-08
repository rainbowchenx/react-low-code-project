import { ComponentInfoType } from './index'

export function getNextSelectedId(componentList: ComponentInfoType[], selectedId: string) {
  const index = componentList.findIndex(item => item.fe_id === selectedId)
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

  return componentList[index + 1]?.fe_id || componentList[index - 1]?.fe_id
}
