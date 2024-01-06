import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, UnauthorizedException, Req } from '@nestjs/common';

import { UsersService } from './users.service';
import { GetMeDecorator } from './decorators/get-me.decorator';
import { ResponseMessages } from 'src/common/constants/response-messages.constant';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @GetMeDecorator()
  async getMe(@CurrentUser() userId: string) {
    if (!userId) {
      throw new UnauthorizedException(ResponseMessages.UNAUTHORIZED);
    }
    return this.userService.getMe(userId);
  }
}
