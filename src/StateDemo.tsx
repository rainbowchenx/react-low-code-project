import React, { FC, useState } from 'react'
const Demo: FC = () => {
  const [count, setCount] = useState(0)
  function add() {
    // setCount(count + 1)
    setCount(count => {
      return count + 1
    })
  }
  return (
    <div>
      {' '}
      <button onClick={add}>add count{count}</button>
    </div>
  )
}
export default Demo
