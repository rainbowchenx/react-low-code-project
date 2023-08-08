/**
 * @description 编辑问卷页面的头部
 */
import React, { FC } from 'react'
import { Button, Typography, Space } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import EditToolbar from './EditToolbar'
import styles from './EditHeader.module.scss'
const { Title } = Typography
const EditHeader: FC = () => {
  const nav = useNavigate()
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles['header']}>
        <div className={styles['left']}>
          <Space>
            <Title level={4}>问卷标题</Title>
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
