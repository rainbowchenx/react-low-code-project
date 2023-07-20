/*
 * @Author: rainbowchen 1664373735@qq.com
 * @Date: 2023-06-19 22:50:43
 * @LastEditors: rainbowchen 1664373735@qq.com
 * @LastEditTime: 2023-07-20 23:40:41
 * @FilePath: \react-low-code-project\src\router\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'
import ManageLayout from '../layouts/ManageLayout'
import QuestionLayout from '../layouts/QuestionLayout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import Stat from '../pages/question/Stat'
import Register from '../pages/Register'
import Edit from '../pages/question/Edit'
import Trash from '../pages/manage/Trash'
import Star from '../pages/manage/Star'
import List from '../pages/manage/list'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      //   管理页面
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          {
            path: 'list',
            element: <List />,
          },
          {
            path: 'star',
            element: <Star />,
          },
          {
            path: 'trash',
            element: <Trash />,
          },
        ],
      },

      {
        // 404
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  //   question页面
  {
    path: 'question',
    element: <QuestionLayout />,
    children: [
      {
        path: 'edit/:id',
        element: <Edit />,
      },
      {
        path: 'stat/:id',
        element: <Stat />,
      },
    ],
  },
])
export default router

// ------------------分割线-------------------
// 常用的路由常量
export const LOGIN_PATHNAME = '/login'
export const REGISTER_PATHNAME = '/register'
export const HOME_PATHNAME = '/'
export const MANAGE_INDEX_PATHNAME = '/manage/list'
