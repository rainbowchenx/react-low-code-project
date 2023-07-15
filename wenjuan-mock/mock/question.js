const Mock = require('mockjs')
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
]
