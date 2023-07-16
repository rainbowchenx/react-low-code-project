import React, { FC, useEffect, useState } from 'react'
import { Pagination } from 'antd'
import { LIST_PAGE_SIZE, LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE_PARAM_KEY } from '../constant'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
type PropsType = {
  total: number
}
const ListPage: FC<PropsType> = (props: PropsType) => {
  const [searchParams] = useSearchParams()
  // 控制当前页数和每页条数以及总的数目
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE)
  const { total } = props
  // 监听url中searchParams的变化，并更新current和pageSize的值，total是固定获取的
  // 从url中获取当前页数和每页条数并同步到pagination中
  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
    setCurrent(page)
    const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE
    setPageSize(pageSize)
  }, [searchParams])
  // onchange的回调,跳转页面，即改变url的参数
  const nav = useNavigate()
  const { pathname } = useLocation()
  function handlePageChange(page: number, pageSize?: number) {
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString())
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize?.toString() || LIST_PAGE_SIZE.toString())
    nav({
      pathname,
      search: searchParams.toString(),
    })
  }

  return (
    <Pagination total={total} current={current} pageSize={pageSize} onChange={handlePageChange} />
  )
}
export default ListPage
