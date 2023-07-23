export enum FriendStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  BLOCKED = 'BLOCKED',
}

interface Friend {
  user: string;
  status: FriendStatus;
}

export interface User {
  id: string;
  fullName: string;
  username: string | null;
  email: string;
  password?: string;
  avatar: string | null;
  cover: string | null;
  friends: Friend[];
  servers: string[];
  createdAt: Date;
  updatedAt: Date;
}
