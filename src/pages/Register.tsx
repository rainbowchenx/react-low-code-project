import React, { FC } from 'react'
//引入antd组件
import { Typography, Space, Form, Input, Button, message } from 'antd'
// 引入路由组件
import { Link, useNavigate } from 'react-router-dom'
// 引入antd图标
import { UserAddOutlined } from '@ant-design/icons'
// 解构出标题部分组件
const { Title } = Typography
// 引入样式
import styles from './Register.module.scss'
// 引入路由路径常量
import { LOGIN_PATHNAME } from '../router'
// 引入注册的api
import { registerUserService } from '../services/user'
// 引入userequest，用于注册部分
import { useRequest } from 'ahooks'

const Register: FC = () => {
  //  路由跳转
  const nav = useNavigate()
  // 注册请求
  const { run } = useRequest(
    async values => {
      const { username, password, nickname } = values
      await registerUserService(username, password, nickname)
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('注册成功')
        // 注册成功后跳转到登录页面
        nav(LOGIN_PATHNAME)
      },
    }
  )
  // 表单提交成功的回调函数,执行run函数发请求
  function onFinish(values: any) {
    run(values)
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
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { min: 6, message: '用户名至少6位' },
              { max: 12, message: '用户名最多12位' },
              { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
              { type: 'string', whitespace: true, message: '用户名不能有空格' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>
          {/* dependencies:表示依赖于某项，当该项发生变化时会触发下面的验证函数 */}
          <Form.Item
            label="确认密码"
            name="confirm"
            dependencies={['password']}
            rules={[
              { required: true, message: '请再次输入密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('两次密码不一致'))
                },
              }),
            ]}
          >
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
