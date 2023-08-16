import React, { FC } from 'react'
import { QuestionParagraphPropType, QuestionParagraphDefaultProps } from './interface'
import { Typography } from 'antd'
const { Paragraph } = Typography
const Component: FC<QuestionParagraphPropType> = (props: QuestionParagraphPropType) => {
  const { text = '', isCenter = false } = { ...QuestionParagraphDefaultProps, ...props }

  return (
    <Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: '0' }}>
      {text}
    </Paragraph>
  )
}
export default Component
