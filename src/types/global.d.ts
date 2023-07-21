import { User as _User } from '../core/interfaces/user.interface';

declare global {
  namespace Express {
    export interface User extends _User {}
  }
}
