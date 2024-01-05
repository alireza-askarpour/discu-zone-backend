import { User } from '../../users/user.entity';

export interface IAuthResult {
  user: User;
  accessToken: string;
  refreshToken: string;
}
