/**
 * @description 编辑问卷页面的头部中间的编辑工具箱部分
 */
import React, { FC } from 'react'
import { Button, Space, Tooltip } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { removeSelectedComponent } from '../../../store/componentsReducer'

const EditToolbar: FC = () => {
  const dispatch = useDispatch()
  // 删除问卷的函数
  function handleDelete() {
    dispatch(removeSelectedComponent())
  }

  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete} />
      </Tooltip>
    </Space>
  )
}
export default EditToolbar
