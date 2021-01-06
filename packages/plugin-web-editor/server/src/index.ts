import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as cors from 'koa-cors';
import { Sequelize } from 'sequelize-typescript';
import apiRouter from './routes';

const app = new Koa();
const rootRouter = new Router();

const sequelize = new Sequelize({
    dialect: 'mysql',
    storage: ':memory:',
    host: 'localhost',
    port: 3306,
    database: 'dream_builder',
    username: 'root',
    password: '123456',
    models: [__dirname + '/models']
});

// root-router
app.use(rootRouter.routes());
// api-router
app.use(apiRouter.routes());

// root
rootRouter.get('/', async (ctx) => {
    ctx.body = 'hello world';
});

// 允许跨域请求
app.use(cors({
    origin: '*'
}));

(async () => {
  await sequelize.authenticate();
  console.log('数据库连接成功！');
  await sequelize.sync({force: true});
  console.log('表同步成功！');
  app.listen(3000);
  console.log('server start at port 3000');
})();
