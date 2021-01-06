import {
  Table,
  Model,
  HasMany,
  Column,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  DeletedAt
} from 'sequelize-typescript';
import User from './user';

@Table
export default class Team extends Model<Team> {
  // id
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  // 团队名称
  @Column
  name: string;

  // 团队成员
  @HasMany(() => User)
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