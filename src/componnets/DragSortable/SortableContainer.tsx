/**
 * @description 拖拽排序容器,用于包裹需要拖拽排序的组件
 * @param {children} JSX.Element | JSX.Element[] 需要拖拽排序的组件
 * @param {items} Array<{ id: string; [key: string]: any }> 拖拽排序的数据
 * @param {onDragEnd} (oldIndex: number, newIndex: number) => void 拖拽结束后的回调函数
 */
import React, { FC } from 'react'
import {
  DndContext,
  closestCenter,
  MouseSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
// 允许在其中插入子组件
type PropsType = {
  children: JSX.Element | JSX.Element[]
  items: Array<{ id: string; [key: string]: any }>
  onDragEnd: (oldIndex: number, newIndex: number) => void
}
const SortableContainer: FC<PropsType> = (props: PropsType) => {
  const { children, items, onDragEnd } = props
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8, //移动判断拖拽的最小距离
      },
    })
  )
  //   拖拽结束后的处理,主要是计算拖拽前后的index
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over == null) return
    if (active.id !== over.id) {
      const oldIndex = items.findIndex(item => item.id === active.id)
      const newIndex = items.findIndex(item => item.id === over.id)
      onDragEnd(oldIndex, newIndex)
    }
  }
  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}
export default SortableContainer
