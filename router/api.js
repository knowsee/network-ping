const Router = require('koa-router')
const router = new Router()
const network = require('../extends/network.js')
const kNetwork = new network();
const logs = require('../extends/logsInsert.js')
const kLogs = new logs();

router.post('/tracert', async ctx => {
  if(ctx.request.body.domain) {
    try {
      await kNetwork.tracert(ctx.request.body.domain);
      kLogs.table('tracert', kNetwork.logs());
      ctx.body = {
        code: 200,
        msg: 'ok',
        data: kNetwork.logs(),
        id: kLogs.getId()
      };
    } catch(err) {
      ctx.body = {
        code: 500,
        msg: err
      };
    }
  } else {
    ctx.body = {
      code: 404,
      msg: '域名不可为空'
    };
  }
});
router.post('/ping', async ctx => {
  if(ctx.request.body.domain) {
    await kNetwork.ping(ctx.request.body.domain);
    kLogs.table('ping', kNetwork.logs());
    ctx.body = {
      code: 200,
      msg: 'ok',
      data: kNetwork.logs(),
      id: kLogs.getId()
    };
  } else {
    ctx.body = {
      code: 404,
      msg: '域名不可为空'
    };
  }
});

module.exports = router