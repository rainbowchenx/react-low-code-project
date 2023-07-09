import styled, { css } from 'styled-components'
import React, { FC } from 'react'

// button这也是一个组件
type ButtonPropsType = {
  primary?: boolean
}
const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #bf4f74;
  color: #bf4f74;
  margin: 0 1em;
  padding: 0.25em 1em;
  ${(props: ButtonPropsType) =>
    props.primary &&
    css`
      background: '#BF4F74';
      color: white;
    `};
}
`
const Container = styled.div`
  text-align: center;
`

const Demo: FC = () => {
  return (
    <>
      <p>styled-components demo</p>

      <Button>按钮sss</Button>
      <Button primary>按钮sss</Button>
    </>
  )
}
export default Demo
