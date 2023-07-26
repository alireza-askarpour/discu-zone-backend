import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Server extends Model<Server> {
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
  name: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  owner: string;

  @Column({
    type: DataType.STRING,
  })
  avatar: string;

  @Column({
    type: DataType.ARRAY(DataType.UUID),
    defaultValue: [],
  })
  channels: string[];

  @Column({
    type: DataType.ARRAY(DataType.UUID),
    defaultValue: [],
  })
  categories: string[];

  @Column({
    type: DataType.ARRAY(DataType.UUID),
    defaultValue: [],
  })
  members: string[];

  @Column({
    type: DataType.ARRAY(DataType.UUID),
    defaultValue: [],
  })
  roles: string[];
}
