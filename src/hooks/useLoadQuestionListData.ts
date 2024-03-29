/*
 * @Author: rainbowchen 1664373735@qq.com
 * @Date: 2023-07-15 18:39:45
 * @LastEditors: rainbowchen 1664373735@qq.com
 * @LastEditTime: 2023-07-20 08:34:28
 * @FilePath: \react-low-code-project\src\hooks\useLoadQuestionListData.ts
 * @Description:获取问卷列表的hook
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
// 根据搜索的参数来筛选问卷列表的hook
/**
 * @description:
 * @param {Partial} opt
 * @param {*} useeffect
 * @param {*} param3
 * @return {*}
 */
import { useRequest } from 'ahooks'
import { getQuestionListService } from '../services/question'
import { useSearchParams } from 'react-router-dom'
import {
  LIST_SEARCH_PARAM_KEY,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_PAGE_SIZE,
} from '../constant'

type OptionType = {
  isStar: boolean
  isDeleted: boolean
}

function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
  const { isStar, isDeleted } = opt
  const [searchParams] = useSearchParams()
  //   useRequest的第一个参数是一个异步函数，第二个参数是一个配置对象,基于useeffect
  //  useRequest的返回值是一个对象，包含data,loading,error,refresh
  // data是异步函数的返回值，loading是异步函数是否在加载，error是异步函数的错误信息，refresh是刷新函数
  const { data, loading, error, refresh } = useRequest(
    async () => {
      //  获取url中的参数
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
      const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
      const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE
      //  带着url中的参数调用service获取数据
      const data = await getQuestionListService({ keyword, isStar, isDeleted, page, pageSize })
      return data
    },
    {
      refreshDeps: [searchParams],
    }
  )
  return { data, error, loading, refresh }
}
export default useLoadQuestionListData
