import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
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
  fullName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      min: 8,
    },
  })
  password: string;

  @Column({
    type: DataType.ENUM,
    values: ['ADMIN', 'USER'],
    allowNull: false,
    defaultValue: 'USER',
  })
  role: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  avatar: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  cover: string | null;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
    defaultValue: [],
  })
  friends: string[];

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
    defaultValue: [],
  })
  servers: string[];
}
