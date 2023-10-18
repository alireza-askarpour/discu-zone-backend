import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Invite extends Model<Invite> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  slug: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  inviterId: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  serverId: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: null,
  })
  expiresAt: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: null, // no limit
    allowNull: true,
  })
  maxUse: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  uses: number;
}
