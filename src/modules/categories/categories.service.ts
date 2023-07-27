import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CategoryCreateDto } from './dtos/create-category.dto';
import { ResponseFormat } from 'src/core/interfaces/response.interface';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async create(data: CategoryCreateDto): Promise<ResponseFormat<any>> {
    try {
      const createdCategory = await this.categoriesRepository.create(data);
      console.log(createdCategory);

      return {
        statusCode: HttpStatus.CREATED,
        data: { category: createdCategory },
      };
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
