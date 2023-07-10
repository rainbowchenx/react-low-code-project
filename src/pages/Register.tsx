import React, { FC } from 'react'
//引入antd组件
import { Typography, Space, Form, Input, Button } from 'antd'
// 引入路由组件
import { Link } from 'react-router-dom'
// 引入antd图标
import { UserAddOutlined } from '@ant-design/icons'
// 解构出标题部分组件
const { Title } = Typography
// 引入样式
import styles from './Register.module.scss'
// 引入路由路径常量
import { LOGIN_PATHNAME } from '../router'
const Register: FC = () => {
  function onFinish(values: any) {
    console.log('Success:', values)
  }
  return (
    <div className={styles.container}>
      {/* 注册头 */}
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>注册</Title>
        </Space>
      </div>
      {/* 注册具体信息填写，表单 */}
      <div>
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
          <Form.Item label="用户名" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="密码" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item label="确认密码" name="confirm">
            <Input.Password />
          </Form.Item>
          <Form.Item label="昵称" name="nickname">
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
              <Link to={LOGIN_PATHNAME}>已有账户，请登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default Register
