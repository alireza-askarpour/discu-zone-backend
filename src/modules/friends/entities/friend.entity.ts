import { Model, Column, DataType, Table } from 'sequelize-typescript';
import { StatusEnum } from '../enums/status.enum';
import { InviteStatusEnum } from '../enums/invite-status.enum';

@Table
export class Friend extends Model<Friend> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  requestSenderId: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  requestReceiverId: string;

  @Column({
    type: DataType.ENUM(StatusEnum.PENDING, StatusEnum.ACCEPTED),
    defaultValue: StatusEnum.PENDING,
  })
  status: StatusEnum;

  @Column({
    type: DataType.ENUM(InviteStatusEnum.SENT, InviteStatusEnum.SEEN),
    defaultValue: InviteStatusEnum.SENT,
  })
  inviteNotifStatus: InviteStatusEnum;
}
