import { AuthGuard } from '@nestjs/passport';
import { Delete, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiDeleteCategory } from '../docs/delete-category.doc';

export const DeleteCategoryDecorator = () => {
  return applyDecorators(
    ApiDeleteCategory(),
    UseGuards(AuthGuard('jwt')),
    Delete(':id'),
  );
};
