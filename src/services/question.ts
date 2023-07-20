import axios, { ResDataType } from './ajax'
// 两种方式都可以
// import type { ResDataType } from './ajax'
// 定义问卷list的泛型
type SearchOption = {
  keyword: string // 搜索关键字
  isStar: boolean // 是否是星标问卷
  isDeleted: boolean // 是否是已删除问卷
  page: number // 页码
  pageSize: number // 页容量
}
// 获取单个问卷信息
export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const data = (await axios.get(url)) as ResDataType
  return data
}
// 创建问卷
export async function createQuestionService(): Promise<ResDataType> {
  const url = '/api/question'
  const data = (await axios.post(url)) as ResDataType
  return data
}
// 查询获取问卷列表（各种类型的）
export async function getQuestionListService(
  opt: Partial<SearchOption> = {}
): Promise<ResDataType> {
  const url = '/api/question'
  //   get请求配置url参数用下面这种配置
  const data = (await axios.get(url, { params: opt })) as ResDataType
  return data
}
// 更新单个问卷(包含假删除，因为也只是更新一个属性而不是彻底删除)
export async function updateQuestionService(
  id: string,
  opt: { [key: string]: any }
): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const data = (await axios.patch(url, opt)) as ResDataType
  return data
}
// 复制问卷
export async function duplicateQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/duplicate/${id}`
  const data = (await axios.post(url)) as ResDataType
  return data
}
// 批量彻底删除问卷
export async function deleteQuestionService(ids: string[]): Promise<ResDataType> {
  const url = '/api/question'
  const data = (await axios.delete(url, { data: { ids } })) as ResDataType
  return data
}
