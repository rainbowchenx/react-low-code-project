/**
 * @description 编辑问卷页面的头部
 */
import React, { FC, useState, ChangeEvent } from 'react'
import { Button, Typography, Space, Input, message } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { EditOutlined, LoadingOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import EditToolbar from './EditToolbar'
import styles from './EditHeader.module.scss'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { changePageTitle } from '../../../store/pageInfoReducer'
import { useRequest, useKeyPress, useDebounceEffect } from 'ahooks'
import { updateQuestionService } from '../../../services/question'
const { Title } = Typography

// 显示和修改标题
const TitleElem: FC = () => {
  const { title } = useGetPageInfo()
  const dispatch = useDispatch()
  const [editState, setEditState] = useState(false)
  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    const newValues = event.target.value.trim()
    console.log(newValues)
    if (!newValues) return
    dispatch(changePageTitle(newValues))
  }
  if (editState) {
    return (
      <Input
        value={title}
        onBlur={() => setEditState(false)}
        onPressEnter={() => setEditState(false)}
        onChange={handleTitleChange}
      />
    )
  }
  return (
    <Space>
      <Title level={4}>{title}</Title>
      <Button icon={<EditOutlined />} type="text" onClick={() => setEditState(true)} />
    </Space>
  )
}
// 保存按钮的组件
const SaveBtn: FC = () => {
  // 保存所有componentlist和pageinfo的信息
  const { id } = useParams()
  const { componentList } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()
  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(id, { ...pageInfo, componentList })
    },
    {
      manual: true,
      onSuccess() {
        message.success('保存成功')
      },
    }
  )
  // 快捷键
  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    event.preventDefault()
    if (!loading) save()
  })
  // 自动保存
  useDebounceEffect(
    () => {
      if (!id) return
      save()
    },
    [componentList, pageInfo],
    { wait: 30000 }
  )

  return (
    <Button onClick={save} disabled={loading} icon={loading ? <LoadingOutlined /> : null}>
      保存
    </Button>
  )
}
// 发布按钮的组件(修改ispublished属性)
const PublishBtn: FC = () => {
  const nav = useNavigate()
  // 保存所有componentlist和pageinfo的信息
  const { id } = useParams()
  const { componentList } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()
  const { loading, run: pub } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(id, { ...pageInfo, componentList, ispublished: true })
    },
    {
      manual: true,
      onSuccess() {
        message.success('发布成功')
        nav('/question/stat/' + id)
      },
    }
  )
  return (
    <Button type="primary" onClick={pub} disabled={loading}>
      发布
    </Button>
  )
}
// 编辑器头部
const EditHeader: FC = () => {
  const nav = useNavigate()
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles['header']}>
        <div className={styles['left']}>
          <Space>
            <Title level={4}>
              <TitleElem />
            </Title>
          </Space>
          <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
            返回
          </Button>
        </div>
        <div className={styles['main']}>
          <EditToolbar />
        </div>
        <div className={styles['right']}>
          <Space>
            <SaveBtn />
            <PublishBtn />
          </Space>
        </div>
      </div>
    </div>
  )
}
export default EditHeader
