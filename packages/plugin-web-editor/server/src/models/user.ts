import {
  Table,
  Model,
  PrimaryKey,
  ForeignKey,
  Column,
  AutoIncrement,
  BelongsToMany,
  CreatedAt,
  UpdatedAt,
  DeletedAt
} from 'sequelize-typescript';
import Team from './team';
import Application from './application';
import UserApp from './userApplication';

@Table
export default class User extends Model<User> {
  // id
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  // 账号
  @Column
  account: string;

  // 密码
  @Column
  password: string;

  // 昵称
  @Column
  nickname: string;

  // 所属团队
  @ForeignKey(() => Team)
  @Column
  teamId: number;

  // 能访问的应用
  @BelongsToMany(() => Application, () => UserApp)
  apps: Application[];

  // 创建时间
  @CreatedAt
  creationDate: Date;

  // 更新时间
  @UpdatedAt
  updatedOn: Date;

  // 删除时间
  @DeletedAt
  deletionDate: Date;
}