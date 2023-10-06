import { AuthGuard } from '@nestjs/passport';
import { Post, UseGuards, UsePipes, applyDecorators } from '@nestjs/common';

import { ApiCreateCategory } from '../docs/create-category.doc';
import { JoiValidationPipe } from 'src/core/pipes/joi-validation.pipe';
import { createCategorySchema } from '../schemas/create-category.schema';

export const CreateCategoryDecoratpr = () => {
  return applyDecorators(
    ApiCreateCategory(),
    UseGuards(AuthGuard('jwt')),
    UsePipes(new JoiValidationPipe(createCategorySchema)),
    Post(),
  );
};
