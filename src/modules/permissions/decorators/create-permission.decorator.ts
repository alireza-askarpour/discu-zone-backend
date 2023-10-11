import { Post, UsePipes, applyDecorators } from '@nestjs/common';
import { ApiCreatePermission } from '../docs/create-permission.doc';
import { JoiValidationPipe } from 'src/common/pipes/joi-validation.pipe';
import { createPermissionSchema } from '../schemas/create-permission.schema';

export const CreatePermissionDecorator = () => {
  return applyDecorators(
    UsePipes(new JoiValidationPipe(createPermissionSchema)),
    ApiCreatePermission(),
    Post(),
  );
};
