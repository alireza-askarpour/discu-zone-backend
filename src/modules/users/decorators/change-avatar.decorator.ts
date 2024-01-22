import { ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Patch, UseInterceptors, applyDecorators } from '@nestjs/common';
import { ApiChangeAvatar } from '../docs/change-avatar.doc';
import { imageFilter } from 'src/common/utils/file-filter.util';
import { fileStorage } from 'src/common/utils/upload-storage.util';
import { ApiFile } from 'src/common/decorators/api-file.decorator';

export const ChangeAvatarDecorator = () => {
  return applyDecorators(
    ApiChangeAvatar(),
    ApiConsumes('multipart/form-data'),
    UseInterceptors(
      FileInterceptor('avatar', {
        storage: fileStorage('users-avatar'),
        fileFilter: imageFilter,
      }),
    ),
    ApiFile('avatar'),
    Patch('change-avatar/:userId'),
  );
};
