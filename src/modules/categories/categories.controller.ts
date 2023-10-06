import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Param, ValidationPipe } from '@nestjs/common';

import { CategoriesService } from './categories.service';

import { IdDto } from 'src/core/dtos/id.dto';
import { CategoryCreateDto } from './dtos/create-category.dto';
import { CategoryUpdateDto } from './dtos/update-category.dto';

import { CreateCategoryDecoratpr } from './decorators/create-category.decorator';
import { UpdateCategoryDecorator } from './decorators/update-category.decorator';
import { DeleteCategoryDecorator } from './decorators/delete-category.decorator';

@ApiBearerAuth()
@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @CreateCategoryDecoratpr()
  create(@Body() data: CategoryCreateDto) {
    return this.categoriesService.create(data);
  }

  @UpdateCategoryDecorator()
  update(
    @Param(ValidationPipe) { id }: IdDto,
    @Body() data: CategoryUpdateDto,
  ) {
    return this.categoriesService.update(id, data);
  }

  @DeleteCategoryDecorator()
  delete(@Param(ValidationPipe) { id }: IdDto) {
    return this.categoriesService.delete(id);
  }
}
