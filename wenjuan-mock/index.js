const koa = require('koa')
const Router = require('koa-router')
const mockList = require('./mock/index.js')

const app = new koa()
const router = new Router()

async function getRes(fn) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const res = fn()
      resolve(res)
    }, 500)
  })
}
mockList.forEach(item => {
  const { method, url, response } = item
  router[method](url, async (ctx, next) => {
    const res = await getRes(response)
    ctx.body = res
  })
})
app.use(router.routes())
app.listen(3001)
