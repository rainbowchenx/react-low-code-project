import React, { FC, useEffect } from 'react'
//引入antd组件
import { Typography, Space, Form, Input, Button, Checkbox } from 'antd'
// 引入路由组件
import { Link } from 'react-router-dom'
// 引入antd图标
import { UserAddOutlined } from '@ant-design/icons'
// 解构出标题部分组件
// 用户登录组件
const { Title } = Typography
// 引入路由路径常量
import { REGISTER_PATHNAME } from '../router'
import styles from './Login.module.scss'
// 引入本地存储
const USERNAME_KRY = 'USERNAME'
const PASSWORD_KEY = 'PASSWORD'
// 设置本地存储
function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KRY, username)
  localStorage.setItem(PASSWORD_KEY, password)
}
// 删除本地存储
function deleteUserInfoFromStorage() {
  localStorage.removeItem(USERNAME_KRY)
  localStorage.removeItem(PASSWORD_KEY)
}
// 获取本地存储
function getUserInfoFromStorage() {
  const username = localStorage.getItem(USERNAME_KRY)
  const password = localStorage.getItem(PASSWORD_KEY)
  return { username, password }
}

const Login: FC = () => {
  // form表单第三方hook
  const [form] = Form.useForm()
  useEffect(() => {
    const { username, password } = getUserInfoFromStorage()
    form.setFieldsValue({ username, password })
  }, [])
  // 用户名和密码存储删除
  const onFinish = (values: any) => {
    if (values.remember) {
      rememberUser(values.username, values.password)
    } else {
      deleteUserInfoFromStorage()
    }
  }

  return (
    <div className={styles.container}>
      <Space>
        <Title level={2}>
          <UserAddOutlined />
        </Title>
        <Title level={2}>用户登录</Title>
      </Space>
      <div>
        {/* 登录组件 */}
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item label="用户名" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="密码" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          {/* 登录或者跳转注册 */}
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default Login
