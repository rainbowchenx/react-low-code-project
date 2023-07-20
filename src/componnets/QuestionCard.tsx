import React, { FC, useState } from 'react'
// 导入路由
import { useNavigate, Link } from 'react-router-dom'
// 导入antd组件
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from 'antd'
// 导入图标
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
// 导入样式文件
import styles from './QuestionCard.module.scss'
// 引入ajax请求函数,包括标星 复制 删除
import { updateQuestionService, duplicateQuestionService } from '../services/question'
import { useRequest } from 'ahooks'

// 获取modal中的confirm部分
const { confirm } = Modal
// ts 自定义类型
type PropsType = {
  _id: string //id
  title: string
  isStar: boolean //是否标星
  isPublished: boolean //是否发布
  answerCount: number //做了调查问卷的个数
  createAt: string //创建时间
}

// FC - functional component
const QuestionCard: FC<PropsType> = (props: PropsType) => {
  // 获取路由相关参数
  const nav = useNavigate()
  // 结构出相关参数
  const { _id, title, isPublished, createAt, isStar, answerCount } = props
  // 复制的回调函数
  const { loading: duplicateLoading, run: duplicate } = useRequest(
    async () => {
      const data = await duplicateQuestionService(_id)
      return data
    },
    {
      manual: true,
      onSuccess(result: any) {
        message.success('复制成功')
        nav(`/question/edit/${result.id}`)
      },
    }
  )
  // 修改标星,发起请求，由request实现
  const [isStarState, setIsStarState] = useState(isStar)
  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      const data = await updateQuestionService(_id, { isStar: !isStarState })
      return data
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState)
        message.success('修改成功')
      },
    }
  )
  // 删除的回调函数
  const [isDeletedState, setIsDeletedState] = useState(false)
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => {
      const data = await updateQuestionService(_id, { isDeleted: true })
      return data
    },
    {
      manual: true,
      onSuccess() {
        setIsDeletedState(true)
        message.success('删除成功')
      },
    }
  )
  function del() {
    confirm({
      title: '确定删除该问卷吗?',
      icon: <ExclamationCircleOutlined />,
      onOk: deleteQuestion,
    })
  }
  // 已经删除的问卷，就不要渲染了
  if (isDeletedState) {
    return null
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          {/* 是否发布的跳转逻辑 ,点击标题*/}
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {/* 是否标星的判断 */}
              {isStarState && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
        </div>
        {/* 是否发布,答卷数目和创建时间 */}
        <div className={styles.right}>
          <Space>
            {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
            <span>答卷:{answerCount}</span>
            <span>{createAt}</span>
          </Space>
        </div>
      </div>
      {/* 分割线 */}
      <Divider style={{ margin: '12px 0' }} />
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            {/* 编辑问卷按钮 */}
            <Button
              icon={<EditOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            {/* 问卷统计按钮 */}
            <Button
              icon={<LineChartOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/stat/${_id}`)}
              disabled={!isPublished}
            >
              问卷统计
            </Button>
          </Space>
        </div>
        {/* 是否标星 复制 删除 */}
        <div className={styles.right}>
          <Space>
            <Button
              type="text"
              icon={<StarOutlined />}
              size="small"
              onClick={changeStar}
              disabled={changeStarLoading}
            >
              {isStarState ? '取消标星' : '标星'}
            </Button>
            <Popconfirm
              title="确定复制该问卷?"
              okText="确定"
              cancelText="取消"
              onConfirm={duplicate}
            >
              <Button type="text" icon={<CopyOutlined />} size="small" disabled={duplicateLoading}>
                复制
              </Button>
            </Popconfirm>
            <Button
              type="text"
              icon={<DeleteOutlined />}
              size="small"
              onClick={del}
              disabled={deleteLoading}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
