const koa = require('koa')
const Router = require('koa-router')
const mockList = require('./mock/index.js')

const app = new koa()
const router = new Router()

async function getRes(fn, ctx) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const res = fn(ctx)
      resolve(res)
    }, 500)
  })
}
// 注册mock路由
mockList.forEach(item => {
  const { method, url, response } = item
  router[method](url, async (ctx, next) => {
    const res = await getRes(response, ctx)
    ctx.body = res
  })
})
app.use(router.routes())
app.listen(3001)
