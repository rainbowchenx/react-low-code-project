import React, { FC } from 'react'
import { Form, Input, Checkbox } from 'antd'
import { QuestionCheckboxPropsType } from './interface'
const PropComponent: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const [form] = Form.useForm()
  const { title, isVertical, list = [], onChange, disabled } = props
  function handleValuesChange() {
    return null
  }
  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{ title, isVertical, list }}
      disabled={disabled}
      onValuesChange={handleValuesChange}
    >
      {/* 标题输入框 */}
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      {/* 竖向排列的设置 */}
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}
export default PropComponent
