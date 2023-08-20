/**
 * @description 页面设置部分
 */
import React, { FC, useEffect } from 'react'
import styles from './PageSetting.module.scss'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { Form, Input, Button, Select } from 'antd'
import { resetPageInfo } from '../../../store/pageInfoReducer'
import { useDispatch } from 'react-redux'
const { TextArea } = Input
const PageSetting: FC = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const pageInfo = useGetPageInfo()
  useEffect(() => {
    form.setFieldsValue(pageInfo)
  }, [pageInfo])

  function handleValuesChange() {
    dispatch(resetPageInfo(form.getFieldsValue()))
  }
  return (
    <Form
      layout="vertical"
      initialValues={pageInfo}
      onValuesChange={handleValuesChange}
      form={form}
    >
      <Form.Item name="title" label="问卷标题" rules={[{ required: true, message: '请输入标题' }]}>
        <Input placeholder="请输入标题" />
      </Form.Item>
      <Form.Item name="desc" label="页面描述">
        <TextArea placeholder="请输入页面描述" />
      </Form.Item>
      <Form.Item name="js" label="脚本代码">
        <TextArea placeholder="请输入js脚本代码" />
      </Form.Item>
      <Form.Item name="css" label="样式代码">
        <TextArea placeholder="请输入css 样式代码" />
      </Form.Item>
    </Form>
  )
}
export default PageSetting
