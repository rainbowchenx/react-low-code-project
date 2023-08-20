/**
 * @description 编辑问卷页面的头部中间的编辑工具箱部分
 */
import React, { FC } from 'react'
import { Button, Space, Tooltip } from 'antd'
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
  UpOutlined,
  DownOutlined,
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import {
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  moveComponent,
} from '../../../store/componentsReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

const EditToolbar: FC = () => {
  const dispatch = useDispatch()
  const { selectedId, selectedComponent, copiedComponent, componentList } = useGetComponentInfo()
  const { isLocked } = selectedComponent || {}
  const length = componentList.length
  const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)
  const isLast = selectedIndex === length - 1
  const isFirst = selectedIndex <= 0
  // 删除问卷的函数
  function handleDelete() {
    dispatch(removeSelectedComponent())
  }
  // 隐藏问卷的函数
  function handleHidden() {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
  }
  // 锁定问卷的函数
  function handleLock() {
    dispatch(toggleComponentLocked({ fe_id: selectedId }))
  }
  // 复制问卷
  function copy() {
    dispatch(copySelectedComponent())
  }
  // 粘贴问卷
  function paste() {
    dispatch(pasteCopiedComponent())
  }
  // 上移问卷
  function moveUp() {
    dispatch(
      moveComponent({
        oldIndex: selectedIndex,
        newIndex: selectedIndex - 1,
      })
    )
  }
  // 下移问卷
  function moveDown() {
    dispatch(
      moveComponent({
        oldIndex: selectedIndex,
        newIndex: selectedIndex + 1,
      })
    )
  }
  // TODO 撤销和重做

  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete} />
      </Tooltip>
      <Tooltip title="隐藏">
        <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHidden} />
      </Tooltip>
      <Tooltip title="修改">
        <Button
          shape="circle"
          icon={<LockOutlined />}
          onClick={handleLock}
          type={isLocked ? 'primary' : 'default'}
        />
      </Tooltip>
      <Tooltip title="复制">
        <Button shape="circle" icon={<CopyOutlined />} onClick={copy} />
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          onClick={paste}
          disabled={copiedComponent == null}
        />
      </Tooltip>
      <Tooltip title="上移">
        <Button shape="circle" icon={<UpOutlined />} onClick={moveUp} disabled={isFirst} />
      </Tooltip>
      <Tooltip title="下移">
        <Button shape="circle" icon={<DownOutlined />} onClick={moveDown} disabled={isLast} />
      </Tooltip>
    </Space>
  )
}
export default EditToolbar
