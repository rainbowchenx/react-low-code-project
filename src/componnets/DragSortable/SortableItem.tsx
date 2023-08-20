/**
 * @description 用于拖拽排序的组件,具体组件需要从外部传入
 * @param {id} string 拖拽排序的id
 * @param {children} JSX.Element | JSX.Element[] 拖拽排序的组件
 */
import React, { FC } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
type PropsType = {
  id: string
  children: JSX.Element | JSX.Element[]
}
const SortableItem: FC<PropsType> = (props: PropsType) => {
  const { id, children } = props
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  )
}
export default SortableItem
