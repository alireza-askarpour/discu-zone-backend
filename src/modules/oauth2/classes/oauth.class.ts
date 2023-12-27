import { randomBytes } from 'crypto';
import { AuthorizationCode } from 'simple-oauth2';
import { IClient } from '../interfaces/client.interface';
import { IProvider } from '../interfaces/provider.interface';
import { IAuthParams } from '../interfaces/auth-params.interface';
import { OAuthProvidersEnum } from '../../users/enums/oauth-providers.enum';

export class OAuthClass {
  private static readonly [OAuthProvidersEnum.GOOGLE]: IProvider = {
    authorizeHost: 'https://accounts.google.com',
    authorizePath: '/o/oauth2/v2/auth',
    tokenHost: 'https://www.googleapis.com',
    tokenPath: '/oauth2/v4/token',
  };
  private static readonly [OAuthProvidersEnum.DISCORD]: IProvider = {
    authorizeHost: 'https://discord.com',
    authorizePath: '/api/oauth2/authorize',
    tokenHost: 'https://discord.com',
    tokenPath: '/api/oauth2/token',
  };
  private static userDataUrls: Record<OAuthProvidersEnum, string> = {
    [OAuthProvidersEnum.GOOGLE]:
      'https://www.googleapis.com/oauth2/v3/userinfo',
    [OAuthProvidersEnum.LOCAL]: '',
    [OAuthProvidersEnum.DISCORD]: 'https://discord.com/api/users/@me',
  };

  private readonly code: AuthorizationCode;
  private readonly authorization: IAuthParams;
  private readonly userDataUrl: string;

  constructor(
    private readonly provider: OAuthProvidersEnum,
    private readonly client: IClient,
    private readonly url: string,
  ) {
    if (provider === OAuthProvidersEnum.LOCAL) {
      throw new Error('Invalid provider');
    }

    this.code = new AuthorizationCode({
      client,
      auth: OAuthClass[provider],
    });
    this.authorization = OAuthClass.genAuthorization(provider, url);
    this.userDataUrl = OAuthClass.userDataUrls[provider];
  }

  public get state(): string {
    return this.authorization.state;
  }

  public get dataUrl(): string {
    return this.userDataUrl;
  }

  public get authorizationUrl(): string {
    return this.code.authorizeURL(this.authorization);
  }

  private static genAuthorization(
    provider: OAuthProvidersEnum,
    url: string,
  ): IAuthParams {
    const redirect_uri = `${url}/api/auth/ext/${provider}/callback`;
    const state = randomBytes(16).toString('hex');

    switch (provider) {
      case OAuthProvidersEnum.GOOGLE:
        return {
          state,
          redirect_uri,
          scope: [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
          ],
        };
      case OAuthProvidersEnum.DISCORD:
        return {
          state,
          redirect_uri,
          scope: ['identify', 'email'],
        };
    }
  }

  public async getToken(code: string): Promise<string> {
    const result = await this.code.getToken({
      code,
      redirect_uri: this.authorization.redirect_uri,
      scope: this.authorization.scope,
    });
    return result.token.access_token as string;
  }
}
