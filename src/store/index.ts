/*
 * @Author: rainbowchen 1664373735@qq.com
 * @Date: 2023-07-24 22:15:41
 * @LastEditors: rainbowchen 1664373735@qq.com
 * @LastEditTime: 2023-07-24 23:02:43
 * @FilePath: \react-low-code-project\src\store\index.ts
 * @Description: 创建redux store
 */
import { configureStore } from '@reduxjs/toolkit'
import undoable, { excludeAction, StateWithHistory } from 'redux-undo'
import userReducer, { UserStateType } from './userReducer'
import componentsReducer, { ComponentsStateType } from './componentsReducer'
import pageInfoReducer, { PageInfoType } from './pageInfoReducer'
// 设置store的类型
export type StateType = {
  user: UserStateType
  // components: ComponentsStateType
  component: StateWithHistory<ComponentsStateType>
  pageInfo: PageInfoType
}
export default configureStore({
  reducer: {
    user: userReducer,
    // 分模块，扩展问卷的信息
    // 组件列表
    // components: componentsReducer
    component: undoable(componentsReducer, {
      limit: 20, // set a limit for the history
      filter: excludeAction([
        'components/resetComponentList',
        'components/changeSelectedId',
        'components/selectPrevComponent',
        'components/selectNextComponent',
      ]), // 不记录的action
    }),
    // 页面信息
    pageInfo: pageInfoReducer,
  },
})
