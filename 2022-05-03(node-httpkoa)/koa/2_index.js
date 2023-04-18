const Koa = require('koa');
const Router = require('koa-router')

const app = new Koa();
const router = new Router();

router.get('/api', (ctx, next) => {
  ctx.type = 'application/'
  //todo
})