import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CategoriesService } from './categories.service';

import { JoiValidationPipe } from 'src/core/pipes/joi-validation.pipe';
import { createCategorySchema } from './schemas/create-category.schema';

import { IdDto } from 'src/core/dtos/id.dto';
import { CategoryCreateDto } from './dtos/create-category.dto';
import { CategoryUpdateDto } from './dtos/update-category.dto';

import { ApiCreateCategory } from './docs/create-category.doc';
import { ApiUpdateCategory } from './docs/update-category.doc';
import { ApiDeleteCategory } from './docs/delete-category.doc';

@ApiBearerAuth()
@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @ApiCreateCategory()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new JoiValidationPipe(createCategorySchema))
  @Post()
  create(@Body() data: CategoryCreateDto) {
    return this.categoriesService.create(data);
  }

  @ApiUpdateCategory()
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param(ValidationPipe) { id }: IdDto,
    @Body() data: CategoryUpdateDto,
  ) {
    return this.categoriesService.update(id, data);
  }

  @ApiDeleteCategory()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param(ValidationPipe) { id }: IdDto) {
    return this.categoriesService.delete(id);
  }
}
