export enum Roles {
  ADMIN = 'ADMIN',
}

export interface User {
  id: string;
  fullName: string;
  username: string | null;
  email: string;
  password: string;
  role: Roles;
  avatar: string | null;
  cover: string | null;
  friends: string[];
  servers: string[];
  createdAt: Date;
  updatedAt: Date;
}
