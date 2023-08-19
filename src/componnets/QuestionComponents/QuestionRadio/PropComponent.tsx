import React, { FC, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { Checkbox, Form, Input, Select, Button, Space } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { QuestionRadioPropsType, OptionType } from './interface'
const PropComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const { title, isVertical, options = [], onChange, value, disabled } = props
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ title, isVertical, value, options })
  }, [title, isVertical, value, options])
  // 选项变化的监听
  function handleValuesChange() {
    // console.log(form.getFieldsValue())
    if (onChange == null) {
      return
    }
    const newValues = form.getFieldsValue() as QuestionRadioPropsType
    if (newValues.options) {
      newValues.options = newValues.options.filter((item: OptionType) => !(item.text == null))
    }
    const { options = [] } = newValues
    options.forEach((item: OptionType) => {
      if (!item.value) {
        item.value = nanoid(5)
      }
    })
    onChange(newValues)
  }
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, isVertical, value, options }}
      onValuesChange={handleValuesChange}
      disabled={disabled}
    >
      {/* 标题 */}
      <Form.Item label="标题" name={title} rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }) => {
            return (
              <>
                {/* 遍历所有的选项可以删除 */}
                {fields.map(({ key, name }, index) => {
                  return (
                    <Space key={key}>
                      {/* 当前选项的输入框 */}
                      <Form.Item
                        name={[name, 'text']}
                        rules={[
                          { required: true, message: '请输入选项文字' },
                          {
                            validator: (_, text) => {
                              const { options = [] } = form.getFieldsValue()
                              let num = 0
                              options.forEach((item: OptionType) => {
                                if (item.text === text) num++
                              })
                              if (num === 1) return Promise.resolve()
                              return Promise.reject(new Error('选项文字不能重复'))
                            },
                          },
                        ]}
                      >
                        <Input placeholder="输入选项文字..." />
                      </Form.Item>
                      {/* 当前选项的删除按钮 */}
                      <Form.Item>
                        {index > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
                      </Form.Item>
                    </Space>
                  )
                })}
                {/* 添加选项 */}
                <Form.Item>
                  <Button
                    type="link"
                    onClick={() => add({ text: '', value: '' })}
                    icon={<PlusOutlined />}
                    block
                  >
                    添加选项
                  </Button>
                </Form.Item>
              </>
            )
          }}
        </Form.List>
      </Form.Item>
      {/* 下拉选中 */}
      <Form.Item label="默认选中" name="value">
        <Select
          value={value}
          options={options.map(({ text, value }) => ({ value, label: text || '' }))}
        ></Select>
      </Form.Item>
      {/* 居中显示 */}
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}
export default PropComponent
