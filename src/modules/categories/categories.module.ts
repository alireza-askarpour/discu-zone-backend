import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { categoriesProviders } from './categories.provider';
import { CategoriesRepository } from './categories.repository';

@Module({
  providers: [CategoriesService, CategoriesRepository, ...categoriesProviders],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
