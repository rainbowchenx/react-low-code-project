import axios, { ResDataType } from './ajax'
// 获取用户信息
export async function getUserInfoService(): Promise<ResDataType> {
  const url = '/api/user'
  const data = (await axios.get(url)) as ResDataType
  return data
}
// 注册用户
export async function registerUserService(
  username: string,
  password: string,
  nickname?: string
): Promise<ResDataType> {
  const url = '/api/user/register'
  const body = { username, password, nickname: nickname || username }
  const data = (await axios.post(url, body)) as ResDataType
  return data
}
// 登录
export async function loginUserService(username: string, password: string): Promise<ResDataType> {
  const url = '/api/user/login'
  const body = { username, password }
  const data = (await axios.post(url, body)) as ResDataType
  return data
}
