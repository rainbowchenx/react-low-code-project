/*
 * @Author: rainbowchen 1664373735@qq.com
 * @Date: 2023-07-12 22:20:35
 * @LastEditors: rainbowchen 1664373735@qq.com
 * @LastEditTime: 2023-07-19 23:30:14
 * @FilePath: \react-low-code-project\wenjuan-mock\mock\question.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
const Mock = require('mockjs')
const getQuestionList = require('./data/getQuestionList')
const Random = Mock.Random
module.exports = [
  {
    // 获取单个问卷信息
    url: '/api/question/:id',
    method: 'get',
    response() {
      return {
        errno: 0,
        data: {
          id: Random.id(),
          title: Random.ctitle(10, 20),
          // 初始化组件列表的mock数据
          // 所有组件的列表
          componentList: [
            {
              fe_id: Random.id(),
              type: 'QuestionInfo',
              title: '问卷信息',
              isHidden: false,
              isLocked: false,
              props: {
                title: '问卷标题',
                desc: '问卷描述',
              },
            },
            // 标题
            {
              fe_id: Random.id(),
              type: 'QuestionTitle',
              title: '标题',
              isHidden: false,
              isLocked: false,
              props: {
                text: '个人信息调研',
                level: 1,
                isCenter: false,
              },
            },
            // 输入框
            {
              fe_id: Random.id(),
              type: 'QuestionInput', //组件类型是不能重复且唯一的
              title: '输入框',
              isHidden: false,
              isLocked: false,
              props: { title: '你的名字', placeholder: '请输入你的姓名' },
            },
            // 输入
            {
              fe_id: Random.id(),
              type: 'QuestionTextarea',
              title: '多行输入框',
              isHidden: false,
              isLocked: false,
              props: { title: '你的爱好', placeholder: '请输入你的爱好' },
            },
            // paragraph
            {
              fe_id: Random.id(),
              type: 'QuestionParagraph',
              title: '段落',
              isHidden: false,
              isLocked: false,
              props: {
                text: '这是一个段落',
                isCenter: false,
              },
            },
            {
              fe_id: Random.id(),
              type: 'QuestionRadio',
              title: '单选',
              isHidden: false,
              isLocked: false,
              props: {
                title: '单选标题',
                isVertical: false,
                options: [
                  { value: 'item1', text: '选项1' },
                  { value: 'item2', text: '选项2' },
                  { value: 'item3', text: '选项3' },
                ],
                value: '',
              },
            },
            {
              fe_id: Random.id(),
              type: 'QuestionCheckout',
              title: '多选',
              isHidden: false,
              isLocked: false,
              props: {
                title: '多选标题',
                isVertical: false,
                list: [
                  { value: 'item1', text: '选项1', checked: false },
                  { value: 'item2', text: '选项2', checked: false },
                  { value: 'item3', text: '选项3', checked: false },
                ],
              },
            },
          ],
        },
      }
    },
  },
  // 创建问卷
  {
    url: '/api/question',
    method: 'post',
    response() {
      return {
        errno: 0,
        data: {
          id: Random.id(),
          title: Random.ctitle(10, 20),
        },
      }
    },
  },

  // 获取(查询)问卷列表
  {
    url: '/api/question',
    method: 'get',
    response(ctx) {
      const { url = '' } = ctx
      const isDeleted = ctx.url.includes('isDeleted=true')
      const isStar = ctx.url.includes('isStar=true')
      const pageSize = parseInt(ctx.query.pageSize) || 10
      return {
        errno: 0,
        data: {
          list: getQuestionList({ len: pageSize, isDeleted, isStar }),
          total: 100,
        },
      }
    },
  },
  // 获取(查询)问卷列表
  {
    url: '/api/question/:id',
    method: 'patch',
    response() {
      return {
        errno: 0,
      }
    },
  },
  // 获取(查询)问卷列表
  {
    url: '/api/question/duplicate/:id',
    method: 'post',
    response() {
      return {
        errno: 0,
        data: {
          id: Random.id(),
        },
      }
    },
  },
  {
    // 批量删除
    url: '/api/question',
    method: 'delete',
    response() {
      return {
        errno: 0,
      }
    },
  },
]
