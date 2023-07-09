import React, { FC, useState } from 'react'
// 导入样式文件
import styles from './Common.module.scss'
// 引入标题hook
import { useTitle } from 'ahooks'
// 引入antd的自定义组件
import { Typography, Empty, Table, Tag, Button, Space, Modal } from 'antd'
// 结构出确认
const { confirm } = Modal
// 结构出标题
const { Title } = Typography
// 引入图标
import { ExclamationCircleOutlined } from '@ant-design/icons'
// 引入自定义搜索框组件
import ListSearch from '../../componnets/ListSearch'
// 数据展示临时
const rawQuestionList = [
  { _id: 'q1', title: '问卷1', isStar: false, isPublished: false, answerCount: 2, createAt: '1' },
  { _id: 'q2', title: '问卷2', isStar: true, isPublished: true, answerCount: 2, createAt: '1' },
  { _id: 'q3', title: '问卷3', isStar: false, isPublished: false, answerCount: 2, createAt: '1' },
  { _id: 'q4', title: '问卷4', isStar: true, isPublished: true, answerCount: 2, createAt: '1' },
]
const Trash: FC = () => {
  useTitle('小慕问卷 - 我的问卷')
  // 表示显示的数据
  const [questionList, setQuestionList] = useState(rawQuestionList)
  // 记录选中的id
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  // 创建显示表格
  const tableColumns = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
      },
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
    },
  ]
  // 恢复 删除 和表格 多选框等的展示
  // 将jsx定义为变量的方法
  const TableElem = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={questionList}
        columns={tableColumns}
        pagination={false}
        rowKey={q => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRowKeys => {
            setSelectedIds(selectedRowKeys as string[])
          },
        }}
      />
    </>
  )
  // 删除的函数
  function del() {
    confirm({
      title: '确认彻底删除问卷吗',
      icon: <ExclamationCircleOutlined />,
      content: '删除以后不可以找回',
      onOk: () => alert(`删除${JSON.stringify(selectedIds)}成功`),
    })
  }
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      {/* 数据表格的显示 */}
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据"></Empty>}
        {/* 相关数据展示 tableelem表示jsx片段 */}
        {questionList.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  )
}
export default Trash
