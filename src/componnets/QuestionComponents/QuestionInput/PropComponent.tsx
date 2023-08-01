/**
 * @description 页面右侧组件的属性
 */
import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { QuestionInputPropsType } from './interface'
const PropComponent: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
  const { title, placeholder } = props
  const [form] = Form.useForm()
  return (
    useEffect(() => {
      form.setFieldsValue({ title, placeholder })
    }, [title, placeholder]),
    (
      <Form layout="vertical" initialValues={{ title, placeholder }} form={form}>
        <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
          <Input value={title} placeholder={placeholder} />
        </Form.Item>
        <Form.Item label="placeholder" name="placeholder">
          <Input />
        </Form.Item>
      </Form>
    )
  )
}
export default PropComponent
