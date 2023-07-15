import React, { FC, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import styles from './ManageLayout.module.scss'
import { Button, Space, Divider, message } from 'antd'
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
// 引入创建问卷的函数
import { createQuestionService } from '../services/question'

const ManageLayout: FC = () => {
  // 获取导航的hook
  const nav = useNavigate()
  // 获取当前页面相关数据的hook
  const { pathname } = useLocation()
  // 管理问卷的loading状态
  const [loading, setLoading] = useState(false)
  // 创建问卷的点击事件
  async function handleCreateClick() {
    setLoading(true)
    const data = await createQuestionService()
    const { id } = data || {}
    if (id) {
      nav(`/question/edit/${id}`)
      message.success('创建成功')
    }
    setLoading(false)
  }
  return (
    <div className={styles.container}>
      <div className={styles.left}></div>
      <Space direction="vertical">
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={handleCreateClick}
          disabled={loading}
        >
          新建问卷
        </Button>
        <Divider></Divider>
        <Button
          type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
          size="large"
          icon={<BarsOutlined />}
          onClick={() => nav('/manage/list')}
        >
          我的问卷
        </Button>
        <Button
          type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
          size="large"
          icon={<StarOutlined />}
          onClick={() => nav('/manage/star')}
        >
          星标问卷
        </Button>
        <Button
          type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
          size="large"
          icon={<DeleteOutlined />}
          onClick={() => nav('/manage/trash')}
        >
          回收站
        </Button>
      </Space>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  )
}
export default ManageLayout
