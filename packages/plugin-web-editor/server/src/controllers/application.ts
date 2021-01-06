import Application from '../models/application';
import { Op } from 'sequelize';

interface AppModel {
  name: string;
  description: string;
}

interface jsonModel {
  code: number;
  message: string;
  data: object;
}

// 新增应用
const addApp = (ctx) => {
  let post_app = ctx.request.query;
  let app: AppModel;
  let resultJson: jsonModel;

  app = {
      name: post_app.name,
      description: post_app.description
  };

  new Application(app).save();

  resultJson = {
      code: 200,
      message: 'create app ok.',
      data: {
          name: post_app.name
      }
  }
  ctx.body = JSON.stringify(resultJson);
}

// 查询我的应用
const getUserApps = (ctx) => {
  let resultJson: jsonModel;
  const { uid } = ctx.request.query;
  Application.findAll({
    where: {
      users: {
        [Op.contains]: uid
      }
    }
  }).then(result => {
    resultJson = {
      code: 200,
      message: 'find apps ok.',
      data: result
    };
    ctx.body = JSON.stringify(resultJson);
  })
}

export default {
  addApp,
  getUserApps
}