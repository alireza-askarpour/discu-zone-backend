import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreateCategory } from './docs/create-category.doc';
import { JoiValidationPipe } from 'src/core/pipes/joi-validation.pipe';
import { createCategorySchema } from './schemas/create-category.schema';
import { CategoryCreateDto } from './dtos/create-category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

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
}
