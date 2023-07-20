import React, { ChangeEvent, FC } from 'react'
// 引入antd的自定义组件
import { Input } from 'antd'
// 引入路由相关的hook
import { useState, useEffect } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
// 引入常量
import { LIST_SEARCH_PARAM_KEY } from '../constant'

// 解构出Search
const { Search } = Input
const ListSearch: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [value, setValue] = useState('')
  //   input框的回调
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }
  //   获取url参数并设置到input框中
  const [SearchParams] = useSearchParams()
  useEffect(() => {
    const curVal = SearchParams.get(LIST_SEARCH_PARAM_KEY) || ''
    setValue(curVal)
  }, [SearchParams])
  //   搜索框的回调
  function handleSearch(value: string) {
    // 跳转页面，增加url参数
    nav({
      pathname: pathname,
      search: `?${LIST_SEARCH_PARAM_KEY}=${value}`, //并没有携带page 和pagesize参数
    })
  }
  return (
    <div>
      <Search
        allowClear
        placeholder="请输入关键字"
        onChange={handleChange}
        value={value}
        onSearch={handleSearch}
        style={{ width: '200px' }}
      />
    </div>
  )
}
export default ListSearch
