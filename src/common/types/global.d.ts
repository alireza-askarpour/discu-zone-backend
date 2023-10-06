import { User as _User } from '../../modules/users/user.entity';

declare global {
  namespace Express {
    export interface User extends _User {}
  }
}
