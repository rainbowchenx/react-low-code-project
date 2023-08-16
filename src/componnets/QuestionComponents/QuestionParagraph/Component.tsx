import React, { FC } from 'react'
import { QuestionParagraphPropType, QuestionParagraphDefaultProps } from './interface'
import { Typography } from 'antd'
const { Paragraph } = Typography
const Component: FC<QuestionParagraphPropType> = (props: QuestionParagraphPropType) => {
  const { text = '', isCenter = false } = { ...QuestionParagraphDefaultProps, ...props }
  // const t = text.replaceAll('\n', '<br/>')
  const textList = text.split('\n')

  return (
    <Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: '0' }}>
      {/* <span dangerouslySetInnerHTML={{ __html: t }}></span> */}
      {/* 不要用上述的方法，可以在其中插入任意内容 */}
      {textList.map((item, index) => (
        <span key={index}>
          {index > 0 && <br />}
          {item}
        </span>
      ))}
    </Paragraph>
  )
}
export default Component
