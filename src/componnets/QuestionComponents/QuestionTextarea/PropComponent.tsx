/**
 * @description 页面右侧组件的属性
 */
import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { QuestionInputPropsType } from './interface'
const PropComponent: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
  const { title, placeholder, onChange, disabled } = props
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ title, placeholder })
  }, [title, placeholder])
  function handleValueChange() {
    // console.log('form.getFieldsValue()', form.getFieldsValue())
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  return (
    <Form
      layout="vertical"
      onChange={handleValueChange}
      initialValues={{ title, placeholder }}
      form={form}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input value={title} placeholder={placeholder} />
      </Form.Item>
      <Form.Item label="placeholder" name="placeholder">
        <Input />
      </Form.Item>
    </Form>
  )
}
export default PropComponent
