import { OAuthProvidersEnum } from '../enums/oauth-providers.enum';

export interface ICreateOAuthUserInput {
  email: string;
  displayName: string;
  username?: string;
  password?: string;
  provider: OAuthProvidersEnum;
}
