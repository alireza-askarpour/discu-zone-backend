import { OAuthProvidersEnum } from '../enums/oauth-providers.enum';

export interface ICreateOAuthUserInput {
  email: string;
  displayName: string;
  provider: OAuthProvidersEnum;
}
