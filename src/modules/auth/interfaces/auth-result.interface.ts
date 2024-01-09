import { ResponseFormat } from 'src/common/interfaces/response.interface';

export interface IAuthResult {
  token: { accessToken: string; refreshToken: string };
  response: ResponseFormat<any>;
}
