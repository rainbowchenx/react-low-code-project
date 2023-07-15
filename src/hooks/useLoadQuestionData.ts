// 自定义hook
// 加载单个问卷的详细数据

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getQuestionService } from '../services/question'
function useLoadQuestionData() {
  const { id = '' } = useParams()
  const [questionData, setQuestionData] = useState<any>({})
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    async function fn() {
      const data = await getQuestionService(id)
      setQuestionData(data)
      setLoading(false)
    }
    fn()
  }, [])
  return { questionData, loading }
}

export default useLoadQuestionData
