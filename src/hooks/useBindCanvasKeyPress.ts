/**
 * @description 绑定画布快捷键的hooks,注意和苹果端的兼容
 */
import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import {
  removeSelectedComponent,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
} from '../store/componentsReducer'
// 判断当前焦点元素是否是可编辑元素
function isActiveElementValid() {
  const activeElement = document.activeElement
  if (activeElement === document.body) return true
  // css查询器匹配
  if (activeElement?.matches('div[role="button"]')) return true
}
function useBindCanvasKeyPress() {
  const dispatch = useDispatch()
  // 删除组件
  useKeyPress(['Delete', 'backspace'], () => {
    if (!isActiveElementValid()) return
    dispatch(removeSelectedComponent())
  })
  // 复制组件
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElementValid()) return
    dispatch(copySelectedComponent())
  })
  // 粘贴组件
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElementValid()) return
    dispatch(pasteCopiedComponent())
  })
  //选中上一个
  useKeyPress(['uparrow'], () => {
    if (!isActiveElementValid()) return
    dispatch(selectPrevComponent())
  })
  //选中下一个
  useKeyPress(['downarrow'], () => {
    if (!isActiveElementValid()) return
    dispatch(selectNextComponent())
  })
  // 撤销
  useKeyPress(
    ['ctrl.z', 'meta.z'],
    () => {
      if (!isActiveElementValid()) return
      dispatch(UndoActionCreators.undo())
    },
    {
      exactMatch: true, //严格匹配
    }
  )
  // 重做
  useKeyPress(
    ['ctrl..shift.z', 'meta.shift.z'],
    () => {
      if (!isActiveElementValid()) return
      dispatch(UndoActionCreators.redo())
    },
    {
      exactMatch: true,
    }
  )
}
export default useBindCanvasKeyPress
