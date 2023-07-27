import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Roles extends Model<Roles> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  color: string;

  @Column({
    type: DataType.ARRAY(DataType.UUID),
    defaultValue: [],
    allowNull: false,
  })
  permissions: string[];

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  server: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  channel: string;
}
