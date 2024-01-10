import { IClient } from '../../modules/oauth2/interfaces/client.interface';

export interface IOAuth2 {
  readonly google: IClient | null;
  readonly discord: IClient | null;
}
