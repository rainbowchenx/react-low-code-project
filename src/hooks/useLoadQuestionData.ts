// 自定义hook
// 加载单个问卷的详细数据

// import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getQuestionService } from '../services/question'
// 请求管理hook
import { useRequest } from 'ahooks'
function useLoadQuestionData() {
  const { id = '' } = useParams()

  //   const [questionData, setQuestionData] = useState({})
  //   const [loading, setLoading] = useState(true)
  //   useEffect(() => {
  //     async function fn() {
  //       const data = await getQuestionService(id)
  //       setQuestionData(data)
  //       setLoading(false)
  //     }
  //     fn()
  //   }, [])
  //   return { questionData, loading }
  async function load() {
    const data = await getQuestionService(id)
    return data
  }
  const { loading, data, error } = useRequest(load)
  return { loading, data, error }
}

export default useLoadQuestionData
