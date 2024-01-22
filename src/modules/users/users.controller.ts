import { Controller, UploadedFile } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { GetMeDecorator } from './decorators/get-me.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ChangeAvatarDecorator } from './decorators/change-avatar.decorator';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @GetMeDecorator()
  public getMe(@CurrentUser('id') userId: string) {
    return this.userService.getMe(userId);
  }

  @ChangeAvatarDecorator()
  public changeAvatar(
    @CurrentUser('id') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.changeAvatar(userId, file);
  }
}
