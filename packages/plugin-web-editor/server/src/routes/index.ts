import * as Router from 'koa-router';
import User from '../controllers/user';
import Team from '../controllers/team';
import App from '../controllers/application';

let apiRouter = new Router({
    prefix: '/api'
});

apiRouter.get('/', async(ctx) => {
    ctx.body = ctx.request.query
});

// 用户
apiRouter.get('/addUser', async(ctx) => {
    console.log(User.addUser(ctx));
});

apiRouter.get('/getUsers', async(ctx) => {
    console.log(User.getUsers(ctx));
});

// 团队
apiRouter.get('/addTeam', async(ctx) => {
    console.log(Team.addTeam(ctx));
});

apiRouter.get('/getUserTeam', async(ctx) => {
    console.log(Team.getUserTeam(ctx));
});

// 应用
apiRouter.get('/addApp', async(ctx) => {
    console.log(App.addApp(ctx));
});

apiRouter.get('/getApps', async(ctx) => {
    console.log(App.getUserApps(ctx));
});

export default apiRouter = apiRouter;