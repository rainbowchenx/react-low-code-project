import React from 'react'
import { FC } from 'react'
import { useMemo, useState } from 'react'

const Demo: FC = () => {
  const [num1, setNum1] = useState(10)
  const [num2, setNum2] = useState(20)
  const [num3, setNum3] = useState(30)
  const [text, setText] = useState('hello')
  const sum = useMemo(() => {
    return num1 + num2 + num3
  }, [num1, num2, num3])
  return (
    <>
      <p>{sum}</p>
      <p>
        {num1}
        <button
          onClick={() => {
            setNum1(num1 + 1)
          }}
        >
          add num1
        </button>
      </p>
      <p>
        {num2}
        <button
          onClick={() => {
            setNum2(num2 + 1)
          }}
        >
          add num2
        </button>
      </p>
      <p>
        {num3}
        <button
          onClick={() => {
            setNum1(num3 + 1)
          }}
        >
          add num3
        </button>
      </p>
      <div>
        <input type="text" onChange={e => setText(e.target.value)} value={text} />
      </div>
    </>
  )
}
export default Demo
