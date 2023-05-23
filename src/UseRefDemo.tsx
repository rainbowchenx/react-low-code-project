import React from 'react'
import { FC, useRef } from 'react'
const Demo: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  function seletInput() {
    const inputElem = inputRef.current
    if (inputElem) inputElem.select()
  }
  return (
    <div>
      <input type="text" defaultValue="helloword" ref={inputRef} />
      <button onClick={seletInput}>选中input</button>
    </div>
  )
}
export default Demo
