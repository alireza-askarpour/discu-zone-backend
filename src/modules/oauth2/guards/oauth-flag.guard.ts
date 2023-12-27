import {
  CanActivate,
  ExecutionContext,
  mixin,
  NotFoundException,
  Type,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { isNull } from '../../../common/utils/validation.util';
import { OAuthProvidersEnum } from '../../users/enums/oauth-providers.enum';
import { IClient } from '../interfaces/client.interface';

export const OAuthFlagGuard = (
  provider: OAuthProvidersEnum,
): Type<CanActivate> => {
  class OAuthFlagGuardClass implements CanActivate {
    constructor(private readonly configService: ConfigService) {}

    public canActivate(context: ExecutionContext): boolean {
      // const client = this.configService.get<IClient | null>(
      //   `oauth2.${provider}`,
      // );

      const client = {
        google: {
          id: '61536764017-semlcmhst0igqu6o01cp5uanjm19p2q5.apps.googleusercontent.com',
          secret: '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',
        },
        github: {
          id: '39d2951c772daf4d6205',
          secret: '75f94d8576002655dd92ecf1b138a0d490a297b9',
        },
        discord: {
          id: '1185959927202717717',
          client: 'w7YkyqMBMxqVlRSp6IiSMhe5uIOiGuO6',
        },
      };

      if (isNull(client)) {
        const request: Request = context.switchToHttp().getRequest<Request>();
        throw new NotFoundException(`Cannot ${request.method} ${request.url}`);
      }

      return true;
    }
  }

  return mixin(OAuthFlagGuardClass);
};
