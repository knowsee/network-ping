const Koa = require('koa');
const cors = require('@koa/cors');
const Router = require('koa-router');
const http = require('http');
const json = require('koa-json');
const koaBody = require('koa-body');
const app = new Koa();
const requireDirectory = require('require-directory')
require('dotenv').config()

app.use(cors());
app.use(koaBody());
app.use(json())

const modules = requireDirectory(module, './router', { visit: whenLoadModule })

function whenLoadModule(obj) {
  if (obj instanceof Router) {
    app.use(obj.routes(), obj.allowedMethods())
  }
}

http.createServer(app.callback()).listen(3000);