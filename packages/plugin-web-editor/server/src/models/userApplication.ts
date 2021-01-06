import {
  Table,
  Model,
  ForeignKey,
  Column
} from 'sequelize-typescript';
import User from './user';
import Application from './application';

@Table
export default class UserApplication extends Model<UserApplication> {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Application)
  @Column
  appId: number;
}