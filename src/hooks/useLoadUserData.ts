//通过ajax请求获取用户信息，并存储到redux store中
import { useEffect, useState } from 'react'
// 引入useRequest用于发请求相关
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
// 获取redux store中的username
import useGetUserInfo from './useGetUserInfo'
// 引入获取用户信息的service
import { getUserInfoService } from '../services/user'
import { loginReducer } from '../store/userReducer'
function userLoadUserData() {
  const dispatch = useDispatch()
  // 用于判断是否重新加载
  const [waitingUserData, setWaitingUserData] = useState(true)
  //   ajax请求加载用户信息
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
  useEffect(() => {
    if (username) {
      setWaitingUserData(false)
    }
    run()
  }, [username])

  return { waitingUserData }
}
export default userLoadUserData
