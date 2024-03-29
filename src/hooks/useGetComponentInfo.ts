/**
 * @description 获取组件相关信息的hooks
 * @说明: 该hooks用于获取组件相关信息,包括组件列表,组件的属性列表等
 *
 */
import { useSelector } from 'react-redux'
// 导入store的类型,以及组件相关的类型
import { StateType } from '../store'
import { ComponentsStateType } from '../store/componentsReducer'

function useGetComponentInfo() {
  // 获取store中的组件相关数据,类型断言一下
  const components = useSelector<StateType>(state => state.component.present) as ComponentsStateType
  const { componentList = [], selectedId, copiedComponent } = components
  // 根据selectedId获取当前选中的组件
  const selectedComponent = componentList.find(item => item.fe_id === selectedId)
  return {
    componentList,
    selectedId,
    selectedComponent,
    copiedComponent,
  }
}

export default useGetComponentInfo
