import User from '../models/user';

interface UserModel {
  account: string;
  password: string;
  nickname: string;
}

interface jsonModel {
  code: number;
  message: string;
  data: object;
}

// 新增用户
const addUser = (ctx) => {
  let post_user = ctx.request.query;
  let user: UserModel;
  let resultJson: jsonModel;

  user = {
      account: post_user.account,
      password: post_user.password,
      nickname: post_user.nickname
  };

  new User(user).save();

  resultJson = {
      code: 200,
      message: 'create user ok.',
      data: {
          nickname: post_user.nickname
      }
  }
  ctx.body = JSON.stringify(resultJson);
}

// 查询所有用户
const getUsers = (ctx) => {
  let resultJson: jsonModel;
  User.findAll().then(result => {
    resultJson = {
      code: 200,
      message: 'find users ok.',
      data: result
    };
    ctx.body = JSON.stringify(resultJson);
  })
}

export default {
  addUser,
  getUsers
}