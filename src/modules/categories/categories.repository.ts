import { Inject, Injectable } from '@nestjs/common';
import { Category } from './categories.entity';
import { CATEGORY_REPOSITORY } from 'src/core/constants';

@Injectable()
export class CategoriesRepository {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryModel: typeof Category,
  ) {}
}
