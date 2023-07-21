import {
  Controller,
  Get,
  HttpStatus,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request as _Request } from 'express';

import { ApiGetMe } from './docs/get-me.doc';
import { UsersService } from './users.service';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiGetMe()
  @UseGuards(AuthGuard('jwt'))
  @Get('@me')
  async getMe(@Request() req: _Request) {
    if (!req.user) {
      throw new UnauthorizedException(ResponseMessages.UNAUTHORIZED);
    }
    return this.userService.getMe(req.user.id);
  }
}
