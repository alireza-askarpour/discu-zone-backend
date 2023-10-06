import {
  HttpStatus,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

import { CategoriesRepository } from './categories.repository';

import { CategoryCreateDto } from './dtos/create-category.dto';
import { CategoryUpdateDto } from './dtos/update-category.dto';

import { ResponseFormat } from 'src/common/interfaces/response.interface';
import { ResponseMessages } from 'src/common/constants/response-messages.constant';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async create(data: CategoryCreateDto): Promise<ResponseFormat<any>> {
    try {
      const createdCategory = await this.categoriesRepository.create(data);

      return {
        statusCode: HttpStatus.CREATED,
        data: { category: createdCategory },
      };
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async update(
    id: string,
    data: CategoryUpdateDto,
  ): Promise<ResponseFormat<any>> {
    try {
      const existCategory = await this.categoriesRepository.findById(id);
      if (!existCategory) {
        throw new NotFoundException(ResponseMessages.NOT_FOUND_CATEGORY);
      }

      const [updateCount] = await this.categoriesRepository.updateById(
        id,
        data,
      );
      if (updateCount !== 1) {
        throw new InternalServerErrorException(
          ResponseMessages.FAILED_UPDATE_CATEGORY,
        );
      }

      return {
        statusCode: HttpStatus.OK,
        message: ResponseMessages.UPDATED_CATEGORY,
      };
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async delete(id: string): Promise<ResponseFormat<any>> {
    try {
      const existCategory = await this.categoriesRepository.findById(id);
      if (!existCategory) {
        throw new NotFoundException(ResponseMessages.NOT_FOUND_CATEGORY);
      }

      const deletedCount = await this.categoriesRepository.deleteById(id);
      if (deletedCount !== 1) {
        throw new InternalServerErrorException(
          ResponseMessages.FAILED_DELETE_CATEGORY,
        );
      }

      return {
        statusCode: HttpStatus.OK,
        message: ResponseMessages.DELETED_CATEGORY,
      };
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
