import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Param, ParseUUIDPipe } from '@nestjs/common';

import { CategoriesService } from './categories.service';

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
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: CategoryUpdateDto,
  ) {
    return this.categoriesService.update(id, data);
  }

  @DeleteCategoryDecorator()
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriesService.delete(id);
  }
}
