import { Model, Column, DataType, Table } from 'sequelize-typescript';
import { StatusEnum } from '../enums/status.enum';

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
  requesterId: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  addresseeId: string;

  @Column({
    type: DataType.STRING,
    defaultValue: StatusEnum.PENDING,
  })
  status: StatusEnum;
}
