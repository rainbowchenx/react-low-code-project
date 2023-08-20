/**
 * @description 编辑问卷页面的头部
 */
import React, { FC, useState, ChangeEvent } from 'react'
import { Button, Typography, Space, Input } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { EditOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import EditToolbar from './EditToolbar'
import styles from './EditHeader.module.scss'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { changePageTitle } from '../../../store/pageInfoReducer'
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
            <Button>保存</Button>
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  )
}
export default EditHeader
