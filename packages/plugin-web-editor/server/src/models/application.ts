import {
  Table,
  Model,
  BelongsToMany,
  Column,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  DeletedAt
} from 'sequelize-typescript';
import User from './user';
import UserApp from './userApplication';

@Table
export default class Application extends Model<Application> {
  // id
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  // 应用名称
  @Column
  name: string;

  // 应用描述
  @Column
  description: string;

  // 包含用户
  @BelongsToMany(() => User, () => UserApp)
  users: User[];

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