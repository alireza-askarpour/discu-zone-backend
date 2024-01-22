import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/entities/user.entity';

@Table({
  timestamps: true,
})
export class Member extends Model<Member> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  serverId: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  inviteId: string;

  @Column({
    type: DataType.ARRAY(DataType.UUID),
    defaultValue: [],
  })
  permissions: string[];

  @Column({
    type: DataType.ARRAY(DataType.UUID),
    defaultValue: [],
  })
  messages: string[];
}
