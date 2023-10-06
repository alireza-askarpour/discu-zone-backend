import {
  Patch,
  UseGuards,
  UseInterceptors,
  applyDecorators,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { imageFilter } from 'src/core/utils/file-filter.util';
import { fileStorage } from 'src/core/utils/upload-storage.util';
import { ApiFile } from 'src/core/decorators/api-file.decorator';
import { ApiUploadAvatar } from '../docs/upload-avatar.doc';

export const UploadAvatarDecorator = () => {
  return applyDecorators(
    UseGuards(AuthGuard('jwt')),
    ApiConsumes('multipart/form-data'),
    UseInterceptors(
      FileInterceptor('avatar', {
        storage: fileStorage('servers-avatar'),
        fileFilter: imageFilter,
      }),
    ),
    ApiFile('avatar'),
    ApiUploadAvatar(),
    Patch('upload-avatar/:id'),
  );
};
