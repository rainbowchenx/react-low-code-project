//通过ajax请求(利用userequest来发请求)获取用户信息，并存储到redux store中
import { useEffect, useState } from 'react'
import { useRequest } from 'ahooks'
// 引入获取用户信息的service ajax请求
import { getUserInfoService } from '../services/user'
import { loginReducer } from '../store/userReducer'
import { useDispatch } from 'react-redux'
// 获取redux store中的username
import useGetUserInfo from './useGetUserInfo'
function userLoadUserData() {
  console.log('userLoadUserData触发了')
  const dispatch = useDispatch()
  // 用于判断用户是否已经获取到用户信息的状态管理
  const [waitingUserData, setWaitingUserData] = useState(true)
  console.log(waitingUserData)
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result
      dispatch(loginReducer({ username, nickname }))
    },
    onFinally() {
      setWaitingUserData(false)
    },
  })
  const { username } = useGetUserInfo()
  //   判断当前redux store中是否有username，如果有，说明已经获取到用户信息，设置waitingUserData为false
  const loginName = username ? true : false
  useEffect(() => {
    if (username) {
      setWaitingUserData(false)
    }
    run()
  }, [loginName])

  return { waitingUserData }
}
export default userLoadUserData
