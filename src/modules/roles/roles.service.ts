import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { RolesRepository } from './roles.repository';
import { RoleCreateDto } from './dtos/create-role.dto';
import { ResponseFormat } from 'src/core/interfaces/response.interface';
import { RoleUpdateDto } from './dtos/update-role.dto';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

@Injectable()
export class RolesService {
  constructor(private rolesRepository: RolesRepository) {}

  async findAll(): Promise<ResponseFormat<any>> {
    const roles = await this.rolesRepository.findAll();
    return { statusCode: HttpStatus.CREATED, data: { roles } };
  }

  async create(data: RoleCreateDto): Promise<ResponseFormat<any>> {
    const role = await this.rolesRepository.create(data);
    return { statusCode: HttpStatus.CREATED, data: { role } };
  }

  async update(id: string, data: RoleUpdateDto): Promise<ResponseFormat<any>> {
    const existRole = await this.rolesRepository.findById(id);
    if (!existRole) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND_ROLE);
    }

    const [updatedCount] = await this.rolesRepository.update(id, data);
    if (updatedCount !== 1) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_UPDATE_ROLE,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessages.UPDATED_ROLE,
    };
  }
}
