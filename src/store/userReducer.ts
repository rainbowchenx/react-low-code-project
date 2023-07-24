import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// 设置state的类型
export type UserStateType = {
  username: string
  nickname: string
}
// 设置state的初始值
const INIT_STATE: UserStateType = {
  username: '',
  nickname: '',
}
// 创建slice
export const userSlice = createSlice({
  name: 'user',
  initialState: INIT_STATE,
  //   创建reducer，函数名就是action的type action
  reducers: {
    loginReducer: (state, action: PayloadAction<UserStateType>) => {
      return action.payload
    },
    logoutReducer: () => {
      return INIT_STATE
    },
  },
})

export const { loginReducer, logoutReducer } = userSlice.actions
export default userSlice.reducer
