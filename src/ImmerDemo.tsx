import React, { FC, useState } from 'react'
import { produce } from 'immer'

const Demo: FC = () => {
  const [list, setList] = useState({ name: 'ss', age: 20 })
  function addItem() {
    // setList({ ...list, age: 21 })
    setList(
      produce(draft => {
        draft.age = 21
      })
    )
  }
  return (
    <div>
      <h2>state CAN NOT CHANGE</h2>
      <div>{JSON.stringify(list)}</div>
      <button onClick={addItem}>add item</button>
    </div>
  )
}
export default Demo
