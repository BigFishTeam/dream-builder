import Team from '../models/team';
import { Op } from 'sequelize';

interface TeamModel {
  name: string;
  players: number[];
}

interface jsonModel {
  code: number;
  message: string;
  data: object;
}

// 新增团队
const addTeam = (ctx) => {
  let post_team = ctx.request.query;
  let team: TeamModel ;
  let resultJson: jsonModel;

  team = {
      name: post_team.name,
      players: post_team.players
  }

  new Team(team).save();

  resultJson = {
      code: 200,
      message: 'create team ok.',
      data: {
          name: post_team.name
      }
  }
  ctx.body = JSON.stringify(resultJson);
}

// 查询我的团队
const getUserTeam = (ctx) => {
  let resultJson: jsonModel;
  const { uid } = ctx.request.query;
  Team.findAll({
    where: {
      users: {
        [Op.contains]: uid
      }
    }
  }).then(result => {
    resultJson = {
      code: 200,
      message: 'find users ok.',
      data: result
    };
    ctx.body = JSON.stringify(resultJson);
  })
}

export default {
  addTeam,
  getUserTeam
}