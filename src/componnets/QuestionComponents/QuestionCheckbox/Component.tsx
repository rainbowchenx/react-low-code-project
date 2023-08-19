import React, { FC } from 'react'
import { Checkbox, Space, Typography } from 'antd'
import { QuestionCheckboxDefaultProps, QuestionCheckboxPropsType } from './interface'
const { Paragraph } = Typography
const Component: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const { title, isVertical, list = [] } = { ...QuestionCheckboxDefaultProps, ...props }
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {list.map((item, index) => {
          const { value, text, checked } = item
          return (
            <Checkbox key={index} checked={checked} value={value}>
              {text}
            </Checkbox>
          )
        })}
      </Space>
    </div>
  )
}
export default Component
