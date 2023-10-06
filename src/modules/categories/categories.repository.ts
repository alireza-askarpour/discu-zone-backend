import { Inject, Injectable } from '@nestjs/common';
import { Category } from './categories.entity';
import { CATEGORY_REPOSITORY } from 'src/common/constants';
import { CategoryCreateDto } from './dtos/create-category.dto';
import { CategoryUpdateDto } from './dtos/update-category.dto';

@Injectable()
export class CategoriesRepository {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryModel: typeof Category,
  ) {}

  create(data: CategoryCreateDto) {
    return this.categoryModel.create(data);
  }

  updateById(id: string, data: CategoryUpdateDto) {
    return this.categoryModel.update(data, { where: { id } });
  }

  findById(id: string) {
    return this.categoryModel.findByPk(id);
  }

  deleteById(id: string) {
    return this.categoryModel.destroy({ where: { id } });
  }
}
