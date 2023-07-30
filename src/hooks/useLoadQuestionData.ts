// 自定义hook
// 加载单个问卷的详细数据

// import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getQuestionService } from '../services/question'
// 请求管理hook
import { useRequest } from 'ahooks'
import { useEffect } from 'react'
// 导入disspatch
import { useDispatch } from 'react-redux'
// 导入action
import { resetComponents } from '../store/componentsReducer'
function useLoadQuestionData() {
  const dispatch = useDispatch()
  // 从url中获取问卷id
  const { id = '' } = useParams()
  // ajax加载数据
  const { data, error, loading, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('id is empty')
      const data = await getQuestionService(id)
      return data
    },
    {
      manual: true,
    }
  )
  // 根据获取的data设置redux store
  useEffect(() => {
    if (!data) return
    const { title = '', componentList = [] } = data
    // 获取默认的selectedId,默认选中第一个组件
    let selectedId = ''
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id
    }
    // 将componentlist存入redux
    dispatch(resetComponents({ componentList, selectedId }))
  }, [data])

  // 判断id变化，执行ajax加载问卷数据
  useEffect(() => {
    run(id)
  }, [id])
  return { loading, error }
}
export default useLoadQuestionData
