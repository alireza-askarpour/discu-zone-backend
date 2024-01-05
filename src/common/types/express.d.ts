import { User as _User } from '../../modules/users/user.entity';

// export interface User extends _User {}

declare namespace Express {
  interface Request {
    user?: any;
  }
}
