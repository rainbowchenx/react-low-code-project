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
]
