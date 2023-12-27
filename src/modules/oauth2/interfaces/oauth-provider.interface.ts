import { User } from '../../users/user.entity';
import { OAuthProvidersEnum } from '../../users/enums/oauth-providers.enum';

export interface IOAuthProvider {
  readonly provider: OAuthProvidersEnum;
  readonly user: User;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
