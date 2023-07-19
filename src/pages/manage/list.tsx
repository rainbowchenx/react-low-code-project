/*
 * @Author: rainbowchen 1664373735@qq.com
 * @Date: 2023-05-22 20:42:56
 * @LastEditors: rainbowchen 1664373735@qq.com
 * @LastEditTime: 2023-07-16 16:14:48
 * @FilePath: \react-low-code-project\src\pages\manage\list.tsx
 * @Description:list页面的显示
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React, { FC, useEffect, useState, useRef, useMemo } from 'react'
// import './List1.css'
import QuestionCard from '../../componnets/QuestionCard'
// 导入样式文件
import styles from './Common.module.scss'
// 引入标题hook和防抖hook
import { useTitle, useDebounceFn, useRequest } from 'ahooks'
// 引入antd的自定义组件
import { Typography, Spin, Empty } from 'antd'
const { Title } = Typography
// 导入自定义的搜索组件
import ListSearch from '../../componnets/ListSearch'
// 获取手动搜索的参数
import { useSearchParams } from 'react-router-dom'
//引入请求函数
import { getQuestionListService } from '../../services/question'
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../constant'

// TS 类型
const List: FC = () => {
  useTitle('小慕问卷 - 我的问卷')
  const [started, setStarted] = useState(false) //是否已经开始加载
  // url参数，需要keywords
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
  // 搜索时，重置数据
  useEffect(() => {
    setList([])
    setTotal(0)
    setPage(1)
    setStarted(false)
  }, [keyword])
  // 分别代表当前页面，总的列表数据，累计和所有的数据
  const [page, setPage] = useState(1)
  //次数的list和之前的不一样,内部数据，不在url中，也不是发请求得到的
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const haveMoreData = total > list.length //判断是否还有更多数据
  // 页面加载或者keyword变化时触发加载
  // 真正的加载函数
  const { loading, run: load } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      })
      return data
    },
    {
      manual: true, //默认是true，不会自动触发
      onSuccess: res => {
        const { list: l = [], total = 0 } = res
        setList(list.concat(l))
        setTotal(total)
        setPage(page + 1)
      },
    }
  )

  // 获取监听是否滑动到底的dom
  const containerRef = useRef<HTMLDivElement>(null)
  // 防抖函数,防止频繁触发，触发的函数就是tryLoadMore
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current
      if (!elem) return
      // 获取元素的位置信息,主要时bottom，用于判断是否到底
      const domRect = elem.getBoundingClientRect()
      if (domRect == null) return
      const { bottom } = domRect
      if (bottom <= document.body.clientHeight) {
        load()
        setStarted(true)
        console.log('触发加载')
      }
    },
    { wait: 500 }
  )
  // 进入页面时触发加载
  useEffect(() => {
    tryLoadMore()
  }, [searchParams])
  // 滑动触发加载
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore)
    }
    return () => {
      window.removeEventListener('scroll', tryLoadMore) //解绑事件
    }
  }, [searchParams, haveMoreData])
  // 渲染,向下滑动加载更多的显示
  const LoadMoreContentElem = useMemo(() => {
    if (!started || loading) return <Spin />
    if (total === 0) return <Empty description="暂无数据" />
    if (!haveMoreData) return <div>没有更多数据了</div>
    return <span>上划加载更多</span>
  }, [started, loading, total, haveMoreData])

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {/* 问卷列表 */}
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{LoadMoreContentElem}</div>
      </div>
    </>
  )
}

export default List
