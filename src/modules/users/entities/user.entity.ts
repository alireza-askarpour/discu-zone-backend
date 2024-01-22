import * as dayjs from 'dayjs';
import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { UserStatusEnum } from '../enums/user-status.enum';
import { ICredentials } from '../interfaces/credentials.interface';

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
  displayName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
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
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  confirmed: boolean;

  @Column({
    type: DataType.JSONB,
    allowNull: false,
  })
  credentials: ICredentials;

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
    type: DataType.ENUM(...Object.values(UserStatusEnum)),
    allowNull: false,
    defaultValue: UserStatusEnum.Online,
  })
  status: UserStatusEnum;

  @Column({
    type: DataType.ARRAY(DataType.UUID),
    defaultValue: [],
  })
  friends: string[];

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    defaultValue: [],
  })
  sentInvites: string[];

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    defaultValue: [],
  })
  receivedInvites: string[];

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    defaultValue: [],
  })
  servers: string[];

  updateCredentialsPassword(password: string): void {
    this.credentials.version++;
    this.credentials.lastPassword = password;
    this.credentials.updatedAt = dayjs().unix();
  }

  updateCredentialsVersion(): void {
    this.credentials.version++;
    this.credentials.updatedAt = dayjs().unix();
  }
}

// User.beforeCreate(() => {});
// User.beforeUpdate(() => {});
// User.afterCreate(() => {});
// User.afterUpdate(() => {});
// User.prototype.customMethod = function () {};
