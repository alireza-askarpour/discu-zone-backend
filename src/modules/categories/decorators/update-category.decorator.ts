// import { AuthGuard } from '@nestjs/passport';
import { Patch, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiUpdateCategory } from '../docs/update-category.doc';

export const UpdateCategoryDecorator = () => {
  return applyDecorators(
    ApiUpdateCategory(),
    // UseGuards(AuthGuard('jwt')),
    Patch(':id'),
  );
};
