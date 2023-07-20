import React, { FC, useState } from 'react'
// 导入样式文件
import styles from './Common.module.scss'
// 引入标题hook
import { useTitle, useRequest } from 'ahooks'
// 引入antd的自定义组件
import { Typography, Empty, Table, Tag, Button, Space, Modal, Spin, message } from 'antd'
// 结构出确认
const { confirm } = Modal
// 结构出标题
const { Title } = Typography
// 引入图标
import { ExclamationCircleOutlined } from '@ant-design/icons'
// 引入自定义搜索框组件
import ListSearch from '../../componnets/ListSearch'
// 引入问卷搜索的hook
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
// 引入分页组件
import ListPage from '../../componnets/ListPage'
import { updateQuestionService, deleteQuestionService } from '../../services/question'

const Trash: FC = () => {
  useTitle('小慕问卷 - 我的问卷')

  const { data = {}, loading, refresh } = useLoadQuestionListData({ isDeleted: true })
  const { list = [], total = 0 } = data

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

  // 记录选中的id
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  // 恢复
  const { run: recover } = useRequest(
    async () => {
      // 遍历一个数组发起请求for await of执行异步函数
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      debounceWait: 500, //防抖
      onSuccess() {
        message.success('恢复成功')
        // 手动刷新列表
        refresh() // 手动重置，触发
        setSelectedIds([])
      },
    }
  )
  // 删除的函数
  const { run: deleteQuestion } = useRequest(
    async () => {
      const data = await deleteQuestionService(selectedIds)
      return data
    },
    {
      manual: true,
      onSuccess() {
        message.success('删除成功')
        // 手动刷新列表
        refresh()
        // 手动重置，触发
        setSelectedIds([])
      },
    }
  )
  function del() {
    confirm({
      title: '确认彻底删除问卷吗',
      icon: <ExclamationCircleOutlined />,
      content: '删除以后不可以找回',
      onOk: deleteQuestion,
    })
  }
  // 恢复 删除 和表格 多选框等的展示
  // 将jsx定义为变量的方法
  const TableElem = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0} onClick={recover}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={list}
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
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据"></Empty>}
        {/* 相关数据展示 tableelem表示jsx片段 */}
        {list.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  )
}
export default Trash
