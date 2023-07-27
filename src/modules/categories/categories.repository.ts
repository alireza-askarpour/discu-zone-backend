import { Inject, Injectable } from '@nestjs/common';
import { Category } from './categories.entity';
import { CATEGORY_REPOSITORY } from 'src/core/constants';
import { CategoryCreateDto } from './dtos/create-category.dto';

@Injectable()
export class CategoriesRepository {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryModel: typeof Category,
  ) {}

  create(data: CategoryCreateDto) {
    return this.categoryModel.create(data);
  }
}
