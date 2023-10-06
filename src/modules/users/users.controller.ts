import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, UnauthorizedException, Req } from '@nestjs/common';

import { UsersService } from './users.service';
import { GetMeDecorator } from './decorators/get-me.decorator';
import { ResponseMessages } from 'src/common/constants/response-messages.constant';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @GetMeDecorator()
  async getMe(@Req() req: Request) {
    if (!req.user) {
      throw new UnauthorizedException(ResponseMessages.UNAUTHORIZED);
    }
    return this.userService.getMe(req.user.id);
  }
}
