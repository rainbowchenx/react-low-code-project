import React, { FC, useState } from 'react'
const Demo: FC = () => {
  const [userINfo, setUserINfo] = useState({ name: 'ss', age: 20 })
  function changeAge() {
    setUserINfo({ ...userINfo, name: 'sssss', age: 242 })
  }

  const [list, setList] = useState([1, 2, 3, 4])
  function addItem() {
    setList([...list, 22])
  }
  return (
    <div>
      <h2>不可变数据</h2>
      <div>{JSON.stringify(userINfo)}</div>
      <button onClick={changeAge}>change age</button>

      <div>{JSON.stringify(list)}</div>
      <button onClick={addItem}>change list</button>
    </div>
  )
}
export default Demo
