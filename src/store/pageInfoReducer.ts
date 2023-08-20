import { createSlice, PayloadAction } from '@reduxjs/toolkit'
export type PageInfoType = {
  title: string
  desc?: string
  js?: string
  css?: string
}
const INIT_STATE: PageInfoType = {
  title: '',
  desc: '',
  js: '',
  css: '',
}
const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState: INIT_STATE,
  reducers: {
    // 重置页面信息
    resetPageInfo: (state: PageInfoType, action: PayloadAction<PageInfoType>) => {
      return action.payload
    },
    // 修改标题信息
    changePageTitle: (state: PageInfoType, action: PayloadAction<string>) => {
      const newTitle = action.payload
      return {
        ...state,
        title: newTitle,
      }
    },
  },
})
export const { resetPageInfo, changePageTitle } = pageInfoSlice.actions
export default pageInfoSlice.reducer
