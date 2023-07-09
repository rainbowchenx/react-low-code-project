import { useState, useEffect } from 'react'
function useMouse() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const mouseMoveHandler = (event: MouseEvent) => {
    setX(event.clientX)
    setY(event.clientY)
  }
  useEffect(() => {
    // 设定监听
    window.addEventListener('mousemove', mouseMoveHandler)
    // 组件销毁时要解绑dom事件,可能会有内存泄漏问题
    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler)
    }
  }, [])
  return { x, y }
}
export default useMouse
