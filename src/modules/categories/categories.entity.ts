import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Category extends Model<Category> {
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
  server: string;

  @Column({
    type: DataType.ARRAY(DataType.UUID),
    allowNull: false,
  })
  channels: string[];

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  private: boolean;

  @Column({
    type: DataType.ARRAY(DataType.UUID),
    defaultValue: [],
  })
  roles: string[];

  @Column({
    type: DataType.ARRAY(DataType.UUID),
    defaultValue: [],
  })
  members: string[];
}
